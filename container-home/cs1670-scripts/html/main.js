import { RFB, Terminal, FitAddon } from './dist/lib.js';

// --- Default addresses ---
  const DEFAULT_VNC_ADDR = 'localhost:14601';
  const DEFAULT_SERIAL_ADDR = 'localhost:14602';

  // --- DOM refs ---
  const hamburgerBtn = document.getElementById('hamburger');
  const menuDropdown = document.getElementById('menu-dropdown');
  const connectBtn = document.getElementById('connect-btn');
  const vncEnabledCb = document.getElementById('vnc-enabled');
  const vncAddrInput = document.getElementById('vnc-addr');
  const serialEnabledCb = document.getElementById('serial-enabled');
  const serialAddrInput = document.getElementById('serial-addr');
  const vncScalingSelect = document.getElementById('vnc-scaling');
  const waitSerialCb = document.getElementById('wait-serial');
  const autoReconnectCb = document.getElementById('auto-reconnect');
  const reconnectOnFocusCb = document.getElementById('reconnect-on-focus');
  const statusMsg = document.getElementById('status-msg');
  const vncSection = document.getElementById('vnc-section');
  const serialSection = document.getElementById('serial-section');
  const noViewers = document.getElementById('no-viewers');

  // --- Menu toggle ---
  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menuDropdown.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!menuDropdown.contains(e.target) && e.target !== hamburgerBtn) {
      menuDropdown.classList.remove('open');
    }
  });

  // --- VNC scaling ---
  function applyVncScaling() {
    const mode = vncScalingSelect.value;
    const pane = document.getElementById('vnc-pane');
    if (mode === 'original') {
      pane.classList.add('vnc-original');
    } else {
      pane.classList.remove('vnc-original');
    }
    if (vncState.rfb && vncState.connected) {
      vncState.rfb.scaleViewport = (mode === 'fit');
    }
    updateUrlParams();
  }

  vncScalingSelect.addEventListener('change', applyVncScaling);

  // Grey out controls when their parent checkbox is unchecked
  function updateDisabledStates() {
    vncAddrInput.disabled = !vncEnabledCb.checked;
    vncScalingSelect.disabled = !vncEnabledCb.checked;
    serialAddrInput.disabled = !serialEnabledCb.checked;
    // "Wait for serial" only makes sense when both VNC and serial are enabled
    waitSerialCb.disabled = !(vncEnabledCb.checked && serialEnabledCb.checked);
  }
  vncEnabledCb.addEventListener('change', updateDisabledStates);
  serialEnabledCb.addEventListener('change', updateDisabledStates);
  updateDisabledStates();

  // --- URL parameter parsing ---
  function parseParam(value, defaultAddr) {
    if (value === null) return null; // param absent
    if (value === '' || value === 'on') return { enabled: true, addr: defaultAddr };
    if (value === 'off') return { enabled: false, addr: defaultAddr };
    return { enabled: true, addr: value };
  }

  function applyUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const vnc = parseParam(params.get('vnc'), DEFAULT_VNC_ADDR);
    const serial = parseParam(params.get('serial'), DEFAULT_SERIAL_ADDR);
    if (vnc) {
      vncEnabledCb.checked = vnc.enabled;
      vncAddrInput.value = vnc.addr;
    }
    if (serial) {
      serialEnabledCb.checked = serial.enabled;
      serialAddrInput.value = serial.addr;
    }
    const scaling = params.get('vnc-scaling');
    if (scaling === 'fit' || scaling === 'original') {
      vncScalingSelect.value = scaling;
    }
    if (params.get('auto-reconnect') === 'off') autoReconnectCb.checked = false;
    if (params.get('reconnect-on-focus') === 'off') reconnectOnFocusCb.checked = false;
    if (params.get('wait-serial') === 'off') waitSerialCb.checked = false;
    updateDisabledStates();
  }

  function updateUrlParams() {
    const params = new URLSearchParams();
    const vncOn = vncEnabledCb.checked;
    const vncAddr = vncAddrInput.value.trim() || DEFAULT_VNC_ADDR;
    const serialOn = serialEnabledCb.checked;
    const serialAddr = serialAddrInput.value.trim() || DEFAULT_SERIAL_ADDR;

    // Only include non-default params
    if (!vncOn) {
      params.set('vnc', 'off');
    } else if (vncAddr !== DEFAULT_VNC_ADDR) {
      params.set('vnc', vncAddr);
    }
    if (serialOn) {
      if (serialAddr !== DEFAULT_SERIAL_ADDR) {
        params.set('serial', serialAddr);
      } else {
        params.set('serial', 'on');
      }
    }
    const scaling = vncScalingSelect.value;
    if (scaling !== 'fit') {
      params.set('vnc-scaling', scaling);
    }
    if (!autoReconnectCb.checked) params.set('auto-reconnect', 'off');
    if (!reconnectOnFocusCb.checked) params.set('reconnect-on-focus', 'off');
    if (!waitSerialCb.checked) params.set('wait-serial', 'off');

    const qs = params.toString();
    const newUrl = window.location.pathname + (qs ? '?' + qs : '');
    window.history.replaceState(null, '', newUrl);
  }

  // --- Layout ---
  function updateLayout(vncOn, serialOn) {
    vncSection.classList.toggle('pane-hidden', !vncOn);
    serialSection.classList.toggle('pane-hidden', !serialOn);
    noViewers.classList.toggle('pane-hidden', vncOn || serialOn);

    // When only one pane is active, let it fill the space
    vncSection.style.flex = (!serialOn && vncOn) ? '1' : '7';
    serialSection.style.flex = (!vncOn && serialOn) ? '1' : '3';
  }

  // --- Connection state ---
  const BACKOFF_INITIAL = 1000;
  const BACKOFF_MAX = 60 * 1000;
  const GIVEUP_MS = 10 * 60 * 1000;

  // Per-viewer state (no per-viewer timers or backoff)
  const vncState = { enabled: false, addr: '', rfb: null, connected: false };
  const serialState = { enabled: false, addr: '', ws: null, connected: false };

  // Unified reconnect state
  let reconnectTimer = null;
  let reconnectBackoff= BACKOFF_INITIAL;
  let firstDisconnect = 0;
  let gaveUp = false;
  let connecting = false; // true while a connectAll() is in flight
  let abortConnect = false; // set to true to cancel an in-flight connectAll

  // --- xterm.js (persistent instance) ---
  const term = new Terminal({ cursorBlink: true, fontSize: 14, convertEol: true, fontFamily: "'Fira Code', monospace" });
  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  term.open(document.getElementById('serial-pane'));
  fitAddon.fit();
  window.addEventListener('resize', () => {
    fitAddon.fit();
    if (vncState.rfb && vncState.connected && vncScalingSelect.value === 'fit') {
      vncState.rfb.scaleViewport = true;
    }
  });

  // Register term.onData once — it always sends to whatever the current ws is
  term.onData((data) => {
    if (serialState.ws && serialState.ws.readyState === WebSocket.OPEN) {
      serialState.ws.send(data);
    }
  });

  // --- Status bar ---
  function updateStatus() {
    const vncDisc = vncState.enabled && !vncState.connected;
    const serialDisc = serialState.enabled && !serialState.connected;

    if (!vncDisc && !serialDisc) {
      statusMsg.classList.remove('visible');
      statusMsg.innerHTML = '';
      return;
    }

    let who;
    if (vncDisc && serialDisc) {
      who = 'Display + Serial';
    } else if (vncDisc) {
      who = 'Display';
    } else {
      who = 'Serial';
    }

    statusMsg.innerHTML = who + ' disconnected ';
    const btn = document.createElement('button');
    btn.textContent = 'Reconnect';
    btn.addEventListener('click', reconnectNow);
    statusMsg.appendChild(btn);
    statusMsg.classList.add('visible');
  }

  // --- VNC: low-level connect/teardown (no reconnect logic) ---
  function teardownVnc() {
    if (vncState.rfb) {
      const old = vncState.rfb;
      vncState.rfb = null;
      vncState.connected = false;
      try { old.disconnect(); } catch (_) {}
    }
  }

  // Returns a Promise: resolves on connect, rejects on disconnect/error.
  // The disconnect handler persists after the promise settles, so mid-session
  // drops are routed to onConnectionLost() without a second handler.
  function connectVncAsync(addr) {
    teardownVnc();
    vncState.addr = addr;
    vncState.enabled = true;

    const url = 'ws://' + addr;
    const pane = document.getElementById('vnc-pane');
    pane.textContent = '';

    return new Promise((resolve, reject) => {
      try {
        const rfb = new RFB(pane, url);
        rfb.scaleViewport = (vncScalingSelect.value === 'fit');
        rfb.resizeSession = false;
        vncState.rfb = rfb;
        let settled = false;

        rfb.addEventListener('connect', () => {
          if (vncState.rfb !== rfb) return;
          settled = true;
          vncState.connected = true;
          applyVncScaling();
          resolve();
        });
        rfb.addEventListener('disconnect', () => {
          if (vncState.rfb !== rfb) return;
          vncState.rfb = null;
          vncState.connected = false;
          if (!settled) {
            settled = true;
            reject(new Error('VNC disconnected'));
          } else {
            onConnectionLost();
          }
        });
      } catch (err) {
        vncState.rfb = null;
        reject(err);
      }
    });
  }

  function disconnectVnc() {
    teardownVnc();
    vncState.enabled = false;
  }

  // --- Serial: low-level connect/teardown (no reconnect logic) ---
  function teardownSerial() {
    if (serialState.ws) {
      const old = serialState.ws;
      serialState.ws = null;
      serialState.connected = false;
      try { old.close(); } catch (_) {}
    }
  }

  // Returns a Promise: resolves on open, rejects on close/error.
  // The close handler persists after the promise settles, so mid-session
  // drops are routed to onConnectionLost() without needing a second handler.
  function connectSerialAsync(addr) {
    teardownSerial();
    serialState.addr = addr;
    serialState.enabled = true;

    const url = 'ws://' + addr;
    return new Promise((resolve, reject) => {
	const ws = new WebSocket(url, "binary");
      ws.binaryType = 'arraybuffer';
      serialState.ws = ws;
      let settled = false;

  ws.addEventListener('open', () => {
        if (serialState.ws !== ws) return;
        settled = true;
        serialState.connected = true;
        term.write('\r\n[serial connected]\r\n');
        resolve();
      });
  ws.addEventListener('close', () => {
        if (serialState.ws !== ws) return;
        const wasConnected = serialState.connected;
        serialState.ws = null;
        serialState.connected = false;
        if (!settled) {
          settled = true;
          reject(new Error('Serial closed'));
        } else {
          if (wasConnected) term.write('\r\n[serial disconnected]\r\n');
          onConnectionLost();
        }
      });
  ws.addEventListener('serial error', (e) => {
       /* close event will follow */
  });
       ws.addEventListener('message', (e) => {
        if (serialState.ws !== ws) return;
        if (e.data instanceof ArrayBuffer) {
          term.write(new Uint8Array(e.data));
        } else {
          term.write(e.data);
        }
      });
    });
  }

  function disconnectSerial() {
    teardownSerial();
    serialState.enabled = false;
  }

  // --- Unified connect/reconnect ---

  // Cancel any in-flight connectAll and tear down pending connections.
  // Resets connecting to false so a new connectAll() can proceed immediately.
  function cancelConnect() {
    if (reconnectTimer) { clearTimeout(reconnectTimer); reconnectTimer = null; }
    abortConnect = true;
    connecting = false;
    teardownVnc();
    teardownSerial();
  }

  function onConnectionLost() {
    if (connecting) return; // connectAll is handling things
    scheduleReconnect();
    updateStatus();
  }

  async function connectAll() {
    if (connecting) return;
    connecting = true;
    abortConnect = false;

    // Cancel any pending reconnect timer
    if (reconnectTimer) { clearTimeout(reconnectTimer); reconnectTimer = null; }

    try {
      const shouldWaitForSerial = waitSerialCb.checked && serialState.enabled && vncState.enabled;
      // Step 1: serial (if enabled and not already connected)
      if (serialState.enabled && !serialState.connected) {
        try {
          await connectSerialAsync(serialState.addr);
        } catch (_) {
          if (abortConnect) return;
          // Serial failed
          updateStatus();
          if (shouldWaitForSerial) {
            // Can't proceed to VNC — schedule reconnect for both
            scheduleReconnect();
            return;
          }
          // Not waiting — still try VNC below
          scheduleReconnect();
        }
        if (abortConnect) return;
      }

      // Step 2: VNC (if enabled and not already connected)
      if (vncState.enabled && !vncState.connected) {
        try {
          await connectVncAsync(vncState.addr);
        } catch (_) {
          if (abortConnect) return;
          // VNC failed, but serial may be fine — schedule reconnect (will only retry what's needed)
          updateStatus();
          scheduleReconnect();
          return;
        }
        if (abortConnect) return;
      }

      // Both connected (or not enabled) — reset backoff
      reconnectBackoff = BACKOFF_INITIAL;
      firstDisconnect = 0;
      gaveUp = false;
      updateStatus();
    } finally {
      connecting = false;
    }
  }

  function scheduleReconnect() {
    if (!autoReconnectCb.checked) return;
    if (reconnectTimer) return;
    if (!firstDisconnect) firstDisconnect = Date.now();

    // Give up after timeout
    if (Date.now() - firstDisconnect >= GIVEUP_MS) {
      gaveUp = true;
      updateStatus();
      return;
    }

    const delay = reconnectBackoff;
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      reconnectBackoff = Math.min(delay * 2, BACKOFF_MAX);
      connectAll();
    }, delay);
  }

  function reconnectNow() {
    cancelConnect();
    reconnectBackoff = BACKOFF_INITIAL;
    firstDisconnect = 0;
    gaveUp = false;
    connectAll();
  }

  // Reconnect on window focus
  window.addEventListener('focus', () => {
    if (!reconnectOnFocusCb.checked) return;
    const needsVnc = vncState.enabled && !vncState.connected;
    const needsSerial = serialState.enabled && !serialState.connected;
    if ((needsVnc || needsSerial) && !connecting) {
      if (reconnectTimer) { clearTimeout(reconnectTimer); reconnectTimer = null; }
      reconnectBackoff = BACKOFF_INITIAL;
      firstDisconnect = 0;
      gaveUp = false;
      connectAll();
    }
  });

  // --- Connect button ---
  function applySettings() {
    const vncOn = vncEnabledCb.checked;
    const vncAddr = vncAddrInput.value.trim() || DEFAULT_VNC_ADDR;
    const serialOn = serialEnabledCb.checked;
    const serialAddr = serialAddrInput.value.trim() || DEFAULT_SERIAL_ADDR;

    // Cancel any in-flight connection attempt
    cancelConnect();
    reconnectBackoff = BACKOFF_INITIAL;
    firstDisconnect = 0;
    gaveUp = false;

    updateLayout(vncOn, serialOn);
    updateUrlParams();

    // Handle disabling
    if (!vncOn) disconnectVnc();
    if (!serialOn) disconnectSerial();

    // Update enabled state and addresses
    if (vncOn) { vncState.enabled = true; vncState.addr = vncAddr; }
    if (serialOn) { serialState.enabled = true; serialState.addr = serialAddr; }

    // Disconnect if address changed
    if (vncOn && vncState.connected && vncState.addr !== vncAddr) teardownVnc();
    if (serialOn && serialState.connected && serialState.addr !== serialAddr) teardownSerial();

    // Refit xterm after layout change
    if (serialOn) setTimeout(() => fitAddon.fit(), 50);

    menuDropdown.classList.remove('open');

    // Kick off sequenced connect for anything that needs it
    connectAll();
  }

  connectBtn.addEventListener('click', applySettings);

  // --- Initialization ---
  applyUrlParams();
  applyVncScaling();
  applySettings();

