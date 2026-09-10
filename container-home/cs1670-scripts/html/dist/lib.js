// node_modules/@novnc/novnc/core/util/int.js
function toUnsigned32bit(toConvert) {
  return toConvert >>> 0;
}
function toSigned32bit(toConvert) {
  return toConvert | 0;
}

// node_modules/@novnc/novnc/core/util/logging.js
var _logLevel = "warn";
var Debug = () => {
};
var Info = () => {
};
var Warn = () => {
};
var Error2 = () => {
};
function initLogging(level) {
  if (typeof level === "undefined") {
    level = _logLevel;
  } else {
    _logLevel = level;
  }
  Debug = Info = Warn = Error2 = () => {
  };
  if (typeof window.console !== "undefined") {
    switch (level) {
      case "debug":
        Debug = console.debug.bind(window.console);
      case "info":
        Info = console.info.bind(window.console);
      case "warn":
        Warn = console.warn.bind(window.console);
      case "error":
        Error2 = console.error.bind(window.console);
      case "none":
        break;
      default:
        throw new window.Error("invalid logging type '" + level + "'");
    }
  }
}
initLogging();

// node_modules/@novnc/novnc/core/util/strings.js
function decodeUTF8(utf8string, allowLatin1 = false) {
  try {
    return decodeURIComponent(escape(utf8string));
  } catch (e2) {
    if (e2 instanceof URIError) {
      if (allowLatin1) {
        return utf8string;
      }
    }
    throw e2;
  }
}
function encodeUTF8(DOMString) {
  return unescape(encodeURIComponent(DOMString));
}

// node_modules/@novnc/novnc/core/base64.js
var base64_default = {
  /* Convert data (an array of integers) to a Base64 string. */
  toBase64Table: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split(""),
  base64Pad: "=",
  encode(data) {
    "use strict";
    let result = "";
    const length = data.length;
    const lengthpad = length % 3;
    for (let i = 0; i < length - 2; i += 3) {
      result += this.toBase64Table[data[i] >> 2];
      result += this.toBase64Table[((data[i] & 3) << 4) + (data[i + 1] >> 4)];
      result += this.toBase64Table[((data[i + 1] & 15) << 2) + (data[i + 2] >> 6)];
      result += this.toBase64Table[data[i + 2] & 63];
    }
    const j2 = length - lengthpad;
    if (lengthpad === 2) {
      result += this.toBase64Table[data[j2] >> 2];
      result += this.toBase64Table[((data[j2] & 3) << 4) + (data[j2 + 1] >> 4)];
      result += this.toBase64Table[(data[j2 + 1] & 15) << 2];
      result += this.toBase64Table[64];
    } else if (lengthpad === 1) {
      result += this.toBase64Table[data[j2] >> 2];
      result += this.toBase64Table[(data[j2] & 3) << 4];
      result += this.toBase64Table[64];
      result += this.toBase64Table[64];
    }
    return result;
  },
  /* Convert Base64 data to a string */
  /* eslint-disable comma-spacing */
  toBinaryTable: [
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    62,
    -1,
    -1,
    -1,
    63,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    -1,
    -1,
    -1,
    0,
    -1,
    -1,
    -1,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    -1,
    -1,
    -1,
    -1,
    -1
  ],
  /* eslint-enable comma-spacing */
  decode(data, offset = 0) {
    let dataLength = data.indexOf("=") - offset;
    if (dataLength < 0) {
      dataLength = data.length - offset;
    }
    const resultLength = (dataLength >> 2) * 3 + Math.floor(dataLength % 4 / 1.5);
    const result = new Array(resultLength);
    let leftbits = 0;
    let leftdata = 0;
    for (let idx = 0, i = offset; i < data.length; i++) {
      const c2 = this.toBinaryTable[data.charCodeAt(i) & 127];
      const padding = data.charAt(i) === this.base64Pad;
      if (c2 === -1) {
        Error2("Illegal character code " + data.charCodeAt(i) + " at position " + i);
        continue;
      }
      leftdata = leftdata << 6 | c2;
      leftbits += 6;
      if (leftbits >= 8) {
        leftbits -= 8;
        if (!padding) {
          result[idx++] = leftdata >> leftbits & 255;
        }
        leftdata &= (1 << leftbits) - 1;
      }
    }
    if (leftbits) {
      const err2 = new Error("Corrupted base64 string");
      err2.name = "Base64-Error";
      throw err2;
    }
    return result;
  }
};

// node_modules/@novnc/novnc/core/util/browser.js
var isTouchDevice = "ontouchstart" in document.documentElement || // required for Chrome debugger
document.ontouchstart !== void 0 || // required for MS Surface
navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
window.addEventListener("touchstart", function onFirstTouch() {
  isTouchDevice = true;
  window.removeEventListener("touchstart", onFirstTouch, false);
}, false);
var dragThreshold = 10 * (window.devicePixelRatio || 1);
var _supportsCursorURIs = false;
try {
  const target = document.createElement("canvas");
  target.style.cursor = 'url("data:image/x-icon;base64,AAACAAEACAgAAAIAAgA4AQAAFgAAACgAAAAIAAAAEAAAAAEAIAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAA==") 2 2, default';
  if (target.style.cursor.indexOf("url") === 0) {
    Info("Data URI scheme cursor supported");
    _supportsCursorURIs = true;
  } else {
    Warn("Data URI scheme cursor not supported");
  }
} catch (exc) {
  Error2("Data URI scheme cursor test exception: " + exc);
}
var supportsCursorURIs = _supportsCursorURIs;
var _hasScrollbarGutter = true;
try {
  const container = document.createElement("div");
  container.style.visibility = "hidden";
  container.style.overflow = "scroll";
  document.body.appendChild(container);
  const child = document.createElement("div");
  container.appendChild(child);
  const scrollbarWidth = container.offsetWidth - child.offsetWidth;
  container.parentNode.removeChild(container);
  _hasScrollbarGutter = scrollbarWidth != 0;
} catch (exc) {
  Error2("Scrollbar test exception: " + exc);
}
var supportsWebCodecsH264Decode = false;
async function _checkWebCodecsH264DecodeSupport() {
  if (!("VideoDecoder" in window)) {
    return false;
  }
  const config = {
    codec: "avc1.42401f",
    codedWidth: 1920,
    codedHeight: 1080,
    optimizeForLatency: true
  };
  let support = await VideoDecoder.isConfigSupported(config);
  if (!support.supported) {
    return false;
  }
  const data = new Uint8Array(base64_default.decode(
    "AAAAAWdCwBTZnpuAgICgAAADACAAAAZB4oVNAAAAAWjJYyyAAAABBgX//4HcRem95tlIt5Ys2CDZI+7veDI2NCAtIGNvcmUgMTY0IHIzMTA4IDMxZTE5ZjkgLSBILjI2NC9NUEVHLTQgQVZDIGNvZGVjIC0gQ29weWxlZnQgMjAwMy0yMDIzIC0gaHR0cDovL3d3dy52aWRlb2xhbi5vcmcveDI2NC5odG1sIC0gb3B0aW9uczogY2FiYWM9MCByZWY9NSBkZWJsb2NrPTE6MDowIGFuYWx5c2U9MHgxOjB4MTExIG1lPWhleCBzdWJtZT04IHBzeT0xIHBzeV9yZD0xLjAwOjAuMDAgbWl4ZWRfcmVmPTEgbWVfcmFuZ2U9MTYgY2hyb21hX21lPTEgdHJlbGxpcz0yIDh4OGRjdD0wIGNxbT0wIGRlYWR6b25lPTIxLDExIGZhc3RfcHNraXA9MSBjaHJvbWFfcXBfb2Zmc2V0PS0yIHRocmVhZHM9MSBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgY29uc3RyYWluZWRfaW50cmE9MCBiZnJhbWVzPTAgd2VpZ2h0cD0wIGtleWludD1pbmZpbml0ZSBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NTAgcmM9YWJyIG1idHJlZT0xIGJpdHJhdGU9NDAwIHJhdGV0b2w9MS4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAABZYiEBrxmKAAPVccAAS044AA5DRJMnkycJk4TPw=="
  ));
  let gotframe = false;
  let error = null;
  let decoder = new VideoDecoder({
    output: (frame) => {
      gotframe = true;
      frame.close();
    },
    error: (e2) => {
      error = e2;
    }
  });
  let chunk = new EncodedVideoChunk({
    timestamp: 0,
    type: "key",
    data
  });
  decoder.configure(config);
  decoder.decode(chunk);
  try {
    await decoder.flush();
  } catch (e2) {
    error = e2;
  }
  if (!gotframe) {
    return false;
  }
  if (error !== null) {
    return false;
  }
  return true;
}
supportsWebCodecsH264Decode = await _checkWebCodecsH264DecodeSupport();
function isMac() {
  return !!/mac/i.exec(navigator.platform);
}
function isWindows() {
  return !!/win/i.exec(navigator.platform);
}
function isIOS() {
  return !!/ipad/i.exec(navigator.platform) || !!/iphone/i.exec(navigator.platform) || !!/ipod/i.exec(navigator.platform);
}

// node_modules/@novnc/novnc/core/util/element.js
function clientToElement(x, y, elem) {
  const bounds = elem.getBoundingClientRect();
  let pos = { x: 0, y: 0 };
  if (x < bounds.left) {
    pos.x = 0;
  } else if (x >= bounds.right) {
    pos.x = bounds.width - 1;
  } else {
    pos.x = x - bounds.left;
  }
  if (y < bounds.top) {
    pos.y = 0;
  } else if (y >= bounds.bottom) {
    pos.y = bounds.height - 1;
  } else {
    pos.y = y - bounds.top;
  }
  return pos;
}

// node_modules/@novnc/novnc/core/util/events.js
function stopEvent(e2) {
  e2.stopPropagation();
  e2.preventDefault();
}
var _captureRecursion = false;
var _elementForUnflushedEvents = null;
document.captureElement = null;
function _captureProxy(e2) {
  if (_captureRecursion) return;
  const newEv = new e2.constructor(e2.type, e2);
  _captureRecursion = true;
  if (document.captureElement) {
    document.captureElement.dispatchEvent(newEv);
  } else {
    _elementForUnflushedEvents.dispatchEvent(newEv);
  }
  _captureRecursion = false;
  e2.stopPropagation();
  if (newEv.defaultPrevented) {
    e2.preventDefault();
  }
  if (e2.type === "mouseup") {
    releaseCapture();
  }
}
function _capturedElemChanged() {
  const proxyElem = document.getElementById("noVNC_mouse_capture_elem");
  proxyElem.style.cursor = window.getComputedStyle(document.captureElement).cursor;
}
var _captureObserver = new MutationObserver(_capturedElemChanged);
function setCapture(target) {
  if (target.setCapture) {
    target.setCapture();
    document.captureElement = target;
  } else {
    releaseCapture();
    let proxyElem = document.getElementById("noVNC_mouse_capture_elem");
    if (proxyElem === null) {
      proxyElem = document.createElement("div");
      proxyElem.id = "noVNC_mouse_capture_elem";
      proxyElem.style.position = "fixed";
      proxyElem.style.top = "0px";
      proxyElem.style.left = "0px";
      proxyElem.style.width = "100%";
      proxyElem.style.height = "100%";
      proxyElem.style.zIndex = 1e4;
      proxyElem.style.display = "none";
      document.body.appendChild(proxyElem);
      proxyElem.addEventListener("contextmenu", _captureProxy);
      proxyElem.addEventListener("mousemove", _captureProxy);
      proxyElem.addEventListener("mouseup", _captureProxy);
    }
    document.captureElement = target;
    _captureObserver.observe(target, { attributes: true });
    _capturedElemChanged();
    proxyElem.style.display = "";
    window.addEventListener("mousemove", _captureProxy);
    window.addEventListener("mouseup", _captureProxy);
  }
}
function releaseCapture() {
  if (document.releaseCapture) {
    document.releaseCapture();
    document.captureElement = null;
  } else {
    if (!document.captureElement) {
      return;
    }
    _elementForUnflushedEvents = document.captureElement;
    document.captureElement = null;
    _captureObserver.disconnect();
    const proxyElem = document.getElementById("noVNC_mouse_capture_elem");
    proxyElem.style.display = "none";
    window.removeEventListener("mousemove", _captureProxy);
    window.removeEventListener("mouseup", _captureProxy);
  }
}

// node_modules/@novnc/novnc/core/util/eventtarget.js
var EventTargetMixin = class {
  constructor() {
    this._listeners = /* @__PURE__ */ new Map();
  }
  addEventListener(type, callback) {
    if (!this._listeners.has(type)) {
      this._listeners.set(type, /* @__PURE__ */ new Set());
    }
    this._listeners.get(type).add(callback);
  }
  removeEventListener(type, callback) {
    if (this._listeners.has(type)) {
      this._listeners.get(type).delete(callback);
    }
  }
  dispatchEvent(event) {
    if (!this._listeners.has(event.type)) {
      return true;
    }
    this._listeners.get(event.type).forEach((callback) => callback.call(this, event));
    return !event.defaultPrevented;
  }
};

// node_modules/@novnc/novnc/core/display.js
var Display = class {
  constructor(target) {
    this._drawCtx = null;
    this._renderQ = [];
    this._flushPromise = null;
    this._fbWidth = 0;
    this._fbHeight = 0;
    this._prevDrawStyle = "";
    Debug(">> Display.constructor");
    this._target = target;
    if (!this._target) {
      throw new Error("Target must be set");
    }
    if (typeof this._target === "string") {
      throw new Error("target must be a DOM element");
    }
    if (!this._target.getContext) {
      throw new Error("no getContext method");
    }
    this._targetCtx = this._target.getContext("2d");
    this._viewportLoc = { "x": 0, "y": 0, "w": this._target.width, "h": this._target.height };
    this._backbuffer = document.createElement("canvas");
    this._drawCtx = this._backbuffer.getContext("2d");
    this._damageBounds = {
      left: 0,
      top: 0,
      right: this._backbuffer.width,
      bottom: this._backbuffer.height
    };
    Debug("User Agent: " + navigator.userAgent);
    Debug("<< Display.constructor");
    this._scale = 1;
    this._clipViewport = false;
  }
  // ===== PROPERTIES =====
  get scale() {
    return this._scale;
  }
  set scale(scale) {
    this._rescale(scale);
  }
  get clipViewport() {
    return this._clipViewport;
  }
  set clipViewport(viewport) {
    this._clipViewport = viewport;
    const vp = this._viewportLoc;
    this.viewportChangeSize(vp.w, vp.h);
    this.viewportChangePos(0, 0);
  }
  get width() {
    return this._fbWidth;
  }
  get height() {
    return this._fbHeight;
  }
  // ===== PUBLIC METHODS =====
  viewportChangePos(deltaX, deltaY) {
    const vp = this._viewportLoc;
    deltaX = Math.floor(deltaX);
    deltaY = Math.floor(deltaY);
    if (!this._clipViewport) {
      deltaX = -vp.w;
      deltaY = -vp.h;
    }
    const vx2 = vp.x + vp.w - 1;
    const vy2 = vp.y + vp.h - 1;
    if (deltaX < 0 && vp.x + deltaX < 0) {
      deltaX = -vp.x;
    }
    if (vx2 + deltaX >= this._fbWidth) {
      deltaX -= vx2 + deltaX - this._fbWidth + 1;
    }
    if (vp.y + deltaY < 0) {
      deltaY = -vp.y;
    }
    if (vy2 + deltaY >= this._fbHeight) {
      deltaY -= vy2 + deltaY - this._fbHeight + 1;
    }
    if (deltaX === 0 && deltaY === 0) {
      return;
    }
    Debug("viewportChange deltaX: " + deltaX + ", deltaY: " + deltaY);
    vp.x += deltaX;
    vp.y += deltaY;
    this._damage(vp.x, vp.y, vp.w, vp.h);
    this.flip();
  }
  viewportChangeSize(width, height) {
    if (!this._clipViewport || typeof width === "undefined" || typeof height === "undefined") {
      Debug("Setting viewport to full display region");
      width = this._fbWidth;
      height = this._fbHeight;
    }
    width = Math.floor(width);
    height = Math.floor(height);
    if (width > this._fbWidth) {
      width = this._fbWidth;
    }
    if (height > this._fbHeight) {
      height = this._fbHeight;
    }
    const vp = this._viewportLoc;
    if (vp.w !== width || vp.h !== height) {
      vp.w = width;
      vp.h = height;
      const canvas = this._target;
      canvas.width = width;
      canvas.height = height;
      this.viewportChangePos(0, 0);
      this._damage(vp.x, vp.y, vp.w, vp.h);
      this.flip();
      this._rescale(this._scale);
    }
  }
  absX(x) {
    if (this._scale === 0) {
      return 0;
    }
    return toSigned32bit(x / this._scale + this._viewportLoc.x);
  }
  absY(y) {
    if (this._scale === 0) {
      return 0;
    }
    return toSigned32bit(y / this._scale + this._viewportLoc.y);
  }
  resize(width, height) {
    this._prevDrawStyle = "";
    this._fbWidth = width;
    this._fbHeight = height;
    const canvas = this._backbuffer;
    if (canvas.width !== width || canvas.height !== height) {
      let saveImg = null;
      if (canvas.width > 0 && canvas.height > 0) {
        saveImg = this._drawCtx.getImageData(0, 0, canvas.width, canvas.height);
      }
      if (canvas.width !== width) {
        canvas.width = width;
      }
      if (canvas.height !== height) {
        canvas.height = height;
      }
      if (saveImg) {
        this._drawCtx.putImageData(saveImg, 0, 0);
      }
    }
    const vp = this._viewportLoc;
    this.viewportChangeSize(vp.w, vp.h);
    this.viewportChangePos(0, 0);
  }
  getImageData() {
    return this._drawCtx.getImageData(0, 0, this.width, this.height);
  }
  toDataURL(type, encoderOptions) {
    return this._backbuffer.toDataURL(type, encoderOptions);
  }
  toBlob(callback, type, quality) {
    return this._backbuffer.toBlob(callback, type, quality);
  }
  // Track what parts of the visible canvas that need updating
  _damage(x, y, w, h2) {
    if (x < this._damageBounds.left) {
      this._damageBounds.left = x;
    }
    if (y < this._damageBounds.top) {
      this._damageBounds.top = y;
    }
    if (x + w > this._damageBounds.right) {
      this._damageBounds.right = x + w;
    }
    if (y + h2 > this._damageBounds.bottom) {
      this._damageBounds.bottom = y + h2;
    }
  }
  // Update the visible canvas with the contents of the
  // rendering canvas
  flip(fromQueue) {
    if (this._renderQ.length !== 0 && !fromQueue) {
      this._renderQPush({
        "type": "flip"
      });
    } else {
      let x = this._damageBounds.left;
      let y = this._damageBounds.top;
      let w = this._damageBounds.right - x;
      let h2 = this._damageBounds.bottom - y;
      let vx = x - this._viewportLoc.x;
      let vy = y - this._viewportLoc.y;
      if (vx < 0) {
        w += vx;
        x -= vx;
        vx = 0;
      }
      if (vy < 0) {
        h2 += vy;
        y -= vy;
        vy = 0;
      }
      if (vx + w > this._viewportLoc.w) {
        w = this._viewportLoc.w - vx;
      }
      if (vy + h2 > this._viewportLoc.h) {
        h2 = this._viewportLoc.h - vy;
      }
      if (w > 0 && h2 > 0) {
        this._targetCtx.drawImage(
          this._backbuffer,
          x,
          y,
          w,
          h2,
          vx,
          vy,
          w,
          h2
        );
      }
      this._damageBounds.left = this._damageBounds.top = 65535;
      this._damageBounds.right = this._damageBounds.bottom = 0;
    }
  }
  pending() {
    return this._renderQ.length > 0;
  }
  flush() {
    if (this._renderQ.length === 0) {
      return Promise.resolve();
    } else {
      if (this._flushPromise === null) {
        this._flushPromise = new Promise((resolve) => {
          this._flushResolve = resolve;
        });
      }
      return this._flushPromise;
    }
  }
  fillRect(x, y, width, height, color, fromQueue) {
    if (this._renderQ.length !== 0 && !fromQueue) {
      this._renderQPush({
        "type": "fill",
        "x": x,
        "y": y,
        "width": width,
        "height": height,
        "color": color
      });
    } else {
      this._setFillColor(color);
      this._drawCtx.fillRect(x, y, width, height);
      this._damage(x, y, width, height);
    }
  }
  copyImage(oldX, oldY, newX, newY, w, h2, fromQueue) {
    if (this._renderQ.length !== 0 && !fromQueue) {
      this._renderQPush({
        "type": "copy",
        "oldX": oldX,
        "oldY": oldY,
        "x": newX,
        "y": newY,
        "width": w,
        "height": h2
      });
    } else {
      this._drawCtx.mozImageSmoothingEnabled = false;
      this._drawCtx.webkitImageSmoothingEnabled = false;
      this._drawCtx.msImageSmoothingEnabled = false;
      this._drawCtx.imageSmoothingEnabled = false;
      this._drawCtx.drawImage(
        this._backbuffer,
        oldX,
        oldY,
        w,
        h2,
        newX,
        newY,
        w,
        h2
      );
      this._damage(newX, newY, w, h2);
    }
  }
  imageRect(x, y, width, height, mime, arr) {
    if (width === 0 || height === 0) {
      return;
    }
    const img = new Image();
    img.src = "data: " + mime + ";base64," + base64_default.encode(arr);
    this._renderQPush({
      "type": "img",
      "img": img,
      "x": x,
      "y": y,
      "width": width,
      "height": height
    });
  }
  videoFrame(x, y, width, height, frame) {
    this._renderQPush({
      "type": "frame",
      "frame": frame,
      "x": x,
      "y": y,
      "width": width,
      "height": height
    });
  }
  blitImage(x, y, width, height, arr, offset, fromQueue) {
    if (this._renderQ.length !== 0 && !fromQueue) {
      const newArr = new Uint8Array(width * height * 4);
      newArr.set(new Uint8Array(arr.buffer, 0, newArr.length));
      this._renderQPush({
        "type": "blit",
        "data": newArr,
        "x": x,
        "y": y,
        "width": width,
        "height": height
      });
    } else {
      let data = new Uint8ClampedArray(
        arr.buffer,
        arr.byteOffset + offset,
        width * height * 4
      );
      let img = new ImageData(data, width, height);
      this._drawCtx.putImageData(img, x, y);
      this._damage(x, y, width, height);
    }
  }
  drawImage(img, ...args) {
    this._drawCtx.drawImage(img, ...args);
    if (args.length <= 4) {
      const [x, y] = args;
      this._damage(x, y, img.width, img.height);
    } else {
      const [, , sw, sh, dx, dy] = args;
      this._damage(dx, dy, sw, sh);
    }
  }
  autoscale(containerWidth, containerHeight) {
    let scaleRatio;
    if (containerWidth === 0 || containerHeight === 0) {
      scaleRatio = 0;
    } else {
      const vp = this._viewportLoc;
      const targetAspectRatio = containerWidth / containerHeight;
      const fbAspectRatio = vp.w / vp.h;
      if (fbAspectRatio >= targetAspectRatio) {
        scaleRatio = containerWidth / vp.w;
      } else {
        scaleRatio = containerHeight / vp.h;
      }
    }
    this._rescale(scaleRatio);
  }
  // ===== PRIVATE METHODS =====
  _rescale(factor) {
    this._scale = factor;
    const vp = this._viewportLoc;
    const width = factor * vp.w + "px";
    const height = factor * vp.h + "px";
    if (this._target.style.width !== width || this._target.style.height !== height) {
      this._target.style.width = width;
      this._target.style.height = height;
    }
  }
  _setFillColor(color) {
    const newStyle = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
    if (newStyle !== this._prevDrawStyle) {
      this._drawCtx.fillStyle = newStyle;
      this._prevDrawStyle = newStyle;
    }
  }
  _renderQPush(action) {
    this._renderQ.push(action);
    if (this._renderQ.length === 1) {
      this._scanRenderQ();
    }
  }
  _resumeRenderQ() {
    this.removeEventListener("load", this._noVNCDisplay._resumeRenderQ);
    this._noVNCDisplay._scanRenderQ();
  }
  _scanRenderQ() {
    let ready = true;
    while (ready && this._renderQ.length > 0) {
      const a2 = this._renderQ[0];
      switch (a2.type) {
        case "flip":
          this.flip(true);
          break;
        case "copy":
          this.copyImage(a2.oldX, a2.oldY, a2.x, a2.y, a2.width, a2.height, true);
          break;
        case "fill":
          this.fillRect(a2.x, a2.y, a2.width, a2.height, a2.color, true);
          break;
        case "blit":
          this.blitImage(a2.x, a2.y, a2.width, a2.height, a2.data, 0, true);
          break;
        case "img":
          if (a2.img.complete) {
            if (a2.img.width !== a2.width || a2.img.height !== a2.height) {
              Error2("Decoded image has incorrect dimensions. Got " + a2.img.width + "x" + a2.img.height + ". Expected " + a2.width + "x" + a2.height + ".");
              return;
            }
            this.drawImage(a2.img, a2.x, a2.y);
            a2.img.src = "";
          } else {
            a2.img._noVNCDisplay = this;
            a2.img.addEventListener("load", this._resumeRenderQ);
            ready = false;
          }
          break;
        case "frame":
          if (a2.frame.ready) {
            let frame = a2.frame.frame;
            if (frame.codedWidth < a2.width || frame.codedHeight < a2.height) {
              Warn("Decoded video frame does not cover its full rectangle area. Expecting at least " + a2.width + "x" + a2.height + " but got " + frame.codedWidth + "x" + frame.codedHeight);
            }
            const sx = 0;
            const sy = 0;
            const sw = a2.width;
            const sh = a2.height;
            const dx = a2.x;
            const dy = a2.y;
            const dw = sw;
            const dh = sh;
            this.drawImage(frame, sx, sy, sw, sh, dx, dy, dw, dh);
            frame.close();
          } else {
            let display = this;
            a2.frame.promise.then(() => {
              display._scanRenderQ();
            });
            ready = false;
          }
          break;
      }
      if (ready) {
        this._renderQ.shift();
      }
    }
    if (this._renderQ.length === 0 && this._flushPromise !== null) {
      this._flushResolve();
      this._flushPromise = null;
      this._flushResolve = null;
    }
  }
};

// node_modules/@novnc/novnc/vendor/pako/lib/utils/common.js
function arraySet(dest, src, src_offs, len, dest_offs) {
  if (src.subarray && dest.subarray) {
    dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
    return;
  }
  for (var i = 0; i < len; i++) {
    dest[dest_offs + i] = src[src_offs + i];
  }
}
var Buf8 = Uint8Array;
var Buf16 = Uint16Array;
var Buf32 = Int32Array;

// node_modules/@novnc/novnc/vendor/pako/lib/zlib/adler32.js
function adler32(adler, buf, len, pos) {
  var s1 = adler & 65535 | 0, s22 = adler >>> 16 & 65535 | 0, n = 0;
  while (len !== 0) {
    n = len > 2e3 ? 2e3 : len;
    len -= n;
    do {
      s1 = s1 + buf[pos++] | 0;
      s22 = s22 + s1 | 0;
    } while (--n);
    s1 %= 65521;
    s22 %= 65521;
  }
  return s1 | s22 << 16 | 0;
}

// node_modules/@novnc/novnc/vendor/pako/lib/zlib/crc32.js
function makeTable() {
  var c2, table = [];
  for (var n = 0; n < 256; n++) {
    c2 = n;
    for (var k = 0; k < 8; k++) {
      c2 = c2 & 1 ? 3988292384 ^ c2 >>> 1 : c2 >>> 1;
    }
    table[n] = c2;
  }
  return table;
}
var crcTable = makeTable();

// node_modules/@novnc/novnc/vendor/pako/lib/zlib/inffast.js
var BAD = 30;
var TYPE = 12;
function inflate_fast(strm, start) {
  var state;
  var _in;
  var last;
  var _out;
  var beg;
  var end;
  var dmax;
  var wsize;
  var whave;
  var wnext;
  var s_window;
  var hold;
  var bits;
  var lcode;
  var dcode;
  var lmask;
  var dmask;
  var here;
  var op;
  var len;
  var dist;
  var from;
  var from_source;
  var input, output;
  state = strm.state;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
  dmax = state.dmax;
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;
  top:
    do {
      if (bits < 15) {
        hold += input[_in++] << bits;
        bits += 8;
        hold += input[_in++] << bits;
        bits += 8;
      }
      here = lcode[hold & lmask];
      dolen:
        for (; ; ) {
          op = here >>> 24;
          hold >>>= op;
          bits -= op;
          op = here >>> 16 & 255;
          if (op === 0) {
            output[_out++] = here & 65535;
          } else if (op & 16) {
            len = here & 65535;
            op &= 15;
            if (op) {
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
              len += hold & (1 << op) - 1;
              hold >>>= op;
              bits -= op;
            }
            if (bits < 15) {
              hold += input[_in++] << bits;
              bits += 8;
              hold += input[_in++] << bits;
              bits += 8;
            }
            here = dcode[hold & dmask];
            dodist:
              for (; ; ) {
                op = here >>> 24;
                hold >>>= op;
                bits -= op;
                op = here >>> 16 & 255;
                if (op & 16) {
                  dist = here & 65535;
                  op &= 15;
                  if (bits < op) {
                    hold += input[_in++] << bits;
                    bits += 8;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                    }
                  }
                  dist += hold & (1 << op) - 1;
                  if (dist > dmax) {
                    strm.msg = "invalid distance too far back";
                    state.mode = BAD;
                    break top;
                  }
                  hold >>>= op;
                  bits -= op;
                  op = _out - beg;
                  if (dist > op) {
                    op = dist - op;
                    if (op > whave) {
                      if (state.sane) {
                        strm.msg = "invalid distance too far back";
                        state.mode = BAD;
                        break top;
                      }
                    }
                    from = 0;
                    from_source = s_window;
                    if (wnext === 0) {
                      from += wsize - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;
                        from_source = output;
                      }
                    } else if (wnext < op) {
                      from += wsize + wnext - op;
                      op -= wnext;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = 0;
                        if (wnext < len) {
                          op = wnext;
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      }
                    } else {
                      from += wnext - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;
                        from_source = output;
                      }
                    }
                    while (len > 2) {
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      len -= 3;
                    }
                    if (len) {
                      output[_out++] = from_source[from++];
                      if (len > 1) {
                        output[_out++] = from_source[from++];
                      }
                    }
                  } else {
                    from = _out - dist;
                    do {
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      len -= 3;
                    } while (len > 2);
                    if (len) {
                      output[_out++] = output[from++];
                      if (len > 1) {
                        output[_out++] = output[from++];
                      }
                    }
                  }
                } else if ((op & 64) === 0) {
                  here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                  continue dodist;
                } else {
                  strm.msg = "invalid distance code";
                  state.mode = BAD;
                  break top;
                }
                break;
              }
          } else if ((op & 64) === 0) {
            here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
            continue dolen;
          } else if (op & 32) {
            state.mode = TYPE;
            break top;
          } else {
            strm.msg = "invalid literal/length code";
            state.mode = BAD;
            break top;
          }
          break;
        }
    } while (_in < last && _out < end);
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
  strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
  state.hold = hold;
  state.bits = bits;
  return;
}

// node_modules/@novnc/novnc/vendor/pako/lib/zlib/inftrees.js
var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
var CODES = 0;
var LENS = 1;
var DISTS = 2;
var lbase = [
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
];
var lext = [
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
];
var dbase = [
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
];
var dext = [
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
];
function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
  var bits = opts.bits;
  var len = 0;
  var sym = 0;
  var min = 0, max = 0;
  var root = 0;
  var curr = 0;
  var drop = 0;
  var left = 0;
  var used = 0;
  var huff = 0;
  var incr;
  var fill;
  var low;
  var mask;
  var next;
  var base = null;
  var base_index = 0;
  var end;
  var count = new Buf16(MAXBITS + 1);
  var offs = new Buf16(MAXBITS + 1);
  var extra = null;
  var extra_index = 0;
  var here_bits, here_op, here_val;
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) {
      break;
    }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    opts.bits = 1;
    return 0;
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) {
      break;
    }
  }
  if (root < min) {
    root = min;
  }
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;
  }
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }
  if (type === CODES) {
    base = extra = work;
    end = 19;
  } else if (type === LENS) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;
  } else {
    base = dbase;
    extra = dext;
    end = -1;
  }
  huff = 0;
  sym = 0;
  len = min;
  next = table_index;
  curr = root;
  drop = 0;
  low = -1;
  used = 1 << root;
  mask = used - 1;
  if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
    return 1;
  }
  for (; ; ) {
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    } else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    } else {
      here_op = 32 + 64;
      here_val = 0;
    }
    incr = 1 << len - drop;
    fill = 1 << curr;
    min = fill;
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
    } while (fill !== 0);
    incr = 1 << len - 1;
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }
    sym++;
    if (--count[len] === 0) {
      if (len === max) {
        break;
      }
      len = lens[lens_index + work[sym]];
    }
    if (len > root && (huff & mask) !== low) {
      if (drop === 0) {
        drop = root;
      }
      next += min;
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) {
          break;
        }
        curr++;
        left <<= 1;
      }
      used += 1 << curr;
      if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
        return 1;
      }
      low = huff & mask;
      table[low] = root << 24 | curr << 16 | next - table_index | 0;
    }
  }
  if (huff !== 0) {
    table[next + huff] = len - drop << 24 | 64 << 16 | 0;
  }
  opts.bits = root;
  return 0;
}

// node_modules/@novnc/novnc/vendor/pako/lib/zlib/inflate.js
var CODES2 = 0;
var LENS2 = 1;
var DISTS2 = 2;
var Z_FINISH = 4;
var Z_BLOCK = 5;
var Z_TREES = 6;
var Z_OK = 0;
var Z_STREAM_END = 1;
var Z_NEED_DICT = 2;
var Z_STREAM_ERROR = -2;
var Z_DATA_ERROR = -3;
var Z_MEM_ERROR = -4;
var Z_BUF_ERROR = -5;
var Z_DEFLATED = 8;
var HEAD = 1;
var FLAGS = 2;
var TIME = 3;
var OS = 4;
var EXLEN = 5;
var EXTRA = 6;
var NAME = 7;
var COMMENT = 8;
var HCRC = 9;
var DICTID = 10;
var DICT = 11;
var TYPE2 = 12;
var TYPEDO = 13;
var STORED = 14;
var COPY_ = 15;
var COPY = 16;
var TABLE = 17;
var LENLENS = 18;
var CODELENS = 19;
var LEN_ = 20;
var LEN = 21;
var LENEXT = 22;
var DIST = 23;
var DISTEXT = 24;
var MATCH = 25;
var LIT = 26;
var CHECK = 27;
var LENGTH = 28;
var DONE = 29;
var BAD2 = 30;
var MEM = 31;
var SYNC = 32;
var ENOUGH_LENS2 = 852;
var ENOUGH_DISTS2 = 592;
var MAX_WBITS = 15;
var DEF_WBITS = MAX_WBITS;
function zswap32(q2) {
  return (q2 >>> 24 & 255) + (q2 >>> 8 & 65280) + ((q2 & 65280) << 8) + ((q2 & 255) << 24);
}
function InflateState() {
  this.mode = 0;
  this.last = false;
  this.wrap = 0;
  this.havedict = false;
  this.flags = 0;
  this.dmax = 0;
  this.check = 0;
  this.total = 0;
  this.head = null;
  this.wbits = 0;
  this.wsize = 0;
  this.whave = 0;
  this.wnext = 0;
  this.window = null;
  this.hold = 0;
  this.bits = 0;
  this.length = 0;
  this.offset = 0;
  this.extra = 0;
  this.lencode = null;
  this.distcode = null;
  this.lenbits = 0;
  this.distbits = 0;
  this.ncode = 0;
  this.nlen = 0;
  this.ndist = 0;
  this.have = 0;
  this.next = null;
  this.lens = new Buf16(320);
  this.work = new Buf16(288);
  this.lendyn = null;
  this.distdyn = null;
  this.sane = 0;
  this.back = 0;
  this.was = 0;
}
function inflateResetKeep(strm) {
  var state;
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR;
  }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = "";
  if (state.wrap) {
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null;
  state.hold = 0;
  state.bits = 0;
  state.lencode = state.lendyn = new Buf32(ENOUGH_LENS2);
  state.distcode = state.distdyn = new Buf32(ENOUGH_DISTS2);
  state.sane = 1;
  state.back = -1;
  return Z_OK;
}
function inflateReset(strm) {
  var state;
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR;
  }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);
}
function inflateReset2(strm, windowBits) {
  var wrap;
  var state;
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR;
  }
  state = strm.state;
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}
function inflateInit2(strm, windowBits) {
  var ret;
  var state;
  if (!strm) {
    return Z_STREAM_ERROR;
  }
  state = new InflateState();
  strm.state = state;
  state.window = null;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null;
  }
  return ret;
}
function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}
var virgin = true;
var lenfix;
var distfix;
function fixedtables(state) {
  if (virgin) {
    var sym;
    lenfix = new Buf32(512);
    distfix = new Buf32(32);
    sym = 0;
    while (sym < 144) {
      state.lens[sym++] = 8;
    }
    while (sym < 256) {
      state.lens[sym++] = 9;
    }
    while (sym < 280) {
      state.lens[sym++] = 7;
    }
    while (sym < 288) {
      state.lens[sym++] = 8;
    }
    inflate_table(LENS2, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
    sym = 0;
    while (sym < 32) {
      state.lens[sym++] = 5;
    }
    inflate_table(DISTS2, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
    virgin = false;
  }
  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;
    state.window = new Buf8(state.wsize);
  }
  if (copy >= state.wsize) {
    arraySet(state.window, src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  } else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    arraySet(state.window, src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      arraySet(state.window, src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    } else {
      state.wnext += dist;
      if (state.wnext === state.wsize) {
        state.wnext = 0;
      }
      if (state.whave < state.wsize) {
        state.whave += dist;
      }
    }
  }
  return 0;
}
function inflate(strm, flush) {
  var state;
  var input, output;
  var next;
  var put;
  var have, left;
  var hold;
  var bits;
  var _in, _out;
  var copy;
  var from;
  var from_source;
  var here = 0;
  var here_bits, here_op, here_val;
  var last_bits, last_op, last_val;
  var len;
  var ret;
  var hbuf = new Buf8(4);
  var opts;
  var n;
  var order = (
    /* permutation of code lengths */
    [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
  );
  if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
    return Z_STREAM_ERROR;
  }
  state = strm.state;
  if (state.mode === TYPE2) {
    state.mode = TYPEDO;
  }
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  _in = have;
  _out = left;
  ret = Z_OK;
  inf_leave:
    for (; ; ) {
      switch (state.mode) {
        case HEAD:
          if (state.wrap === 0) {
            state.mode = TYPEDO;
            break;
          }
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.wrap & 2 && hold === 35615) {
            state.check = 0;
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = makeTable(state.check, hbuf, 2, 0);
            hold = 0;
            bits = 0;
            state.mode = FLAGS;
            break;
          }
          state.flags = 0;
          if (state.head) {
            state.head.done = false;
          }
          if (!(state.wrap & 1) || /* check if zlib header allowed */
          (((hold & 255) << 8) + (hold >> 8)) % 31) {
            strm.msg = "incorrect header check";
            state.mode = BAD2;
            break;
          }
          if ((hold & 15) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD2;
            break;
          }
          hold >>>= 4;
          bits -= 4;
          len = (hold & 15) + 8;
          if (state.wbits === 0) {
            state.wbits = len;
          } else if (len > state.wbits) {
            strm.msg = "invalid window size";
            state.mode = BAD2;
            break;
          }
          state.dmax = 1 << len;
          strm.adler = state.check = 1;
          state.mode = hold & 512 ? DICTID : TYPE2;
          hold = 0;
          bits = 0;
          break;
        case FLAGS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.flags = hold;
          if ((state.flags & 255) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD2;
            break;
          }
          if (state.flags & 57344) {
            strm.msg = "unknown header flags set";
            state.mode = BAD2;
            break;
          }
          if (state.head) {
            state.head.text = hold >> 8 & 1;
          }
          if (state.flags & 512) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = makeTable(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = TIME;
        /* falls through */
        case TIME:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.time = hold;
          }
          if (state.flags & 512) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            hbuf[2] = hold >>> 16 & 255;
            hbuf[3] = hold >>> 24 & 255;
            state.check = makeTable(state.check, hbuf, 4, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = OS;
        /* falls through */
        case OS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.xflags = hold & 255;
            state.head.os = hold >> 8;
          }
          if (state.flags & 512) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = makeTable(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = EXLEN;
        /* falls through */
        case EXLEN:
          if (state.flags & 1024) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length = hold;
            if (state.head) {
              state.head.extra_len = hold;
            }
            if (state.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = makeTable(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
          } else if (state.head) {
            state.head.extra = null;
          }
          state.mode = EXTRA;
        /* falls through */
        case EXTRA:
          if (state.flags & 1024) {
            copy = state.length;
            if (copy > have) {
              copy = have;
            }
            if (copy) {
              if (state.head) {
                len = state.head.extra_len - state.length;
                if (!state.head.extra) {
                  state.head.extra = new Array(state.head.extra_len);
                }
                arraySet(
                  state.head.extra,
                  input,
                  next,
                  // extra field is limited to 65536 bytes
                  // - no need for additional size check
                  copy,
                  /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                  len
                );
              }
              if (state.flags & 512) {
                state.check = makeTable(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              state.length -= copy;
            }
            if (state.length) {
              break inf_leave;
            }
          }
          state.length = 0;
          state.mode = NAME;
        /* falls through */
        case NAME:
          if (state.flags & 2048) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.name += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512) {
              state.check = makeTable(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.name = null;
          }
          state.length = 0;
          state.mode = COMMENT;
        /* falls through */
        case COMMENT:
          if (state.flags & 4096) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.comment += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512) {
              state.check = makeTable(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.comment = null;
          }
          state.mode = HCRC;
        /* falls through */
        case HCRC:
          if (state.flags & 512) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (hold !== (state.check & 65535)) {
              strm.msg = "header crc mismatch";
              state.mode = BAD2;
              break;
            }
            hold = 0;
            bits = 0;
          }
          if (state.head) {
            state.head.hcrc = state.flags >> 9 & 1;
            state.head.done = true;
          }
          strm.adler = state.check = 0;
          state.mode = TYPE2;
          break;
        case DICTID:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          strm.adler = state.check = zswap32(hold);
          hold = 0;
          bits = 0;
          state.mode = DICT;
        /* falls through */
        case DICT:
          if (state.havedict === 0) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            return Z_NEED_DICT;
          }
          strm.adler = state.check = 1;
          state.mode = TYPE2;
        /* falls through */
        case TYPE2:
          if (flush === Z_BLOCK || flush === Z_TREES) {
            break inf_leave;
          }
        /* falls through */
        case TYPEDO:
          if (state.last) {
            hold >>>= bits & 7;
            bits -= bits & 7;
            state.mode = CHECK;
            break;
          }
          while (bits < 3) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.last = hold & 1;
          hold >>>= 1;
          bits -= 1;
          switch (hold & 3) {
            case 0:
              state.mode = STORED;
              break;
            case 1:
              fixedtables(state);
              state.mode = LEN_;
              if (flush === Z_TREES) {
                hold >>>= 2;
                bits -= 2;
                break inf_leave;
              }
              break;
            case 2:
              state.mode = TABLE;
              break;
            case 3:
              strm.msg = "invalid block type";
              state.mode = BAD2;
          }
          hold >>>= 2;
          bits -= 2;
          break;
        case STORED:
          hold >>>= bits & 7;
          bits -= bits & 7;
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
            strm.msg = "invalid stored block lengths";
            state.mode = BAD2;
            break;
          }
          state.length = hold & 65535;
          hold = 0;
          bits = 0;
          state.mode = COPY_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        /* falls through */
        case COPY_:
          state.mode = COPY;
        /* falls through */
        case COPY:
          copy = state.length;
          if (copy) {
            if (copy > have) {
              copy = have;
            }
            if (copy > left) {
              copy = left;
            }
            if (copy === 0) {
              break inf_leave;
            }
            arraySet(output, input, next, copy, put);
            have -= copy;
            next += copy;
            left -= copy;
            put += copy;
            state.length -= copy;
            break;
          }
          state.mode = TYPE2;
          break;
        case TABLE:
          while (bits < 14) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.nlen = (hold & 31) + 257;
          hold >>>= 5;
          bits -= 5;
          state.ndist = (hold & 31) + 1;
          hold >>>= 5;
          bits -= 5;
          state.ncode = (hold & 15) + 4;
          hold >>>= 4;
          bits -= 4;
          if (state.nlen > 286 || state.ndist > 30) {
            strm.msg = "too many length or distance symbols";
            state.mode = BAD2;
            break;
          }
          state.have = 0;
          state.mode = LENLENS;
        /* falls through */
        case LENLENS:
          while (state.have < state.ncode) {
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.lens[order[state.have++]] = hold & 7;
            hold >>>= 3;
            bits -= 3;
          }
          while (state.have < 19) {
            state.lens[order[state.have++]] = 0;
          }
          state.lencode = state.lendyn;
          state.lenbits = 7;
          opts = { bits: state.lenbits };
          ret = inflate_table(CODES2, state.lens, 0, 19, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid code lengths set";
            state.mode = BAD2;
            break;
          }
          state.have = 0;
          state.mode = CODELENS;
        /* falls through */
        case CODELENS:
          while (state.have < state.nlen + state.ndist) {
            for (; ; ) {
              here = state.lencode[hold & (1 << state.lenbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (here_val < 16) {
              hold >>>= here_bits;
              bits -= here_bits;
              state.lens[state.have++] = here_val;
            } else {
              if (here_val === 16) {
                n = here_bits + 2;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                if (state.have === 0) {
                  strm.msg = "invalid bit length repeat";
                  state.mode = BAD2;
                  break;
                }
                len = state.lens[state.have - 1];
                copy = 3 + (hold & 3);
                hold >>>= 2;
                bits -= 2;
              } else if (here_val === 17) {
                n = here_bits + 3;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 3 + (hold & 7);
                hold >>>= 3;
                bits -= 3;
              } else {
                n = here_bits + 7;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 11 + (hold & 127);
                hold >>>= 7;
                bits -= 7;
              }
              if (state.have + copy > state.nlen + state.ndist) {
                strm.msg = "invalid bit length repeat";
                state.mode = BAD2;
                break;
              }
              while (copy--) {
                state.lens[state.have++] = len;
              }
            }
          }
          if (state.mode === BAD2) {
            break;
          }
          if (state.lens[256] === 0) {
            strm.msg = "invalid code -- missing end-of-block";
            state.mode = BAD2;
            break;
          }
          state.lenbits = 9;
          opts = { bits: state.lenbits };
          ret = inflate_table(LENS2, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid literal/lengths set";
            state.mode = BAD2;
            break;
          }
          state.distbits = 6;
          state.distcode = state.distdyn;
          opts = { bits: state.distbits };
          ret = inflate_table(DISTS2, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
          state.distbits = opts.bits;
          if (ret) {
            strm.msg = "invalid distances set";
            state.mode = BAD2;
            break;
          }
          state.mode = LEN_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        /* falls through */
        case LEN_:
          state.mode = LEN;
        /* falls through */
        case LEN:
          if (have >= 6 && left >= 258) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            inflate_fast(strm, _out);
            put = strm.next_out;
            output = strm.output;
            left = strm.avail_out;
            next = strm.next_in;
            input = strm.input;
            have = strm.avail_in;
            hold = state.hold;
            bits = state.bits;
            if (state.mode === TYPE2) {
              state.back = -1;
            }
            break;
          }
          state.back = 0;
          for (; ; ) {
            here = state.lencode[hold & (1 << state.lenbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (here_op && (here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (; ; ) {
              here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          state.length = here_val;
          if (here_op === 0) {
            state.mode = LIT;
            break;
          }
          if (here_op & 32) {
            state.back = -1;
            state.mode = TYPE2;
            break;
          }
          if (here_op & 64) {
            strm.msg = "invalid literal/length code";
            state.mode = BAD2;
            break;
          }
          state.extra = here_op & 15;
          state.mode = LENEXT;
        /* falls through */
        case LENEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          state.was = state.length;
          state.mode = DIST;
        /* falls through */
        case DIST:
          for (; ; ) {
            here = state.distcode[hold & (1 << state.distbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (; ; ) {
              here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          if (here_op & 64) {
            strm.msg = "invalid distance code";
            state.mode = BAD2;
            break;
          }
          state.offset = here_val;
          state.extra = here_op & 15;
          state.mode = DISTEXT;
        /* falls through */
        case DISTEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.offset += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          if (state.offset > state.dmax) {
            strm.msg = "invalid distance too far back";
            state.mode = BAD2;
            break;
          }
          state.mode = MATCH;
        /* falls through */
        case MATCH:
          if (left === 0) {
            break inf_leave;
          }
          copy = _out - left;
          if (state.offset > copy) {
            copy = state.offset - copy;
            if (copy > state.whave) {
              if (state.sane) {
                strm.msg = "invalid distance too far back";
                state.mode = BAD2;
                break;
              }
            }
            if (copy > state.wnext) {
              copy -= state.wnext;
              from = state.wsize - copy;
            } else {
              from = state.wnext - copy;
            }
            if (copy > state.length) {
              copy = state.length;
            }
            from_source = state.window;
          } else {
            from_source = output;
            from = put - state.offset;
            copy = state.length;
          }
          if (copy > left) {
            copy = left;
          }
          left -= copy;
          state.length -= copy;
          do {
            output[put++] = from_source[from++];
          } while (--copy);
          if (state.length === 0) {
            state.mode = LEN;
          }
          break;
        case LIT:
          if (left === 0) {
            break inf_leave;
          }
          output[put++] = state.length;
          left--;
          state.mode = LEN;
          break;
        case CHECK:
          if (state.wrap) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold |= input[next++] << bits;
              bits += 8;
            }
            _out -= left;
            strm.total_out += _out;
            state.total += _out;
            if (_out) {
              strm.adler = state.check = /*UPDATE(state.check, put - _out, _out);*/
              state.flags ? makeTable(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out);
            }
            _out = left;
            if ((state.flags ? hold : zswap32(hold)) !== state.check) {
              strm.msg = "incorrect data check";
              state.mode = BAD2;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = LENGTH;
        /* falls through */
        case LENGTH:
          if (state.wrap && state.flags) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (hold !== (state.total & 4294967295)) {
              strm.msg = "incorrect length check";
              state.mode = BAD2;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = DONE;
        /* falls through */
        case DONE:
          ret = Z_STREAM_END;
          break inf_leave;
        case BAD2:
          ret = Z_DATA_ERROR;
          break inf_leave;
        case MEM:
          return Z_MEM_ERROR;
        case SYNC:
        /* falls through */
        default:
          return Z_STREAM_ERROR;
      }
    }
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  if (state.wsize || _out !== strm.avail_out && state.mode < BAD2 && (state.mode < CHECK || flush !== Z_FINISH)) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
    state.flags ? makeTable(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out);
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE2 ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if ((_in === 0 && _out === 0 || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
}

// node_modules/@novnc/novnc/vendor/pako/lib/zlib/zstream.js
function ZStream() {
  this.input = null;
  this.next_in = 0;
  this.avail_in = 0;
  this.total_in = 0;
  this.output = null;
  this.next_out = 0;
  this.avail_out = 0;
  this.total_out = 0;
  this.msg = "";
  this.state = null;
  this.data_type = 2;
  this.adler = 0;
}

// node_modules/@novnc/novnc/core/inflator.js
var Inflate = class {
  constructor() {
    this.strm = new ZStream();
    this.chunkSize = 1024 * 10 * 10;
    this.strm.output = new Uint8Array(this.chunkSize);
    inflateInit(this.strm);
  }
  setInput(data) {
    if (!data) {
      this.strm.input = null;
      this.strm.avail_in = 0;
      this.strm.next_in = 0;
    } else {
      this.strm.input = data;
      this.strm.avail_in = this.strm.input.length;
      this.strm.next_in = 0;
    }
  }
  inflate(expected) {
    if (expected > this.chunkSize) {
      this.chunkSize = expected;
      this.strm.output = new Uint8Array(this.chunkSize);
    }
    this.strm.next_out = 0;
    this.strm.avail_out = expected;
    let ret = inflate(this.strm, 0);
    if (ret < 0) {
      throw new Error("zlib inflate failed");
    }
    if (this.strm.next_out != expected) {
      throw new Error("Incomplete zlib block");
    }
    return new Uint8Array(this.strm.output.buffer, 0, this.strm.next_out);
  }
  reset() {
    inflateReset(this.strm);
  }
};

// node_modules/@novnc/novnc/vendor/pako/lib/zlib/trees.js
var Z_FIXED = 4;
var Z_BINARY = 0;
var Z_TEXT = 1;
var Z_UNKNOWN = 2;
function zero(buf) {
  var len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
}
var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES = 2;
var MIN_MATCH = 3;
var MAX_MATCH = 258;
var LENGTH_CODES = 29;
var LITERALS = 256;
var L_CODES = LITERALS + 1 + LENGTH_CODES;
var D_CODES = 30;
var BL_CODES = 19;
var HEAP_SIZE = 2 * L_CODES + 1;
var MAX_BITS = 15;
var Buf_size = 16;
var MAX_BL_BITS = 7;
var END_BLOCK = 256;
var REP_3_6 = 16;
var REPZ_3_10 = 17;
var REPZ_11_138 = 18;
var extra_lbits = (
  /* extra bits for each length code */
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
);
var extra_dbits = (
  /* extra bits for each distance code */
  [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
);
var extra_blbits = (
  /* extra bits for each bit length code */
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
);
var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
var DIST_CODE_LEN = 512;
var static_ltree = new Array((L_CODES + 2) * 2);
zero(static_ltree);
var static_dtree = new Array(D_CODES * 2);
zero(static_dtree);
var _dist_code = new Array(DIST_CODE_LEN);
zero(_dist_code);
var _length_code = new Array(MAX_MATCH - MIN_MATCH + 1);
zero(_length_code);
var base_length = new Array(LENGTH_CODES);
zero(base_length);
var base_dist = new Array(D_CODES);
zero(base_dist);
function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
  this.static_tree = static_tree;
  this.extra_bits = extra_bits;
  this.extra_base = extra_base;
  this.elems = elems;
  this.max_length = max_length;
  this.has_stree = static_tree && static_tree.length;
}
var static_l_desc;
var static_d_desc;
var static_bl_desc;
function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;
  this.max_code = 0;
  this.stat_desc = stat_desc;
}
function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}
function put_short(s15, w) {
  s15.pending_buf[s15.pending++] = w & 255;
  s15.pending_buf[s15.pending++] = w >>> 8 & 255;
}
function send_bits(s15, value, length) {
  if (s15.bi_valid > Buf_size - length) {
    s15.bi_buf |= value << s15.bi_valid & 65535;
    put_short(s15, s15.bi_buf);
    s15.bi_buf = value >> Buf_size - s15.bi_valid;
    s15.bi_valid += length - Buf_size;
  } else {
    s15.bi_buf |= value << s15.bi_valid & 65535;
    s15.bi_valid += length;
  }
}
function send_code(s15, c2, tree) {
  send_bits(
    s15,
    tree[c2 * 2],
    tree[c2 * 2 + 1]
    /*.Len*/
  );
}
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}
function bi_flush(s15) {
  if (s15.bi_valid === 16) {
    put_short(s15, s15.bi_buf);
    s15.bi_buf = 0;
    s15.bi_valid = 0;
  } else if (s15.bi_valid >= 8) {
    s15.pending_buf[s15.pending++] = s15.bi_buf & 255;
    s15.bi_buf >>= 8;
    s15.bi_valid -= 8;
  }
}
function gen_bitlen(s15, desc) {
  var tree = desc.dyn_tree;
  var max_code = desc.max_code;
  var stree = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var extra = desc.stat_desc.extra_bits;
  var base = desc.stat_desc.extra_base;
  var max_length = desc.stat_desc.max_length;
  var h2;
  var n, m;
  var bits;
  var xbits;
  var f2;
  var overflow = 0;
  for (bits = 0; bits <= MAX_BITS; bits++) {
    s15.bl_count[bits] = 0;
  }
  tree[s15.heap[s15.heap_max] * 2 + 1] = 0;
  for (h2 = s15.heap_max + 1; h2 < HEAP_SIZE; h2++) {
    n = s15.heap[h2];
    bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1] = bits;
    if (n > max_code) {
      continue;
    }
    s15.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f2 = tree[n * 2];
    s15.opt_len += f2 * (bits + xbits);
    if (has_stree) {
      s15.static_len += f2 * (stree[n * 2 + 1] + xbits);
    }
  }
  if (overflow === 0) {
    return;
  }
  do {
    bits = max_length - 1;
    while (s15.bl_count[bits] === 0) {
      bits--;
    }
    s15.bl_count[bits]--;
    s15.bl_count[bits + 1] += 2;
    s15.bl_count[max_length]--;
    overflow -= 2;
  } while (overflow > 0);
  for (bits = max_length; bits !== 0; bits--) {
    n = s15.bl_count[bits];
    while (n !== 0) {
      m = s15.heap[--h2];
      if (m > max_code) {
        continue;
      }
      if (tree[m * 2 + 1] !== bits) {
        s15.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
        tree[m * 2 + 1] = bits;
      }
      n--;
    }
  }
}
function gen_codes(tree, max_code, bl_count) {
  var next_code = new Array(MAX_BITS + 1);
  var code = 0;
  var bits;
  var n;
  for (bits = 1; bits <= MAX_BITS; bits++) {
    next_code[bits] = code = code + bl_count[bits - 1] << 1;
  }
  for (n = 0; n <= max_code; n++) {
    var len = tree[n * 2 + 1];
    if (len === 0) {
      continue;
    }
    tree[n * 2] = bi_reverse(next_code[len]++, len);
  }
}
function tr_static_init() {
  var n;
  var bits;
  var length;
  var code;
  var dist;
  var bl_count = new Array(MAX_BITS + 1);
  length = 0;
  for (code = 0; code < LENGTH_CODES - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < 1 << extra_lbits[code]; n++) {
      _length_code[length++] = code;
    }
  }
  _length_code[length - 1] = code;
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < 1 << extra_dbits[code]; n++) {
      _dist_code[dist++] = code;
    }
  }
  dist >>= 7;
  for (; code < D_CODES; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }
  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1] = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1] = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  gen_codes(static_ltree, L_CODES + 1, bl_count);
  for (n = 0; n < D_CODES; n++) {
    static_dtree[n * 2 + 1] = 5;
    static_dtree[n * 2] = bi_reverse(n, 5);
  }
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES, MAX_BITS);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES, MAX_BL_BITS);
}
function init_block(s15) {
  var n;
  for (n = 0; n < L_CODES; n++) {
    s15.dyn_ltree[n * 2] = 0;
  }
  for (n = 0; n < D_CODES; n++) {
    s15.dyn_dtree[n * 2] = 0;
  }
  for (n = 0; n < BL_CODES; n++) {
    s15.bl_tree[n * 2] = 0;
  }
  s15.dyn_ltree[END_BLOCK * 2] = 1;
  s15.opt_len = s15.static_len = 0;
  s15.last_lit = s15.matches = 0;
}
function bi_windup(s15) {
  if (s15.bi_valid > 8) {
    put_short(s15, s15.bi_buf);
  } else if (s15.bi_valid > 0) {
    s15.pending_buf[s15.pending++] = s15.bi_buf;
  }
  s15.bi_buf = 0;
  s15.bi_valid = 0;
}
function copy_block(s15, buf, len, header) {
  bi_windup(s15);
  if (header) {
    put_short(s15, len);
    put_short(s15, ~len);
  }
  arraySet(s15.pending_buf, s15.window, buf, len, s15.pending);
  s15.pending += len;
}
function smaller(tree, n, m, depth) {
  var _n2 = n * 2;
  var _m2 = m * 2;
  return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
}
function pqdownheap(s15, tree, k) {
  var v2 = s15.heap[k];
  var j2 = k << 1;
  while (j2 <= s15.heap_len) {
    if (j2 < s15.heap_len && smaller(tree, s15.heap[j2 + 1], s15.heap[j2], s15.depth)) {
      j2++;
    }
    if (smaller(tree, v2, s15.heap[j2], s15.depth)) {
      break;
    }
    s15.heap[k] = s15.heap[j2];
    k = j2;
    j2 <<= 1;
  }
  s15.heap[k] = v2;
}
function compress_block(s15, ltree, dtree) {
  var dist;
  var lc;
  var lx = 0;
  var code;
  var extra;
  if (s15.last_lit !== 0) {
    do {
      dist = s15.pending_buf[s15.d_buf + lx * 2] << 8 | s15.pending_buf[s15.d_buf + lx * 2 + 1];
      lc = s15.pending_buf[s15.l_buf + lx];
      lx++;
      if (dist === 0) {
        send_code(s15, lc, ltree);
      } else {
        code = _length_code[lc];
        send_code(s15, code + LITERALS + 1, ltree);
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s15, lc, extra);
        }
        dist--;
        code = d_code(dist);
        send_code(s15, code, dtree);
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s15, dist, extra);
        }
      }
    } while (lx < s15.last_lit);
  }
  send_code(s15, END_BLOCK, ltree);
}
function build_tree(s15, desc) {
  var tree = desc.dyn_tree;
  var stree = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems = desc.stat_desc.elems;
  var n, m;
  var max_code = -1;
  var node;
  s15.heap_len = 0;
  s15.heap_max = HEAP_SIZE;
  for (n = 0; n < elems; n++) {
    if (tree[n * 2] !== 0) {
      s15.heap[++s15.heap_len] = max_code = n;
      s15.depth[n] = 0;
    } else {
      tree[n * 2 + 1] = 0;
    }
  }
  while (s15.heap_len < 2) {
    node = s15.heap[++s15.heap_len] = max_code < 2 ? ++max_code : 0;
    tree[node * 2] = 1;
    s15.depth[node] = 0;
    s15.opt_len--;
    if (has_stree) {
      s15.static_len -= stree[node * 2 + 1];
    }
  }
  desc.max_code = max_code;
  for (n = s15.heap_len >> 1; n >= 1; n--) {
    pqdownheap(s15, tree, n);
  }
  node = elems;
  do {
    n = s15.heap[
      1
      /*SMALLEST*/
    ];
    s15.heap[
      1
      /*SMALLEST*/
    ] = s15.heap[s15.heap_len--];
    pqdownheap(
      s15,
      tree,
      1
      /*SMALLEST*/
    );
    m = s15.heap[
      1
      /*SMALLEST*/
    ];
    s15.heap[--s15.heap_max] = n;
    s15.heap[--s15.heap_max] = m;
    tree[node * 2] = tree[n * 2] + tree[m * 2];
    s15.depth[node] = (s15.depth[n] >= s15.depth[m] ? s15.depth[n] : s15.depth[m]) + 1;
    tree[n * 2 + 1] = tree[m * 2 + 1] = node;
    s15.heap[
      1
      /*SMALLEST*/
    ] = node++;
    pqdownheap(
      s15,
      tree,
      1
      /*SMALLEST*/
    );
  } while (s15.heap_len >= 2);
  s15.heap[--s15.heap_max] = s15.heap[
    1
    /*SMALLEST*/
  ];
  gen_bitlen(s15, desc);
  gen_codes(tree, max_code, s15.bl_count);
}
function scan_tree(s15, tree, max_code) {
  var n;
  var prevlen = -1;
  var curlen;
  var nextlen = tree[0 * 2 + 1];
  var count = 0;
  var max_count = 7;
  var min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1] = 65535;
  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      s15.bl_tree[curlen * 2] += count;
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        s15.bl_tree[curlen * 2]++;
      }
      s15.bl_tree[REP_3_6 * 2]++;
    } else if (count <= 10) {
      s15.bl_tree[REPZ_3_10 * 2]++;
    } else {
      s15.bl_tree[REPZ_11_138 * 2]++;
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}
function send_tree(s15, tree, max_code) {
  var n;
  var prevlen = -1;
  var curlen;
  var nextlen = tree[0 * 2 + 1];
  var count = 0;
  var max_count = 7;
  var min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      do {
        send_code(s15, curlen, s15.bl_tree);
      } while (--count !== 0);
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s15, curlen, s15.bl_tree);
        count--;
      }
      send_code(s15, REP_3_6, s15.bl_tree);
      send_bits(s15, count - 3, 2);
    } else if (count <= 10) {
      send_code(s15, REPZ_3_10, s15.bl_tree);
      send_bits(s15, count - 3, 3);
    } else {
      send_code(s15, REPZ_11_138, s15.bl_tree);
      send_bits(s15, count - 11, 7);
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}
function build_bl_tree(s15) {
  var max_blindex;
  scan_tree(s15, s15.dyn_ltree, s15.l_desc.max_code);
  scan_tree(s15, s15.dyn_dtree, s15.d_desc.max_code);
  build_tree(s15, s15.bl_desc);
  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
    if (s15.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
      break;
    }
  }
  s15.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  return max_blindex;
}
function send_all_trees(s15, lcodes, dcodes, blcodes) {
  var rank2;
  send_bits(s15, lcodes - 257, 5);
  send_bits(s15, dcodes - 1, 5);
  send_bits(s15, blcodes - 4, 4);
  for (rank2 = 0; rank2 < blcodes; rank2++) {
    send_bits(s15, s15.bl_tree[bl_order[rank2] * 2 + 1], 3);
  }
  send_tree(s15, s15.dyn_ltree, lcodes - 1);
  send_tree(s15, s15.dyn_dtree, dcodes - 1);
}
function detect_data_type(s15) {
  var black_mask = 4093624447;
  var n;
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if (black_mask & 1 && s15.dyn_ltree[n * 2] !== 0) {
      return Z_BINARY;
    }
  }
  if (s15.dyn_ltree[9 * 2] !== 0 || s15.dyn_ltree[10 * 2] !== 0 || s15.dyn_ltree[13 * 2] !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS; n++) {
    if (s15.dyn_ltree[n * 2] !== 0) {
      return Z_TEXT;
    }
  }
  return Z_BINARY;
}
var static_init_done = false;
function _tr_init(s15) {
  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }
  s15.l_desc = new TreeDesc(s15.dyn_ltree, static_l_desc);
  s15.d_desc = new TreeDesc(s15.dyn_dtree, static_d_desc);
  s15.bl_desc = new TreeDesc(s15.bl_tree, static_bl_desc);
  s15.bi_buf = 0;
  s15.bi_valid = 0;
  init_block(s15);
}
function _tr_stored_block(s15, buf, stored_len, last) {
  send_bits(s15, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
  copy_block(s15, buf, stored_len, true);
}
function _tr_align(s15) {
  send_bits(s15, STATIC_TREES << 1, 3);
  send_code(s15, END_BLOCK, static_ltree);
  bi_flush(s15);
}
function _tr_flush_block(s15, buf, stored_len, last) {
  var opt_lenb, static_lenb;
  var max_blindex = 0;
  if (s15.level > 0) {
    if (s15.strm.data_type === Z_UNKNOWN) {
      s15.strm.data_type = detect_data_type(s15);
    }
    build_tree(s15, s15.l_desc);
    build_tree(s15, s15.d_desc);
    max_blindex = build_bl_tree(s15);
    opt_lenb = s15.opt_len + 3 + 7 >>> 3;
    static_lenb = s15.static_len + 3 + 7 >>> 3;
    if (static_lenb <= opt_lenb) {
      opt_lenb = static_lenb;
    }
  } else {
    opt_lenb = static_lenb = stored_len + 5;
  }
  if (stored_len + 4 <= opt_lenb && buf !== -1) {
    _tr_stored_block(s15, buf, stored_len, last);
  } else if (s15.strategy === Z_FIXED || static_lenb === opt_lenb) {
    send_bits(s15, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s15, static_ltree, static_dtree);
  } else {
    send_bits(s15, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s15, s15.l_desc.max_code + 1, s15.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s15, s15.dyn_ltree, s15.dyn_dtree);
  }
  init_block(s15);
  if (last) {
    bi_windup(s15);
  }
}
function _tr_tally(s15, dist, lc) {
  s15.pending_buf[s15.d_buf + s15.last_lit * 2] = dist >>> 8 & 255;
  s15.pending_buf[s15.d_buf + s15.last_lit * 2 + 1] = dist & 255;
  s15.pending_buf[s15.l_buf + s15.last_lit] = lc & 255;
  s15.last_lit++;
  if (dist === 0) {
    s15.dyn_ltree[lc * 2]++;
  } else {
    s15.matches++;
    dist--;
    s15.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]++;
    s15.dyn_dtree[d_code(dist) * 2]++;
  }
  return s15.last_lit === s15.lit_bufsize - 1;
}

// node_modules/@novnc/novnc/vendor/pako/lib/zlib/messages.js
var messages_default = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
};

// node_modules/@novnc/novnc/vendor/pako/lib/zlib/deflate.js
var Z_NO_FLUSH = 0;
var Z_PARTIAL_FLUSH = 1;
var Z_FULL_FLUSH = 3;
var Z_FINISH2 = 4;
var Z_BLOCK2 = 5;
var Z_OK2 = 0;
var Z_STREAM_END2 = 1;
var Z_STREAM_ERROR2 = -2;
var Z_BUF_ERROR2 = -5;
var Z_DEFAULT_COMPRESSION = -1;
var Z_FILTERED = 1;
var Z_HUFFMAN_ONLY = 2;
var Z_RLE = 3;
var Z_FIXED2 = 4;
var Z_DEFAULT_STRATEGY = 0;
var Z_UNKNOWN2 = 2;
var Z_DEFLATED2 = 8;
var MAX_MEM_LEVEL = 9;
var MAX_WBITS2 = 15;
var DEF_MEM_LEVEL = 8;
var LENGTH_CODES2 = 29;
var LITERALS2 = 256;
var L_CODES2 = LITERALS2 + 1 + LENGTH_CODES2;
var D_CODES2 = 30;
var BL_CODES2 = 19;
var HEAP_SIZE2 = 2 * L_CODES2 + 1;
var MAX_BITS2 = 15;
var MIN_MATCH2 = 3;
var MAX_MATCH2 = 258;
var MIN_LOOKAHEAD = MAX_MATCH2 + MIN_MATCH2 + 1;
var PRESET_DICT = 32;
var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;
var BS_NEED_MORE = 1;
var BS_BLOCK_DONE = 2;
var BS_FINISH_STARTED = 3;
var BS_FINISH_DONE = 4;
var OS_CODE = 3;
function err(strm, errorCode) {
  strm.msg = messages_default[errorCode];
  return errorCode;
}
function rank(f2) {
  return (f2 << 1) - (f2 > 4 ? 9 : 0);
}
function zero2(buf) {
  var len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
}
function flush_pending(strm) {
  var s15 = strm.state;
  var len = s15.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) {
    return;
  }
  arraySet(strm.output, s15.pending_buf, s15.pending_out, len, strm.next_out);
  strm.next_out += len;
  s15.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s15.pending -= len;
  if (s15.pending === 0) {
    s15.pending_out = 0;
  }
}
function flush_block_only(s15, last) {
  _tr_flush_block(s15, s15.block_start >= 0 ? s15.block_start : -1, s15.strstart - s15.block_start, last);
  s15.block_start = s15.strstart;
  flush_pending(s15.strm);
}
function put_byte(s15, b3) {
  s15.pending_buf[s15.pending++] = b3;
}
function putShortMSB(s15, b3) {
  s15.pending_buf[s15.pending++] = b3 >>> 8 & 255;
  s15.pending_buf[s15.pending++] = b3 & 255;
}
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;
  if (len > size) {
    len = size;
  }
  if (len === 0) {
    return 0;
  }
  strm.avail_in -= len;
  arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  } else if (strm.state.wrap === 2) {
    strm.adler = makeTable(strm.adler, buf, len, start);
  }
  strm.next_in += len;
  strm.total_in += len;
  return len;
}
function longest_match(s15, cur_match) {
  var chain_length = s15.max_chain_length;
  var scan = s15.strstart;
  var match;
  var len;
  var best_len = s15.prev_length;
  var nice_match = s15.nice_match;
  var limit = s15.strstart > s15.w_size - MIN_LOOKAHEAD ? s15.strstart - (s15.w_size - MIN_LOOKAHEAD) : 0;
  var _win = s15.window;
  var wmask = s15.w_mask;
  var prev = s15.prev;
  var strend = s15.strstart + MAX_MATCH2;
  var scan_end1 = _win[scan + best_len - 1];
  var scan_end = _win[scan + best_len];
  if (s15.prev_length >= s15.good_match) {
    chain_length >>= 2;
  }
  if (nice_match > s15.lookahead) {
    nice_match = s15.lookahead;
  }
  do {
    match = cur_match;
    if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
      continue;
    }
    scan += 2;
    match++;
    do {
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
    len = MAX_MATCH2 - (strend - scan);
    scan = strend - MAX_MATCH2;
    if (len > best_len) {
      s15.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1 = _win[scan + best_len - 1];
      scan_end = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
  if (best_len <= s15.lookahead) {
    return best_len;
  }
  return s15.lookahead;
}
function fill_window(s15) {
  var _w_size = s15.w_size;
  var p, n, m, more, str;
  do {
    more = s15.window_size - s15.lookahead - s15.strstart;
    if (s15.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
      arraySet(s15.window, s15.window, _w_size, _w_size, 0);
      s15.match_start -= _w_size;
      s15.strstart -= _w_size;
      s15.block_start -= _w_size;
      n = s15.hash_size;
      p = n;
      do {
        m = s15.head[--p];
        s15.head[p] = m >= _w_size ? m - _w_size : 0;
      } while (--n);
      n = _w_size;
      p = n;
      do {
        m = s15.prev[--p];
        s15.prev[p] = m >= _w_size ? m - _w_size : 0;
      } while (--n);
      more += _w_size;
    }
    if (s15.strm.avail_in === 0) {
      break;
    }
    n = read_buf(s15.strm, s15.window, s15.strstart + s15.lookahead, more);
    s15.lookahead += n;
    if (s15.lookahead + s15.insert >= MIN_MATCH2) {
      str = s15.strstart - s15.insert;
      s15.ins_h = s15.window[str];
      s15.ins_h = (s15.ins_h << s15.hash_shift ^ s15.window[str + 1]) & s15.hash_mask;
      while (s15.insert) {
        s15.ins_h = (s15.ins_h << s15.hash_shift ^ s15.window[str + MIN_MATCH2 - 1]) & s15.hash_mask;
        s15.prev[str & s15.w_mask] = s15.head[s15.ins_h];
        s15.head[s15.ins_h] = str;
        str++;
        s15.insert--;
        if (s15.lookahead + s15.insert < MIN_MATCH2) {
          break;
        }
      }
    }
  } while (s15.lookahead < MIN_LOOKAHEAD && s15.strm.avail_in !== 0);
}
function deflate_stored(s15, flush) {
  var max_block_size = 65535;
  if (max_block_size > s15.pending_buf_size - 5) {
    max_block_size = s15.pending_buf_size - 5;
  }
  for (; ; ) {
    if (s15.lookahead <= 1) {
      fill_window(s15);
      if (s15.lookahead === 0 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s15.lookahead === 0) {
        break;
      }
    }
    s15.strstart += s15.lookahead;
    s15.lookahead = 0;
    var max_start = s15.block_start + max_block_size;
    if (s15.strstart === 0 || s15.strstart >= max_start) {
      s15.lookahead = s15.strstart - max_start;
      s15.strstart = max_start;
      flush_block_only(s15, false);
      if (s15.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    if (s15.strstart - s15.block_start >= s15.w_size - MIN_LOOKAHEAD) {
      flush_block_only(s15, false);
      if (s15.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s15.insert = 0;
  if (flush === Z_FINISH2) {
    flush_block_only(s15, true);
    if (s15.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s15.strstart > s15.block_start) {
    flush_block_only(s15, false);
    if (s15.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_NEED_MORE;
}
function deflate_fast(s15, flush) {
  var hash_head;
  var bflush;
  for (; ; ) {
    if (s15.lookahead < MIN_LOOKAHEAD) {
      fill_window(s15);
      if (s15.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s15.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s15.lookahead >= MIN_MATCH2) {
      s15.ins_h = (s15.ins_h << s15.hash_shift ^ s15.window[s15.strstart + MIN_MATCH2 - 1]) & s15.hash_mask;
      hash_head = s15.prev[s15.strstart & s15.w_mask] = s15.head[s15.ins_h];
      s15.head[s15.ins_h] = s15.strstart;
    }
    if (hash_head !== 0 && s15.strstart - hash_head <= s15.w_size - MIN_LOOKAHEAD) {
      s15.match_length = longest_match(s15, hash_head);
    }
    if (s15.match_length >= MIN_MATCH2) {
      bflush = _tr_tally(s15, s15.strstart - s15.match_start, s15.match_length - MIN_MATCH2);
      s15.lookahead -= s15.match_length;
      if (s15.match_length <= s15.max_lazy_match && s15.lookahead >= MIN_MATCH2) {
        s15.match_length--;
        do {
          s15.strstart++;
          s15.ins_h = (s15.ins_h << s15.hash_shift ^ s15.window[s15.strstart + MIN_MATCH2 - 1]) & s15.hash_mask;
          hash_head = s15.prev[s15.strstart & s15.w_mask] = s15.head[s15.ins_h];
          s15.head[s15.ins_h] = s15.strstart;
        } while (--s15.match_length !== 0);
        s15.strstart++;
      } else {
        s15.strstart += s15.match_length;
        s15.match_length = 0;
        s15.ins_h = s15.window[s15.strstart];
        s15.ins_h = (s15.ins_h << s15.hash_shift ^ s15.window[s15.strstart + 1]) & s15.hash_mask;
      }
    } else {
      bflush = _tr_tally(s15, 0, s15.window[s15.strstart]);
      s15.lookahead--;
      s15.strstart++;
    }
    if (bflush) {
      flush_block_only(s15, false);
      if (s15.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s15.insert = s15.strstart < MIN_MATCH2 - 1 ? s15.strstart : MIN_MATCH2 - 1;
  if (flush === Z_FINISH2) {
    flush_block_only(s15, true);
    if (s15.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s15.last_lit) {
    flush_block_only(s15, false);
    if (s15.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
}
function deflate_slow(s15, flush) {
  var hash_head;
  var bflush;
  var max_insert;
  for (; ; ) {
    if (s15.lookahead < MIN_LOOKAHEAD) {
      fill_window(s15);
      if (s15.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s15.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s15.lookahead >= MIN_MATCH2) {
      s15.ins_h = (s15.ins_h << s15.hash_shift ^ s15.window[s15.strstart + MIN_MATCH2 - 1]) & s15.hash_mask;
      hash_head = s15.prev[s15.strstart & s15.w_mask] = s15.head[s15.ins_h];
      s15.head[s15.ins_h] = s15.strstart;
    }
    s15.prev_length = s15.match_length;
    s15.prev_match = s15.match_start;
    s15.match_length = MIN_MATCH2 - 1;
    if (hash_head !== 0 && s15.prev_length < s15.max_lazy_match && s15.strstart - hash_head <= s15.w_size - MIN_LOOKAHEAD) {
      s15.match_length = longest_match(s15, hash_head);
      if (s15.match_length <= 5 && (s15.strategy === Z_FILTERED || s15.match_length === MIN_MATCH2 && s15.strstart - s15.match_start > 4096)) {
        s15.match_length = MIN_MATCH2 - 1;
      }
    }
    if (s15.prev_length >= MIN_MATCH2 && s15.match_length <= s15.prev_length) {
      max_insert = s15.strstart + s15.lookahead - MIN_MATCH2;
      bflush = _tr_tally(s15, s15.strstart - 1 - s15.prev_match, s15.prev_length - MIN_MATCH2);
      s15.lookahead -= s15.prev_length - 1;
      s15.prev_length -= 2;
      do {
        if (++s15.strstart <= max_insert) {
          s15.ins_h = (s15.ins_h << s15.hash_shift ^ s15.window[s15.strstart + MIN_MATCH2 - 1]) & s15.hash_mask;
          hash_head = s15.prev[s15.strstart & s15.w_mask] = s15.head[s15.ins_h];
          s15.head[s15.ins_h] = s15.strstart;
        }
      } while (--s15.prev_length !== 0);
      s15.match_available = 0;
      s15.match_length = MIN_MATCH2 - 1;
      s15.strstart++;
      if (bflush) {
        flush_block_only(s15, false);
        if (s15.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    } else if (s15.match_available) {
      bflush = _tr_tally(s15, 0, s15.window[s15.strstart - 1]);
      if (bflush) {
        flush_block_only(s15, false);
      }
      s15.strstart++;
      s15.lookahead--;
      if (s15.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      s15.match_available = 1;
      s15.strstart++;
      s15.lookahead--;
    }
  }
  if (s15.match_available) {
    bflush = _tr_tally(s15, 0, s15.window[s15.strstart - 1]);
    s15.match_available = 0;
  }
  s15.insert = s15.strstart < MIN_MATCH2 - 1 ? s15.strstart : MIN_MATCH2 - 1;
  if (flush === Z_FINISH2) {
    flush_block_only(s15, true);
    if (s15.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s15.last_lit) {
    flush_block_only(s15, false);
    if (s15.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
}
function deflate_rle(s15, flush) {
  var bflush;
  var prev;
  var scan, strend;
  var _win = s15.window;
  for (; ; ) {
    if (s15.lookahead <= MAX_MATCH2) {
      fill_window(s15);
      if (s15.lookahead <= MAX_MATCH2 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s15.lookahead === 0) {
        break;
      }
    }
    s15.match_length = 0;
    if (s15.lookahead >= MIN_MATCH2 && s15.strstart > 0) {
      scan = s15.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s15.strstart + MAX_MATCH2;
        do {
        } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
        s15.match_length = MAX_MATCH2 - (strend - scan);
        if (s15.match_length > s15.lookahead) {
          s15.match_length = s15.lookahead;
        }
      }
    }
    if (s15.match_length >= MIN_MATCH2) {
      bflush = _tr_tally(s15, 1, s15.match_length - MIN_MATCH2);
      s15.lookahead -= s15.match_length;
      s15.strstart += s15.match_length;
      s15.match_length = 0;
    } else {
      bflush = _tr_tally(s15, 0, s15.window[s15.strstart]);
      s15.lookahead--;
      s15.strstart++;
    }
    if (bflush) {
      flush_block_only(s15, false);
      if (s15.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s15.insert = 0;
  if (flush === Z_FINISH2) {
    flush_block_only(s15, true);
    if (s15.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s15.last_lit) {
    flush_block_only(s15, false);
    if (s15.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
}
function deflate_huff(s15, flush) {
  var bflush;
  for (; ; ) {
    if (s15.lookahead === 0) {
      fill_window(s15);
      if (s15.lookahead === 0) {
        if (flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        break;
      }
    }
    s15.match_length = 0;
    bflush = _tr_tally(s15, 0, s15.window[s15.strstart]);
    s15.lookahead--;
    s15.strstart++;
    if (bflush) {
      flush_block_only(s15, false);
      if (s15.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s15.insert = 0;
  if (flush === Z_FINISH2) {
    flush_block_only(s15, true);
    if (s15.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s15.last_lit) {
    flush_block_only(s15, false);
    if (s15.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
}
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}
var configuration_table;
configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),
  /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),
  /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),
  /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),
  /* 3 */
  new Config(4, 4, 16, 16, deflate_slow),
  /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),
  /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),
  /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),
  /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),
  /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)
  /* 9 max compression */
];
function lm_init(s15) {
  s15.window_size = 2 * s15.w_size;
  zero2(s15.head);
  s15.max_lazy_match = configuration_table[s15.level].max_lazy;
  s15.good_match = configuration_table[s15.level].good_length;
  s15.nice_match = configuration_table[s15.level].nice_length;
  s15.max_chain_length = configuration_table[s15.level].max_chain;
  s15.strstart = 0;
  s15.block_start = 0;
  s15.lookahead = 0;
  s15.insert = 0;
  s15.match_length = s15.prev_length = MIN_MATCH2 - 1;
  s15.match_available = 0;
  s15.ins_h = 0;
}
function DeflateState() {
  this.strm = null;
  this.status = 0;
  this.pending_buf = null;
  this.pending_buf_size = 0;
  this.pending_out = 0;
  this.pending = 0;
  this.wrap = 0;
  this.gzhead = null;
  this.gzindex = 0;
  this.method = Z_DEFLATED2;
  this.last_flush = -1;
  this.w_size = 0;
  this.w_bits = 0;
  this.w_mask = 0;
  this.window = null;
  this.window_size = 0;
  this.prev = null;
  this.head = null;
  this.ins_h = 0;
  this.hash_size = 0;
  this.hash_bits = 0;
  this.hash_mask = 0;
  this.hash_shift = 0;
  this.block_start = 0;
  this.match_length = 0;
  this.prev_match = 0;
  this.match_available = 0;
  this.strstart = 0;
  this.match_start = 0;
  this.lookahead = 0;
  this.prev_length = 0;
  this.max_chain_length = 0;
  this.max_lazy_match = 0;
  this.level = 0;
  this.strategy = 0;
  this.good_match = 0;
  this.nice_match = 0;
  this.dyn_ltree = new Buf16(HEAP_SIZE2 * 2);
  this.dyn_dtree = new Buf16((2 * D_CODES2 + 1) * 2);
  this.bl_tree = new Buf16((2 * BL_CODES2 + 1) * 2);
  zero2(this.dyn_ltree);
  zero2(this.dyn_dtree);
  zero2(this.bl_tree);
  this.l_desc = null;
  this.d_desc = null;
  this.bl_desc = null;
  this.bl_count = new Buf16(MAX_BITS2 + 1);
  this.heap = new Buf16(2 * L_CODES2 + 1);
  zero2(this.heap);
  this.heap_len = 0;
  this.heap_max = 0;
  this.depth = new Buf16(2 * L_CODES2 + 1);
  zero2(this.depth);
  this.l_buf = 0;
  this.lit_bufsize = 0;
  this.last_lit = 0;
  this.d_buf = 0;
  this.opt_len = 0;
  this.static_len = 0;
  this.matches = 0;
  this.insert = 0;
  this.bi_buf = 0;
  this.bi_valid = 0;
}
function deflateResetKeep(strm) {
  var s15;
  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR2);
  }
  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN2;
  s15 = strm.state;
  s15.pending = 0;
  s15.pending_out = 0;
  if (s15.wrap < 0) {
    s15.wrap = -s15.wrap;
  }
  s15.status = s15.wrap ? INIT_STATE : BUSY_STATE;
  strm.adler = s15.wrap === 2 ? 0 : 1;
  s15.last_flush = Z_NO_FLUSH;
  _tr_init(s15);
  return Z_OK2;
}
function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK2) {
    lm_init(strm.state);
  }
  return ret;
}
function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) {
    return Z_STREAM_ERROR2;
  }
  var wrap = 1;
  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else if (windowBits > 15) {
    wrap = 2;
    windowBits -= 16;
  }
  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED2) {
    return err(strm, Z_STREAM_ERROR2);
  }
  if (windowBits === 8) {
    windowBits = 9;
  }
  var s15 = new DeflateState();
  strm.state = s15;
  s15.strm = strm;
  s15.wrap = wrap;
  s15.gzhead = null;
  s15.w_bits = windowBits;
  s15.w_size = 1 << s15.w_bits;
  s15.w_mask = s15.w_size - 1;
  s15.hash_bits = memLevel + 7;
  s15.hash_size = 1 << s15.hash_bits;
  s15.hash_mask = s15.hash_size - 1;
  s15.hash_shift = ~~((s15.hash_bits + MIN_MATCH2 - 1) / MIN_MATCH2);
  s15.window = new Buf8(s15.w_size * 2);
  s15.head = new Buf16(s15.hash_size);
  s15.prev = new Buf16(s15.w_size);
  s15.lit_bufsize = 1 << memLevel + 6;
  s15.pending_buf_size = s15.lit_bufsize * 4;
  s15.pending_buf = new Buf8(s15.pending_buf_size);
  s15.d_buf = 1 * s15.lit_bufsize;
  s15.l_buf = (1 + 2) * s15.lit_bufsize;
  s15.level = level;
  s15.strategy = strategy;
  s15.method = method;
  return deflateReset(strm);
}
function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED2, MAX_WBITS2, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
}
function deflate(strm, flush) {
  var old_flush, s15;
  var beg, val;
  if (!strm || !strm.state || flush > Z_BLOCK2 || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR2) : Z_STREAM_ERROR2;
  }
  s15 = strm.state;
  if (!strm.output || !strm.input && strm.avail_in !== 0 || s15.status === FINISH_STATE && flush !== Z_FINISH2) {
    return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR2 : Z_STREAM_ERROR2);
  }
  s15.strm = strm;
  old_flush = s15.last_flush;
  s15.last_flush = flush;
  if (s15.status === INIT_STATE) {
    if (s15.wrap === 2) {
      strm.adler = 0;
      put_byte(s15, 31);
      put_byte(s15, 139);
      put_byte(s15, 8);
      if (!s15.gzhead) {
        put_byte(s15, 0);
        put_byte(s15, 0);
        put_byte(s15, 0);
        put_byte(s15, 0);
        put_byte(s15, 0);
        put_byte(s15, s15.level === 9 ? 2 : s15.strategy >= Z_HUFFMAN_ONLY || s15.level < 2 ? 4 : 0);
        put_byte(s15, OS_CODE);
        s15.status = BUSY_STATE;
      } else {
        put_byte(
          s15,
          (s15.gzhead.text ? 1 : 0) + (s15.gzhead.hcrc ? 2 : 0) + (!s15.gzhead.extra ? 0 : 4) + (!s15.gzhead.name ? 0 : 8) + (!s15.gzhead.comment ? 0 : 16)
        );
        put_byte(s15, s15.gzhead.time & 255);
        put_byte(s15, s15.gzhead.time >> 8 & 255);
        put_byte(s15, s15.gzhead.time >> 16 & 255);
        put_byte(s15, s15.gzhead.time >> 24 & 255);
        put_byte(s15, s15.level === 9 ? 2 : s15.strategy >= Z_HUFFMAN_ONLY || s15.level < 2 ? 4 : 0);
        put_byte(s15, s15.gzhead.os & 255);
        if (s15.gzhead.extra && s15.gzhead.extra.length) {
          put_byte(s15, s15.gzhead.extra.length & 255);
          put_byte(s15, s15.gzhead.extra.length >> 8 & 255);
        }
        if (s15.gzhead.hcrc) {
          strm.adler = makeTable(strm.adler, s15.pending_buf, s15.pending, 0);
        }
        s15.gzindex = 0;
        s15.status = EXTRA_STATE;
      }
    } else {
      var header = Z_DEFLATED2 + (s15.w_bits - 8 << 4) << 8;
      var level_flags = -1;
      if (s15.strategy >= Z_HUFFMAN_ONLY || s15.level < 2) {
        level_flags = 0;
      } else if (s15.level < 6) {
        level_flags = 1;
      } else if (s15.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= level_flags << 6;
      if (s15.strstart !== 0) {
        header |= PRESET_DICT;
      }
      header += 31 - header % 31;
      s15.status = BUSY_STATE;
      putShortMSB(s15, header);
      if (s15.strstart !== 0) {
        putShortMSB(s15, strm.adler >>> 16);
        putShortMSB(s15, strm.adler & 65535);
      }
      strm.adler = 1;
    }
  }
  if (s15.status === EXTRA_STATE) {
    if (s15.gzhead.extra) {
      beg = s15.pending;
      while (s15.gzindex < (s15.gzhead.extra.length & 65535)) {
        if (s15.pending === s15.pending_buf_size) {
          if (s15.gzhead.hcrc && s15.pending > beg) {
            strm.adler = makeTable(strm.adler, s15.pending_buf, s15.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s15.pending;
          if (s15.pending === s15.pending_buf_size) {
            break;
          }
        }
        put_byte(s15, s15.gzhead.extra[s15.gzindex] & 255);
        s15.gzindex++;
      }
      if (s15.gzhead.hcrc && s15.pending > beg) {
        strm.adler = makeTable(strm.adler, s15.pending_buf, s15.pending - beg, beg);
      }
      if (s15.gzindex === s15.gzhead.extra.length) {
        s15.gzindex = 0;
        s15.status = NAME_STATE;
      }
    } else {
      s15.status = NAME_STATE;
    }
  }
  if (s15.status === NAME_STATE) {
    if (s15.gzhead.name) {
      beg = s15.pending;
      do {
        if (s15.pending === s15.pending_buf_size) {
          if (s15.gzhead.hcrc && s15.pending > beg) {
            strm.adler = makeTable(strm.adler, s15.pending_buf, s15.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s15.pending;
          if (s15.pending === s15.pending_buf_size) {
            val = 1;
            break;
          }
        }
        if (s15.gzindex < s15.gzhead.name.length) {
          val = s15.gzhead.name.charCodeAt(s15.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s15, val);
      } while (val !== 0);
      if (s15.gzhead.hcrc && s15.pending > beg) {
        strm.adler = makeTable(strm.adler, s15.pending_buf, s15.pending - beg, beg);
      }
      if (val === 0) {
        s15.gzindex = 0;
        s15.status = COMMENT_STATE;
      }
    } else {
      s15.status = COMMENT_STATE;
    }
  }
  if (s15.status === COMMENT_STATE) {
    if (s15.gzhead.comment) {
      beg = s15.pending;
      do {
        if (s15.pending === s15.pending_buf_size) {
          if (s15.gzhead.hcrc && s15.pending > beg) {
            strm.adler = makeTable(strm.adler, s15.pending_buf, s15.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s15.pending;
          if (s15.pending === s15.pending_buf_size) {
            val = 1;
            break;
          }
        }
        if (s15.gzindex < s15.gzhead.comment.length) {
          val = s15.gzhead.comment.charCodeAt(s15.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s15, val);
      } while (val !== 0);
      if (s15.gzhead.hcrc && s15.pending > beg) {
        strm.adler = makeTable(strm.adler, s15.pending_buf, s15.pending - beg, beg);
      }
      if (val === 0) {
        s15.status = HCRC_STATE;
      }
    } else {
      s15.status = HCRC_STATE;
    }
  }
  if (s15.status === HCRC_STATE) {
    if (s15.gzhead.hcrc) {
      if (s15.pending + 2 > s15.pending_buf_size) {
        flush_pending(strm);
      }
      if (s15.pending + 2 <= s15.pending_buf_size) {
        put_byte(s15, strm.adler & 255);
        put_byte(s15, strm.adler >> 8 & 255);
        strm.adler = 0;
        s15.status = BUSY_STATE;
      }
    } else {
      s15.status = BUSY_STATE;
    }
  }
  if (s15.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      s15.last_flush = -1;
      return Z_OK2;
    }
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH2) {
    return err(strm, Z_BUF_ERROR2);
  }
  if (s15.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR2);
  }
  if (strm.avail_in !== 0 || s15.lookahead !== 0 || flush !== Z_NO_FLUSH && s15.status !== FINISH_STATE) {
    var bstate = s15.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s15, flush) : s15.strategy === Z_RLE ? deflate_rle(s15, flush) : configuration_table[s15.level].func(s15, flush);
    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s15.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s15.last_flush = -1;
      }
      return Z_OK2;
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        _tr_align(s15);
      } else if (flush !== Z_BLOCK2) {
        _tr_stored_block(s15, 0, 0, false);
        if (flush === Z_FULL_FLUSH) {
          zero2(s15.head);
          if (s15.lookahead === 0) {
            s15.strstart = 0;
            s15.block_start = 0;
            s15.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s15.last_flush = -1;
        return Z_OK2;
      }
    }
  }
  if (flush !== Z_FINISH2) {
    return Z_OK2;
  }
  if (s15.wrap <= 0) {
    return Z_STREAM_END2;
  }
  if (s15.wrap === 2) {
    put_byte(s15, strm.adler & 255);
    put_byte(s15, strm.adler >> 8 & 255);
    put_byte(s15, strm.adler >> 16 & 255);
    put_byte(s15, strm.adler >> 24 & 255);
    put_byte(s15, strm.total_in & 255);
    put_byte(s15, strm.total_in >> 8 & 255);
    put_byte(s15, strm.total_in >> 16 & 255);
    put_byte(s15, strm.total_in >> 24 & 255);
  } else {
    putShortMSB(s15, strm.adler >>> 16);
    putShortMSB(s15, strm.adler & 65535);
  }
  flush_pending(strm);
  if (s15.wrap > 0) {
    s15.wrap = -s15.wrap;
  }
  return s15.pending !== 0 ? Z_OK2 : Z_STREAM_END2;
}

// node_modules/@novnc/novnc/core/deflator.js
var Deflator = class {
  constructor() {
    this.strm = new ZStream();
    this.chunkSize = 1024 * 10 * 10;
    this.outputBuffer = new Uint8Array(this.chunkSize);
    deflateInit(this.strm, Z_DEFAULT_COMPRESSION);
  }
  deflate(inData) {
    this.strm.input = inData;
    this.strm.avail_in = this.strm.input.length;
    this.strm.next_in = 0;
    this.strm.output = this.outputBuffer;
    this.strm.avail_out = this.chunkSize;
    this.strm.next_out = 0;
    let lastRet = deflate(this.strm, Z_FULL_FLUSH);
    let outData = new Uint8Array(this.strm.output.buffer, 0, this.strm.next_out);
    if (lastRet < 0) {
      throw new Error("zlib deflate failed");
    }
    if (this.strm.avail_in > 0) {
      let chunks = [outData];
      let totalLen = outData.length;
      do {
        this.strm.output = new Uint8Array(this.chunkSize);
        this.strm.next_out = 0;
        this.strm.avail_out = this.chunkSize;
        lastRet = deflate(this.strm, Z_FULL_FLUSH);
        if (lastRet < 0) {
          throw new Error("zlib deflate failed");
        }
        let chunk = new Uint8Array(this.strm.output.buffer, 0, this.strm.next_out);
        totalLen += chunk.length;
        chunks.push(chunk);
      } while (this.strm.avail_in > 0);
      let newData = new Uint8Array(totalLen);
      let offset = 0;
      for (let i = 0; i < chunks.length; i++) {
        newData.set(chunks[i], offset);
        offset += chunks[i].length;
      }
      outData = newData;
    }
    this.strm.input = null;
    this.strm.avail_in = 0;
    this.strm.next_in = 0;
    return outData;
  }
};

// node_modules/@novnc/novnc/core/input/keysym.js
var keysym_default = {
  XK_VoidSymbol: 16777215,
  /* Void symbol */
  XK_BackSpace: 65288,
  /* Back space, back char */
  XK_Tab: 65289,
  XK_Linefeed: 65290,
  /* Linefeed, LF */
  XK_Clear: 65291,
  XK_Return: 65293,
  /* Return, enter */
  XK_Pause: 65299,
  /* Pause, hold */
  XK_Scroll_Lock: 65300,
  XK_Sys_Req: 65301,
  XK_Escape: 65307,
  XK_Delete: 65535,
  /* Delete, rubout */
  /* International & multi-key character composition */
  XK_Multi_key: 65312,
  /* Multi-key character compose */
  XK_Codeinput: 65335,
  XK_SingleCandidate: 65340,
  XK_MultipleCandidate: 65341,
  XK_PreviousCandidate: 65342,
  /* Japanese keyboard support */
  XK_Kanji: 65313,
  /* Kanji, Kanji convert */
  XK_Muhenkan: 65314,
  /* Cancel Conversion */
  XK_Henkan_Mode: 65315,
  /* Start/Stop Conversion */
  XK_Henkan: 65315,
  /* Alias for Henkan_Mode */
  XK_Romaji: 65316,
  /* to Romaji */
  XK_Hiragana: 65317,
  /* to Hiragana */
  XK_Katakana: 65318,
  /* to Katakana */
  XK_Hiragana_Katakana: 65319,
  /* Hiragana/Katakana toggle */
  XK_Zenkaku: 65320,
  /* to Zenkaku */
  XK_Hankaku: 65321,
  /* to Hankaku */
  XK_Zenkaku_Hankaku: 65322,
  /* Zenkaku/Hankaku toggle */
  XK_Touroku: 65323,
  /* Add to Dictionary */
  XK_Massyo: 65324,
  /* Delete from Dictionary */
  XK_Kana_Lock: 65325,
  /* Kana Lock */
  XK_Kana_Shift: 65326,
  /* Kana Shift */
  XK_Eisu_Shift: 65327,
  /* Alphanumeric Shift */
  XK_Eisu_toggle: 65328,
  /* Alphanumeric toggle */
  XK_Kanji_Bangou: 65335,
  /* Codeinput */
  XK_Zen_Koho: 65341,
  /* Multiple/All Candidate(s) */
  XK_Mae_Koho: 65342,
  /* Previous Candidate */
  /* Cursor control & motion */
  XK_Home: 65360,
  XK_Left: 65361,
  /* Move left, left arrow */
  XK_Up: 65362,
  /* Move up, up arrow */
  XK_Right: 65363,
  /* Move right, right arrow */
  XK_Down: 65364,
  /* Move down, down arrow */
  XK_Prior: 65365,
  /* Prior, previous */
  XK_Page_Up: 65365,
  XK_Next: 65366,
  /* Next */
  XK_Page_Down: 65366,
  XK_End: 65367,
  /* EOL */
  XK_Begin: 65368,
  /* BOL */
  /* Misc functions */
  XK_Select: 65376,
  /* Select, mark */
  XK_Print: 65377,
  XK_Execute: 65378,
  /* Execute, run, do */
  XK_Insert: 65379,
  /* Insert, insert here */
  XK_Undo: 65381,
  XK_Redo: 65382,
  /* Redo, again */
  XK_Menu: 65383,
  XK_Find: 65384,
  /* Find, search */
  XK_Cancel: 65385,
  /* Cancel, stop, abort, exit */
  XK_Help: 65386,
  /* Help */
  XK_Break: 65387,
  XK_Mode_switch: 65406,
  /* Character set switch */
  XK_script_switch: 65406,
  /* Alias for mode_switch */
  XK_Num_Lock: 65407,
  /* Keypad functions, keypad numbers cleverly chosen to map to ASCII */
  XK_KP_Space: 65408,
  /* Space */
  XK_KP_Tab: 65417,
  XK_KP_Enter: 65421,
  /* Enter */
  XK_KP_F1: 65425,
  /* PF1, KP_A, ... */
  XK_KP_F2: 65426,
  XK_KP_F3: 65427,
  XK_KP_F4: 65428,
  XK_KP_Home: 65429,
  XK_KP_Left: 65430,
  XK_KP_Up: 65431,
  XK_KP_Right: 65432,
  XK_KP_Down: 65433,
  XK_KP_Prior: 65434,
  XK_KP_Page_Up: 65434,
  XK_KP_Next: 65435,
  XK_KP_Page_Down: 65435,
  XK_KP_End: 65436,
  XK_KP_Begin: 65437,
  XK_KP_Insert: 65438,
  XK_KP_Delete: 65439,
  XK_KP_Equal: 65469,
  /* Equals */
  XK_KP_Multiply: 65450,
  XK_KP_Add: 65451,
  XK_KP_Separator: 65452,
  /* Separator, often comma */
  XK_KP_Subtract: 65453,
  XK_KP_Decimal: 65454,
  XK_KP_Divide: 65455,
  XK_KP_0: 65456,
  XK_KP_1: 65457,
  XK_KP_2: 65458,
  XK_KP_3: 65459,
  XK_KP_4: 65460,
  XK_KP_5: 65461,
  XK_KP_6: 65462,
  XK_KP_7: 65463,
  XK_KP_8: 65464,
  XK_KP_9: 65465,
  /*
   * Auxiliary functions; note the duplicate definitions for left and right
   * function keys;  Sun keyboards and a few other manufacturers have such
   * function key groups on the left and/or right sides of the keyboard.
   * We've not found a keyboard with more than 35 function keys total.
   */
  XK_F1: 65470,
  XK_F2: 65471,
  XK_F3: 65472,
  XK_F4: 65473,
  XK_F5: 65474,
  XK_F6: 65475,
  XK_F7: 65476,
  XK_F8: 65477,
  XK_F9: 65478,
  XK_F10: 65479,
  XK_F11: 65480,
  XK_L1: 65480,
  XK_F12: 65481,
  XK_L2: 65481,
  XK_F13: 65482,
  XK_L3: 65482,
  XK_F14: 65483,
  XK_L4: 65483,
  XK_F15: 65484,
  XK_L5: 65484,
  XK_F16: 65485,
  XK_L6: 65485,
  XK_F17: 65486,
  XK_L7: 65486,
  XK_F18: 65487,
  XK_L8: 65487,
  XK_F19: 65488,
  XK_L9: 65488,
  XK_F20: 65489,
  XK_L10: 65489,
  XK_F21: 65490,
  XK_R1: 65490,
  XK_F22: 65491,
  XK_R2: 65491,
  XK_F23: 65492,
  XK_R3: 65492,
  XK_F24: 65493,
  XK_R4: 65493,
  XK_F25: 65494,
  XK_R5: 65494,
  XK_F26: 65495,
  XK_R6: 65495,
  XK_F27: 65496,
  XK_R7: 65496,
  XK_F28: 65497,
  XK_R8: 65497,
  XK_F29: 65498,
  XK_R9: 65498,
  XK_F30: 65499,
  XK_R10: 65499,
  XK_F31: 65500,
  XK_R11: 65500,
  XK_F32: 65501,
  XK_R12: 65501,
  XK_F33: 65502,
  XK_R13: 65502,
  XK_F34: 65503,
  XK_R14: 65503,
  XK_F35: 65504,
  XK_R15: 65504,
  /* Modifiers */
  XK_Shift_L: 65505,
  /* Left shift */
  XK_Shift_R: 65506,
  /* Right shift */
  XK_Control_L: 65507,
  /* Left control */
  XK_Control_R: 65508,
  /* Right control */
  XK_Caps_Lock: 65509,
  /* Caps lock */
  XK_Shift_Lock: 65510,
  /* Shift lock */
  XK_Meta_L: 65511,
  /* Left meta */
  XK_Meta_R: 65512,
  /* Right meta */
  XK_Alt_L: 65513,
  /* Left alt */
  XK_Alt_R: 65514,
  /* Right alt */
  XK_Super_L: 65515,
  /* Left super */
  XK_Super_R: 65516,
  /* Right super */
  XK_Hyper_L: 65517,
  /* Left hyper */
  XK_Hyper_R: 65518,
  /* Right hyper */
  /*
   * Keyboard (XKB) Extension function and modifier keys
   * (from Appendix C of "The X Keyboard Extension: Protocol Specification")
   * Byte 3 = 0xfe
   */
  XK_ISO_Level3_Shift: 65027,
  /* AltGr */
  XK_ISO_Next_Group: 65032,
  XK_ISO_Prev_Group: 65034,
  XK_ISO_First_Group: 65036,
  XK_ISO_Last_Group: 65038,
  /*
   * Latin 1
   * (ISO/IEC 8859-1: Unicode U+0020..U+00FF)
   * Byte 3: 0
   */
  XK_space: 32,
  /* U+0020 SPACE */
  XK_exclam: 33,
  /* U+0021 EXCLAMATION MARK */
  XK_quotedbl: 34,
  /* U+0022 QUOTATION MARK */
  XK_numbersign: 35,
  /* U+0023 NUMBER SIGN */
  XK_dollar: 36,
  /* U+0024 DOLLAR SIGN */
  XK_percent: 37,
  /* U+0025 PERCENT SIGN */
  XK_ampersand: 38,
  /* U+0026 AMPERSAND */
  XK_apostrophe: 39,
  /* U+0027 APOSTROPHE */
  XK_quoteright: 39,
  /* deprecated */
  XK_parenleft: 40,
  /* U+0028 LEFT PARENTHESIS */
  XK_parenright: 41,
  /* U+0029 RIGHT PARENTHESIS */
  XK_asterisk: 42,
  /* U+002A ASTERISK */
  XK_plus: 43,
  /* U+002B PLUS SIGN */
  XK_comma: 44,
  /* U+002C COMMA */
  XK_minus: 45,
  /* U+002D HYPHEN-MINUS */
  XK_period: 46,
  /* U+002E FULL STOP */
  XK_slash: 47,
  /* U+002F SOLIDUS */
  XK_0: 48,
  /* U+0030 DIGIT ZERO */
  XK_1: 49,
  /* U+0031 DIGIT ONE */
  XK_2: 50,
  /* U+0032 DIGIT TWO */
  XK_3: 51,
  /* U+0033 DIGIT THREE */
  XK_4: 52,
  /* U+0034 DIGIT FOUR */
  XK_5: 53,
  /* U+0035 DIGIT FIVE */
  XK_6: 54,
  /* U+0036 DIGIT SIX */
  XK_7: 55,
  /* U+0037 DIGIT SEVEN */
  XK_8: 56,
  /* U+0038 DIGIT EIGHT */
  XK_9: 57,
  /* U+0039 DIGIT NINE */
  XK_colon: 58,
  /* U+003A COLON */
  XK_semicolon: 59,
  /* U+003B SEMICOLON */
  XK_less: 60,
  /* U+003C LESS-THAN SIGN */
  XK_equal: 61,
  /* U+003D EQUALS SIGN */
  XK_greater: 62,
  /* U+003E GREATER-THAN SIGN */
  XK_question: 63,
  /* U+003F QUESTION MARK */
  XK_at: 64,
  /* U+0040 COMMERCIAL AT */
  XK_A: 65,
  /* U+0041 LATIN CAPITAL LETTER A */
  XK_B: 66,
  /* U+0042 LATIN CAPITAL LETTER B */
  XK_C: 67,
  /* U+0043 LATIN CAPITAL LETTER C */
  XK_D: 68,
  /* U+0044 LATIN CAPITAL LETTER D */
  XK_E: 69,
  /* U+0045 LATIN CAPITAL LETTER E */
  XK_F: 70,
  /* U+0046 LATIN CAPITAL LETTER F */
  XK_G: 71,
  /* U+0047 LATIN CAPITAL LETTER G */
  XK_H: 72,
  /* U+0048 LATIN CAPITAL LETTER H */
  XK_I: 73,
  /* U+0049 LATIN CAPITAL LETTER I */
  XK_J: 74,
  /* U+004A LATIN CAPITAL LETTER J */
  XK_K: 75,
  /* U+004B LATIN CAPITAL LETTER K */
  XK_L: 76,
  /* U+004C LATIN CAPITAL LETTER L */
  XK_M: 77,
  /* U+004D LATIN CAPITAL LETTER M */
  XK_N: 78,
  /* U+004E LATIN CAPITAL LETTER N */
  XK_O: 79,
  /* U+004F LATIN CAPITAL LETTER O */
  XK_P: 80,
  /* U+0050 LATIN CAPITAL LETTER P */
  XK_Q: 81,
  /* U+0051 LATIN CAPITAL LETTER Q */
  XK_R: 82,
  /* U+0052 LATIN CAPITAL LETTER R */
  XK_S: 83,
  /* U+0053 LATIN CAPITAL LETTER S */
  XK_T: 84,
  /* U+0054 LATIN CAPITAL LETTER T */
  XK_U: 85,
  /* U+0055 LATIN CAPITAL LETTER U */
  XK_V: 86,
  /* U+0056 LATIN CAPITAL LETTER V */
  XK_W: 87,
  /* U+0057 LATIN CAPITAL LETTER W */
  XK_X: 88,
  /* U+0058 LATIN CAPITAL LETTER X */
  XK_Y: 89,
  /* U+0059 LATIN CAPITAL LETTER Y */
  XK_Z: 90,
  /* U+005A LATIN CAPITAL LETTER Z */
  XK_bracketleft: 91,
  /* U+005B LEFT SQUARE BRACKET */
  XK_backslash: 92,
  /* U+005C REVERSE SOLIDUS */
  XK_bracketright: 93,
  /* U+005D RIGHT SQUARE BRACKET */
  XK_asciicircum: 94,
  /* U+005E CIRCUMFLEX ACCENT */
  XK_underscore: 95,
  /* U+005F LOW LINE */
  XK_grave: 96,
  /* U+0060 GRAVE ACCENT */
  XK_quoteleft: 96,
  /* deprecated */
  XK_a: 97,
  /* U+0061 LATIN SMALL LETTER A */
  XK_b: 98,
  /* U+0062 LATIN SMALL LETTER B */
  XK_c: 99,
  /* U+0063 LATIN SMALL LETTER C */
  XK_d: 100,
  /* U+0064 LATIN SMALL LETTER D */
  XK_e: 101,
  /* U+0065 LATIN SMALL LETTER E */
  XK_f: 102,
  /* U+0066 LATIN SMALL LETTER F */
  XK_g: 103,
  /* U+0067 LATIN SMALL LETTER G */
  XK_h: 104,
  /* U+0068 LATIN SMALL LETTER H */
  XK_i: 105,
  /* U+0069 LATIN SMALL LETTER I */
  XK_j: 106,
  /* U+006A LATIN SMALL LETTER J */
  XK_k: 107,
  /* U+006B LATIN SMALL LETTER K */
  XK_l: 108,
  /* U+006C LATIN SMALL LETTER L */
  XK_m: 109,
  /* U+006D LATIN SMALL LETTER M */
  XK_n: 110,
  /* U+006E LATIN SMALL LETTER N */
  XK_o: 111,
  /* U+006F LATIN SMALL LETTER O */
  XK_p: 112,
  /* U+0070 LATIN SMALL LETTER P */
  XK_q: 113,
  /* U+0071 LATIN SMALL LETTER Q */
  XK_r: 114,
  /* U+0072 LATIN SMALL LETTER R */
  XK_s: 115,
  /* U+0073 LATIN SMALL LETTER S */
  XK_t: 116,
  /* U+0074 LATIN SMALL LETTER T */
  XK_u: 117,
  /* U+0075 LATIN SMALL LETTER U */
  XK_v: 118,
  /* U+0076 LATIN SMALL LETTER V */
  XK_w: 119,
  /* U+0077 LATIN SMALL LETTER W */
  XK_x: 120,
  /* U+0078 LATIN SMALL LETTER X */
  XK_y: 121,
  /* U+0079 LATIN SMALL LETTER Y */
  XK_z: 122,
  /* U+007A LATIN SMALL LETTER Z */
  XK_braceleft: 123,
  /* U+007B LEFT CURLY BRACKET */
  XK_bar: 124,
  /* U+007C VERTICAL LINE */
  XK_braceright: 125,
  /* U+007D RIGHT CURLY BRACKET */
  XK_asciitilde: 126,
  /* U+007E TILDE */
  XK_nobreakspace: 160,
  /* U+00A0 NO-BREAK SPACE */
  XK_exclamdown: 161,
  /* U+00A1 INVERTED EXCLAMATION MARK */
  XK_cent: 162,
  /* U+00A2 CENT SIGN */
  XK_sterling: 163,
  /* U+00A3 POUND SIGN */
  XK_currency: 164,
  /* U+00A4 CURRENCY SIGN */
  XK_yen: 165,
  /* U+00A5 YEN SIGN */
  XK_brokenbar: 166,
  /* U+00A6 BROKEN BAR */
  XK_section: 167,
  /* U+00A7 SECTION SIGN */
  XK_diaeresis: 168,
  /* U+00A8 DIAERESIS */
  XK_copyright: 169,
  /* U+00A9 COPYRIGHT SIGN */
  XK_ordfeminine: 170,
  /* U+00AA FEMININE ORDINAL INDICATOR */
  XK_guillemotleft: 171,
  /* U+00AB LEFT-POINTING DOUBLE ANGLE QUOTATION MARK */
  XK_notsign: 172,
  /* U+00AC NOT SIGN */
  XK_hyphen: 173,
  /* U+00AD SOFT HYPHEN */
  XK_registered: 174,
  /* U+00AE REGISTERED SIGN */
  XK_macron: 175,
  /* U+00AF MACRON */
  XK_degree: 176,
  /* U+00B0 DEGREE SIGN */
  XK_plusminus: 177,
  /* U+00B1 PLUS-MINUS SIGN */
  XK_twosuperior: 178,
  /* U+00B2 SUPERSCRIPT TWO */
  XK_threesuperior: 179,
  /* U+00B3 SUPERSCRIPT THREE */
  XK_acute: 180,
  /* U+00B4 ACUTE ACCENT */
  XK_mu: 181,
  /* U+00B5 MICRO SIGN */
  XK_paragraph: 182,
  /* U+00B6 PILCROW SIGN */
  XK_periodcentered: 183,
  /* U+00B7 MIDDLE DOT */
  XK_cedilla: 184,
  /* U+00B8 CEDILLA */
  XK_onesuperior: 185,
  /* U+00B9 SUPERSCRIPT ONE */
  XK_masculine: 186,
  /* U+00BA MASCULINE ORDINAL INDICATOR */
  XK_guillemotright: 187,
  /* U+00BB RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK */
  XK_onequarter: 188,
  /* U+00BC VULGAR FRACTION ONE QUARTER */
  XK_onehalf: 189,
  /* U+00BD VULGAR FRACTION ONE HALF */
  XK_threequarters: 190,
  /* U+00BE VULGAR FRACTION THREE QUARTERS */
  XK_questiondown: 191,
  /* U+00BF INVERTED QUESTION MARK */
  XK_Agrave: 192,
  /* U+00C0 LATIN CAPITAL LETTER A WITH GRAVE */
  XK_Aacute: 193,
  /* U+00C1 LATIN CAPITAL LETTER A WITH ACUTE */
  XK_Acircumflex: 194,
  /* U+00C2 LATIN CAPITAL LETTER A WITH CIRCUMFLEX */
  XK_Atilde: 195,
  /* U+00C3 LATIN CAPITAL LETTER A WITH TILDE */
  XK_Adiaeresis: 196,
  /* U+00C4 LATIN CAPITAL LETTER A WITH DIAERESIS */
  XK_Aring: 197,
  /* U+00C5 LATIN CAPITAL LETTER A WITH RING ABOVE */
  XK_AE: 198,
  /* U+00C6 LATIN CAPITAL LETTER AE */
  XK_Ccedilla: 199,
  /* U+00C7 LATIN CAPITAL LETTER C WITH CEDILLA */
  XK_Egrave: 200,
  /* U+00C8 LATIN CAPITAL LETTER E WITH GRAVE */
  XK_Eacute: 201,
  /* U+00C9 LATIN CAPITAL LETTER E WITH ACUTE */
  XK_Ecircumflex: 202,
  /* U+00CA LATIN CAPITAL LETTER E WITH CIRCUMFLEX */
  XK_Ediaeresis: 203,
  /* U+00CB LATIN CAPITAL LETTER E WITH DIAERESIS */
  XK_Igrave: 204,
  /* U+00CC LATIN CAPITAL LETTER I WITH GRAVE */
  XK_Iacute: 205,
  /* U+00CD LATIN CAPITAL LETTER I WITH ACUTE */
  XK_Icircumflex: 206,
  /* U+00CE LATIN CAPITAL LETTER I WITH CIRCUMFLEX */
  XK_Idiaeresis: 207,
  /* U+00CF LATIN CAPITAL LETTER I WITH DIAERESIS */
  XK_ETH: 208,
  /* U+00D0 LATIN CAPITAL LETTER ETH */
  XK_Eth: 208,
  /* deprecated */
  XK_Ntilde: 209,
  /* U+00D1 LATIN CAPITAL LETTER N WITH TILDE */
  XK_Ograve: 210,
  /* U+00D2 LATIN CAPITAL LETTER O WITH GRAVE */
  XK_Oacute: 211,
  /* U+00D3 LATIN CAPITAL LETTER O WITH ACUTE */
  XK_Ocircumflex: 212,
  /* U+00D4 LATIN CAPITAL LETTER O WITH CIRCUMFLEX */
  XK_Otilde: 213,
  /* U+00D5 LATIN CAPITAL LETTER O WITH TILDE */
  XK_Odiaeresis: 214,
  /* U+00D6 LATIN CAPITAL LETTER O WITH DIAERESIS */
  XK_multiply: 215,
  /* U+00D7 MULTIPLICATION SIGN */
  XK_Oslash: 216,
  /* U+00D8 LATIN CAPITAL LETTER O WITH STROKE */
  XK_Ooblique: 216,
  /* U+00D8 LATIN CAPITAL LETTER O WITH STROKE */
  XK_Ugrave: 217,
  /* U+00D9 LATIN CAPITAL LETTER U WITH GRAVE */
  XK_Uacute: 218,
  /* U+00DA LATIN CAPITAL LETTER U WITH ACUTE */
  XK_Ucircumflex: 219,
  /* U+00DB LATIN CAPITAL LETTER U WITH CIRCUMFLEX */
  XK_Udiaeresis: 220,
  /* U+00DC LATIN CAPITAL LETTER U WITH DIAERESIS */
  XK_Yacute: 221,
  /* U+00DD LATIN CAPITAL LETTER Y WITH ACUTE */
  XK_THORN: 222,
  /* U+00DE LATIN CAPITAL LETTER THORN */
  XK_Thorn: 222,
  /* deprecated */
  XK_ssharp: 223,
  /* U+00DF LATIN SMALL LETTER SHARP S */
  XK_agrave: 224,
  /* U+00E0 LATIN SMALL LETTER A WITH GRAVE */
  XK_aacute: 225,
  /* U+00E1 LATIN SMALL LETTER A WITH ACUTE */
  XK_acircumflex: 226,
  /* U+00E2 LATIN SMALL LETTER A WITH CIRCUMFLEX */
  XK_atilde: 227,
  /* U+00E3 LATIN SMALL LETTER A WITH TILDE */
  XK_adiaeresis: 228,
  /* U+00E4 LATIN SMALL LETTER A WITH DIAERESIS */
  XK_aring: 229,
  /* U+00E5 LATIN SMALL LETTER A WITH RING ABOVE */
  XK_ae: 230,
  /* U+00E6 LATIN SMALL LETTER AE */
  XK_ccedilla: 231,
  /* U+00E7 LATIN SMALL LETTER C WITH CEDILLA */
  XK_egrave: 232,
  /* U+00E8 LATIN SMALL LETTER E WITH GRAVE */
  XK_eacute: 233,
  /* U+00E9 LATIN SMALL LETTER E WITH ACUTE */
  XK_ecircumflex: 234,
  /* U+00EA LATIN SMALL LETTER E WITH CIRCUMFLEX */
  XK_ediaeresis: 235,
  /* U+00EB LATIN SMALL LETTER E WITH DIAERESIS */
  XK_igrave: 236,
  /* U+00EC LATIN SMALL LETTER I WITH GRAVE */
  XK_iacute: 237,
  /* U+00ED LATIN SMALL LETTER I WITH ACUTE */
  XK_icircumflex: 238,
  /* U+00EE LATIN SMALL LETTER I WITH CIRCUMFLEX */
  XK_idiaeresis: 239,
  /* U+00EF LATIN SMALL LETTER I WITH DIAERESIS */
  XK_eth: 240,
  /* U+00F0 LATIN SMALL LETTER ETH */
  XK_ntilde: 241,
  /* U+00F1 LATIN SMALL LETTER N WITH TILDE */
  XK_ograve: 242,
  /* U+00F2 LATIN SMALL LETTER O WITH GRAVE */
  XK_oacute: 243,
  /* U+00F3 LATIN SMALL LETTER O WITH ACUTE */
  XK_ocircumflex: 244,
  /* U+00F4 LATIN SMALL LETTER O WITH CIRCUMFLEX */
  XK_otilde: 245,
  /* U+00F5 LATIN SMALL LETTER O WITH TILDE */
  XK_odiaeresis: 246,
  /* U+00F6 LATIN SMALL LETTER O WITH DIAERESIS */
  XK_division: 247,
  /* U+00F7 DIVISION SIGN */
  XK_oslash: 248,
  /* U+00F8 LATIN SMALL LETTER O WITH STROKE */
  XK_ooblique: 248,
  /* U+00F8 LATIN SMALL LETTER O WITH STROKE */
  XK_ugrave: 249,
  /* U+00F9 LATIN SMALL LETTER U WITH GRAVE */
  XK_uacute: 250,
  /* U+00FA LATIN SMALL LETTER U WITH ACUTE */
  XK_ucircumflex: 251,
  /* U+00FB LATIN SMALL LETTER U WITH CIRCUMFLEX */
  XK_udiaeresis: 252,
  /* U+00FC LATIN SMALL LETTER U WITH DIAERESIS */
  XK_yacute: 253,
  /* U+00FD LATIN SMALL LETTER Y WITH ACUTE */
  XK_thorn: 254,
  /* U+00FE LATIN SMALL LETTER THORN */
  XK_ydiaeresis: 255,
  /* U+00FF LATIN SMALL LETTER Y WITH DIAERESIS */
  /*
   * Korean
   * Byte 3 = 0x0e
   */
  XK_Hangul: 65329,
  /* Hangul start/stop(toggle) */
  XK_Hangul_Hanja: 65332,
  /* Start Hangul->Hanja Conversion */
  XK_Hangul_Jeonja: 65336,
  /* Jeonja mode */
  /*
   * XFree86 vendor specific keysyms.
   *
   * The XFree86 keysym range is 0x10080001 - 0x1008FFFF.
   */
  XF86XK_ModeLock: 269025025,
  XF86XK_MonBrightnessUp: 269025026,
  XF86XK_MonBrightnessDown: 269025027,
  XF86XK_KbdLightOnOff: 269025028,
  XF86XK_KbdBrightnessUp: 269025029,
  XF86XK_KbdBrightnessDown: 269025030,
  XF86XK_Standby: 269025040,
  XF86XK_AudioLowerVolume: 269025041,
  XF86XK_AudioMute: 269025042,
  XF86XK_AudioRaiseVolume: 269025043,
  XF86XK_AudioPlay: 269025044,
  XF86XK_AudioStop: 269025045,
  XF86XK_AudioPrev: 269025046,
  XF86XK_AudioNext: 269025047,
  XF86XK_HomePage: 269025048,
  XF86XK_Mail: 269025049,
  XF86XK_Start: 269025050,
  XF86XK_Search: 269025051,
  XF86XK_AudioRecord: 269025052,
  XF86XK_Calculator: 269025053,
  XF86XK_Memo: 269025054,
  XF86XK_ToDoList: 269025055,
  XF86XK_Calendar: 269025056,
  XF86XK_PowerDown: 269025057,
  XF86XK_ContrastAdjust: 269025058,
  XF86XK_RockerUp: 269025059,
  XF86XK_RockerDown: 269025060,
  XF86XK_RockerEnter: 269025061,
  XF86XK_Back: 269025062,
  XF86XK_Forward: 269025063,
  XF86XK_Stop: 269025064,
  XF86XK_Refresh: 269025065,
  XF86XK_PowerOff: 269025066,
  XF86XK_WakeUp: 269025067,
  XF86XK_Eject: 269025068,
  XF86XK_ScreenSaver: 269025069,
  XF86XK_WWW: 269025070,
  XF86XK_Sleep: 269025071,
  XF86XK_Favorites: 269025072,
  XF86XK_AudioPause: 269025073,
  XF86XK_AudioMedia: 269025074,
  XF86XK_MyComputer: 269025075,
  XF86XK_VendorHome: 269025076,
  XF86XK_LightBulb: 269025077,
  XF86XK_Shop: 269025078,
  XF86XK_History: 269025079,
  XF86XK_OpenURL: 269025080,
  XF86XK_AddFavorite: 269025081,
  XF86XK_HotLinks: 269025082,
  XF86XK_BrightnessAdjust: 269025083,
  XF86XK_Finance: 269025084,
  XF86XK_Community: 269025085,
  XF86XK_AudioRewind: 269025086,
  XF86XK_BackForward: 269025087,
  XF86XK_Launch0: 269025088,
  XF86XK_Launch1: 269025089,
  XF86XK_Launch2: 269025090,
  XF86XK_Launch3: 269025091,
  XF86XK_Launch4: 269025092,
  XF86XK_Launch5: 269025093,
  XF86XK_Launch6: 269025094,
  XF86XK_Launch7: 269025095,
  XF86XK_Launch8: 269025096,
  XF86XK_Launch9: 269025097,
  XF86XK_LaunchA: 269025098,
  XF86XK_LaunchB: 269025099,
  XF86XK_LaunchC: 269025100,
  XF86XK_LaunchD: 269025101,
  XF86XK_LaunchE: 269025102,
  XF86XK_LaunchF: 269025103,
  XF86XK_ApplicationLeft: 269025104,
  XF86XK_ApplicationRight: 269025105,
  XF86XK_Book: 269025106,
  XF86XK_CD: 269025107,
  XF86XK_Calculater: 269025108,
  XF86XK_Clear: 269025109,
  XF86XK_Close: 269025110,
  XF86XK_Copy: 269025111,
  XF86XK_Cut: 269025112,
  XF86XK_Display: 269025113,
  XF86XK_DOS: 269025114,
  XF86XK_Documents: 269025115,
  XF86XK_Excel: 269025116,
  XF86XK_Explorer: 269025117,
  XF86XK_Game: 269025118,
  XF86XK_Go: 269025119,
  XF86XK_iTouch: 269025120,
  XF86XK_LogOff: 269025121,
  XF86XK_Market: 269025122,
  XF86XK_Meeting: 269025123,
  XF86XK_MenuKB: 269025125,
  XF86XK_MenuPB: 269025126,
  XF86XK_MySites: 269025127,
  XF86XK_New: 269025128,
  XF86XK_News: 269025129,
  XF86XK_OfficeHome: 269025130,
  XF86XK_Open: 269025131,
  XF86XK_Option: 269025132,
  XF86XK_Paste: 269025133,
  XF86XK_Phone: 269025134,
  XF86XK_Q: 269025136,
  XF86XK_Reply: 269025138,
  XF86XK_Reload: 269025139,
  XF86XK_RotateWindows: 269025140,
  XF86XK_RotationPB: 269025141,
  XF86XK_RotationKB: 269025142,
  XF86XK_Save: 269025143,
  XF86XK_ScrollUp: 269025144,
  XF86XK_ScrollDown: 269025145,
  XF86XK_ScrollClick: 269025146,
  XF86XK_Send: 269025147,
  XF86XK_Spell: 269025148,
  XF86XK_SplitScreen: 269025149,
  XF86XK_Support: 269025150,
  XF86XK_TaskPane: 269025151,
  XF86XK_Terminal: 269025152,
  XF86XK_Tools: 269025153,
  XF86XK_Travel: 269025154,
  XF86XK_UserPB: 269025156,
  XF86XK_User1KB: 269025157,
  XF86XK_User2KB: 269025158,
  XF86XK_Video: 269025159,
  XF86XK_WheelButton: 269025160,
  XF86XK_Word: 269025161,
  XF86XK_Xfer: 269025162,
  XF86XK_ZoomIn: 269025163,
  XF86XK_ZoomOut: 269025164,
  XF86XK_Away: 269025165,
  XF86XK_Messenger: 269025166,
  XF86XK_WebCam: 269025167,
  XF86XK_MailForward: 269025168,
  XF86XK_Pictures: 269025169,
  XF86XK_Music: 269025170,
  XF86XK_Battery: 269025171,
  XF86XK_Bluetooth: 269025172,
  XF86XK_WLAN: 269025173,
  XF86XK_UWB: 269025174,
  XF86XK_AudioForward: 269025175,
  XF86XK_AudioRepeat: 269025176,
  XF86XK_AudioRandomPlay: 269025177,
  XF86XK_Subtitle: 269025178,
  XF86XK_AudioCycleTrack: 269025179,
  XF86XK_CycleAngle: 269025180,
  XF86XK_FrameBack: 269025181,
  XF86XK_FrameForward: 269025182,
  XF86XK_Time: 269025183,
  XF86XK_Select: 269025184,
  XF86XK_View: 269025185,
  XF86XK_TopMenu: 269025186,
  XF86XK_Red: 269025187,
  XF86XK_Green: 269025188,
  XF86XK_Yellow: 269025189,
  XF86XK_Blue: 269025190,
  XF86XK_Suspend: 269025191,
  XF86XK_Hibernate: 269025192,
  XF86XK_TouchpadToggle: 269025193,
  XF86XK_TouchpadOn: 269025200,
  XF86XK_TouchpadOff: 269025201,
  XF86XK_AudioMicMute: 269025202,
  XF86XK_Switch_VT_1: 269024769,
  XF86XK_Switch_VT_2: 269024770,
  XF86XK_Switch_VT_3: 269024771,
  XF86XK_Switch_VT_4: 269024772,
  XF86XK_Switch_VT_5: 269024773,
  XF86XK_Switch_VT_6: 269024774,
  XF86XK_Switch_VT_7: 269024775,
  XF86XK_Switch_VT_8: 269024776,
  XF86XK_Switch_VT_9: 269024777,
  XF86XK_Switch_VT_10: 269024778,
  XF86XK_Switch_VT_11: 269024779,
  XF86XK_Switch_VT_12: 269024780,
  XF86XK_Ungrab: 269024800,
  XF86XK_ClearGrab: 269024801,
  XF86XK_Next_VMode: 269024802,
  XF86XK_Prev_VMode: 269024803,
  XF86XK_LogWindowTree: 269024804,
  XF86XK_LogGrabInfo: 269024805
};

// node_modules/@novnc/novnc/core/input/keysymdef.js
var codepoints = {
  256: 960,
  // XK_Amacron
  257: 992,
  // XK_amacron
  258: 451,
  // XK_Abreve
  259: 483,
  // XK_abreve
  260: 417,
  // XK_Aogonek
  261: 433,
  // XK_aogonek
  262: 454,
  // XK_Cacute
  263: 486,
  // XK_cacute
  264: 710,
  // XK_Ccircumflex
  265: 742,
  // XK_ccircumflex
  266: 709,
  // XK_Cabovedot
  267: 741,
  // XK_cabovedot
  268: 456,
  // XK_Ccaron
  269: 488,
  // XK_ccaron
  270: 463,
  // XK_Dcaron
  271: 495,
  // XK_dcaron
  272: 464,
  // XK_Dstroke
  273: 496,
  // XK_dstroke
  274: 938,
  // XK_Emacron
  275: 954,
  // XK_emacron
  278: 972,
  // XK_Eabovedot
  279: 1004,
  // XK_eabovedot
  280: 458,
  // XK_Eogonek
  281: 490,
  // XK_eogonek
  282: 460,
  // XK_Ecaron
  283: 492,
  // XK_ecaron
  284: 728,
  // XK_Gcircumflex
  285: 760,
  // XK_gcircumflex
  286: 683,
  // XK_Gbreve
  287: 699,
  // XK_gbreve
  288: 725,
  // XK_Gabovedot
  289: 757,
  // XK_gabovedot
  290: 939,
  // XK_Gcedilla
  291: 955,
  // XK_gcedilla
  292: 678,
  // XK_Hcircumflex
  293: 694,
  // XK_hcircumflex
  294: 673,
  // XK_Hstroke
  295: 689,
  // XK_hstroke
  296: 933,
  // XK_Itilde
  297: 949,
  // XK_itilde
  298: 975,
  // XK_Imacron
  299: 1007,
  // XK_imacron
  302: 967,
  // XK_Iogonek
  303: 999,
  // XK_iogonek
  304: 681,
  // XK_Iabovedot
  305: 697,
  // XK_idotless
  308: 684,
  // XK_Jcircumflex
  309: 700,
  // XK_jcircumflex
  310: 979,
  // XK_Kcedilla
  311: 1011,
  // XK_kcedilla
  312: 930,
  // XK_kra
  313: 453,
  // XK_Lacute
  314: 485,
  // XK_lacute
  315: 934,
  // XK_Lcedilla
  316: 950,
  // XK_lcedilla
  317: 421,
  // XK_Lcaron
  318: 437,
  // XK_lcaron
  321: 419,
  // XK_Lstroke
  322: 435,
  // XK_lstroke
  323: 465,
  // XK_Nacute
  324: 497,
  // XK_nacute
  325: 977,
  // XK_Ncedilla
  326: 1009,
  // XK_ncedilla
  327: 466,
  // XK_Ncaron
  328: 498,
  // XK_ncaron
  330: 957,
  // XK_ENG
  331: 959,
  // XK_eng
  332: 978,
  // XK_Omacron
  333: 1010,
  // XK_omacron
  336: 469,
  // XK_Odoubleacute
  337: 501,
  // XK_odoubleacute
  338: 5052,
  // XK_OE
  339: 5053,
  // XK_oe
  340: 448,
  // XK_Racute
  341: 480,
  // XK_racute
  342: 931,
  // XK_Rcedilla
  343: 947,
  // XK_rcedilla
  344: 472,
  // XK_Rcaron
  345: 504,
  // XK_rcaron
  346: 422,
  // XK_Sacute
  347: 438,
  // XK_sacute
  348: 734,
  // XK_Scircumflex
  349: 766,
  // XK_scircumflex
  350: 426,
  // XK_Scedilla
  351: 442,
  // XK_scedilla
  352: 425,
  // XK_Scaron
  353: 441,
  // XK_scaron
  354: 478,
  // XK_Tcedilla
  355: 510,
  // XK_tcedilla
  356: 427,
  // XK_Tcaron
  357: 443,
  // XK_tcaron
  358: 940,
  // XK_Tslash
  359: 956,
  // XK_tslash
  360: 989,
  // XK_Utilde
  361: 1021,
  // XK_utilde
  362: 990,
  // XK_Umacron
  363: 1022,
  // XK_umacron
  364: 733,
  // XK_Ubreve
  365: 765,
  // XK_ubreve
  366: 473,
  // XK_Uring
  367: 505,
  // XK_uring
  368: 475,
  // XK_Udoubleacute
  369: 507,
  // XK_udoubleacute
  370: 985,
  // XK_Uogonek
  371: 1017,
  // XK_uogonek
  376: 5054,
  // XK_Ydiaeresis
  377: 428,
  // XK_Zacute
  378: 444,
  // XK_zacute
  379: 431,
  // XK_Zabovedot
  380: 447,
  // XK_zabovedot
  381: 430,
  // XK_Zcaron
  382: 446,
  // XK_zcaron
  402: 2294,
  // XK_function
  466: 16777681,
  // XK_Ocaron
  711: 439,
  // XK_caron
  728: 418,
  // XK_breve
  729: 511,
  // XK_abovedot
  731: 434,
  // XK_ogonek
  733: 445,
  // XK_doubleacute
  901: 1966,
  // XK_Greek_accentdieresis
  902: 1953,
  // XK_Greek_ALPHAaccent
  904: 1954,
  // XK_Greek_EPSILONaccent
  905: 1955,
  // XK_Greek_ETAaccent
  906: 1956,
  // XK_Greek_IOTAaccent
  908: 1959,
  // XK_Greek_OMICRONaccent
  910: 1960,
  // XK_Greek_UPSILONaccent
  911: 1963,
  // XK_Greek_OMEGAaccent
  912: 1974,
  // XK_Greek_iotaaccentdieresis
  913: 1985,
  // XK_Greek_ALPHA
  914: 1986,
  // XK_Greek_BETA
  915: 1987,
  // XK_Greek_GAMMA
  916: 1988,
  // XK_Greek_DELTA
  917: 1989,
  // XK_Greek_EPSILON
  918: 1990,
  // XK_Greek_ZETA
  919: 1991,
  // XK_Greek_ETA
  920: 1992,
  // XK_Greek_THETA
  921: 1993,
  // XK_Greek_IOTA
  922: 1994,
  // XK_Greek_KAPPA
  923: 1995,
  // XK_Greek_LAMDA
  924: 1996,
  // XK_Greek_MU
  925: 1997,
  // XK_Greek_NU
  926: 1998,
  // XK_Greek_XI
  927: 1999,
  // XK_Greek_OMICRON
  928: 2e3,
  // XK_Greek_PI
  929: 2001,
  // XK_Greek_RHO
  931: 2002,
  // XK_Greek_SIGMA
  932: 2004,
  // XK_Greek_TAU
  933: 2005,
  // XK_Greek_UPSILON
  934: 2006,
  // XK_Greek_PHI
  935: 2007,
  // XK_Greek_CHI
  936: 2008,
  // XK_Greek_PSI
  937: 2009,
  // XK_Greek_OMEGA
  938: 1957,
  // XK_Greek_IOTAdieresis
  939: 1961,
  // XK_Greek_UPSILONdieresis
  940: 1969,
  // XK_Greek_alphaaccent
  941: 1970,
  // XK_Greek_epsilonaccent
  942: 1971,
  // XK_Greek_etaaccent
  943: 1972,
  // XK_Greek_iotaaccent
  944: 1978,
  // XK_Greek_upsilonaccentdieresis
  945: 2017,
  // XK_Greek_alpha
  946: 2018,
  // XK_Greek_beta
  947: 2019,
  // XK_Greek_gamma
  948: 2020,
  // XK_Greek_delta
  949: 2021,
  // XK_Greek_epsilon
  950: 2022,
  // XK_Greek_zeta
  951: 2023,
  // XK_Greek_eta
  952: 2024,
  // XK_Greek_theta
  953: 2025,
  // XK_Greek_iota
  954: 2026,
  // XK_Greek_kappa
  955: 2027,
  // XK_Greek_lamda
  956: 2028,
  // XK_Greek_mu
  957: 2029,
  // XK_Greek_nu
  958: 2030,
  // XK_Greek_xi
  959: 2031,
  // XK_Greek_omicron
  960: 2032,
  // XK_Greek_pi
  961: 2033,
  // XK_Greek_rho
  962: 2035,
  // XK_Greek_finalsmallsigma
  963: 2034,
  // XK_Greek_sigma
  964: 2036,
  // XK_Greek_tau
  965: 2037,
  // XK_Greek_upsilon
  966: 2038,
  // XK_Greek_phi
  967: 2039,
  // XK_Greek_chi
  968: 2040,
  // XK_Greek_psi
  969: 2041,
  // XK_Greek_omega
  970: 1973,
  // XK_Greek_iotadieresis
  971: 1977,
  // XK_Greek_upsilondieresis
  972: 1975,
  // XK_Greek_omicronaccent
  973: 1976,
  // XK_Greek_upsilonaccent
  974: 1979,
  // XK_Greek_omegaaccent
  1025: 1715,
  // XK_Cyrillic_IO
  1026: 1713,
  // XK_Serbian_DJE
  1027: 1714,
  // XK_Macedonia_GJE
  1028: 1716,
  // XK_Ukrainian_IE
  1029: 1717,
  // XK_Macedonia_DSE
  1030: 1718,
  // XK_Ukrainian_I
  1031: 1719,
  // XK_Ukrainian_YI
  1032: 1720,
  // XK_Cyrillic_JE
  1033: 1721,
  // XK_Cyrillic_LJE
  1034: 1722,
  // XK_Cyrillic_NJE
  1035: 1723,
  // XK_Serbian_TSHE
  1036: 1724,
  // XK_Macedonia_KJE
  1038: 1726,
  // XK_Byelorussian_SHORTU
  1039: 1727,
  // XK_Cyrillic_DZHE
  1040: 1761,
  // XK_Cyrillic_A
  1041: 1762,
  // XK_Cyrillic_BE
  1042: 1783,
  // XK_Cyrillic_VE
  1043: 1767,
  // XK_Cyrillic_GHE
  1044: 1764,
  // XK_Cyrillic_DE
  1045: 1765,
  // XK_Cyrillic_IE
  1046: 1782,
  // XK_Cyrillic_ZHE
  1047: 1786,
  // XK_Cyrillic_ZE
  1048: 1769,
  // XK_Cyrillic_I
  1049: 1770,
  // XK_Cyrillic_SHORTI
  1050: 1771,
  // XK_Cyrillic_KA
  1051: 1772,
  // XK_Cyrillic_EL
  1052: 1773,
  // XK_Cyrillic_EM
  1053: 1774,
  // XK_Cyrillic_EN
  1054: 1775,
  // XK_Cyrillic_O
  1055: 1776,
  // XK_Cyrillic_PE
  1056: 1778,
  // XK_Cyrillic_ER
  1057: 1779,
  // XK_Cyrillic_ES
  1058: 1780,
  // XK_Cyrillic_TE
  1059: 1781,
  // XK_Cyrillic_U
  1060: 1766,
  // XK_Cyrillic_EF
  1061: 1768,
  // XK_Cyrillic_HA
  1062: 1763,
  // XK_Cyrillic_TSE
  1063: 1790,
  // XK_Cyrillic_CHE
  1064: 1787,
  // XK_Cyrillic_SHA
  1065: 1789,
  // XK_Cyrillic_SHCHA
  1066: 1791,
  // XK_Cyrillic_HARDSIGN
  1067: 1785,
  // XK_Cyrillic_YERU
  1068: 1784,
  // XK_Cyrillic_SOFTSIGN
  1069: 1788,
  // XK_Cyrillic_E
  1070: 1760,
  // XK_Cyrillic_YU
  1071: 1777,
  // XK_Cyrillic_YA
  1072: 1729,
  // XK_Cyrillic_a
  1073: 1730,
  // XK_Cyrillic_be
  1074: 1751,
  // XK_Cyrillic_ve
  1075: 1735,
  // XK_Cyrillic_ghe
  1076: 1732,
  // XK_Cyrillic_de
  1077: 1733,
  // XK_Cyrillic_ie
  1078: 1750,
  // XK_Cyrillic_zhe
  1079: 1754,
  // XK_Cyrillic_ze
  1080: 1737,
  // XK_Cyrillic_i
  1081: 1738,
  // XK_Cyrillic_shorti
  1082: 1739,
  // XK_Cyrillic_ka
  1083: 1740,
  // XK_Cyrillic_el
  1084: 1741,
  // XK_Cyrillic_em
  1085: 1742,
  // XK_Cyrillic_en
  1086: 1743,
  // XK_Cyrillic_o
  1087: 1744,
  // XK_Cyrillic_pe
  1088: 1746,
  // XK_Cyrillic_er
  1089: 1747,
  // XK_Cyrillic_es
  1090: 1748,
  // XK_Cyrillic_te
  1091: 1749,
  // XK_Cyrillic_u
  1092: 1734,
  // XK_Cyrillic_ef
  1093: 1736,
  // XK_Cyrillic_ha
  1094: 1731,
  // XK_Cyrillic_tse
  1095: 1758,
  // XK_Cyrillic_che
  1096: 1755,
  // XK_Cyrillic_sha
  1097: 1757,
  // XK_Cyrillic_shcha
  1098: 1759,
  // XK_Cyrillic_hardsign
  1099: 1753,
  // XK_Cyrillic_yeru
  1100: 1752,
  // XK_Cyrillic_softsign
  1101: 1756,
  // XK_Cyrillic_e
  1102: 1728,
  // XK_Cyrillic_yu
  1103: 1745,
  // XK_Cyrillic_ya
  1105: 1699,
  // XK_Cyrillic_io
  1106: 1697,
  // XK_Serbian_dje
  1107: 1698,
  // XK_Macedonia_gje
  1108: 1700,
  // XK_Ukrainian_ie
  1109: 1701,
  // XK_Macedonia_dse
  1110: 1702,
  // XK_Ukrainian_i
  1111: 1703,
  // XK_Ukrainian_yi
  1112: 1704,
  // XK_Cyrillic_je
  1113: 1705,
  // XK_Cyrillic_lje
  1114: 1706,
  // XK_Cyrillic_nje
  1115: 1707,
  // XK_Serbian_tshe
  1116: 1708,
  // XK_Macedonia_kje
  1118: 1710,
  // XK_Byelorussian_shortu
  1119: 1711,
  // XK_Cyrillic_dzhe
  1168: 1725,
  // XK_Ukrainian_GHE_WITH_UPTURN
  1169: 1709,
  // XK_Ukrainian_ghe_with_upturn
  1488: 3296,
  // XK_hebrew_aleph
  1489: 3297,
  // XK_hebrew_bet
  1490: 3298,
  // XK_hebrew_gimel
  1491: 3299,
  // XK_hebrew_dalet
  1492: 3300,
  // XK_hebrew_he
  1493: 3301,
  // XK_hebrew_waw
  1494: 3302,
  // XK_hebrew_zain
  1495: 3303,
  // XK_hebrew_chet
  1496: 3304,
  // XK_hebrew_tet
  1497: 3305,
  // XK_hebrew_yod
  1498: 3306,
  // XK_hebrew_finalkaph
  1499: 3307,
  // XK_hebrew_kaph
  1500: 3308,
  // XK_hebrew_lamed
  1501: 3309,
  // XK_hebrew_finalmem
  1502: 3310,
  // XK_hebrew_mem
  1503: 3311,
  // XK_hebrew_finalnun
  1504: 3312,
  // XK_hebrew_nun
  1505: 3313,
  // XK_hebrew_samech
  1506: 3314,
  // XK_hebrew_ayin
  1507: 3315,
  // XK_hebrew_finalpe
  1508: 3316,
  // XK_hebrew_pe
  1509: 3317,
  // XK_hebrew_finalzade
  1510: 3318,
  // XK_hebrew_zade
  1511: 3319,
  // XK_hebrew_qoph
  1512: 3320,
  // XK_hebrew_resh
  1513: 3321,
  // XK_hebrew_shin
  1514: 3322,
  // XK_hebrew_taw
  1548: 1452,
  // XK_Arabic_comma
  1563: 1467,
  // XK_Arabic_semicolon
  1567: 1471,
  // XK_Arabic_question_mark
  1569: 1473,
  // XK_Arabic_hamza
  1570: 1474,
  // XK_Arabic_maddaonalef
  1571: 1475,
  // XK_Arabic_hamzaonalef
  1572: 1476,
  // XK_Arabic_hamzaonwaw
  1573: 1477,
  // XK_Arabic_hamzaunderalef
  1574: 1478,
  // XK_Arabic_hamzaonyeh
  1575: 1479,
  // XK_Arabic_alef
  1576: 1480,
  // XK_Arabic_beh
  1577: 1481,
  // XK_Arabic_tehmarbuta
  1578: 1482,
  // XK_Arabic_teh
  1579: 1483,
  // XK_Arabic_theh
  1580: 1484,
  // XK_Arabic_jeem
  1581: 1485,
  // XK_Arabic_hah
  1582: 1486,
  // XK_Arabic_khah
  1583: 1487,
  // XK_Arabic_dal
  1584: 1488,
  // XK_Arabic_thal
  1585: 1489,
  // XK_Arabic_ra
  1586: 1490,
  // XK_Arabic_zain
  1587: 1491,
  // XK_Arabic_seen
  1588: 1492,
  // XK_Arabic_sheen
  1589: 1493,
  // XK_Arabic_sad
  1590: 1494,
  // XK_Arabic_dad
  1591: 1495,
  // XK_Arabic_tah
  1592: 1496,
  // XK_Arabic_zah
  1593: 1497,
  // XK_Arabic_ain
  1594: 1498,
  // XK_Arabic_ghain
  1600: 1504,
  // XK_Arabic_tatweel
  1601: 1505,
  // XK_Arabic_feh
  1602: 1506,
  // XK_Arabic_qaf
  1603: 1507,
  // XK_Arabic_kaf
  1604: 1508,
  // XK_Arabic_lam
  1605: 1509,
  // XK_Arabic_meem
  1606: 1510,
  // XK_Arabic_noon
  1607: 1511,
  // XK_Arabic_ha
  1608: 1512,
  // XK_Arabic_waw
  1609: 1513,
  // XK_Arabic_alefmaksura
  1610: 1514,
  // XK_Arabic_yeh
  1611: 1515,
  // XK_Arabic_fathatan
  1612: 1516,
  // XK_Arabic_dammatan
  1613: 1517,
  // XK_Arabic_kasratan
  1614: 1518,
  // XK_Arabic_fatha
  1615: 1519,
  // XK_Arabic_damma
  1616: 1520,
  // XK_Arabic_kasra
  1617: 1521,
  // XK_Arabic_shadda
  1618: 1522,
  // XK_Arabic_sukun
  3585: 3489,
  // XK_Thai_kokai
  3586: 3490,
  // XK_Thai_khokhai
  3587: 3491,
  // XK_Thai_khokhuat
  3588: 3492,
  // XK_Thai_khokhwai
  3589: 3493,
  // XK_Thai_khokhon
  3590: 3494,
  // XK_Thai_khorakhang
  3591: 3495,
  // XK_Thai_ngongu
  3592: 3496,
  // XK_Thai_chochan
  3593: 3497,
  // XK_Thai_choching
  3594: 3498,
  // XK_Thai_chochang
  3595: 3499,
  // XK_Thai_soso
  3596: 3500,
  // XK_Thai_chochoe
  3597: 3501,
  // XK_Thai_yoying
  3598: 3502,
  // XK_Thai_dochada
  3599: 3503,
  // XK_Thai_topatak
  3600: 3504,
  // XK_Thai_thothan
  3601: 3505,
  // XK_Thai_thonangmontho
  3602: 3506,
  // XK_Thai_thophuthao
  3603: 3507,
  // XK_Thai_nonen
  3604: 3508,
  // XK_Thai_dodek
  3605: 3509,
  // XK_Thai_totao
  3606: 3510,
  // XK_Thai_thothung
  3607: 3511,
  // XK_Thai_thothahan
  3608: 3512,
  // XK_Thai_thothong
  3609: 3513,
  // XK_Thai_nonu
  3610: 3514,
  // XK_Thai_bobaimai
  3611: 3515,
  // XK_Thai_popla
  3612: 3516,
  // XK_Thai_phophung
  3613: 3517,
  // XK_Thai_fofa
  3614: 3518,
  // XK_Thai_phophan
  3615: 3519,
  // XK_Thai_fofan
  3616: 3520,
  // XK_Thai_phosamphao
  3617: 3521,
  // XK_Thai_moma
  3618: 3522,
  // XK_Thai_yoyak
  3619: 3523,
  // XK_Thai_rorua
  3620: 3524,
  // XK_Thai_ru
  3621: 3525,
  // XK_Thai_loling
  3622: 3526,
  // XK_Thai_lu
  3623: 3527,
  // XK_Thai_wowaen
  3624: 3528,
  // XK_Thai_sosala
  3625: 3529,
  // XK_Thai_sorusi
  3626: 3530,
  // XK_Thai_sosua
  3627: 3531,
  // XK_Thai_hohip
  3628: 3532,
  // XK_Thai_lochula
  3629: 3533,
  // XK_Thai_oang
  3630: 3534,
  // XK_Thai_honokhuk
  3631: 3535,
  // XK_Thai_paiyannoi
  3632: 3536,
  // XK_Thai_saraa
  3633: 3537,
  // XK_Thai_maihanakat
  3634: 3538,
  // XK_Thai_saraaa
  3635: 3539,
  // XK_Thai_saraam
  3636: 3540,
  // XK_Thai_sarai
  3637: 3541,
  // XK_Thai_saraii
  3638: 3542,
  // XK_Thai_saraue
  3639: 3543,
  // XK_Thai_sarauee
  3640: 3544,
  // XK_Thai_sarau
  3641: 3545,
  // XK_Thai_sarauu
  3642: 3546,
  // XK_Thai_phinthu
  3647: 3551,
  // XK_Thai_baht
  3648: 3552,
  // XK_Thai_sarae
  3649: 3553,
  // XK_Thai_saraae
  3650: 3554,
  // XK_Thai_sarao
  3651: 3555,
  // XK_Thai_saraaimaimuan
  3652: 3556,
  // XK_Thai_saraaimaimalai
  3653: 3557,
  // XK_Thai_lakkhangyao
  3654: 3558,
  // XK_Thai_maiyamok
  3655: 3559,
  // XK_Thai_maitaikhu
  3656: 3560,
  // XK_Thai_maiek
  3657: 3561,
  // XK_Thai_maitho
  3658: 3562,
  // XK_Thai_maitri
  3659: 3563,
  // XK_Thai_maichattawa
  3660: 3564,
  // XK_Thai_thanthakhat
  3661: 3565,
  // XK_Thai_nikhahit
  3664: 3568,
  // XK_Thai_leksun
  3665: 3569,
  // XK_Thai_leknung
  3666: 3570,
  // XK_Thai_leksong
  3667: 3571,
  // XK_Thai_leksam
  3668: 3572,
  // XK_Thai_leksi
  3669: 3573,
  // XK_Thai_lekha
  3670: 3574,
  // XK_Thai_lekhok
  3671: 3575,
  // XK_Thai_lekchet
  3672: 3576,
  // XK_Thai_lekpaet
  3673: 3577,
  // XK_Thai_lekkao
  8194: 2722,
  // XK_enspace
  8195: 2721,
  // XK_emspace
  8196: 2723,
  // XK_em3space
  8197: 2724,
  // XK_em4space
  8199: 2725,
  // XK_digitspace
  8200: 2726,
  // XK_punctspace
  8201: 2727,
  // XK_thinspace
  8202: 2728,
  // XK_hairspace
  8210: 2747,
  // XK_figdash
  8211: 2730,
  // XK_endash
  8212: 2729,
  // XK_emdash
  8213: 1967,
  // XK_Greek_horizbar
  8215: 3295,
  // XK_hebrew_doublelowline
  8216: 2768,
  // XK_leftsinglequotemark
  8217: 2769,
  // XK_rightsinglequotemark
  8218: 2813,
  // XK_singlelowquotemark
  8220: 2770,
  // XK_leftdoublequotemark
  8221: 2771,
  // XK_rightdoublequotemark
  8222: 2814,
  // XK_doublelowquotemark
  8224: 2801,
  // XK_dagger
  8225: 2802,
  // XK_doubledagger
  8226: 2790,
  // XK_enfilledcircbullet
  8229: 2735,
  // XK_doubbaselinedot
  8230: 2734,
  // XK_ellipsis
  8240: 2773,
  // XK_permille
  8242: 2774,
  // XK_minutes
  8243: 2775,
  // XK_seconds
  8248: 2812,
  // XK_caret
  8254: 1150,
  // XK_overline
  8361: 3839,
  // XK_Korean_Won
  8364: 8364,
  // XK_EuroSign
  8453: 2744,
  // XK_careof
  8470: 1712,
  // XK_numerosign
  8471: 2811,
  // XK_phonographcopyright
  8478: 2772,
  // XK_prescription
  8482: 2761,
  // XK_trademark
  8531: 2736,
  // XK_onethird
  8532: 2737,
  // XK_twothirds
  8533: 2738,
  // XK_onefifth
  8534: 2739,
  // XK_twofifths
  8535: 2740,
  // XK_threefifths
  8536: 2741,
  // XK_fourfifths
  8537: 2742,
  // XK_onesixth
  8538: 2743,
  // XK_fivesixths
  8539: 2755,
  // XK_oneeighth
  8540: 2756,
  // XK_threeeighths
  8541: 2757,
  // XK_fiveeighths
  8542: 2758,
  // XK_seveneighths
  8592: 2299,
  // XK_leftarrow
  8593: 2300,
  // XK_uparrow
  8594: 2301,
  // XK_rightarrow
  8595: 2302,
  // XK_downarrow
  8658: 2254,
  // XK_implies
  8660: 2253,
  // XK_ifonlyif
  8706: 2287,
  // XK_partialderivative
  8711: 2245,
  // XK_nabla
  8728: 3018,
  // XK_jot
  8730: 2262,
  // XK_radical
  8733: 2241,
  // XK_variation
  8734: 2242,
  // XK_infinity
  8743: 2270,
  // XK_logicaland
  8744: 2271,
  // XK_logicalor
  8745: 2268,
  // XK_intersection
  8746: 2269,
  // XK_union
  8747: 2239,
  // XK_integral
  8756: 2240,
  // XK_therefore
  8764: 2248,
  // XK_approximate
  8771: 2249,
  // XK_similarequal
  8773: 16785992,
  // XK_approxeq
  8800: 2237,
  // XK_notequal
  8801: 2255,
  // XK_identical
  8804: 2236,
  // XK_lessthanequal
  8805: 2238,
  // XK_greaterthanequal
  8834: 2266,
  // XK_includedin
  8835: 2267,
  // XK_includes
  8866: 3068,
  // XK_righttack
  8867: 3036,
  // XK_lefttack
  8868: 3010,
  // XK_downtack
  8869: 3022,
  // XK_uptack
  8968: 3027,
  // XK_upstile
  8970: 3012,
  // XK_downstile
  8981: 2810,
  // XK_telephonerecorder
  8992: 2212,
  // XK_topintegral
  8993: 2213,
  // XK_botintegral
  9109: 3020,
  // XK_quad
  9115: 2219,
  // XK_topleftparens
  9117: 2220,
  // XK_botleftparens
  9118: 2221,
  // XK_toprightparens
  9120: 2222,
  // XK_botrightparens
  9121: 2215,
  // XK_topleftsqbracket
  9123: 2216,
  // XK_botleftsqbracket
  9124: 2217,
  // XK_toprightsqbracket
  9126: 2218,
  // XK_botrightsqbracket
  9128: 2223,
  // XK_leftmiddlecurlybrace
  9132: 2224,
  // XK_rightmiddlecurlybrace
  9143: 2209,
  // XK_leftradical
  9146: 2543,
  // XK_horizlinescan1
  9147: 2544,
  // XK_horizlinescan3
  9148: 2546,
  // XK_horizlinescan7
  9149: 2547,
  // XK_horizlinescan9
  9225: 2530,
  // XK_ht
  9226: 2533,
  // XK_lf
  9227: 2537,
  // XK_vt
  9228: 2531,
  // XK_ff
  9229: 2532,
  // XK_cr
  9251: 2732,
  // XK_signifblank
  9252: 2536,
  // XK_nl
  9472: 2211,
  // XK_horizconnector
  9474: 2214,
  // XK_vertconnector
  9484: 2210,
  // XK_topleftradical
  9488: 2539,
  // XK_uprightcorner
  9492: 2541,
  // XK_lowleftcorner
  9496: 2538,
  // XK_lowrightcorner
  9500: 2548,
  // XK_leftt
  9508: 2549,
  // XK_rightt
  9516: 2551,
  // XK_topt
  9524: 2550,
  // XK_bott
  9532: 2542,
  // XK_crossinglines
  9618: 2529,
  // XK_checkerboard
  9642: 2791,
  // XK_enfilledsqbullet
  9643: 2785,
  // XK_enopensquarebullet
  9644: 2779,
  // XK_filledrectbullet
  9645: 2786,
  // XK_openrectbullet
  9646: 2783,
  // XK_emfilledrect
  9647: 2767,
  // XK_emopenrectangle
  9650: 2792,
  // XK_filledtribulletup
  9651: 2787,
  // XK_opentribulletup
  9654: 2781,
  // XK_filledrighttribullet
  9655: 2765,
  // XK_rightopentriangle
  9660: 2793,
  // XK_filledtribulletdown
  9661: 2788,
  // XK_opentribulletdown
  9664: 2780,
  // XK_filledlefttribullet
  9665: 2764,
  // XK_leftopentriangle
  9670: 2528,
  // XK_soliddiamond
  9675: 2766,
  // XK_emopencircle
  9679: 2782,
  // XK_emfilledcircle
  9702: 2784,
  // XK_enopencircbullet
  9734: 2789,
  // XK_openstar
  9742: 2809,
  // XK_telephone
  9747: 2762,
  // XK_signaturemark
  9756: 2794,
  // XK_leftpointer
  9758: 2795,
  // XK_rightpointer
  9792: 2808,
  // XK_femalesymbol
  9794: 2807,
  // XK_malesymbol
  9827: 2796,
  // XK_club
  9829: 2798,
  // XK_heart
  9830: 2797,
  // XK_diamond
  9837: 2806,
  // XK_musicalflat
  9839: 2805,
  // XK_musicalsharp
  10003: 2803,
  // XK_checkmark
  10007: 2804,
  // XK_ballotcross
  10013: 2777,
  // XK_latincross
  10016: 2800,
  // XK_maltesecross
  10216: 2748,
  // XK_leftanglebracket
  10217: 2750,
  // XK_rightanglebracket
  12289: 1188,
  // XK_kana_comma
  12290: 1185,
  // XK_kana_fullstop
  12300: 1186,
  // XK_kana_openingbracket
  12301: 1187,
  // XK_kana_closingbracket
  12443: 1246,
  // XK_voicedsound
  12444: 1247,
  // XK_semivoicedsound
  12449: 1191,
  // XK_kana_a
  12450: 1201,
  // XK_kana_A
  12451: 1192,
  // XK_kana_i
  12452: 1202,
  // XK_kana_I
  12453: 1193,
  // XK_kana_u
  12454: 1203,
  // XK_kana_U
  12455: 1194,
  // XK_kana_e
  12456: 1204,
  // XK_kana_E
  12457: 1195,
  // XK_kana_o
  12458: 1205,
  // XK_kana_O
  12459: 1206,
  // XK_kana_KA
  12461: 1207,
  // XK_kana_KI
  12463: 1208,
  // XK_kana_KU
  12465: 1209,
  // XK_kana_KE
  12467: 1210,
  // XK_kana_KO
  12469: 1211,
  // XK_kana_SA
  12471: 1212,
  // XK_kana_SHI
  12473: 1213,
  // XK_kana_SU
  12475: 1214,
  // XK_kana_SE
  12477: 1215,
  // XK_kana_SO
  12479: 1216,
  // XK_kana_TA
  12481: 1217,
  // XK_kana_CHI
  12483: 1199,
  // XK_kana_tsu
  12484: 1218,
  // XK_kana_TSU
  12486: 1219,
  // XK_kana_TE
  12488: 1220,
  // XK_kana_TO
  12490: 1221,
  // XK_kana_NA
  12491: 1222,
  // XK_kana_NI
  12492: 1223,
  // XK_kana_NU
  12493: 1224,
  // XK_kana_NE
  12494: 1225,
  // XK_kana_NO
  12495: 1226,
  // XK_kana_HA
  12498: 1227,
  // XK_kana_HI
  12501: 1228,
  // XK_kana_FU
  12504: 1229,
  // XK_kana_HE
  12507: 1230,
  // XK_kana_HO
  12510: 1231,
  // XK_kana_MA
  12511: 1232,
  // XK_kana_MI
  12512: 1233,
  // XK_kana_MU
  12513: 1234,
  // XK_kana_ME
  12514: 1235,
  // XK_kana_MO
  12515: 1196,
  // XK_kana_ya
  12516: 1236,
  // XK_kana_YA
  12517: 1197,
  // XK_kana_yu
  12518: 1237,
  // XK_kana_YU
  12519: 1198,
  // XK_kana_yo
  12520: 1238,
  // XK_kana_YO
  12521: 1239,
  // XK_kana_RA
  12522: 1240,
  // XK_kana_RI
  12523: 1241,
  // XK_kana_RU
  12524: 1242,
  // XK_kana_RE
  12525: 1243,
  // XK_kana_RO
  12527: 1244,
  // XK_kana_WA
  12530: 1190,
  // XK_kana_WO
  12531: 1245,
  // XK_kana_N
  12539: 1189,
  // XK_kana_conjunctive
  12540: 1200
  // XK_prolongedsound
};
var keysymdef_default = {
  lookup(u) {
    if (u >= 32 && u <= 255) {
      return u;
    }
    const keysym = codepoints[u];
    if (keysym !== void 0) {
      return keysym;
    }
    return 16777216 | u;
  }
};

// node_modules/@novnc/novnc/core/input/vkeys.js
var vkeys_default = {
  8: "Backspace",
  9: "Tab",
  10: "NumpadClear",
  13: "Enter",
  16: "ShiftLeft",
  17: "ControlLeft",
  18: "AltLeft",
  19: "Pause",
  20: "CapsLock",
  21: "Lang1",
  25: "Lang2",
  27: "Escape",
  28: "Convert",
  29: "NonConvert",
  32: "Space",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  41: "Select",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  47: "Help",
  48: "Digit0",
  49: "Digit1",
  50: "Digit2",
  51: "Digit3",
  52: "Digit4",
  53: "Digit5",
  54: "Digit6",
  55: "Digit7",
  56: "Digit8",
  57: "Digit9",
  91: "MetaLeft",
  92: "MetaRight",
  93: "ContextMenu",
  95: "Sleep",
  96: "Numpad0",
  97: "Numpad1",
  98: "Numpad2",
  99: "Numpad3",
  100: "Numpad4",
  101: "Numpad5",
  102: "Numpad6",
  103: "Numpad7",
  104: "Numpad8",
  105: "Numpad9",
  106: "NumpadMultiply",
  107: "NumpadAdd",
  108: "NumpadDecimal",
  109: "NumpadSubtract",
  110: "NumpadDecimal",
  // Duplicate, because buggy on Windows
  111: "NumpadDivide",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  124: "F13",
  125: "F14",
  126: "F15",
  127: "F16",
  128: "F17",
  129: "F18",
  130: "F19",
  131: "F20",
  132: "F21",
  133: "F22",
  134: "F23",
  135: "F24",
  144: "NumLock",
  145: "ScrollLock",
  166: "BrowserBack",
  167: "BrowserForward",
  168: "BrowserRefresh",
  169: "BrowserStop",
  170: "BrowserSearch",
  171: "BrowserFavorites",
  172: "BrowserHome",
  173: "AudioVolumeMute",
  174: "AudioVolumeDown",
  175: "AudioVolumeUp",
  176: "MediaTrackNext",
  177: "MediaTrackPrevious",
  178: "MediaStop",
  179: "MediaPlayPause",
  180: "LaunchMail",
  181: "MediaSelect",
  182: "LaunchApp1",
  183: "LaunchApp2",
  225: "AltRight"
  // Only when it is AltGraph
};

// node_modules/@novnc/novnc/core/input/fixedkeys.js
var fixedkeys_default = {
  // 3.1.1.1. Writing System Keys
  "Backspace": "Backspace",
  // 3.1.1.2. Functional Keys
  "AltLeft": "Alt",
  "AltRight": "Alt",
  // This could also be 'AltGraph'
  "CapsLock": "CapsLock",
  "ContextMenu": "ContextMenu",
  "ControlLeft": "Control",
  "ControlRight": "Control",
  "Enter": "Enter",
  "MetaLeft": "Meta",
  "MetaRight": "Meta",
  "ShiftLeft": "Shift",
  "ShiftRight": "Shift",
  "Tab": "Tab",
  // FIXME: Japanese/Korean keys
  // 3.1.2. Control Pad Section
  "Delete": "Delete",
  "End": "End",
  "Help": "Help",
  "Home": "Home",
  "Insert": "Insert",
  "PageDown": "PageDown",
  "PageUp": "PageUp",
  // 3.1.3. Arrow Pad Section
  "ArrowDown": "ArrowDown",
  "ArrowLeft": "ArrowLeft",
  "ArrowRight": "ArrowRight",
  "ArrowUp": "ArrowUp",
  // 3.1.4. Numpad Section
  "NumLock": "NumLock",
  "NumpadBackspace": "Backspace",
  "NumpadClear": "Clear",
  // 3.1.5. Function Section
  "Escape": "Escape",
  "F1": "F1",
  "F2": "F2",
  "F3": "F3",
  "F4": "F4",
  "F5": "F5",
  "F6": "F6",
  "F7": "F7",
  "F8": "F8",
  "F9": "F9",
  "F10": "F10",
  "F11": "F11",
  "F12": "F12",
  "F13": "F13",
  "F14": "F14",
  "F15": "F15",
  "F16": "F16",
  "F17": "F17",
  "F18": "F18",
  "F19": "F19",
  "F20": "F20",
  "F21": "F21",
  "F22": "F22",
  "F23": "F23",
  "F24": "F24",
  "F25": "F25",
  "F26": "F26",
  "F27": "F27",
  "F28": "F28",
  "F29": "F29",
  "F30": "F30",
  "F31": "F31",
  "F32": "F32",
  "F33": "F33",
  "F34": "F34",
  "F35": "F35",
  "PrintScreen": "PrintScreen",
  "ScrollLock": "ScrollLock",
  "Pause": "Pause",
  // 3.1.6. Media Keys
  "BrowserBack": "BrowserBack",
  "BrowserFavorites": "BrowserFavorites",
  "BrowserForward": "BrowserForward",
  "BrowserHome": "BrowserHome",
  "BrowserRefresh": "BrowserRefresh",
  "BrowserSearch": "BrowserSearch",
  "BrowserStop": "BrowserStop",
  "Eject": "Eject",
  "LaunchApp1": "LaunchMyComputer",
  "LaunchApp2": "LaunchCalendar",
  "LaunchMail": "LaunchMail",
  "MediaPlayPause": "MediaPlay",
  "MediaStop": "MediaStop",
  "MediaTrackNext": "MediaTrackNext",
  "MediaTrackPrevious": "MediaTrackPrevious",
  "Power": "Power",
  "Sleep": "Sleep",
  "AudioVolumeDown": "AudioVolumeDown",
  "AudioVolumeMute": "AudioVolumeMute",
  "AudioVolumeUp": "AudioVolumeUp",
  "WakeUp": "WakeUp"
};

// node_modules/@novnc/novnc/core/input/domkeytable.js
var DOMKeyTable = {};
function addStandard(key, standard) {
  if (standard === void 0) throw new Error('Undefined keysym for key "' + key + '"');
  if (key in DOMKeyTable) throw new Error('Duplicate entry for key "' + key + '"');
  DOMKeyTable[key] = [standard, standard, standard, standard];
}
function addLeftRight(key, left, right) {
  if (left === void 0) throw new Error('Undefined keysym for key "' + key + '"');
  if (right === void 0) throw new Error('Undefined keysym for key "' + key + '"');
  if (key in DOMKeyTable) throw new Error('Duplicate entry for key "' + key + '"');
  DOMKeyTable[key] = [left, left, right, left];
}
function addNumpad(key, standard, numpad) {
  if (standard === void 0) throw new Error('Undefined keysym for key "' + key + '"');
  if (numpad === void 0) throw new Error('Undefined keysym for key "' + key + '"');
  if (key in DOMKeyTable) throw new Error('Duplicate entry for key "' + key + '"');
  DOMKeyTable[key] = [standard, standard, standard, numpad];
}
addLeftRight("Alt", keysym_default.XK_Alt_L, keysym_default.XK_Alt_R);
addStandard("AltGraph", keysym_default.XK_ISO_Level3_Shift);
addStandard("CapsLock", keysym_default.XK_Caps_Lock);
addLeftRight("Control", keysym_default.XK_Control_L, keysym_default.XK_Control_R);
addLeftRight("Meta", keysym_default.XK_Super_L, keysym_default.XK_Super_R);
addStandard("NumLock", keysym_default.XK_Num_Lock);
addStandard("ScrollLock", keysym_default.XK_Scroll_Lock);
addLeftRight("Shift", keysym_default.XK_Shift_L, keysym_default.XK_Shift_R);
addNumpad("Enter", keysym_default.XK_Return, keysym_default.XK_KP_Enter);
addStandard("Tab", keysym_default.XK_Tab);
addNumpad(" ", keysym_default.XK_space, keysym_default.XK_KP_Space);
addNumpad("ArrowDown", keysym_default.XK_Down, keysym_default.XK_KP_Down);
addNumpad("ArrowLeft", keysym_default.XK_Left, keysym_default.XK_KP_Left);
addNumpad("ArrowRight", keysym_default.XK_Right, keysym_default.XK_KP_Right);
addNumpad("ArrowUp", keysym_default.XK_Up, keysym_default.XK_KP_Up);
addNumpad("End", keysym_default.XK_End, keysym_default.XK_KP_End);
addNumpad("Home", keysym_default.XK_Home, keysym_default.XK_KP_Home);
addNumpad("PageDown", keysym_default.XK_Next, keysym_default.XK_KP_Next);
addNumpad("PageUp", keysym_default.XK_Prior, keysym_default.XK_KP_Prior);
addStandard("Backspace", keysym_default.XK_BackSpace);
addNumpad("Clear", keysym_default.XK_Clear, keysym_default.XK_KP_Begin);
addStandard("Copy", keysym_default.XF86XK_Copy);
addStandard("Cut", keysym_default.XF86XK_Cut);
addNumpad("Delete", keysym_default.XK_Delete, keysym_default.XK_KP_Delete);
addNumpad("Insert", keysym_default.XK_Insert, keysym_default.XK_KP_Insert);
addStandard("Paste", keysym_default.XF86XK_Paste);
addStandard("Redo", keysym_default.XK_Redo);
addStandard("Undo", keysym_default.XK_Undo);
addStandard("Cancel", keysym_default.XK_Cancel);
addStandard("ContextMenu", keysym_default.XK_Menu);
addStandard("Escape", keysym_default.XK_Escape);
addStandard("Execute", keysym_default.XK_Execute);
addStandard("Find", keysym_default.XK_Find);
addStandard("Help", keysym_default.XK_Help);
addStandard("Pause", keysym_default.XK_Pause);
addStandard("Select", keysym_default.XK_Select);
addStandard("ZoomIn", keysym_default.XF86XK_ZoomIn);
addStandard("ZoomOut", keysym_default.XF86XK_ZoomOut);
addStandard("BrightnessDown", keysym_default.XF86XK_MonBrightnessDown);
addStandard("BrightnessUp", keysym_default.XF86XK_MonBrightnessUp);
addStandard("Eject", keysym_default.XF86XK_Eject);
addStandard("LogOff", keysym_default.XF86XK_LogOff);
addStandard("Power", keysym_default.XF86XK_PowerOff);
addStandard("PowerOff", keysym_default.XF86XK_PowerDown);
addStandard("PrintScreen", keysym_default.XK_Print);
addStandard("Hibernate", keysym_default.XF86XK_Hibernate);
addStandard("Standby", keysym_default.XF86XK_Standby);
addStandard("WakeUp", keysym_default.XF86XK_WakeUp);
addStandard("AllCandidates", keysym_default.XK_MultipleCandidate);
addStandard("Alphanumeric", keysym_default.XK_Eisu_toggle);
addStandard("CodeInput", keysym_default.XK_Codeinput);
addStandard("Compose", keysym_default.XK_Multi_key);
addStandard("Convert", keysym_default.XK_Henkan);
addStandard("GroupFirst", keysym_default.XK_ISO_First_Group);
addStandard("GroupLast", keysym_default.XK_ISO_Last_Group);
addStandard("GroupNext", keysym_default.XK_ISO_Next_Group);
addStandard("GroupPrevious", keysym_default.XK_ISO_Prev_Group);
addStandard("NonConvert", keysym_default.XK_Muhenkan);
addStandard("PreviousCandidate", keysym_default.XK_PreviousCandidate);
addStandard("SingleCandidate", keysym_default.XK_SingleCandidate);
addStandard("HangulMode", keysym_default.XK_Hangul);
addStandard("HanjaMode", keysym_default.XK_Hangul_Hanja);
addStandard("JunjaMode", keysym_default.XK_Hangul_Jeonja);
addStandard("Eisu", keysym_default.XK_Eisu_toggle);
addStandard("Hankaku", keysym_default.XK_Hankaku);
addStandard("Hiragana", keysym_default.XK_Hiragana);
addStandard("HiraganaKatakana", keysym_default.XK_Hiragana_Katakana);
addStandard("KanaMode", keysym_default.XK_Kana_Shift);
addStandard("KanjiMode", keysym_default.XK_Kanji);
addStandard("Katakana", keysym_default.XK_Katakana);
addStandard("Romaji", keysym_default.XK_Romaji);
addStandard("Zenkaku", keysym_default.XK_Zenkaku);
addStandard("ZenkakuHankaku", keysym_default.XK_Zenkaku_Hankaku);
addStandard("F1", keysym_default.XK_F1);
addStandard("F2", keysym_default.XK_F2);
addStandard("F3", keysym_default.XK_F3);
addStandard("F4", keysym_default.XK_F4);
addStandard("F5", keysym_default.XK_F5);
addStandard("F6", keysym_default.XK_F6);
addStandard("F7", keysym_default.XK_F7);
addStandard("F8", keysym_default.XK_F8);
addStandard("F9", keysym_default.XK_F9);
addStandard("F10", keysym_default.XK_F10);
addStandard("F11", keysym_default.XK_F11);
addStandard("F12", keysym_default.XK_F12);
addStandard("F13", keysym_default.XK_F13);
addStandard("F14", keysym_default.XK_F14);
addStandard("F15", keysym_default.XK_F15);
addStandard("F16", keysym_default.XK_F16);
addStandard("F17", keysym_default.XK_F17);
addStandard("F18", keysym_default.XK_F18);
addStandard("F19", keysym_default.XK_F19);
addStandard("F20", keysym_default.XK_F20);
addStandard("F21", keysym_default.XK_F21);
addStandard("F22", keysym_default.XK_F22);
addStandard("F23", keysym_default.XK_F23);
addStandard("F24", keysym_default.XK_F24);
addStandard("F25", keysym_default.XK_F25);
addStandard("F26", keysym_default.XK_F26);
addStandard("F27", keysym_default.XK_F27);
addStandard("F28", keysym_default.XK_F28);
addStandard("F29", keysym_default.XK_F29);
addStandard("F30", keysym_default.XK_F30);
addStandard("F31", keysym_default.XK_F31);
addStandard("F32", keysym_default.XK_F32);
addStandard("F33", keysym_default.XK_F33);
addStandard("F34", keysym_default.XK_F34);
addStandard("F35", keysym_default.XK_F35);
addStandard("Close", keysym_default.XF86XK_Close);
addStandard("MailForward", keysym_default.XF86XK_MailForward);
addStandard("MailReply", keysym_default.XF86XK_Reply);
addStandard("MailSend", keysym_default.XF86XK_Send);
addStandard("MediaFastForward", keysym_default.XF86XK_AudioForward);
addStandard("MediaPause", keysym_default.XF86XK_AudioPause);
addStandard("MediaPlay", keysym_default.XF86XK_AudioPlay);
addStandard("MediaRecord", keysym_default.XF86XK_AudioRecord);
addStandard("MediaRewind", keysym_default.XF86XK_AudioRewind);
addStandard("MediaStop", keysym_default.XF86XK_AudioStop);
addStandard("MediaTrackNext", keysym_default.XF86XK_AudioNext);
addStandard("MediaTrackPrevious", keysym_default.XF86XK_AudioPrev);
addStandard("New", keysym_default.XF86XK_New);
addStandard("Open", keysym_default.XF86XK_Open);
addStandard("Print", keysym_default.XK_Print);
addStandard("Save", keysym_default.XF86XK_Save);
addStandard("SpellCheck", keysym_default.XF86XK_Spell);
addStandard("AudioVolumeDown", keysym_default.XF86XK_AudioLowerVolume);
addStandard("AudioVolumeUp", keysym_default.XF86XK_AudioRaiseVolume);
addStandard("AudioVolumeMute", keysym_default.XF86XK_AudioMute);
addStandard("MicrophoneVolumeMute", keysym_default.XF86XK_AudioMicMute);
addStandard("LaunchApplication1", keysym_default.XF86XK_MyComputer);
addStandard("LaunchApplication2", keysym_default.XF86XK_Calculator);
addStandard("LaunchCalendar", keysym_default.XF86XK_Calendar);
addStandard("LaunchMail", keysym_default.XF86XK_Mail);
addStandard("LaunchMediaPlayer", keysym_default.XF86XK_AudioMedia);
addStandard("LaunchMusicPlayer", keysym_default.XF86XK_Music);
addStandard("LaunchPhone", keysym_default.XF86XK_Phone);
addStandard("LaunchScreenSaver", keysym_default.XF86XK_ScreenSaver);
addStandard("LaunchSpreadsheet", keysym_default.XF86XK_Excel);
addStandard("LaunchWebBrowser", keysym_default.XF86XK_WWW);
addStandard("LaunchWebCam", keysym_default.XF86XK_WebCam);
addStandard("LaunchWordProcessor", keysym_default.XF86XK_Word);
addStandard("BrowserBack", keysym_default.XF86XK_Back);
addStandard("BrowserFavorites", keysym_default.XF86XK_Favorites);
addStandard("BrowserForward", keysym_default.XF86XK_Forward);
addStandard("BrowserHome", keysym_default.XF86XK_HomePage);
addStandard("BrowserRefresh", keysym_default.XF86XK_Refresh);
addStandard("BrowserSearch", keysym_default.XF86XK_Search);
addStandard("BrowserStop", keysym_default.XF86XK_Stop);
addStandard("Dimmer", keysym_default.XF86XK_BrightnessAdjust);
addStandard("MediaAudioTrack", keysym_default.XF86XK_AudioCycleTrack);
addStandard("RandomToggle", keysym_default.XF86XK_AudioRandomPlay);
addStandard("SplitScreenToggle", keysym_default.XF86XK_SplitScreen);
addStandard("Subtitle", keysym_default.XF86XK_Subtitle);
addStandard("VideoModeNext", keysym_default.XF86XK_Next_VMode);
addNumpad("=", keysym_default.XK_equal, keysym_default.XK_KP_Equal);
addNumpad("+", keysym_default.XK_plus, keysym_default.XK_KP_Add);
addNumpad("-", keysym_default.XK_minus, keysym_default.XK_KP_Subtract);
addNumpad("*", keysym_default.XK_asterisk, keysym_default.XK_KP_Multiply);
addNumpad("/", keysym_default.XK_slash, keysym_default.XK_KP_Divide);
addNumpad(".", keysym_default.XK_period, keysym_default.XK_KP_Decimal);
addNumpad(",", keysym_default.XK_comma, keysym_default.XK_KP_Separator);
addNumpad("0", keysym_default.XK_0, keysym_default.XK_KP_0);
addNumpad("1", keysym_default.XK_1, keysym_default.XK_KP_1);
addNumpad("2", keysym_default.XK_2, keysym_default.XK_KP_2);
addNumpad("3", keysym_default.XK_3, keysym_default.XK_KP_3);
addNumpad("4", keysym_default.XK_4, keysym_default.XK_KP_4);
addNumpad("5", keysym_default.XK_5, keysym_default.XK_KP_5);
addNumpad("6", keysym_default.XK_6, keysym_default.XK_KP_6);
addNumpad("7", keysym_default.XK_7, keysym_default.XK_KP_7);
addNumpad("8", keysym_default.XK_8, keysym_default.XK_KP_8);
addNumpad("9", keysym_default.XK_9, keysym_default.XK_KP_9);
var domkeytable_default = DOMKeyTable;

// node_modules/@novnc/novnc/core/input/util.js
function getKeycode(evt) {
  if (evt.code) {
    switch (evt.code) {
      case "OSLeft":
        return "MetaLeft";
      case "OSRight":
        return "MetaRight";
    }
    return evt.code;
  }
  if (evt.keyCode in vkeys_default) {
    let code = vkeys_default[evt.keyCode];
    if (isMac() && code === "ContextMenu") {
      code = "MetaRight";
    }
    if (evt.location === 2) {
      switch (code) {
        case "ShiftLeft":
          return "ShiftRight";
        case "ControlLeft":
          return "ControlRight";
        case "AltLeft":
          return "AltRight";
      }
    }
    if (evt.location === 3) {
      switch (code) {
        case "Delete":
          return "NumpadDecimal";
        case "Insert":
          return "Numpad0";
        case "End":
          return "Numpad1";
        case "ArrowDown":
          return "Numpad2";
        case "PageDown":
          return "Numpad3";
        case "ArrowLeft":
          return "Numpad4";
        case "ArrowRight":
          return "Numpad6";
        case "Home":
          return "Numpad7";
        case "ArrowUp":
          return "Numpad8";
        case "PageUp":
          return "Numpad9";
        case "Enter":
          return "NumpadEnter";
      }
    }
    return code;
  }
  return "Unidentified";
}
function getKey(evt) {
  if (evt.key !== void 0 && evt.key !== "Unidentified") {
    switch (evt.key) {
      case "OS":
        return "Meta";
      case "LaunchMyComputer":
        return "LaunchApplication1";
      case "LaunchCalculator":
        return "LaunchApplication2";
    }
    switch (evt.key) {
      case "UIKeyInputUpArrow":
        return "ArrowUp";
      case "UIKeyInputDownArrow":
        return "ArrowDown";
      case "UIKeyInputLeftArrow":
        return "ArrowLeft";
      case "UIKeyInputRightArrow":
        return "ArrowRight";
      case "UIKeyInputEscape":
        return "Escape";
    }
    if (evt.key === "\0" && evt.code === "NumpadDecimal") {
      return "Delete";
    }
    return evt.key;
  }
  const code = getKeycode(evt);
  if (code in fixedkeys_default) {
    return fixedkeys_default[code];
  }
  if (evt.charCode) {
    return String.fromCharCode(evt.charCode);
  }
  return "Unidentified";
}
function getKeysym(evt) {
  const key = getKey(evt);
  if (key === "Unidentified") {
    return null;
  }
  if (key in domkeytable_default) {
    let location = evt.location;
    if (key === "Meta" && location === 0) {
      location = 2;
    }
    if (key === "Clear" && location === 3) {
      let code = getKeycode(evt);
      if (code === "NumLock") {
        location = 0;
      }
    }
    if (location === void 0 || location > 3) {
      location = 0;
    }
    if (key === "Meta") {
      let code = getKeycode(evt);
      if (code === "AltLeft") {
        return keysym_default.XK_Meta_L;
      } else if (code === "AltRight") {
        return keysym_default.XK_Meta_R;
      }
    }
    if (key === "Clear") {
      let code = getKeycode(evt);
      if (code === "NumLock") {
        return keysym_default.XK_Num_Lock;
      }
    }
    if (isWindows()) {
      switch (key) {
        case "Zenkaku":
        case "Hankaku":
          return keysym_default.XK_Zenkaku_Hankaku;
        case "Romaji":
        case "KanaMode":
          return keysym_default.XK_Romaji;
      }
    }
    return domkeytable_default[key][location];
  }
  if (key.length !== 1) {
    return null;
  }
  const codepoint = key.charCodeAt();
  if (codepoint) {
    return keysymdef_default.lookup(codepoint);
  }
  return null;
}

// node_modules/@novnc/novnc/core/input/keyboard.js
var Keyboard = class {
  constructor(target) {
    this._target = target || null;
    this._keyDownList = {};
    this._altGrArmed = false;
    this._eventHandlers = {
      "keyup": this._handleKeyUp.bind(this),
      "keydown": this._handleKeyDown.bind(this),
      "blur": this._allKeysUp.bind(this)
    };
    this.onkeyevent = () => {
    };
  }
  // ===== PRIVATE METHODS =====
  _sendKeyEvent(keysym, code, down, numlock = null, capslock = null) {
    if (down) {
      this._keyDownList[code] = keysym;
    } else {
      if (!(code in this._keyDownList)) {
        return;
      }
      delete this._keyDownList[code];
    }
    Debug("onkeyevent " + (down ? "down" : "up") + ", keysym: " + keysym, ", code: " + code + ", numlock: " + numlock + ", capslock: " + capslock);
    this.onkeyevent(keysym, code, down, numlock, capslock);
  }
  _getKeyCode(e2) {
    const code = getKeycode(e2);
    if (code !== "Unidentified") {
      return code;
    }
    if (e2.keyCode) {
      if (e2.keyCode !== 229) {
        return "Platform" + e2.keyCode;
      }
    }
    if (e2.keyIdentifier) {
      if (e2.keyIdentifier.substr(0, 2) !== "U+") {
        return e2.keyIdentifier;
      }
      const codepoint = parseInt(e2.keyIdentifier.substr(2), 16);
      const char = String.fromCharCode(codepoint).toUpperCase();
      return "Platform" + char.charCodeAt();
    }
    return "Unidentified";
  }
  _handleKeyDown(e2) {
    const code = this._getKeyCode(e2);
    let keysym = getKeysym(e2);
    let numlock = e2.getModifierState("NumLock");
    let capslock = e2.getModifierState("CapsLock");
    if (isMac() || isIOS()) {
      numlock = null;
    }
    if (this._altGrArmed) {
      this._altGrArmed = false;
      clearTimeout(this._altGrTimeout);
      if (code === "AltRight" && e2.timeStamp - this._altGrCtrlTime < 50) {
        keysym = keysym_default.XK_ISO_Level3_Shift;
      } else {
        this._sendKeyEvent(keysym_default.XK_Control_L, "ControlLeft", true, numlock, capslock);
      }
    }
    if (code === "Unidentified") {
      if (keysym) {
        this._sendKeyEvent(keysym, code, true, numlock, capslock);
        this._sendKeyEvent(keysym, code, false, numlock, capslock);
      }
      stopEvent(e2);
      return;
    }
    if (isMac() || isIOS()) {
      switch (keysym) {
        case keysym_default.XK_Super_L:
          keysym = keysym_default.XK_Alt_L;
          break;
        case keysym_default.XK_Super_R:
          keysym = keysym_default.XK_Super_L;
          break;
        case keysym_default.XK_Alt_L:
          keysym = keysym_default.XK_Mode_switch;
          break;
        case keysym_default.XK_Alt_R:
          keysym = keysym_default.XK_ISO_Level3_Shift;
          break;
      }
    }
    if (code in this._keyDownList) {
      keysym = this._keyDownList[code];
    }
    if ((isMac() || isIOS()) && (e2.metaKey && code !== "MetaLeft" && code !== "MetaRight")) {
      this._sendKeyEvent(keysym, code, true, numlock, capslock);
      this._sendKeyEvent(keysym, code, false, numlock, capslock);
      stopEvent(e2);
      return;
    }
    if ((isMac() || isIOS()) && code === "CapsLock") {
      this._sendKeyEvent(keysym_default.XK_Caps_Lock, "CapsLock", true, numlock, capslock);
      this._sendKeyEvent(keysym_default.XK_Caps_Lock, "CapsLock", false, numlock, capslock);
      stopEvent(e2);
      return;
    }
    const jpBadKeys = [
      keysym_default.XK_Zenkaku_Hankaku,
      keysym_default.XK_Eisu_toggle,
      keysym_default.XK_Katakana,
      keysym_default.XK_Hiragana,
      keysym_default.XK_Romaji
    ];
    if (isWindows() && jpBadKeys.includes(keysym)) {
      this._sendKeyEvent(keysym, code, true, numlock, capslock);
      this._sendKeyEvent(keysym, code, false, numlock, capslock);
      stopEvent(e2);
      return;
    }
    stopEvent(e2);
    if (code === "ControlLeft" && isWindows() && !("ControlLeft" in this._keyDownList)) {
      this._altGrArmed = true;
      this._altGrTimeout = setTimeout(this._interruptAltGrSequence.bind(this), 100);
      this._altGrCtrlTime = e2.timeStamp;
      return;
    }
    this._sendKeyEvent(keysym, code, true, numlock, capslock);
  }
  _handleKeyUp(e2) {
    stopEvent(e2);
    const code = this._getKeyCode(e2);
    this._interruptAltGrSequence();
    if ((isMac() || isIOS()) && code === "CapsLock") {
      this._sendKeyEvent(keysym_default.XK_Caps_Lock, "CapsLock", true);
      this._sendKeyEvent(keysym_default.XK_Caps_Lock, "CapsLock", false);
      return;
    }
    this._sendKeyEvent(this._keyDownList[code], code, false);
    if (isWindows() && (code === "ShiftLeft" || code === "ShiftRight")) {
      if ("ShiftRight" in this._keyDownList) {
        this._sendKeyEvent(
          this._keyDownList["ShiftRight"],
          "ShiftRight",
          false
        );
      }
      if ("ShiftLeft" in this._keyDownList) {
        this._sendKeyEvent(
          this._keyDownList["ShiftLeft"],
          "ShiftLeft",
          false
        );
      }
    }
  }
  _interruptAltGrSequence() {
    if (this._altGrArmed) {
      this._altGrArmed = false;
      clearTimeout(this._altGrTimeout);
      this._sendKeyEvent(keysym_default.XK_Control_L, "ControlLeft", true);
    }
  }
  _allKeysUp() {
    Debug(">> Keyboard.allKeysUp");
    this._interruptAltGrSequence();
    for (let code in this._keyDownList) {
      this._sendKeyEvent(this._keyDownList[code], code, false);
    }
    Debug("<< Keyboard.allKeysUp");
  }
  // ===== PUBLIC METHODS =====
  grab() {
    this._target.addEventListener("keydown", this._eventHandlers.keydown);
    this._target.addEventListener("keyup", this._eventHandlers.keyup);
    window.addEventListener("blur", this._eventHandlers.blur);
  }
  ungrab() {
    this._target.removeEventListener("keydown", this._eventHandlers.keydown);
    this._target.removeEventListener("keyup", this._eventHandlers.keyup);
    window.removeEventListener("blur", this._eventHandlers.blur);
    this._allKeysUp();
  }
};

// node_modules/@novnc/novnc/core/input/gesturehandler.js
var GH_NOGESTURE = 0;
var GH_ONETAP = 1;
var GH_TWOTAP = 2;
var GH_THREETAP = 4;
var GH_DRAG = 8;
var GH_LONGPRESS = 16;
var GH_TWODRAG = 32;
var GH_PINCH = 64;
var GH_INITSTATE = 127;
var GH_MOVE_THRESHOLD = 50;
var GH_ANGLE_THRESHOLD = 90;
var GH_MULTITOUCH_TIMEOUT = 250;
var GH_TAP_TIMEOUT = 1e3;
var GH_LONGPRESS_TIMEOUT = 1e3;
var GH_TWOTOUCH_TIMEOUT = 50;
var GestureHandler = class {
  constructor() {
    this._target = null;
    this._state = GH_INITSTATE;
    this._tracked = [];
    this._ignored = [];
    this._waitingRelease = false;
    this._releaseStart = 0;
    this._longpressTimeoutId = null;
    this._twoTouchTimeoutId = null;
    this._boundEventHandler = this._eventHandler.bind(this);
  }
  attach(target) {
    this.detach();
    this._target = target;
    this._target.addEventListener(
      "touchstart",
      this._boundEventHandler
    );
    this._target.addEventListener(
      "touchmove",
      this._boundEventHandler
    );
    this._target.addEventListener(
      "touchend",
      this._boundEventHandler
    );
    this._target.addEventListener(
      "touchcancel",
      this._boundEventHandler
    );
  }
  detach() {
    if (!this._target) {
      return;
    }
    this._stopLongpressTimeout();
    this._stopTwoTouchTimeout();
    this._target.removeEventListener(
      "touchstart",
      this._boundEventHandler
    );
    this._target.removeEventListener(
      "touchmove",
      this._boundEventHandler
    );
    this._target.removeEventListener(
      "touchend",
      this._boundEventHandler
    );
    this._target.removeEventListener(
      "touchcancel",
      this._boundEventHandler
    );
    this._target = null;
  }
  _eventHandler(e2) {
    let fn2;
    e2.stopPropagation();
    e2.preventDefault();
    switch (e2.type) {
      case "touchstart":
        fn2 = this._touchStart;
        break;
      case "touchmove":
        fn2 = this._touchMove;
        break;
      case "touchend":
      case "touchcancel":
        fn2 = this._touchEnd;
        break;
    }
    for (let i = 0; i < e2.changedTouches.length; i++) {
      let touch = e2.changedTouches[i];
      fn2.call(this, touch.identifier, touch.clientX, touch.clientY);
    }
  }
  _touchStart(id, x, y) {
    if (this._hasDetectedGesture() || this._state === GH_NOGESTURE) {
      this._ignored.push(id);
      return;
    }
    if (this._tracked.length > 0 && Date.now() - this._tracked[0].started > GH_MULTITOUCH_TIMEOUT) {
      this._state = GH_NOGESTURE;
      this._ignored.push(id);
      return;
    }
    if (this._waitingRelease) {
      this._state = GH_NOGESTURE;
      this._ignored.push(id);
      return;
    }
    this._tracked.push({
      id,
      started: Date.now(),
      active: true,
      firstX: x,
      firstY: y,
      lastX: x,
      lastY: y,
      angle: 0
    });
    switch (this._tracked.length) {
      case 1:
        this._startLongpressTimeout();
        break;
      case 2:
        this._state &= ~(GH_ONETAP | GH_DRAG | GH_LONGPRESS);
        this._stopLongpressTimeout();
        break;
      case 3:
        this._state &= ~(GH_TWOTAP | GH_TWODRAG | GH_PINCH);
        break;
      default:
        this._state = GH_NOGESTURE;
    }
  }
  _touchMove(id, x, y) {
    let touch = this._tracked.find((t) => t.id === id);
    if (touch === void 0) {
      return;
    }
    touch.lastX = x;
    touch.lastY = y;
    let deltaX = x - touch.firstX;
    let deltaY = y - touch.firstY;
    if (touch.firstX !== touch.lastX || touch.firstY !== touch.lastY) {
      touch.angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    }
    if (!this._hasDetectedGesture()) {
      if (Math.hypot(deltaX, deltaY) < GH_MOVE_THRESHOLD) {
        return;
      }
      this._state &= ~(GH_ONETAP | GH_TWOTAP | GH_THREETAP | GH_LONGPRESS);
      this._stopLongpressTimeout();
      if (this._tracked.length !== 1) {
        this._state &= ~GH_DRAG;
      }
      if (this._tracked.length !== 2) {
        this._state &= ~(GH_TWODRAG | GH_PINCH);
      }
      if (this._tracked.length === 2) {
        let prevTouch = this._tracked.find((t) => t.id !== id);
        let prevDeltaMove = Math.hypot(
          prevTouch.firstX - prevTouch.lastX,
          prevTouch.firstY - prevTouch.lastY
        );
        if (prevDeltaMove > GH_MOVE_THRESHOLD) {
          let deltaAngle = Math.abs(touch.angle - prevTouch.angle);
          deltaAngle = Math.abs((deltaAngle + 180) % 360 - 180);
          if (deltaAngle > GH_ANGLE_THRESHOLD) {
            this._state &= ~GH_TWODRAG;
          } else {
            this._state &= ~GH_PINCH;
          }
          if (this._isTwoTouchTimeoutRunning()) {
            this._stopTwoTouchTimeout();
          }
        } else if (!this._isTwoTouchTimeoutRunning()) {
          this._startTwoTouchTimeout();
        }
      }
      if (!this._hasDetectedGesture()) {
        return;
      }
      this._pushEvent("gesturestart");
    }
    this._pushEvent("gesturemove");
  }
  _touchEnd(id, x, y) {
    if (this._ignored.indexOf(id) !== -1) {
      this._ignored.splice(this._ignored.indexOf(id), 1);
      if (this._ignored.length === 0 && this._tracked.length === 0) {
        this._state = GH_INITSTATE;
        this._waitingRelease = false;
      }
      return;
    }
    if (!this._hasDetectedGesture() && this._isTwoTouchTimeoutRunning()) {
      this._stopTwoTouchTimeout();
      this._state = GH_NOGESTURE;
    }
    if (!this._hasDetectedGesture()) {
      this._state &= ~(GH_DRAG | GH_TWODRAG | GH_PINCH);
      this._state &= ~GH_LONGPRESS;
      this._stopLongpressTimeout();
      if (!this._waitingRelease) {
        this._releaseStart = Date.now();
        this._waitingRelease = true;
        switch (this._tracked.length) {
          case 1:
            this._state &= ~(GH_TWOTAP | GH_THREETAP);
            break;
          case 2:
            this._state &= ~(GH_ONETAP | GH_THREETAP);
            break;
        }
      }
    }
    if (this._waitingRelease) {
      if (Date.now() - this._releaseStart > GH_MULTITOUCH_TIMEOUT) {
        this._state = GH_NOGESTURE;
      }
      if (this._tracked.some((t) => Date.now() - t.started > GH_TAP_TIMEOUT)) {
        this._state = GH_NOGESTURE;
      }
      let touch = this._tracked.find((t) => t.id === id);
      touch.active = false;
      if (this._hasDetectedGesture()) {
        this._pushEvent("gesturestart");
      } else {
        if (this._state !== GH_NOGESTURE) {
          return;
        }
      }
    }
    if (this._hasDetectedGesture()) {
      this._pushEvent("gestureend");
    }
    for (let i = 0; i < this._tracked.length; i++) {
      if (this._tracked[i].active) {
        this._ignored.push(this._tracked[i].id);
      }
    }
    this._tracked = [];
    this._state = GH_NOGESTURE;
    if (this._ignored.indexOf(id) !== -1) {
      this._ignored.splice(this._ignored.indexOf(id), 1);
    }
    if (this._ignored.length === 0) {
      this._state = GH_INITSTATE;
      this._waitingRelease = false;
    }
  }
  _hasDetectedGesture() {
    if (this._state === GH_NOGESTURE) {
      return false;
    }
    if (this._state & this._state - 1) {
      return false;
    }
    if (this._state & (GH_ONETAP | GH_TWOTAP | GH_THREETAP)) {
      if (this._tracked.some((t) => t.active)) {
        return false;
      }
    }
    return true;
  }
  _startLongpressTimeout() {
    this._stopLongpressTimeout();
    this._longpressTimeoutId = setTimeout(
      () => this._longpressTimeout(),
      GH_LONGPRESS_TIMEOUT
    );
  }
  _stopLongpressTimeout() {
    clearTimeout(this._longpressTimeoutId);
    this._longpressTimeoutId = null;
  }
  _longpressTimeout() {
    if (this._hasDetectedGesture()) {
      throw new Error("A longpress gesture failed, conflict with a different gesture");
    }
    this._state = GH_LONGPRESS;
    this._pushEvent("gesturestart");
  }
  _startTwoTouchTimeout() {
    this._stopTwoTouchTimeout();
    this._twoTouchTimeoutId = setTimeout(
      () => this._twoTouchTimeout(),
      GH_TWOTOUCH_TIMEOUT
    );
  }
  _stopTwoTouchTimeout() {
    clearTimeout(this._twoTouchTimeoutId);
    this._twoTouchTimeoutId = null;
  }
  _isTwoTouchTimeoutRunning() {
    return this._twoTouchTimeoutId !== null;
  }
  _twoTouchTimeout() {
    if (this._tracked.length === 0) {
      throw new Error("A pinch or two drag gesture failed, no tracked touches");
    }
    let avgM = this._getAverageMovement();
    let avgMoveH = Math.abs(avgM.x);
    let avgMoveV = Math.abs(avgM.y);
    let avgD = this._getAverageDistance();
    let deltaTouchDistance = Math.abs(Math.hypot(avgD.first.x, avgD.first.y) - Math.hypot(avgD.last.x, avgD.last.y));
    if (avgMoveV < deltaTouchDistance && avgMoveH < deltaTouchDistance) {
      this._state = GH_PINCH;
    } else {
      this._state = GH_TWODRAG;
    }
    this._pushEvent("gesturestart");
    this._pushEvent("gesturemove");
  }
  _pushEvent(type) {
    let detail = { type: this._stateToGesture(this._state) };
    let avg = this._getPosition();
    let pos = avg.last;
    if (type === "gesturestart") {
      pos = avg.first;
    }
    switch (this._state) {
      case GH_TWODRAG:
      case GH_PINCH:
        pos = avg.first;
        break;
    }
    detail["clientX"] = pos.x;
    detail["clientY"] = pos.y;
    if (this._state === GH_PINCH) {
      let distance = this._getAverageDistance();
      if (type === "gesturestart") {
        detail["magnitudeX"] = distance.first.x;
        detail["magnitudeY"] = distance.first.y;
      } else {
        detail["magnitudeX"] = distance.last.x;
        detail["magnitudeY"] = distance.last.y;
      }
    } else if (this._state === GH_TWODRAG) {
      if (type === "gesturestart") {
        detail["magnitudeX"] = 0;
        detail["magnitudeY"] = 0;
      } else {
        let movement = this._getAverageMovement();
        detail["magnitudeX"] = movement.x;
        detail["magnitudeY"] = movement.y;
      }
    }
    let gev = new CustomEvent(type, { detail });
    this._target.dispatchEvent(gev);
  }
  _stateToGesture(state) {
    switch (state) {
      case GH_ONETAP:
        return "onetap";
      case GH_TWOTAP:
        return "twotap";
      case GH_THREETAP:
        return "threetap";
      case GH_DRAG:
        return "drag";
      case GH_LONGPRESS:
        return "longpress";
      case GH_TWODRAG:
        return "twodrag";
      case GH_PINCH:
        return "pinch";
    }
    throw new Error("Unknown gesture state: " + state);
  }
  _getPosition() {
    if (this._tracked.length === 0) {
      throw new Error("Failed to get gesture position, no tracked touches");
    }
    let size = this._tracked.length;
    let fx = 0, fy = 0, lx = 0, ly = 0;
    for (let i = 0; i < this._tracked.length; i++) {
      fx += this._tracked[i].firstX;
      fy += this._tracked[i].firstY;
      lx += this._tracked[i].lastX;
      ly += this._tracked[i].lastY;
    }
    return {
      first: {
        x: fx / size,
        y: fy / size
      },
      last: {
        x: lx / size,
        y: ly / size
      }
    };
  }
  _getAverageMovement() {
    if (this._tracked.length === 0) {
      throw new Error("Failed to get gesture movement, no tracked touches");
    }
    let totalH, totalV;
    totalH = totalV = 0;
    let size = this._tracked.length;
    for (let i = 0; i < this._tracked.length; i++) {
      totalH += this._tracked[i].lastX - this._tracked[i].firstX;
      totalV += this._tracked[i].lastY - this._tracked[i].firstY;
    }
    return {
      x: totalH / size,
      y: totalV / size
    };
  }
  _getAverageDistance() {
    if (this._tracked.length === 0) {
      throw new Error("Failed to get gesture distance, no tracked touches");
    }
    let first = this._tracked[0];
    let last = this._tracked[this._tracked.length - 1];
    let fdx = Math.abs(last.firstX - first.firstX);
    let fdy = Math.abs(last.firstY - first.firstY);
    let ldx = Math.abs(last.lastX - first.lastX);
    let ldy = Math.abs(last.lastY - first.lastY);
    return {
      first: { x: fdx, y: fdy },
      last: { x: ldx, y: ldy }
    };
  }
};

// node_modules/@novnc/novnc/core/util/cursor.js
var useFallback = !supportsCursorURIs || isTouchDevice;
var Cursor = class {
  constructor() {
    this._target = null;
    this._canvas = document.createElement("canvas");
    if (useFallback) {
      this._canvas.style.position = "fixed";
      this._canvas.style.zIndex = "65535";
      this._canvas.style.pointerEvents = "none";
      this._canvas.style.userSelect = "none";
      this._canvas.style.WebkitUserSelect = "none";
      this._canvas.style.visibility = "hidden";
    }
    this._position = { x: 0, y: 0 };
    this._hotSpot = { x: 0, y: 0 };
    this._eventHandlers = {
      "mouseover": this._handleMouseOver.bind(this),
      "mouseleave": this._handleMouseLeave.bind(this),
      "mousemove": this._handleMouseMove.bind(this),
      "mouseup": this._handleMouseUp.bind(this)
    };
  }
  attach(target) {
    if (this._target) {
      this.detach();
    }
    this._target = target;
    if (useFallback) {
      document.body.appendChild(this._canvas);
      const options = { capture: true, passive: true };
      this._target.addEventListener("mouseover", this._eventHandlers.mouseover, options);
      this._target.addEventListener("mouseleave", this._eventHandlers.mouseleave, options);
      this._target.addEventListener("mousemove", this._eventHandlers.mousemove, options);
      this._target.addEventListener("mouseup", this._eventHandlers.mouseup, options);
    }
    this.clear();
  }
  detach() {
    if (!this._target) {
      return;
    }
    if (useFallback) {
      const options = { capture: true, passive: true };
      this._target.removeEventListener("mouseover", this._eventHandlers.mouseover, options);
      this._target.removeEventListener("mouseleave", this._eventHandlers.mouseleave, options);
      this._target.removeEventListener("mousemove", this._eventHandlers.mousemove, options);
      this._target.removeEventListener("mouseup", this._eventHandlers.mouseup, options);
      if (document.contains(this._canvas)) {
        document.body.removeChild(this._canvas);
      }
    }
    this._target = null;
  }
  change(rgba, hotx, hoty, w, h2) {
    if (w === 0 || h2 === 0) {
      this.clear();
      return;
    }
    this._position.x = this._position.x + this._hotSpot.x - hotx;
    this._position.y = this._position.y + this._hotSpot.y - hoty;
    this._hotSpot.x = hotx;
    this._hotSpot.y = hoty;
    let ctx = this._canvas.getContext("2d");
    this._canvas.width = w;
    this._canvas.height = h2;
    let img = new ImageData(new Uint8ClampedArray(rgba), w, h2);
    ctx.clearRect(0, 0, w, h2);
    ctx.putImageData(img, 0, 0);
    if (useFallback) {
      this._updatePosition();
    } else {
      let url = this._canvas.toDataURL();
      this._target.style.cursor = "url(" + url + ")" + hotx + " " + hoty + ", default";
    }
  }
  clear() {
    this._target.style.cursor = "none";
    this._canvas.width = 0;
    this._canvas.height = 0;
    this._position.x = this._position.x + this._hotSpot.x;
    this._position.y = this._position.y + this._hotSpot.y;
    this._hotSpot.x = 0;
    this._hotSpot.y = 0;
  }
  // Mouse events might be emulated, this allows
  // moving the cursor in such cases
  move(clientX, clientY) {
    if (!useFallback) {
      return;
    }
    if (window.visualViewport) {
      this._position.x = clientX + window.visualViewport.offsetLeft;
      this._position.y = clientY + window.visualViewport.offsetTop;
    } else {
      this._position.x = clientX;
      this._position.y = clientY;
    }
    this._updatePosition();
    let target = document.elementFromPoint(clientX, clientY);
    this._updateVisibility(target);
  }
  _handleMouseOver(event) {
    this._handleMouseMove(event);
  }
  _handleMouseLeave(event) {
    this._updateVisibility(event.relatedTarget);
  }
  _handleMouseMove(event) {
    this._updateVisibility(event.target);
    this._position.x = event.clientX - this._hotSpot.x;
    this._position.y = event.clientY - this._hotSpot.y;
    this._updatePosition();
  }
  _handleMouseUp(event) {
    let target = document.elementFromPoint(event.clientX, event.clientY);
    this._updateVisibility(target);
    if (this._captureIsActive()) {
      window.setTimeout(() => {
        if (!this._target) {
          return;
        }
        target = document.elementFromPoint(
          event.clientX,
          event.clientY
        );
        this._updateVisibility(target);
      }, 0);
    }
  }
  _showCursor() {
    if (this._canvas.style.visibility === "hidden") {
      this._canvas.style.visibility = "";
    }
  }
  _hideCursor() {
    if (this._canvas.style.visibility !== "hidden") {
      this._canvas.style.visibility = "hidden";
    }
  }
  // Should we currently display the cursor?
  // (i.e. are we over the target, or a child of the target without a
  // different cursor set)
  _shouldShowCursor(target) {
    if (!target) {
      return false;
    }
    if (target === this._target) {
      return true;
    }
    if (!this._target.contains(target)) {
      return false;
    }
    if (window.getComputedStyle(target).cursor !== "none") {
      return false;
    }
    return true;
  }
  _updateVisibility(target) {
    if (this._captureIsActive()) {
      target = document.captureElement;
    }
    if (this._shouldShowCursor(target)) {
      this._showCursor();
    } else {
      this._hideCursor();
    }
  }
  _updatePosition() {
    this._canvas.style.left = this._position.x + "px";
    this._canvas.style.top = this._position.y + "px";
  }
  _captureIsActive() {
    return document.captureElement && document.documentElement.contains(document.captureElement);
  }
};

// node_modules/@novnc/novnc/core/websock.js
var MAX_RQ_GROW_SIZE = 40 * 1024 * 1024;
var DataChannel = {
  CONNECTING: "connecting",
  OPEN: "open",
  CLOSING: "closing",
  CLOSED: "closed"
};
var ReadyStates = {
  CONNECTING: [WebSocket.CONNECTING, DataChannel.CONNECTING],
  OPEN: [WebSocket.OPEN, DataChannel.OPEN],
  CLOSING: [WebSocket.CLOSING, DataChannel.CLOSING],
  CLOSED: [WebSocket.CLOSED, DataChannel.CLOSED]
};
var rawChannelProps = [
  "send",
  "close",
  "binaryType",
  "onerror",
  "onmessage",
  "onopen",
  "protocol",
  "readyState"
];
var Websock = class {
  constructor() {
    this._websocket = null;
    this._rQi = 0;
    this._rQlen = 0;
    this._rQbufferSize = 1024 * 1024 * 4;
    this._rQ = null;
    this._sQbufferSize = 1024 * 10;
    this._sQlen = 0;
    this._sQ = null;
    this._eventHandlers = {
      message: () => {
      },
      open: () => {
      },
      close: () => {
      },
      error: () => {
      }
    };
  }
  // Getters and setters
  get readyState() {
    let subState;
    if (this._websocket === null) {
      return "unused";
    }
    subState = this._websocket.readyState;
    if (ReadyStates.CONNECTING.includes(subState)) {
      return "connecting";
    } else if (ReadyStates.OPEN.includes(subState)) {
      return "open";
    } else if (ReadyStates.CLOSING.includes(subState)) {
      return "closing";
    } else if (ReadyStates.CLOSED.includes(subState)) {
      return "closed";
    }
    return "unknown";
  }
  // Receive queue
  rQpeek8() {
    return this._rQ[this._rQi];
  }
  rQskipBytes(bytes) {
    this._rQi += bytes;
  }
  rQshift8() {
    return this._rQshift(1);
  }
  rQshift16() {
    return this._rQshift(2);
  }
  rQshift32() {
    return this._rQshift(4);
  }
  // TODO(directxman12): test performance with these vs a DataView
  _rQshift(bytes) {
    let res = 0;
    for (let byte = bytes - 1; byte >= 0; byte--) {
      res += this._rQ[this._rQi++] << byte * 8;
    }
    return res >>> 0;
  }
  rQlen() {
    return this._rQlen - this._rQi;
  }
  rQshiftStr(len) {
    let str = "";
    for (let i = 0; i < len; i += 4096) {
      let part = this.rQshiftBytes(Math.min(4096, len - i), false);
      str += String.fromCharCode.apply(null, part);
    }
    return str;
  }
  rQshiftBytes(len, copy = true) {
    this._rQi += len;
    if (copy) {
      return this._rQ.slice(this._rQi - len, this._rQi);
    } else {
      return this._rQ.subarray(this._rQi - len, this._rQi);
    }
  }
  rQshiftTo(target, len) {
    target.set(new Uint8Array(this._rQ.buffer, this._rQi, len));
    this._rQi += len;
  }
  rQpeekBytes(len, copy = true) {
    if (copy) {
      return this._rQ.slice(this._rQi, this._rQi + len);
    } else {
      return this._rQ.subarray(this._rQi, this._rQi + len);
    }
  }
  // Check to see if we must wait for 'num' bytes (default to FBU.bytes)
  // to be available in the receive queue. Return true if we need to
  // wait (and possibly print a debug message), otherwise false.
  rQwait(msg, num, goback) {
    if (this._rQlen - this._rQi < num) {
      if (goback) {
        if (this._rQi < goback) {
          throw new Error("rQwait cannot backup " + goback + " bytes");
        }
        this._rQi -= goback;
      }
      return true;
    }
    return false;
  }
  // Send queue
  sQpush8(num) {
    this._sQensureSpace(1);
    this._sQ[this._sQlen++] = num;
  }
  sQpush16(num) {
    this._sQensureSpace(2);
    this._sQ[this._sQlen++] = num >> 8 & 255;
    this._sQ[this._sQlen++] = num >> 0 & 255;
  }
  sQpush32(num) {
    this._sQensureSpace(4);
    this._sQ[this._sQlen++] = num >> 24 & 255;
    this._sQ[this._sQlen++] = num >> 16 & 255;
    this._sQ[this._sQlen++] = num >> 8 & 255;
    this._sQ[this._sQlen++] = num >> 0 & 255;
  }
  sQpushString(str) {
    let bytes = str.split("").map((chr) => chr.charCodeAt(0));
    this.sQpushBytes(new Uint8Array(bytes));
  }
  sQpushBytes(bytes) {
    for (let offset = 0; offset < bytes.length; ) {
      this._sQensureSpace(1);
      let chunkSize = this._sQbufferSize - this._sQlen;
      if (chunkSize > bytes.length - offset) {
        chunkSize = bytes.length - offset;
      }
      this._sQ.set(bytes.subarray(offset, offset + chunkSize), this._sQlen);
      this._sQlen += chunkSize;
      offset += chunkSize;
    }
  }
  flush() {
    if (this._sQlen > 0 && this.readyState === "open") {
      this._websocket.send(new Uint8Array(this._sQ.buffer, 0, this._sQlen));
      this._sQlen = 0;
    }
  }
  _sQensureSpace(bytes) {
    if (this._sQbufferSize - this._sQlen < bytes) {
      this.flush();
    }
  }
  // Event handlers
  off(evt) {
    this._eventHandlers[evt] = () => {
    };
  }
  on(evt, handler) {
    this._eventHandlers[evt] = handler;
  }
  _allocateBuffers() {
    this._rQ = new Uint8Array(this._rQbufferSize);
    this._sQ = new Uint8Array(this._sQbufferSize);
  }
  init() {
    this._allocateBuffers();
    this._rQi = 0;
    this._websocket = null;
  }
  open(uri, protocols) {
    this.attach(new WebSocket(uri, protocols));
  }
  attach(rawChannel) {
    this.init();
    const channelProps = [...Object.keys(rawChannel), ...Object.getOwnPropertyNames(Object.getPrototypeOf(rawChannel))];
    for (let i = 0; i < rawChannelProps.length; i++) {
      const prop = rawChannelProps[i];
      if (channelProps.indexOf(prop) < 0) {
        throw new Error("Raw channel missing property: " + prop);
      }
    }
    this._websocket = rawChannel;
    this._websocket.binaryType = "arraybuffer";
    this._websocket.onmessage = this._recvMessage.bind(this);
    this._websocket.onopen = () => {
      Debug(">> WebSock.onopen");
      if (this._websocket.protocol) {
        Info("Server choose sub-protocol: " + this._websocket.protocol);
      }
      this._eventHandlers.open();
      Debug("<< WebSock.onopen");
    };
    this._websocket.onclose = (e2) => {
      Debug(">> WebSock.onclose");
      this._eventHandlers.close(e2);
      Debug("<< WebSock.onclose");
    };
    this._websocket.onerror = (e2) => {
      Debug(">> WebSock.onerror: " + e2);
      this._eventHandlers.error(e2);
      Debug("<< WebSock.onerror: " + e2);
    };
  }
  close() {
    if (this._websocket) {
      if (this.readyState === "connecting" || this.readyState === "open") {
        Info("Closing WebSocket connection");
        this._websocket.close();
      }
      this._websocket.onmessage = () => {
      };
    }
  }
  // private methods
  // We want to move all the unread data to the start of the queue,
  // e.g. compacting.
  // The function also expands the receive que if needed, and for
  // performance reasons we combine these two actions to avoid
  // unnecessary copying.
  _expandCompactRQ(minFit) {
    const requiredBufferSize = (this._rQlen - this._rQi + minFit) * 8;
    const resizeNeeded = this._rQbufferSize < requiredBufferSize;
    if (resizeNeeded) {
      this._rQbufferSize = Math.max(this._rQbufferSize * 2, requiredBufferSize);
    }
    if (this._rQbufferSize > MAX_RQ_GROW_SIZE) {
      this._rQbufferSize = MAX_RQ_GROW_SIZE;
      if (this._rQbufferSize - (this._rQlen - this._rQi) < minFit) {
        throw new Error("Receive queue buffer exceeded " + MAX_RQ_GROW_SIZE + " bytes, and the new message could not fit");
      }
    }
    if (resizeNeeded) {
      const oldRQbuffer = this._rQ.buffer;
      this._rQ = new Uint8Array(this._rQbufferSize);
      this._rQ.set(new Uint8Array(oldRQbuffer, this._rQi, this._rQlen - this._rQi));
    } else {
      this._rQ.copyWithin(0, this._rQi, this._rQlen);
    }
    this._rQlen = this._rQlen - this._rQi;
    this._rQi = 0;
  }
  // push arraybuffer values onto the end of the receive que
  _recvMessage(e2) {
    if (this._rQlen == this._rQi) {
      this._rQlen = 0;
      this._rQi = 0;
    }
    const u8 = new Uint8Array(e2.data);
    if (u8.length > this._rQbufferSize - this._rQlen) {
      this._expandCompactRQ(u8.length);
    }
    this._rQ.set(u8, this._rQlen);
    this._rQlen += u8.length;
    if (this._rQlen - this._rQi > 0) {
      this._eventHandlers.message();
    } else {
      Debug("Ignoring empty message");
    }
  }
};

// node_modules/@novnc/novnc/core/input/xtscancodes.js
var xtscancodes_default = {
  "Again": 57349,
  /* html:Again (Again) -> linux:129 (KEY_AGAIN) -> atset1:57349 */
  "AltLeft": 56,
  /* html:AltLeft (AltLeft) -> linux:56 (KEY_LEFTALT) -> atset1:56 */
  "AltRight": 57400,
  /* html:AltRight (AltRight) -> linux:100 (KEY_RIGHTALT) -> atset1:57400 */
  "ArrowDown": 57424,
  /* html:ArrowDown (ArrowDown) -> linux:108 (KEY_DOWN) -> atset1:57424 */
  "ArrowLeft": 57419,
  /* html:ArrowLeft (ArrowLeft) -> linux:105 (KEY_LEFT) -> atset1:57419 */
  "ArrowRight": 57421,
  /* html:ArrowRight (ArrowRight) -> linux:106 (KEY_RIGHT) -> atset1:57421 */
  "ArrowUp": 57416,
  /* html:ArrowUp (ArrowUp) -> linux:103 (KEY_UP) -> atset1:57416 */
  "AudioVolumeDown": 57390,
  /* html:AudioVolumeDown (AudioVolumeDown) -> linux:114 (KEY_VOLUMEDOWN) -> atset1:57390 */
  "AudioVolumeMute": 57376,
  /* html:AudioVolumeMute (AudioVolumeMute) -> linux:113 (KEY_MUTE) -> atset1:57376 */
  "AudioVolumeUp": 57392,
  /* html:AudioVolumeUp (AudioVolumeUp) -> linux:115 (KEY_VOLUMEUP) -> atset1:57392 */
  "Backquote": 41,
  /* html:Backquote (Backquote) -> linux:41 (KEY_GRAVE) -> atset1:41 */
  "Backslash": 43,
  /* html:Backslash (Backslash) -> linux:43 (KEY_BACKSLASH) -> atset1:43 */
  "Backspace": 14,
  /* html:Backspace (Backspace) -> linux:14 (KEY_BACKSPACE) -> atset1:14 */
  "BracketLeft": 26,
  /* html:BracketLeft (BracketLeft) -> linux:26 (KEY_LEFTBRACE) -> atset1:26 */
  "BracketRight": 27,
  /* html:BracketRight (BracketRight) -> linux:27 (KEY_RIGHTBRACE) -> atset1:27 */
  "BrowserBack": 57450,
  /* html:BrowserBack (BrowserBack) -> linux:158 (KEY_BACK) -> atset1:57450 */
  "BrowserFavorites": 57446,
  /* html:BrowserFavorites (BrowserFavorites) -> linux:156 (KEY_BOOKMARKS) -> atset1:57446 */
  "BrowserForward": 57449,
  /* html:BrowserForward (BrowserForward) -> linux:159 (KEY_FORWARD) -> atset1:57449 */
  "BrowserHome": 57394,
  /* html:BrowserHome (BrowserHome) -> linux:172 (KEY_HOMEPAGE) -> atset1:57394 */
  "BrowserRefresh": 57447,
  /* html:BrowserRefresh (BrowserRefresh) -> linux:173 (KEY_REFRESH) -> atset1:57447 */
  "BrowserSearch": 57445,
  /* html:BrowserSearch (BrowserSearch) -> linux:217 (KEY_SEARCH) -> atset1:57445 */
  "BrowserStop": 57448,
  /* html:BrowserStop (BrowserStop) -> linux:128 (KEY_STOP) -> atset1:57448 */
  "CapsLock": 58,
  /* html:CapsLock (CapsLock) -> linux:58 (KEY_CAPSLOCK) -> atset1:58 */
  "Comma": 51,
  /* html:Comma (Comma) -> linux:51 (KEY_COMMA) -> atset1:51 */
  "ContextMenu": 57437,
  /* html:ContextMenu (ContextMenu) -> linux:127 (KEY_COMPOSE) -> atset1:57437 */
  "ControlLeft": 29,
  /* html:ControlLeft (ControlLeft) -> linux:29 (KEY_LEFTCTRL) -> atset1:29 */
  "ControlRight": 57373,
  /* html:ControlRight (ControlRight) -> linux:97 (KEY_RIGHTCTRL) -> atset1:57373 */
  "Convert": 121,
  /* html:Convert (Convert) -> linux:92 (KEY_HENKAN) -> atset1:121 */
  "Copy": 57464,
  /* html:Copy (Copy) -> linux:133 (KEY_COPY) -> atset1:57464 */
  "Cut": 57404,
  /* html:Cut (Cut) -> linux:137 (KEY_CUT) -> atset1:57404 */
  "Delete": 57427,
  /* html:Delete (Delete) -> linux:111 (KEY_DELETE) -> atset1:57427 */
  "Digit0": 11,
  /* html:Digit0 (Digit0) -> linux:11 (KEY_0) -> atset1:11 */
  "Digit1": 2,
  /* html:Digit1 (Digit1) -> linux:2 (KEY_1) -> atset1:2 */
  "Digit2": 3,
  /* html:Digit2 (Digit2) -> linux:3 (KEY_2) -> atset1:3 */
  "Digit3": 4,
  /* html:Digit3 (Digit3) -> linux:4 (KEY_3) -> atset1:4 */
  "Digit4": 5,
  /* html:Digit4 (Digit4) -> linux:5 (KEY_4) -> atset1:5 */
  "Digit5": 6,
  /* html:Digit5 (Digit5) -> linux:6 (KEY_5) -> atset1:6 */
  "Digit6": 7,
  /* html:Digit6 (Digit6) -> linux:7 (KEY_6) -> atset1:7 */
  "Digit7": 8,
  /* html:Digit7 (Digit7) -> linux:8 (KEY_7) -> atset1:8 */
  "Digit8": 9,
  /* html:Digit8 (Digit8) -> linux:9 (KEY_8) -> atset1:9 */
  "Digit9": 10,
  /* html:Digit9 (Digit9) -> linux:10 (KEY_9) -> atset1:10 */
  "Eject": 57469,
  /* html:Eject (Eject) -> linux:162 (KEY_EJECTCLOSECD) -> atset1:57469 */
  "End": 57423,
  /* html:End (End) -> linux:107 (KEY_END) -> atset1:57423 */
  "Enter": 28,
  /* html:Enter (Enter) -> linux:28 (KEY_ENTER) -> atset1:28 */
  "Equal": 13,
  /* html:Equal (Equal) -> linux:13 (KEY_EQUAL) -> atset1:13 */
  "Escape": 1,
  /* html:Escape (Escape) -> linux:1 (KEY_ESC) -> atset1:1 */
  "F1": 59,
  /* html:F1 (F1) -> linux:59 (KEY_F1) -> atset1:59 */
  "F10": 68,
  /* html:F10 (F10) -> linux:68 (KEY_F10) -> atset1:68 */
  "F11": 87,
  /* html:F11 (F11) -> linux:87 (KEY_F11) -> atset1:87 */
  "F12": 88,
  /* html:F12 (F12) -> linux:88 (KEY_F12) -> atset1:88 */
  "F13": 93,
  /* html:F13 (F13) -> linux:183 (KEY_F13) -> atset1:93 */
  "F14": 94,
  /* html:F14 (F14) -> linux:184 (KEY_F14) -> atset1:94 */
  "F15": 95,
  /* html:F15 (F15) -> linux:185 (KEY_F15) -> atset1:95 */
  "F16": 85,
  /* html:F16 (F16) -> linux:186 (KEY_F16) -> atset1:85 */
  "F17": 57347,
  /* html:F17 (F17) -> linux:187 (KEY_F17) -> atset1:57347 */
  "F18": 57463,
  /* html:F18 (F18) -> linux:188 (KEY_F18) -> atset1:57463 */
  "F19": 57348,
  /* html:F19 (F19) -> linux:189 (KEY_F19) -> atset1:57348 */
  "F2": 60,
  /* html:F2 (F2) -> linux:60 (KEY_F2) -> atset1:60 */
  "F20": 90,
  /* html:F20 (F20) -> linux:190 (KEY_F20) -> atset1:90 */
  "F21": 116,
  /* html:F21 (F21) -> linux:191 (KEY_F21) -> atset1:116 */
  "F22": 57465,
  /* html:F22 (F22) -> linux:192 (KEY_F22) -> atset1:57465 */
  "F23": 109,
  /* html:F23 (F23) -> linux:193 (KEY_F23) -> atset1:109 */
  "F24": 111,
  /* html:F24 (F24) -> linux:194 (KEY_F24) -> atset1:111 */
  "F3": 61,
  /* html:F3 (F3) -> linux:61 (KEY_F3) -> atset1:61 */
  "F4": 62,
  /* html:F4 (F4) -> linux:62 (KEY_F4) -> atset1:62 */
  "F5": 63,
  /* html:F5 (F5) -> linux:63 (KEY_F5) -> atset1:63 */
  "F6": 64,
  /* html:F6 (F6) -> linux:64 (KEY_F6) -> atset1:64 */
  "F7": 65,
  /* html:F7 (F7) -> linux:65 (KEY_F7) -> atset1:65 */
  "F8": 66,
  /* html:F8 (F8) -> linux:66 (KEY_F8) -> atset1:66 */
  "F9": 67,
  /* html:F9 (F9) -> linux:67 (KEY_F9) -> atset1:67 */
  "Find": 57409,
  /* html:Find (Find) -> linux:136 (KEY_FIND) -> atset1:57409 */
  "Help": 57461,
  /* html:Help (Help) -> linux:138 (KEY_HELP) -> atset1:57461 */
  "Hiragana": 119,
  /* html:Hiragana (Lang4) -> linux:91 (KEY_HIRAGANA) -> atset1:119 */
  "Home": 57415,
  /* html:Home (Home) -> linux:102 (KEY_HOME) -> atset1:57415 */
  "Insert": 57426,
  /* html:Insert (Insert) -> linux:110 (KEY_INSERT) -> atset1:57426 */
  "IntlBackslash": 86,
  /* html:IntlBackslash (IntlBackslash) -> linux:86 (KEY_102ND) -> atset1:86 */
  "IntlRo": 115,
  /* html:IntlRo (IntlRo) -> linux:89 (KEY_RO) -> atset1:115 */
  "IntlYen": 125,
  /* html:IntlYen (IntlYen) -> linux:124 (KEY_YEN) -> atset1:125 */
  "KanaMode": 112,
  /* html:KanaMode (KanaMode) -> linux:93 (KEY_KATAKANAHIRAGANA) -> atset1:112 */
  "Katakana": 120,
  /* html:Katakana (Lang3) -> linux:90 (KEY_KATAKANA) -> atset1:120 */
  "KeyA": 30,
  /* html:KeyA (KeyA) -> linux:30 (KEY_A) -> atset1:30 */
  "KeyB": 48,
  /* html:KeyB (KeyB) -> linux:48 (KEY_B) -> atset1:48 */
  "KeyC": 46,
  /* html:KeyC (KeyC) -> linux:46 (KEY_C) -> atset1:46 */
  "KeyD": 32,
  /* html:KeyD (KeyD) -> linux:32 (KEY_D) -> atset1:32 */
  "KeyE": 18,
  /* html:KeyE (KeyE) -> linux:18 (KEY_E) -> atset1:18 */
  "KeyF": 33,
  /* html:KeyF (KeyF) -> linux:33 (KEY_F) -> atset1:33 */
  "KeyG": 34,
  /* html:KeyG (KeyG) -> linux:34 (KEY_G) -> atset1:34 */
  "KeyH": 35,
  /* html:KeyH (KeyH) -> linux:35 (KEY_H) -> atset1:35 */
  "KeyI": 23,
  /* html:KeyI (KeyI) -> linux:23 (KEY_I) -> atset1:23 */
  "KeyJ": 36,
  /* html:KeyJ (KeyJ) -> linux:36 (KEY_J) -> atset1:36 */
  "KeyK": 37,
  /* html:KeyK (KeyK) -> linux:37 (KEY_K) -> atset1:37 */
  "KeyL": 38,
  /* html:KeyL (KeyL) -> linux:38 (KEY_L) -> atset1:38 */
  "KeyM": 50,
  /* html:KeyM (KeyM) -> linux:50 (KEY_M) -> atset1:50 */
  "KeyN": 49,
  /* html:KeyN (KeyN) -> linux:49 (KEY_N) -> atset1:49 */
  "KeyO": 24,
  /* html:KeyO (KeyO) -> linux:24 (KEY_O) -> atset1:24 */
  "KeyP": 25,
  /* html:KeyP (KeyP) -> linux:25 (KEY_P) -> atset1:25 */
  "KeyQ": 16,
  /* html:KeyQ (KeyQ) -> linux:16 (KEY_Q) -> atset1:16 */
  "KeyR": 19,
  /* html:KeyR (KeyR) -> linux:19 (KEY_R) -> atset1:19 */
  "KeyS": 31,
  /* html:KeyS (KeyS) -> linux:31 (KEY_S) -> atset1:31 */
  "KeyT": 20,
  /* html:KeyT (KeyT) -> linux:20 (KEY_T) -> atset1:20 */
  "KeyU": 22,
  /* html:KeyU (KeyU) -> linux:22 (KEY_U) -> atset1:22 */
  "KeyV": 47,
  /* html:KeyV (KeyV) -> linux:47 (KEY_V) -> atset1:47 */
  "KeyW": 17,
  /* html:KeyW (KeyW) -> linux:17 (KEY_W) -> atset1:17 */
  "KeyX": 45,
  /* html:KeyX (KeyX) -> linux:45 (KEY_X) -> atset1:45 */
  "KeyY": 21,
  /* html:KeyY (KeyY) -> linux:21 (KEY_Y) -> atset1:21 */
  "KeyZ": 44,
  /* html:KeyZ (KeyZ) -> linux:44 (KEY_Z) -> atset1:44 */
  "Lang1": 114,
  /* html:Lang1 (Lang1) -> linux:122 (KEY_HANGEUL) -> atset1:114 */
  "Lang2": 113,
  /* html:Lang2 (Lang2) -> linux:123 (KEY_HANJA) -> atset1:113 */
  "Lang3": 120,
  /* html:Lang3 (Lang3) -> linux:90 (KEY_KATAKANA) -> atset1:120 */
  "Lang4": 119,
  /* html:Lang4 (Lang4) -> linux:91 (KEY_HIRAGANA) -> atset1:119 */
  "Lang5": 118,
  /* html:Lang5 (Lang5) -> linux:85 (KEY_ZENKAKUHANKAKU) -> atset1:118 */
  "LaunchApp1": 57451,
  /* html:LaunchApp1 (LaunchApp1) -> linux:157 (KEY_COMPUTER) -> atset1:57451 */
  "LaunchApp2": 57377,
  /* html:LaunchApp2 (LaunchApp2) -> linux:140 (KEY_CALC) -> atset1:57377 */
  "LaunchMail": 57452,
  /* html:LaunchMail (LaunchMail) -> linux:155 (KEY_MAIL) -> atset1:57452 */
  "MediaPlayPause": 57378,
  /* html:MediaPlayPause (MediaPlayPause) -> linux:164 (KEY_PLAYPAUSE) -> atset1:57378 */
  "MediaSelect": 57453,
  /* html:MediaSelect (MediaSelect) -> linux:226 (KEY_MEDIA) -> atset1:57453 */
  "MediaStop": 57380,
  /* html:MediaStop (MediaStop) -> linux:166 (KEY_STOPCD) -> atset1:57380 */
  "MediaTrackNext": 57369,
  /* html:MediaTrackNext (MediaTrackNext) -> linux:163 (KEY_NEXTSONG) -> atset1:57369 */
  "MediaTrackPrevious": 57360,
  /* html:MediaTrackPrevious (MediaTrackPrevious) -> linux:165 (KEY_PREVIOUSSONG) -> atset1:57360 */
  "MetaLeft": 57435,
  /* html:MetaLeft (MetaLeft) -> linux:125 (KEY_LEFTMETA) -> atset1:57435 */
  "MetaRight": 57436,
  /* html:MetaRight (MetaRight) -> linux:126 (KEY_RIGHTMETA) -> atset1:57436 */
  "Minus": 12,
  /* html:Minus (Minus) -> linux:12 (KEY_MINUS) -> atset1:12 */
  "NonConvert": 123,
  /* html:NonConvert (NonConvert) -> linux:94 (KEY_MUHENKAN) -> atset1:123 */
  "NumLock": 69,
  /* html:NumLock (NumLock) -> linux:69 (KEY_NUMLOCK) -> atset1:69 */
  "Numpad0": 82,
  /* html:Numpad0 (Numpad0) -> linux:82 (KEY_KP0) -> atset1:82 */
  "Numpad1": 79,
  /* html:Numpad1 (Numpad1) -> linux:79 (KEY_KP1) -> atset1:79 */
  "Numpad2": 80,
  /* html:Numpad2 (Numpad2) -> linux:80 (KEY_KP2) -> atset1:80 */
  "Numpad3": 81,
  /* html:Numpad3 (Numpad3) -> linux:81 (KEY_KP3) -> atset1:81 */
  "Numpad4": 75,
  /* html:Numpad4 (Numpad4) -> linux:75 (KEY_KP4) -> atset1:75 */
  "Numpad5": 76,
  /* html:Numpad5 (Numpad5) -> linux:76 (KEY_KP5) -> atset1:76 */
  "Numpad6": 77,
  /* html:Numpad6 (Numpad6) -> linux:77 (KEY_KP6) -> atset1:77 */
  "Numpad7": 71,
  /* html:Numpad7 (Numpad7) -> linux:71 (KEY_KP7) -> atset1:71 */
  "Numpad8": 72,
  /* html:Numpad8 (Numpad8) -> linux:72 (KEY_KP8) -> atset1:72 */
  "Numpad9": 73,
  /* html:Numpad9 (Numpad9) -> linux:73 (KEY_KP9) -> atset1:73 */
  "NumpadAdd": 78,
  /* html:NumpadAdd (NumpadAdd) -> linux:78 (KEY_KPPLUS) -> atset1:78 */
  "NumpadComma": 126,
  /* html:NumpadComma (NumpadComma) -> linux:121 (KEY_KPCOMMA) -> atset1:126 */
  "NumpadDecimal": 83,
  /* html:NumpadDecimal (NumpadDecimal) -> linux:83 (KEY_KPDOT) -> atset1:83 */
  "NumpadDivide": 57397,
  /* html:NumpadDivide (NumpadDivide) -> linux:98 (KEY_KPSLASH) -> atset1:57397 */
  "NumpadEnter": 57372,
  /* html:NumpadEnter (NumpadEnter) -> linux:96 (KEY_KPENTER) -> atset1:57372 */
  "NumpadEqual": 89,
  /* html:NumpadEqual (NumpadEqual) -> linux:117 (KEY_KPEQUAL) -> atset1:89 */
  "NumpadMultiply": 55,
  /* html:NumpadMultiply (NumpadMultiply) -> linux:55 (KEY_KPASTERISK) -> atset1:55 */
  "NumpadParenLeft": 57462,
  /* html:NumpadParenLeft (NumpadParenLeft) -> linux:179 (KEY_KPLEFTPAREN) -> atset1:57462 */
  "NumpadParenRight": 57467,
  /* html:NumpadParenRight (NumpadParenRight) -> linux:180 (KEY_KPRIGHTPAREN) -> atset1:57467 */
  "NumpadSubtract": 74,
  /* html:NumpadSubtract (NumpadSubtract) -> linux:74 (KEY_KPMINUS) -> atset1:74 */
  "Open": 100,
  /* html:Open (Open) -> linux:134 (KEY_OPEN) -> atset1:100 */
  "PageDown": 57425,
  /* html:PageDown (PageDown) -> linux:109 (KEY_PAGEDOWN) -> atset1:57425 */
  "PageUp": 57417,
  /* html:PageUp (PageUp) -> linux:104 (KEY_PAGEUP) -> atset1:57417 */
  "Paste": 101,
  /* html:Paste (Paste) -> linux:135 (KEY_PASTE) -> atset1:101 */
  "Pause": 57414,
  /* html:Pause (Pause) -> linux:119 (KEY_PAUSE) -> atset1:57414 */
  "Period": 52,
  /* html:Period (Period) -> linux:52 (KEY_DOT) -> atset1:52 */
  "Power": 57438,
  /* html:Power (Power) -> linux:116 (KEY_POWER) -> atset1:57438 */
  "PrintScreen": 84,
  /* html:PrintScreen (PrintScreen) -> linux:99 (KEY_SYSRQ) -> atset1:84 */
  "Props": 57350,
  /* html:Props (Props) -> linux:130 (KEY_PROPS) -> atset1:57350 */
  "Quote": 40,
  /* html:Quote (Quote) -> linux:40 (KEY_APOSTROPHE) -> atset1:40 */
  "ScrollLock": 70,
  /* html:ScrollLock (ScrollLock) -> linux:70 (KEY_SCROLLLOCK) -> atset1:70 */
  "Semicolon": 39,
  /* html:Semicolon (Semicolon) -> linux:39 (KEY_SEMICOLON) -> atset1:39 */
  "ShiftLeft": 42,
  /* html:ShiftLeft (ShiftLeft) -> linux:42 (KEY_LEFTSHIFT) -> atset1:42 */
  "ShiftRight": 54,
  /* html:ShiftRight (ShiftRight) -> linux:54 (KEY_RIGHTSHIFT) -> atset1:54 */
  "Slash": 53,
  /* html:Slash (Slash) -> linux:53 (KEY_SLASH) -> atset1:53 */
  "Sleep": 57439,
  /* html:Sleep (Sleep) -> linux:142 (KEY_SLEEP) -> atset1:57439 */
  "Space": 57,
  /* html:Space (Space) -> linux:57 (KEY_SPACE) -> atset1:57 */
  "Suspend": 57381,
  /* html:Suspend (Suspend) -> linux:205 (KEY_SUSPEND) -> atset1:57381 */
  "Tab": 15,
  /* html:Tab (Tab) -> linux:15 (KEY_TAB) -> atset1:15 */
  "Undo": 57351,
  /* html:Undo (Undo) -> linux:131 (KEY_UNDO) -> atset1:57351 */
  "WakeUp": 57443
  /* html:WakeUp (WakeUp) -> linux:143 (KEY_WAKEUP) -> atset1:57443 */
};

// node_modules/@novnc/novnc/core/encodings.js
var encodings = {
  encodingRaw: 0,
  encodingCopyRect: 1,
  encodingRRE: 2,
  encodingHextile: 5,
  encodingZlib: 6,
  encodingTight: 7,
  encodingZRLE: 16,
  encodingTightPNG: -260,
  encodingJPEG: 21,
  encodingH264: 50,
  pseudoEncodingQualityLevel9: -23,
  pseudoEncodingQualityLevel0: -32,
  pseudoEncodingDesktopSize: -223,
  pseudoEncodingLastRect: -224,
  pseudoEncodingCursor: -239,
  pseudoEncodingQEMUExtendedKeyEvent: -258,
  pseudoEncodingQEMULedEvent: -261,
  pseudoEncodingDesktopName: -307,
  pseudoEncodingExtendedDesktopSize: -308,
  pseudoEncodingXvp: -309,
  pseudoEncodingFence: -312,
  pseudoEncodingContinuousUpdates: -313,
  pseudoEncodingExtendedMouseButtons: -316,
  pseudoEncodingCompressLevel9: -247,
  pseudoEncodingCompressLevel0: -256,
  pseudoEncodingVMwareCursor: 1464686180,
  pseudoEncodingExtendedClipboard: 3231835598
};

// node_modules/@novnc/novnc/core/crypto/aes.js
var AESECBCipher = class _AESECBCipher {
  constructor() {
    this._key = null;
  }
  get algorithm() {
    return { name: "AES-ECB" };
  }
  static async importKey(key, _algorithm, extractable, keyUsages) {
    const cipher = new _AESECBCipher();
    await cipher._importKey(key, extractable, keyUsages);
    return cipher;
  }
  async _importKey(key, extractable, keyUsages) {
    this._key = await window.crypto.subtle.importKey(
      "raw",
      key,
      { name: "AES-CBC" },
      extractable,
      keyUsages
    );
  }
  async encrypt(_algorithm, plaintext) {
    const x = new Uint8Array(plaintext);
    if (x.length % 16 !== 0 || this._key === null) {
      return null;
    }
    const n = x.length / 16;
    for (let i = 0; i < n; i++) {
      const y = new Uint8Array(await window.crypto.subtle.encrypt({
        name: "AES-CBC",
        iv: new Uint8Array(16)
      }, this._key, x.slice(i * 16, i * 16 + 16))).slice(0, 16);
      x.set(y, i * 16);
    }
    return x;
  }
};
var AESEAXCipher = class _AESEAXCipher {
  constructor() {
    this._rawKey = null;
    this._ctrKey = null;
    this._cbcKey = null;
    this._zeroBlock = new Uint8Array(16);
    this._prefixBlock0 = this._zeroBlock;
    this._prefixBlock1 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
    this._prefixBlock2 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]);
  }
  get algorithm() {
    return { name: "AES-EAX" };
  }
  async _encryptBlock(block) {
    const encrypted = await window.crypto.subtle.encrypt({
      name: "AES-CBC",
      iv: this._zeroBlock
    }, this._cbcKey, block);
    return new Uint8Array(encrypted).slice(0, 16);
  }
  async _initCMAC() {
    const k1 = await this._encryptBlock(this._zeroBlock);
    const k2 = new Uint8Array(16);
    const v2 = k1[0] >>> 6;
    for (let i = 0; i < 15; i++) {
      k2[i] = k1[i + 1] >> 6 | k1[i] << 2;
      k1[i] = k1[i + 1] >> 7 | k1[i] << 1;
    }
    const lut = [0, 135, 14, 137];
    k2[14] ^= v2 >>> 1;
    k2[15] = k1[15] << 2 ^ lut[v2];
    k1[15] = k1[15] << 1 ^ lut[v2 >> 1];
    this._k1 = k1;
    this._k2 = k2;
  }
  async _encryptCTR(data, counter) {
    const encrypted = await window.crypto.subtle.encrypt({
      name: "AES-CTR",
      counter,
      length: 128
    }, this._ctrKey, data);
    return new Uint8Array(encrypted);
  }
  async _decryptCTR(data, counter) {
    const decrypted = await window.crypto.subtle.decrypt({
      name: "AES-CTR",
      counter,
      length: 128
    }, this._ctrKey, data);
    return new Uint8Array(decrypted);
  }
  async _computeCMAC(data, prefixBlock) {
    if (prefixBlock.length !== 16) {
      return null;
    }
    const n = Math.floor(data.length / 16);
    const m = Math.ceil(data.length / 16);
    const r = data.length - n * 16;
    const cbcData = new Uint8Array((m + 1) * 16);
    cbcData.set(prefixBlock);
    cbcData.set(data, 16);
    if (r === 0) {
      for (let i = 0; i < 16; i++) {
        cbcData[n * 16 + i] ^= this._k1[i];
      }
    } else {
      cbcData[(n + 1) * 16 + r] = 128;
      for (let i = 0; i < 16; i++) {
        cbcData[(n + 1) * 16 + i] ^= this._k2[i];
      }
    }
    let cbcEncrypted = await window.crypto.subtle.encrypt({
      name: "AES-CBC",
      iv: this._zeroBlock
    }, this._cbcKey, cbcData);
    cbcEncrypted = new Uint8Array(cbcEncrypted);
    const mac = cbcEncrypted.slice(cbcEncrypted.length - 32, cbcEncrypted.length - 16);
    return mac;
  }
  static async importKey(key, _algorithm, _extractable, _keyUsages) {
    const cipher = new _AESEAXCipher();
    await cipher._importKey(key);
    return cipher;
  }
  async _importKey(key) {
    this._rawKey = key;
    this._ctrKey = await window.crypto.subtle.importKey(
      "raw",
      key,
      { name: "AES-CTR" },
      false,
      ["encrypt", "decrypt"]
    );
    this._cbcKey = await window.crypto.subtle.importKey(
      "raw",
      key,
      { name: "AES-CBC" },
      false,
      ["encrypt"]
    );
    await this._initCMAC();
  }
  async encrypt(algorithm, message) {
    const ad = algorithm.additionalData;
    const nonce = algorithm.iv;
    const nCMAC = await this._computeCMAC(nonce, this._prefixBlock0);
    const encrypted = await this._encryptCTR(message, nCMAC);
    const adCMAC = await this._computeCMAC(ad, this._prefixBlock1);
    const mac = await this._computeCMAC(encrypted, this._prefixBlock2);
    for (let i = 0; i < 16; i++) {
      mac[i] ^= nCMAC[i] ^ adCMAC[i];
    }
    const res = new Uint8Array(16 + encrypted.length);
    res.set(encrypted);
    res.set(mac, encrypted.length);
    return res;
  }
  async decrypt(algorithm, data) {
    const encrypted = data.slice(0, data.length - 16);
    const ad = algorithm.additionalData;
    const nonce = algorithm.iv;
    const mac = data.slice(data.length - 16);
    const nCMAC = await this._computeCMAC(nonce, this._prefixBlock0);
    const adCMAC = await this._computeCMAC(ad, this._prefixBlock1);
    const computedMac = await this._computeCMAC(encrypted, this._prefixBlock2);
    for (let i = 0; i < 16; i++) {
      computedMac[i] ^= nCMAC[i] ^ adCMAC[i];
    }
    if (computedMac.length !== mac.length) {
      return null;
    }
    for (let i = 0; i < mac.length; i++) {
      if (computedMac[i] !== mac[i]) {
        return null;
      }
    }
    const res = await this._decryptCTR(encrypted, nCMAC);
    return res;
  }
};

// node_modules/@novnc/novnc/core/crypto/des.js
var PC2 = [
  13,
  16,
  10,
  23,
  0,
  4,
  2,
  27,
  14,
  5,
  20,
  9,
  22,
  18,
  11,
  3,
  25,
  7,
  15,
  6,
  26,
  19,
  12,
  1,
  40,
  51,
  30,
  36,
  46,
  54,
  29,
  39,
  50,
  44,
  32,
  47,
  43,
  48,
  38,
  55,
  33,
  52,
  45,
  41,
  49,
  35,
  28,
  31
];
var totrot = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
var z = 0;
var a;
var b;
var c;
var d;
var e;
var f;
a = 1 << 16;
b = 1 << 24;
c = a | b;
d = 1 << 2;
e = 1 << 10;
f = d | e;
var SP1 = [
  c | e,
  z | z,
  a | z,
  c | f,
  c | d,
  a | f,
  z | d,
  a | z,
  z | e,
  c | e,
  c | f,
  z | e,
  b | f,
  c | d,
  b | z,
  z | d,
  z | f,
  b | e,
  b | e,
  a | e,
  a | e,
  c | z,
  c | z,
  b | f,
  a | d,
  b | d,
  b | d,
  a | d,
  z | z,
  z | f,
  a | f,
  b | z,
  a | z,
  c | f,
  z | d,
  c | z,
  c | e,
  b | z,
  b | z,
  z | e,
  c | d,
  a | z,
  a | e,
  b | d,
  z | e,
  z | d,
  b | f,
  a | f,
  c | f,
  a | d,
  c | z,
  b | f,
  b | d,
  z | f,
  a | f,
  c | e,
  z | f,
  b | e,
  b | e,
  z | z,
  a | d,
  a | e,
  z | z,
  c | d
];
a = 1 << 20;
b = 1 << 31;
c = a | b;
d = 1 << 5;
e = 1 << 15;
f = d | e;
var SP2 = [
  c | f,
  b | e,
  z | e,
  a | f,
  a | z,
  z | d,
  c | d,
  b | f,
  b | d,
  c | f,
  c | e,
  b | z,
  b | e,
  a | z,
  z | d,
  c | d,
  a | e,
  a | d,
  b | f,
  z | z,
  b | z,
  z | e,
  a | f,
  c | z,
  a | d,
  b | d,
  z | z,
  a | e,
  z | f,
  c | e,
  c | z,
  z | f,
  z | z,
  a | f,
  c | d,
  a | z,
  b | f,
  c | z,
  c | e,
  z | e,
  c | z,
  b | e,
  z | d,
  c | f,
  a | f,
  z | d,
  z | e,
  b | z,
  z | f,
  c | e,
  a | z,
  b | d,
  a | d,
  b | f,
  b | d,
  a | d,
  a | e,
  z | z,
  b | e,
  z | f,
  b | z,
  c | d,
  c | f,
  a | e
];
a = 1 << 17;
b = 1 << 27;
c = a | b;
d = 1 << 3;
e = 1 << 9;
f = d | e;
var SP3 = [
  z | f,
  c | e,
  z | z,
  c | d,
  b | e,
  z | z,
  a | f,
  b | e,
  a | d,
  b | d,
  b | d,
  a | z,
  c | f,
  a | d,
  c | z,
  z | f,
  b | z,
  z | d,
  c | e,
  z | e,
  a | e,
  c | z,
  c | d,
  a | f,
  b | f,
  a | e,
  a | z,
  b | f,
  z | d,
  c | f,
  z | e,
  b | z,
  c | e,
  b | z,
  a | d,
  z | f,
  a | z,
  c | e,
  b | e,
  z | z,
  z | e,
  a | d,
  c | f,
  b | e,
  b | d,
  z | e,
  z | z,
  c | d,
  b | f,
  a | z,
  b | z,
  c | f,
  z | d,
  a | f,
  a | e,
  b | d,
  c | z,
  b | f,
  z | f,
  c | z,
  a | f,
  z | d,
  c | d,
  a | e
];
a = 1 << 13;
b = 1 << 23;
c = a | b;
d = 1 << 0;
e = 1 << 7;
f = d | e;
var SP4 = [
  c | d,
  a | f,
  a | f,
  z | e,
  c | e,
  b | f,
  b | d,
  a | d,
  z | z,
  c | z,
  c | z,
  c | f,
  z | f,
  z | z,
  b | e,
  b | d,
  z | d,
  a | z,
  b | z,
  c | d,
  z | e,
  b | z,
  a | d,
  a | e,
  b | f,
  z | d,
  a | e,
  b | e,
  a | z,
  c | e,
  c | f,
  z | f,
  b | e,
  b | d,
  c | z,
  c | f,
  z | f,
  z | z,
  z | z,
  c | z,
  a | e,
  b | e,
  b | f,
  z | d,
  c | d,
  a | f,
  a | f,
  z | e,
  c | f,
  z | f,
  z | d,
  a | z,
  b | d,
  a | d,
  c | e,
  b | f,
  a | d,
  a | e,
  b | z,
  c | d,
  z | e,
  b | z,
  a | z,
  c | e
];
a = 1 << 25;
b = 1 << 30;
c = a | b;
d = 1 << 8;
e = 1 << 19;
f = d | e;
var SP5 = [
  z | d,
  a | f,
  a | e,
  c | d,
  z | e,
  z | d,
  b | z,
  a | e,
  b | f,
  z | e,
  a | d,
  b | f,
  c | d,
  c | e,
  z | f,
  b | z,
  a | z,
  b | e,
  b | e,
  z | z,
  b | d,
  c | f,
  c | f,
  a | d,
  c | e,
  b | d,
  z | z,
  c | z,
  a | f,
  a | z,
  c | z,
  z | f,
  z | e,
  c | d,
  z | d,
  a | z,
  b | z,
  a | e,
  c | d,
  b | f,
  a | d,
  b | z,
  c | e,
  a | f,
  b | f,
  z | d,
  a | z,
  c | e,
  c | f,
  z | f,
  c | z,
  c | f,
  a | e,
  z | z,
  b | e,
  c | z,
  z | f,
  a | d,
  b | d,
  z | e,
  z | z,
  b | e,
  a | f,
  b | d
];
a = 1 << 22;
b = 1 << 29;
c = a | b;
d = 1 << 4;
e = 1 << 14;
f = d | e;
var SP6 = [
  b | d,
  c | z,
  z | e,
  c | f,
  c | z,
  z | d,
  c | f,
  a | z,
  b | e,
  a | f,
  a | z,
  b | d,
  a | d,
  b | e,
  b | z,
  z | f,
  z | z,
  a | d,
  b | f,
  z | e,
  a | e,
  b | f,
  z | d,
  c | d,
  c | d,
  z | z,
  a | f,
  c | e,
  z | f,
  a | e,
  c | e,
  b | z,
  b | e,
  z | d,
  c | d,
  a | e,
  c | f,
  a | z,
  z | f,
  b | d,
  a | z,
  b | e,
  b | z,
  z | f,
  b | d,
  c | f,
  a | e,
  c | z,
  a | f,
  c | e,
  z | z,
  c | d,
  z | d,
  z | e,
  c | z,
  a | f,
  z | e,
  a | d,
  b | f,
  z | z,
  c | e,
  b | z,
  a | d,
  b | f
];
a = 1 << 21;
b = 1 << 26;
c = a | b;
d = 1 << 1;
e = 1 << 11;
f = d | e;
var SP7 = [
  a | z,
  c | d,
  b | f,
  z | z,
  z | e,
  b | f,
  a | f,
  c | e,
  c | f,
  a | z,
  z | z,
  b | d,
  z | d,
  b | z,
  c | d,
  z | f,
  b | e,
  a | f,
  a | d,
  b | e,
  b | d,
  c | z,
  c | e,
  a | d,
  c | z,
  z | e,
  z | f,
  c | f,
  a | e,
  z | d,
  b | z,
  a | e,
  b | z,
  a | e,
  a | z,
  b | f,
  b | f,
  c | d,
  c | d,
  z | d,
  a | d,
  b | z,
  b | e,
  a | z,
  c | e,
  z | f,
  a | f,
  c | e,
  z | f,
  b | d,
  c | f,
  c | z,
  a | e,
  z | z,
  z | d,
  c | f,
  z | z,
  a | f,
  c | z,
  z | e,
  b | d,
  b | e,
  z | e,
  a | d
];
a = 1 << 18;
b = 1 << 28;
c = a | b;
d = 1 << 6;
e = 1 << 12;
f = d | e;
var SP8 = [
  b | f,
  z | e,
  a | z,
  c | f,
  b | z,
  b | f,
  z | d,
  b | z,
  a | d,
  c | z,
  c | f,
  a | e,
  c | e,
  a | f,
  z | e,
  z | d,
  c | z,
  b | d,
  b | e,
  z | f,
  a | e,
  a | d,
  c | d,
  c | e,
  z | f,
  z | z,
  z | z,
  c | d,
  b | d,
  b | e,
  a | f,
  a | z,
  a | f,
  a | z,
  c | e,
  z | e,
  z | d,
  c | d,
  z | e,
  a | f,
  b | e,
  z | d,
  b | d,
  c | z,
  c | d,
  b | z,
  a | z,
  b | f,
  z | z,
  c | f,
  a | d,
  b | d,
  c | z,
  b | e,
  b | f,
  z | z,
  c | f,
  a | e,
  a | e,
  z | f,
  z | f,
  a | d,
  b | z,
  c | e
];
var DES = class {
  constructor(password) {
    this.keys = [];
    const pc1m = [], pcr = [], kn = [];
    for (let j2 = 0, l = 56; j2 < 56; ++j2, l -= 8) {
      l += l < -5 ? 65 : l < -3 ? 31 : l < -1 ? 63 : l === 27 ? 35 : 0;
      const m = l & 7;
      pc1m[j2] = (password[l >>> 3] & 1 << m) !== 0 ? 1 : 0;
    }
    for (let i = 0; i < 16; ++i) {
      const m = i << 1;
      const n = m + 1;
      kn[m] = kn[n] = 0;
      for (let o2 = 28; o2 < 59; o2 += 28) {
        for (let j2 = o2 - 28; j2 < o2; ++j2) {
          const l = j2 + totrot[i];
          pcr[j2] = l < o2 ? pc1m[l] : pc1m[l - 28];
        }
      }
      for (let j2 = 0; j2 < 24; ++j2) {
        if (pcr[PC2[j2]] !== 0) {
          kn[m] |= 1 << 23 - j2;
        }
        if (pcr[PC2[j2 + 24]] !== 0) {
          kn[n] |= 1 << 23 - j2;
        }
      }
    }
    for (let i = 0, rawi = 0, KnLi = 0; i < 16; ++i) {
      const raw0 = kn[rawi++];
      const raw1 = kn[rawi++];
      this.keys[KnLi] = (raw0 & 16515072) << 6;
      this.keys[KnLi] |= (raw0 & 4032) << 10;
      this.keys[KnLi] |= (raw1 & 16515072) >>> 10;
      this.keys[KnLi] |= (raw1 & 4032) >>> 6;
      ++KnLi;
      this.keys[KnLi] = (raw0 & 258048) << 12;
      this.keys[KnLi] |= (raw0 & 63) << 16;
      this.keys[KnLi] |= (raw1 & 258048) >>> 4;
      this.keys[KnLi] |= raw1 & 63;
      ++KnLi;
    }
  }
  // Encrypt 8 bytes of text
  enc8(text) {
    const b3 = text.slice();
    let i = 0, l, r, x;
    l = b3[i++] << 24 | b3[i++] << 16 | b3[i++] << 8 | b3[i++];
    r = b3[i++] << 24 | b3[i++] << 16 | b3[i++] << 8 | b3[i++];
    x = (l >>> 4 ^ r) & 252645135;
    r ^= x;
    l ^= x << 4;
    x = (l >>> 16 ^ r) & 65535;
    r ^= x;
    l ^= x << 16;
    x = (r >>> 2 ^ l) & 858993459;
    l ^= x;
    r ^= x << 2;
    x = (r >>> 8 ^ l) & 16711935;
    l ^= x;
    r ^= x << 8;
    r = r << 1 | r >>> 31 & 1;
    x = (l ^ r) & 2863311530;
    l ^= x;
    r ^= x;
    l = l << 1 | l >>> 31 & 1;
    for (let i2 = 0, keysi = 0; i2 < 8; ++i2) {
      x = r << 28 | r >>> 4;
      x ^= this.keys[keysi++];
      let fval = SP7[x & 63];
      fval |= SP5[x >>> 8 & 63];
      fval |= SP3[x >>> 16 & 63];
      fval |= SP1[x >>> 24 & 63];
      x = r ^ this.keys[keysi++];
      fval |= SP8[x & 63];
      fval |= SP6[x >>> 8 & 63];
      fval |= SP4[x >>> 16 & 63];
      fval |= SP2[x >>> 24 & 63];
      l ^= fval;
      x = l << 28 | l >>> 4;
      x ^= this.keys[keysi++];
      fval = SP7[x & 63];
      fval |= SP5[x >>> 8 & 63];
      fval |= SP3[x >>> 16 & 63];
      fval |= SP1[x >>> 24 & 63];
      x = l ^ this.keys[keysi++];
      fval |= SP8[x & 63];
      fval |= SP6[x >>> 8 & 63];
      fval |= SP4[x >>> 16 & 63];
      fval |= SP2[x >>> 24 & 63];
      r ^= fval;
    }
    r = r << 31 | r >>> 1;
    x = (l ^ r) & 2863311530;
    l ^= x;
    r ^= x;
    l = l << 31 | l >>> 1;
    x = (l >>> 8 ^ r) & 16711935;
    r ^= x;
    l ^= x << 8;
    x = (l >>> 2 ^ r) & 858993459;
    r ^= x;
    l ^= x << 2;
    x = (r >>> 16 ^ l) & 65535;
    l ^= x;
    r ^= x << 16;
    x = (r >>> 4 ^ l) & 252645135;
    l ^= x;
    r ^= x << 4;
    x = [r, l];
    for (i = 0; i < 8; i++) {
      b3[i] = (x[i >>> 2] >>> 8 * (3 - i % 4)) % 256;
      if (b3[i] < 0) {
        b3[i] += 256;
      }
    }
    return b3;
  }
};
var DESECBCipher = class _DESECBCipher {
  constructor() {
    this._cipher = null;
  }
  get algorithm() {
    return { name: "DES-ECB" };
  }
  static importKey(key, _algorithm, _extractable, _keyUsages) {
    const cipher = new _DESECBCipher();
    cipher._importKey(key);
    return cipher;
  }
  _importKey(key, _extractable, _keyUsages) {
    this._cipher = new DES(key);
  }
  encrypt(_algorithm, plaintext) {
    const x = new Uint8Array(plaintext);
    if (x.length % 8 !== 0 || this._cipher === null) {
      return null;
    }
    const n = x.length / 8;
    for (let i = 0; i < n; i++) {
      x.set(this._cipher.enc8(x.slice(i * 8, i * 8 + 8)), i * 8);
    }
    return x;
  }
};
var DESCBCCipher = class _DESCBCCipher {
  constructor() {
    this._cipher = null;
  }
  get algorithm() {
    return { name: "DES-CBC" };
  }
  static importKey(key, _algorithm, _extractable, _keyUsages) {
    const cipher = new _DESCBCCipher();
    cipher._importKey(key);
    return cipher;
  }
  _importKey(key) {
    this._cipher = new DES(key);
  }
  encrypt(algorithm, plaintext) {
    const x = new Uint8Array(plaintext);
    let y = new Uint8Array(algorithm.iv);
    if (x.length % 8 !== 0 || this._cipher === null) {
      return null;
    }
    const n = x.length / 8;
    for (let i = 0; i < n; i++) {
      for (let j2 = 0; j2 < 8; j2++) {
        y[j2] ^= plaintext[i * 8 + j2];
      }
      y = this._cipher.enc8(y);
      x.set(y, i * 8);
    }
    return x;
  }
};

// node_modules/@novnc/novnc/core/crypto/bigint.js
function modPow(b3, e2, m) {
  let r = 1n;
  b3 = b3 % m;
  while (e2 > 0n) {
    if ((e2 & 1n) === 1n) {
      r = r * b3 % m;
    }
    e2 = e2 >> 1n;
    b3 = b3 * b3 % m;
  }
  return r;
}
function bigIntToU8Array(bigint, padLength = 0) {
  let hex = bigint.toString(16);
  if (padLength === 0) {
    padLength = Math.ceil(hex.length / 2);
  }
  hex = hex.padStart(padLength * 2, "0");
  const length = hex.length / 2;
  const arr = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    arr[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return arr;
}
function u8ArrayToBigInt(arr) {
  let hex = "0x";
  for (let i = 0; i < arr.length; i++) {
    hex += arr[i].toString(16).padStart(2, "0");
  }
  return BigInt(hex);
}

// node_modules/@novnc/novnc/core/crypto/rsa.js
var RSACipher = class _RSACipher {
  constructor() {
    this._keyLength = 0;
    this._keyBytes = 0;
    this._n = null;
    this._e = null;
    this._d = null;
    this._nBigInt = null;
    this._eBigInt = null;
    this._dBigInt = null;
    this._extractable = false;
  }
  get algorithm() {
    return { name: "RSA-PKCS1-v1_5" };
  }
  _base64urlDecode(data) {
    data = data.replace(/-/g, "+").replace(/_/g, "/");
    data = data.padEnd(Math.ceil(data.length / 4) * 4, "=");
    return base64_default.decode(data);
  }
  _padArray(arr, length) {
    const res = new Uint8Array(length);
    res.set(arr, length - arr.length);
    return res;
  }
  static async generateKey(algorithm, extractable, _keyUsages) {
    const cipher = new _RSACipher();
    await cipher._generateKey(algorithm, extractable);
    return { privateKey: cipher };
  }
  async _generateKey(algorithm, extractable) {
    this._keyLength = algorithm.modulusLength;
    this._keyBytes = Math.ceil(this._keyLength / 8);
    const key = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: algorithm.modulusLength,
        publicExponent: algorithm.publicExponent,
        hash: { name: "SHA-256" }
      },
      true,
      ["encrypt", "decrypt"]
    );
    const privateKey = await window.crypto.subtle.exportKey("jwk", key.privateKey);
    this._n = this._padArray(this._base64urlDecode(privateKey.n), this._keyBytes);
    this._nBigInt = u8ArrayToBigInt(this._n);
    this._e = this._padArray(this._base64urlDecode(privateKey.e), this._keyBytes);
    this._eBigInt = u8ArrayToBigInt(this._e);
    this._d = this._padArray(this._base64urlDecode(privateKey.d), this._keyBytes);
    this._dBigInt = u8ArrayToBigInt(this._d);
    this._extractable = extractable;
  }
  static async importKey(key, _algorithm, extractable, keyUsages) {
    if (keyUsages.length !== 1 || keyUsages[0] !== "encrypt") {
      throw new Error("only support importing RSA public key");
    }
    const cipher = new _RSACipher();
    await cipher._importKey(key, extractable);
    return cipher;
  }
  async _importKey(key, extractable) {
    const n = key.n;
    const e2 = key.e;
    if (n.length !== e2.length) {
      throw new Error("the sizes of modulus and public exponent do not match");
    }
    this._keyBytes = n.length;
    this._keyLength = this._keyBytes * 8;
    this._n = new Uint8Array(this._keyBytes);
    this._e = new Uint8Array(this._keyBytes);
    this._n.set(n);
    this._e.set(e2);
    this._nBigInt = u8ArrayToBigInt(this._n);
    this._eBigInt = u8ArrayToBigInt(this._e);
    this._extractable = extractable;
  }
  async encrypt(_algorithm, message) {
    if (message.length > this._keyBytes - 11) {
      return null;
    }
    const ps2 = new Uint8Array(this._keyBytes - message.length - 3);
    window.crypto.getRandomValues(ps2);
    for (let i = 0; i < ps2.length; i++) {
      ps2[i] = Math.floor(ps2[i] * 254 / 255 + 1);
    }
    const em = new Uint8Array(this._keyBytes);
    em[1] = 2;
    em.set(ps2, 2);
    em.set(message, ps2.length + 3);
    const emBigInt = u8ArrayToBigInt(em);
    const c2 = modPow(emBigInt, this._eBigInt, this._nBigInt);
    return bigIntToU8Array(c2, this._keyBytes);
  }
  async decrypt(_algorithm, message) {
    if (message.length !== this._keyBytes) {
      return null;
    }
    const msgBigInt = u8ArrayToBigInt(message);
    const emBigInt = modPow(msgBigInt, this._dBigInt, this._nBigInt);
    const em = bigIntToU8Array(emBigInt, this._keyBytes);
    if (em[0] !== 0 || em[1] !== 2) {
      return null;
    }
    let i = 2;
    for (; i < em.length; i++) {
      if (em[i] === 0) {
        break;
      }
    }
    if (i === em.length) {
      return null;
    }
    return em.slice(i + 1, em.length);
  }
  async exportKey() {
    if (!this._extractable) {
      throw new Error("key is not extractable");
    }
    return { n: this._n, e: this._e, d: this._d };
  }
};

// node_modules/@novnc/novnc/core/crypto/dh.js
var DHPublicKey = class {
  constructor(key) {
    this._key = key;
  }
  get algorithm() {
    return { name: "DH" };
  }
  exportKey() {
    return this._key;
  }
};
var DHCipher = class _DHCipher {
  constructor() {
    this._g = null;
    this._p = null;
    this._gBigInt = null;
    this._pBigInt = null;
    this._privateKey = null;
  }
  get algorithm() {
    return { name: "DH" };
  }
  static generateKey(algorithm, _extractable) {
    const cipher = new _DHCipher();
    cipher._generateKey(algorithm);
    return { privateKey: cipher, publicKey: new DHPublicKey(cipher._publicKey) };
  }
  _generateKey(algorithm) {
    const g = algorithm.g;
    const p = algorithm.p;
    this._keyBytes = p.length;
    this._gBigInt = u8ArrayToBigInt(g);
    this._pBigInt = u8ArrayToBigInt(p);
    this._privateKey = window.crypto.getRandomValues(new Uint8Array(this._keyBytes));
    this._privateKeyBigInt = u8ArrayToBigInt(this._privateKey);
    this._publicKey = bigIntToU8Array(modPow(
      this._gBigInt,
      this._privateKeyBigInt,
      this._pBigInt
    ), this._keyBytes);
  }
  deriveBits(algorithm, length) {
    const bytes = Math.ceil(length / 8);
    const pkey = new Uint8Array(algorithm.public);
    const len = bytes > this._keyBytes ? bytes : this._keyBytes;
    const secret = modPow(u8ArrayToBigInt(pkey), this._privateKeyBigInt, this._pBigInt);
    return bigIntToU8Array(secret, len).slice(0, len);
  }
};

// node_modules/@novnc/novnc/core/crypto/md5.js
async function MD5(d2) {
  let s15 = "";
  for (let i = 0; i < d2.length; i++) {
    s15 += String.fromCharCode(d2[i]);
  }
  return M(V(Y(X(s15), 8 * s15.length)));
}
function M(d2) {
  let f2 = new Uint8Array(d2.length);
  for (let i = 0; i < d2.length; i++) {
    f2[i] = d2.charCodeAt(i);
  }
  return f2;
}
function X(d2) {
  let r = Array(d2.length >> 2);
  for (let m = 0; m < r.length; m++) r[m] = 0;
  for (let m = 0; m < 8 * d2.length; m += 8) r[m >> 5] |= (255 & d2.charCodeAt(m / 8)) << m % 32;
  return r;
}
function V(d2) {
  let r = "";
  for (let m = 0; m < 32 * d2.length; m += 8) r += String.fromCharCode(d2[m >> 5] >>> m % 32 & 255);
  return r;
}
function Y(d2, g) {
  d2[g >> 5] |= 128 << g % 32, d2[14 + (g + 64 >>> 9 << 4)] = g;
  let m = 1732584193, f2 = -271733879, r = -1732584194, i = 271733878;
  for (let n = 0; n < d2.length; n += 16) {
    let h2 = m, t = f2, g2 = r, e2 = i;
    f2 = ii(f2 = ii(f2 = ii(f2 = ii(f2 = hh(f2 = hh(f2 = hh(f2 = hh(f2 = gg(f2 = gg(f2 = gg(f2 = gg(f2 = ff(f2 = ff(f2 = ff(f2 = ff(f2, r = ff(r, i = ff(i, m = ff(m, f2, r, i, d2[n + 0], 7, -680876936), f2, r, d2[n + 1], 12, -389564586), m, f2, d2[n + 2], 17, 606105819), i, m, d2[n + 3], 22, -1044525330), r = ff(r, i = ff(i, m = ff(m, f2, r, i, d2[n + 4], 7, -176418897), f2, r, d2[n + 5], 12, 1200080426), m, f2, d2[n + 6], 17, -1473231341), i, m, d2[n + 7], 22, -45705983), r = ff(r, i = ff(i, m = ff(m, f2, r, i, d2[n + 8], 7, 1770035416), f2, r, d2[n + 9], 12, -1958414417), m, f2, d2[n + 10], 17, -42063), i, m, d2[n + 11], 22, -1990404162), r = ff(r, i = ff(i, m = ff(m, f2, r, i, d2[n + 12], 7, 1804603682), f2, r, d2[n + 13], 12, -40341101), m, f2, d2[n + 14], 17, -1502002290), i, m, d2[n + 15], 22, 1236535329), r = gg(r, i = gg(i, m = gg(m, f2, r, i, d2[n + 1], 5, -165796510), f2, r, d2[n + 6], 9, -1069501632), m, f2, d2[n + 11], 14, 643717713), i, m, d2[n + 0], 20, -373897302), r = gg(r, i = gg(i, m = gg(m, f2, r, i, d2[n + 5], 5, -701558691), f2, r, d2[n + 10], 9, 38016083), m, f2, d2[n + 15], 14, -660478335), i, m, d2[n + 4], 20, -405537848), r = gg(r, i = gg(i, m = gg(m, f2, r, i, d2[n + 9], 5, 568446438), f2, r, d2[n + 14], 9, -1019803690), m, f2, d2[n + 3], 14, -187363961), i, m, d2[n + 8], 20, 1163531501), r = gg(r, i = gg(i, m = gg(m, f2, r, i, d2[n + 13], 5, -1444681467), f2, r, d2[n + 2], 9, -51403784), m, f2, d2[n + 7], 14, 1735328473), i, m, d2[n + 12], 20, -1926607734), r = hh(r, i = hh(i, m = hh(m, f2, r, i, d2[n + 5], 4, -378558), f2, r, d2[n + 8], 11, -2022574463), m, f2, d2[n + 11], 16, 1839030562), i, m, d2[n + 14], 23, -35309556), r = hh(r, i = hh(i, m = hh(m, f2, r, i, d2[n + 1], 4, -1530992060), f2, r, d2[n + 4], 11, 1272893353), m, f2, d2[n + 7], 16, -155497632), i, m, d2[n + 10], 23, -1094730640), r = hh(r, i = hh(i, m = hh(m, f2, r, i, d2[n + 13], 4, 681279174), f2, r, d2[n + 0], 11, -358537222), m, f2, d2[n + 3], 16, -722521979), i, m, d2[n + 6], 23, 76029189), r = hh(r, i = hh(i, m = hh(m, f2, r, i, d2[n + 9], 4, -640364487), f2, r, d2[n + 12], 11, -421815835), m, f2, d2[n + 15], 16, 530742520), i, m, d2[n + 2], 23, -995338651), r = ii(r, i = ii(i, m = ii(m, f2, r, i, d2[n + 0], 6, -198630844), f2, r, d2[n + 7], 10, 1126891415), m, f2, d2[n + 14], 15, -1416354905), i, m, d2[n + 5], 21, -57434055), r = ii(r, i = ii(i, m = ii(m, f2, r, i, d2[n + 12], 6, 1700485571), f2, r, d2[n + 3], 10, -1894986606), m, f2, d2[n + 10], 15, -1051523), i, m, d2[n + 1], 21, -2054922799), r = ii(r, i = ii(i, m = ii(m, f2, r, i, d2[n + 8], 6, 1873313359), f2, r, d2[n + 15], 10, -30611744), m, f2, d2[n + 6], 15, -1560198380), i, m, d2[n + 13], 21, 1309151649), r = ii(r, i = ii(i, m = ii(m, f2, r, i, d2[n + 4], 6, -145523070), f2, r, d2[n + 11], 10, -1120210379), m, f2, d2[n + 2], 15, 718787259), i, m, d2[n + 9], 21, -343485551), m = add(m, h2), f2 = add(f2, t), r = add(r, g2), i = add(i, e2);
  }
  return Array(m, f2, r, i);
}
function cmn(d2, g, m, f2, r, i) {
  return add(rol(add(add(g, d2), add(f2, i)), r), m);
}
function ff(d2, g, m, f2, r, i, n) {
  return cmn(g & m | ~g & f2, d2, g, r, i, n);
}
function gg(d2, g, m, f2, r, i, n) {
  return cmn(g & f2 | m & ~f2, d2, g, r, i, n);
}
function hh(d2, g, m, f2, r, i, n) {
  return cmn(g ^ m ^ f2, d2, g, r, i, n);
}
function ii(d2, g, m, f2, r, i, n) {
  return cmn(m ^ (g | ~f2), d2, g, r, i, n);
}
function add(d2, g) {
  let m = (65535 & d2) + (65535 & g);
  return (d2 >> 16) + (g >> 16) + (m >> 16) << 16 | 65535 & m;
}
function rol(d2, g) {
  return d2 << g | d2 >>> 32 - g;
}

// node_modules/@novnc/novnc/core/crypto/crypto.js
var LegacyCrypto = class {
  constructor() {
    this._algorithms = {
      "AES-ECB": AESECBCipher,
      "AES-EAX": AESEAXCipher,
      "DES-ECB": DESECBCipher,
      "DES-CBC": DESCBCCipher,
      "RSA-PKCS1-v1_5": RSACipher,
      "DH": DHCipher,
      "MD5": MD5
    };
  }
  encrypt(algorithm, key, data) {
    if (key.algorithm.name !== algorithm.name) {
      throw new Error("algorithm does not match");
    }
    if (typeof key.encrypt !== "function") {
      throw new Error("key does not support encryption");
    }
    return key.encrypt(algorithm, data);
  }
  decrypt(algorithm, key, data) {
    if (key.algorithm.name !== algorithm.name) {
      throw new Error("algorithm does not match");
    }
    if (typeof key.decrypt !== "function") {
      throw new Error("key does not support encryption");
    }
    return key.decrypt(algorithm, data);
  }
  importKey(format, keyData, algorithm, extractable, keyUsages) {
    if (format !== "raw") {
      throw new Error("key format is not supported");
    }
    const alg = this._algorithms[algorithm.name];
    if (typeof alg === "undefined" || typeof alg.importKey !== "function") {
      throw new Error("algorithm is not supported");
    }
    return alg.importKey(keyData, algorithm, extractable, keyUsages);
  }
  generateKey(algorithm, extractable, keyUsages) {
    const alg = this._algorithms[algorithm.name];
    if (typeof alg === "undefined" || typeof alg.generateKey !== "function") {
      throw new Error("algorithm is not supported");
    }
    return alg.generateKey(algorithm, extractable, keyUsages);
  }
  exportKey(format, key) {
    if (format !== "raw") {
      throw new Error("key format is not supported");
    }
    if (typeof key.exportKey !== "function") {
      throw new Error("key does not support exportKey");
    }
    return key.exportKey();
  }
  digest(algorithm, data) {
    const alg = this._algorithms[algorithm];
    if (typeof alg !== "function") {
      throw new Error("algorithm is not supported");
    }
    return alg(data);
  }
  deriveBits(algorithm, key, length) {
    if (key.algorithm.name !== algorithm.name) {
      throw new Error("algorithm does not match");
    }
    if (typeof key.deriveBits !== "function") {
      throw new Error("key does not support deriveBits");
    }
    return key.deriveBits(algorithm, length);
  }
};
var crypto_default = new LegacyCrypto();

// node_modules/@novnc/novnc/core/ra2.js
var RA2Cipher = class {
  constructor() {
    this._cipher = null;
    this._counter = new Uint8Array(16);
  }
  async setKey(key) {
    this._cipher = await crypto_default.importKey(
      "raw",
      key,
      { name: "AES-EAX" },
      false,
      ["encrypt, decrypt"]
    );
  }
  async makeMessage(message) {
    const ad = new Uint8Array([(message.length & 65280) >>> 8, message.length & 255]);
    const encrypted = await crypto_default.encrypt({
      name: "AES-EAX",
      iv: this._counter,
      additionalData: ad
    }, this._cipher, message);
    for (let i = 0; i < 16 && this._counter[i]++ === 255; i++) ;
    const res = new Uint8Array(message.length + 2 + 16);
    res.set(ad);
    res.set(encrypted, 2);
    return res;
  }
  async receiveMessage(length, encrypted) {
    const ad = new Uint8Array([(length & 65280) >>> 8, length & 255]);
    const res = await crypto_default.decrypt({
      name: "AES-EAX",
      iv: this._counter,
      additionalData: ad
    }, this._cipher, encrypted);
    for (let i = 0; i < 16 && this._counter[i]++ === 255; i++) ;
    return res;
  }
};
var RSAAESAuthenticationState = class extends EventTargetMixin {
  constructor(sock, getCredentials) {
    super();
    this._hasStarted = false;
    this._checkSock = null;
    this._checkCredentials = null;
    this._approveServerResolve = null;
    this._sockReject = null;
    this._credentialsReject = null;
    this._approveServerReject = null;
    this._sock = sock;
    this._getCredentials = getCredentials;
  }
  _waitSockAsync(len) {
    return new Promise((resolve, reject) => {
      const hasData = () => !this._sock.rQwait("RA2", len);
      if (hasData()) {
        resolve();
      } else {
        this._checkSock = () => {
          if (hasData()) {
            resolve();
            this._checkSock = null;
            this._sockReject = null;
          }
        };
        this._sockReject = reject;
      }
    });
  }
  _waitApproveKeyAsync() {
    return new Promise((resolve, reject) => {
      this._approveServerResolve = resolve;
      this._approveServerReject = reject;
    });
  }
  _waitCredentialsAsync(subtype) {
    const hasCredentials = () => {
      if (subtype === 1 && this._getCredentials().username !== void 0 && this._getCredentials().password !== void 0) {
        return true;
      } else if (subtype === 2 && this._getCredentials().password !== void 0) {
        return true;
      }
      return false;
    };
    return new Promise((resolve, reject) => {
      if (hasCredentials()) {
        resolve();
      } else {
        this._checkCredentials = () => {
          if (hasCredentials()) {
            resolve();
            this._checkCredentials = null;
            this._credentialsReject = null;
          }
        };
        this._credentialsReject = reject;
      }
    });
  }
  checkInternalEvents() {
    if (this._checkSock !== null) {
      this._checkSock();
    }
    if (this._checkCredentials !== null) {
      this._checkCredentials();
    }
  }
  approveServer() {
    if (this._approveServerResolve !== null) {
      this._approveServerResolve();
      this._approveServerResolve = null;
    }
  }
  disconnect() {
    if (this._sockReject !== null) {
      this._sockReject(new Error("disconnect normally"));
      this._sockReject = null;
    }
    if (this._credentialsReject !== null) {
      this._credentialsReject(new Error("disconnect normally"));
      this._credentialsReject = null;
    }
    if (this._approveServerReject !== null) {
      this._approveServerReject(new Error("disconnect normally"));
      this._approveServerReject = null;
    }
  }
  async negotiateRA2neAuthAsync() {
    this._hasStarted = true;
    await this._waitSockAsync(4);
    const serverKeyLengthBuffer = this._sock.rQpeekBytes(4);
    const serverKeyLength = this._sock.rQshift32();
    if (serverKeyLength < 1024) {
      throw new Error("RA2: server public key is too short: " + serverKeyLength);
    } else if (serverKeyLength > 8192) {
      throw new Error("RA2: server public key is too long: " + serverKeyLength);
    }
    const serverKeyBytes = Math.ceil(serverKeyLength / 8);
    await this._waitSockAsync(serverKeyBytes * 2);
    const serverN = this._sock.rQshiftBytes(serverKeyBytes);
    const serverE = this._sock.rQshiftBytes(serverKeyBytes);
    const serverRSACipher = await crypto_default.importKey(
      "raw",
      { n: serverN, e: serverE },
      { name: "RSA-PKCS1-v1_5" },
      false,
      ["encrypt"]
    );
    const serverPublickey = new Uint8Array(4 + serverKeyBytes * 2);
    serverPublickey.set(serverKeyLengthBuffer);
    serverPublickey.set(serverN, 4);
    serverPublickey.set(serverE, 4 + serverKeyBytes);
    let approveKey = this._waitApproveKeyAsync();
    this.dispatchEvent(new CustomEvent("serververification", {
      detail: { type: "RSA", publickey: serverPublickey }
    }));
    await approveKey;
    const clientKeyLength = 2048;
    const clientKeyBytes = Math.ceil(clientKeyLength / 8);
    const clientRSACipher = (await crypto_default.generateKey({
      name: "RSA-PKCS1-v1_5",
      modulusLength: clientKeyLength,
      publicExponent: new Uint8Array([1, 0, 1])
    }, true, ["encrypt"])).privateKey;
    const clientExportedRSAKey = await crypto_default.exportKey("raw", clientRSACipher);
    const clientN = clientExportedRSAKey.n;
    const clientE = clientExportedRSAKey.e;
    const clientPublicKey = new Uint8Array(4 + clientKeyBytes * 2);
    clientPublicKey[0] = (clientKeyLength & 4278190080) >>> 24;
    clientPublicKey[1] = (clientKeyLength & 16711680) >>> 16;
    clientPublicKey[2] = (clientKeyLength & 65280) >>> 8;
    clientPublicKey[3] = clientKeyLength & 255;
    clientPublicKey.set(clientN, 4);
    clientPublicKey.set(clientE, 4 + clientKeyBytes);
    this._sock.sQpushBytes(clientPublicKey);
    this._sock.flush();
    const clientRandom = new Uint8Array(16);
    window.crypto.getRandomValues(clientRandom);
    const clientEncryptedRandom = await crypto_default.encrypt(
      { name: "RSA-PKCS1-v1_5" },
      serverRSACipher,
      clientRandom
    );
    const clientRandomMessage = new Uint8Array(2 + serverKeyBytes);
    clientRandomMessage[0] = (serverKeyBytes & 65280) >>> 8;
    clientRandomMessage[1] = serverKeyBytes & 255;
    clientRandomMessage.set(clientEncryptedRandom, 2);
    this._sock.sQpushBytes(clientRandomMessage);
    this._sock.flush();
    await this._waitSockAsync(2);
    if (this._sock.rQshift16() !== clientKeyBytes) {
      throw new Error("RA2: wrong encrypted message length");
    }
    const serverEncryptedRandom = this._sock.rQshiftBytes(clientKeyBytes);
    const serverRandom = await crypto_default.decrypt(
      { name: "RSA-PKCS1-v1_5" },
      clientRSACipher,
      serverEncryptedRandom
    );
    if (serverRandom === null || serverRandom.length !== 16) {
      throw new Error("RA2: corrupted server encrypted random");
    }
    let clientSessionKey = new Uint8Array(32);
    let serverSessionKey = new Uint8Array(32);
    clientSessionKey.set(serverRandom);
    clientSessionKey.set(clientRandom, 16);
    serverSessionKey.set(clientRandom);
    serverSessionKey.set(serverRandom, 16);
    clientSessionKey = await window.crypto.subtle.digest("SHA-1", clientSessionKey);
    clientSessionKey = new Uint8Array(clientSessionKey).slice(0, 16);
    serverSessionKey = await window.crypto.subtle.digest("SHA-1", serverSessionKey);
    serverSessionKey = new Uint8Array(serverSessionKey).slice(0, 16);
    const clientCipher = new RA2Cipher();
    await clientCipher.setKey(clientSessionKey);
    const serverCipher = new RA2Cipher();
    await serverCipher.setKey(serverSessionKey);
    let serverHash = new Uint8Array(8 + serverKeyBytes * 2 + clientKeyBytes * 2);
    let clientHash = new Uint8Array(8 + serverKeyBytes * 2 + clientKeyBytes * 2);
    serverHash.set(serverPublickey);
    serverHash.set(clientPublicKey, 4 + serverKeyBytes * 2);
    clientHash.set(clientPublicKey);
    clientHash.set(serverPublickey, 4 + clientKeyBytes * 2);
    serverHash = await window.crypto.subtle.digest("SHA-1", serverHash);
    clientHash = await window.crypto.subtle.digest("SHA-1", clientHash);
    serverHash = new Uint8Array(serverHash);
    clientHash = new Uint8Array(clientHash);
    this._sock.sQpushBytes(await clientCipher.makeMessage(clientHash));
    this._sock.flush();
    await this._waitSockAsync(2 + 20 + 16);
    if (this._sock.rQshift16() !== 20) {
      throw new Error("RA2: wrong server hash");
    }
    const serverHashReceived = await serverCipher.receiveMessage(
      20,
      this._sock.rQshiftBytes(20 + 16)
    );
    if (serverHashReceived === null) {
      throw new Error("RA2: failed to authenticate the message");
    }
    for (let i = 0; i < 20; i++) {
      if (serverHashReceived[i] !== serverHash[i]) {
        throw new Error("RA2: wrong server hash");
      }
    }
    await this._waitSockAsync(2 + 1 + 16);
    if (this._sock.rQshift16() !== 1) {
      throw new Error("RA2: wrong subtype");
    }
    let subtype = await serverCipher.receiveMessage(
      1,
      this._sock.rQshiftBytes(1 + 16)
    );
    if (subtype === null) {
      throw new Error("RA2: failed to authenticate the message");
    }
    subtype = subtype[0];
    let waitCredentials = this._waitCredentialsAsync(subtype);
    if (subtype === 1) {
      if (this._getCredentials().username === void 0 || this._getCredentials().password === void 0) {
        this.dispatchEvent(new CustomEvent(
          "credentialsrequired",
          { detail: { types: ["username", "password"] } }
        ));
      }
    } else if (subtype === 2) {
      if (this._getCredentials().password === void 0) {
        this.dispatchEvent(new CustomEvent(
          "credentialsrequired",
          { detail: { types: ["password"] } }
        ));
      }
    } else {
      throw new Error("RA2: wrong subtype");
    }
    await waitCredentials;
    let username;
    if (subtype === 1) {
      username = encodeUTF8(this._getCredentials().username).slice(0, 255);
    } else {
      username = "";
    }
    const password = encodeUTF8(this._getCredentials().password).slice(0, 255);
    const credentials = new Uint8Array(username.length + password.length + 2);
    credentials[0] = username.length;
    credentials[username.length + 1] = password.length;
    for (let i = 0; i < username.length; i++) {
      credentials[i + 1] = username.charCodeAt(i);
    }
    for (let i = 0; i < password.length; i++) {
      credentials[username.length + 2 + i] = password.charCodeAt(i);
    }
    this._sock.sQpushBytes(await clientCipher.makeMessage(credentials));
    this._sock.flush();
  }
  get hasStarted() {
    return this._hasStarted;
  }
  set hasStarted(s15) {
    this._hasStarted = s15;
  }
};

// node_modules/@novnc/novnc/core/decoders/raw.js
var RawDecoder = class {
  constructor() {
    this._lines = 0;
  }
  decodeRect(x, y, width, height, sock, display, depth) {
    if (width === 0 || height === 0) {
      return true;
    }
    if (this._lines === 0) {
      this._lines = height;
    }
    const pixelSize = depth == 8 ? 1 : 4;
    const bytesPerLine = width * pixelSize;
    while (this._lines > 0) {
      if (sock.rQwait("RAW", bytesPerLine)) {
        return false;
      }
      const curY = y + (height - this._lines);
      let data = sock.rQshiftBytes(bytesPerLine, false);
      if (depth == 8) {
        const newdata = new Uint8Array(width * 4);
        for (let i = 0; i < width; i++) {
          newdata[i * 4 + 0] = (data[i] >> 0 & 3) * 255 / 3;
          newdata[i * 4 + 1] = (data[i] >> 2 & 3) * 255 / 3;
          newdata[i * 4 + 2] = (data[i] >> 4 & 3) * 255 / 3;
          newdata[i * 4 + 3] = 255;
        }
        data = newdata;
      }
      for (let i = 0; i < width; i++) {
        data[i * 4 + 3] = 255;
      }
      display.blitImage(x, curY, width, 1, data, 0);
      this._lines--;
    }
    return true;
  }
};

// node_modules/@novnc/novnc/core/decoders/copyrect.js
var CopyRectDecoder = class {
  decodeRect(x, y, width, height, sock, display, depth) {
    if (sock.rQwait("COPYRECT", 4)) {
      return false;
    }
    let deltaX = sock.rQshift16();
    let deltaY = sock.rQshift16();
    if (width === 0 || height === 0) {
      return true;
    }
    display.copyImage(deltaX, deltaY, x, y, width, height);
    return true;
  }
};

// node_modules/@novnc/novnc/core/decoders/rre.js
var RREDecoder = class {
  constructor() {
    this._subrects = 0;
  }
  decodeRect(x, y, width, height, sock, display, depth) {
    if (this._subrects === 0) {
      if (sock.rQwait("RRE", 4 + 4)) {
        return false;
      }
      this._subrects = sock.rQshift32();
      let color = sock.rQshiftBytes(4);
      display.fillRect(x, y, width, height, color);
    }
    while (this._subrects > 0) {
      if (sock.rQwait("RRE", 4 + 8)) {
        return false;
      }
      let color = sock.rQshiftBytes(4);
      let sx = sock.rQshift16();
      let sy = sock.rQshift16();
      let swidth = sock.rQshift16();
      let sheight = sock.rQshift16();
      display.fillRect(x + sx, y + sy, swidth, sheight, color);
      this._subrects--;
    }
    return true;
  }
};

// node_modules/@novnc/novnc/core/decoders/hextile.js
var HextileDecoder = class {
  constructor() {
    this._tiles = 0;
    this._lastsubencoding = 0;
    this._tileBuffer = new Uint8Array(16 * 16 * 4);
  }
  decodeRect(x, y, width, height, sock, display, depth) {
    if (this._tiles === 0) {
      this._tilesX = Math.ceil(width / 16);
      this._tilesY = Math.ceil(height / 16);
      this._totalTiles = this._tilesX * this._tilesY;
      this._tiles = this._totalTiles;
    }
    while (this._tiles > 0) {
      let bytes = 1;
      if (sock.rQwait("HEXTILE", bytes)) {
        return false;
      }
      let subencoding = sock.rQpeek8();
      if (subencoding > 30) {
        throw new Error("Illegal hextile subencoding (subencoding: " + subencoding + ")");
      }
      const currTile = this._totalTiles - this._tiles;
      const tileX = currTile % this._tilesX;
      const tileY = Math.floor(currTile / this._tilesX);
      const tx = x + tileX * 16;
      const ty = y + tileY * 16;
      const tw = Math.min(16, x + width - tx);
      const th = Math.min(16, y + height - ty);
      if (subencoding & 1) {
        bytes += tw * th * 4;
      } else {
        if (subencoding & 2) {
          bytes += 4;
        }
        if (subencoding & 4) {
          bytes += 4;
        }
        if (subencoding & 8) {
          bytes++;
          if (sock.rQwait("HEXTILE", bytes)) {
            return false;
          }
          let subrects = sock.rQpeekBytes(bytes).at(-1);
          if (subencoding & 16) {
            bytes += subrects * (4 + 2);
          } else {
            bytes += subrects * 2;
          }
        }
      }
      if (sock.rQwait("HEXTILE", bytes)) {
        return false;
      }
      sock.rQshift8();
      if (subencoding === 0) {
        if (this._lastsubencoding & 1) {
          Debug("     Ignoring blank after RAW");
        } else {
          display.fillRect(tx, ty, tw, th, this._background);
        }
      } else if (subencoding & 1) {
        let pixels = tw * th;
        let data = sock.rQshiftBytes(pixels * 4, false);
        for (let i = 0; i < pixels; i++) {
          data[i * 4 + 3] = 255;
        }
        display.blitImage(tx, ty, tw, th, data, 0);
      } else {
        if (subencoding & 2) {
          this._background = new Uint8Array(sock.rQshiftBytes(4));
        }
        if (subencoding & 4) {
          this._foreground = new Uint8Array(sock.rQshiftBytes(4));
        }
        this._startTile(tx, ty, tw, th, this._background);
        if (subencoding & 8) {
          let subrects = sock.rQshift8();
          for (let s15 = 0; s15 < subrects; s15++) {
            let color;
            if (subencoding & 16) {
              color = sock.rQshiftBytes(4);
            } else {
              color = this._foreground;
            }
            const xy = sock.rQshift8();
            const sx = xy >> 4;
            const sy = xy & 15;
            const wh = sock.rQshift8();
            const sw = (wh >> 4) + 1;
            const sh = (wh & 15) + 1;
            this._subTile(sx, sy, sw, sh, color);
          }
        }
        this._finishTile(display);
      }
      this._lastsubencoding = subencoding;
      this._tiles--;
    }
    return true;
  }
  // start updating a tile
  _startTile(x, y, width, height, color) {
    this._tileX = x;
    this._tileY = y;
    this._tileW = width;
    this._tileH = height;
    const red = color[0];
    const green = color[1];
    const blue = color[2];
    const data = this._tileBuffer;
    for (let i = 0; i < width * height * 4; i += 4) {
      data[i] = red;
      data[i + 1] = green;
      data[i + 2] = blue;
      data[i + 3] = 255;
    }
  }
  // update sub-rectangle of the current tile
  _subTile(x, y, w, h2, color) {
    const red = color[0];
    const green = color[1];
    const blue = color[2];
    const xend = x + w;
    const yend = y + h2;
    const data = this._tileBuffer;
    const width = this._tileW;
    for (let j2 = y; j2 < yend; j2++) {
      for (let i = x; i < xend; i++) {
        const p = (i + j2 * width) * 4;
        data[p] = red;
        data[p + 1] = green;
        data[p + 2] = blue;
        data[p + 3] = 255;
      }
    }
  }
  // draw the current tile to the screen
  _finishTile(display) {
    display.blitImage(
      this._tileX,
      this._tileY,
      this._tileW,
      this._tileH,
      this._tileBuffer,
      0
    );
  }
};

// node_modules/@novnc/novnc/core/decoders/zlib.js
var ZlibDecoder = class {
  constructor() {
    this._zlib = new Inflate();
    this._length = 0;
  }
  decodeRect(x, y, width, height, sock, display, depth) {
    if (width === 0 || height === 0) {
      return true;
    }
    if (this._length === 0) {
      if (sock.rQwait("ZLIB", 4)) {
        return false;
      }
      this._length = sock.rQshift32();
    }
    if (sock.rQwait("ZLIB", this._length)) {
      return false;
    }
    let data = new Uint8Array(sock.rQshiftBytes(this._length, false));
    this._length = 0;
    this._zlib.setInput(data);
    data = this._zlib.inflate(width * height * 4);
    this._zlib.setInput(null);
    for (let i = 0; i < width * height; i++) {
      data[i * 4 + 3] = 255;
    }
    display.blitImage(x, y, width, height, data, 0);
    return true;
  }
};

// node_modules/@novnc/novnc/core/decoders/tight.js
var TightDecoder = class {
  constructor() {
    this._ctl = null;
    this._filter = null;
    this._numColors = 0;
    this._palette = new Uint8Array(1024);
    this._len = 0;
    this._zlibs = [];
    for (let i = 0; i < 4; i++) {
      this._zlibs[i] = new Inflate();
    }
  }
  decodeRect(x, y, width, height, sock, display, depth) {
    if (this._ctl === null) {
      if (sock.rQwait("TIGHT compression-control", 1)) {
        return false;
      }
      this._ctl = sock.rQshift8();
      for (let i = 0; i < 4; i++) {
        if (this._ctl >> i & 1) {
          this._zlibs[i].reset();
          Info("Reset zlib stream " + i);
        }
      }
      this._ctl = this._ctl >> 4;
    }
    let ret;
    if (this._ctl === 8) {
      ret = this._fillRect(
        x,
        y,
        width,
        height,
        sock,
        display,
        depth
      );
    } else if (this._ctl === 9) {
      ret = this._jpegRect(
        x,
        y,
        width,
        height,
        sock,
        display,
        depth
      );
    } else if (this._ctl === 10) {
      ret = this._pngRect(
        x,
        y,
        width,
        height,
        sock,
        display,
        depth
      );
    } else if ((this._ctl & 8) == 0) {
      ret = this._basicRect(
        this._ctl,
        x,
        y,
        width,
        height,
        sock,
        display,
        depth
      );
    } else {
      throw new Error("Illegal tight compression received (ctl: " + this._ctl + ")");
    }
    if (ret) {
      this._ctl = null;
    }
    return ret;
  }
  _fillRect(x, y, width, height, sock, display, depth) {
    if (sock.rQwait("TIGHT", 3)) {
      return false;
    }
    let pixel = sock.rQshiftBytes(3);
    display.fillRect(x, y, width, height, pixel, false);
    return true;
  }
  _jpegRect(x, y, width, height, sock, display, depth) {
    let data = this._readData(sock);
    if (data === null) {
      return false;
    }
    display.imageRect(x, y, width, height, "image/jpeg", data);
    return true;
  }
  _pngRect(x, y, width, height, sock, display, depth) {
    throw new Error("PNG received in standard Tight rect");
  }
  _basicRect(ctl, x, y, width, height, sock, display, depth) {
    if (this._filter === null) {
      if (ctl & 4) {
        if (sock.rQwait("TIGHT", 1)) {
          return false;
        }
        this._filter = sock.rQshift8();
      } else {
        this._filter = 0;
      }
    }
    let streamId = ctl & 3;
    let ret;
    switch (this._filter) {
      case 0:
        ret = this._copyFilter(
          streamId,
          x,
          y,
          width,
          height,
          sock,
          display,
          depth
        );
        break;
      case 1:
        ret = this._paletteFilter(
          streamId,
          x,
          y,
          width,
          height,
          sock,
          display,
          depth
        );
        break;
      case 2:
        ret = this._gradientFilter(
          streamId,
          x,
          y,
          width,
          height,
          sock,
          display,
          depth
        );
        break;
      default:
        throw new Error("Illegal tight filter received (ctl: " + this._filter + ")");
    }
    if (ret) {
      this._filter = null;
    }
    return ret;
  }
  _copyFilter(streamId, x, y, width, height, sock, display, depth) {
    const uncompressedSize = width * height * 3;
    let data;
    if (uncompressedSize === 0) {
      return true;
    }
    if (uncompressedSize < 12) {
      if (sock.rQwait("TIGHT", uncompressedSize)) {
        return false;
      }
      data = sock.rQshiftBytes(uncompressedSize);
    } else {
      data = this._readData(sock);
      if (data === null) {
        return false;
      }
      this._zlibs[streamId].setInput(data);
      data = this._zlibs[streamId].inflate(uncompressedSize);
      this._zlibs[streamId].setInput(null);
    }
    let rgbx = new Uint8Array(width * height * 4);
    for (let i = 0, j2 = 0; i < width * height * 4; i += 4, j2 += 3) {
      rgbx[i] = data[j2];
      rgbx[i + 1] = data[j2 + 1];
      rgbx[i + 2] = data[j2 + 2];
      rgbx[i + 3] = 255;
    }
    display.blitImage(x, y, width, height, rgbx, 0, false);
    return true;
  }
  _paletteFilter(streamId, x, y, width, height, sock, display, depth) {
    if (this._numColors === 0) {
      if (sock.rQwait("TIGHT palette", 1)) {
        return false;
      }
      const numColors = sock.rQpeek8() + 1;
      const paletteSize = numColors * 3;
      if (sock.rQwait("TIGHT palette", 1 + paletteSize)) {
        return false;
      }
      this._numColors = numColors;
      sock.rQskipBytes(1);
      sock.rQshiftTo(this._palette, paletteSize);
    }
    const bpp = this._numColors <= 2 ? 1 : 8;
    const rowSize = Math.floor((width * bpp + 7) / 8);
    const uncompressedSize = rowSize * height;
    let data;
    if (uncompressedSize === 0) {
      return true;
    }
    if (uncompressedSize < 12) {
      if (sock.rQwait("TIGHT", uncompressedSize)) {
        return false;
      }
      data = sock.rQshiftBytes(uncompressedSize);
    } else {
      data = this._readData(sock);
      if (data === null) {
        return false;
      }
      this._zlibs[streamId].setInput(data);
      data = this._zlibs[streamId].inflate(uncompressedSize);
      this._zlibs[streamId].setInput(null);
    }
    if (this._numColors == 2) {
      this._monoRect(x, y, width, height, data, this._palette, display);
    } else {
      this._paletteRect(x, y, width, height, data, this._palette, display);
    }
    this._numColors = 0;
    return true;
  }
  _monoRect(x, y, width, height, data, palette, display) {
    const dest = this._getScratchBuffer(width * height * 4);
    const w = Math.floor((width + 7) / 8);
    const w1 = Math.floor(width / 8);
    for (let y2 = 0; y2 < height; y2++) {
      let dp, sp, x2;
      for (x2 = 0; x2 < w1; x2++) {
        for (let b3 = 7; b3 >= 0; b3--) {
          dp = (y2 * width + x2 * 8 + 7 - b3) * 4;
          sp = (data[y2 * w + x2] >> b3 & 1) * 3;
          dest[dp] = palette[sp];
          dest[dp + 1] = palette[sp + 1];
          dest[dp + 2] = palette[sp + 2];
          dest[dp + 3] = 255;
        }
      }
      for (let b3 = 7; b3 >= 8 - width % 8; b3--) {
        dp = (y2 * width + x2 * 8 + 7 - b3) * 4;
        sp = (data[y2 * w + x2] >> b3 & 1) * 3;
        dest[dp] = palette[sp];
        dest[dp + 1] = palette[sp + 1];
        dest[dp + 2] = palette[sp + 2];
        dest[dp + 3] = 255;
      }
    }
    display.blitImage(x, y, width, height, dest, 0, false);
  }
  _paletteRect(x, y, width, height, data, palette, display) {
    const dest = this._getScratchBuffer(width * height * 4);
    const total = width * height * 4;
    for (let i = 0, j2 = 0; i < total; i += 4, j2++) {
      const sp = data[j2] * 3;
      dest[i] = palette[sp];
      dest[i + 1] = palette[sp + 1];
      dest[i + 2] = palette[sp + 2];
      dest[i + 3] = 255;
    }
    display.blitImage(x, y, width, height, dest, 0, false);
  }
  _gradientFilter(streamId, x, y, width, height, sock, display, depth) {
    const uncompressedSize = width * height * 3;
    let data;
    if (uncompressedSize === 0) {
      return true;
    }
    if (uncompressedSize < 12) {
      if (sock.rQwait("TIGHT", uncompressedSize)) {
        return false;
      }
      data = sock.rQshiftBytes(uncompressedSize);
    } else {
      data = this._readData(sock);
      if (data === null) {
        return false;
      }
      this._zlibs[streamId].setInput(data);
      data = this._zlibs[streamId].inflate(uncompressedSize);
      this._zlibs[streamId].setInput(null);
    }
    let rgbx = new Uint8Array(4 * width * height);
    let rgbxIndex = 0, dataIndex = 0;
    let left = new Uint8Array(3);
    for (let x2 = 0; x2 < width; x2++) {
      for (let c2 = 0; c2 < 3; c2++) {
        const prediction = left[c2];
        const value = data[dataIndex++] + prediction;
        rgbx[rgbxIndex++] = value;
        left[c2] = value;
      }
      rgbx[rgbxIndex++] = 255;
    }
    let upperIndex = 0;
    let upper = new Uint8Array(3), upperleft = new Uint8Array(3);
    for (let y2 = 1; y2 < height; y2++) {
      left.fill(0);
      upperleft.fill(0);
      for (let x2 = 0; x2 < width; x2++) {
        for (let c2 = 0; c2 < 3; c2++) {
          upper[c2] = rgbx[upperIndex++];
          let prediction = left[c2] + upper[c2] - upperleft[c2];
          if (prediction < 0) {
            prediction = 0;
          } else if (prediction > 255) {
            prediction = 255;
          }
          const value = data[dataIndex++] + prediction;
          rgbx[rgbxIndex++] = value;
          upperleft[c2] = upper[c2];
          left[c2] = value;
        }
        rgbx[rgbxIndex++] = 255;
        upperIndex++;
      }
    }
    display.blitImage(x, y, width, height, rgbx, 0, false);
    return true;
  }
  _readData(sock) {
    if (this._len === 0) {
      if (sock.rQwait("TIGHT", 3)) {
        return null;
      }
      let byte;
      byte = sock.rQshift8();
      this._len = byte & 127;
      if (byte & 128) {
        byte = sock.rQshift8();
        this._len |= (byte & 127) << 7;
        if (byte & 128) {
          byte = sock.rQshift8();
          this._len |= byte << 14;
        }
      }
    }
    if (sock.rQwait("TIGHT", this._len)) {
      return null;
    }
    let data = sock.rQshiftBytes(this._len, false);
    this._len = 0;
    return data;
  }
  _getScratchBuffer(size) {
    if (!this._scratchBuffer || this._scratchBuffer.length < size) {
      this._scratchBuffer = new Uint8Array(size);
    }
    return this._scratchBuffer;
  }
};

// node_modules/@novnc/novnc/core/decoders/tightpng.js
var TightPNGDecoder = class extends TightDecoder {
  _pngRect(x, y, width, height, sock, display, depth) {
    let data = this._readData(sock);
    if (data === null) {
      return false;
    }
    display.imageRect(x, y, width, height, "image/png", data);
    return true;
  }
  _basicRect(ctl, x, y, width, height, sock, display, depth) {
    throw new Error("BasicCompression received in TightPNG rect");
  }
};

// node_modules/@novnc/novnc/core/decoders/zrle.js
var ZRLE_TILE_WIDTH = 64;
var ZRLE_TILE_HEIGHT = 64;
var ZRLEDecoder = class {
  constructor() {
    this._length = 0;
    this._inflator = new Inflate();
    this._pixelBuffer = new Uint8Array(ZRLE_TILE_WIDTH * ZRLE_TILE_HEIGHT * 4);
    this._tileBuffer = new Uint8Array(ZRLE_TILE_WIDTH * ZRLE_TILE_HEIGHT * 4);
  }
  decodeRect(x, y, width, height, sock, display, depth) {
    if (this._length === 0) {
      if (sock.rQwait("ZLib data length", 4)) {
        return false;
      }
      this._length = sock.rQshift32();
    }
    if (sock.rQwait("Zlib data", this._length)) {
      return false;
    }
    const data = sock.rQshiftBytes(this._length, false);
    this._inflator.setInput(data);
    for (let ty = y; ty < y + height; ty += ZRLE_TILE_HEIGHT) {
      let th = Math.min(ZRLE_TILE_HEIGHT, y + height - ty);
      for (let tx = x; tx < x + width; tx += ZRLE_TILE_WIDTH) {
        let tw = Math.min(ZRLE_TILE_WIDTH, x + width - tx);
        const tileSize = tw * th;
        const subencoding = this._inflator.inflate(1)[0];
        if (subencoding === 0) {
          const data2 = this._readPixels(tileSize);
          display.blitImage(tx, ty, tw, th, data2, 0, false);
        } else if (subencoding === 1) {
          const background = this._readPixels(1);
          display.fillRect(tx, ty, tw, th, [background[0], background[1], background[2]]);
        } else if (subencoding >= 2 && subencoding <= 16) {
          const data2 = this._decodePaletteTile(subencoding, tileSize, tw, th);
          display.blitImage(tx, ty, tw, th, data2, 0, false);
        } else if (subencoding === 128) {
          const data2 = this._decodeRLETile(tileSize);
          display.blitImage(tx, ty, tw, th, data2, 0, false);
        } else if (subencoding >= 130 && subencoding <= 255) {
          const data2 = this._decodeRLEPaletteTile(subencoding - 128, tileSize);
          display.blitImage(tx, ty, tw, th, data2, 0, false);
        } else {
          throw new Error("Unknown subencoding: " + subencoding);
        }
      }
    }
    this._length = 0;
    return true;
  }
  _getBitsPerPixelInPalette(paletteSize) {
    if (paletteSize <= 2) {
      return 1;
    } else if (paletteSize <= 4) {
      return 2;
    } else if (paletteSize <= 16) {
      return 4;
    }
  }
  _readPixels(pixels) {
    let data = this._pixelBuffer;
    const buffer = this._inflator.inflate(3 * pixels);
    for (let i = 0, j2 = 0; i < pixels * 4; i += 4, j2 += 3) {
      data[i] = buffer[j2];
      data[i + 1] = buffer[j2 + 1];
      data[i + 2] = buffer[j2 + 2];
      data[i + 3] = 255;
    }
    return data;
  }
  _decodePaletteTile(paletteSize, tileSize, tilew, tileh) {
    const data = this._tileBuffer;
    const palette = this._readPixels(paletteSize);
    const bitsPerPixel = this._getBitsPerPixelInPalette(paletteSize);
    const mask = (1 << bitsPerPixel) - 1;
    let offset = 0;
    let encoded = this._inflator.inflate(1)[0];
    for (let y = 0; y < tileh; y++) {
      let shift = 8 - bitsPerPixel;
      for (let x = 0; x < tilew; x++) {
        if (shift < 0) {
          shift = 8 - bitsPerPixel;
          encoded = this._inflator.inflate(1)[0];
        }
        let indexInPalette = encoded >> shift & mask;
        data[offset] = palette[indexInPalette * 4];
        data[offset + 1] = palette[indexInPalette * 4 + 1];
        data[offset + 2] = palette[indexInPalette * 4 + 2];
        data[offset + 3] = palette[indexInPalette * 4 + 3];
        offset += 4;
        shift -= bitsPerPixel;
      }
      if (shift < 8 - bitsPerPixel && y < tileh - 1) {
        encoded = this._inflator.inflate(1)[0];
      }
    }
    return data;
  }
  _decodeRLETile(tileSize) {
    const data = this._tileBuffer;
    let i = 0;
    while (i < tileSize) {
      const pixel = this._readPixels(1);
      const length = this._readRLELength();
      for (let j2 = 0; j2 < length; j2++) {
        data[i * 4] = pixel[0];
        data[i * 4 + 1] = pixel[1];
        data[i * 4 + 2] = pixel[2];
        data[i * 4 + 3] = pixel[3];
        i++;
      }
    }
    return data;
  }
  _decodeRLEPaletteTile(paletteSize, tileSize) {
    const data = this._tileBuffer;
    const palette = this._readPixels(paletteSize);
    let offset = 0;
    while (offset < tileSize) {
      let indexInPalette = this._inflator.inflate(1)[0];
      let length = 1;
      if (indexInPalette >= 128) {
        indexInPalette -= 128;
        length = this._readRLELength();
      }
      if (indexInPalette > paletteSize) {
        throw new Error("Too big index in palette: " + indexInPalette + ", palette size: " + paletteSize);
      }
      if (offset + length > tileSize) {
        throw new Error("Too big rle length in palette mode: " + length + ", allowed length is: " + (tileSize - offset));
      }
      for (let j2 = 0; j2 < length; j2++) {
        data[offset * 4] = palette[indexInPalette * 4];
        data[offset * 4 + 1] = palette[indexInPalette * 4 + 1];
        data[offset * 4 + 2] = palette[indexInPalette * 4 + 2];
        data[offset * 4 + 3] = palette[indexInPalette * 4 + 3];
        offset++;
      }
    }
    return data;
  }
  _readRLELength() {
    let length = 0;
    let current = 0;
    do {
      current = this._inflator.inflate(1)[0];
      length += current;
    } while (current === 255);
    return length + 1;
  }
};

// node_modules/@novnc/novnc/core/decoders/jpeg.js
var JPEGDecoder = class {
  constructor() {
    this._cachedQuantTables = [];
    this._cachedHuffmanTables = [];
    this._segments = [];
  }
  decodeRect(x, y, width, height, sock, display, depth) {
    while (true) {
      let segment = this._readSegment(sock);
      if (segment === null) {
        return false;
      }
      this._segments.push(segment);
      if (segment[1] === 217) {
        break;
      }
    }
    let huffmanTables = [];
    let quantTables = [];
    for (let segment of this._segments) {
      let type = segment[1];
      if (type === 196) {
        huffmanTables.push(segment);
      } else if (type === 219) {
        quantTables.push(segment);
      }
    }
    const sofIndex = this._segments.findIndex(
      (x2) => x2[1] == 192 || x2[1] == 194
    );
    if (sofIndex == -1) {
      throw new Error("Illegal JPEG image without SOF");
    }
    if (quantTables.length === 0) {
      this._segments.splice(
        sofIndex + 1,
        0,
        ...this._cachedQuantTables
      );
    }
    if (huffmanTables.length === 0) {
      this._segments.splice(
        sofIndex + 1,
        0,
        ...this._cachedHuffmanTables
      );
    }
    let length = 0;
    for (let segment of this._segments) {
      length += segment.length;
    }
    let data = new Uint8Array(length);
    length = 0;
    for (let segment of this._segments) {
      data.set(segment, length);
      length += segment.length;
    }
    display.imageRect(x, y, width, height, "image/jpeg", data);
    if (huffmanTables.length !== 0) {
      this._cachedHuffmanTables = huffmanTables;
    }
    if (quantTables.length !== 0) {
      this._cachedQuantTables = quantTables;
    }
    this._segments = [];
    return true;
  }
  _readSegment(sock) {
    if (sock.rQwait("JPEG", 2)) {
      return null;
    }
    let marker = sock.rQshift8();
    if (marker != 255) {
      throw new Error("Illegal JPEG marker received (byte: " + marker + ")");
    }
    let type = sock.rQshift8();
    if (type >= 208 && type <= 217 || type == 1) {
      return new Uint8Array([marker, type]);
    }
    if (sock.rQwait("JPEG", 2, 2)) {
      return null;
    }
    let length = sock.rQshift16();
    if (length < 2) {
      throw new Error("Illegal JPEG length received (length: " + length + ")");
    }
    if (sock.rQwait("JPEG", length - 2, 4)) {
      return null;
    }
    let extra = 0;
    if (type === 218) {
      if (sock.rQwait("JPEG", length - 2 + 2, 4)) {
        return null;
      }
      let len = sock.rQlen();
      let data = sock.rQpeekBytes(len, false);
      while (true) {
        let idx = data.indexOf(255, length - 2 + extra);
        if (idx === -1) {
          sock.rQwait("JPEG", Infinity, 4);
          return null;
        }
        if (idx === len - 1) {
          sock.rQwait("JPEG", Infinity, 4);
          return null;
        }
        if (data.at(idx + 1) === 0 || data.at(idx + 1) >= 208 && data.at(idx + 1) <= 215) {
          extra = idx + 2 - (length - 2);
          continue;
        }
        extra = idx - (length - 2);
        break;
      }
    }
    let segment = new Uint8Array(2 + length + extra);
    segment[0] = marker;
    segment[1] = type;
    segment[2] = length >> 8;
    segment[3] = length;
    segment.set(sock.rQshiftBytes(length - 2 + extra, false), 4);
    return segment;
  }
};

// node_modules/@novnc/novnc/core/decoders/h264.js
var H264Parser = class {
  constructor(data) {
    this._data = data;
    this._index = 0;
    this.profileIdc = null;
    this.constraintSet = null;
    this.levelIdc = null;
  }
  _getStartSequenceLen(index) {
    let data = this._data;
    if (data[index + 0] == 0 && data[index + 1] == 0 && data[index + 2] == 0 && data[index + 3] == 1) {
      return 4;
    }
    if (data[index + 0] == 0 && data[index + 1] == 0 && data[index + 2] == 1) {
      return 3;
    }
    return 0;
  }
  _indexOfNextNalUnit(index) {
    let data = this._data;
    for (let i = index; i < data.length; ++i) {
      if (this._getStartSequenceLen(i) != 0) {
        return i;
      }
    }
    return -1;
  }
  _parseSps(index) {
    this.profileIdc = this._data[index];
    this.constraintSet = this._data[index + 1];
    this.levelIdc = this._data[index + 2];
  }
  _parseNalUnit(index) {
    const firstByte = this._data[index];
    if (firstByte & 128) {
      throw new Error("H264 parsing sanity check failed, forbidden zero bit is set");
    }
    const unitType = firstByte & 31;
    switch (unitType) {
      case 1:
        return { slice: true };
      case 5:
        return { slice: true, key: true };
      case 6:
        return {};
      case 7:
        this._parseSps(index + 1);
        return {};
      case 8:
        return {};
      default:
        Warn("Unhandled unit type: ", unitType);
        break;
    }
    return {};
  }
  parse() {
    const startIndex = this._index;
    let isKey = false;
    while (this._index < this._data.length) {
      const startSequenceLen = this._getStartSequenceLen(this._index);
      if (startSequenceLen == 0) {
        throw new Error("Invalid start sequence in bit stream");
      }
      const { slice, key } = this._parseNalUnit(this._index + startSequenceLen);
      let nextIndex = this._indexOfNextNalUnit(this._index + startSequenceLen);
      if (nextIndex == -1) {
        this._index = this._data.length;
      } else {
        this._index = nextIndex;
      }
      if (key) {
        isKey = true;
      }
      if (slice) {
        break;
      }
    }
    if (startIndex === this._index) {
      return null;
    }
    return {
      frame: this._data.subarray(startIndex, this._index),
      key: isKey
    };
  }
};
var H264Context = class {
  constructor(width, height) {
    this.lastUsed = 0;
    this._width = width;
    this._height = height;
    this._profileIdc = null;
    this._constraintSet = null;
    this._levelIdc = null;
    this._decoder = null;
    this._pendingFrames = [];
  }
  _handleFrame(frame) {
    let pending = this._pendingFrames.shift();
    if (pending === void 0) {
      throw new Error("Pending frame queue empty when receiving frame from decoder");
    }
    if (pending.timestamp != frame.timestamp) {
      throw new Error("Video frame timestamp mismatch. Expected " + frame.timestamp + " but but got " + pending.timestamp);
    }
    pending.frame = frame;
    pending.ready = true;
    pending.resolve();
    if (!pending.keep) {
      frame.close();
    }
  }
  _handleError(e2) {
    throw new Error("Failed to decode frame: " + e2.message);
  }
  _configureDecoder(profileIdc, constraintSet, levelIdc) {
    if (this._decoder === null || this._decoder.state === "closed") {
      this._decoder = new VideoDecoder({
        output: (frame) => this._handleFrame(frame),
        error: (e2) => this._handleError(e2)
      });
    }
    const codec = "avc1." + profileIdc.toString(16).padStart(2, "0") + constraintSet.toString(16).padStart(2, "0") + levelIdc.toString(16).padStart(2, "0");
    this._decoder.configure({
      codec,
      codedWidth: this._width,
      codedHeight: this._height,
      optimizeForLatency: true
    });
  }
  _preparePendingFrame(timestamp) {
    let pending = {
      timestamp,
      promise: null,
      resolve: null,
      frame: null,
      ready: false,
      keep: false
    };
    pending.promise = new Promise((resolve) => {
      pending.resolve = resolve;
    });
    this._pendingFrames.push(pending);
    return pending;
  }
  decode(payload) {
    let parser = new H264Parser(payload);
    let result = null;
    let timestamp = Math.round(window.performance.now() * 1e3);
    while (true) {
      let encodedFrame = parser.parse();
      if (encodedFrame === null) {
        break;
      }
      if (parser.profileIdc !== null) {
        self._profileIdc = parser.profileIdc;
        self._constraintSet = parser.constraintSet;
        self._levelIdc = parser.levelIdc;
      }
      if (this._decoder === null || this._decoder.state !== "configured") {
        if (!encodedFrame.key) {
          Warn("Missing key frame. Can't decode until one arrives");
          continue;
        }
        if (self._profileIdc === null) {
          Warn("Cannot config decoder. Have not received SPS and PPS yet.");
          continue;
        }
        this._configureDecoder(
          self._profileIdc,
          self._constraintSet,
          self._levelIdc
        );
      }
      result = this._preparePendingFrame(timestamp);
      const chunk = new EncodedVideoChunk({
        timestamp,
        type: encodedFrame.key ? "key" : "delta",
        data: encodedFrame.frame
      });
      try {
        this._decoder.decode(chunk);
      } catch (e2) {
        Warn("Failed to decode:", e2);
      }
    }
    if (result !== null) {
      result.keep = true;
    }
    return result;
  }
};
var H264Decoder = class {
  constructor() {
    this._tick = 0;
    this._contexts = {};
  }
  _contextId(x, y, width, height) {
    return [x, y, width, height].join(",");
  }
  _findOldestContextId() {
    let oldestTick = Number.MAX_VALUE;
    let oldestKey = void 0;
    for (const [key, value] of Object.entries(this._contexts)) {
      if (value.lastUsed < oldestTick) {
        oldestTick = value.lastUsed;
        oldestKey = key;
      }
    }
    return oldestKey;
  }
  _createContext(x, y, width, height) {
    const maxContexts = 64;
    if (Object.keys(this._contexts).length >= maxContexts) {
      let oldestContextId = this._findOldestContextId();
      delete this._contexts[oldestContextId];
    }
    let context = new H264Context(width, height);
    this._contexts[this._contextId(x, y, width, height)] = context;
    return context;
  }
  _getContext(x, y, width, height) {
    let context = this._contexts[this._contextId(x, y, width, height)];
    return context !== void 0 ? context : this._createContext(x, y, width, height);
  }
  _resetContext(x, y, width, height) {
    delete this._contexts[this._contextId(x, y, width, height)];
  }
  _resetAllContexts() {
    this._contexts = {};
  }
  decodeRect(x, y, width, height, sock, display, depth) {
    const resetContextFlag = 1;
    const resetAllContextsFlag = 2;
    if (sock.rQwait("h264 header", 8)) {
      return false;
    }
    const length = sock.rQshift32();
    const flags = sock.rQshift32();
    if (sock.rQwait("h264 payload", length, 8)) {
      return false;
    }
    if (flags & resetAllContextsFlag) {
      this._resetAllContexts();
    } else if (flags & resetContextFlag) {
      this._resetContext(x, y, width, height);
    }
    let context = this._getContext(x, y, width, height);
    context.lastUsed = this._tick++;
    if (length !== 0) {
      let payload = sock.rQshiftBytes(length, false);
      let frame = context.decode(payload);
      if (frame !== null) {
        display.videoFrame(x, y, width, height, frame);
      }
    }
    return true;
  }
};

// node_modules/@novnc/novnc/core/rfb.js
var DISCONNECT_TIMEOUT = 3;
var DEFAULT_BACKGROUND = "rgb(40, 40, 40)";
var MOUSE_MOVE_DELAY = 17;
var WHEEL_STEP = 50;
var WHEEL_LINE_HEIGHT = 19;
var GESTURE_ZOOMSENS = 75;
var GESTURE_SCRLSENS = 50;
var DOUBLE_TAP_TIMEOUT = 1e3;
var DOUBLE_TAP_THRESHOLD = 50;
var securityTypeNone = 1;
var securityTypeVNCAuth = 2;
var securityTypeRA2ne = 6;
var securityTypeTight = 16;
var securityTypeVeNCrypt = 19;
var securityTypeXVP = 22;
var securityTypeARD = 30;
var securityTypeMSLogonII = 113;
var securityTypeUnixLogon = 129;
var securityTypePlain = 256;
var extendedClipboardFormatText = 1;
var extendedClipboardFormatRtf = 1 << 1;
var extendedClipboardFormatHtml = 1 << 2;
var extendedClipboardFormatDib = 1 << 3;
var extendedClipboardFormatFiles = 1 << 4;
var extendedClipboardActionCaps = 1 << 24;
var extendedClipboardActionRequest = 1 << 25;
var extendedClipboardActionPeek = 1 << 26;
var extendedClipboardActionNotify = 1 << 27;
var extendedClipboardActionProvide = 1 << 28;
var RFB = class _RFB extends EventTargetMixin {
  constructor(target, urlOrChannel, options) {
    if (!target) {
      throw new Error("Must specify target");
    }
    if (!urlOrChannel) {
      throw new Error("Must specify URL, WebSocket or RTCDataChannel");
    }
    if (!window.isSecureContext) {
      Error2("noVNC requires a secure context (TLS). Expect crashes!");
    }
    super();
    this._target = target;
    if (typeof urlOrChannel === "string") {
      this._url = urlOrChannel;
    } else {
      this._url = null;
      this._rawChannel = urlOrChannel;
    }
    options = options || {};
    this._rfbCredentials = options.credentials || {};
    this._shared = "shared" in options ? !!options.shared : true;
    this._repeaterID = options.repeaterID || "";
    this._wsProtocols = options.wsProtocols || [];
    this._rfbConnectionState = "";
    this._rfbInitState = "";
    this._rfbAuthScheme = -1;
    this._rfbCleanDisconnect = true;
    this._rfbRSAAESAuthenticationState = null;
    this._rfbVersion = 0;
    this._rfbMaxVersion = 3.8;
    this._rfbTightVNC = false;
    this._rfbVeNCryptState = 0;
    this._rfbXvpVer = 0;
    this._fbWidth = 0;
    this._fbHeight = 0;
    this._fbName = "";
    this._capabilities = { power: false };
    this._supportsFence = false;
    this._supportsContinuousUpdates = false;
    this._enabledContinuousUpdates = false;
    this._supportsSetDesktopSize = false;
    this._screenID = 0;
    this._screenFlags = 0;
    this._pendingRemoteResize = false;
    this._lastResize = 0;
    this._qemuExtKeyEventSupported = false;
    this._extendedPointerEventSupported = false;
    this._clipboardText = null;
    this._clipboardServerCapabilitiesActions = {};
    this._clipboardServerCapabilitiesFormats = {};
    this._sock = null;
    this._display = null;
    this._flushing = false;
    this._keyboard = null;
    this._gestures = null;
    this._resizeObserver = null;
    this._disconnTimer = null;
    this._resizeTimeout = null;
    this._mouseMoveTimer = null;
    this._decoders = {};
    this._FBU = {
      rects: 0,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      encoding: null
    };
    this._mousePos = {};
    this._mouseButtonMask = 0;
    this._mouseLastMoveTime = 0;
    this._viewportDragging = false;
    this._viewportDragPos = {};
    this._viewportHasMoved = false;
    this._accumulatedWheelDeltaX = 0;
    this._accumulatedWheelDeltaY = 0;
    this._gestureLastTapTime = null;
    this._gestureFirstDoubleTapEv = null;
    this._gestureLastMagnitudeX = 0;
    this._gestureLastMagnitudeY = 0;
    this._eventHandlers = {
      focusCanvas: this._focusCanvas.bind(this),
      handleResize: this._handleResize.bind(this),
      handleMouse: this._handleMouse.bind(this),
      handleWheel: this._handleWheel.bind(this),
      handleGesture: this._handleGesture.bind(this),
      handleRSAAESCredentialsRequired: this._handleRSAAESCredentialsRequired.bind(this),
      handleRSAAESServerVerification: this._handleRSAAESServerVerification.bind(this)
    };
    Debug(">> RFB.constructor");
    this._screen = document.createElement("div");
    this._screen.style.display = "flex";
    this._screen.style.width = "100%";
    this._screen.style.height = "100%";
    this._screen.style.overflow = "auto";
    this._screen.style.background = DEFAULT_BACKGROUND;
    this._canvas = document.createElement("canvas");
    this._canvas.style.margin = "auto";
    this._canvas.style.outline = "none";
    this._canvas.width = 0;
    this._canvas.height = 0;
    this._canvas.tabIndex = -1;
    this._screen.appendChild(this._canvas);
    this._cursor = new Cursor();
    this._cursorImage = _RFB.cursors.none;
    this._decoders[encodings.encodingRaw] = new RawDecoder();
    this._decoders[encodings.encodingCopyRect] = new CopyRectDecoder();
    this._decoders[encodings.encodingRRE] = new RREDecoder();
    this._decoders[encodings.encodingHextile] = new HextileDecoder();
    this._decoders[encodings.encodingZlib] = new ZlibDecoder();
    this._decoders[encodings.encodingTight] = new TightDecoder();
    this._decoders[encodings.encodingTightPNG] = new TightPNGDecoder();
    this._decoders[encodings.encodingZRLE] = new ZRLEDecoder();
    this._decoders[encodings.encodingJPEG] = new JPEGDecoder();
    this._decoders[encodings.encodingH264] = new H264Decoder();
    try {
      this._display = new Display(this._canvas);
    } catch (exc) {
      Error2("Display exception: " + exc);
      throw exc;
    }
    this._keyboard = new Keyboard(this._canvas);
    this._keyboard.onkeyevent = this._handleKeyEvent.bind(this);
    this._remoteCapsLock = null;
    this._remoteNumLock = null;
    this._gestures = new GestureHandler();
    this._sock = new Websock();
    this._sock.on("open", this._socketOpen.bind(this));
    this._sock.on("close", this._socketClose.bind(this));
    this._sock.on("message", this._handleMessage.bind(this));
    this._sock.on("error", this._socketError.bind(this));
    this._expectedClientWidth = null;
    this._expectedClientHeight = null;
    this._resizeObserver = new ResizeObserver(this._eventHandlers.handleResize);
    this._updateConnectionState("connecting");
    Debug("<< RFB.constructor");
    this.dragViewport = false;
    this.focusOnClick = true;
    this._viewOnly = false;
    this._clipViewport = false;
    this._clippingViewport = false;
    this._scaleViewport = false;
    this._resizeSession = false;
    this._showDotCursor = false;
    this._qualityLevel = 6;
    this._compressionLevel = 2;
  }
  // ===== PROPERTIES =====
  get viewOnly() {
    return this._viewOnly;
  }
  set viewOnly(viewOnly) {
    this._viewOnly = viewOnly;
    if (this._rfbConnectionState === "connecting" || this._rfbConnectionState === "connected") {
      if (viewOnly) {
        this._keyboard.ungrab();
      } else {
        this._keyboard.grab();
      }
    }
  }
  get capabilities() {
    return this._capabilities;
  }
  get clippingViewport() {
    return this._clippingViewport;
  }
  _setClippingViewport(on2) {
    if (on2 === this._clippingViewport) {
      return;
    }
    this._clippingViewport = on2;
    this.dispatchEvent(new CustomEvent(
      "clippingviewport",
      { detail: this._clippingViewport }
    ));
  }
  get touchButton() {
    return 0;
  }
  set touchButton(button) {
    Warn("Using old API!");
  }
  get clipViewport() {
    return this._clipViewport;
  }
  set clipViewport(viewport) {
    this._clipViewport = viewport;
    this._updateClip();
  }
  get scaleViewport() {
    return this._scaleViewport;
  }
  set scaleViewport(scale) {
    this._scaleViewport = scale;
    if (scale && this._clipViewport) {
      this._updateClip();
    }
    this._updateScale();
    if (!scale && this._clipViewport) {
      this._updateClip();
    }
  }
  get resizeSession() {
    return this._resizeSession;
  }
  set resizeSession(resize) {
    this._resizeSession = resize;
    if (resize) {
      this._requestRemoteResize();
    }
  }
  get showDotCursor() {
    return this._showDotCursor;
  }
  set showDotCursor(show) {
    this._showDotCursor = show;
    this._refreshCursor();
  }
  get background() {
    return this._screen.style.background;
  }
  set background(cssValue) {
    this._screen.style.background = cssValue;
  }
  get qualityLevel() {
    return this._qualityLevel;
  }
  set qualityLevel(qualityLevel) {
    if (!Number.isInteger(qualityLevel) || qualityLevel < 0 || qualityLevel > 9) {
      Error2("qualityLevel must be an integer between 0 and 9");
      return;
    }
    if (this._qualityLevel === qualityLevel) {
      return;
    }
    this._qualityLevel = qualityLevel;
    if (this._rfbConnectionState === "connected") {
      this._sendEncodings();
    }
  }
  get compressionLevel() {
    return this._compressionLevel;
  }
  set compressionLevel(compressionLevel) {
    if (!Number.isInteger(compressionLevel) || compressionLevel < 0 || compressionLevel > 9) {
      Error2("compressionLevel must be an integer between 0 and 9");
      return;
    }
    if (this._compressionLevel === compressionLevel) {
      return;
    }
    this._compressionLevel = compressionLevel;
    if (this._rfbConnectionState === "connected") {
      this._sendEncodings();
    }
  }
  // ===== PUBLIC METHODS =====
  disconnect() {
    this._updateConnectionState("disconnecting");
    this._sock.off("error");
    this._sock.off("message");
    this._sock.off("open");
    if (this._rfbRSAAESAuthenticationState !== null) {
      this._rfbRSAAESAuthenticationState.disconnect();
    }
  }
  approveServer() {
    if (this._rfbRSAAESAuthenticationState !== null) {
      this._rfbRSAAESAuthenticationState.approveServer();
    }
  }
  sendCredentials(creds) {
    this._rfbCredentials = creds;
    this._resumeAuthentication();
  }
  sendCtrlAltDel() {
    if (this._rfbConnectionState !== "connected" || this._viewOnly) {
      return;
    }
    Info("Sending Ctrl-Alt-Del");
    this.sendKey(keysym_default.XK_Control_L, "ControlLeft", true);
    this.sendKey(keysym_default.XK_Alt_L, "AltLeft", true);
    this.sendKey(keysym_default.XK_Delete, "Delete", true);
    this.sendKey(keysym_default.XK_Delete, "Delete", false);
    this.sendKey(keysym_default.XK_Alt_L, "AltLeft", false);
    this.sendKey(keysym_default.XK_Control_L, "ControlLeft", false);
  }
  machineShutdown() {
    this._xvpOp(1, 2);
  }
  machineReboot() {
    this._xvpOp(1, 3);
  }
  machineReset() {
    this._xvpOp(1, 4);
  }
  // Send a key press. If 'down' is not specified then send a down key
  // followed by an up key.
  sendKey(keysym, code, down) {
    if (this._rfbConnectionState !== "connected" || this._viewOnly) {
      return;
    }
    if (down === void 0) {
      this.sendKey(keysym, code, true);
      this.sendKey(keysym, code, false);
      return;
    }
    const scancode = xtscancodes_default[code];
    if (this._qemuExtKeyEventSupported && scancode) {
      keysym = keysym || 0;
      Info("Sending key (" + (down ? "down" : "up") + "): keysym " + keysym + ", scancode " + scancode);
      _RFB.messages.QEMUExtendedKeyEvent(this._sock, keysym, down, scancode);
    } else {
      if (!keysym) {
        return;
      }
      Info("Sending keysym (" + (down ? "down" : "up") + "): " + keysym);
      _RFB.messages.keyEvent(this._sock, keysym, down ? 1 : 0);
    }
  }
  focus(options) {
    this._canvas.focus(options);
  }
  blur() {
    this._canvas.blur();
  }
  clipboardPasteFrom(text) {
    if (this._rfbConnectionState !== "connected" || this._viewOnly) {
      return;
    }
    if (this._clipboardServerCapabilitiesFormats[extendedClipboardFormatText] && this._clipboardServerCapabilitiesActions[extendedClipboardActionNotify]) {
      this._clipboardText = text;
      _RFB.messages.extendedClipboardNotify(this._sock, [extendedClipboardFormatText]);
    } else {
      let length, i;
      let data;
      length = 0;
      for (let codePoint of text) {
        length++;
      }
      data = new Uint8Array(length);
      i = 0;
      for (let codePoint of text) {
        let code = codePoint.codePointAt(0);
        if (code > 255) {
          code = 63;
        }
        data[i++] = code;
      }
      _RFB.messages.clientCutText(this._sock, data);
    }
  }
  getImageData() {
    return this._display.getImageData();
  }
  toDataURL(type, encoderOptions) {
    return this._display.toDataURL(type, encoderOptions);
  }
  toBlob(callback, type, quality) {
    return this._display.toBlob(callback, type, quality);
  }
  // ===== PRIVATE METHODS =====
  _connect() {
    Debug(">> RFB.connect");
    if (this._url) {
      Info(`connecting to ${this._url}`);
      this._sock.open(this._url, this._wsProtocols);
    } else {
      Info(`attaching ${this._rawChannel} to Websock`);
      this._sock.attach(this._rawChannel);
      if (this._sock.readyState === "closed") {
        throw Error("Cannot use already closed WebSocket/RTCDataChannel");
      }
      if (this._sock.readyState === "open") {
        this._socketOpen();
      }
    }
    this._target.appendChild(this._screen);
    this._gestures.attach(this._canvas);
    this._cursor.attach(this._canvas);
    this._refreshCursor();
    this._resizeObserver.observe(this._screen);
    this._canvas.addEventListener("mousedown", this._eventHandlers.focusCanvas);
    this._canvas.addEventListener("touchstart", this._eventHandlers.focusCanvas);
    this._canvas.addEventListener("mousedown", this._eventHandlers.handleMouse);
    this._canvas.addEventListener("mouseup", this._eventHandlers.handleMouse);
    this._canvas.addEventListener("mousemove", this._eventHandlers.handleMouse);
    this._canvas.addEventListener("click", this._eventHandlers.handleMouse);
    this._canvas.addEventListener("contextmenu", this._eventHandlers.handleMouse);
    this._canvas.addEventListener("wheel", this._eventHandlers.handleWheel);
    this._canvas.addEventListener("gesturestart", this._eventHandlers.handleGesture);
    this._canvas.addEventListener("gesturemove", this._eventHandlers.handleGesture);
    this._canvas.addEventListener("gestureend", this._eventHandlers.handleGesture);
    Debug("<< RFB.connect");
  }
  _disconnect() {
    Debug(">> RFB.disconnect");
    this._cursor.detach();
    this._canvas.removeEventListener("gesturestart", this._eventHandlers.handleGesture);
    this._canvas.removeEventListener("gesturemove", this._eventHandlers.handleGesture);
    this._canvas.removeEventListener("gestureend", this._eventHandlers.handleGesture);
    this._canvas.removeEventListener("wheel", this._eventHandlers.handleWheel);
    this._canvas.removeEventListener("mousedown", this._eventHandlers.handleMouse);
    this._canvas.removeEventListener("mouseup", this._eventHandlers.handleMouse);
    this._canvas.removeEventListener("mousemove", this._eventHandlers.handleMouse);
    this._canvas.removeEventListener("click", this._eventHandlers.handleMouse);
    this._canvas.removeEventListener("contextmenu", this._eventHandlers.handleMouse);
    this._canvas.removeEventListener("mousedown", this._eventHandlers.focusCanvas);
    this._canvas.removeEventListener("touchstart", this._eventHandlers.focusCanvas);
    this._resizeObserver.disconnect();
    this._keyboard.ungrab();
    this._gestures.detach();
    this._sock.close();
    try {
      this._target.removeChild(this._screen);
    } catch (e2) {
      if (e2.name === "NotFoundError") {
      } else {
        throw e2;
      }
    }
    clearTimeout(this._resizeTimeout);
    clearTimeout(this._mouseMoveTimer);
    Debug("<< RFB.disconnect");
  }
  _socketOpen() {
    if (this._rfbConnectionState === "connecting" && this._rfbInitState === "") {
      this._rfbInitState = "ProtocolVersion";
      Debug("Starting VNC handshake");
    } else {
      this._fail("Unexpected server connection while " + this._rfbConnectionState);
    }
  }
  _socketClose(e2) {
    Debug("WebSocket on-close event");
    let msg = "";
    if (e2.code) {
      msg = "(code: " + e2.code;
      if (e2.reason) {
        msg += ", reason: " + e2.reason;
      }
      msg += ")";
    }
    switch (this._rfbConnectionState) {
      case "connecting":
        this._fail("Connection closed " + msg);
        break;
      case "connected":
        this._updateConnectionState("disconnecting");
        this._updateConnectionState("disconnected");
        break;
      case "disconnecting":
        this._updateConnectionState("disconnected");
        break;
      case "disconnected":
        this._fail("Unexpected server disconnect when already disconnected " + msg);
        break;
      default:
        this._fail("Unexpected server disconnect before connecting " + msg);
        break;
    }
    this._sock.off("close");
    this._rawChannel = null;
  }
  _socketError(e2) {
    Warn("WebSocket on-error event");
  }
  _focusCanvas(event) {
    if (!this.focusOnClick) {
      return;
    }
    this.focus({ preventScroll: true });
  }
  _setDesktopName(name) {
    this._fbName = name;
    this.dispatchEvent(new CustomEvent(
      "desktopname",
      { detail: { name: this._fbName } }
    ));
  }
  _saveExpectedClientSize() {
    this._expectedClientWidth = this._screen.clientWidth;
    this._expectedClientHeight = this._screen.clientHeight;
  }
  _currentClientSize() {
    return [this._screen.clientWidth, this._screen.clientHeight];
  }
  _clientHasExpectedSize() {
    const [currentWidth, currentHeight] = this._currentClientSize();
    return currentWidth == this._expectedClientWidth && currentHeight == this._expectedClientHeight;
  }
  // Handle browser window resizes
  _handleResize() {
    if (this._clientHasExpectedSize()) {
      return;
    }
    window.requestAnimationFrame(() => {
      this._updateClip();
      this._updateScale();
      this._saveExpectedClientSize();
    });
    this._requestRemoteResize();
  }
  // Update state of clipping in Display object, and make sure the
  // configured viewport matches the current screen size
  _updateClip() {
    const curClip = this._display.clipViewport;
    let newClip = this._clipViewport;
    if (this._scaleViewport) {
      newClip = false;
    }
    if (curClip !== newClip) {
      this._display.clipViewport = newClip;
    }
    if (newClip) {
      const size = this._screenSize();
      this._display.viewportChangeSize(size.w, size.h);
      this._fixScrollbars();
      this._setClippingViewport(size.w < this._display.width || size.h < this._display.height);
    } else {
      this._setClippingViewport(false);
    }
    if (curClip !== newClip) {
      this._saveExpectedClientSize();
    }
  }
  _updateScale() {
    if (!this._scaleViewport) {
      this._display.scale = 1;
    } else {
      const size = this._screenSize();
      this._display.autoscale(size.w, size.h);
    }
    this._fixScrollbars();
  }
  // Requests a change of remote desktop size. This message is an extension
  // and may only be sent if we have received an ExtendedDesktopSize message
  _requestRemoteResize() {
    if (!this._resizeSession) {
      return;
    }
    if (this._viewOnly) {
      return;
    }
    if (!this._supportsSetDesktopSize) {
      return;
    }
    if (this._pendingRemoteResize) {
      return;
    }
    if (Date.now() - this._lastResize < 100) {
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = setTimeout(
        this._requestRemoteResize.bind(this),
        100 - (Date.now() - this._lastResize)
      );
      return;
    }
    this._resizeTimeout = null;
    const size = this._screenSize();
    if (size.w === this._fbWidth && size.h === this._fbHeight) {
      return;
    }
    this._pendingRemoteResize = true;
    this._lastResize = Date.now();
    _RFB.messages.setDesktopSize(
      this._sock,
      Math.floor(size.w),
      Math.floor(size.h),
      this._screenID,
      this._screenFlags
    );
    Debug("Requested new desktop size: " + size.w + "x" + size.h);
  }
  // Gets the the size of the available screen
  _screenSize() {
    let r = this._screen.getBoundingClientRect();
    return { w: r.width, h: r.height };
  }
  _fixScrollbars() {
    const orig = this._screen.style.overflow;
    this._screen.style.overflow = "hidden";
    this._screen.getBoundingClientRect();
    this._screen.style.overflow = orig;
  }
  /*
   * Connection states:
   *   connecting
   *   connected
   *   disconnecting
   *   disconnected - permanent state
   */
  _updateConnectionState(state) {
    const oldstate = this._rfbConnectionState;
    if (state === oldstate) {
      Debug("Already in state '" + state + "', ignoring");
      return;
    }
    if (oldstate === "disconnected") {
      Error2("Tried changing state of a disconnected RFB object");
      return;
    }
    switch (state) {
      case "connected":
        if (oldstate !== "connecting") {
          Error2("Bad transition to connected state, previous connection state: " + oldstate);
          return;
        }
        break;
      case "disconnected":
        if (oldstate !== "disconnecting") {
          Error2("Bad transition to disconnected state, previous connection state: " + oldstate);
          return;
        }
        break;
      case "connecting":
        if (oldstate !== "") {
          Error2("Bad transition to connecting state, previous connection state: " + oldstate);
          return;
        }
        break;
      case "disconnecting":
        if (oldstate !== "connected" && oldstate !== "connecting") {
          Error2("Bad transition to disconnecting state, previous connection state: " + oldstate);
          return;
        }
        break;
      default:
        Error2("Unknown connection state: " + state);
        return;
    }
    this._rfbConnectionState = state;
    Debug("New state '" + state + "', was '" + oldstate + "'.");
    if (this._disconnTimer && state !== "disconnecting") {
      Debug("Clearing disconnect timer");
      clearTimeout(this._disconnTimer);
      this._disconnTimer = null;
      this._sock.off("close");
    }
    switch (state) {
      case "connecting":
        this._connect();
        break;
      case "connected":
        this.dispatchEvent(new CustomEvent("connect", { detail: {} }));
        break;
      case "disconnecting":
        this._disconnect();
        this._disconnTimer = setTimeout(() => {
          Error2("Disconnection timed out.");
          this._updateConnectionState("disconnected");
        }, DISCONNECT_TIMEOUT * 1e3);
        break;
      case "disconnected":
        this.dispatchEvent(new CustomEvent(
          "disconnect",
          { detail: { clean: this._rfbCleanDisconnect } }
        ));
        break;
    }
  }
  /* Print errors and disconnect
   *
   * The parameter 'details' is used for information that
   * should be logged but not sent to the user interface.
   */
  _fail(details) {
    switch (this._rfbConnectionState) {
      case "disconnecting":
        Error2("Failed when disconnecting: " + details);
        break;
      case "connected":
        Error2("Failed while connected: " + details);
        break;
      case "connecting":
        Error2("Failed when connecting: " + details);
        break;
      default:
        Error2("RFB failure: " + details);
        break;
    }
    this._rfbCleanDisconnect = false;
    this._updateConnectionState("disconnecting");
    this._updateConnectionState("disconnected");
    return false;
  }
  _setCapability(cap, val) {
    this._capabilities[cap] = val;
    this.dispatchEvent(new CustomEvent(
      "capabilities",
      { detail: { capabilities: this._capabilities } }
    ));
  }
  _handleMessage() {
    if (this._sock.rQwait("message", 1)) {
      Warn("handleMessage called on an empty receive queue");
      return;
    }
    switch (this._rfbConnectionState) {
      case "disconnected":
        Error2("Got data while disconnected");
        break;
      case "connected":
        while (true) {
          if (this._flushing) {
            break;
          }
          if (!this._normalMsg()) {
            break;
          }
          if (this._sock.rQwait("message", 1)) {
            break;
          }
        }
        break;
      case "connecting":
        while (this._rfbConnectionState === "connecting") {
          if (!this._initMsg()) {
            break;
          }
        }
        break;
      default:
        Error2("Got data while in an invalid state");
        break;
    }
  }
  _handleKeyEvent(keysym, code, down, numlock, capslock) {
    if (code == "CapsLock" && down) {
      this._remoteCapsLock = null;
    }
    if (this._remoteCapsLock !== null && capslock !== null && this._remoteCapsLock !== capslock && down) {
      Debug("Fixing remote caps lock");
      this.sendKey(keysym_default.XK_Caps_Lock, "CapsLock", true);
      this.sendKey(keysym_default.XK_Caps_Lock, "CapsLock", false);
      this._remoteCapsLock = null;
    }
    if (code == "NumLock" && down) {
      this._remoteNumLock = null;
    }
    if (this._remoteNumLock !== null && numlock !== null && this._remoteNumLock !== numlock && down) {
      Debug("Fixing remote num lock");
      this.sendKey(keysym_default.XK_Num_Lock, "NumLock", true);
      this.sendKey(keysym_default.XK_Num_Lock, "NumLock", false);
      this._remoteNumLock = null;
    }
    this.sendKey(keysym, code, down);
  }
  static _convertButtonMask(buttons) {
    const buttonMaskMap = {
      0: 1 << 0,
      // Left
      1: 1 << 2,
      // Right
      2: 1 << 1,
      // Middle
      3: 1 << 7,
      // Back
      4: 1 << 8
      // Forward
    };
    let bmask = 0;
    for (let i = 0; i < 5; i++) {
      if (buttons & 1 << i) {
        bmask |= buttonMaskMap[i];
      }
    }
    return bmask;
  }
  _handleMouse(ev) {
    if (ev.type === "click") {
      if (ev.target !== this._canvas) {
        return;
      }
    }
    ev.stopPropagation();
    ev.preventDefault();
    if (ev.type === "click" || ev.type === "contextmenu") {
      return;
    }
    let pos = clientToElement(
      ev.clientX,
      ev.clientY,
      this._canvas
    );
    let bmask = _RFB._convertButtonMask(ev.buttons);
    let down = ev.type == "mousedown";
    switch (ev.type) {
      case "mousedown":
      case "mouseup":
        if (this.dragViewport) {
          if (down && !this._viewportDragging) {
            this._viewportDragging = true;
            this._viewportDragPos = { "x": pos.x, "y": pos.y };
            this._viewportHasMoved = false;
            this._flushMouseMoveTimer(pos.x, pos.y);
            this._mouseButtonMask = bmask;
            break;
          } else {
            this._viewportDragging = false;
            if (this._viewportHasMoved) {
              this._mouseButtonMask = bmask;
              break;
            }
            this._sendMouse(pos.x, pos.y, this._mouseButtonMask);
          }
        }
        if (down) {
          setCapture(this._canvas);
        }
        this._handleMouseButton(pos.x, pos.y, bmask);
        break;
      case "mousemove":
        if (this._viewportDragging) {
          const deltaX = this._viewportDragPos.x - pos.x;
          const deltaY = this._viewportDragPos.y - pos.y;
          if (this._viewportHasMoved || (Math.abs(deltaX) > dragThreshold || Math.abs(deltaY) > dragThreshold)) {
            this._viewportHasMoved = true;
            this._viewportDragPos = { "x": pos.x, "y": pos.y };
            this._display.viewportChangePos(deltaX, deltaY);
          }
          break;
        }
        this._handleMouseMove(pos.x, pos.y);
        break;
    }
  }
  _handleMouseButton(x, y, bmask) {
    this._flushMouseMoveTimer(x, y);
    this._mouseButtonMask = bmask;
    this._sendMouse(x, y, this._mouseButtonMask);
  }
  _handleMouseMove(x, y) {
    this._mousePos = { "x": x, "y": y };
    if (this._mouseMoveTimer == null) {
      const timeSinceLastMove = Date.now() - this._mouseLastMoveTime;
      if (timeSinceLastMove > MOUSE_MOVE_DELAY) {
        this._sendMouse(x, y, this._mouseButtonMask);
        this._mouseLastMoveTime = Date.now();
      } else {
        this._mouseMoveTimer = setTimeout(() => {
          this._handleDelayedMouseMove();
        }, MOUSE_MOVE_DELAY - timeSinceLastMove);
      }
    }
  }
  _handleDelayedMouseMove() {
    this._mouseMoveTimer = null;
    this._sendMouse(
      this._mousePos.x,
      this._mousePos.y,
      this._mouseButtonMask
    );
    this._mouseLastMoveTime = Date.now();
  }
  _sendMouse(x, y, mask) {
    if (this._rfbConnectionState !== "connected") {
      return;
    }
    if (this._viewOnly) {
      return;
    }
    if (mask & 32768) {
      throw new Error("Illegal mouse button mask (mask: " + mask + ")");
    }
    let extendedMouseButtons = mask & 32640;
    if (this._extendedPointerEventSupported && extendedMouseButtons) {
      _RFB.messages.extendedPointerEvent(
        this._sock,
        this._display.absX(x),
        this._display.absY(y),
        mask
      );
    } else {
      _RFB.messages.pointerEvent(
        this._sock,
        this._display.absX(x),
        this._display.absY(y),
        mask
      );
    }
  }
  _handleWheel(ev) {
    if (this._rfbConnectionState !== "connected") {
      return;
    }
    if (this._viewOnly) {
      return;
    }
    ev.stopPropagation();
    ev.preventDefault();
    let pos = clientToElement(
      ev.clientX,
      ev.clientY,
      this._canvas
    );
    let bmask = _RFB._convertButtonMask(ev.buttons);
    let dX = ev.deltaX;
    let dY = ev.deltaY;
    if (ev.deltaMode !== 0) {
      dX *= WHEEL_LINE_HEIGHT;
      dY *= WHEEL_LINE_HEIGHT;
    }
    this._accumulatedWheelDeltaX += dX;
    this._accumulatedWheelDeltaY += dY;
    if (Math.abs(this._accumulatedWheelDeltaX) >= WHEEL_STEP) {
      if (this._accumulatedWheelDeltaX < 0) {
        this._handleMouseButton(pos.x, pos.y, bmask | 1 << 5);
        this._handleMouseButton(pos.x, pos.y, bmask);
      } else if (this._accumulatedWheelDeltaX > 0) {
        this._handleMouseButton(pos.x, pos.y, bmask | 1 << 6);
        this._handleMouseButton(pos.x, pos.y, bmask);
      }
      this._accumulatedWheelDeltaX = 0;
    }
    if (Math.abs(this._accumulatedWheelDeltaY) >= WHEEL_STEP) {
      if (this._accumulatedWheelDeltaY < 0) {
        this._handleMouseButton(pos.x, pos.y, bmask | 1 << 3);
        this._handleMouseButton(pos.x, pos.y, bmask);
      } else if (this._accumulatedWheelDeltaY > 0) {
        this._handleMouseButton(pos.x, pos.y, bmask | 1 << 4);
        this._handleMouseButton(pos.x, pos.y, bmask);
      }
      this._accumulatedWheelDeltaY = 0;
    }
  }
  _fakeMouseMove(ev, elementX, elementY) {
    this._handleMouseMove(elementX, elementY);
    this._cursor.move(ev.detail.clientX, ev.detail.clientY);
  }
  _handleTapEvent(ev, bmask) {
    let pos = clientToElement(
      ev.detail.clientX,
      ev.detail.clientY,
      this._canvas
    );
    if (this._gestureLastTapTime !== null && Date.now() - this._gestureLastTapTime < DOUBLE_TAP_TIMEOUT && this._gestureFirstDoubleTapEv.detail.type === ev.detail.type) {
      let dx = this._gestureFirstDoubleTapEv.detail.clientX - ev.detail.clientX;
      let dy = this._gestureFirstDoubleTapEv.detail.clientY - ev.detail.clientY;
      let distance = Math.hypot(dx, dy);
      if (distance < DOUBLE_TAP_THRESHOLD) {
        pos = clientToElement(
          this._gestureFirstDoubleTapEv.detail.clientX,
          this._gestureFirstDoubleTapEv.detail.clientY,
          this._canvas
        );
      } else {
        this._gestureFirstDoubleTapEv = ev;
      }
    } else {
      this._gestureFirstDoubleTapEv = ev;
    }
    this._gestureLastTapTime = Date.now();
    this._fakeMouseMove(this._gestureFirstDoubleTapEv, pos.x, pos.y);
    this._handleMouseButton(pos.x, pos.y, bmask);
    this._handleMouseButton(pos.x, pos.y, 0);
  }
  _handleGesture(ev) {
    let magnitude;
    let pos = clientToElement(
      ev.detail.clientX,
      ev.detail.clientY,
      this._canvas
    );
    switch (ev.type) {
      case "gesturestart":
        switch (ev.detail.type) {
          case "onetap":
            this._handleTapEvent(ev, 1);
            break;
          case "twotap":
            this._handleTapEvent(ev, 4);
            break;
          case "threetap":
            this._handleTapEvent(ev, 2);
            break;
          case "drag":
            if (this.dragViewport) {
              this._viewportHasMoved = false;
              this._viewportDragging = true;
              this._viewportDragPos = { "x": pos.x, "y": pos.y };
            } else {
              this._fakeMouseMove(ev, pos.x, pos.y);
              this._handleMouseButton(pos.x, pos.y, 1);
            }
            break;
          case "longpress":
            if (this.dragViewport) {
              this._viewportHasMoved = false;
              this._viewportDragPos = { "x": pos.x, "y": pos.y };
            } else {
              this._fakeMouseMove(ev, pos.x, pos.y);
              this._handleMouseButton(pos.x, pos.y, 4);
            }
            break;
          case "twodrag":
            this._gestureLastMagnitudeX = ev.detail.magnitudeX;
            this._gestureLastMagnitudeY = ev.detail.magnitudeY;
            this._fakeMouseMove(ev, pos.x, pos.y);
            break;
          case "pinch":
            this._gestureLastMagnitudeX = Math.hypot(
              ev.detail.magnitudeX,
              ev.detail.magnitudeY
            );
            this._fakeMouseMove(ev, pos.x, pos.y);
            break;
        }
        break;
      case "gesturemove":
        switch (ev.detail.type) {
          case "onetap":
          case "twotap":
          case "threetap":
            break;
          case "drag":
          case "longpress":
            if (this.dragViewport) {
              this._viewportDragging = true;
              const deltaX = this._viewportDragPos.x - pos.x;
              const deltaY = this._viewportDragPos.y - pos.y;
              if (this._viewportHasMoved || (Math.abs(deltaX) > dragThreshold || Math.abs(deltaY) > dragThreshold)) {
                this._viewportHasMoved = true;
                this._viewportDragPos = { "x": pos.x, "y": pos.y };
                this._display.viewportChangePos(deltaX, deltaY);
              }
            } else {
              this._fakeMouseMove(ev, pos.x, pos.y);
            }
            break;
          case "twodrag":
            this._fakeMouseMove(ev, pos.x, pos.y);
            while (ev.detail.magnitudeY - this._gestureLastMagnitudeY > GESTURE_SCRLSENS) {
              this._handleMouseButton(pos.x, pos.y, 8);
              this._handleMouseButton(pos.x, pos.y, 0);
              this._gestureLastMagnitudeY += GESTURE_SCRLSENS;
            }
            while (ev.detail.magnitudeY - this._gestureLastMagnitudeY < -GESTURE_SCRLSENS) {
              this._handleMouseButton(pos.x, pos.y, 16);
              this._handleMouseButton(pos.x, pos.y, 0);
              this._gestureLastMagnitudeY -= GESTURE_SCRLSENS;
            }
            while (ev.detail.magnitudeX - this._gestureLastMagnitudeX > GESTURE_SCRLSENS) {
              this._handleMouseButton(pos.x, pos.y, 32);
              this._handleMouseButton(pos.x, pos.y, 0);
              this._gestureLastMagnitudeX += GESTURE_SCRLSENS;
            }
            while (ev.detail.magnitudeX - this._gestureLastMagnitudeX < -GESTURE_SCRLSENS) {
              this._handleMouseButton(pos.x, pos.y, 64);
              this._handleMouseButton(pos.x, pos.y, 0);
              this._gestureLastMagnitudeX -= GESTURE_SCRLSENS;
            }
            break;
          case "pinch":
            this._fakeMouseMove(ev, pos.x, pos.y);
            magnitude = Math.hypot(ev.detail.magnitudeX, ev.detail.magnitudeY);
            if (Math.abs(magnitude - this._gestureLastMagnitudeX) > GESTURE_ZOOMSENS) {
              this._handleKeyEvent(keysym_default.XK_Control_L, "ControlLeft", true);
              while (magnitude - this._gestureLastMagnitudeX > GESTURE_ZOOMSENS) {
                this._handleMouseButton(pos.x, pos.y, 8);
                this._handleMouseButton(pos.x, pos.y, 0);
                this._gestureLastMagnitudeX += GESTURE_ZOOMSENS;
              }
              while (magnitude - this._gestureLastMagnitudeX < -GESTURE_ZOOMSENS) {
                this._handleMouseButton(pos.x, pos.y, 16);
                this._handleMouseButton(pos.x, pos.y, 0);
                this._gestureLastMagnitudeX -= GESTURE_ZOOMSENS;
              }
            }
            this._handleKeyEvent(keysym_default.XK_Control_L, "ControlLeft", false);
            break;
        }
        break;
      case "gestureend":
        switch (ev.detail.type) {
          case "onetap":
          case "twotap":
          case "threetap":
          case "pinch":
          case "twodrag":
            break;
          case "drag":
            if (this.dragViewport) {
              this._viewportDragging = false;
            } else {
              this._fakeMouseMove(ev, pos.x, pos.y);
              this._handleMouseButton(pos.x, pos.y, 0);
            }
            break;
          case "longpress":
            if (this._viewportHasMoved) {
              break;
            }
            if (this.dragViewport && !this._viewportHasMoved) {
              this._fakeMouseMove(ev, pos.x, pos.y);
              this._handleMouseButton(pos.x, pos.y, 4);
              this._handleMouseButton(pos.x, pos.y, 0);
              this._viewportDragging = false;
            } else {
              this._fakeMouseMove(ev, pos.x, pos.y);
              this._handleMouseButton(pos.x, pos.y, 0);
            }
            break;
        }
        break;
    }
  }
  _flushMouseMoveTimer(x, y) {
    if (this._mouseMoveTimer !== null) {
      clearTimeout(this._mouseMoveTimer);
      this._mouseMoveTimer = null;
      this._sendMouse(x, y, this._mouseButtonMask);
    }
  }
  // Message handlers
  _negotiateProtocolVersion() {
    if (this._sock.rQwait("version", 12)) {
      return false;
    }
    const sversion = this._sock.rQshiftStr(12).substr(4, 7);
    Info("Server ProtocolVersion: " + sversion);
    let isRepeater = 0;
    switch (sversion) {
      case "000.000":
        isRepeater = 1;
        break;
      case "003.003":
      case "003.006":
        this._rfbVersion = 3.3;
        break;
      case "003.007":
        this._rfbVersion = 3.7;
        break;
      case "003.008":
      case "003.889":
      // Apple Remote Desktop
      case "004.000":
      // Intel AMT KVM
      case "004.001":
      // RealVNC 4.6
      case "005.000":
        this._rfbVersion = 3.8;
        break;
      default:
        return this._fail("Invalid server version " + sversion);
    }
    if (isRepeater) {
      let repeaterID = "ID:" + this._repeaterID;
      while (repeaterID.length < 250) {
        repeaterID += "\0";
      }
      this._sock.sQpushString(repeaterID);
      this._sock.flush();
      return true;
    }
    if (this._rfbVersion > this._rfbMaxVersion) {
      this._rfbVersion = this._rfbMaxVersion;
    }
    const cversion = "00" + parseInt(this._rfbVersion, 10) + ".00" + this._rfbVersion * 10 % 10;
    this._sock.sQpushString("RFB " + cversion + "\n");
    this._sock.flush();
    Debug("Sent ProtocolVersion: " + cversion);
    this._rfbInitState = "Security";
  }
  _isSupportedSecurityType(type) {
    const clientTypes = [
      securityTypeNone,
      securityTypeVNCAuth,
      securityTypeRA2ne,
      securityTypeTight,
      securityTypeVeNCrypt,
      securityTypeXVP,
      securityTypeARD,
      securityTypeMSLogonII,
      securityTypePlain
    ];
    return clientTypes.includes(type);
  }
  _negotiateSecurity() {
    if (this._rfbVersion >= 3.7) {
      const numTypes = this._sock.rQshift8();
      if (this._sock.rQwait("security type", numTypes, 1)) {
        return false;
      }
      if (numTypes === 0) {
        this._rfbInitState = "SecurityReason";
        this._securityContext = "no security types";
        this._securityStatus = 1;
        return true;
      }
      const types = this._sock.rQshiftBytes(numTypes);
      Debug("Server security types: " + types);
      this._rfbAuthScheme = -1;
      for (let type of types) {
        if (this._isSupportedSecurityType(type)) {
          this._rfbAuthScheme = type;
          break;
        }
      }
      if (this._rfbAuthScheme === -1) {
        return this._fail("Unsupported security types (types: " + types + ")");
      }
      this._sock.sQpush8(this._rfbAuthScheme);
      this._sock.flush();
    } else {
      if (this._sock.rQwait("security scheme", 4)) {
        return false;
      }
      this._rfbAuthScheme = this._sock.rQshift32();
      if (this._rfbAuthScheme == 0) {
        this._rfbInitState = "SecurityReason";
        this._securityContext = "authentication scheme";
        this._securityStatus = 1;
        return true;
      }
    }
    this._rfbInitState = "Authentication";
    Debug("Authenticating using scheme: " + this._rfbAuthScheme);
    return true;
  }
  _handleSecurityReason() {
    if (this._sock.rQwait("reason length", 4)) {
      return false;
    }
    const strlen = this._sock.rQshift32();
    let reason = "";
    if (strlen > 0) {
      if (this._sock.rQwait("reason", strlen, 4)) {
        return false;
      }
      reason = this._sock.rQshiftStr(strlen);
    }
    if (reason !== "") {
      this.dispatchEvent(new CustomEvent(
        "securityfailure",
        { detail: {
          status: this._securityStatus,
          reason
        } }
      ));
      return this._fail("Security negotiation failed on " + this._securityContext + " (reason: " + reason + ")");
    } else {
      this.dispatchEvent(new CustomEvent(
        "securityfailure",
        { detail: { status: this._securityStatus } }
      ));
      return this._fail("Security negotiation failed on " + this._securityContext);
    }
  }
  // authentication
  _negotiateXvpAuth() {
    if (this._rfbCredentials.username === void 0 || this._rfbCredentials.password === void 0 || this._rfbCredentials.target === void 0) {
      this.dispatchEvent(new CustomEvent(
        "credentialsrequired",
        { detail: { types: ["username", "password", "target"] } }
      ));
      return false;
    }
    this._sock.sQpush8(this._rfbCredentials.username.length);
    this._sock.sQpush8(this._rfbCredentials.target.length);
    this._sock.sQpushString(this._rfbCredentials.username);
    this._sock.sQpushString(this._rfbCredentials.target);
    this._sock.flush();
    this._rfbAuthScheme = securityTypeVNCAuth;
    return this._negotiateAuthentication();
  }
  // VeNCrypt authentication, currently only supports version 0.2 and only Plain subtype
  _negotiateVeNCryptAuth() {
    if (this._rfbVeNCryptState == 0) {
      if (this._sock.rQwait("vencrypt version", 2)) {
        return false;
      }
      const major = this._sock.rQshift8();
      const minor = this._sock.rQshift8();
      if (!(major == 0 && minor == 2)) {
        return this._fail("Unsupported VeNCrypt version " + major + "." + minor);
      }
      this._sock.sQpush8(0);
      this._sock.sQpush8(2);
      this._sock.flush();
      this._rfbVeNCryptState = 1;
    }
    if (this._rfbVeNCryptState == 1) {
      if (this._sock.rQwait("vencrypt ack", 1)) {
        return false;
      }
      const res = this._sock.rQshift8();
      if (res != 0) {
        return this._fail("VeNCrypt failure " + res);
      }
      this._rfbVeNCryptState = 2;
    }
    if (this._rfbVeNCryptState == 2) {
      if (this._sock.rQwait("vencrypt subtypes length", 1)) {
        return false;
      }
      const subtypesLength = this._sock.rQshift8();
      if (subtypesLength < 1) {
        return this._fail("VeNCrypt subtypes empty");
      }
      this._rfbVeNCryptSubtypesLength = subtypesLength;
      this._rfbVeNCryptState = 3;
    }
    if (this._rfbVeNCryptState == 3) {
      if (this._sock.rQwait("vencrypt subtypes", 4 * this._rfbVeNCryptSubtypesLength)) {
        return false;
      }
      const subtypes = [];
      for (let i = 0; i < this._rfbVeNCryptSubtypesLength; i++) {
        subtypes.push(this._sock.rQshift32());
      }
      this._rfbAuthScheme = -1;
      for (let type of subtypes) {
        if (type === securityTypeVeNCrypt) {
          continue;
        }
        if (this._isSupportedSecurityType(type)) {
          this._rfbAuthScheme = type;
          break;
        }
      }
      if (this._rfbAuthScheme === -1) {
        return this._fail("Unsupported security types (types: " + subtypes + ")");
      }
      this._sock.sQpush32(this._rfbAuthScheme);
      this._sock.flush();
      this._rfbVeNCryptState = 4;
      return true;
    }
  }
  _negotiatePlainAuth() {
    if (this._rfbCredentials.username === void 0 || this._rfbCredentials.password === void 0) {
      this.dispatchEvent(new CustomEvent(
        "credentialsrequired",
        { detail: { types: ["username", "password"] } }
      ));
      return false;
    }
    const user = encodeUTF8(this._rfbCredentials.username);
    const pass = encodeUTF8(this._rfbCredentials.password);
    this._sock.sQpush32(user.length);
    this._sock.sQpush32(pass.length);
    this._sock.sQpushString(user);
    this._sock.sQpushString(pass);
    this._sock.flush();
    this._rfbInitState = "SecurityResult";
    return true;
  }
  _negotiateStdVNCAuth() {
    if (this._sock.rQwait("auth challenge", 16)) {
      return false;
    }
    if (this._rfbCredentials.password === void 0) {
      this.dispatchEvent(new CustomEvent(
        "credentialsrequired",
        { detail: { types: ["password"] } }
      ));
      return false;
    }
    const challenge = Array.prototype.slice.call(this._sock.rQshiftBytes(16));
    const response = _RFB.genDES(this._rfbCredentials.password, challenge);
    this._sock.sQpushBytes(response);
    this._sock.flush();
    this._rfbInitState = "SecurityResult";
    return true;
  }
  _negotiateARDAuth() {
    if (this._rfbCredentials.username === void 0 || this._rfbCredentials.password === void 0) {
      this.dispatchEvent(new CustomEvent(
        "credentialsrequired",
        { detail: { types: ["username", "password"] } }
      ));
      return false;
    }
    if (this._rfbCredentials.ardPublicKey != void 0 && this._rfbCredentials.ardCredentials != void 0) {
      this._sock.sQpushBytes(this._rfbCredentials.ardCredentials);
      this._sock.sQpushBytes(this._rfbCredentials.ardPublicKey);
      this._sock.flush();
      this._rfbCredentials.ardCredentials = null;
      this._rfbCredentials.ardPublicKey = null;
      this._rfbInitState = "SecurityResult";
      return true;
    }
    if (this._sock.rQwait("read ard", 4)) {
      return false;
    }
    let generator = this._sock.rQshiftBytes(2);
    let keyLength = this._sock.rQshift16();
    if (this._sock.rQwait("read ard keylength", keyLength * 2, 4)) {
      return false;
    }
    let prime = this._sock.rQshiftBytes(keyLength);
    let serverPublicKey = this._sock.rQshiftBytes(keyLength);
    let clientKey = crypto_default.generateKey(
      { name: "DH", g: generator, p: prime },
      false,
      ["deriveBits"]
    );
    this._negotiateARDAuthAsync(keyLength, serverPublicKey, clientKey);
    return false;
  }
  async _negotiateARDAuthAsync(keyLength, serverPublicKey, clientKey) {
    const clientPublicKey = crypto_default.exportKey("raw", clientKey.publicKey);
    const sharedKey = crypto_default.deriveBits(
      { name: "DH", public: serverPublicKey },
      clientKey.privateKey,
      keyLength * 8
    );
    const username = encodeUTF8(this._rfbCredentials.username).substring(0, 63);
    const password = encodeUTF8(this._rfbCredentials.password).substring(0, 63);
    const credentials = window.crypto.getRandomValues(new Uint8Array(128));
    for (let i = 0; i < username.length; i++) {
      credentials[i] = username.charCodeAt(i);
    }
    credentials[username.length] = 0;
    for (let i = 0; i < password.length; i++) {
      credentials[64 + i] = password.charCodeAt(i);
    }
    credentials[64 + password.length] = 0;
    const key = await crypto_default.digest("MD5", sharedKey);
    const cipher = await crypto_default.importKey(
      "raw",
      key,
      { name: "AES-ECB" },
      false,
      ["encrypt"]
    );
    const encrypted = await crypto_default.encrypt({ name: "AES-ECB" }, cipher, credentials);
    this._rfbCredentials.ardCredentials = encrypted;
    this._rfbCredentials.ardPublicKey = clientPublicKey;
    this._resumeAuthentication();
  }
  _negotiateTightUnixAuth() {
    if (this._rfbCredentials.username === void 0 || this._rfbCredentials.password === void 0) {
      this.dispatchEvent(new CustomEvent(
        "credentialsrequired",
        { detail: { types: ["username", "password"] } }
      ));
      return false;
    }
    this._sock.sQpush32(this._rfbCredentials.username.length);
    this._sock.sQpush32(this._rfbCredentials.password.length);
    this._sock.sQpushString(this._rfbCredentials.username);
    this._sock.sQpushString(this._rfbCredentials.password);
    this._sock.flush();
    this._rfbInitState = "SecurityResult";
    return true;
  }
  _negotiateTightTunnels(numTunnels) {
    const clientSupportedTunnelTypes = {
      0: { vendor: "TGHT", signature: "NOTUNNEL" }
    };
    const serverSupportedTunnelTypes = {};
    for (let i = 0; i < numTunnels; i++) {
      const capCode = this._sock.rQshift32();
      const capVendor = this._sock.rQshiftStr(4);
      const capSignature = this._sock.rQshiftStr(8);
      serverSupportedTunnelTypes[capCode] = { vendor: capVendor, signature: capSignature };
    }
    Debug("Server Tight tunnel types: " + serverSupportedTunnelTypes);
    if (serverSupportedTunnelTypes[1] && serverSupportedTunnelTypes[1].vendor === "SICR" && serverSupportedTunnelTypes[1].signature === "SCHANNEL") {
      Debug("Detected Siemens server. Assuming NOTUNNEL support.");
      serverSupportedTunnelTypes[0] = { vendor: "TGHT", signature: "NOTUNNEL" };
    }
    if (serverSupportedTunnelTypes[0]) {
      if (serverSupportedTunnelTypes[0].vendor != clientSupportedTunnelTypes[0].vendor || serverSupportedTunnelTypes[0].signature != clientSupportedTunnelTypes[0].signature) {
        return this._fail("Client's tunnel type had the incorrect vendor or signature");
      }
      Debug("Selected tunnel type: " + clientSupportedTunnelTypes[0]);
      this._sock.sQpush32(0);
      this._sock.flush();
      return false;
    } else {
      return this._fail("Server wanted tunnels, but doesn't support the notunnel type");
    }
  }
  _negotiateTightAuth() {
    if (!this._rfbTightVNC) {
      if (this._sock.rQwait("num tunnels", 4)) {
        return false;
      }
      const numTunnels = this._sock.rQshift32();
      if (numTunnels > 0 && this._sock.rQwait("tunnel capabilities", 16 * numTunnels, 4)) {
        return false;
      }
      this._rfbTightVNC = true;
      if (numTunnels > 0) {
        this._negotiateTightTunnels(numTunnels);
        return false;
      }
    }
    if (this._sock.rQwait("sub auth count", 4)) {
      return false;
    }
    const subAuthCount = this._sock.rQshift32();
    if (subAuthCount === 0) {
      this._rfbInitState = "SecurityResult";
      return true;
    }
    if (this._sock.rQwait("sub auth capabilities", 16 * subAuthCount, 4)) {
      return false;
    }
    const clientSupportedTypes = {
      "STDVNOAUTH__": 1,
      "STDVVNCAUTH_": 2,
      "TGHTULGNAUTH": 129
    };
    const serverSupportedTypes = [];
    for (let i = 0; i < subAuthCount; i++) {
      this._sock.rQshift32();
      const capabilities = this._sock.rQshiftStr(12);
      serverSupportedTypes.push(capabilities);
    }
    Debug("Server Tight authentication types: " + serverSupportedTypes);
    for (let authType in clientSupportedTypes) {
      if (serverSupportedTypes.indexOf(authType) != -1) {
        this._sock.sQpush32(clientSupportedTypes[authType]);
        this._sock.flush();
        Debug("Selected authentication type: " + authType);
        switch (authType) {
          case "STDVNOAUTH__":
            this._rfbInitState = "SecurityResult";
            return true;
          case "STDVVNCAUTH_":
            this._rfbAuthScheme = securityTypeVNCAuth;
            return true;
          case "TGHTULGNAUTH":
            this._rfbAuthScheme = securityTypeUnixLogon;
            return true;
          default:
            return this._fail("Unsupported tiny auth scheme (scheme: " + authType + ")");
        }
      }
    }
    return this._fail("No supported sub-auth types!");
  }
  _handleRSAAESCredentialsRequired(event) {
    this.dispatchEvent(event);
  }
  _handleRSAAESServerVerification(event) {
    this.dispatchEvent(event);
  }
  _negotiateRA2neAuth() {
    if (this._rfbRSAAESAuthenticationState === null) {
      this._rfbRSAAESAuthenticationState = new RSAAESAuthenticationState(this._sock, () => this._rfbCredentials);
      this._rfbRSAAESAuthenticationState.addEventListener(
        "serververification",
        this._eventHandlers.handleRSAAESServerVerification
      );
      this._rfbRSAAESAuthenticationState.addEventListener(
        "credentialsrequired",
        this._eventHandlers.handleRSAAESCredentialsRequired
      );
    }
    this._rfbRSAAESAuthenticationState.checkInternalEvents();
    if (!this._rfbRSAAESAuthenticationState.hasStarted) {
      this._rfbRSAAESAuthenticationState.negotiateRA2neAuthAsync().catch((e2) => {
        if (e2.message !== "disconnect normally") {
          this._fail(e2.message);
        }
      }).then(() => {
        this._rfbInitState = "SecurityResult";
        return true;
      }).finally(() => {
        this._rfbRSAAESAuthenticationState.removeEventListener(
          "serververification",
          this._eventHandlers.handleRSAAESServerVerification
        );
        this._rfbRSAAESAuthenticationState.removeEventListener(
          "credentialsrequired",
          this._eventHandlers.handleRSAAESCredentialsRequired
        );
        this._rfbRSAAESAuthenticationState = null;
      });
    }
    return false;
  }
  _negotiateMSLogonIIAuth() {
    if (this._sock.rQwait("mslogonii dh param", 24)) {
      return false;
    }
    if (this._rfbCredentials.username === void 0 || this._rfbCredentials.password === void 0) {
      this.dispatchEvent(new CustomEvent(
        "credentialsrequired",
        { detail: { types: ["username", "password"] } }
      ));
      return false;
    }
    const g = this._sock.rQshiftBytes(8);
    const p = this._sock.rQshiftBytes(8);
    const A = this._sock.rQshiftBytes(8);
    const dhKey = crypto_default.generateKey({ name: "DH", g, p }, true, ["deriveBits"]);
    const B2 = crypto_default.exportKey("raw", dhKey.publicKey);
    const secret = crypto_default.deriveBits({ name: "DH", public: A }, dhKey.privateKey, 64);
    const key = crypto_default.importKey("raw", secret, { name: "DES-CBC" }, false, ["encrypt"]);
    const username = encodeUTF8(this._rfbCredentials.username).substring(0, 255);
    const password = encodeUTF8(this._rfbCredentials.password).substring(0, 63);
    let usernameBytes = new Uint8Array(256);
    let passwordBytes = new Uint8Array(64);
    window.crypto.getRandomValues(usernameBytes);
    window.crypto.getRandomValues(passwordBytes);
    for (let i = 0; i < username.length; i++) {
      usernameBytes[i] = username.charCodeAt(i);
    }
    usernameBytes[username.length] = 0;
    for (let i = 0; i < password.length; i++) {
      passwordBytes[i] = password.charCodeAt(i);
    }
    passwordBytes[password.length] = 0;
    usernameBytes = crypto_default.encrypt({ name: "DES-CBC", iv: secret }, key, usernameBytes);
    passwordBytes = crypto_default.encrypt({ name: "DES-CBC", iv: secret }, key, passwordBytes);
    this._sock.sQpushBytes(B2);
    this._sock.sQpushBytes(usernameBytes);
    this._sock.sQpushBytes(passwordBytes);
    this._sock.flush();
    this._rfbInitState = "SecurityResult";
    return true;
  }
  _negotiateAuthentication() {
    switch (this._rfbAuthScheme) {
      case securityTypeNone:
        if (this._rfbVersion >= 3.8) {
          this._rfbInitState = "SecurityResult";
        } else {
          this._rfbInitState = "ClientInitialisation";
        }
        return true;
      case securityTypeXVP:
        return this._negotiateXvpAuth();
      case securityTypeARD:
        return this._negotiateARDAuth();
      case securityTypeVNCAuth:
        return this._negotiateStdVNCAuth();
      case securityTypeTight:
        return this._negotiateTightAuth();
      case securityTypeVeNCrypt:
        return this._negotiateVeNCryptAuth();
      case securityTypePlain:
        return this._negotiatePlainAuth();
      case securityTypeUnixLogon:
        return this._negotiateTightUnixAuth();
      case securityTypeRA2ne:
        return this._negotiateRA2neAuth();
      case securityTypeMSLogonII:
        return this._negotiateMSLogonIIAuth();
      default:
        return this._fail("Unsupported auth scheme (scheme: " + this._rfbAuthScheme + ")");
    }
  }
  _handleSecurityResult() {
    if (this._sock.rQwait("VNC auth response ", 4)) {
      return false;
    }
    const status = this._sock.rQshift32();
    if (status === 0) {
      this._rfbInitState = "ClientInitialisation";
      Debug("Authentication OK");
      return true;
    } else {
      if (this._rfbVersion >= 3.8) {
        this._rfbInitState = "SecurityReason";
        this._securityContext = "security result";
        this._securityStatus = status;
        return true;
      } else {
        this.dispatchEvent(new CustomEvent(
          "securityfailure",
          { detail: { status } }
        ));
        return this._fail("Security handshake failed");
      }
    }
  }
  _negotiateServerInit() {
    if (this._sock.rQwait("server initialization", 24)) {
      return false;
    }
    const width = this._sock.rQshift16();
    const height = this._sock.rQshift16();
    const bpp = this._sock.rQshift8();
    const depth = this._sock.rQshift8();
    const bigEndian = this._sock.rQshift8();
    const trueColor = this._sock.rQshift8();
    const redMax = this._sock.rQshift16();
    const greenMax = this._sock.rQshift16();
    const blueMax = this._sock.rQshift16();
    const redShift = this._sock.rQshift8();
    const greenShift = this._sock.rQshift8();
    const blueShift = this._sock.rQshift8();
    this._sock.rQskipBytes(3);
    const nameLength = this._sock.rQshift32();
    if (this._sock.rQwait("server init name", nameLength, 24)) {
      return false;
    }
    let name = this._sock.rQshiftStr(nameLength);
    name = decodeUTF8(name, true);
    if (this._rfbTightVNC) {
      if (this._sock.rQwait("TightVNC extended server init header", 8, 24 + nameLength)) {
        return false;
      }
      const numServerMessages = this._sock.rQshift16();
      const numClientMessages = this._sock.rQshift16();
      const numEncodings = this._sock.rQshift16();
      this._sock.rQskipBytes(2);
      const totalMessagesLength = (numServerMessages + numClientMessages + numEncodings) * 16;
      if (this._sock.rQwait("TightVNC extended server init header", totalMessagesLength, 32 + nameLength)) {
        return false;
      }
      this._sock.rQskipBytes(16 * numServerMessages);
      this._sock.rQskipBytes(16 * numClientMessages);
      this._sock.rQskipBytes(16 * numEncodings);
    }
    Info("Screen: " + width + "x" + height + ", bpp: " + bpp + ", depth: " + depth + ", bigEndian: " + bigEndian + ", trueColor: " + trueColor + ", redMax: " + redMax + ", greenMax: " + greenMax + ", blueMax: " + blueMax + ", redShift: " + redShift + ", greenShift: " + greenShift + ", blueShift: " + blueShift);
    this._setDesktopName(name);
    this._resize(width, height);
    if (!this._viewOnly) {
      this._keyboard.grab();
    }
    this._fbDepth = 24;
    if (this._fbName === "Intel(r) AMT KVM") {
      Warn("Intel AMT KVM only supports 8/16 bit depths. Using low color mode.");
      this._fbDepth = 8;
    }
    _RFB.messages.pixelFormat(this._sock, this._fbDepth, true);
    this._sendEncodings();
    _RFB.messages.fbUpdateRequest(this._sock, false, 0, 0, this._fbWidth, this._fbHeight);
    this._updateConnectionState("connected");
    return true;
  }
  _sendEncodings() {
    const encs = [];
    encs.push(encodings.encodingCopyRect);
    if (this._fbDepth == 24) {
      if (supportsWebCodecsH264Decode) {
        encs.push(encodings.encodingH264);
      }
      encs.push(encodings.encodingTight);
      encs.push(encodings.encodingTightPNG);
      encs.push(encodings.encodingZRLE);
      encs.push(encodings.encodingJPEG);
      encs.push(encodings.encodingHextile);
      encs.push(encodings.encodingRRE);
      encs.push(encodings.encodingZlib);
    }
    encs.push(encodings.encodingRaw);
    encs.push(encodings.pseudoEncodingQualityLevel0 + this._qualityLevel);
    encs.push(encodings.pseudoEncodingCompressLevel0 + this._compressionLevel);
    encs.push(encodings.pseudoEncodingDesktopSize);
    encs.push(encodings.pseudoEncodingLastRect);
    encs.push(encodings.pseudoEncodingQEMUExtendedKeyEvent);
    encs.push(encodings.pseudoEncodingQEMULedEvent);
    encs.push(encodings.pseudoEncodingExtendedDesktopSize);
    encs.push(encodings.pseudoEncodingXvp);
    encs.push(encodings.pseudoEncodingFence);
    encs.push(encodings.pseudoEncodingContinuousUpdates);
    encs.push(encodings.pseudoEncodingDesktopName);
    encs.push(encodings.pseudoEncodingExtendedClipboard);
    encs.push(encodings.pseudoEncodingExtendedMouseButtons);
    if (this._fbDepth == 24) {
      encs.push(encodings.pseudoEncodingVMwareCursor);
      encs.push(encodings.pseudoEncodingCursor);
    }
    _RFB.messages.clientEncodings(this._sock, encs);
  }
  /* RFB protocol initialization states:
   *   ProtocolVersion
   *   Security
   *   Authentication
   *   SecurityResult
   *   ClientInitialization - not triggered by server message
   *   ServerInitialization
   */
  _initMsg() {
    switch (this._rfbInitState) {
      case "ProtocolVersion":
        return this._negotiateProtocolVersion();
      case "Security":
        return this._negotiateSecurity();
      case "Authentication":
        return this._negotiateAuthentication();
      case "SecurityResult":
        return this._handleSecurityResult();
      case "SecurityReason":
        return this._handleSecurityReason();
      case "ClientInitialisation":
        this._sock.sQpush8(this._shared ? 1 : 0);
        this._sock.flush();
        this._rfbInitState = "ServerInitialisation";
        return true;
      case "ServerInitialisation":
        return this._negotiateServerInit();
      default:
        return this._fail("Unknown init state (state: " + this._rfbInitState + ")");
    }
  }
  // Resume authentication handshake after it was paused for some
  // reason, e.g. waiting for a password from the user
  _resumeAuthentication() {
    setTimeout(this._initMsg.bind(this), 0);
  }
  _handleSetColourMapMsg() {
    Debug("SetColorMapEntries");
    return this._fail("Unexpected SetColorMapEntries message");
  }
  _handleServerCutText() {
    Debug("ServerCutText");
    if (this._sock.rQwait("ServerCutText header", 7, 1)) {
      return false;
    }
    this._sock.rQskipBytes(3);
    let length = this._sock.rQshift32();
    length = toSigned32bit(length);
    if (this._sock.rQwait("ServerCutText content", Math.abs(length), 8)) {
      return false;
    }
    if (length >= 0) {
      const text = this._sock.rQshiftStr(length);
      if (this._viewOnly) {
        return true;
      }
      this.dispatchEvent(new CustomEvent(
        "clipboard",
        { detail: { text } }
      ));
    } else {
      length = Math.abs(length);
      const flags = this._sock.rQshift32();
      let formats = flags & 65535;
      let actions = flags & 4278190080;
      let isCaps = !!(actions & extendedClipboardActionCaps);
      if (isCaps) {
        this._clipboardServerCapabilitiesFormats = {};
        this._clipboardServerCapabilitiesActions = {};
        for (let i = 0; i <= 15; i++) {
          let index = 1 << i;
          if (formats & index) {
            this._clipboardServerCapabilitiesFormats[index] = true;
            this._sock.rQshift32();
          }
        }
        for (let i = 24; i <= 31; i++) {
          let index = 1 << i;
          this._clipboardServerCapabilitiesActions[index] = !!(actions & index);
        }
        let clientActions = [
          extendedClipboardActionCaps,
          extendedClipboardActionRequest,
          extendedClipboardActionPeek,
          extendedClipboardActionNotify,
          extendedClipboardActionProvide
        ];
        _RFB.messages.extendedClipboardCaps(this._sock, clientActions, { extendedClipboardFormatText: 0 });
      } else if (actions === extendedClipboardActionRequest) {
        if (this._viewOnly) {
          return true;
        }
        if (this._clipboardText != null && this._clipboardServerCapabilitiesActions[extendedClipboardActionProvide]) {
          if (formats & extendedClipboardFormatText) {
            _RFB.messages.extendedClipboardProvide(this._sock, [extendedClipboardFormatText], [this._clipboardText]);
          }
        }
      } else if (actions === extendedClipboardActionPeek) {
        if (this._viewOnly) {
          return true;
        }
        if (this._clipboardServerCapabilitiesActions[extendedClipboardActionNotify]) {
          if (this._clipboardText != null) {
            _RFB.messages.extendedClipboardNotify(this._sock, [extendedClipboardFormatText]);
          } else {
            _RFB.messages.extendedClipboardNotify(this._sock, []);
          }
        }
      } else if (actions === extendedClipboardActionNotify) {
        if (this._viewOnly) {
          return true;
        }
        if (this._clipboardServerCapabilitiesActions[extendedClipboardActionRequest]) {
          if (formats & extendedClipboardFormatText) {
            _RFB.messages.extendedClipboardRequest(this._sock, [extendedClipboardFormatText]);
          }
        }
      } else if (actions === extendedClipboardActionProvide) {
        if (this._viewOnly) {
          return true;
        }
        if (!(formats & extendedClipboardFormatText)) {
          return true;
        }
        this._clipboardText = null;
        let zlibStream = this._sock.rQshiftBytes(length - 4);
        let streamInflator = new Inflate();
        let textData = null;
        streamInflator.setInput(zlibStream);
        for (let i = 0; i <= 15; i++) {
          let format = 1 << i;
          if (formats & format) {
            let size = 0;
            let sizeArray = streamInflator.inflate(4);
            size |= sizeArray[0] << 24;
            size |= sizeArray[1] << 16;
            size |= sizeArray[2] << 8;
            size |= sizeArray[3];
            let chunk = streamInflator.inflate(size);
            if (format === extendedClipboardFormatText) {
              textData = chunk;
            }
          }
        }
        streamInflator.setInput(null);
        if (textData !== null) {
          let tmpText = "";
          for (let i = 0; i < textData.length; i++) {
            tmpText += String.fromCharCode(textData[i]);
          }
          textData = tmpText;
          textData = decodeUTF8(textData);
          if (textData.length > 0 && "\0" === textData.charAt(textData.length - 1)) {
            textData = textData.slice(0, -1);
          }
          textData = textData.replaceAll("\r\n", "\n");
          this.dispatchEvent(new CustomEvent(
            "clipboard",
            { detail: { text: textData } }
          ));
        }
      } else {
        return this._fail("Unexpected action in extended clipboard message: " + actions);
      }
    }
    return true;
  }
  _handleServerFenceMsg() {
    if (this._sock.rQwait("ServerFence header", 8, 1)) {
      return false;
    }
    this._sock.rQskipBytes(3);
    let flags = this._sock.rQshift32();
    let length = this._sock.rQshift8();
    if (this._sock.rQwait("ServerFence payload", length, 9)) {
      return false;
    }
    if (length > 64) {
      Warn("Bad payload length (" + length + ") in fence response");
      length = 64;
    }
    const payload = this._sock.rQshiftStr(length);
    this._supportsFence = true;
    if (!(flags & 1 << 31)) {
      return this._fail("Unexpected fence response");
    }
    flags &= 1 << 0 | 1 << 1;
    _RFB.messages.clientFence(this._sock, flags, payload);
    return true;
  }
  _handleXvpMsg() {
    if (this._sock.rQwait("XVP version and message", 3, 1)) {
      return false;
    }
    this._sock.rQskipBytes(1);
    const xvpVer = this._sock.rQshift8();
    const xvpMsg = this._sock.rQshift8();
    switch (xvpMsg) {
      case 0:
        Error2("XVP operation failed");
        break;
      case 1:
        this._rfbXvpVer = xvpVer;
        Info("XVP extensions enabled (version " + this._rfbXvpVer + ")");
        this._setCapability("power", true);
        break;
      default:
        this._fail("Illegal server XVP message (msg: " + xvpMsg + ")");
        break;
    }
    return true;
  }
  _normalMsg() {
    let msgType;
    if (this._FBU.rects > 0) {
      msgType = 0;
    } else {
      msgType = this._sock.rQshift8();
    }
    let first, ret;
    switch (msgType) {
      case 0:
        ret = this._framebufferUpdate();
        if (ret && !this._enabledContinuousUpdates) {
          _RFB.messages.fbUpdateRequest(
            this._sock,
            true,
            0,
            0,
            this._fbWidth,
            this._fbHeight
          );
        }
        return ret;
      case 1:
        return this._handleSetColourMapMsg();
      case 2:
        Debug("Bell");
        this.dispatchEvent(new CustomEvent(
          "bell",
          { detail: {} }
        ));
        return true;
      case 3:
        return this._handleServerCutText();
      case 150:
        first = !this._supportsContinuousUpdates;
        this._supportsContinuousUpdates = true;
        this._enabledContinuousUpdates = false;
        if (first) {
          this._enabledContinuousUpdates = true;
          this._updateContinuousUpdates();
          Info("Enabling continuous updates.");
        } else {
        }
        return true;
      case 248:
        return this._handleServerFenceMsg();
      case 250:
        return this._handleXvpMsg();
      default:
        this._fail("Unexpected server message (type " + msgType + ")");
        Debug("sock.rQpeekBytes(30): " + this._sock.rQpeekBytes(30));
        return true;
    }
  }
  _framebufferUpdate() {
    if (this._FBU.rects === 0) {
      if (this._sock.rQwait("FBU header", 3, 1)) {
        return false;
      }
      this._sock.rQskipBytes(1);
      this._FBU.rects = this._sock.rQshift16();
      if (this._display.pending()) {
        this._flushing = true;
        this._display.flush().then(() => {
          this._flushing = false;
          if (!this._sock.rQwait("message", 1)) {
            this._handleMessage();
          }
        });
        return false;
      }
    }
    while (this._FBU.rects > 0) {
      if (this._FBU.encoding === null) {
        if (this._sock.rQwait("rect header", 12)) {
          return false;
        }
        this._FBU.x = this._sock.rQshift16();
        this._FBU.y = this._sock.rQshift16();
        this._FBU.width = this._sock.rQshift16();
        this._FBU.height = this._sock.rQshift16();
        this._FBU.encoding = this._sock.rQshift32();
        this._FBU.encoding >>= 0;
      }
      if (!this._handleRect()) {
        return false;
      }
      this._FBU.rects--;
      this._FBU.encoding = null;
    }
    this._display.flip();
    return true;
  }
  _handleRect() {
    switch (this._FBU.encoding) {
      case encodings.pseudoEncodingLastRect:
        this._FBU.rects = 1;
        return true;
      case encodings.pseudoEncodingVMwareCursor:
        return this._handleVMwareCursor();
      case encodings.pseudoEncodingCursor:
        return this._handleCursor();
      case encodings.pseudoEncodingQEMUExtendedKeyEvent:
        this._qemuExtKeyEventSupported = true;
        return true;
      case encodings.pseudoEncodingDesktopName:
        return this._handleDesktopName();
      case encodings.pseudoEncodingDesktopSize:
        this._resize(this._FBU.width, this._FBU.height);
        return true;
      case encodings.pseudoEncodingExtendedDesktopSize:
        return this._handleExtendedDesktopSize();
      case encodings.pseudoEncodingExtendedMouseButtons:
        this._extendedPointerEventSupported = true;
        return true;
      case encodings.pseudoEncodingQEMULedEvent:
        return this._handleLedEvent();
      default:
        return this._handleDataRect();
    }
  }
  _handleVMwareCursor() {
    const hotx = this._FBU.x;
    const hoty = this._FBU.y;
    const w = this._FBU.width;
    const h2 = this._FBU.height;
    if (this._sock.rQwait("VMware cursor encoding", 1)) {
      return false;
    }
    const cursorType = this._sock.rQshift8();
    this._sock.rQshift8();
    let rgba;
    const bytesPerPixel = 4;
    if (cursorType == 0) {
      const PIXEL_MASK = 4294967040 | 0;
      rgba = new Array(w * h2 * bytesPerPixel);
      if (this._sock.rQwait(
        "VMware cursor classic encoding",
        w * h2 * bytesPerPixel * 2,
        2
      )) {
        return false;
      }
      let andMask = new Array(w * h2);
      for (let pixel = 0; pixel < w * h2; pixel++) {
        andMask[pixel] = this._sock.rQshift32();
      }
      let xorMask = new Array(w * h2);
      for (let pixel = 0; pixel < w * h2; pixel++) {
        xorMask[pixel] = this._sock.rQshift32();
      }
      for (let pixel = 0; pixel < w * h2; pixel++) {
        if (andMask[pixel] == 0) {
          let bgr = xorMask[pixel];
          let r = bgr >> 8 & 255;
          let g = bgr >> 16 & 255;
          let b3 = bgr >> 24 & 255;
          rgba[pixel * bytesPerPixel] = r;
          rgba[pixel * bytesPerPixel + 1] = g;
          rgba[pixel * bytesPerPixel + 2] = b3;
          rgba[pixel * bytesPerPixel + 3] = 255;
        } else if ((andMask[pixel] & PIXEL_MASK) == PIXEL_MASK) {
          if (xorMask[pixel] == 0) {
            rgba[pixel * bytesPerPixel] = 0;
            rgba[pixel * bytesPerPixel + 1] = 0;
            rgba[pixel * bytesPerPixel + 2] = 0;
            rgba[pixel * bytesPerPixel + 3] = 0;
          } else if ((xorMask[pixel] & PIXEL_MASK) == PIXEL_MASK) {
            rgba[pixel * bytesPerPixel] = 0;
            rgba[pixel * bytesPerPixel + 1] = 0;
            rgba[pixel * bytesPerPixel + 2] = 0;
            rgba[pixel * bytesPerPixel + 3] = 255;
          } else {
            rgba[pixel * bytesPerPixel] = 0;
            rgba[pixel * bytesPerPixel + 1] = 0;
            rgba[pixel * bytesPerPixel + 2] = 0;
            rgba[pixel * bytesPerPixel + 3] = 255;
          }
        } else {
          rgba[pixel * bytesPerPixel] = 0;
          rgba[pixel * bytesPerPixel + 1] = 0;
          rgba[pixel * bytesPerPixel + 2] = 0;
          rgba[pixel * bytesPerPixel + 3] = 255;
        }
      }
    } else if (cursorType == 1) {
      if (this._sock.rQwait(
        "VMware cursor alpha encoding",
        w * h2 * 4,
        2
      )) {
        return false;
      }
      rgba = new Array(w * h2 * bytesPerPixel);
      for (let pixel = 0; pixel < w * h2; pixel++) {
        let data = this._sock.rQshift32();
        rgba[pixel * 4] = data >> 24 & 255;
        rgba[pixel * 4 + 1] = data >> 16 & 255;
        rgba[pixel * 4 + 2] = data >> 8 & 255;
        rgba[pixel * 4 + 3] = data & 255;
      }
    } else {
      Warn("The given cursor type is not supported: " + cursorType + " given.");
      return false;
    }
    this._updateCursor(rgba, hotx, hoty, w, h2);
    return true;
  }
  _handleCursor() {
    const hotx = this._FBU.x;
    const hoty = this._FBU.y;
    const w = this._FBU.width;
    const h2 = this._FBU.height;
    const pixelslength = w * h2 * 4;
    const masklength = Math.ceil(w / 8) * h2;
    let bytes = pixelslength + masklength;
    if (this._sock.rQwait("cursor encoding", bytes)) {
      return false;
    }
    const pixels = this._sock.rQshiftBytes(pixelslength);
    const mask = this._sock.rQshiftBytes(masklength);
    let rgba = new Uint8Array(w * h2 * 4);
    let pixIdx = 0;
    for (let y = 0; y < h2; y++) {
      for (let x = 0; x < w; x++) {
        let maskIdx = y * Math.ceil(w / 8) + Math.floor(x / 8);
        let alpha = mask[maskIdx] << x % 8 & 128 ? 255 : 0;
        rgba[pixIdx] = pixels[pixIdx + 2];
        rgba[pixIdx + 1] = pixels[pixIdx + 1];
        rgba[pixIdx + 2] = pixels[pixIdx];
        rgba[pixIdx + 3] = alpha;
        pixIdx += 4;
      }
    }
    this._updateCursor(rgba, hotx, hoty, w, h2);
    return true;
  }
  _handleDesktopName() {
    if (this._sock.rQwait("DesktopName", 4)) {
      return false;
    }
    let length = this._sock.rQshift32();
    if (this._sock.rQwait("DesktopName", length, 4)) {
      return false;
    }
    let name = this._sock.rQshiftStr(length);
    name = decodeUTF8(name, true);
    this._setDesktopName(name);
    return true;
  }
  _handleLedEvent() {
    if (this._sock.rQwait("LED status", 1)) {
      return false;
    }
    let data = this._sock.rQshift8();
    let numLock = data & 2 ? true : false;
    let capsLock = data & 4 ? true : false;
    this._remoteCapsLock = capsLock;
    this._remoteNumLock = numLock;
    return true;
  }
  _handleExtendedDesktopSize() {
    if (this._sock.rQwait("ExtendedDesktopSize", 4)) {
      return false;
    }
    const numberOfScreens = this._sock.rQpeek8();
    let bytes = 4 + numberOfScreens * 16;
    if (this._sock.rQwait("ExtendedDesktopSize", bytes)) {
      return false;
    }
    const firstUpdate = !this._supportsSetDesktopSize;
    this._supportsSetDesktopSize = true;
    this._sock.rQskipBytes(1);
    this._sock.rQskipBytes(3);
    for (let i = 0; i < numberOfScreens; i += 1) {
      if (i === 0) {
        this._screenID = this._sock.rQshift32();
        this._sock.rQskipBytes(2);
        this._sock.rQskipBytes(2);
        this._sock.rQskipBytes(2);
        this._sock.rQskipBytes(2);
        this._screenFlags = this._sock.rQshift32();
      } else {
        this._sock.rQskipBytes(16);
      }
    }
    if (this._FBU.x === 1) {
      this._pendingRemoteResize = false;
    }
    if (this._FBU.x === 1 && this._FBU.y !== 0) {
      let msg = "";
      switch (this._FBU.y) {
        case 1:
          msg = "Resize is administratively prohibited";
          break;
        case 2:
          msg = "Out of resources";
          break;
        case 3:
          msg = "Invalid screen layout";
          break;
        default:
          msg = "Unknown reason";
          break;
      }
      Warn("Server did not accept the resize request: " + msg);
    } else {
      this._resize(this._FBU.width, this._FBU.height);
    }
    if (firstUpdate) {
      this._requestRemoteResize();
    }
    if (this._FBU.x === 1 && this._FBU.y === 0) {
      this._requestRemoteResize();
    }
    return true;
  }
  _handleDataRect() {
    let decoder = this._decoders[this._FBU.encoding];
    if (!decoder) {
      this._fail("Unsupported encoding (encoding: " + this._FBU.encoding + ")");
      return false;
    }
    try {
      return decoder.decodeRect(
        this._FBU.x,
        this._FBU.y,
        this._FBU.width,
        this._FBU.height,
        this._sock,
        this._display,
        this._fbDepth
      );
    } catch (err2) {
      this._fail("Error decoding rect: " + err2);
      return false;
    }
  }
  _updateContinuousUpdates() {
    if (!this._enabledContinuousUpdates) {
      return;
    }
    _RFB.messages.enableContinuousUpdates(
      this._sock,
      true,
      0,
      0,
      this._fbWidth,
      this._fbHeight
    );
  }
  // Handle resize-messages from the server
  _resize(width, height) {
    this._fbWidth = width;
    this._fbHeight = height;
    this._display.resize(this._fbWidth, this._fbHeight);
    this._updateClip();
    this._updateScale();
    this._updateContinuousUpdates();
    this._saveExpectedClientSize();
  }
  _xvpOp(ver, op) {
    if (this._rfbXvpVer < ver) {
      return;
    }
    Info("Sending XVP operation " + op + " (version " + ver + ")");
    _RFB.messages.xvpOp(this._sock, ver, op);
  }
  _updateCursor(rgba, hotx, hoty, w, h2) {
    this._cursorImage = {
      rgbaPixels: rgba,
      hotx,
      hoty,
      w,
      h: h2
    };
    this._refreshCursor();
  }
  _shouldShowDotCursor() {
    if (!this._showDotCursor) {
      return false;
    }
    for (let i = 3; i < this._cursorImage.rgbaPixels.length; i += 4) {
      if (this._cursorImage.rgbaPixels[i]) {
        return false;
      }
    }
    return true;
  }
  _refreshCursor() {
    if (this._rfbConnectionState !== "connecting" && this._rfbConnectionState !== "connected") {
      return;
    }
    const image = this._shouldShowDotCursor() ? _RFB.cursors.dot : this._cursorImage;
    this._cursor.change(
      image.rgbaPixels,
      image.hotx,
      image.hoty,
      image.w,
      image.h
    );
  }
  static genDES(password, challenge) {
    const passwordChars = password.split("").map((c2) => c2.charCodeAt(0));
    const key = crypto_default.importKey(
      "raw",
      passwordChars,
      { name: "DES-ECB" },
      false,
      ["encrypt"]
    );
    return crypto_default.encrypt({ name: "DES-ECB" }, key, challenge);
  }
};
RFB.messages = {
  keyEvent(sock, keysym, down) {
    sock.sQpush8(4);
    sock.sQpush8(down);
    sock.sQpush16(0);
    sock.sQpush32(keysym);
    sock.flush();
  },
  QEMUExtendedKeyEvent(sock, keysym, down, keycode) {
    function getRFBkeycode(xtScanCode) {
      const upperByte = keycode >> 8;
      const lowerByte = keycode & 255;
      if (upperByte === 224 && lowerByte < 127) {
        return lowerByte | 128;
      }
      return xtScanCode;
    }
    sock.sQpush8(255);
    sock.sQpush8(0);
    sock.sQpush16(down);
    sock.sQpush32(keysym);
    const RFBkeycode = getRFBkeycode(keycode);
    sock.sQpush32(RFBkeycode);
    sock.flush();
  },
  pointerEvent(sock, x, y, mask) {
    sock.sQpush8(5);
    mask = mask & 127;
    sock.sQpush8(mask);
    sock.sQpush16(x);
    sock.sQpush16(y);
    sock.flush();
  },
  extendedPointerEvent(sock, x, y, mask) {
    sock.sQpush8(5);
    let higherBits = mask >> 7 & 255;
    if (higherBits & 252) {
      throw new Error("Invalid mouse button mask: " + mask);
    }
    let lowerBits = mask & 127;
    lowerBits |= 128;
    sock.sQpush8(lowerBits);
    sock.sQpush16(x);
    sock.sQpush16(y);
    sock.sQpush8(higherBits);
    sock.flush();
  },
  // Used to build Notify and Request data.
  _buildExtendedClipboardFlags(actions, formats) {
    let data = new Uint8Array(4);
    let formatFlag = 0;
    let actionFlag = 0;
    for (let i = 0; i < actions.length; i++) {
      actionFlag |= actions[i];
    }
    for (let i = 0; i < formats.length; i++) {
      formatFlag |= formats[i];
    }
    data[0] = actionFlag >> 24;
    data[1] = 0;
    data[2] = 0;
    data[3] = formatFlag;
    return data;
  },
  extendedClipboardProvide(sock, formats, inData) {
    let deflator = new Deflator();
    let dataToDeflate = [];
    for (let i = 0; i < formats.length; i++) {
      if (formats[i] != extendedClipboardFormatText) {
        throw new Error("Unsupported extended clipboard format for Provide message.");
      }
      inData[i] = inData[i].replace(/\r\n|\r|\n/gm, "\r\n");
      let text = encodeUTF8(inData[i] + "\0");
      dataToDeflate.push(
        text.length >> 24 & 255,
        text.length >> 16 & 255,
        text.length >> 8 & 255,
        text.length & 255
      );
      for (let j2 = 0; j2 < text.length; j2++) {
        dataToDeflate.push(text.charCodeAt(j2));
      }
    }
    let deflatedData = deflator.deflate(new Uint8Array(dataToDeflate));
    let data = new Uint8Array(4 + deflatedData.length);
    data.set(RFB.messages._buildExtendedClipboardFlags(
      [extendedClipboardActionProvide],
      formats
    ));
    data.set(deflatedData, 4);
    RFB.messages.clientCutText(sock, data, true);
  },
  extendedClipboardNotify(sock, formats) {
    let flags = RFB.messages._buildExtendedClipboardFlags(
      [extendedClipboardActionNotify],
      formats
    );
    RFB.messages.clientCutText(sock, flags, true);
  },
  extendedClipboardRequest(sock, formats) {
    let flags = RFB.messages._buildExtendedClipboardFlags(
      [extendedClipboardActionRequest],
      formats
    );
    RFB.messages.clientCutText(sock, flags, true);
  },
  extendedClipboardCaps(sock, actions, formats) {
    let formatKeys = Object.keys(formats);
    let data = new Uint8Array(4 + 4 * formatKeys.length);
    formatKeys.map((x) => parseInt(x));
    formatKeys.sort((a2, b3) => a2 - b3);
    data.set(RFB.messages._buildExtendedClipboardFlags(actions, []));
    let loopOffset = 4;
    for (let i = 0; i < formatKeys.length; i++) {
      data[loopOffset] = formats[formatKeys[i]] >> 24;
      data[loopOffset + 1] = formats[formatKeys[i]] >> 16;
      data[loopOffset + 2] = formats[formatKeys[i]] >> 8;
      data[loopOffset + 3] = formats[formatKeys[i]] >> 0;
      loopOffset += 4;
      data[3] |= 1 << formatKeys[i];
    }
    RFB.messages.clientCutText(sock, data, true);
  },
  clientCutText(sock, data, extended = false) {
    sock.sQpush8(6);
    sock.sQpush8(0);
    sock.sQpush8(0);
    sock.sQpush8(0);
    let length;
    if (extended) {
      length = toUnsigned32bit(-data.length);
    } else {
      length = data.length;
    }
    sock.sQpush32(length);
    sock.sQpushBytes(data);
    sock.flush();
  },
  setDesktopSize(sock, width, height, id, flags) {
    sock.sQpush8(251);
    sock.sQpush8(0);
    sock.sQpush16(width);
    sock.sQpush16(height);
    sock.sQpush8(1);
    sock.sQpush8(0);
    sock.sQpush32(id);
    sock.sQpush16(0);
    sock.sQpush16(0);
    sock.sQpush16(width);
    sock.sQpush16(height);
    sock.sQpush32(flags);
    sock.flush();
  },
  clientFence(sock, flags, payload) {
    sock.sQpush8(248);
    sock.sQpush8(0);
    sock.sQpush8(0);
    sock.sQpush8(0);
    sock.sQpush32(flags);
    sock.sQpush8(payload.length);
    sock.sQpushString(payload);
    sock.flush();
  },
  enableContinuousUpdates(sock, enable, x, y, width, height) {
    sock.sQpush8(150);
    sock.sQpush8(enable);
    sock.sQpush16(x);
    sock.sQpush16(y);
    sock.sQpush16(width);
    sock.sQpush16(height);
    sock.flush();
  },
  pixelFormat(sock, depth, trueColor) {
    let bpp;
    if (depth > 16) {
      bpp = 32;
    } else if (depth > 8) {
      bpp = 16;
    } else {
      bpp = 8;
    }
    const bits = Math.floor(depth / 3);
    sock.sQpush8(0);
    sock.sQpush8(0);
    sock.sQpush8(0);
    sock.sQpush8(0);
    sock.sQpush8(bpp);
    sock.sQpush8(depth);
    sock.sQpush8(0);
    sock.sQpush8(trueColor ? 1 : 0);
    sock.sQpush16((1 << bits) - 1);
    sock.sQpush16((1 << bits) - 1);
    sock.sQpush16((1 << bits) - 1);
    sock.sQpush8(bits * 0);
    sock.sQpush8(bits * 1);
    sock.sQpush8(bits * 2);
    sock.sQpush8(0);
    sock.sQpush8(0);
    sock.sQpush8(0);
    sock.flush();
  },
  clientEncodings(sock, encodings2) {
    sock.sQpush8(2);
    sock.sQpush8(0);
    sock.sQpush16(encodings2.length);
    for (let i = 0; i < encodings2.length; i++) {
      sock.sQpush32(encodings2[i]);
    }
    sock.flush();
  },
  fbUpdateRequest(sock, incremental, x, y, w, h2) {
    if (typeof x === "undefined") {
      x = 0;
    }
    if (typeof y === "undefined") {
      y = 0;
    }
    sock.sQpush8(3);
    sock.sQpush8(incremental ? 1 : 0);
    sock.sQpush16(x);
    sock.sQpush16(y);
    sock.sQpush16(w);
    sock.sQpush16(h2);
    sock.flush();
  },
  xvpOp(sock, ver, op) {
    sock.sQpush8(250);
    sock.sQpush8(0);
    sock.sQpush8(ver);
    sock.sQpush8(op);
    sock.flush();
  }
};
RFB.cursors = {
  none: {
    rgbaPixels: new Uint8Array(),
    w: 0,
    h: 0,
    hotx: 0,
    hoty: 0
  },
  dot: {
    /* eslint-disable indent */
    rgbaPixels: new Uint8Array([
      255,
      255,
      255,
      255,
      0,
      0,
      0,
      255,
      255,
      255,
      255,
      255,
      0,
      0,
      0,
      255,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      255,
      255,
      255,
      255,
      255,
      0,
      0,
      0,
      255,
      255,
      255,
      255,
      255
    ]),
    /* eslint-enable indent */
    w: 3,
    h: 3,
    hotx: 1,
    hoty: 1
  }
};

// node_modules/@xterm/xterm/lib/xterm.mjs
var zs = Object.defineProperty;
var Rl = Object.getOwnPropertyDescriptor;
var Ll = (s15, t) => {
  for (var e2 in t) zs(s15, e2, { get: t[e2], enumerable: true });
};
var M2 = (s15, t, e2, i) => {
  for (var r = i > 1 ? void 0 : i ? Rl(t, e2) : t, n = s15.length - 1, o2; n >= 0; n--) (o2 = s15[n]) && (r = (i ? o2(t, e2, r) : o2(r)) || r);
  return i && r && zs(t, e2, r), r;
};
var S = (s15, t) => (e2, i) => t(e2, i, s15);
var Gs = "Terminal input";
var mi = { get: () => Gs, set: (s15) => Gs = s15 };
var $s = "Too much output to announce, navigate to rows manually to read";
var _i = { get: () => $s, set: (s15) => $s = s15 };
function Al(s15) {
  return s15.replace(/\r?\n/g, "\r");
}
function kl(s15, t) {
  return t ? "\x1B[200~" + s15 + "\x1B[201~" : s15;
}
function Vs(s15, t) {
  s15.clipboardData && s15.clipboardData.setData("text/plain", t.selectionText), s15.preventDefault();
}
function qs(s15, t, e2, i) {
  if (s15.stopPropagation(), s15.clipboardData) {
    let r = s15.clipboardData.getData("text/plain");
    Cn(r, t, e2, i);
  }
}
function Cn(s15, t, e2, i) {
  s15 = Al(s15), s15 = kl(s15, e2.decPrivateModes.bracketedPasteMode && i.rawOptions.ignoreBracketedPasteMode !== true), e2.triggerDataEvent(s15, true), t.value = "";
}
function Mn(s15, t, e2) {
  let i = e2.getBoundingClientRect(), r = s15.clientX - i.left - 10, n = s15.clientY - i.top - 10;
  t.style.width = "20px", t.style.height = "20px", t.style.left = `${r}px`, t.style.top = `${n}px`, t.style.zIndex = "1000", t.focus();
}
function Pn(s15, t, e2, i, r) {
  Mn(s15, t, e2), r && i.rightClickSelect(s15), t.value = i.selectionText, t.select();
}
function Ce(s15) {
  return s15 > 65535 ? (s15 -= 65536, String.fromCharCode((s15 >> 10) + 55296) + String.fromCharCode(s15 % 1024 + 56320)) : String.fromCharCode(s15);
}
function It(s15, t = 0, e2 = s15.length) {
  let i = "";
  for (let r = t; r < e2; ++r) {
    let n = s15[r];
    n > 65535 ? (n -= 65536, i += String.fromCharCode((n >> 10) + 55296) + String.fromCharCode(n % 1024 + 56320)) : i += String.fromCharCode(n);
  }
  return i;
}
var er = class {
  constructor() {
    this._interim = 0;
  }
  clear() {
    this._interim = 0;
  }
  decode(t, e2) {
    let i = t.length;
    if (!i) return 0;
    let r = 0, n = 0;
    if (this._interim) {
      let o2 = t.charCodeAt(n++);
      56320 <= o2 && o2 <= 57343 ? e2[r++] = (this._interim - 55296) * 1024 + o2 - 56320 + 65536 : (e2[r++] = this._interim, e2[r++] = o2), this._interim = 0;
    }
    for (let o2 = n; o2 < i; ++o2) {
      let l = t.charCodeAt(o2);
      if (55296 <= l && l <= 56319) {
        if (++o2 >= i) return this._interim = l, r;
        let a2 = t.charCodeAt(o2);
        56320 <= a2 && a2 <= 57343 ? e2[r++] = (l - 55296) * 1024 + a2 - 56320 + 65536 : (e2[r++] = l, e2[r++] = a2);
        continue;
      }
      l !== 65279 && (e2[r++] = l);
    }
    return r;
  }
};
var tr = class {
  constructor() {
    this.interim = new Uint8Array(3);
  }
  clear() {
    this.interim.fill(0);
  }
  decode(t, e2) {
    let i = t.length;
    if (!i) return 0;
    let r = 0, n, o2, l, a2, u = 0, h2 = 0;
    if (this.interim[0]) {
      let _2 = false, p = this.interim[0];
      p &= (p & 224) === 192 ? 31 : (p & 240) === 224 ? 15 : 7;
      let m = 0, f2;
      for (; (f2 = this.interim[++m] & 63) && m < 4; ) p <<= 6, p |= f2;
      let A = (this.interim[0] & 224) === 192 ? 2 : (this.interim[0] & 240) === 224 ? 3 : 4, R = A - m;
      for (; h2 < R; ) {
        if (h2 >= i) return 0;
        if (f2 = t[h2++], (f2 & 192) !== 128) {
          h2--, _2 = true;
          break;
        } else this.interim[m++] = f2, p <<= 6, p |= f2 & 63;
      }
      _2 || (A === 2 ? p < 128 ? h2-- : e2[r++] = p : A === 3 ? p < 2048 || p >= 55296 && p <= 57343 || p === 65279 || (e2[r++] = p) : p < 65536 || p > 1114111 || (e2[r++] = p)), this.interim.fill(0);
    }
    let c2 = i - 4, d2 = h2;
    for (; d2 < i; ) {
      for (; d2 < c2 && !((n = t[d2]) & 128) && !((o2 = t[d2 + 1]) & 128) && !((l = t[d2 + 2]) & 128) && !((a2 = t[d2 + 3]) & 128); ) e2[r++] = n, e2[r++] = o2, e2[r++] = l, e2[r++] = a2, d2 += 4;
      if (n = t[d2++], n < 128) e2[r++] = n;
      else if ((n & 224) === 192) {
        if (d2 >= i) return this.interim[0] = n, r;
        if (o2 = t[d2++], (o2 & 192) !== 128) {
          d2--;
          continue;
        }
        if (u = (n & 31) << 6 | o2 & 63, u < 128) {
          d2--;
          continue;
        }
        e2[r++] = u;
      } else if ((n & 240) === 224) {
        if (d2 >= i) return this.interim[0] = n, r;
        if (o2 = t[d2++], (o2 & 192) !== 128) {
          d2--;
          continue;
        }
        if (d2 >= i) return this.interim[0] = n, this.interim[1] = o2, r;
        if (l = t[d2++], (l & 192) !== 128) {
          d2--;
          continue;
        }
        if (u = (n & 15) << 12 | (o2 & 63) << 6 | l & 63, u < 2048 || u >= 55296 && u <= 57343 || u === 65279) continue;
        e2[r++] = u;
      } else if ((n & 248) === 240) {
        if (d2 >= i) return this.interim[0] = n, r;
        if (o2 = t[d2++], (o2 & 192) !== 128) {
          d2--;
          continue;
        }
        if (d2 >= i) return this.interim[0] = n, this.interim[1] = o2, r;
        if (l = t[d2++], (l & 192) !== 128) {
          d2--;
          continue;
        }
        if (d2 >= i) return this.interim[0] = n, this.interim[1] = o2, this.interim[2] = l, r;
        if (a2 = t[d2++], (a2 & 192) !== 128) {
          d2--;
          continue;
        }
        if (u = (n & 7) << 18 | (o2 & 63) << 12 | (l & 63) << 6 | a2 & 63, u < 65536 || u > 1114111) continue;
        e2[r++] = u;
      }
    }
    return r;
  }
};
var ir = "";
var we = " ";
var De = class s {
  constructor() {
    this.fg = 0;
    this.bg = 0;
    this.extended = new rt();
  }
  static toColorRGB(t) {
    return [t >>> 16 & 255, t >>> 8 & 255, t & 255];
  }
  static fromColorRGB(t) {
    return (t[0] & 255) << 16 | (t[1] & 255) << 8 | t[2] & 255;
  }
  clone() {
    let t = new s();
    return t.fg = this.fg, t.bg = this.bg, t.extended = this.extended.clone(), t;
  }
  isInverse() {
    return this.fg & 67108864;
  }
  isBold() {
    return this.fg & 134217728;
  }
  isUnderline() {
    return this.hasExtendedAttrs() && this.extended.underlineStyle !== 0 ? 1 : this.fg & 268435456;
  }
  isBlink() {
    return this.fg & 536870912;
  }
  isInvisible() {
    return this.fg & 1073741824;
  }
  isItalic() {
    return this.bg & 67108864;
  }
  isDim() {
    return this.bg & 134217728;
  }
  isStrikethrough() {
    return this.fg & 2147483648;
  }
  isProtected() {
    return this.bg & 536870912;
  }
  isOverline() {
    return this.bg & 1073741824;
  }
  getFgColorMode() {
    return this.fg & 50331648;
  }
  getBgColorMode() {
    return this.bg & 50331648;
  }
  isFgRGB() {
    return (this.fg & 50331648) === 50331648;
  }
  isBgRGB() {
    return (this.bg & 50331648) === 50331648;
  }
  isFgPalette() {
    return (this.fg & 50331648) === 16777216 || (this.fg & 50331648) === 33554432;
  }
  isBgPalette() {
    return (this.bg & 50331648) === 16777216 || (this.bg & 50331648) === 33554432;
  }
  isFgDefault() {
    return (this.fg & 50331648) === 0;
  }
  isBgDefault() {
    return (this.bg & 50331648) === 0;
  }
  isAttributeDefault() {
    return this.fg === 0 && this.bg === 0;
  }
  getFgColor() {
    switch (this.fg & 50331648) {
      case 16777216:
      case 33554432:
        return this.fg & 255;
      case 50331648:
        return this.fg & 16777215;
      default:
        return -1;
    }
  }
  getBgColor() {
    switch (this.bg & 50331648) {
      case 16777216:
      case 33554432:
        return this.bg & 255;
      case 50331648:
        return this.bg & 16777215;
      default:
        return -1;
    }
  }
  hasExtendedAttrs() {
    return this.bg & 268435456;
  }
  updateExtended() {
    this.extended.isEmpty() ? this.bg &= -268435457 : this.bg |= 268435456;
  }
  getUnderlineColor() {
    if (this.bg & 268435456 && ~this.extended.underlineColor) switch (this.extended.underlineColor & 50331648) {
      case 16777216:
      case 33554432:
        return this.extended.underlineColor & 255;
      case 50331648:
        return this.extended.underlineColor & 16777215;
      default:
        return this.getFgColor();
    }
    return this.getFgColor();
  }
  getUnderlineColorMode() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? this.extended.underlineColor & 50331648 : this.getFgColorMode();
  }
  isUnderlineColorRGB() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) === 50331648 : this.isFgRGB();
  }
  isUnderlineColorPalette() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) === 16777216 || (this.extended.underlineColor & 50331648) === 33554432 : this.isFgPalette();
  }
  isUnderlineColorDefault() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) === 0 : this.isFgDefault();
  }
  getUnderlineStyle() {
    return this.fg & 268435456 ? this.bg & 268435456 ? this.extended.underlineStyle : 1 : 0;
  }
  getUnderlineVariantOffset() {
    return this.extended.underlineVariantOffset;
  }
};
var rt = class s2 {
  constructor(t = 0, e2 = 0) {
    this._ext = 0;
    this._urlId = 0;
    this._ext = t, this._urlId = e2;
  }
  get ext() {
    return this._urlId ? this._ext & -469762049 | this.underlineStyle << 26 : this._ext;
  }
  set ext(t) {
    this._ext = t;
  }
  get underlineStyle() {
    return this._urlId ? 5 : (this._ext & 469762048) >> 26;
  }
  set underlineStyle(t) {
    this._ext &= -469762049, this._ext |= t << 26 & 469762048;
  }
  get underlineColor() {
    return this._ext & 67108863;
  }
  set underlineColor(t) {
    this._ext &= -67108864, this._ext |= t & 67108863;
  }
  get urlId() {
    return this._urlId;
  }
  set urlId(t) {
    this._urlId = t;
  }
  get underlineVariantOffset() {
    let t = (this._ext & 3758096384) >> 29;
    return t < 0 ? t ^ 4294967288 : t;
  }
  set underlineVariantOffset(t) {
    this._ext &= 536870911, this._ext |= t << 29 & 3758096384;
  }
  clone() {
    return new s2(this._ext, this._urlId);
  }
  isEmpty() {
    return this.underlineStyle === 0 && this._urlId === 0;
  }
};
var q = class s3 extends De {
  constructor() {
    super(...arguments);
    this.content = 0;
    this.fg = 0;
    this.bg = 0;
    this.extended = new rt();
    this.combinedData = "";
  }
  static fromCharData(e2) {
    let i = new s3();
    return i.setFromCharData(e2), i;
  }
  isCombined() {
    return this.content & 2097152;
  }
  getWidth() {
    return this.content >> 22;
  }
  getChars() {
    return this.content & 2097152 ? this.combinedData : this.content & 2097151 ? Ce(this.content & 2097151) : "";
  }
  getCode() {
    return this.isCombined() ? this.combinedData.charCodeAt(this.combinedData.length - 1) : this.content & 2097151;
  }
  setFromCharData(e2) {
    this.fg = e2[0], this.bg = 0;
    let i = false;
    if (e2[1].length > 2) i = true;
    else if (e2[1].length === 2) {
      let r = e2[1].charCodeAt(0);
      if (55296 <= r && r <= 56319) {
        let n = e2[1].charCodeAt(1);
        56320 <= n && n <= 57343 ? this.content = (r - 55296) * 1024 + n - 56320 + 65536 | e2[2] << 22 : i = true;
      } else i = true;
    } else this.content = e2[1].charCodeAt(0) | e2[2] << 22;
    i && (this.combinedData = e2[1], this.content = 2097152 | e2[2] << 22);
  }
  getAsCharData() {
    return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
  }
};
var js = "di$target";
var Hn = "di$dependencies";
var Fn = /* @__PURE__ */ new Map();
function Xs(s15) {
  return s15[Hn] || [];
}
function ie(s15) {
  if (Fn.has(s15)) return Fn.get(s15);
  let t = function(e2, i, r) {
    if (arguments.length !== 3) throw new Error("@IServiceName-decorator can only be used to decorate a parameter");
    Pl(t, e2, r);
  };
  return t._id = s15, Fn.set(s15, t), t;
}
function Pl(s15, t, e2) {
  t[js] === t ? t[Hn].push({ id: s15, index: e2 }) : (t[Hn] = [{ id: s15, index: e2 }], t[js] = t);
}
var F = ie("BufferService");
var rr = ie("CoreMouseService");
var ge = ie("CoreService");
var Zs = ie("CharsetService");
var xt = ie("InstantiationService");
var nr = ie("LogService");
var H = ie("OptionsService");
var sr = ie("OscLinkService");
var Js = ie("UnicodeService");
var Be = ie("DecorationService");
var wt = class {
  constructor(t, e2, i) {
    this._bufferService = t;
    this._optionsService = e2;
    this._oscLinkService = i;
  }
  provideLinks(t, e2) {
    let i = this._bufferService.buffer.lines.get(t - 1);
    if (!i) {
      e2(void 0);
      return;
    }
    let r = [], n = this._optionsService.rawOptions.linkHandler, o2 = new q(), l = i.getTrimmedLength(), a2 = -1, u = -1, h2 = false;
    for (let c2 = 0; c2 < l; c2++) if (!(u === -1 && !i.hasContent(c2))) {
      if (i.loadCell(c2, o2), o2.hasExtendedAttrs() && o2.extended.urlId) if (u === -1) {
        u = c2, a2 = o2.extended.urlId;
        continue;
      } else h2 = o2.extended.urlId !== a2;
      else u !== -1 && (h2 = true);
      if (h2 || u !== -1 && c2 === l - 1) {
        let d2 = this._oscLinkService.getLinkData(a2)?.uri;
        if (d2) {
          let _2 = { start: { x: u + 1, y: t }, end: { x: c2 + (!h2 && c2 === l - 1 ? 1 : 0), y: t } }, p = false;
          if (!n?.allowNonHttpProtocols) try {
            let m = new URL(d2);
            ["http:", "https:"].includes(m.protocol) || (p = true);
          } catch {
            p = true;
          }
          p || r.push({ text: d2, range: _2, activate: (m, f2) => n ? n.activate(m, f2, _2) : Ol(m, f2), hover: (m, f2) => n?.hover?.(m, f2, _2), leave: (m, f2) => n?.leave?.(m, f2, _2) });
        }
        h2 = false, o2.hasExtendedAttrs() && o2.extended.urlId ? (u = c2, a2 = o2.extended.urlId) : (u = -1, a2 = -1);
      }
    }
    e2(r);
  }
};
wt = M2([S(0, F), S(1, H), S(2, sr)], wt);
function Ol(s15, t) {
  if (confirm(`Do you want to navigate to ${t}?

WARNING: This link could potentially be dangerous`)) {
    let i = window.open();
    if (i) {
      try {
        i.opener = null;
      } catch {
      }
      i.location.href = t;
    } else console.warn("Opening link blocked as opener could not be cleared");
  }
}
var nt = ie("CharSizeService");
var ae = ie("CoreBrowserService");
var Dt = ie("MouseService");
var ce = ie("RenderService");
var Qs = ie("SelectionService");
var or = ie("CharacterJoinerService");
var Re = ie("ThemeService");
var lr = ie("LinkProviderService");
var Wn = class {
  constructor() {
    this.listeners = [], this.unexpectedErrorHandler = function(t) {
      setTimeout(() => {
        throw t.stack ? ar.isErrorNoTelemetry(t) ? new ar(t.message + `

` + t.stack) : new Error(t.message + `

` + t.stack) : t;
      }, 0);
    };
  }
  addListener(t) {
    return this.listeners.push(t), () => {
      this._removeListener(t);
    };
  }
  emit(t) {
    this.listeners.forEach((e2) => {
      e2(t);
    });
  }
  _removeListener(t) {
    this.listeners.splice(this.listeners.indexOf(t), 1);
  }
  setUnexpectedErrorHandler(t) {
    this.unexpectedErrorHandler = t;
  }
  getUnexpectedErrorHandler() {
    return this.unexpectedErrorHandler;
  }
  onUnexpectedError(t) {
    this.unexpectedErrorHandler(t), this.emit(t);
  }
  onUnexpectedExternalError(t) {
    this.unexpectedErrorHandler(t);
  }
};
var Bl = new Wn();
function Lt(s15) {
  Nl(s15) || Bl.onUnexpectedError(s15);
}
var Un = "Canceled";
function Nl(s15) {
  return s15 instanceof bi ? true : s15 instanceof Error && s15.name === Un && s15.message === Un;
}
var bi = class extends Error {
  constructor() {
    super(Un), this.name = this.message;
  }
};
function eo(s15) {
  return s15 ? new Error(`Illegal argument: ${s15}`) : new Error("Illegal argument");
}
var ar = class s4 extends Error {
  constructor(t) {
    super(t), this.name = "CodeExpectedError";
  }
  static fromError(t) {
    if (t instanceof s4) return t;
    let e2 = new s4();
    return e2.message = t.message, e2.stack = t.stack, e2;
  }
  static isErrorNoTelemetry(t) {
    return t.name === "CodeExpectedError";
  }
};
var Rt = class s5 extends Error {
  constructor(t) {
    super(t || "An unexpected bug occurred."), Object.setPrototypeOf(this, s5.prototype);
  }
};
function Fl(s15, t, e2 = 0, i = s15.length) {
  let r = e2, n = i;
  for (; r < n; ) {
    let o2 = Math.floor((r + n) / 2);
    t(s15[o2]) ? r = o2 + 1 : n = o2;
  }
  return r - 1;
}
var cr = class cr2 {
  constructor(t) {
    this._array = t;
    this._findLastMonotonousLastIdx = 0;
  }
  findLastMonotonous(t) {
    if (cr2.assertInvariants) {
      if (this._prevFindLastPredicate) {
        for (let i of this._array) if (this._prevFindLastPredicate(i) && !t(i)) throw new Error("MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.");
      }
      this._prevFindLastPredicate = t;
    }
    let e2 = Fl(this._array, t, this._findLastMonotonousLastIdx);
    return this._findLastMonotonousLastIdx = e2 + 1, e2 === -1 ? void 0 : this._array[e2];
  }
};
cr.assertInvariants = false;
function Se(s15, t = 0) {
  return s15[s15.length - (1 + t)];
}
var ro;
((l) => {
  function s15(a2) {
    return a2 < 0;
  }
  l.isLessThan = s15;
  function t(a2) {
    return a2 <= 0;
  }
  l.isLessThanOrEqual = t;
  function e2(a2) {
    return a2 > 0;
  }
  l.isGreaterThan = e2;
  function i(a2) {
    return a2 === 0;
  }
  l.isNeitherLessOrGreaterThan = i, l.greaterThan = 1, l.lessThan = -1, l.neitherLessOrGreaterThan = 0;
})(ro ||= {});
function no(s15, t) {
  return (e2, i) => t(s15(e2), s15(i));
}
var so = (s15, t) => s15 - t;
var At = class At2 {
  constructor(t) {
    this.iterate = t;
  }
  forEach(t) {
    this.iterate((e2) => (t(e2), true));
  }
  toArray() {
    let t = [];
    return this.iterate((e2) => (t.push(e2), true)), t;
  }
  filter(t) {
    return new At2((e2) => this.iterate((i) => t(i) ? e2(i) : true));
  }
  map(t) {
    return new At2((e2) => this.iterate((i) => e2(t(i))));
  }
  some(t) {
    let e2 = false;
    return this.iterate((i) => (e2 = t(i), !e2)), e2;
  }
  findFirst(t) {
    let e2;
    return this.iterate((i) => t(i) ? (e2 = i, false) : true), e2;
  }
  findLast(t) {
    let e2;
    return this.iterate((i) => (t(i) && (e2 = i), true)), e2;
  }
  findLastMaxBy(t) {
    let e2, i = true;
    return this.iterate((r) => ((i || ro.isGreaterThan(t(r, e2))) && (i = false, e2 = r), true)), e2;
  }
};
At.empty = new At((t) => {
});
function co(s15, t) {
  let e2 = /* @__PURE__ */ Object.create(null);
  for (let i of s15) {
    let r = t(i), n = e2[r];
    n || (n = e2[r] = []), n.push(i);
  }
  return e2;
}
var lo;
var ao;
var oo = class {
  constructor(t, e2) {
    this.toKey = e2;
    this._map = /* @__PURE__ */ new Map();
    this[lo] = "SetWithKey";
    for (let i of t) this.add(i);
  }
  get size() {
    return this._map.size;
  }
  add(t) {
    let e2 = this.toKey(t);
    return this._map.set(e2, t), this;
  }
  delete(t) {
    return this._map.delete(this.toKey(t));
  }
  has(t) {
    return this._map.has(this.toKey(t));
  }
  *entries() {
    for (let t of this._map.values()) yield [t, t];
  }
  keys() {
    return this.values();
  }
  *values() {
    for (let t of this._map.values()) yield t;
  }
  clear() {
    this._map.clear();
  }
  forEach(t, e2) {
    this._map.forEach((i) => t.call(e2, i, i, this));
  }
  [(ao = Symbol.iterator, lo = Symbol.toStringTag, ao)]() {
    return this.values();
  }
};
var ur = class {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  add(t, e2) {
    let i = this.map.get(t);
    i || (i = /* @__PURE__ */ new Set(), this.map.set(t, i)), i.add(e2);
  }
  delete(t, e2) {
    let i = this.map.get(t);
    i && (i.delete(e2), i.size === 0 && this.map.delete(t));
  }
  forEach(t, e2) {
    let i = this.map.get(t);
    i && i.forEach(e2);
  }
  get(t) {
    let e2 = this.map.get(t);
    return e2 || /* @__PURE__ */ new Set();
  }
};
function Kn(s15, t) {
  let e2 = this, i = false, r;
  return function() {
    if (i) return r;
    if (i = true, t) try {
      r = s15.apply(e2, arguments);
    } finally {
      t();
    }
    else r = s15.apply(e2, arguments);
    return r;
  };
}
var zn;
((O) => {
  function s15(I) {
    return I && typeof I == "object" && typeof I[Symbol.iterator] == "function";
  }
  O.is = s15;
  let t = Object.freeze([]);
  function e2() {
    return t;
  }
  O.empty = e2;
  function* i(I) {
    yield I;
  }
  O.single = i;
  function r(I) {
    return s15(I) ? I : i(I);
  }
  O.wrap = r;
  function n(I) {
    return I || t;
  }
  O.from = n;
  function* o2(I) {
    for (let k = I.length - 1; k >= 0; k--) yield I[k];
  }
  O.reverse = o2;
  function l(I) {
    return !I || I[Symbol.iterator]().next().done === true;
  }
  O.isEmpty = l;
  function a2(I) {
    return I[Symbol.iterator]().next().value;
  }
  O.first = a2;
  function u(I, k) {
    let P = 0;
    for (let oe of I) if (k(oe, P++)) return true;
    return false;
  }
  O.some = u;
  function h2(I, k) {
    for (let P of I) if (k(P)) return P;
  }
  O.find = h2;
  function* c2(I, k) {
    for (let P of I) k(P) && (yield P);
  }
  O.filter = c2;
  function* d2(I, k) {
    let P = 0;
    for (let oe of I) yield k(oe, P++);
  }
  O.map = d2;
  function* _2(I, k) {
    let P = 0;
    for (let oe of I) yield* k(oe, P++);
  }
  O.flatMap = _2;
  function* p(...I) {
    for (let k of I) yield* k;
  }
  O.concat = p;
  function m(I, k, P) {
    let oe = P;
    for (let Me of I) oe = k(oe, Me);
    return oe;
  }
  O.reduce = m;
  function* f2(I, k, P = I.length) {
    for (k < 0 && (k += I.length), P < 0 ? P += I.length : P > I.length && (P = I.length); k < P; k++) yield I[k];
  }
  O.slice = f2;
  function A(I, k = Number.POSITIVE_INFINITY) {
    let P = [];
    if (k === 0) return [P, I];
    let oe = I[Symbol.iterator]();
    for (let Me = 0; Me < k; Me++) {
      let Pe = oe.next();
      if (Pe.done) return [P, O.empty()];
      P.push(Pe.value);
    }
    return [P, { [Symbol.iterator]() {
      return oe;
    } }];
  }
  O.consume = A;
  async function R(I) {
    let k = [];
    for await (let P of I) k.push(P);
    return Promise.resolve(k);
  }
  O.asyncToArray = R;
})(zn ||= {});
var Wl = false;
var dt = null;
var hr = class hr2 {
  constructor() {
    this.livingDisposables = /* @__PURE__ */ new Map();
  }
  getDisposableData(t) {
    let e2 = this.livingDisposables.get(t);
    return e2 || (e2 = { parent: null, source: null, isSingleton: false, value: t, idx: hr2.idx++ }, this.livingDisposables.set(t, e2)), e2;
  }
  trackDisposable(t) {
    let e2 = this.getDisposableData(t);
    e2.source || (e2.source = new Error().stack);
  }
  setParent(t, e2) {
    let i = this.getDisposableData(t);
    i.parent = e2;
  }
  markAsDisposed(t) {
    this.livingDisposables.delete(t);
  }
  markAsSingleton(t) {
    this.getDisposableData(t).isSingleton = true;
  }
  getRootParent(t, e2) {
    let i = e2.get(t);
    if (i) return i;
    let r = t.parent ? this.getRootParent(this.getDisposableData(t.parent), e2) : t;
    return e2.set(t, r), r;
  }
  getTrackedDisposables() {
    let t = /* @__PURE__ */ new Map();
    return [...this.livingDisposables.entries()].filter(([, i]) => i.source !== null && !this.getRootParent(i, t).isSingleton).flatMap(([i]) => i);
  }
  computeLeakingDisposables(t = 10, e2) {
    let i;
    if (e2) i = e2;
    else {
      let a2 = /* @__PURE__ */ new Map(), u = [...this.livingDisposables.values()].filter((c2) => c2.source !== null && !this.getRootParent(c2, a2).isSingleton);
      if (u.length === 0) return;
      let h2 = new Set(u.map((c2) => c2.value));
      if (i = u.filter((c2) => !(c2.parent && h2.has(c2.parent))), i.length === 0) throw new Error("There are cyclic diposable chains!");
    }
    if (!i) return;
    function r(a2) {
      function u(c2, d2) {
        for (; c2.length > 0 && d2.some((_2) => typeof _2 == "string" ? _2 === c2[0] : c2[0].match(_2)); ) c2.shift();
      }
      let h2 = a2.source.split(`
`).map((c2) => c2.trim().replace("at ", "")).filter((c2) => c2 !== "");
      return u(h2, ["Error", /^trackDisposable \(.*\)$/, /^DisposableTracker.trackDisposable \(.*\)$/]), h2.reverse();
    }
    let n = new ur();
    for (let a2 of i) {
      let u = r(a2);
      for (let h2 = 0; h2 <= u.length; h2++) n.add(u.slice(0, h2).join(`
`), a2);
    }
    i.sort(no((a2) => a2.idx, so));
    let o2 = "", l = 0;
    for (let a2 of i.slice(0, t)) {
      l++;
      let u = r(a2), h2 = [];
      for (let c2 = 0; c2 < u.length; c2++) {
        let d2 = u[c2];
        d2 = `(shared with ${n.get(u.slice(0, c2 + 1).join(`
`)).size}/${i.length} leaks) at ${d2}`;
        let p = n.get(u.slice(0, c2).join(`
`)), m = co([...p].map((f2) => r(f2)[c2]), (f2) => f2);
        delete m[u[c2]];
        for (let [f2, A] of Object.entries(m)) h2.unshift(`    - stacktraces of ${A.length} other leaks continue with ${f2}`);
        h2.unshift(d2);
      }
      o2 += `


==================== Leaking disposable ${l}/${i.length}: ${a2.value.constructor.name} ====================
${h2.join(`
`)}
============================================================

`;
    }
    return i.length > t && (o2 += `


... and ${i.length - t} more leaking disposables

`), { leaks: i, details: o2 };
  }
};
hr.idx = 0;
function Ul(s15) {
  dt = s15;
}
if (Wl) {
  let s15 = "__is_disposable_tracked__";
  Ul(new class {
    trackDisposable(t) {
      let e2 = new Error("Potentially leaked disposable").stack;
      setTimeout(() => {
        t[s15] || console.log(e2);
      }, 3e3);
    }
    setParent(t, e2) {
      if (t && t !== D.None) try {
        t[s15] = true;
      } catch {
      }
    }
    markAsDisposed(t) {
      if (t && t !== D.None) try {
        t[s15] = true;
      } catch {
      }
    }
    markAsSingleton(t) {
    }
  }());
}
function fr(s15) {
  return dt?.trackDisposable(s15), s15;
}
function pr(s15) {
  dt?.markAsDisposed(s15);
}
function vi(s15, t) {
  dt?.setParent(s15, t);
}
function Kl(s15, t) {
  if (dt) for (let e2 of s15) dt.setParent(e2, t);
}
function Gn(s15) {
  return dt?.markAsSingleton(s15), s15;
}
function Ne(s15) {
  if (zn.is(s15)) {
    let t = [];
    for (let e2 of s15) if (e2) try {
      e2.dispose();
    } catch (i) {
      t.push(i);
    }
    if (t.length === 1) throw t[0];
    if (t.length > 1) throw new AggregateError(t, "Encountered errors while disposing of store");
    return Array.isArray(s15) ? [] : s15;
  } else if (s15) return s15.dispose(), s15;
}
function ho(...s15) {
  let t = C(() => Ne(s15));
  return Kl(s15, t), t;
}
function C(s15) {
  let t = fr({ dispose: Kn(() => {
    pr(t), s15();
  }) });
  return t;
}
var dr = class dr2 {
  constructor() {
    this._toDispose = /* @__PURE__ */ new Set();
    this._isDisposed = false;
    fr(this);
  }
  dispose() {
    this._isDisposed || (pr(this), this._isDisposed = true, this.clear());
  }
  get isDisposed() {
    return this._isDisposed;
  }
  clear() {
    if (this._toDispose.size !== 0) try {
      Ne(this._toDispose);
    } finally {
      this._toDispose.clear();
    }
  }
  add(t) {
    if (!t) return t;
    if (t === this) throw new Error("Cannot register a disposable on itself!");
    return vi(t, this), this._isDisposed ? dr2.DISABLE_DISPOSED_WARNING || console.warn(new Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!").stack) : this._toDispose.add(t), t;
  }
  delete(t) {
    if (t) {
      if (t === this) throw new Error("Cannot dispose a disposable on itself!");
      this._toDispose.delete(t), t.dispose();
    }
  }
  deleteAndLeak(t) {
    t && this._toDispose.has(t) && (this._toDispose.delete(t), vi(t, null));
  }
};
dr.DISABLE_DISPOSED_WARNING = false;
var Ee = dr;
var D = class {
  constructor() {
    this._store = new Ee();
    fr(this), vi(this._store, this);
  }
  dispose() {
    pr(this), this._store.dispose();
  }
  _register(t) {
    if (t === this) throw new Error("Cannot register a disposable on itself!");
    return this._store.add(t);
  }
};
D.None = Object.freeze({ dispose() {
} });
var ye = class {
  constructor() {
    this._isDisposed = false;
    fr(this);
  }
  get value() {
    return this._isDisposed ? void 0 : this._value;
  }
  set value(t) {
    this._isDisposed || t === this._value || (this._value?.dispose(), t && vi(t, this), this._value = t);
  }
  clear() {
    this.value = void 0;
  }
  dispose() {
    this._isDisposed = true, pr(this), this._value?.dispose(), this._value = void 0;
  }
  clearAndLeak() {
    let t = this._value;
    return this._value = void 0, t && vi(t, null), t;
  }
};
var fe = typeof window == "object" ? window : globalThis;
var kt = class kt2 {
  constructor(t) {
    this.element = t, this.next = kt2.Undefined, this.prev = kt2.Undefined;
  }
};
kt.Undefined = new kt(void 0);
var G = kt;
var Ct = class {
  constructor() {
    this._first = G.Undefined;
    this._last = G.Undefined;
    this._size = 0;
  }
  get size() {
    return this._size;
  }
  isEmpty() {
    return this._first === G.Undefined;
  }
  clear() {
    let t = this._first;
    for (; t !== G.Undefined; ) {
      let e2 = t.next;
      t.prev = G.Undefined, t.next = G.Undefined, t = e2;
    }
    this._first = G.Undefined, this._last = G.Undefined, this._size = 0;
  }
  unshift(t) {
    return this._insert(t, false);
  }
  push(t) {
    return this._insert(t, true);
  }
  _insert(t, e2) {
    let i = new G(t);
    if (this._first === G.Undefined) this._first = i, this._last = i;
    else if (e2) {
      let n = this._last;
      this._last = i, i.prev = n, n.next = i;
    } else {
      let n = this._first;
      this._first = i, i.next = n, n.prev = i;
    }
    this._size += 1;
    let r = false;
    return () => {
      r || (r = true, this._remove(i));
    };
  }
  shift() {
    if (this._first !== G.Undefined) {
      let t = this._first.element;
      return this._remove(this._first), t;
    }
  }
  pop() {
    if (this._last !== G.Undefined) {
      let t = this._last.element;
      return this._remove(this._last), t;
    }
  }
  _remove(t) {
    if (t.prev !== G.Undefined && t.next !== G.Undefined) {
      let e2 = t.prev;
      e2.next = t.next, t.next.prev = e2;
    } else t.prev === G.Undefined && t.next === G.Undefined ? (this._first = G.Undefined, this._last = G.Undefined) : t.next === G.Undefined ? (this._last = this._last.prev, this._last.next = G.Undefined) : t.prev === G.Undefined && (this._first = this._first.next, this._first.prev = G.Undefined);
    this._size -= 1;
  }
  *[Symbol.iterator]() {
    let t = this._first;
    for (; t !== G.Undefined; ) yield t.element, t = t.next;
  }
};
var zl = globalThis.performance && typeof globalThis.performance.now == "function";
var mr = class s6 {
  static create(t) {
    return new s6(t);
  }
  constructor(t) {
    this._now = zl && t === false ? Date.now : globalThis.performance.now.bind(globalThis.performance), this._startTime = this._now(), this._stopTime = -1;
  }
  stop() {
    this._stopTime = this._now();
  }
  reset() {
    this._startTime = this._now(), this._stopTime = -1;
  }
  elapsed() {
    return this._stopTime !== -1 ? this._stopTime - this._startTime : this._now() - this._startTime;
  }
};
var Gl = false;
var fo = false;
var $l = false;
var $;
((Qe) => {
  Qe.None = () => D.None;
  function t(y) {
    if ($l) {
      let { onDidAddListener: T } = y, g = gi.create(), w = 0;
      y.onDidAddListener = () => {
        ++w === 2 && (console.warn("snapshotted emitter LIKELY used public and SHOULD HAVE BEEN created with DisposableStore. snapshotted here"), g.print()), T?.();
      };
    }
  }
  function e2(y, T) {
    return d2(y, () => {
    }, 0, void 0, true, void 0, T);
  }
  Qe.defer = e2;
  function i(y) {
    return (T, g = null, w) => {
      let E = false, x;
      return x = y((N) => {
        if (!E) return x ? x.dispose() : E = true, T.call(g, N);
      }, null, w), E && x.dispose(), x;
    };
  }
  Qe.once = i;
  function r(y, T, g) {
    return h2((w, E = null, x) => y((N) => w.call(E, T(N)), null, x), g);
  }
  Qe.map = r;
  function n(y, T, g) {
    return h2((w, E = null, x) => y((N) => {
      T(N), w.call(E, N);
    }, null, x), g);
  }
  Qe.forEach = n;
  function o2(y, T, g) {
    return h2((w, E = null, x) => y((N) => T(N) && w.call(E, N), null, x), g);
  }
  Qe.filter = o2;
  function l(y) {
    return y;
  }
  Qe.signal = l;
  function a2(...y) {
    return (T, g = null, w) => {
      let E = ho(...y.map((x) => x((N) => T.call(g, N))));
      return c2(E, w);
    };
  }
  Qe.any = a2;
  function u(y, T, g, w) {
    let E = g;
    return r(y, (x) => (E = T(E, x), E), w);
  }
  Qe.reduce = u;
  function h2(y, T) {
    let g, w = { onWillAddFirstListener() {
      g = y(E.fire, E);
    }, onDidRemoveLastListener() {
      g?.dispose();
    } };
    T || t(w);
    let E = new v(w);
    return T?.add(E), E.event;
  }
  function c2(y, T) {
    return T instanceof Array ? T.push(y) : T && T.add(y), y;
  }
  function d2(y, T, g = 100, w = false, E = false, x, N) {
    let Z, te, Oe, ze = 0, le, et = { leakWarningThreshold: x, onWillAddFirstListener() {
      Z = y((ht) => {
        ze++, te = T(te, ht), w && !Oe && (me.fire(te), te = void 0), le = () => {
          let fi = te;
          te = void 0, Oe = void 0, (!w || ze > 1) && me.fire(fi), ze = 0;
        }, typeof g == "number" ? (clearTimeout(Oe), Oe = setTimeout(le, g)) : Oe === void 0 && (Oe = 0, queueMicrotask(le));
      });
    }, onWillRemoveListener() {
      E && ze > 0 && le?.();
    }, onDidRemoveLastListener() {
      le = void 0, Z.dispose();
    } };
    N || t(et);
    let me = new v(et);
    return N?.add(me), me.event;
  }
  Qe.debounce = d2;
  function _2(y, T = 0, g) {
    return Qe.debounce(y, (w, E) => w ? (w.push(E), w) : [E], T, void 0, true, void 0, g);
  }
  Qe.accumulate = _2;
  function p(y, T = (w, E) => w === E, g) {
    let w = true, E;
    return o2(y, (x) => {
      let N = w || !T(x, E);
      return w = false, E = x, N;
    }, g);
  }
  Qe.latch = p;
  function m(y, T, g) {
    return [Qe.filter(y, T, g), Qe.filter(y, (w) => !T(w), g)];
  }
  Qe.split = m;
  function f2(y, T = false, g = [], w) {
    let E = g.slice(), x = y((te) => {
      E ? E.push(te) : Z.fire(te);
    });
    w && w.add(x);
    let N = () => {
      E?.forEach((te) => Z.fire(te)), E = null;
    }, Z = new v({ onWillAddFirstListener() {
      x || (x = y((te) => Z.fire(te)), w && w.add(x));
    }, onDidAddFirstListener() {
      E && (T ? setTimeout(N) : N());
    }, onDidRemoveLastListener() {
      x && x.dispose(), x = null;
    } });
    return w && w.add(Z), Z.event;
  }
  Qe.buffer = f2;
  function A(y, T) {
    return (w, E, x) => {
      let N = T(new O());
      return y(function(Z) {
        let te = N.evaluate(Z);
        te !== R && w.call(E, te);
      }, void 0, x);
    };
  }
  Qe.chain = A;
  let R = /* @__PURE__ */ Symbol("HaltChainable");
  class O {
    constructor() {
      this.steps = [];
    }
    map(T) {
      return this.steps.push(T), this;
    }
    forEach(T) {
      return this.steps.push((g) => (T(g), g)), this;
    }
    filter(T) {
      return this.steps.push((g) => T(g) ? g : R), this;
    }
    reduce(T, g) {
      let w = g;
      return this.steps.push((E) => (w = T(w, E), w)), this;
    }
    latch(T = (g, w) => g === w) {
      let g = true, w;
      return this.steps.push((E) => {
        let x = g || !T(E, w);
        return g = false, w = E, x ? E : R;
      }), this;
    }
    evaluate(T) {
      for (let g of this.steps) if (T = g(T), T === R) break;
      return T;
    }
  }
  function I(y, T, g = (w) => w) {
    let w = (...Z) => N.fire(g(...Z)), E = () => y.on(T, w), x = () => y.removeListener(T, w), N = new v({ onWillAddFirstListener: E, onDidRemoveLastListener: x });
    return N.event;
  }
  Qe.fromNodeEventEmitter = I;
  function k(y, T, g = (w) => w) {
    let w = (...Z) => N.fire(g(...Z)), E = () => y.addEventListener(T, w), x = () => y.removeEventListener(T, w), N = new v({ onWillAddFirstListener: E, onDidRemoveLastListener: x });
    return N.event;
  }
  Qe.fromDOMEventEmitter = k;
  function P(y) {
    return new Promise((T) => i(y)(T));
  }
  Qe.toPromise = P;
  function oe(y) {
    let T = new v();
    return y.then((g) => {
      T.fire(g);
    }, () => {
      T.fire(void 0);
    }).finally(() => {
      T.dispose();
    }), T.event;
  }
  Qe.fromPromise = oe;
  function Me(y, T) {
    return y((g) => T.fire(g));
  }
  Qe.forward = Me;
  function Pe(y, T, g) {
    return T(g), y((w) => T(w));
  }
  Qe.runAndSubscribe = Pe;
  class Ke {
    constructor(T, g) {
      this._observable = T;
      this._counter = 0;
      this._hasChanged = false;
      let w = { onWillAddFirstListener: () => {
        T.addObserver(this);
      }, onDidRemoveLastListener: () => {
        T.removeObserver(this);
      } };
      g || t(w), this.emitter = new v(w), g && g.add(this.emitter);
    }
    beginUpdate(T) {
      this._counter++;
    }
    handlePossibleChange(T) {
    }
    handleChange(T, g) {
      this._hasChanged = true;
    }
    endUpdate(T) {
      this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = false, this.emitter.fire(this._observable.get())));
    }
  }
  function di(y, T) {
    return new Ke(y, T).emitter.event;
  }
  Qe.fromObservable = di;
  function V2(y) {
    return (T, g, w) => {
      let E = 0, x = false, N = { beginUpdate() {
        E++;
      }, endUpdate() {
        E--, E === 0 && (y.reportChanges(), x && (x = false, T.call(g)));
      }, handlePossibleChange() {
      }, handleChange() {
        x = true;
      } };
      y.addObserver(N), y.reportChanges();
      let Z = { dispose() {
        y.removeObserver(N);
      } };
      return w instanceof Ee ? w.add(Z) : Array.isArray(w) && w.push(Z), Z;
    };
  }
  Qe.fromObservableLight = V2;
})($ ||= {});
var Mt = class Mt2 {
  constructor(t) {
    this.listenerCount = 0;
    this.invocationCount = 0;
    this.elapsedOverall = 0;
    this.durations = [];
    this.name = `${t}_${Mt2._idPool++}`, Mt2.all.add(this);
  }
  start(t) {
    this._stopWatch = new mr(), this.listenerCount = t;
  }
  stop() {
    if (this._stopWatch) {
      let t = this._stopWatch.elapsed();
      this.durations.push(t), this.elapsedOverall += t, this.invocationCount += 1, this._stopWatch = void 0;
    }
  }
};
Mt.all = /* @__PURE__ */ new Set(), Mt._idPool = 0;
var $n = Mt;
var po = -1;
var br = class br2 {
  constructor(t, e2, i = (br2._idPool++).toString(16).padStart(3, "0")) {
    this._errorHandler = t;
    this.threshold = e2;
    this.name = i;
    this._warnCountdown = 0;
  }
  dispose() {
    this._stacks?.clear();
  }
  check(t, e2) {
    let i = this.threshold;
    if (i <= 0 || e2 < i) return;
    this._stacks || (this._stacks = /* @__PURE__ */ new Map());
    let r = this._stacks.get(t.value) || 0;
    if (this._stacks.set(t.value, r + 1), this._warnCountdown -= 1, this._warnCountdown <= 0) {
      this._warnCountdown = i * 0.5;
      let [n, o2] = this.getMostFrequentStack(), l = `[${this.name}] potential listener LEAK detected, having ${e2} listeners already. MOST frequent listener (${o2}):`;
      console.warn(l), console.warn(n);
      let a2 = new qn(l, n);
      this._errorHandler(a2);
    }
    return () => {
      let n = this._stacks.get(t.value) || 0;
      this._stacks.set(t.value, n - 1);
    };
  }
  getMostFrequentStack() {
    if (!this._stacks) return;
    let t, e2 = 0;
    for (let [i, r] of this._stacks) (!t || e2 < r) && (t = [i, r], e2 = r);
    return t;
  }
};
br._idPool = 1;
var Vn = br;
var gi = class s7 {
  constructor(t) {
    this.value = t;
  }
  static create() {
    let t = new Error();
    return new s7(t.stack ?? "");
  }
  print() {
    console.warn(this.value.split(`
`).slice(2).join(`
`));
  }
};
var qn = class extends Error {
  constructor(t, e2) {
    super(t), this.name = "ListenerLeakError", this.stack = e2;
  }
};
var Yn = class extends Error {
  constructor(t, e2) {
    super(t), this.name = "ListenerRefusalError", this.stack = e2;
  }
};
var Vl = 0;
var Pt = class {
  constructor(t) {
    this.value = t;
    this.id = Vl++;
  }
};
var ql = 2;
var Yl = (s15, t) => {
  if (s15 instanceof Pt) t(s15);
  else for (let e2 = 0; e2 < s15.length; e2++) {
    let i = s15[e2];
    i && t(i);
  }
};
var _r;
if (Gl) {
  let s15 = [];
  setInterval(() => {
    s15.length !== 0 && (console.warn("[LEAKING LISTENERS] GC'ed these listeners that were NOT yet disposed:"), console.warn(s15.join(`
`)), s15.length = 0);
  }, 3e3), _r = new FinalizationRegistry((t) => {
    typeof t == "string" && s15.push(t);
  });
}
var v = class {
  constructor(t) {
    this._size = 0;
    this._options = t, this._leakageMon = po > 0 || this._options?.leakWarningThreshold ? new Vn(t?.onListenerError ?? Lt, this._options?.leakWarningThreshold ?? po) : void 0, this._perfMon = this._options?._profName ? new $n(this._options._profName) : void 0, this._deliveryQueue = this._options?.deliveryQueue;
  }
  dispose() {
    if (!this._disposed) {
      if (this._disposed = true, this._deliveryQueue?.current === this && this._deliveryQueue.reset(), this._listeners) {
        if (fo) {
          let t = this._listeners;
          queueMicrotask(() => {
            Yl(t, (e2) => e2.stack?.print());
          });
        }
        this._listeners = void 0, this._size = 0;
      }
      this._options?.onDidRemoveLastListener?.(), this._leakageMon?.dispose();
    }
  }
  get event() {
    return this._event ??= (t, e2, i) => {
      if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
        let a2 = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
        console.warn(a2);
        let u = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], h2 = new Yn(`${a2}. HINT: Stack shows most frequent listener (${u[1]}-times)`, u[0]);
        return (this._options?.onListenerError || Lt)(h2), D.None;
      }
      if (this._disposed) return D.None;
      e2 && (t = t.bind(e2));
      let r = new Pt(t), n, o2;
      this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * 0.2) && (r.stack = gi.create(), n = this._leakageMon.check(r.stack, this._size + 1)), fo && (r.stack = o2 ?? gi.create()), this._listeners ? this._listeners instanceof Pt ? (this._deliveryQueue ??= new jn(), this._listeners = [this._listeners, r]) : this._listeners.push(r) : (this._options?.onWillAddFirstListener?.(this), this._listeners = r, this._options?.onDidAddFirstListener?.(this)), this._size++;
      let l = C(() => {
        _r?.unregister(l), n?.(), this._removeListener(r);
      });
      if (i instanceof Ee ? i.add(l) : Array.isArray(i) && i.push(l), _r) {
        let a2 = new Error().stack.split(`
`).slice(2, 3).join(`
`).trim(), u = /(file:|vscode-file:\/\/vscode-app)?(\/[^:]*:\d+:\d+)/.exec(a2);
        _r.register(l, u?.[2] ?? a2, l);
      }
      return l;
    }, this._event;
  }
  _removeListener(t) {
    if (this._options?.onWillRemoveListener?.(this), !this._listeners) return;
    if (this._size === 1) {
      this._listeners = void 0, this._options?.onDidRemoveLastListener?.(this), this._size = 0;
      return;
    }
    let e2 = this._listeners, i = e2.indexOf(t);
    if (i === -1) throw console.log("disposed?", this._disposed), console.log("size?", this._size), console.log("arr?", JSON.stringify(this._listeners)), new Error("Attempted to dispose unknown listener");
    this._size--, e2[i] = void 0;
    let r = this._deliveryQueue.current === this;
    if (this._size * ql <= e2.length) {
      let n = 0;
      for (let o2 = 0; o2 < e2.length; o2++) e2[o2] ? e2[n++] = e2[o2] : r && (this._deliveryQueue.end--, n < this._deliveryQueue.i && this._deliveryQueue.i--);
      e2.length = n;
    }
  }
  _deliver(t, e2) {
    if (!t) return;
    let i = this._options?.onListenerError || Lt;
    if (!i) {
      t.value(e2);
      return;
    }
    try {
      t.value(e2);
    } catch (r) {
      i(r);
    }
  }
  _deliverQueue(t) {
    let e2 = t.current._listeners;
    for (; t.i < t.end; ) this._deliver(e2[t.i++], t.value);
    t.reset();
  }
  fire(t) {
    if (this._deliveryQueue?.current && (this._deliverQueue(this._deliveryQueue), this._perfMon?.stop()), this._perfMon?.start(this._size), this._listeners) if (this._listeners instanceof Pt) this._deliver(this._listeners, t);
    else {
      let e2 = this._deliveryQueue;
      e2.enqueue(this, t, this._listeners.length), this._deliverQueue(e2);
    }
    this._perfMon?.stop();
  }
  hasListeners() {
    return this._size > 0;
  }
};
var jn = class {
  constructor() {
    this.i = -1;
    this.end = 0;
  }
  enqueue(t, e2, i) {
    this.i = 0, this.end = i, this.current = t, this.value = e2;
  }
  reset() {
    this.i = this.end, this.current = void 0, this.value = void 0;
  }
};
var gr = class gr2 {
  constructor() {
    this.mapWindowIdToZoomLevel = /* @__PURE__ */ new Map();
    this._onDidChangeZoomLevel = new v();
    this.onDidChangeZoomLevel = this._onDidChangeZoomLevel.event;
    this.mapWindowIdToZoomFactor = /* @__PURE__ */ new Map();
    this._onDidChangeFullscreen = new v();
    this.onDidChangeFullscreen = this._onDidChangeFullscreen.event;
    this.mapWindowIdToFullScreen = /* @__PURE__ */ new Map();
  }
  getZoomLevel(t) {
    return this.mapWindowIdToZoomLevel.get(this.getWindowId(t)) ?? 0;
  }
  setZoomLevel(t, e2) {
    if (this.getZoomLevel(e2) === t) return;
    let i = this.getWindowId(e2);
    this.mapWindowIdToZoomLevel.set(i, t), this._onDidChangeZoomLevel.fire(i);
  }
  getZoomFactor(t) {
    return this.mapWindowIdToZoomFactor.get(this.getWindowId(t)) ?? 1;
  }
  setZoomFactor(t, e2) {
    this.mapWindowIdToZoomFactor.set(this.getWindowId(e2), t);
  }
  setFullscreen(t, e2) {
    if (this.isFullscreen(e2) === t) return;
    let i = this.getWindowId(e2);
    this.mapWindowIdToFullScreen.set(i, t), this._onDidChangeFullscreen.fire(i);
  }
  isFullscreen(t) {
    return !!this.mapWindowIdToFullScreen.get(this.getWindowId(t));
  }
  getWindowId(t) {
    return t.vscodeWindowId;
  }
};
gr.INSTANCE = new gr();
var Si = gr;
function Xl(s15, t, e2) {
  typeof t == "string" && (t = s15.matchMedia(t)), t.addEventListener("change", e2);
}
var Eu = Si.INSTANCE.onDidChangeZoomLevel;
function mo(s15) {
  return Si.INSTANCE.getZoomFactor(s15);
}
var Tu = Si.INSTANCE.onDidChangeFullscreen;
var Ot = typeof navigator == "object" ? navigator.userAgent : "";
var Ei = Ot.indexOf("Firefox") >= 0;
var Bt = Ot.indexOf("AppleWebKit") >= 0;
var Ti = Ot.indexOf("Chrome") >= 0;
var Sr = !Ti && Ot.indexOf("Safari") >= 0;
var Iu = Ot.indexOf("Electron/") >= 0;
var yu = Ot.indexOf("Android") >= 0;
var vr = false;
if (typeof fe.matchMedia == "function") {
  let s15 = fe.matchMedia("(display-mode: standalone) or (display-mode: window-controls-overlay)"), t = fe.matchMedia("(display-mode: fullscreen)");
  vr = s15.matches, Xl(fe, s15, ({ matches: e2 }) => {
    vr && t.matches || (vr = e2);
  });
}
function _o() {
  return vr;
}
var Nt = "en";
var yr = false;
var xr = false;
var Ii = false;
var Zl = false;
var vo = false;
var go = false;
var Jl = false;
var Ql = false;
var ea = false;
var ta = false;
var Tr;
var Ir = Nt;
var bo = Nt;
var ia;
var $e;
var Ve = globalThis;
var xe;
typeof Ve.vscode < "u" && typeof Ve.vscode.process < "u" ? xe = Ve.vscode.process : typeof process < "u" && typeof process?.versions?.node == "string" && (xe = process);
var So = typeof xe?.versions?.electron == "string";
var ra = So && xe?.type === "renderer";
if (typeof xe == "object") {
  yr = xe.platform === "win32", xr = xe.platform === "darwin", Ii = xe.platform === "linux", Zl = Ii && !!xe.env.SNAP && !!xe.env.SNAP_REVISION, Jl = So, ea = !!xe.env.CI || !!xe.env.BUILD_ARTIFACTSTAGINGDIRECTORY, Tr = Nt, Ir = Nt;
  let s15 = xe.env.VSCODE_NLS_CONFIG;
  if (s15) try {
    let t = JSON.parse(s15);
    Tr = t.userLocale, bo = t.osLocale, Ir = t.resolvedLanguage || Nt, ia = t.languagePack?.translationsConfigFile;
  } catch {
  }
  vo = true;
} else typeof navigator == "object" && !ra ? ($e = navigator.userAgent, yr = $e.indexOf("Windows") >= 0, xr = $e.indexOf("Macintosh") >= 0, Ql = ($e.indexOf("Macintosh") >= 0 || $e.indexOf("iPad") >= 0 || $e.indexOf("iPhone") >= 0) && !!navigator.maxTouchPoints && navigator.maxTouchPoints > 0, Ii = $e.indexOf("Linux") >= 0, ta = $e?.indexOf("Mobi") >= 0, go = true, Ir = globalThis._VSCODE_NLS_LANGUAGE || Nt, Tr = navigator.language.toLowerCase(), bo = Tr) : console.error("Unable to resolve platform.");
var Xn = 0;
xr ? Xn = 1 : yr ? Xn = 3 : Ii && (Xn = 2);
var wr = yr;
var Te = xr;
var Zn = Ii;
var Dr = vo;
var na = go && typeof Ve.importScripts == "function";
var xu = na ? Ve.origin : void 0;
var Fe = $e;
var st = Ir;
var sa;
((i) => {
  function s15() {
    return st;
  }
  i.value = s15;
  function t() {
    return st.length === 2 ? st === "en" : st.length >= 3 ? st[0] === "e" && st[1] === "n" && st[2] === "-" : false;
  }
  i.isDefaultVariant = t;
  function e2() {
    return st === "en";
  }
  i.isDefault = e2;
})(sa ||= {});
var oa = typeof Ve.postMessage == "function" && !Ve.importScripts;
var Eo = (() => {
  if (oa) {
    let s15 = [];
    Ve.addEventListener("message", (e2) => {
      if (e2.data && e2.data.vscodeScheduleAsyncWork) for (let i = 0, r = s15.length; i < r; i++) {
        let n = s15[i];
        if (n.id === e2.data.vscodeScheduleAsyncWork) {
          s15.splice(i, 1), n.callback();
          return;
        }
      }
    });
    let t = 0;
    return (e2) => {
      let i = ++t;
      s15.push({ id: i, callback: e2 }), Ve.postMessage({ vscodeScheduleAsyncWork: i }, "*");
    };
  }
  return (s15) => setTimeout(s15);
})();
var la = !!(Fe && Fe.indexOf("Chrome") >= 0);
var wu = !!(Fe && Fe.indexOf("Firefox") >= 0);
var Du = !!(!la && Fe && Fe.indexOf("Safari") >= 0);
var Ru = !!(Fe && Fe.indexOf("Edg/") >= 0);
var Lu = !!(Fe && Fe.indexOf("Android") >= 0);
var ot = typeof navigator == "object" ? navigator : {};
var aa = { clipboard: { writeText: Dr || document.queryCommandSupported && document.queryCommandSupported("copy") || !!(ot && ot.clipboard && ot.clipboard.writeText), readText: Dr || !!(ot && ot.clipboard && ot.clipboard.readText) }, keyboard: Dr || _o() ? 0 : ot.keyboard || Sr ? 1 : 2, touch: "ontouchstart" in fe || ot.maxTouchPoints > 0, pointerEvents: fe.PointerEvent && ("ontouchstart" in fe || navigator.maxTouchPoints > 0) };
var yi = class {
  constructor() {
    this._keyCodeToStr = [], this._strToKeyCode = /* @__PURE__ */ Object.create(null);
  }
  define(t, e2) {
    this._keyCodeToStr[t] = e2, this._strToKeyCode[e2.toLowerCase()] = t;
  }
  keyCodeToStr(t) {
    return this._keyCodeToStr[t];
  }
  strToKeyCode(t) {
    return this._strToKeyCode[t.toLowerCase()] || 0;
  }
};
var Jn = new yi();
var To = new yi();
var Io = new yi();
var yo = new Array(230);
var Qn;
((o2) => {
  function s15(l) {
    return Jn.keyCodeToStr(l);
  }
  o2.toString = s15;
  function t(l) {
    return Jn.strToKeyCode(l);
  }
  o2.fromString = t;
  function e2(l) {
    return To.keyCodeToStr(l);
  }
  o2.toUserSettingsUS = e2;
  function i(l) {
    return Io.keyCodeToStr(l);
  }
  o2.toUserSettingsGeneral = i;
  function r(l) {
    return To.strToKeyCode(l) || Io.strToKeyCode(l);
  }
  o2.fromUserSettings = r;
  function n(l) {
    if (l >= 98 && l <= 113) return null;
    switch (l) {
      case 16:
        return "Up";
      case 18:
        return "Down";
      case 15:
        return "Left";
      case 17:
        return "Right";
    }
    return Jn.keyCodeToStr(l);
  }
  o2.toElectronAccelerator = n;
})(Qn ||= {});
var Rr = class s8 {
  constructor(t, e2, i, r, n) {
    this.ctrlKey = t;
    this.shiftKey = e2;
    this.altKey = i;
    this.metaKey = r;
    this.keyCode = n;
  }
  equals(t) {
    return t instanceof s8 && this.ctrlKey === t.ctrlKey && this.shiftKey === t.shiftKey && this.altKey === t.altKey && this.metaKey === t.metaKey && this.keyCode === t.keyCode;
  }
  getHashCode() {
    let t = this.ctrlKey ? "1" : "0", e2 = this.shiftKey ? "1" : "0", i = this.altKey ? "1" : "0", r = this.metaKey ? "1" : "0";
    return `K${t}${e2}${i}${r}${this.keyCode}`;
  }
  isModifierKey() {
    return this.keyCode === 0 || this.keyCode === 5 || this.keyCode === 57 || this.keyCode === 6 || this.keyCode === 4;
  }
  toKeybinding() {
    return new es([this]);
  }
  isDuplicateModifierCase() {
    return this.ctrlKey && this.keyCode === 5 || this.shiftKey && this.keyCode === 4 || this.altKey && this.keyCode === 6 || this.metaKey && this.keyCode === 57;
  }
};
var es = class {
  constructor(t) {
    if (t.length === 0) throw eo("chords");
    this.chords = t;
  }
  getHashCode() {
    let t = "";
    for (let e2 = 0, i = this.chords.length; e2 < i; e2++) e2 !== 0 && (t += ";"), t += this.chords[e2].getHashCode();
    return t;
  }
  equals(t) {
    if (t === null || this.chords.length !== t.chords.length) return false;
    for (let e2 = 0; e2 < this.chords.length; e2++) if (!this.chords[e2].equals(t.chords[e2])) return false;
    return true;
  }
};
function ca(s15) {
  if (s15.charCode) {
    let e2 = String.fromCharCode(s15.charCode).toUpperCase();
    return Qn.fromString(e2);
  }
  let t = s15.keyCode;
  if (t === 3) return 7;
  if (Ei) switch (t) {
    case 59:
      return 85;
    case 60:
      if (Zn) return 97;
      break;
    case 61:
      return 86;
    case 107:
      return 109;
    case 109:
      return 111;
    case 173:
      return 88;
    case 224:
      if (Te) return 57;
      break;
  }
  else if (Bt) {
    if (Te && t === 93) return 57;
    if (!Te && t === 92) return 57;
  }
  return yo[t] || 0;
}
var ua = Te ? 256 : 2048;
var ha = 512;
var da = 1024;
var fa = Te ? 2048 : 256;
var ft = class {
  constructor(t) {
    this._standardKeyboardEventBrand = true;
    let e2 = t;
    this.browserEvent = e2, this.target = e2.target, this.ctrlKey = e2.ctrlKey, this.shiftKey = e2.shiftKey, this.altKey = e2.altKey, this.metaKey = e2.metaKey, this.altGraphKey = e2.getModifierState?.("AltGraph"), this.keyCode = ca(e2), this.code = e2.code, this.ctrlKey = this.ctrlKey || this.keyCode === 5, this.altKey = this.altKey || this.keyCode === 6, this.shiftKey = this.shiftKey || this.keyCode === 4, this.metaKey = this.metaKey || this.keyCode === 57, this._asKeybinding = this._computeKeybinding(), this._asKeyCodeChord = this._computeKeyCodeChord();
  }
  preventDefault() {
    this.browserEvent && this.browserEvent.preventDefault && this.browserEvent.preventDefault();
  }
  stopPropagation() {
    this.browserEvent && this.browserEvent.stopPropagation && this.browserEvent.stopPropagation();
  }
  toKeyCodeChord() {
    return this._asKeyCodeChord;
  }
  equals(t) {
    return this._asKeybinding === t;
  }
  _computeKeybinding() {
    let t = 0;
    this.keyCode !== 5 && this.keyCode !== 4 && this.keyCode !== 6 && this.keyCode !== 57 && (t = this.keyCode);
    let e2 = 0;
    return this.ctrlKey && (e2 |= ua), this.altKey && (e2 |= ha), this.shiftKey && (e2 |= da), this.metaKey && (e2 |= fa), e2 |= t, e2;
  }
  _computeKeyCodeChord() {
    let t = 0;
    return this.keyCode !== 5 && this.keyCode !== 4 && this.keyCode !== 6 && this.keyCode !== 57 && (t = this.keyCode), new Rr(this.ctrlKey, this.shiftKey, this.altKey, this.metaKey, t);
  }
};
var wo = /* @__PURE__ */ new WeakMap();
function pa(s15) {
  if (!s15.parent || s15.parent === s15) return null;
  try {
    let t = s15.location, e2 = s15.parent.location;
    if (t.origin !== "null" && e2.origin !== "null" && t.origin !== e2.origin) return null;
  } catch {
    return null;
  }
  return s15.parent;
}
var Lr = class {
  static getSameOriginWindowChain(t) {
    let e2 = wo.get(t);
    if (!e2) {
      e2 = [], wo.set(t, e2);
      let i = t, r;
      do
        r = pa(i), r ? e2.push({ window: new WeakRef(i), iframeElement: i.frameElement || null }) : e2.push({ window: new WeakRef(i), iframeElement: null }), i = r;
      while (i);
    }
    return e2.slice(0);
  }
  static getPositionOfChildWindowRelativeToAncestorWindow(t, e2) {
    if (!e2 || t === e2) return { top: 0, left: 0 };
    let i = 0, r = 0, n = this.getSameOriginWindowChain(t);
    for (let o2 of n) {
      let l = o2.window.deref();
      if (i += l?.scrollY ?? 0, r += l?.scrollX ?? 0, l === e2 || !o2.iframeElement) break;
      let a2 = o2.iframeElement.getBoundingClientRect();
      i += a2.top, r += a2.left;
    }
    return { top: i, left: r };
  }
};
var qe = class {
  constructor(t, e2) {
    this.timestamp = Date.now(), this.browserEvent = e2, this.leftButton = e2.button === 0, this.middleButton = e2.button === 1, this.rightButton = e2.button === 2, this.buttons = e2.buttons, this.target = e2.target, this.detail = e2.detail || 1, e2.type === "dblclick" && (this.detail = 2), this.ctrlKey = e2.ctrlKey, this.shiftKey = e2.shiftKey, this.altKey = e2.altKey, this.metaKey = e2.metaKey, typeof e2.pageX == "number" ? (this.posx = e2.pageX, this.posy = e2.pageY) : (this.posx = e2.clientX + this.target.ownerDocument.body.scrollLeft + this.target.ownerDocument.documentElement.scrollLeft, this.posy = e2.clientY + this.target.ownerDocument.body.scrollTop + this.target.ownerDocument.documentElement.scrollTop);
    let i = Lr.getPositionOfChildWindowRelativeToAncestorWindow(t, e2.view);
    this.posx -= i.left, this.posy -= i.top;
  }
  preventDefault() {
    this.browserEvent.preventDefault();
  }
  stopPropagation() {
    this.browserEvent.stopPropagation();
  }
};
var xi = class {
  constructor(t, e2 = 0, i = 0) {
    this.browserEvent = t || null, this.target = t ? t.target || t.targetNode || t.srcElement : null, this.deltaY = i, this.deltaX = e2;
    let r = false;
    if (Ti) {
      let n = navigator.userAgent.match(/Chrome\/(\d+)/);
      r = (n ? parseInt(n[1]) : 123) <= 122;
    }
    if (t) {
      let n = t, o2 = t, l = t.view?.devicePixelRatio || 1;
      if (typeof n.wheelDeltaY < "u") r ? this.deltaY = n.wheelDeltaY / (120 * l) : this.deltaY = n.wheelDeltaY / 120;
      else if (typeof o2.VERTICAL_AXIS < "u" && o2.axis === o2.VERTICAL_AXIS) this.deltaY = -o2.detail / 3;
      else if (t.type === "wheel") {
        let a2 = t;
        a2.deltaMode === a2.DOM_DELTA_LINE ? Ei && !Te ? this.deltaY = -t.deltaY / 3 : this.deltaY = -t.deltaY : this.deltaY = -t.deltaY / 40;
      }
      if (typeof n.wheelDeltaX < "u") Sr && wr ? this.deltaX = -(n.wheelDeltaX / 120) : r ? this.deltaX = n.wheelDeltaX / (120 * l) : this.deltaX = n.wheelDeltaX / 120;
      else if (typeof o2.HORIZONTAL_AXIS < "u" && o2.axis === o2.HORIZONTAL_AXIS) this.deltaX = -t.detail / 3;
      else if (t.type === "wheel") {
        let a2 = t;
        a2.deltaMode === a2.DOM_DELTA_LINE ? Ei && !Te ? this.deltaX = -t.deltaX / 3 : this.deltaX = -t.deltaX : this.deltaX = -t.deltaX / 40;
      }
      this.deltaY === 0 && this.deltaX === 0 && t.wheelDelta && (r ? this.deltaY = t.wheelDelta / (120 * l) : this.deltaY = t.wheelDelta / 120);
    }
  }
  preventDefault() {
    this.browserEvent?.preventDefault();
  }
  stopPropagation() {
    this.browserEvent?.stopPropagation();
  }
};
var Do = Object.freeze(function(s15, t) {
  let e2 = setTimeout(s15.bind(t), 0);
  return { dispose() {
    clearTimeout(e2);
  } };
});
var ma;
((i) => {
  function s15(r) {
    return r === i.None || r === i.Cancelled || r instanceof ts ? true : !r || typeof r != "object" ? false : typeof r.isCancellationRequested == "boolean" && typeof r.onCancellationRequested == "function";
  }
  i.isCancellationToken = s15, i.None = Object.freeze({ isCancellationRequested: false, onCancellationRequested: $.None }), i.Cancelled = Object.freeze({ isCancellationRequested: true, onCancellationRequested: Do });
})(ma ||= {});
var ts = class {
  constructor() {
    this._isCancelled = false;
    this._emitter = null;
  }
  cancel() {
    this._isCancelled || (this._isCancelled = true, this._emitter && (this._emitter.fire(void 0), this.dispose()));
  }
  get isCancellationRequested() {
    return this._isCancelled;
  }
  get onCancellationRequested() {
    return this._isCancelled ? Do : (this._emitter || (this._emitter = new v()), this._emitter.event);
  }
  dispose() {
    this._emitter && (this._emitter.dispose(), this._emitter = null);
  }
};
var Ye = class {
  constructor(t, e2) {
    this._isDisposed = false;
    this._token = -1, typeof t == "function" && typeof e2 == "number" && this.setIfNotSet(t, e2);
  }
  dispose() {
    this.cancel(), this._isDisposed = true;
  }
  cancel() {
    this._token !== -1 && (clearTimeout(this._token), this._token = -1);
  }
  cancelAndSet(t, e2) {
    if (this._isDisposed) throw new Rt("Calling 'cancelAndSet' on a disposed TimeoutTimer");
    this.cancel(), this._token = setTimeout(() => {
      this._token = -1, t();
    }, e2);
  }
  setIfNotSet(t, e2) {
    if (this._isDisposed) throw new Rt("Calling 'setIfNotSet' on a disposed TimeoutTimer");
    this._token === -1 && (this._token = setTimeout(() => {
      this._token = -1, t();
    }, e2));
  }
};
var kr = class {
  constructor() {
    this.disposable = void 0;
    this.isDisposed = false;
  }
  cancel() {
    this.disposable?.dispose(), this.disposable = void 0;
  }
  cancelAndSet(t, e2, i = globalThis) {
    if (this.isDisposed) throw new Rt("Calling 'cancelAndSet' on a disposed IntervalTimer");
    this.cancel();
    let r = i.setInterval(() => {
      t();
    }, e2);
    this.disposable = C(() => {
      i.clearInterval(r), this.disposable = void 0;
    });
  }
  dispose() {
    this.cancel(), this.isDisposed = true;
  }
};
var ba;
var Ar;
(function() {
  typeof globalThis.requestIdleCallback != "function" || typeof globalThis.cancelIdleCallback != "function" ? Ar = (s15, t) => {
    Eo(() => {
      if (e2) return;
      let i = Date.now() + 15;
      t(Object.freeze({ didTimeout: true, timeRemaining() {
        return Math.max(0, i - Date.now());
      } }));
    });
    let e2 = false;
    return { dispose() {
      e2 || (e2 = true);
    } };
  } : Ar = (s15, t, e2) => {
    let i = s15.requestIdleCallback(t, typeof e2 == "number" ? { timeout: e2 } : void 0), r = false;
    return { dispose() {
      r || (r = true, s15.cancelIdleCallback(i));
    } };
  }, ba = (s15) => Ar(globalThis, s15);
})();
var va;
((e2) => {
  async function s15(i) {
    let r, n = await Promise.all(i.map((o2) => o2.then((l) => l, (l) => {
      r || (r = l);
    })));
    if (typeof r < "u") throw r;
    return n;
  }
  e2.settled = s15;
  function t(i) {
    return new Promise(async (r, n) => {
      try {
        await i(r, n);
      } catch (o2) {
        n(o2);
      }
    });
  }
  e2.withAsyncBody = t;
})(va ||= {});
var _e = class _e2 {
  static fromArray(t) {
    return new _e2((e2) => {
      e2.emitMany(t);
    });
  }
  static fromPromise(t) {
    return new _e2(async (e2) => {
      e2.emitMany(await t);
    });
  }
  static fromPromises(t) {
    return new _e2(async (e2) => {
      await Promise.all(t.map(async (i) => e2.emitOne(await i)));
    });
  }
  static merge(t) {
    return new _e2(async (e2) => {
      await Promise.all(t.map(async (i) => {
        for await (let r of i) e2.emitOne(r);
      }));
    });
  }
  constructor(t, e2) {
    this._state = 0, this._results = [], this._error = null, this._onReturn = e2, this._onStateChanged = new v(), queueMicrotask(async () => {
      let i = { emitOne: (r) => this.emitOne(r), emitMany: (r) => this.emitMany(r), reject: (r) => this.reject(r) };
      try {
        await Promise.resolve(t(i)), this.resolve();
      } catch (r) {
        this.reject(r);
      } finally {
        i.emitOne = void 0, i.emitMany = void 0, i.reject = void 0;
      }
    });
  }
  [Symbol.asyncIterator]() {
    let t = 0;
    return { next: async () => {
      do {
        if (this._state === 2) throw this._error;
        if (t < this._results.length) return { done: false, value: this._results[t++] };
        if (this._state === 1) return { done: true, value: void 0 };
        await $.toPromise(this._onStateChanged.event);
      } while (true);
    }, return: async () => (this._onReturn?.(), { done: true, value: void 0 }) };
  }
  static map(t, e2) {
    return new _e2(async (i) => {
      for await (let r of t) i.emitOne(e2(r));
    });
  }
  map(t) {
    return _e2.map(this, t);
  }
  static filter(t, e2) {
    return new _e2(async (i) => {
      for await (let r of t) e2(r) && i.emitOne(r);
    });
  }
  filter(t) {
    return _e2.filter(this, t);
  }
  static coalesce(t) {
    return _e2.filter(t, (e2) => !!e2);
  }
  coalesce() {
    return _e2.coalesce(this);
  }
  static async toPromise(t) {
    let e2 = [];
    for await (let i of t) e2.push(i);
    return e2;
  }
  toPromise() {
    return _e2.toPromise(this);
  }
  emitOne(t) {
    this._state === 0 && (this._results.push(t), this._onStateChanged.fire());
  }
  emitMany(t) {
    this._state === 0 && (this._results = this._results.concat(t), this._onStateChanged.fire());
  }
  resolve() {
    this._state === 0 && (this._state = 1, this._onStateChanged.fire());
  }
  reject(t) {
    this._state === 0 && (this._state = 2, this._error = t, this._onStateChanged.fire());
  }
};
_e.EMPTY = _e.fromArray([]);
function Lo(s15) {
  return 55296 <= s15 && s15 <= 56319;
}
function is(s15) {
  return 56320 <= s15 && s15 <= 57343;
}
function Ao(s15, t) {
  return (s15 - 55296 << 10) + (t - 56320) + 65536;
}
function Mo(s15) {
  return ns(s15, 0);
}
function ns(s15, t) {
  switch (typeof s15) {
    case "object":
      return s15 === null ? je(349, t) : Array.isArray(s15) ? Ea(s15, t) : Ta(s15, t);
    case "string":
      return Po(s15, t);
    case "boolean":
      return Sa(s15, t);
    case "number":
      return je(s15, t);
    case "undefined":
      return je(937, t);
    default:
      return je(617, t);
  }
}
function je(s15, t) {
  return (t << 5) - t + s15 | 0;
}
function Sa(s15, t) {
  return je(s15 ? 433 : 863, t);
}
function Po(s15, t) {
  t = je(149417, t);
  for (let e2 = 0, i = s15.length; e2 < i; e2++) t = je(s15.charCodeAt(e2), t);
  return t;
}
function Ea(s15, t) {
  return t = je(104579, t), s15.reduce((e2, i) => ns(i, e2), t);
}
function Ta(s15, t) {
  return t = je(181387, t), Object.keys(s15).sort().reduce((e2, i) => (e2 = Po(i, e2), ns(s15[i], e2)), t);
}
function rs(s15, t, e2 = 32) {
  let i = e2 - t, r = ~((1 << i) - 1);
  return (s15 << t | (r & s15) >>> i) >>> 0;
}
function ko(s15, t = 0, e2 = s15.byteLength, i = 0) {
  for (let r = 0; r < e2; r++) s15[t + r] = i;
}
function Ia(s15, t, e2 = "0") {
  for (; s15.length < t; ) s15 = e2 + s15;
  return s15;
}
function wi(s15, t = 32) {
  return s15 instanceof ArrayBuffer ? Array.from(new Uint8Array(s15)).map((e2) => e2.toString(16).padStart(2, "0")).join("") : Ia((s15 >>> 0).toString(16), t / 4);
}
var Cr = class Cr2 {
  constructor() {
    this._h0 = 1732584193;
    this._h1 = 4023233417;
    this._h2 = 2562383102;
    this._h3 = 271733878;
    this._h4 = 3285377520;
    this._buff = new Uint8Array(67), this._buffDV = new DataView(this._buff.buffer), this._buffLen = 0, this._totalLen = 0, this._leftoverHighSurrogate = 0, this._finished = false;
  }
  update(t) {
    let e2 = t.length;
    if (e2 === 0) return;
    let i = this._buff, r = this._buffLen, n = this._leftoverHighSurrogate, o2, l;
    for (n !== 0 ? (o2 = n, l = -1, n = 0) : (o2 = t.charCodeAt(0), l = 0); ; ) {
      let a2 = o2;
      if (Lo(o2)) if (l + 1 < e2) {
        let u = t.charCodeAt(l + 1);
        is(u) ? (l++, a2 = Ao(o2, u)) : a2 = 65533;
      } else {
        n = o2;
        break;
      }
      else is(o2) && (a2 = 65533);
      if (r = this._push(i, r, a2), l++, l < e2) o2 = t.charCodeAt(l);
      else break;
    }
    this._buffLen = r, this._leftoverHighSurrogate = n;
  }
  _push(t, e2, i) {
    return i < 128 ? t[e2++] = i : i < 2048 ? (t[e2++] = 192 | (i & 1984) >>> 6, t[e2++] = 128 | (i & 63) >>> 0) : i < 65536 ? (t[e2++] = 224 | (i & 61440) >>> 12, t[e2++] = 128 | (i & 4032) >>> 6, t[e2++] = 128 | (i & 63) >>> 0) : (t[e2++] = 240 | (i & 1835008) >>> 18, t[e2++] = 128 | (i & 258048) >>> 12, t[e2++] = 128 | (i & 4032) >>> 6, t[e2++] = 128 | (i & 63) >>> 0), e2 >= 64 && (this._step(), e2 -= 64, this._totalLen += 64, t[0] = t[64], t[1] = t[65], t[2] = t[66]), e2;
  }
  digest() {
    return this._finished || (this._finished = true, this._leftoverHighSurrogate && (this._leftoverHighSurrogate = 0, this._buffLen = this._push(this._buff, this._buffLen, 65533)), this._totalLen += this._buffLen, this._wrapUp()), wi(this._h0) + wi(this._h1) + wi(this._h2) + wi(this._h3) + wi(this._h4);
  }
  _wrapUp() {
    this._buff[this._buffLen++] = 128, ko(this._buff, this._buffLen), this._buffLen > 56 && (this._step(), ko(this._buff));
    let t = 8 * this._totalLen;
    this._buffDV.setUint32(56, Math.floor(t / 4294967296), false), this._buffDV.setUint32(60, t % 4294967296, false), this._step();
  }
  _step() {
    let t = Cr2._bigBlock32, e2 = this._buffDV;
    for (let c2 = 0; c2 < 64; c2 += 4) t.setUint32(c2, e2.getUint32(c2, false), false);
    for (let c2 = 64; c2 < 320; c2 += 4) t.setUint32(c2, rs(t.getUint32(c2 - 12, false) ^ t.getUint32(c2 - 32, false) ^ t.getUint32(c2 - 56, false) ^ t.getUint32(c2 - 64, false), 1), false);
    let i = this._h0, r = this._h1, n = this._h2, o2 = this._h3, l = this._h4, a2, u, h2;
    for (let c2 = 0; c2 < 80; c2++) c2 < 20 ? (a2 = r & n | ~r & o2, u = 1518500249) : c2 < 40 ? (a2 = r ^ n ^ o2, u = 1859775393) : c2 < 60 ? (a2 = r & n | r & o2 | n & o2, u = 2400959708) : (a2 = r ^ n ^ o2, u = 3395469782), h2 = rs(i, 5) + a2 + l + u + t.getUint32(c2 * 4, false) & 4294967295, l = o2, o2 = n, n = rs(r, 30), r = i, i = h2;
    this._h0 = this._h0 + i & 4294967295, this._h1 = this._h1 + r & 4294967295, this._h2 = this._h2 + n & 4294967295, this._h3 = this._h3 + o2 & 4294967295, this._h4 = this._h4 + l & 4294967295;
  }
};
Cr._bigBlock32 = new DataView(new ArrayBuffer(320));
var { registerWindow: Bh, getWindow: be, getDocument: Nh, getWindows: Fh, getWindowsCount: Hh, getWindowId: Oo, getWindowById: Wh, hasWindow: Uh, onDidRegisterWindow: No, onWillUnregisterWindow: Kh, onDidUnregisterWindow: zh } = (function() {
  let s15 = /* @__PURE__ */ new Map();
  fe;
  let t = { window: fe, disposables: new Ee() };
  s15.set(fe.vscodeWindowId, t);
  let e2 = new v(), i = new v(), r = new v();
  function n(o2, l) {
    return (typeof o2 == "number" ? s15.get(o2) : void 0) ?? (l ? t : void 0);
  }
  return { onDidRegisterWindow: e2.event, onWillUnregisterWindow: r.event, onDidUnregisterWindow: i.event, registerWindow(o2) {
    if (s15.has(o2.vscodeWindowId)) return D.None;
    let l = new Ee(), a2 = { window: o2, disposables: l.add(new Ee()) };
    return s15.set(o2.vscodeWindowId, a2), l.add(C(() => {
      s15.delete(o2.vscodeWindowId), i.fire(o2);
    })), l.add(L(o2, Y2.BEFORE_UNLOAD, () => {
      r.fire(o2);
    })), e2.fire(a2), l;
  }, getWindows() {
    return s15.values();
  }, getWindowsCount() {
    return s15.size;
  }, getWindowId(o2) {
    return o2.vscodeWindowId;
  }, hasWindow(o2) {
    return s15.has(o2);
  }, getWindowById: n, getWindow(o2) {
    let l = o2;
    if (l?.ownerDocument?.defaultView) return l.ownerDocument.defaultView.window;
    let a2 = o2;
    return a2?.view ? a2.view.window : fe;
  }, getDocument(o2) {
    return be(o2).document;
  } };
})();
var ss = class {
  constructor(t, e2, i, r) {
    this._node = t, this._type = e2, this._handler = i, this._options = r || false, this._node.addEventListener(this._type, this._handler, this._options);
  }
  dispose() {
    this._handler && (this._node.removeEventListener(this._type, this._handler, this._options), this._node = null, this._handler = null);
  }
};
function L(s15, t, e2, i) {
  return new ss(s15, t, e2, i);
}
function ya(s15, t) {
  return function(e2) {
    return t(new qe(s15, e2));
  };
}
function xa(s15) {
  return function(t) {
    return s15(new ft(t));
  };
}
var os = function(t, e2, i, r) {
  let n = i;
  return e2 === "click" || e2 === "mousedown" || e2 === "contextmenu" ? n = ya(be(t), i) : (e2 === "keydown" || e2 === "keypress" || e2 === "keyup") && (n = xa(i)), L(t, e2, n, r);
};
var wa;
var mt;
var Mr = class extends kr {
  constructor(t) {
    super(), this.defaultTarget = t && be(t);
  }
  cancelAndSet(t, e2, i) {
    return super.cancelAndSet(t, e2, i ?? this.defaultTarget);
  }
};
var Di = class {
  constructor(t, e2 = 0) {
    this._runner = t, this.priority = e2, this._canceled = false;
  }
  dispose() {
    this._canceled = true;
  }
  execute() {
    if (!this._canceled) try {
      this._runner();
    } catch (t) {
      Lt(t);
    }
  }
  static sort(t, e2) {
    return e2.priority - t.priority;
  }
};
(function() {
  let s15 = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), e2 = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), r = (n) => {
    e2.set(n, false);
    let o2 = s15.get(n) ?? [];
    for (t.set(n, o2), s15.set(n, []), i.set(n, true); o2.length > 0; ) o2.sort(Di.sort), o2.shift().execute();
    i.set(n, false);
  };
  mt = (n, o2, l = 0) => {
    let a2 = Oo(n), u = new Di(o2, l), h2 = s15.get(a2);
    return h2 || (h2 = [], s15.set(a2, h2)), h2.push(u), e2.get(a2) || (e2.set(a2, true), n.requestAnimationFrame(() => r(a2))), u;
  }, wa = (n, o2, l) => {
    let a2 = Oo(n);
    if (i.get(a2)) {
      let u = new Di(o2, l), h2 = t.get(a2);
      return h2 || (h2 = [], t.set(a2, h2)), h2.push(u), u;
    } else return mt(n, o2, l);
  };
})();
var pt = class pt2 {
  constructor(t, e2) {
    this.width = t;
    this.height = e2;
  }
  with(t = this.width, e2 = this.height) {
    return t !== this.width || e2 !== this.height ? new pt2(t, e2) : this;
  }
  static is(t) {
    return typeof t == "object" && typeof t.height == "number" && typeof t.width == "number";
  }
  static lift(t) {
    return t instanceof pt2 ? t : new pt2(t.width, t.height);
  }
  static equals(t, e2) {
    return t === e2 ? true : !t || !e2 ? false : t.width === e2.width && t.height === e2.height;
  }
};
pt.None = new pt(0, 0);
function Fo(s15) {
  let t = s15.getBoundingClientRect(), e2 = be(s15);
  return { left: t.left + e2.scrollX, top: t.top + e2.scrollY, width: t.width, height: t.height };
}
var Gh = new class {
  constructor() {
    this.mutationObservers = /* @__PURE__ */ new Map();
  }
  observe(s15, t, e2) {
    let i = this.mutationObservers.get(s15);
    i || (i = /* @__PURE__ */ new Map(), this.mutationObservers.set(s15, i));
    let r = Mo(e2), n = i.get(r);
    if (n) n.users += 1;
    else {
      let o2 = new v(), l = new MutationObserver((u) => o2.fire(u));
      l.observe(s15, e2);
      let a2 = n = { users: 1, observer: l, onDidMutate: o2.event };
      t.add(C(() => {
        a2.users -= 1, a2.users === 0 && (o2.dispose(), l.disconnect(), i?.delete(r), i?.size === 0 && this.mutationObservers.delete(s15));
      })), i.set(r, n);
    }
    return n.onDidMutate;
  }
}();
var Y2 = { CLICK: "click", AUXCLICK: "auxclick", DBLCLICK: "dblclick", MOUSE_UP: "mouseup", MOUSE_DOWN: "mousedown", MOUSE_OVER: "mouseover", MOUSE_MOVE: "mousemove", MOUSE_OUT: "mouseout", MOUSE_ENTER: "mouseenter", MOUSE_LEAVE: "mouseleave", MOUSE_WHEEL: "wheel", POINTER_UP: "pointerup", POINTER_DOWN: "pointerdown", POINTER_MOVE: "pointermove", POINTER_LEAVE: "pointerleave", CONTEXT_MENU: "contextmenu", WHEEL: "wheel", KEY_DOWN: "keydown", KEY_PRESS: "keypress", KEY_UP: "keyup", LOAD: "load", BEFORE_UNLOAD: "beforeunload", UNLOAD: "unload", PAGE_SHOW: "pageshow", PAGE_HIDE: "pagehide", PASTE: "paste", ABORT: "abort", ERROR: "error", RESIZE: "resize", SCROLL: "scroll", FULLSCREEN_CHANGE: "fullscreenchange", WK_FULLSCREEN_CHANGE: "webkitfullscreenchange", SELECT: "select", CHANGE: "change", SUBMIT: "submit", RESET: "reset", FOCUS: "focus", FOCUS_IN: "focusin", FOCUS_OUT: "focusout", BLUR: "blur", INPUT: "input", STORAGE: "storage", DRAG_START: "dragstart", DRAG: "drag", DRAG_ENTER: "dragenter", DRAG_LEAVE: "dragleave", DRAG_OVER: "dragover", DROP: "drop", DRAG_END: "dragend", ANIMATION_START: Bt ? "webkitAnimationStart" : "animationstart", ANIMATION_END: Bt ? "webkitAnimationEnd" : "animationend", ANIMATION_ITERATION: Bt ? "webkitAnimationIteration" : "animationiteration" };
var Da = /([\w\-]+)?(#([\w\-]+))?((\.([\w\-]+))*)/;
function Ho(s15, t, e2, ...i) {
  let r = Da.exec(t);
  if (!r) throw new Error("Bad use of emmet");
  let n = r[1] || "div", o2;
  return s15 !== "http://www.w3.org/1999/xhtml" ? o2 = document.createElementNS(s15, n) : o2 = document.createElement(n), r[3] && (o2.id = r[3]), r[4] && (o2.className = r[4].replace(/\./g, " ").trim()), e2 && Object.entries(e2).forEach(([l, a2]) => {
    typeof a2 > "u" || (/^on\w+$/.test(l) ? o2[l] = a2 : l === "selected" ? a2 && o2.setAttribute(l, "true") : o2.setAttribute(l, a2));
  }), o2.append(...i), o2;
}
function Ra(s15, t, ...e2) {
  return Ho("http://www.w3.org/1999/xhtml", s15, t, ...e2);
}
Ra.SVG = function(s15, t, ...e2) {
  return Ho("http://www.w3.org/2000/svg", s15, t, ...e2);
};
var ls = class {
  constructor(t) {
    this.domNode = t;
    this._maxWidth = "";
    this._width = "";
    this._height = "";
    this._top = "";
    this._left = "";
    this._bottom = "";
    this._right = "";
    this._paddingTop = "";
    this._paddingLeft = "";
    this._paddingBottom = "";
    this._paddingRight = "";
    this._fontFamily = "";
    this._fontWeight = "";
    this._fontSize = "";
    this._fontStyle = "";
    this._fontFeatureSettings = "";
    this._fontVariationSettings = "";
    this._textDecoration = "";
    this._lineHeight = "";
    this._letterSpacing = "";
    this._className = "";
    this._display = "";
    this._position = "";
    this._visibility = "";
    this._color = "";
    this._backgroundColor = "";
    this._layerHint = false;
    this._contain = "none";
    this._boxShadow = "";
  }
  setMaxWidth(t) {
    let e2 = Ie(t);
    this._maxWidth !== e2 && (this._maxWidth = e2, this.domNode.style.maxWidth = this._maxWidth);
  }
  setWidth(t) {
    let e2 = Ie(t);
    this._width !== e2 && (this._width = e2, this.domNode.style.width = this._width);
  }
  setHeight(t) {
    let e2 = Ie(t);
    this._height !== e2 && (this._height = e2, this.domNode.style.height = this._height);
  }
  setTop(t) {
    let e2 = Ie(t);
    this._top !== e2 && (this._top = e2, this.domNode.style.top = this._top);
  }
  setLeft(t) {
    let e2 = Ie(t);
    this._left !== e2 && (this._left = e2, this.domNode.style.left = this._left);
  }
  setBottom(t) {
    let e2 = Ie(t);
    this._bottom !== e2 && (this._bottom = e2, this.domNode.style.bottom = this._bottom);
  }
  setRight(t) {
    let e2 = Ie(t);
    this._right !== e2 && (this._right = e2, this.domNode.style.right = this._right);
  }
  setPaddingTop(t) {
    let e2 = Ie(t);
    this._paddingTop !== e2 && (this._paddingTop = e2, this.domNode.style.paddingTop = this._paddingTop);
  }
  setPaddingLeft(t) {
    let e2 = Ie(t);
    this._paddingLeft !== e2 && (this._paddingLeft = e2, this.domNode.style.paddingLeft = this._paddingLeft);
  }
  setPaddingBottom(t) {
    let e2 = Ie(t);
    this._paddingBottom !== e2 && (this._paddingBottom = e2, this.domNode.style.paddingBottom = this._paddingBottom);
  }
  setPaddingRight(t) {
    let e2 = Ie(t);
    this._paddingRight !== e2 && (this._paddingRight = e2, this.domNode.style.paddingRight = this._paddingRight);
  }
  setFontFamily(t) {
    this._fontFamily !== t && (this._fontFamily = t, this.domNode.style.fontFamily = this._fontFamily);
  }
  setFontWeight(t) {
    this._fontWeight !== t && (this._fontWeight = t, this.domNode.style.fontWeight = this._fontWeight);
  }
  setFontSize(t) {
    let e2 = Ie(t);
    this._fontSize !== e2 && (this._fontSize = e2, this.domNode.style.fontSize = this._fontSize);
  }
  setFontStyle(t) {
    this._fontStyle !== t && (this._fontStyle = t, this.domNode.style.fontStyle = this._fontStyle);
  }
  setFontFeatureSettings(t) {
    this._fontFeatureSettings !== t && (this._fontFeatureSettings = t, this.domNode.style.fontFeatureSettings = this._fontFeatureSettings);
  }
  setFontVariationSettings(t) {
    this._fontVariationSettings !== t && (this._fontVariationSettings = t, this.domNode.style.fontVariationSettings = this._fontVariationSettings);
  }
  setTextDecoration(t) {
    this._textDecoration !== t && (this._textDecoration = t, this.domNode.style.textDecoration = this._textDecoration);
  }
  setLineHeight(t) {
    let e2 = Ie(t);
    this._lineHeight !== e2 && (this._lineHeight = e2, this.domNode.style.lineHeight = this._lineHeight);
  }
  setLetterSpacing(t) {
    let e2 = Ie(t);
    this._letterSpacing !== e2 && (this._letterSpacing = e2, this.domNode.style.letterSpacing = this._letterSpacing);
  }
  setClassName(t) {
    this._className !== t && (this._className = t, this.domNode.className = this._className);
  }
  toggleClassName(t, e2) {
    this.domNode.classList.toggle(t, e2), this._className = this.domNode.className;
  }
  setDisplay(t) {
    this._display !== t && (this._display = t, this.domNode.style.display = this._display);
  }
  setPosition(t) {
    this._position !== t && (this._position = t, this.domNode.style.position = this._position);
  }
  setVisibility(t) {
    this._visibility !== t && (this._visibility = t, this.domNode.style.visibility = this._visibility);
  }
  setColor(t) {
    this._color !== t && (this._color = t, this.domNode.style.color = this._color);
  }
  setBackgroundColor(t) {
    this._backgroundColor !== t && (this._backgroundColor = t, this.domNode.style.backgroundColor = this._backgroundColor);
  }
  setLayerHinting(t) {
    this._layerHint !== t && (this._layerHint = t, this.domNode.style.transform = this._layerHint ? "translate3d(0px, 0px, 0px)" : "");
  }
  setBoxShadow(t) {
    this._boxShadow !== t && (this._boxShadow = t, this.domNode.style.boxShadow = t);
  }
  setContain(t) {
    this._contain !== t && (this._contain = t, this.domNode.style.contain = this._contain);
  }
  setAttribute(t, e2) {
    this.domNode.setAttribute(t, e2);
  }
  removeAttribute(t) {
    this.domNode.removeAttribute(t);
  }
  appendChild(t) {
    this.domNode.appendChild(t.domNode);
  }
  removeChild(t) {
    this.domNode.removeChild(t.domNode);
  }
};
function Ie(s15) {
  return typeof s15 == "number" ? `${s15}px` : s15;
}
function _t(s15) {
  return new ls(s15);
}
var Wt = class {
  constructor() {
    this._hooks = new Ee();
    this._pointerMoveCallback = null;
    this._onStopCallback = null;
  }
  dispose() {
    this.stopMonitoring(false), this._hooks.dispose();
  }
  stopMonitoring(t, e2) {
    if (!this.isMonitoring()) return;
    this._hooks.clear(), this._pointerMoveCallback = null;
    let i = this._onStopCallback;
    this._onStopCallback = null, t && i && i(e2);
  }
  isMonitoring() {
    return !!this._pointerMoveCallback;
  }
  startMonitoring(t, e2, i, r, n) {
    this.isMonitoring() && this.stopMonitoring(false), this._pointerMoveCallback = r, this._onStopCallback = n;
    let o2 = t;
    try {
      t.setPointerCapture(e2), this._hooks.add(C(() => {
        try {
          t.releasePointerCapture(e2);
        } catch {
        }
      }));
    } catch {
      o2 = be(t);
    }
    this._hooks.add(L(o2, Y2.POINTER_MOVE, (l) => {
      if (l.buttons !== i) {
        this.stopMonitoring(true);
        return;
      }
      l.preventDefault(), this._pointerMoveCallback(l);
    })), this._hooks.add(L(o2, Y2.POINTER_UP, (l) => this.stopMonitoring(true)));
  }
};
function Wo(s15, t, e2) {
  let i = null, r = null;
  if (typeof e2.value == "function" ? (i = "value", r = e2.value, r.length !== 0 && console.warn("Memoize should only be used in functions with zero parameters")) : typeof e2.get == "function" && (i = "get", r = e2.get), !r) throw new Error("not supported");
  let n = `$memoize$${t}`;
  e2[i] = function(...o2) {
    return this.hasOwnProperty(n) || Object.defineProperty(this, n, { configurable: false, enumerable: false, writable: false, value: r.apply(this, o2) }), this[n];
  };
}
var He;
((n) => (n.Tap = "-xterm-gesturetap", n.Change = "-xterm-gesturechange", n.Start = "-xterm-gesturestart", n.End = "-xterm-gesturesend", n.Contextmenu = "-xterm-gesturecontextmenu"))(He ||= {});
var Q = class Q2 extends D {
  constructor() {
    super();
    this.dispatched = false;
    this.targets = new Ct();
    this.ignoreTargets = new Ct();
    this.activeTouches = {}, this.handle = null, this._lastSetTapCountTime = 0, this._register($.runAndSubscribe(No, ({ window: e2, disposables: i }) => {
      i.add(L(e2.document, "touchstart", (r) => this.onTouchStart(r), { passive: false })), i.add(L(e2.document, "touchend", (r) => this.onTouchEnd(e2, r))), i.add(L(e2.document, "touchmove", (r) => this.onTouchMove(r), { passive: false }));
    }, { window: fe, disposables: this._store }));
  }
  static addTarget(e2) {
    if (!Q2.isTouchDevice()) return D.None;
    Q2.INSTANCE || (Q2.INSTANCE = Gn(new Q2()));
    let i = Q2.INSTANCE.targets.push(e2);
    return C(i);
  }
  static ignoreTarget(e2) {
    if (!Q2.isTouchDevice()) return D.None;
    Q2.INSTANCE || (Q2.INSTANCE = Gn(new Q2()));
    let i = Q2.INSTANCE.ignoreTargets.push(e2);
    return C(i);
  }
  static isTouchDevice() {
    return "ontouchstart" in fe || navigator.maxTouchPoints > 0;
  }
  dispose() {
    this.handle && (this.handle.dispose(), this.handle = null), super.dispose();
  }
  onTouchStart(e2) {
    let i = Date.now();
    this.handle && (this.handle.dispose(), this.handle = null);
    for (let r = 0, n = e2.targetTouches.length; r < n; r++) {
      let o2 = e2.targetTouches.item(r);
      this.activeTouches[o2.identifier] = { id: o2.identifier, initialTarget: o2.target, initialTimeStamp: i, initialPageX: o2.pageX, initialPageY: o2.pageY, rollingTimestamps: [i], rollingPageX: [o2.pageX], rollingPageY: [o2.pageY] };
      let l = this.newGestureEvent(He.Start, o2.target);
      l.pageX = o2.pageX, l.pageY = o2.pageY, this.dispatchEvent(l);
    }
    this.dispatched && (e2.preventDefault(), e2.stopPropagation(), this.dispatched = false);
  }
  onTouchEnd(e2, i) {
    let r = Date.now(), n = Object.keys(this.activeTouches).length;
    for (let o2 = 0, l = i.changedTouches.length; o2 < l; o2++) {
      let a2 = i.changedTouches.item(o2);
      if (!this.activeTouches.hasOwnProperty(String(a2.identifier))) {
        console.warn("move of an UNKNOWN touch", a2);
        continue;
      }
      let u = this.activeTouches[a2.identifier], h2 = Date.now() - u.initialTimeStamp;
      if (h2 < Q2.HOLD_DELAY && Math.abs(u.initialPageX - Se(u.rollingPageX)) < 30 && Math.abs(u.initialPageY - Se(u.rollingPageY)) < 30) {
        let c2 = this.newGestureEvent(He.Tap, u.initialTarget);
        c2.pageX = Se(u.rollingPageX), c2.pageY = Se(u.rollingPageY), this.dispatchEvent(c2);
      } else if (h2 >= Q2.HOLD_DELAY && Math.abs(u.initialPageX - Se(u.rollingPageX)) < 30 && Math.abs(u.initialPageY - Se(u.rollingPageY)) < 30) {
        let c2 = this.newGestureEvent(He.Contextmenu, u.initialTarget);
        c2.pageX = Se(u.rollingPageX), c2.pageY = Se(u.rollingPageY), this.dispatchEvent(c2);
      } else if (n === 1) {
        let c2 = Se(u.rollingPageX), d2 = Se(u.rollingPageY), _2 = Se(u.rollingTimestamps) - u.rollingTimestamps[0], p = c2 - u.rollingPageX[0], m = d2 - u.rollingPageY[0], f2 = [...this.targets].filter((A) => u.initialTarget instanceof Node && A.contains(u.initialTarget));
        this.inertia(e2, f2, r, Math.abs(p) / _2, p > 0 ? 1 : -1, c2, Math.abs(m) / _2, m > 0 ? 1 : -1, d2);
      }
      this.dispatchEvent(this.newGestureEvent(He.End, u.initialTarget)), delete this.activeTouches[a2.identifier];
    }
    this.dispatched && (i.preventDefault(), i.stopPropagation(), this.dispatched = false);
  }
  newGestureEvent(e2, i) {
    let r = document.createEvent("CustomEvent");
    return r.initEvent(e2, false, true), r.initialTarget = i, r.tapCount = 0, r;
  }
  dispatchEvent(e2) {
    if (e2.type === He.Tap) {
      let i = (/* @__PURE__ */ new Date()).getTime(), r = 0;
      i - this._lastSetTapCountTime > Q2.CLEAR_TAP_COUNT_TIME ? r = 1 : r = 2, this._lastSetTapCountTime = i, e2.tapCount = r;
    } else (e2.type === He.Change || e2.type === He.Contextmenu) && (this._lastSetTapCountTime = 0);
    if (e2.initialTarget instanceof Node) {
      for (let r of this.ignoreTargets) if (r.contains(e2.initialTarget)) return;
      let i = [];
      for (let r of this.targets) if (r.contains(e2.initialTarget)) {
        let n = 0, o2 = e2.initialTarget;
        for (; o2 && o2 !== r; ) n++, o2 = o2.parentElement;
        i.push([n, r]);
      }
      i.sort((r, n) => r[0] - n[0]);
      for (let [r, n] of i) n.dispatchEvent(e2), this.dispatched = true;
    }
  }
  inertia(e2, i, r, n, o2, l, a2, u, h2) {
    this.handle = mt(e2, () => {
      let c2 = Date.now(), d2 = c2 - r, _2 = 0, p = 0, m = true;
      n += Q2.SCROLL_FRICTION * d2, a2 += Q2.SCROLL_FRICTION * d2, n > 0 && (m = false, _2 = o2 * n * d2), a2 > 0 && (m = false, p = u * a2 * d2);
      let f2 = this.newGestureEvent(He.Change);
      f2.translationX = _2, f2.translationY = p, i.forEach((A) => A.dispatchEvent(f2)), m || this.inertia(e2, i, c2, n, o2, l + _2, a2, u, h2 + p);
    });
  }
  onTouchMove(e2) {
    let i = Date.now();
    for (let r = 0, n = e2.changedTouches.length; r < n; r++) {
      let o2 = e2.changedTouches.item(r);
      if (!this.activeTouches.hasOwnProperty(String(o2.identifier))) {
        console.warn("end of an UNKNOWN touch", o2);
        continue;
      }
      let l = this.activeTouches[o2.identifier], a2 = this.newGestureEvent(He.Change, l.initialTarget);
      a2.translationX = o2.pageX - Se(l.rollingPageX), a2.translationY = o2.pageY - Se(l.rollingPageY), a2.pageX = o2.pageX, a2.pageY = o2.pageY, this.dispatchEvent(a2), l.rollingPageX.length > 3 && (l.rollingPageX.shift(), l.rollingPageY.shift(), l.rollingTimestamps.shift()), l.rollingPageX.push(o2.pageX), l.rollingPageY.push(o2.pageY), l.rollingTimestamps.push(i);
    }
    this.dispatched && (e2.preventDefault(), e2.stopPropagation(), this.dispatched = false);
  }
};
Q.SCROLL_FRICTION = -5e-3, Q.HOLD_DELAY = 700, Q.CLEAR_TAP_COUNT_TIME = 400, M2([Wo], Q, "isTouchDevice", 1);
var Pr = Q;
var lt = class extends D {
  onclick(t, e2) {
    this._register(L(t, Y2.CLICK, (i) => e2(new qe(be(t), i))));
  }
  onmousedown(t, e2) {
    this._register(L(t, Y2.MOUSE_DOWN, (i) => e2(new qe(be(t), i))));
  }
  onmouseover(t, e2) {
    this._register(L(t, Y2.MOUSE_OVER, (i) => e2(new qe(be(t), i))));
  }
  onmouseleave(t, e2) {
    this._register(L(t, Y2.MOUSE_LEAVE, (i) => e2(new qe(be(t), i))));
  }
  onkeydown(t, e2) {
    this._register(L(t, Y2.KEY_DOWN, (i) => e2(new ft(i))));
  }
  onkeyup(t, e2) {
    this._register(L(t, Y2.KEY_UP, (i) => e2(new ft(i))));
  }
  oninput(t, e2) {
    this._register(L(t, Y2.INPUT, e2));
  }
  onblur(t, e2) {
    this._register(L(t, Y2.BLUR, e2));
  }
  onfocus(t, e2) {
    this._register(L(t, Y2.FOCUS, e2));
  }
  onchange(t, e2) {
    this._register(L(t, Y2.CHANGE, e2));
  }
  ignoreGesture(t) {
    return Pr.ignoreTarget(t);
  }
};
var Uo = 11;
var Or = class extends lt {
  constructor(t) {
    super(), this._onActivate = t.onActivate, this.bgDomNode = document.createElement("div"), this.bgDomNode.className = "arrow-background", this.bgDomNode.style.position = "absolute", this.bgDomNode.style.width = t.bgWidth + "px", this.bgDomNode.style.height = t.bgHeight + "px", typeof t.top < "u" && (this.bgDomNode.style.top = "0px"), typeof t.left < "u" && (this.bgDomNode.style.left = "0px"), typeof t.bottom < "u" && (this.bgDomNode.style.bottom = "0px"), typeof t.right < "u" && (this.bgDomNode.style.right = "0px"), this.domNode = document.createElement("div"), this.domNode.className = t.className, this.domNode.style.position = "absolute", this.domNode.style.width = Uo + "px", this.domNode.style.height = Uo + "px", typeof t.top < "u" && (this.domNode.style.top = t.top + "px"), typeof t.left < "u" && (this.domNode.style.left = t.left + "px"), typeof t.bottom < "u" && (this.domNode.style.bottom = t.bottom + "px"), typeof t.right < "u" && (this.domNode.style.right = t.right + "px"), this._pointerMoveMonitor = this._register(new Wt()), this._register(os(this.bgDomNode, Y2.POINTER_DOWN, (e2) => this._arrowPointerDown(e2))), this._register(os(this.domNode, Y2.POINTER_DOWN, (e2) => this._arrowPointerDown(e2))), this._pointerdownRepeatTimer = this._register(new Mr()), this._pointerdownScheduleRepeatTimer = this._register(new Ye());
  }
  _arrowPointerDown(t) {
    if (!t.target || !(t.target instanceof Element)) return;
    let e2 = () => {
      this._pointerdownRepeatTimer.cancelAndSet(() => this._onActivate(), 1e3 / 24, be(t));
    };
    this._onActivate(), this._pointerdownRepeatTimer.cancel(), this._pointerdownScheduleRepeatTimer.cancelAndSet(e2, 200), this._pointerMoveMonitor.startMonitoring(t.target, t.pointerId, t.buttons, (i) => {
    }, () => {
      this._pointerdownRepeatTimer.cancel(), this._pointerdownScheduleRepeatTimer.cancel();
    }), t.preventDefault();
  }
};
var cs = class s9 {
  constructor(t, e2, i, r, n, o2, l) {
    this._forceIntegerValues = t;
    this._scrollStateBrand = void 0;
    this._forceIntegerValues && (e2 = e2 | 0, i = i | 0, r = r | 0, n = n | 0, o2 = o2 | 0, l = l | 0), this.rawScrollLeft = r, this.rawScrollTop = l, e2 < 0 && (e2 = 0), r + e2 > i && (r = i - e2), r < 0 && (r = 0), n < 0 && (n = 0), l + n > o2 && (l = o2 - n), l < 0 && (l = 0), this.width = e2, this.scrollWidth = i, this.scrollLeft = r, this.height = n, this.scrollHeight = o2, this.scrollTop = l;
  }
  equals(t) {
    return this.rawScrollLeft === t.rawScrollLeft && this.rawScrollTop === t.rawScrollTop && this.width === t.width && this.scrollWidth === t.scrollWidth && this.scrollLeft === t.scrollLeft && this.height === t.height && this.scrollHeight === t.scrollHeight && this.scrollTop === t.scrollTop;
  }
  withScrollDimensions(t, e2) {
    return new s9(this._forceIntegerValues, typeof t.width < "u" ? t.width : this.width, typeof t.scrollWidth < "u" ? t.scrollWidth : this.scrollWidth, e2 ? this.rawScrollLeft : this.scrollLeft, typeof t.height < "u" ? t.height : this.height, typeof t.scrollHeight < "u" ? t.scrollHeight : this.scrollHeight, e2 ? this.rawScrollTop : this.scrollTop);
  }
  withScrollPosition(t) {
    return new s9(this._forceIntegerValues, this.width, this.scrollWidth, typeof t.scrollLeft < "u" ? t.scrollLeft : this.rawScrollLeft, this.height, this.scrollHeight, typeof t.scrollTop < "u" ? t.scrollTop : this.rawScrollTop);
  }
  createScrollEvent(t, e2) {
    let i = this.width !== t.width, r = this.scrollWidth !== t.scrollWidth, n = this.scrollLeft !== t.scrollLeft, o2 = this.height !== t.height, l = this.scrollHeight !== t.scrollHeight, a2 = this.scrollTop !== t.scrollTop;
    return { inSmoothScrolling: e2, oldWidth: t.width, oldScrollWidth: t.scrollWidth, oldScrollLeft: t.scrollLeft, width: this.width, scrollWidth: this.scrollWidth, scrollLeft: this.scrollLeft, oldHeight: t.height, oldScrollHeight: t.scrollHeight, oldScrollTop: t.scrollTop, height: this.height, scrollHeight: this.scrollHeight, scrollTop: this.scrollTop, widthChanged: i, scrollWidthChanged: r, scrollLeftChanged: n, heightChanged: o2, scrollHeightChanged: l, scrollTopChanged: a2 };
  }
};
var Ri = class extends D {
  constructor(e2) {
    super();
    this._scrollableBrand = void 0;
    this._onScroll = this._register(new v());
    this.onScroll = this._onScroll.event;
    this._smoothScrollDuration = e2.smoothScrollDuration, this._scheduleAtNextAnimationFrame = e2.scheduleAtNextAnimationFrame, this._state = new cs(e2.forceIntegerValues, 0, 0, 0, 0, 0, 0), this._smoothScrolling = null;
  }
  dispose() {
    this._smoothScrolling && (this._smoothScrolling.dispose(), this._smoothScrolling = null), super.dispose();
  }
  setSmoothScrollDuration(e2) {
    this._smoothScrollDuration = e2;
  }
  validateScrollPosition(e2) {
    return this._state.withScrollPosition(e2);
  }
  getScrollDimensions() {
    return this._state;
  }
  setScrollDimensions(e2, i) {
    let r = this._state.withScrollDimensions(e2, i);
    this._setState(r, !!this._smoothScrolling), this._smoothScrolling?.acceptScrollDimensions(this._state);
  }
  getFutureScrollPosition() {
    return this._smoothScrolling ? this._smoothScrolling.to : this._state;
  }
  getCurrentScrollPosition() {
    return this._state;
  }
  setScrollPositionNow(e2) {
    let i = this._state.withScrollPosition(e2);
    this._smoothScrolling && (this._smoothScrolling.dispose(), this._smoothScrolling = null), this._setState(i, false);
  }
  setScrollPositionSmooth(e2, i) {
    if (this._smoothScrollDuration === 0) return this.setScrollPositionNow(e2);
    if (this._smoothScrolling) {
      e2 = { scrollLeft: typeof e2.scrollLeft > "u" ? this._smoothScrolling.to.scrollLeft : e2.scrollLeft, scrollTop: typeof e2.scrollTop > "u" ? this._smoothScrolling.to.scrollTop : e2.scrollTop };
      let r = this._state.withScrollPosition(e2);
      if (this._smoothScrolling.to.scrollLeft === r.scrollLeft && this._smoothScrolling.to.scrollTop === r.scrollTop) return;
      let n;
      i ? n = new Nr(this._smoothScrolling.from, r, this._smoothScrolling.startTime, this._smoothScrolling.duration) : n = this._smoothScrolling.combine(this._state, r, this._smoothScrollDuration), this._smoothScrolling.dispose(), this._smoothScrolling = n;
    } else {
      let r = this._state.withScrollPosition(e2);
      this._smoothScrolling = Nr.start(this._state, r, this._smoothScrollDuration);
    }
    this._smoothScrolling.animationFrameDisposable = this._scheduleAtNextAnimationFrame(() => {
      this._smoothScrolling && (this._smoothScrolling.animationFrameDisposable = null, this._performSmoothScrolling());
    });
  }
  hasPendingScrollAnimation() {
    return !!this._smoothScrolling;
  }
  _performSmoothScrolling() {
    if (!this._smoothScrolling) return;
    let e2 = this._smoothScrolling.tick(), i = this._state.withScrollPosition(e2);
    if (this._setState(i, true), !!this._smoothScrolling) {
      if (e2.isDone) {
        this._smoothScrolling.dispose(), this._smoothScrolling = null;
        return;
      }
      this._smoothScrolling.animationFrameDisposable = this._scheduleAtNextAnimationFrame(() => {
        this._smoothScrolling && (this._smoothScrolling.animationFrameDisposable = null, this._performSmoothScrolling());
      });
    }
  }
  _setState(e2, i) {
    let r = this._state;
    r.equals(e2) || (this._state = e2, this._onScroll.fire(this._state.createScrollEvent(r, i)));
  }
};
var Br = class {
  constructor(t, e2, i) {
    this.scrollLeft = t, this.scrollTop = e2, this.isDone = i;
  }
};
function as(s15, t) {
  let e2 = t - s15;
  return function(i) {
    return s15 + e2 * ka(i);
  };
}
function La(s15, t, e2) {
  return function(i) {
    return i < e2 ? s15(i / e2) : t((i - e2) / (1 - e2));
  };
}
var Nr = class s10 {
  constructor(t, e2, i, r) {
    this.from = t, this.to = e2, this.duration = r, this.startTime = i, this.animationFrameDisposable = null, this._initAnimations();
  }
  _initAnimations() {
    this.scrollLeft = this._initAnimation(this.from.scrollLeft, this.to.scrollLeft, this.to.width), this.scrollTop = this._initAnimation(this.from.scrollTop, this.to.scrollTop, this.to.height);
  }
  _initAnimation(t, e2, i) {
    if (Math.abs(t - e2) > 2.5 * i) {
      let n, o2;
      return t < e2 ? (n = t + 0.75 * i, o2 = e2 - 0.75 * i) : (n = t - 0.75 * i, o2 = e2 + 0.75 * i), La(as(t, n), as(o2, e2), 0.33);
    }
    return as(t, e2);
  }
  dispose() {
    this.animationFrameDisposable !== null && (this.animationFrameDisposable.dispose(), this.animationFrameDisposable = null);
  }
  acceptScrollDimensions(t) {
    this.to = t.withScrollPosition(this.to), this._initAnimations();
  }
  tick() {
    return this._tick(Date.now());
  }
  _tick(t) {
    let e2 = (t - this.startTime) / this.duration;
    if (e2 < 1) {
      let i = this.scrollLeft(e2), r = this.scrollTop(e2);
      return new Br(i, r, false);
    }
    return new Br(this.to.scrollLeft, this.to.scrollTop, true);
  }
  combine(t, e2, i) {
    return s10.start(t, e2, i);
  }
  static start(t, e2, i) {
    i = i + 10;
    let r = Date.now() - 10;
    return new s10(t, e2, r, i);
  }
};
function Aa(s15) {
  return Math.pow(s15, 3);
}
function ka(s15) {
  return 1 - Aa(1 - s15);
}
var Fr = class extends D {
  constructor(t, e2, i) {
    super(), this._visibility = t, this._visibleClassName = e2, this._invisibleClassName = i, this._domNode = null, this._isVisible = false, this._isNeeded = false, this._rawShouldBeVisible = false, this._shouldBeVisible = false, this._revealTimer = this._register(new Ye());
  }
  setVisibility(t) {
    this._visibility !== t && (this._visibility = t, this._updateShouldBeVisible());
  }
  setShouldBeVisible(t) {
    this._rawShouldBeVisible = t, this._updateShouldBeVisible();
  }
  _applyVisibilitySetting() {
    return this._visibility === 2 ? false : this._visibility === 3 ? true : this._rawShouldBeVisible;
  }
  _updateShouldBeVisible() {
    let t = this._applyVisibilitySetting();
    this._shouldBeVisible !== t && (this._shouldBeVisible = t, this.ensureVisibility());
  }
  setIsNeeded(t) {
    this._isNeeded !== t && (this._isNeeded = t, this.ensureVisibility());
  }
  setDomNode(t) {
    this._domNode = t, this._domNode.setClassName(this._invisibleClassName), this.setShouldBeVisible(false);
  }
  ensureVisibility() {
    if (!this._isNeeded) {
      this._hide(false);
      return;
    }
    this._shouldBeVisible ? this._reveal() : this._hide(true);
  }
  _reveal() {
    this._isVisible || (this._isVisible = true, this._revealTimer.setIfNotSet(() => {
      this._domNode?.setClassName(this._visibleClassName);
    }, 0));
  }
  _hide(t) {
    this._revealTimer.cancel(), this._isVisible && (this._isVisible = false, this._domNode?.setClassName(this._invisibleClassName + (t ? " fade" : "")));
  }
};
var Ca = 140;
var Ut = class extends lt {
  constructor(t) {
    super(), this._lazyRender = t.lazyRender, this._host = t.host, this._scrollable = t.scrollable, this._scrollByPage = t.scrollByPage, this._scrollbarState = t.scrollbarState, this._visibilityController = this._register(new Fr(t.visibility, "visible scrollbar " + t.extraScrollbarClassName, "invisible scrollbar " + t.extraScrollbarClassName)), this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._pointerMoveMonitor = this._register(new Wt()), this._shouldRender = true, this.domNode = _t(document.createElement("div")), this.domNode.setAttribute("role", "presentation"), this.domNode.setAttribute("aria-hidden", "true"), this._visibilityController.setDomNode(this.domNode), this.domNode.setPosition("absolute"), this._register(L(this.domNode.domNode, Y2.POINTER_DOWN, (e2) => this._domNodePointerDown(e2)));
  }
  _createArrow(t) {
    let e2 = this._register(new Or(t));
    this.domNode.domNode.appendChild(e2.bgDomNode), this.domNode.domNode.appendChild(e2.domNode);
  }
  _createSlider(t, e2, i, r) {
    this.slider = _t(document.createElement("div")), this.slider.setClassName("slider"), this.slider.setPosition("absolute"), this.slider.setTop(t), this.slider.setLeft(e2), typeof i == "number" && this.slider.setWidth(i), typeof r == "number" && this.slider.setHeight(r), this.slider.setLayerHinting(true), this.slider.setContain("strict"), this.domNode.domNode.appendChild(this.slider.domNode), this._register(L(this.slider.domNode, Y2.POINTER_DOWN, (n) => {
      n.button === 0 && (n.preventDefault(), this._sliderPointerDown(n));
    })), this.onclick(this.slider.domNode, (n) => {
      n.leftButton && n.stopPropagation();
    });
  }
  _onElementSize(t) {
    return this._scrollbarState.setVisibleSize(t) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = true, this._lazyRender || this.render()), this._shouldRender;
  }
  _onElementScrollSize(t) {
    return this._scrollbarState.setScrollSize(t) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = true, this._lazyRender || this.render()), this._shouldRender;
  }
  _onElementScrollPosition(t) {
    return this._scrollbarState.setScrollPosition(t) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = true, this._lazyRender || this.render()), this._shouldRender;
  }
  beginReveal() {
    this._visibilityController.setShouldBeVisible(true);
  }
  beginHide() {
    this._visibilityController.setShouldBeVisible(false);
  }
  render() {
    this._shouldRender && (this._shouldRender = false, this._renderDomNode(this._scrollbarState.getRectangleLargeSize(), this._scrollbarState.getRectangleSmallSize()), this._updateSlider(this._scrollbarState.getSliderSize(), this._scrollbarState.getArrowSize() + this._scrollbarState.getSliderPosition()));
  }
  _domNodePointerDown(t) {
    t.target === this.domNode.domNode && this._onPointerDown(t);
  }
  delegatePointerDown(t) {
    let e2 = this.domNode.domNode.getClientRects()[0].top, i = e2 + this._scrollbarState.getSliderPosition(), r = e2 + this._scrollbarState.getSliderPosition() + this._scrollbarState.getSliderSize(), n = this._sliderPointerPosition(t);
    i <= n && n <= r ? t.button === 0 && (t.preventDefault(), this._sliderPointerDown(t)) : this._onPointerDown(t);
  }
  _onPointerDown(t) {
    let e2, i;
    if (t.target === this.domNode.domNode && typeof t.offsetX == "number" && typeof t.offsetY == "number") e2 = t.offsetX, i = t.offsetY;
    else {
      let n = Fo(this.domNode.domNode);
      e2 = t.pageX - n.left, i = t.pageY - n.top;
    }
    let r = this._pointerDownRelativePosition(e2, i);
    this._setDesiredScrollPositionNow(this._scrollByPage ? this._scrollbarState.getDesiredScrollPositionFromOffsetPaged(r) : this._scrollbarState.getDesiredScrollPositionFromOffset(r)), t.button === 0 && (t.preventDefault(), this._sliderPointerDown(t));
  }
  _sliderPointerDown(t) {
    if (!t.target || !(t.target instanceof Element)) return;
    let e2 = this._sliderPointerPosition(t), i = this._sliderOrthogonalPointerPosition(t), r = this._scrollbarState.clone();
    this.slider.toggleClassName("active", true), this._pointerMoveMonitor.startMonitoring(t.target, t.pointerId, t.buttons, (n) => {
      let o2 = this._sliderOrthogonalPointerPosition(n), l = Math.abs(o2 - i);
      if (wr && l > Ca) {
        this._setDesiredScrollPositionNow(r.getScrollPosition());
        return;
      }
      let u = this._sliderPointerPosition(n) - e2;
      this._setDesiredScrollPositionNow(r.getDesiredScrollPositionFromDelta(u));
    }, () => {
      this.slider.toggleClassName("active", false), this._host.onDragEnd();
    }), this._host.onDragStart();
  }
  _setDesiredScrollPositionNow(t) {
    let e2 = {};
    this.writeScrollPosition(e2, t), this._scrollable.setScrollPositionNow(e2);
  }
  updateScrollbarSize(t) {
    this._updateScrollbarSize(t), this._scrollbarState.setScrollbarSize(t), this._shouldRender = true, this._lazyRender || this.render();
  }
  isNeeded() {
    return this._scrollbarState.isNeeded();
  }
};
var Kt = class s11 {
  constructor(t, e2, i, r, n, o2) {
    this._scrollbarSize = Math.round(e2), this._oppositeScrollbarSize = Math.round(i), this._arrowSize = Math.round(t), this._visibleSize = r, this._scrollSize = n, this._scrollPosition = o2, this._computedAvailableSize = 0, this._computedIsNeeded = false, this._computedSliderSize = 0, this._computedSliderRatio = 0, this._computedSliderPosition = 0, this._refreshComputedValues();
  }
  clone() {
    return new s11(this._arrowSize, this._scrollbarSize, this._oppositeScrollbarSize, this._visibleSize, this._scrollSize, this._scrollPosition);
  }
  setVisibleSize(t) {
    let e2 = Math.round(t);
    return this._visibleSize !== e2 ? (this._visibleSize = e2, this._refreshComputedValues(), true) : false;
  }
  setScrollSize(t) {
    let e2 = Math.round(t);
    return this._scrollSize !== e2 ? (this._scrollSize = e2, this._refreshComputedValues(), true) : false;
  }
  setScrollPosition(t) {
    let e2 = Math.round(t);
    return this._scrollPosition !== e2 ? (this._scrollPosition = e2, this._refreshComputedValues(), true) : false;
  }
  setScrollbarSize(t) {
    this._scrollbarSize = Math.round(t);
  }
  setOppositeScrollbarSize(t) {
    this._oppositeScrollbarSize = Math.round(t);
  }
  static _computeValues(t, e2, i, r, n) {
    let o2 = Math.max(0, i - t), l = Math.max(0, o2 - 2 * e2), a2 = r > 0 && r > i;
    if (!a2) return { computedAvailableSize: Math.round(o2), computedIsNeeded: a2, computedSliderSize: Math.round(l), computedSliderRatio: 0, computedSliderPosition: 0 };
    let u = Math.round(Math.max(20, Math.floor(i * l / r))), h2 = (l - u) / (r - i), c2 = n * h2;
    return { computedAvailableSize: Math.round(o2), computedIsNeeded: a2, computedSliderSize: Math.round(u), computedSliderRatio: h2, computedSliderPosition: Math.round(c2) };
  }
  _refreshComputedValues() {
    let t = s11._computeValues(this._oppositeScrollbarSize, this._arrowSize, this._visibleSize, this._scrollSize, this._scrollPosition);
    this._computedAvailableSize = t.computedAvailableSize, this._computedIsNeeded = t.computedIsNeeded, this._computedSliderSize = t.computedSliderSize, this._computedSliderRatio = t.computedSliderRatio, this._computedSliderPosition = t.computedSliderPosition;
  }
  getArrowSize() {
    return this._arrowSize;
  }
  getScrollPosition() {
    return this._scrollPosition;
  }
  getRectangleLargeSize() {
    return this._computedAvailableSize;
  }
  getRectangleSmallSize() {
    return this._scrollbarSize;
  }
  isNeeded() {
    return this._computedIsNeeded;
  }
  getSliderSize() {
    return this._computedSliderSize;
  }
  getSliderPosition() {
    return this._computedSliderPosition;
  }
  getDesiredScrollPositionFromOffset(t) {
    if (!this._computedIsNeeded) return 0;
    let e2 = t - this._arrowSize - this._computedSliderSize / 2;
    return Math.round(e2 / this._computedSliderRatio);
  }
  getDesiredScrollPositionFromOffsetPaged(t) {
    if (!this._computedIsNeeded) return 0;
    let e2 = t - this._arrowSize, i = this._scrollPosition;
    return e2 < this._computedSliderPosition ? i -= this._visibleSize : i += this._visibleSize, i;
  }
  getDesiredScrollPositionFromDelta(t) {
    if (!this._computedIsNeeded) return 0;
    let e2 = this._computedSliderPosition + t;
    return Math.round(e2 / this._computedSliderRatio);
  }
};
var Wr = class extends Ut {
  constructor(t, e2, i) {
    let r = t.getScrollDimensions(), n = t.getCurrentScrollPosition();
    if (super({ lazyRender: e2.lazyRender, host: i, scrollbarState: new Kt(e2.horizontalHasArrows ? e2.arrowSize : 0, e2.horizontal === 2 ? 0 : e2.horizontalScrollbarSize, e2.vertical === 2 ? 0 : e2.verticalScrollbarSize, r.width, r.scrollWidth, n.scrollLeft), visibility: e2.horizontal, extraScrollbarClassName: "horizontal", scrollable: t, scrollByPage: e2.scrollByPage }), e2.horizontalHasArrows) throw new Error("horizontalHasArrows is not supported in xterm.js");
    this._createSlider(Math.floor((e2.horizontalScrollbarSize - e2.horizontalSliderSize) / 2), 0, void 0, e2.horizontalSliderSize);
  }
  _updateSlider(t, e2) {
    this.slider.setWidth(t), this.slider.setLeft(e2);
  }
  _renderDomNode(t, e2) {
    this.domNode.setWidth(t), this.domNode.setHeight(e2), this.domNode.setLeft(0), this.domNode.setBottom(0);
  }
  onDidScroll(t) {
    return this._shouldRender = this._onElementScrollSize(t.scrollWidth) || this._shouldRender, this._shouldRender = this._onElementScrollPosition(t.scrollLeft) || this._shouldRender, this._shouldRender = this._onElementSize(t.width) || this._shouldRender, this._shouldRender;
  }
  _pointerDownRelativePosition(t, e2) {
    return t;
  }
  _sliderPointerPosition(t) {
    return t.pageX;
  }
  _sliderOrthogonalPointerPosition(t) {
    return t.pageY;
  }
  _updateScrollbarSize(t) {
    this.slider.setHeight(t);
  }
  writeScrollPosition(t, e2) {
    t.scrollLeft = e2;
  }
  updateOptions(t) {
    this.updateScrollbarSize(t.horizontal === 2 ? 0 : t.horizontalScrollbarSize), this._scrollbarState.setOppositeScrollbarSize(t.vertical === 2 ? 0 : t.verticalScrollbarSize), this._visibilityController.setVisibility(t.horizontal), this._scrollByPage = t.scrollByPage;
  }
};
var Ur = class extends Ut {
  constructor(t, e2, i) {
    let r = t.getScrollDimensions(), n = t.getCurrentScrollPosition();
    if (super({ lazyRender: e2.lazyRender, host: i, scrollbarState: new Kt(e2.verticalHasArrows ? e2.arrowSize : 0, e2.vertical === 2 ? 0 : e2.verticalScrollbarSize, 0, r.height, r.scrollHeight, n.scrollTop), visibility: e2.vertical, extraScrollbarClassName: "vertical", scrollable: t, scrollByPage: e2.scrollByPage }), e2.verticalHasArrows) throw new Error("horizontalHasArrows is not supported in xterm.js");
    this._createSlider(0, Math.floor((e2.verticalScrollbarSize - e2.verticalSliderSize) / 2), e2.verticalSliderSize, void 0);
  }
  _updateSlider(t, e2) {
    this.slider.setHeight(t), this.slider.setTop(e2);
  }
  _renderDomNode(t, e2) {
    this.domNode.setWidth(e2), this.domNode.setHeight(t), this.domNode.setRight(0), this.domNode.setTop(0);
  }
  onDidScroll(t) {
    return this._shouldRender = this._onElementScrollSize(t.scrollHeight) || this._shouldRender, this._shouldRender = this._onElementScrollPosition(t.scrollTop) || this._shouldRender, this._shouldRender = this._onElementSize(t.height) || this._shouldRender, this._shouldRender;
  }
  _pointerDownRelativePosition(t, e2) {
    return e2;
  }
  _sliderPointerPosition(t) {
    return t.pageY;
  }
  _sliderOrthogonalPointerPosition(t) {
    return t.pageX;
  }
  _updateScrollbarSize(t) {
    this.slider.setWidth(t);
  }
  writeScrollPosition(t, e2) {
    t.scrollTop = e2;
  }
  updateOptions(t) {
    this.updateScrollbarSize(t.vertical === 2 ? 0 : t.verticalScrollbarSize), this._scrollbarState.setOppositeScrollbarSize(0), this._visibilityController.setVisibility(t.vertical), this._scrollByPage = t.scrollByPage;
  }
};
var Ma = 500;
var Ko = 50;
var zo = true;
var us = class {
  constructor(t, e2, i) {
    this.timestamp = t, this.deltaX = e2, this.deltaY = i, this.score = 0;
  }
};
var zr = class zr2 {
  constructor() {
    this._capacity = 5, this._memory = [], this._front = -1, this._rear = -1;
  }
  isPhysicalMouseWheel() {
    if (this._front === -1 && this._rear === -1) return false;
    let t = 1, e2 = 0, i = 1, r = this._rear;
    do {
      let n = r === this._front ? t : Math.pow(2, -i);
      if (t -= n, e2 += this._memory[r].score * n, r === this._front) break;
      r = (this._capacity + r - 1) % this._capacity, i++;
    } while (true);
    return e2 <= 0.5;
  }
  acceptStandardWheelEvent(t) {
    if (Ti) {
      let e2 = be(t.browserEvent), i = mo(e2);
      this.accept(Date.now(), t.deltaX * i, t.deltaY * i);
    } else this.accept(Date.now(), t.deltaX, t.deltaY);
  }
  accept(t, e2, i) {
    let r = null, n = new us(t, e2, i);
    this._front === -1 && this._rear === -1 ? (this._memory[0] = n, this._front = 0, this._rear = 0) : (r = this._memory[this._rear], this._rear = (this._rear + 1) % this._capacity, this._rear === this._front && (this._front = (this._front + 1) % this._capacity), this._memory[this._rear] = n), n.score = this._computeScore(n, r);
  }
  _computeScore(t, e2) {
    if (Math.abs(t.deltaX) > 0 && Math.abs(t.deltaY) > 0) return 1;
    let i = 0.5;
    if ((!this._isAlmostInt(t.deltaX) || !this._isAlmostInt(t.deltaY)) && (i += 0.25), e2) {
      let r = Math.abs(t.deltaX), n = Math.abs(t.deltaY), o2 = Math.abs(e2.deltaX), l = Math.abs(e2.deltaY), a2 = Math.max(Math.min(r, o2), 1), u = Math.max(Math.min(n, l), 1), h2 = Math.max(r, o2), c2 = Math.max(n, l);
      h2 % a2 === 0 && c2 % u === 0 && (i -= 0.5);
    }
    return Math.min(Math.max(i, 0), 1);
  }
  _isAlmostInt(t) {
    return Math.abs(Math.round(t) - t) < 0.01;
  }
};
zr.INSTANCE = new zr();
var hs = zr;
var ds = class extends lt {
  constructor(e2, i, r) {
    super();
    this._onScroll = this._register(new v());
    this.onScroll = this._onScroll.event;
    this._onWillScroll = this._register(new v());
    this.onWillScroll = this._onWillScroll.event;
    this._options = Pa(i), this._scrollable = r, this._register(this._scrollable.onScroll((o2) => {
      this._onWillScroll.fire(o2), this._onDidScroll(o2), this._onScroll.fire(o2);
    }));
    let n = { onMouseWheel: (o2) => this._onMouseWheel(o2), onDragStart: () => this._onDragStart(), onDragEnd: () => this._onDragEnd() };
    this._verticalScrollbar = this._register(new Ur(this._scrollable, this._options, n)), this._horizontalScrollbar = this._register(new Wr(this._scrollable, this._options, n)), this._domNode = document.createElement("div"), this._domNode.className = "xterm-scrollable-element " + this._options.className, this._domNode.setAttribute("role", "presentation"), this._domNode.style.position = "relative", this._domNode.appendChild(e2), this._domNode.appendChild(this._horizontalScrollbar.domNode.domNode), this._domNode.appendChild(this._verticalScrollbar.domNode.domNode), this._options.useShadows ? (this._leftShadowDomNode = _t(document.createElement("div")), this._leftShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._leftShadowDomNode.domNode), this._topShadowDomNode = _t(document.createElement("div")), this._topShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._topShadowDomNode.domNode), this._topLeftShadowDomNode = _t(document.createElement("div")), this._topLeftShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._topLeftShadowDomNode.domNode)) : (this._leftShadowDomNode = null, this._topShadowDomNode = null, this._topLeftShadowDomNode = null), this._listenOnDomNode = this._options.listenOnDomNode || this._domNode, this._mouseWheelToDispose = [], this._setListeningToMouseWheel(this._options.handleMouseWheel), this.onmouseover(this._listenOnDomNode, (o2) => this._onMouseOver(o2)), this.onmouseleave(this._listenOnDomNode, (o2) => this._onMouseLeave(o2)), this._hideTimeout = this._register(new Ye()), this._isDragging = false, this._mouseIsOver = false, this._shouldRender = true, this._revealOnScroll = true;
  }
  get options() {
    return this._options;
  }
  dispose() {
    this._mouseWheelToDispose = Ne(this._mouseWheelToDispose), super.dispose();
  }
  getDomNode() {
    return this._domNode;
  }
  getOverviewRulerLayoutInfo() {
    return { parent: this._domNode, insertBefore: this._verticalScrollbar.domNode.domNode };
  }
  delegateVerticalScrollbarPointerDown(e2) {
    this._verticalScrollbar.delegatePointerDown(e2);
  }
  getScrollDimensions() {
    return this._scrollable.getScrollDimensions();
  }
  setScrollDimensions(e2) {
    this._scrollable.setScrollDimensions(e2, false);
  }
  updateClassName(e2) {
    this._options.className = e2, Te && (this._options.className += " mac"), this._domNode.className = "xterm-scrollable-element " + this._options.className;
  }
  updateOptions(e2) {
    typeof e2.handleMouseWheel < "u" && (this._options.handleMouseWheel = e2.handleMouseWheel, this._setListeningToMouseWheel(this._options.handleMouseWheel)), typeof e2.mouseWheelScrollSensitivity < "u" && (this._options.mouseWheelScrollSensitivity = e2.mouseWheelScrollSensitivity), typeof e2.fastScrollSensitivity < "u" && (this._options.fastScrollSensitivity = e2.fastScrollSensitivity), typeof e2.scrollPredominantAxis < "u" && (this._options.scrollPredominantAxis = e2.scrollPredominantAxis), typeof e2.horizontal < "u" && (this._options.horizontal = e2.horizontal), typeof e2.vertical < "u" && (this._options.vertical = e2.vertical), typeof e2.horizontalScrollbarSize < "u" && (this._options.horizontalScrollbarSize = e2.horizontalScrollbarSize), typeof e2.verticalScrollbarSize < "u" && (this._options.verticalScrollbarSize = e2.verticalScrollbarSize), typeof e2.scrollByPage < "u" && (this._options.scrollByPage = e2.scrollByPage), this._horizontalScrollbar.updateOptions(this._options), this._verticalScrollbar.updateOptions(this._options), this._options.lazyRender || this._render();
  }
  setRevealOnScroll(e2) {
    this._revealOnScroll = e2;
  }
  delegateScrollFromMouseWheelEvent(e2) {
    this._onMouseWheel(new xi(e2));
  }
  _setListeningToMouseWheel(e2) {
    if (this._mouseWheelToDispose.length > 0 !== e2 && (this._mouseWheelToDispose = Ne(this._mouseWheelToDispose), e2)) {
      let r = (n) => {
        this._onMouseWheel(new xi(n));
      };
      this._mouseWheelToDispose.push(L(this._listenOnDomNode, Y2.MOUSE_WHEEL, r, { passive: false }));
    }
  }
  _onMouseWheel(e2) {
    if (e2.browserEvent?.defaultPrevented) return;
    let i = hs.INSTANCE;
    zo && i.acceptStandardWheelEvent(e2);
    let r = false;
    if (e2.deltaY || e2.deltaX) {
      let o2 = e2.deltaY * this._options.mouseWheelScrollSensitivity, l = e2.deltaX * this._options.mouseWheelScrollSensitivity;
      this._options.scrollPredominantAxis && (this._options.scrollYToX && l + o2 === 0 ? l = o2 = 0 : Math.abs(o2) >= Math.abs(l) ? l = 0 : o2 = 0), this._options.flipAxes && ([o2, l] = [l, o2]);
      let a2 = !Te && e2.browserEvent && e2.browserEvent.shiftKey;
      (this._options.scrollYToX || a2) && !l && (l = o2, o2 = 0), e2.browserEvent && e2.browserEvent.altKey && (l = l * this._options.fastScrollSensitivity, o2 = o2 * this._options.fastScrollSensitivity);
      let u = this._scrollable.getFutureScrollPosition(), h2 = {};
      if (o2) {
        let c2 = Ko * o2, d2 = u.scrollTop - (c2 < 0 ? Math.floor(c2) : Math.ceil(c2));
        this._verticalScrollbar.writeScrollPosition(h2, d2);
      }
      if (l) {
        let c2 = Ko * l, d2 = u.scrollLeft - (c2 < 0 ? Math.floor(c2) : Math.ceil(c2));
        this._horizontalScrollbar.writeScrollPosition(h2, d2);
      }
      h2 = this._scrollable.validateScrollPosition(h2), (u.scrollLeft !== h2.scrollLeft || u.scrollTop !== h2.scrollTop) && (zo && this._options.mouseWheelSmoothScroll && i.isPhysicalMouseWheel() ? this._scrollable.setScrollPositionSmooth(h2) : this._scrollable.setScrollPositionNow(h2), r = true);
    }
    let n = r;
    !n && this._options.alwaysConsumeMouseWheel && (n = true), !n && this._options.consumeMouseWheelIfScrollbarIsNeeded && (this._verticalScrollbar.isNeeded() || this._horizontalScrollbar.isNeeded()) && (n = true), n && (e2.preventDefault(), e2.stopPropagation());
  }
  _onDidScroll(e2) {
    this._shouldRender = this._horizontalScrollbar.onDidScroll(e2) || this._shouldRender, this._shouldRender = this._verticalScrollbar.onDidScroll(e2) || this._shouldRender, this._options.useShadows && (this._shouldRender = true), this._revealOnScroll && this._reveal(), this._options.lazyRender || this._render();
  }
  renderNow() {
    if (!this._options.lazyRender) throw new Error("Please use `lazyRender` together with `renderNow`!");
    this._render();
  }
  _render() {
    if (this._shouldRender && (this._shouldRender = false, this._horizontalScrollbar.render(), this._verticalScrollbar.render(), this._options.useShadows)) {
      let e2 = this._scrollable.getCurrentScrollPosition(), i = e2.scrollTop > 0, r = e2.scrollLeft > 0, n = r ? " left" : "", o2 = i ? " top" : "", l = r || i ? " top-left-corner" : "";
      this._leftShadowDomNode.setClassName(`shadow${n}`), this._topShadowDomNode.setClassName(`shadow${o2}`), this._topLeftShadowDomNode.setClassName(`shadow${l}${o2}${n}`);
    }
  }
  _onDragStart() {
    this._isDragging = true, this._reveal();
  }
  _onDragEnd() {
    this._isDragging = false, this._hide();
  }
  _onMouseLeave(e2) {
    this._mouseIsOver = false, this._hide();
  }
  _onMouseOver(e2) {
    this._mouseIsOver = true, this._reveal();
  }
  _reveal() {
    this._verticalScrollbar.beginReveal(), this._horizontalScrollbar.beginReveal(), this._scheduleHide();
  }
  _hide() {
    !this._mouseIsOver && !this._isDragging && (this._verticalScrollbar.beginHide(), this._horizontalScrollbar.beginHide());
  }
  _scheduleHide() {
    !this._mouseIsOver && !this._isDragging && this._hideTimeout.cancelAndSet(() => this._hide(), Ma);
  }
};
var Kr = class extends ds {
  constructor(t, e2, i) {
    super(t, e2, i);
  }
  setScrollPosition(t) {
    t.reuseAnimation ? this._scrollable.setScrollPositionSmooth(t, t.reuseAnimation) : this._scrollable.setScrollPositionNow(t);
  }
  getScrollPosition() {
    return this._scrollable.getCurrentScrollPosition();
  }
};
function Pa(s15) {
  let t = { lazyRender: typeof s15.lazyRender < "u" ? s15.lazyRender : false, className: typeof s15.className < "u" ? s15.className : "", useShadows: typeof s15.useShadows < "u" ? s15.useShadows : true, handleMouseWheel: typeof s15.handleMouseWheel < "u" ? s15.handleMouseWheel : true, flipAxes: typeof s15.flipAxes < "u" ? s15.flipAxes : false, consumeMouseWheelIfScrollbarIsNeeded: typeof s15.consumeMouseWheelIfScrollbarIsNeeded < "u" ? s15.consumeMouseWheelIfScrollbarIsNeeded : false, alwaysConsumeMouseWheel: typeof s15.alwaysConsumeMouseWheel < "u" ? s15.alwaysConsumeMouseWheel : false, scrollYToX: typeof s15.scrollYToX < "u" ? s15.scrollYToX : false, mouseWheelScrollSensitivity: typeof s15.mouseWheelScrollSensitivity < "u" ? s15.mouseWheelScrollSensitivity : 1, fastScrollSensitivity: typeof s15.fastScrollSensitivity < "u" ? s15.fastScrollSensitivity : 5, scrollPredominantAxis: typeof s15.scrollPredominantAxis < "u" ? s15.scrollPredominantAxis : true, mouseWheelSmoothScroll: typeof s15.mouseWheelSmoothScroll < "u" ? s15.mouseWheelSmoothScroll : true, arrowSize: typeof s15.arrowSize < "u" ? s15.arrowSize : 11, listenOnDomNode: typeof s15.listenOnDomNode < "u" ? s15.listenOnDomNode : null, horizontal: typeof s15.horizontal < "u" ? s15.horizontal : 1, horizontalScrollbarSize: typeof s15.horizontalScrollbarSize < "u" ? s15.horizontalScrollbarSize : 10, horizontalSliderSize: typeof s15.horizontalSliderSize < "u" ? s15.horizontalSliderSize : 0, horizontalHasArrows: typeof s15.horizontalHasArrows < "u" ? s15.horizontalHasArrows : false, vertical: typeof s15.vertical < "u" ? s15.vertical : 1, verticalScrollbarSize: typeof s15.verticalScrollbarSize < "u" ? s15.verticalScrollbarSize : 10, verticalHasArrows: typeof s15.verticalHasArrows < "u" ? s15.verticalHasArrows : false, verticalSliderSize: typeof s15.verticalSliderSize < "u" ? s15.verticalSliderSize : 0, scrollByPage: typeof s15.scrollByPage < "u" ? s15.scrollByPage : false };
  return t.horizontalSliderSize = typeof s15.horizontalSliderSize < "u" ? s15.horizontalSliderSize : t.horizontalScrollbarSize, t.verticalSliderSize = typeof s15.verticalSliderSize < "u" ? s15.verticalSliderSize : t.verticalScrollbarSize, Te && (t.className += " mac"), t;
}
var zt = class extends D {
  constructor(e2, i, r, n, o2, l, a2, u) {
    super();
    this._bufferService = r;
    this._optionsService = a2;
    this._renderService = u;
    this._onRequestScrollLines = this._register(new v());
    this.onRequestScrollLines = this._onRequestScrollLines.event;
    this._isSyncing = false;
    this._isHandlingScroll = false;
    this._suppressOnScrollHandler = false;
    let h2 = this._register(new Ri({ forceIntegerValues: false, smoothScrollDuration: this._optionsService.rawOptions.smoothScrollDuration, scheduleAtNextAnimationFrame: (c2) => mt(n.window, c2) }));
    this._register(this._optionsService.onSpecificOptionChange("smoothScrollDuration", () => {
      h2.setSmoothScrollDuration(this._optionsService.rawOptions.smoothScrollDuration);
    })), this._scrollableElement = this._register(new Kr(i, { vertical: 1, horizontal: 2, useShadows: false, mouseWheelSmoothScroll: true, ...this._getChangeOptions() }, h2)), this._register(this._optionsService.onMultipleOptionChange(["scrollSensitivity", "fastScrollSensitivity", "overviewRuler"], () => this._scrollableElement.updateOptions(this._getChangeOptions()))), this._register(o2.onProtocolChange((c2) => {
      this._scrollableElement.updateOptions({ handleMouseWheel: !(c2 & 16) });
    })), this._scrollableElement.setScrollDimensions({ height: 0, scrollHeight: 0 }), this._register($.runAndSubscribe(l.onChangeColors, () => {
      this._scrollableElement.getDomNode().style.backgroundColor = l.colors.background.css;
    })), e2.appendChild(this._scrollableElement.getDomNode()), this._register(C(() => this._scrollableElement.getDomNode().remove())), this._styleElement = n.mainDocument.createElement("style"), i.appendChild(this._styleElement), this._register(C(() => this._styleElement.remove())), this._register($.runAndSubscribe(l.onChangeColors, () => {
      this._styleElement.textContent = [".xterm .xterm-scrollable-element > .scrollbar > .slider {", `  background: ${l.colors.scrollbarSliderBackground.css};`, "}", ".xterm .xterm-scrollable-element > .scrollbar > .slider:hover {", `  background: ${l.colors.scrollbarSliderHoverBackground.css};`, "}", ".xterm .xterm-scrollable-element > .scrollbar > .slider.active {", `  background: ${l.colors.scrollbarSliderActiveBackground.css};`, "}"].join(`
`);
    })), this._register(this._bufferService.onResize(() => this.queueSync())), this._register(this._bufferService.buffers.onBufferActivate(() => {
      this._latestYDisp = void 0, this.queueSync();
    })), this._register(this._bufferService.onScroll(() => this._sync())), this._register(this._scrollableElement.onScroll((c2) => this._handleScroll(c2)));
  }
  scrollLines(e2) {
    let i = this._scrollableElement.getScrollPosition();
    this._scrollableElement.setScrollPosition({ reuseAnimation: true, scrollTop: i.scrollTop + e2 * this._renderService.dimensions.css.cell.height });
  }
  scrollToLine(e2, i) {
    i && (this._latestYDisp = e2), this._scrollableElement.setScrollPosition({ reuseAnimation: !i, scrollTop: e2 * this._renderService.dimensions.css.cell.height });
  }
  _getChangeOptions() {
    return { mouseWheelScrollSensitivity: this._optionsService.rawOptions.scrollSensitivity, fastScrollSensitivity: this._optionsService.rawOptions.fastScrollSensitivity, verticalScrollbarSize: this._optionsService.rawOptions.overviewRuler?.width || 14 };
  }
  queueSync(e2) {
    e2 !== void 0 && (this._latestYDisp = e2), this._queuedAnimationFrame === void 0 && (this._queuedAnimationFrame = this._renderService.addRefreshCallback(() => {
      this._queuedAnimationFrame = void 0, this._sync(this._latestYDisp);
    }));
  }
  _sync(e2 = this._bufferService.buffer.ydisp) {
    !this._renderService || this._isSyncing || (this._isSyncing = true, this._suppressOnScrollHandler = true, this._scrollableElement.setScrollDimensions({ height: this._renderService.dimensions.css.canvas.height, scrollHeight: this._renderService.dimensions.css.cell.height * this._bufferService.buffer.lines.length }), this._suppressOnScrollHandler = false, e2 !== this._latestYDisp && this._scrollableElement.setScrollPosition({ scrollTop: e2 * this._renderService.dimensions.css.cell.height }), this._isSyncing = false);
  }
  _handleScroll(e2) {
    if (!this._renderService || this._isHandlingScroll || this._suppressOnScrollHandler) return;
    this._isHandlingScroll = true;
    let i = Math.round(e2.scrollTop / this._renderService.dimensions.css.cell.height), r = i - this._bufferService.buffer.ydisp;
    r !== 0 && (this._latestYDisp = i, this._onRequestScrollLines.fire(r)), this._isHandlingScroll = false;
  }
};
zt = M2([S(2, F), S(3, ae), S(4, rr), S(5, Re), S(6, H), S(7, ce)], zt);
var Gt = class extends D {
  constructor(e2, i, r, n, o2) {
    super();
    this._screenElement = e2;
    this._bufferService = i;
    this._coreBrowserService = r;
    this._decorationService = n;
    this._renderService = o2;
    this._decorationElements = /* @__PURE__ */ new Map();
    this._altBufferIsActive = false;
    this._dimensionsChanged = false;
    this._container = document.createElement("div"), this._container.classList.add("xterm-decoration-container"), this._screenElement.appendChild(this._container), this._register(this._renderService.onRenderedViewportChange(() => this._doRefreshDecorations())), this._register(this._renderService.onDimensionsChange(() => {
      this._dimensionsChanged = true, this._queueRefresh();
    })), this._register(this._coreBrowserService.onDprChange(() => this._queueRefresh())), this._register(this._bufferService.buffers.onBufferActivate(() => {
      this._altBufferIsActive = this._bufferService.buffer === this._bufferService.buffers.alt;
    })), this._register(this._decorationService.onDecorationRegistered(() => this._queueRefresh())), this._register(this._decorationService.onDecorationRemoved((l) => this._removeDecoration(l))), this._register(C(() => {
      this._container.remove(), this._decorationElements.clear();
    }));
  }
  _queueRefresh() {
    this._animationFrame === void 0 && (this._animationFrame = this._renderService.addRefreshCallback(() => {
      this._doRefreshDecorations(), this._animationFrame = void 0;
    }));
  }
  _doRefreshDecorations() {
    for (let e2 of this._decorationService.decorations) this._renderDecoration(e2);
    this._dimensionsChanged = false;
  }
  _renderDecoration(e2) {
    this._refreshStyle(e2), this._dimensionsChanged && this._refreshXPosition(e2);
  }
  _createElement(e2) {
    let i = this._coreBrowserService.mainDocument.createElement("div");
    i.classList.add("xterm-decoration"), i.classList.toggle("xterm-decoration-top-layer", e2?.options?.layer === "top"), i.style.width = `${Math.round((e2.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, i.style.height = `${(e2.options.height || 1) * this._renderService.dimensions.css.cell.height}px`, i.style.top = `${(e2.marker.line - this._bufferService.buffers.active.ydisp) * this._renderService.dimensions.css.cell.height}px`, i.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`;
    let r = e2.options.x ?? 0;
    return r && r > this._bufferService.cols && (i.style.display = "none"), this._refreshXPosition(e2, i), i;
  }
  _refreshStyle(e2) {
    let i = e2.marker.line - this._bufferService.buffers.active.ydisp;
    if (i < 0 || i >= this._bufferService.rows) e2.element && (e2.element.style.display = "none", e2.onRenderEmitter.fire(e2.element));
    else {
      let r = this._decorationElements.get(e2);
      r || (r = this._createElement(e2), e2.element = r, this._decorationElements.set(e2, r), this._container.appendChild(r), e2.onDispose(() => {
        this._decorationElements.delete(e2), r.remove();
      })), r.style.display = this._altBufferIsActive ? "none" : "block", this._altBufferIsActive || (r.style.width = `${Math.round((e2.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, r.style.height = `${(e2.options.height || 1) * this._renderService.dimensions.css.cell.height}px`, r.style.top = `${i * this._renderService.dimensions.css.cell.height}px`, r.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`), e2.onRenderEmitter.fire(r);
    }
  }
  _refreshXPosition(e2, i = e2.element) {
    if (!i) return;
    let r = e2.options.x ?? 0;
    (e2.options.anchor || "left") === "right" ? i.style.right = r ? `${r * this._renderService.dimensions.css.cell.width}px` : "" : i.style.left = r ? `${r * this._renderService.dimensions.css.cell.width}px` : "";
  }
  _removeDecoration(e2) {
    this._decorationElements.get(e2)?.remove(), this._decorationElements.delete(e2), e2.dispose();
  }
};
Gt = M2([S(1, F), S(2, ae), S(3, Be), S(4, ce)], Gt);
var Gr = class {
  constructor() {
    this._zones = [];
    this._zonePool = [];
    this._zonePoolIndex = 0;
    this._linePadding = { full: 0, left: 0, center: 0, right: 0 };
  }
  get zones() {
    return this._zonePool.length = Math.min(this._zonePool.length, this._zones.length), this._zones;
  }
  clear() {
    this._zones.length = 0, this._zonePoolIndex = 0;
  }
  addDecoration(t) {
    if (t.options.overviewRulerOptions) {
      for (let e2 of this._zones) if (e2.color === t.options.overviewRulerOptions.color && e2.position === t.options.overviewRulerOptions.position) {
        if (this._lineIntersectsZone(e2, t.marker.line)) return;
        if (this._lineAdjacentToZone(e2, t.marker.line, t.options.overviewRulerOptions.position)) {
          this._addLineToZone(e2, t.marker.line);
          return;
        }
      }
      if (this._zonePoolIndex < this._zonePool.length) {
        this._zonePool[this._zonePoolIndex].color = t.options.overviewRulerOptions.color, this._zonePool[this._zonePoolIndex].position = t.options.overviewRulerOptions.position, this._zonePool[this._zonePoolIndex].startBufferLine = t.marker.line, this._zonePool[this._zonePoolIndex].endBufferLine = t.marker.line, this._zones.push(this._zonePool[this._zonePoolIndex++]);
        return;
      }
      this._zones.push({ color: t.options.overviewRulerOptions.color, position: t.options.overviewRulerOptions.position, startBufferLine: t.marker.line, endBufferLine: t.marker.line }), this._zonePool.push(this._zones[this._zones.length - 1]), this._zonePoolIndex++;
    }
  }
  setPadding(t) {
    this._linePadding = t;
  }
  _lineIntersectsZone(t, e2) {
    return e2 >= t.startBufferLine && e2 <= t.endBufferLine;
  }
  _lineAdjacentToZone(t, e2, i) {
    return e2 >= t.startBufferLine - this._linePadding[i || "full"] && e2 <= t.endBufferLine + this._linePadding[i || "full"];
  }
  _addLineToZone(t, e2) {
    t.startBufferLine = Math.min(t.startBufferLine, e2), t.endBufferLine = Math.max(t.endBufferLine, e2);
  }
};
var We = { full: 0, left: 0, center: 0, right: 0 };
var at = { full: 0, left: 0, center: 0, right: 0 };
var Li = { full: 0, left: 0, center: 0, right: 0 };
var bt = class extends D {
  constructor(e2, i, r, n, o2, l, a2, u) {
    super();
    this._viewportElement = e2;
    this._screenElement = i;
    this._bufferService = r;
    this._decorationService = n;
    this._renderService = o2;
    this._optionsService = l;
    this._themeService = a2;
    this._coreBrowserService = u;
    this._colorZoneStore = new Gr();
    this._shouldUpdateDimensions = true;
    this._shouldUpdateAnchor = true;
    this._lastKnownBufferLength = 0;
    this._canvas = this._coreBrowserService.mainDocument.createElement("canvas"), this._canvas.classList.add("xterm-decoration-overview-ruler"), this._refreshCanvasDimensions(), this._viewportElement.parentElement?.insertBefore(this._canvas, this._viewportElement), this._register(C(() => this._canvas?.remove()));
    let h2 = this._canvas.getContext("2d");
    if (h2) this._ctx = h2;
    else throw new Error("Ctx cannot be null");
    this._register(this._decorationService.onDecorationRegistered(() => this._queueRefresh(void 0, true))), this._register(this._decorationService.onDecorationRemoved(() => this._queueRefresh(void 0, true))), this._register(this._renderService.onRenderedViewportChange(() => this._queueRefresh())), this._register(this._bufferService.buffers.onBufferActivate(() => {
      this._canvas.style.display = this._bufferService.buffer === this._bufferService.buffers.alt ? "none" : "block";
    })), this._register(this._bufferService.onScroll(() => {
      this._lastKnownBufferLength !== this._bufferService.buffers.normal.lines.length && (this._refreshDrawHeightConstants(), this._refreshColorZonePadding());
    })), this._register(this._renderService.onRender(() => {
      (!this._containerHeight || this._containerHeight !== this._screenElement.clientHeight) && (this._queueRefresh(true), this._containerHeight = this._screenElement.clientHeight);
    })), this._register(this._coreBrowserService.onDprChange(() => this._queueRefresh(true))), this._register(this._optionsService.onSpecificOptionChange("overviewRuler", () => this._queueRefresh(true))), this._register(this._themeService.onChangeColors(() => this._queueRefresh())), this._queueRefresh(true);
  }
  get _width() {
    return this._optionsService.options.overviewRuler?.width || 0;
  }
  _refreshDrawConstants() {
    let e2 = Math.floor((this._canvas.width - 1) / 3), i = Math.ceil((this._canvas.width - 1) / 3);
    at.full = this._canvas.width, at.left = e2, at.center = i, at.right = e2, this._refreshDrawHeightConstants(), Li.full = 1, Li.left = 1, Li.center = 1 + at.left, Li.right = 1 + at.left + at.center;
  }
  _refreshDrawHeightConstants() {
    We.full = Math.round(2 * this._coreBrowserService.dpr);
    let e2 = this._canvas.height / this._bufferService.buffer.lines.length, i = Math.round(Math.max(Math.min(e2, 12), 6) * this._coreBrowserService.dpr);
    We.left = i, We.center = i, We.right = i;
  }
  _refreshColorZonePadding() {
    this._colorZoneStore.setPadding({ full: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.full), left: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.left), center: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.center), right: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.right) }), this._lastKnownBufferLength = this._bufferService.buffers.normal.lines.length;
  }
  _refreshCanvasDimensions() {
    this._canvas.style.width = `${this._width}px`, this._canvas.width = Math.round(this._width * this._coreBrowserService.dpr), this._canvas.style.height = `${this._screenElement.clientHeight}px`, this._canvas.height = Math.round(this._screenElement.clientHeight * this._coreBrowserService.dpr), this._refreshDrawConstants(), this._refreshColorZonePadding();
  }
  _refreshDecorations() {
    this._shouldUpdateDimensions && this._refreshCanvasDimensions(), this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._colorZoneStore.clear();
    for (let i of this._decorationService.decorations) this._colorZoneStore.addDecoration(i);
    this._ctx.lineWidth = 1, this._renderRulerOutline();
    let e2 = this._colorZoneStore.zones;
    for (let i of e2) i.position !== "full" && this._renderColorZone(i);
    for (let i of e2) i.position === "full" && this._renderColorZone(i);
    this._shouldUpdateDimensions = false, this._shouldUpdateAnchor = false;
  }
  _renderRulerOutline() {
    this._ctx.fillStyle = this._themeService.colors.overviewRulerBorder.css, this._ctx.fillRect(0, 0, 1, this._canvas.height), this._optionsService.rawOptions.overviewRuler.showTopBorder && this._ctx.fillRect(1, 0, this._canvas.width - 1, 1), this._optionsService.rawOptions.overviewRuler.showBottomBorder && this._ctx.fillRect(1, this._canvas.height - 1, this._canvas.width - 1, this._canvas.height);
  }
  _renderColorZone(e2) {
    this._ctx.fillStyle = e2.color, this._ctx.fillRect(Li[e2.position || "full"], Math.round((this._canvas.height - 1) * (e2.startBufferLine / this._bufferService.buffers.active.lines.length) - We[e2.position || "full"] / 2), at[e2.position || "full"], Math.round((this._canvas.height - 1) * ((e2.endBufferLine - e2.startBufferLine) / this._bufferService.buffers.active.lines.length) + We[e2.position || "full"]));
  }
  _queueRefresh(e2, i) {
    this._shouldUpdateDimensions = e2 || this._shouldUpdateDimensions, this._shouldUpdateAnchor = i || this._shouldUpdateAnchor, this._animationFrame === void 0 && (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => {
      this._refreshDecorations(), this._animationFrame = void 0;
    }));
  }
};
bt = M2([S(2, F), S(3, Be), S(4, ce), S(5, H), S(6, Re), S(7, ae)], bt);
var b2;
((E) => (E.NUL = "\0", E.SOH = "", E.STX = "", E.ETX = "", E.EOT = "", E.ENQ = "", E.ACK = "", E.BEL = "\x07", E.BS = "\b", E.HT = "	", E.LF = `
`, E.VT = "\v", E.FF = "\f", E.CR = "\r", E.SO = "", E.SI = "", E.DLE = "", E.DC1 = "", E.DC2 = "", E.DC3 = "", E.DC4 = "", E.NAK = "", E.SYN = "", E.ETB = "", E.CAN = "", E.EM = "", E.SUB = "", E.ESC = "\x1B", E.FS = "", E.GS = "", E.RS = "", E.US = "", E.SP = " ", E.DEL = "\x7F"))(b2 ||= {});
var Ai;
((g) => (g.PAD = "\x80", g.HOP = "\x81", g.BPH = "\x82", g.NBH = "\x83", g.IND = "\x84", g.NEL = "\x85", g.SSA = "\x86", g.ESA = "\x87", g.HTS = "\x88", g.HTJ = "\x89", g.VTS = "\x8A", g.PLD = "\x8B", g.PLU = "\x8C", g.RI = "\x8D", g.SS2 = "\x8E", g.SS3 = "\x8F", g.DCS = "\x90", g.PU1 = "\x91", g.PU2 = "\x92", g.STS = "\x93", g.CCH = "\x94", g.MW = "\x95", g.SPA = "\x96", g.EPA = "\x97", g.SOS = "\x98", g.SGCI = "\x99", g.SCI = "\x9A", g.CSI = "\x9B", g.ST = "\x9C", g.OSC = "\x9D", g.PM = "\x9E", g.APC = "\x9F"))(Ai ||= {});
var fs;
((t) => t.ST = `${b2.ESC}\\`)(fs ||= {});
var $t = class {
  constructor(t, e2, i, r, n, o2) {
    this._textarea = t;
    this._compositionView = e2;
    this._bufferService = i;
    this._optionsService = r;
    this._coreService = n;
    this._renderService = o2;
    this._isComposing = false, this._isSendingComposition = false, this._compositionPosition = { start: 0, end: 0 }, this._dataAlreadySent = "";
  }
  get isComposing() {
    return this._isComposing;
  }
  compositionstart() {
    this._isComposing = true, this._compositionPosition.start = this._textarea.value.length, this._compositionView.textContent = "", this._dataAlreadySent = "", this._compositionView.classList.add("active");
  }
  compositionupdate(t) {
    this._compositionView.textContent = t.data, this.updateCompositionElements(), setTimeout(() => {
      this._compositionPosition.end = this._textarea.value.length;
    }, 0);
  }
  compositionend() {
    this._finalizeComposition(true);
  }
  keydown(t) {
    if (this._isComposing || this._isSendingComposition) {
      if (t.keyCode === 20 || t.keyCode === 229 || t.keyCode === 16 || t.keyCode === 17 || t.keyCode === 18) return false;
      this._finalizeComposition(false);
    }
    return t.keyCode === 229 ? (this._handleAnyTextareaChanges(), false) : true;
  }
  _finalizeComposition(t) {
    if (this._compositionView.classList.remove("active"), this._isComposing = false, t) {
      let e2 = { start: this._compositionPosition.start, end: this._compositionPosition.end };
      this._isSendingComposition = true, setTimeout(() => {
        if (this._isSendingComposition) {
          this._isSendingComposition = false;
          let i;
          e2.start += this._dataAlreadySent.length, this._isComposing ? i = this._textarea.value.substring(e2.start, this._compositionPosition.start) : i = this._textarea.value.substring(e2.start), i.length > 0 && this._coreService.triggerDataEvent(i, true);
        }
      }, 0);
    } else {
      this._isSendingComposition = false;
      let e2 = this._textarea.value.substring(this._compositionPosition.start, this._compositionPosition.end);
      this._coreService.triggerDataEvent(e2, true);
    }
  }
  _handleAnyTextareaChanges() {
    let t = this._textarea.value;
    setTimeout(() => {
      if (!this._isComposing) {
        let e2 = this._textarea.value, i = e2.replace(t, "");
        this._dataAlreadySent = i, e2.length > t.length ? this._coreService.triggerDataEvent(i, true) : e2.length < t.length ? this._coreService.triggerDataEvent(`${b2.DEL}`, true) : e2.length === t.length && e2 !== t && this._coreService.triggerDataEvent(e2, true);
      }
    }, 0);
  }
  updateCompositionElements(t) {
    if (this._isComposing) {
      if (this._bufferService.buffer.isCursorInViewport) {
        let e2 = Math.min(this._bufferService.buffer.x, this._bufferService.cols - 1), i = this._renderService.dimensions.css.cell.height, r = this._bufferService.buffer.y * this._renderService.dimensions.css.cell.height, n = e2 * this._renderService.dimensions.css.cell.width;
        this._compositionView.style.left = n + "px", this._compositionView.style.top = r + "px", this._compositionView.style.height = i + "px", this._compositionView.style.lineHeight = i + "px", this._compositionView.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._compositionView.style.fontSize = this._optionsService.rawOptions.fontSize + "px";
        let o2 = this._compositionView.getBoundingClientRect();
        this._textarea.style.left = n + "px", this._textarea.style.top = r + "px", this._textarea.style.width = Math.max(o2.width, 1) + "px", this._textarea.style.height = Math.max(o2.height, 1) + "px", this._textarea.style.lineHeight = o2.height + "px";
      }
      t || setTimeout(() => this.updateCompositionElements(true), 0);
    }
  }
};
$t = M2([S(2, F), S(3, H), S(4, ge), S(5, ce)], $t);
var ue = 0;
var he = 0;
var de = 0;
var J = 0;
var ps = { css: "#00000000", rgba: 0 };
var j;
((i) => {
  function s15(r, n, o2, l) {
    return l !== void 0 ? `#${vt(r)}${vt(n)}${vt(o2)}${vt(l)}` : `#${vt(r)}${vt(n)}${vt(o2)}`;
  }
  i.toCss = s15;
  function t(r, n, o2, l = 255) {
    return (r << 24 | n << 16 | o2 << 8 | l) >>> 0;
  }
  i.toRgba = t;
  function e2(r, n, o2, l) {
    return { css: i.toCss(r, n, o2, l), rgba: i.toRgba(r, n, o2, l) };
  }
  i.toColor = e2;
})(j ||= {});
var U;
((l) => {
  function s15(a2, u) {
    if (J = (u.rgba & 255) / 255, J === 1) return { css: u.css, rgba: u.rgba };
    let h2 = u.rgba >> 24 & 255, c2 = u.rgba >> 16 & 255, d2 = u.rgba >> 8 & 255, _2 = a2.rgba >> 24 & 255, p = a2.rgba >> 16 & 255, m = a2.rgba >> 8 & 255;
    ue = _2 + Math.round((h2 - _2) * J), he = p + Math.round((c2 - p) * J), de = m + Math.round((d2 - m) * J);
    let f2 = j.toCss(ue, he, de), A = j.toRgba(ue, he, de);
    return { css: f2, rgba: A };
  }
  l.blend = s15;
  function t(a2) {
    return (a2.rgba & 255) === 255;
  }
  l.isOpaque = t;
  function e2(a2, u, h2) {
    let c2 = $r.ensureContrastRatio(a2.rgba, u.rgba, h2);
    if (c2) return j.toColor(c2 >> 24 & 255, c2 >> 16 & 255, c2 >> 8 & 255);
  }
  l.ensureContrastRatio = e2;
  function i(a2) {
    let u = (a2.rgba | 255) >>> 0;
    return [ue, he, de] = $r.toChannels(u), { css: j.toCss(ue, he, de), rgba: u };
  }
  l.opaque = i;
  function r(a2, u) {
    return J = Math.round(u * 255), [ue, he, de] = $r.toChannels(a2.rgba), { css: j.toCss(ue, he, de, J), rgba: j.toRgba(ue, he, de, J) };
  }
  l.opacity = r;
  function n(a2, u) {
    return J = a2.rgba & 255, r(a2, J * u / 255);
  }
  l.multiplyOpacity = n;
  function o2(a2) {
    return [a2.rgba >> 24 & 255, a2.rgba >> 16 & 255, a2.rgba >> 8 & 255];
  }
  l.toColorRGB = o2;
})(U ||= {});
var z2;
((i) => {
  let s15, t;
  try {
    let r = document.createElement("canvas");
    r.width = 1, r.height = 1;
    let n = r.getContext("2d", { willReadFrequently: true });
    n && (s15 = n, s15.globalCompositeOperation = "copy", t = s15.createLinearGradient(0, 0, 1, 1));
  } catch {
  }
  function e2(r) {
    if (r.match(/#[\da-f]{3,8}/i)) switch (r.length) {
      case 4:
        return ue = parseInt(r.slice(1, 2).repeat(2), 16), he = parseInt(r.slice(2, 3).repeat(2), 16), de = parseInt(r.slice(3, 4).repeat(2), 16), j.toColor(ue, he, de);
      case 5:
        return ue = parseInt(r.slice(1, 2).repeat(2), 16), he = parseInt(r.slice(2, 3).repeat(2), 16), de = parseInt(r.slice(3, 4).repeat(2), 16), J = parseInt(r.slice(4, 5).repeat(2), 16), j.toColor(ue, he, de, J);
      case 7:
        return { css: r, rgba: (parseInt(r.slice(1), 16) << 8 | 255) >>> 0 };
      case 9:
        return { css: r, rgba: parseInt(r.slice(1), 16) >>> 0 };
    }
    let n = r.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);
    if (n) return ue = parseInt(n[1]), he = parseInt(n[2]), de = parseInt(n[3]), J = Math.round((n[5] === void 0 ? 1 : parseFloat(n[5])) * 255), j.toColor(ue, he, de, J);
    if (!s15 || !t) throw new Error("css.toColor: Unsupported css format");
    if (s15.fillStyle = t, s15.fillStyle = r, typeof s15.fillStyle != "string") throw new Error("css.toColor: Unsupported css format");
    if (s15.fillRect(0, 0, 1, 1), [ue, he, de, J] = s15.getImageData(0, 0, 1, 1).data, J !== 255) throw new Error("css.toColor: Unsupported css format");
    return { rgba: j.toRgba(ue, he, de, J), css: r };
  }
  i.toColor = e2;
})(z2 ||= {});
var ve;
((e2) => {
  function s15(i) {
    return t(i >> 16 & 255, i >> 8 & 255, i & 255);
  }
  e2.relativeLuminance = s15;
  function t(i, r, n) {
    let o2 = i / 255, l = r / 255, a2 = n / 255, u = o2 <= 0.03928 ? o2 / 12.92 : Math.pow((o2 + 0.055) / 1.055, 2.4), h2 = l <= 0.03928 ? l / 12.92 : Math.pow((l + 0.055) / 1.055, 2.4), c2 = a2 <= 0.03928 ? a2 / 12.92 : Math.pow((a2 + 0.055) / 1.055, 2.4);
    return u * 0.2126 + h2 * 0.7152 + c2 * 0.0722;
  }
  e2.relativeLuminance2 = t;
})(ve ||= {});
var $r;
((n) => {
  function s15(o2, l) {
    if (J = (l & 255) / 255, J === 1) return l;
    let a2 = l >> 24 & 255, u = l >> 16 & 255, h2 = l >> 8 & 255, c2 = o2 >> 24 & 255, d2 = o2 >> 16 & 255, _2 = o2 >> 8 & 255;
    return ue = c2 + Math.round((a2 - c2) * J), he = d2 + Math.round((u - d2) * J), de = _2 + Math.round((h2 - _2) * J), j.toRgba(ue, he, de);
  }
  n.blend = s15;
  function t(o2, l, a2) {
    let u = ve.relativeLuminance(o2 >> 8), h2 = ve.relativeLuminance(l >> 8);
    if (Xe(u, h2) < a2) {
      if (h2 < u) {
        let p = e2(o2, l, a2), m = Xe(u, ve.relativeLuminance(p >> 8));
        if (m < a2) {
          let f2 = i(o2, l, a2), A = Xe(u, ve.relativeLuminance(f2 >> 8));
          return m > A ? p : f2;
        }
        return p;
      }
      let d2 = i(o2, l, a2), _2 = Xe(u, ve.relativeLuminance(d2 >> 8));
      if (_2 < a2) {
        let p = e2(o2, l, a2), m = Xe(u, ve.relativeLuminance(p >> 8));
        return _2 > m ? d2 : p;
      }
      return d2;
    }
  }
  n.ensureContrastRatio = t;
  function e2(o2, l, a2) {
    let u = o2 >> 24 & 255, h2 = o2 >> 16 & 255, c2 = o2 >> 8 & 255, d2 = l >> 24 & 255, _2 = l >> 16 & 255, p = l >> 8 & 255, m = Xe(ve.relativeLuminance2(d2, _2, p), ve.relativeLuminance2(u, h2, c2));
    for (; m < a2 && (d2 > 0 || _2 > 0 || p > 0); ) d2 -= Math.max(0, Math.ceil(d2 * 0.1)), _2 -= Math.max(0, Math.ceil(_2 * 0.1)), p -= Math.max(0, Math.ceil(p * 0.1)), m = Xe(ve.relativeLuminance2(d2, _2, p), ve.relativeLuminance2(u, h2, c2));
    return (d2 << 24 | _2 << 16 | p << 8 | 255) >>> 0;
  }
  n.reduceLuminance = e2;
  function i(o2, l, a2) {
    let u = o2 >> 24 & 255, h2 = o2 >> 16 & 255, c2 = o2 >> 8 & 255, d2 = l >> 24 & 255, _2 = l >> 16 & 255, p = l >> 8 & 255, m = Xe(ve.relativeLuminance2(d2, _2, p), ve.relativeLuminance2(u, h2, c2));
    for (; m < a2 && (d2 < 255 || _2 < 255 || p < 255); ) d2 = Math.min(255, d2 + Math.ceil((255 - d2) * 0.1)), _2 = Math.min(255, _2 + Math.ceil((255 - _2) * 0.1)), p = Math.min(255, p + Math.ceil((255 - p) * 0.1)), m = Xe(ve.relativeLuminance2(d2, _2, p), ve.relativeLuminance2(u, h2, c2));
    return (d2 << 24 | _2 << 16 | p << 8 | 255) >>> 0;
  }
  n.increaseLuminance = i;
  function r(o2) {
    return [o2 >> 24 & 255, o2 >> 16 & 255, o2 >> 8 & 255, o2 & 255];
  }
  n.toChannels = r;
})($r ||= {});
function vt(s15) {
  let t = s15.toString(16);
  return t.length < 2 ? "0" + t : t;
}
function Xe(s15, t) {
  return s15 < t ? (t + 0.05) / (s15 + 0.05) : (s15 + 0.05) / (t + 0.05);
}
var Vr = class extends De {
  constructor(e2, i, r) {
    super();
    this.content = 0;
    this.combinedData = "";
    this.fg = e2.fg, this.bg = e2.bg, this.combinedData = i, this._width = r;
  }
  isCombined() {
    return 2097152;
  }
  getWidth() {
    return this._width;
  }
  getChars() {
    return this.combinedData;
  }
  getCode() {
    return 2097151;
  }
  setFromCharData(e2) {
    throw new Error("not implemented");
  }
  getAsCharData() {
    return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
  }
};
var ct = class {
  constructor(t) {
    this._bufferService = t;
    this._characterJoiners = [];
    this._nextCharacterJoinerId = 0;
    this._workCell = new q();
  }
  register(t) {
    let e2 = { id: this._nextCharacterJoinerId++, handler: t };
    return this._characterJoiners.push(e2), e2.id;
  }
  deregister(t) {
    for (let e2 = 0; e2 < this._characterJoiners.length; e2++) if (this._characterJoiners[e2].id === t) return this._characterJoiners.splice(e2, 1), true;
    return false;
  }
  getJoinedCharacters(t) {
    if (this._characterJoiners.length === 0) return [];
    let e2 = this._bufferService.buffer.lines.get(t);
    if (!e2 || e2.length === 0) return [];
    let i = [], r = e2.translateToString(true), n = 0, o2 = 0, l = 0, a2 = e2.getFg(0), u = e2.getBg(0);
    for (let h2 = 0; h2 < e2.getTrimmedLength(); h2++) if (e2.loadCell(h2, this._workCell), this._workCell.getWidth() !== 0) {
      if (this._workCell.fg !== a2 || this._workCell.bg !== u) {
        if (h2 - n > 1) {
          let c2 = this._getJoinedRanges(r, l, o2, e2, n);
          for (let d2 = 0; d2 < c2.length; d2++) i.push(c2[d2]);
        }
        n = h2, l = o2, a2 = this._workCell.fg, u = this._workCell.bg;
      }
      o2 += this._workCell.getChars().length || we.length;
    }
    if (this._bufferService.cols - n > 1) {
      let h2 = this._getJoinedRanges(r, l, o2, e2, n);
      for (let c2 = 0; c2 < h2.length; c2++) i.push(h2[c2]);
    }
    return i;
  }
  _getJoinedRanges(t, e2, i, r, n) {
    let o2 = t.substring(e2, i), l = [];
    try {
      l = this._characterJoiners[0].handler(o2);
    } catch (a2) {
      console.error(a2);
    }
    for (let a2 = 1; a2 < this._characterJoiners.length; a2++) try {
      let u = this._characterJoiners[a2].handler(o2);
      for (let h2 = 0; h2 < u.length; h2++) ct._mergeRanges(l, u[h2]);
    } catch (u) {
      console.error(u);
    }
    return this._stringRangesToCellRanges(l, r, n), l;
  }
  _stringRangesToCellRanges(t, e2, i) {
    let r = 0, n = false, o2 = 0, l = t[r];
    if (l) {
      for (let a2 = i; a2 < this._bufferService.cols; a2++) {
        let u = e2.getWidth(a2), h2 = e2.getString(a2).length || we.length;
        if (u !== 0) {
          if (!n && l[0] <= o2 && (l[0] = a2, n = true), l[1] <= o2) {
            if (l[1] = a2, l = t[++r], !l) break;
            l[0] <= o2 ? (l[0] = a2, n = true) : n = false;
          }
          o2 += h2;
        }
      }
      l && (l[1] = this._bufferService.cols);
    }
  }
  static _mergeRanges(t, e2) {
    let i = false;
    for (let r = 0; r < t.length; r++) {
      let n = t[r];
      if (i) {
        if (e2[1] <= n[0]) return t[r - 1][1] = e2[1], t;
        if (e2[1] <= n[1]) return t[r - 1][1] = Math.max(e2[1], n[1]), t.splice(r, 1), t;
        t.splice(r, 1), r--;
      } else {
        if (e2[1] <= n[0]) return t.splice(r, 0, e2), t;
        if (e2[1] <= n[1]) return n[0] = Math.min(e2[0], n[0]), t;
        e2[0] < n[1] && (n[0] = Math.min(e2[0], n[0]), i = true);
        continue;
      }
    }
    return i ? t[t.length - 1][1] = e2[1] : t.push(e2), t;
  }
};
ct = M2([S(0, F)], ct);
function Oa(s15) {
  return 57508 <= s15 && s15 <= 57558;
}
function Ba(s15) {
  return 9472 <= s15 && s15 <= 9631;
}
function $o(s15) {
  return Oa(s15) || Ba(s15);
}
function Vo() {
  return { css: { canvas: qr(), cell: qr() }, device: { canvas: qr(), cell: qr(), char: { width: 0, height: 0, left: 0, top: 0 } } };
}
function qr() {
  return { width: 0, height: 0 };
}
var Vt = class {
  constructor(t, e2, i, r, n, o2, l) {
    this._document = t;
    this._characterJoinerService = e2;
    this._optionsService = i;
    this._coreBrowserService = r;
    this._coreService = n;
    this._decorationService = o2;
    this._themeService = l;
    this._workCell = new q();
    this._columnSelectMode = false;
    this.defaultSpacing = 0;
  }
  handleSelectionChanged(t, e2, i) {
    this._selectionStart = t, this._selectionEnd = e2, this._columnSelectMode = i;
  }
  createRow(t, e2, i, r, n, o2, l, a2, u, h2, c2) {
    let d2 = [], _2 = this._characterJoinerService.getJoinedCharacters(e2), p = this._themeService.colors, m = t.getNoBgTrimmedLength();
    i && m < o2 + 1 && (m = o2 + 1);
    let f2, A = 0, R = "", O = 0, I = 0, k = 0, P = 0, oe = false, Me = 0, Pe = false, Ke = 0, di = 0, V2 = [], Qe = h2 !== -1 && c2 !== -1;
    for (let y = 0; y < m; y++) {
      t.loadCell(y, this._workCell);
      let T = this._workCell.getWidth();
      if (T === 0) continue;
      let g = false, w = y >= di, E = y, x = this._workCell;
      if (_2.length > 0 && y === _2[0][0] && w) {
        let W = _2.shift(), An = this._isCellInSelection(W[0], e2);
        for (O = W[0] + 1; O < W[1]; O++) w &&= An === this._isCellInSelection(O, e2);
        w &&= !i || o2 < W[0] || o2 >= W[1], w ? (g = true, x = new Vr(this._workCell, t.translateToString(true, W[0], W[1]), W[1] - W[0]), E = W[1] - 1, T = x.getWidth()) : di = W[1];
      }
      let N = this._isCellInSelection(y, e2), Z = i && y === o2, te = Qe && y >= h2 && y <= c2, Oe = false;
      this._decorationService.forEachDecorationAtCell(y, e2, void 0, (W) => {
        Oe = true;
      });
      let ze = x.getChars() || we;
      if (ze === " " && (x.isUnderline() || x.isOverline()) && (ze = "\xA0"), Ke = T * a2 - u.get(ze, x.isBold(), x.isItalic()), !f2) f2 = this._document.createElement("span");
      else if (A && (N && Pe || !N && !Pe && x.bg === I) && (N && Pe && p.selectionForeground || x.fg === k) && x.extended.ext === P && te === oe && Ke === Me && !Z && !g && !Oe && w) {
        x.isInvisible() ? R += we : R += ze, A++;
        continue;
      } else A && (f2.textContent = R), f2 = this._document.createElement("span"), A = 0, R = "";
      if (I = x.bg, k = x.fg, P = x.extended.ext, oe = te, Me = Ke, Pe = N, g && o2 >= y && o2 <= E && (o2 = y), !this._coreService.isCursorHidden && Z && this._coreService.isCursorInitialized) {
        if (V2.push("xterm-cursor"), this._coreBrowserService.isFocused) l && V2.push("xterm-cursor-blink"), V2.push(r === "bar" ? "xterm-cursor-bar" : r === "underline" ? "xterm-cursor-underline" : "xterm-cursor-block");
        else if (n) switch (n) {
          case "outline":
            V2.push("xterm-cursor-outline");
            break;
          case "block":
            V2.push("xterm-cursor-block");
            break;
          case "bar":
            V2.push("xterm-cursor-bar");
            break;
          case "underline":
            V2.push("xterm-cursor-underline");
            break;
          default:
            break;
        }
      }
      if (x.isBold() && V2.push("xterm-bold"), x.isItalic() && V2.push("xterm-italic"), x.isDim() && V2.push("xterm-dim"), x.isInvisible() ? R = we : R = x.getChars() || we, x.isUnderline() && (V2.push(`xterm-underline-${x.extended.underlineStyle}`), R === " " && (R = "\xA0"), !x.isUnderlineColorDefault())) if (x.isUnderlineColorRGB()) f2.style.textDecorationColor = `rgb(${De.toColorRGB(x.getUnderlineColor()).join(",")})`;
      else {
        let W = x.getUnderlineColor();
        this._optionsService.rawOptions.drawBoldTextInBrightColors && x.isBold() && W < 8 && (W += 8), f2.style.textDecorationColor = p.ansi[W].css;
      }
      x.isOverline() && (V2.push("xterm-overline"), R === " " && (R = "\xA0")), x.isStrikethrough() && V2.push("xterm-strikethrough"), te && (f2.style.textDecoration = "underline");
      let le = x.getFgColor(), et = x.getFgColorMode(), me = x.getBgColor(), ht = x.getBgColorMode(), fi = !!x.isInverse();
      if (fi) {
        let W = le;
        le = me, me = W;
        let An = et;
        et = ht, ht = An;
      }
      let tt, Qi, pi = false;
      this._decorationService.forEachDecorationAtCell(y, e2, void 0, (W) => {
        W.options.layer !== "top" && pi || (W.backgroundColorRGB && (ht = 50331648, me = W.backgroundColorRGB.rgba >> 8 & 16777215, tt = W.backgroundColorRGB), W.foregroundColorRGB && (et = 50331648, le = W.foregroundColorRGB.rgba >> 8 & 16777215, Qi = W.foregroundColorRGB), pi = W.options.layer === "top");
      }), !pi && N && (tt = this._coreBrowserService.isFocused ? p.selectionBackgroundOpaque : p.selectionInactiveBackgroundOpaque, me = tt.rgba >> 8 & 16777215, ht = 50331648, pi = true, p.selectionForeground && (et = 50331648, le = p.selectionForeground.rgba >> 8 & 16777215, Qi = p.selectionForeground)), pi && V2.push("xterm-decoration-top");
      let it;
      switch (ht) {
        case 16777216:
        case 33554432:
          it = p.ansi[me], V2.push(`xterm-bg-${me}`);
          break;
        case 50331648:
          it = j.toColor(me >> 16, me >> 8 & 255, me & 255), this._addStyle(f2, `background-color:#${qo((me >>> 0).toString(16), "0", 6)}`);
          break;
        case 0:
        default:
          fi ? (it = p.foreground, V2.push(`xterm-bg-${257}`)) : it = p.background;
      }
      switch (tt || x.isDim() && (tt = U.multiplyOpacity(it, 0.5)), et) {
        case 16777216:
        case 33554432:
          x.isBold() && le < 8 && this._optionsService.rawOptions.drawBoldTextInBrightColors && (le += 8), this._applyMinimumContrast(f2, it, p.ansi[le], x, tt, void 0) || V2.push(`xterm-fg-${le}`);
          break;
        case 50331648:
          let W = j.toColor(le >> 16 & 255, le >> 8 & 255, le & 255);
          this._applyMinimumContrast(f2, it, W, x, tt, Qi) || this._addStyle(f2, `color:#${qo(le.toString(16), "0", 6)}`);
          break;
        case 0:
        default:
          this._applyMinimumContrast(f2, it, p.foreground, x, tt, Qi) || fi && V2.push(`xterm-fg-${257}`);
      }
      V2.length && (f2.className = V2.join(" "), V2.length = 0), !Z && !g && !Oe && w ? A++ : f2.textContent = R, Ke !== this.defaultSpacing && (f2.style.letterSpacing = `${Ke}px`), d2.push(f2), y = E;
    }
    return f2 && A && (f2.textContent = R), d2;
  }
  _applyMinimumContrast(t, e2, i, r, n, o2) {
    if (this._optionsService.rawOptions.minimumContrastRatio === 1 || $o(r.getCode())) return false;
    let l = this._getContrastCache(r), a2;
    if (!n && !o2 && (a2 = l.getColor(e2.rgba, i.rgba)), a2 === void 0) {
      let u = this._optionsService.rawOptions.minimumContrastRatio / (r.isDim() ? 2 : 1);
      a2 = U.ensureContrastRatio(n || e2, o2 || i, u), l.setColor((n || e2).rgba, (o2 || i).rgba, a2 ?? null);
    }
    return a2 ? (this._addStyle(t, `color:${a2.css}`), true) : false;
  }
  _getContrastCache(t) {
    return t.isDim() ? this._themeService.colors.halfContrastCache : this._themeService.colors.contrastCache;
  }
  _addStyle(t, e2) {
    t.setAttribute("style", `${t.getAttribute("style") || ""}${e2};`);
  }
  _isCellInSelection(t, e2) {
    let i = this._selectionStart, r = this._selectionEnd;
    return !i || !r ? false : this._columnSelectMode ? i[0] <= r[0] ? t >= i[0] && e2 >= i[1] && t < r[0] && e2 <= r[1] : t < i[0] && e2 >= i[1] && t >= r[0] && e2 <= r[1] : e2 > i[1] && e2 < r[1] || i[1] === r[1] && e2 === i[1] && t >= i[0] && t < r[0] || i[1] < r[1] && e2 === r[1] && t < r[0] || i[1] < r[1] && e2 === i[1] && t >= i[0];
  }
};
Vt = M2([S(1, or), S(2, H), S(3, ae), S(4, ge), S(5, Be), S(6, Re)], Vt);
function qo(s15, t, e2) {
  for (; s15.length < e2; ) s15 = t + s15;
  return s15;
}
var Yr = class {
  constructor(t, e2) {
    this._flat = new Float32Array(256);
    this._font = "";
    this._fontSize = 0;
    this._weight = "normal";
    this._weightBold = "bold";
    this._measureElements = [];
    this._container = t.createElement("div"), this._container.classList.add("xterm-width-cache-measure-container"), this._container.setAttribute("aria-hidden", "true"), this._container.style.whiteSpace = "pre", this._container.style.fontKerning = "none";
    let i = t.createElement("span");
    i.classList.add("xterm-char-measure-element");
    let r = t.createElement("span");
    r.classList.add("xterm-char-measure-element"), r.style.fontWeight = "bold";
    let n = t.createElement("span");
    n.classList.add("xterm-char-measure-element"), n.style.fontStyle = "italic";
    let o2 = t.createElement("span");
    o2.classList.add("xterm-char-measure-element"), o2.style.fontWeight = "bold", o2.style.fontStyle = "italic", this._measureElements = [i, r, n, o2], this._container.appendChild(i), this._container.appendChild(r), this._container.appendChild(n), this._container.appendChild(o2), e2.appendChild(this._container), this.clear();
  }
  dispose() {
    this._container.remove(), this._measureElements.length = 0, this._holey = void 0;
  }
  clear() {
    this._flat.fill(-9999), this._holey = /* @__PURE__ */ new Map();
  }
  setFont(t, e2, i, r) {
    t === this._font && e2 === this._fontSize && i === this._weight && r === this._weightBold || (this._font = t, this._fontSize = e2, this._weight = i, this._weightBold = r, this._container.style.fontFamily = this._font, this._container.style.fontSize = `${this._fontSize}px`, this._measureElements[0].style.fontWeight = `${i}`, this._measureElements[1].style.fontWeight = `${r}`, this._measureElements[2].style.fontWeight = `${i}`, this._measureElements[3].style.fontWeight = `${r}`, this.clear());
  }
  get(t, e2, i) {
    let r = 0;
    if (!e2 && !i && t.length === 1 && (r = t.charCodeAt(0)) < 256) {
      if (this._flat[r] !== -9999) return this._flat[r];
      let l = this._measure(t, 0);
      return l > 0 && (this._flat[r] = l), l;
    }
    let n = t;
    e2 && (n += "B"), i && (n += "I");
    let o2 = this._holey.get(n);
    if (o2 === void 0) {
      let l = 0;
      e2 && (l |= 1), i && (l |= 2), o2 = this._measure(t, l), o2 > 0 && this._holey.set(n, o2);
    }
    return o2;
  }
  _measure(t, e2) {
    let i = this._measureElements[e2];
    return i.textContent = t.repeat(32), i.offsetWidth / 32;
  }
};
var ms = class {
  constructor() {
    this.clear();
  }
  clear() {
    this.hasSelection = false, this.columnSelectMode = false, this.viewportStartRow = 0, this.viewportEndRow = 0, this.viewportCappedStartRow = 0, this.viewportCappedEndRow = 0, this.startCol = 0, this.endCol = 0, this.selectionStart = void 0, this.selectionEnd = void 0;
  }
  update(t, e2, i, r = false) {
    if (this.selectionStart = e2, this.selectionEnd = i, !e2 || !i || e2[0] === i[0] && e2[1] === i[1]) {
      this.clear();
      return;
    }
    let n = t.buffers.active.ydisp, o2 = e2[1] - n, l = i[1] - n, a2 = Math.max(o2, 0), u = Math.min(l, t.rows - 1);
    if (a2 >= t.rows || u < 0) {
      this.clear();
      return;
    }
    this.hasSelection = true, this.columnSelectMode = r, this.viewportStartRow = o2, this.viewportEndRow = l, this.viewportCappedStartRow = a2, this.viewportCappedEndRow = u, this.startCol = e2[0], this.endCol = i[0];
  }
  isCellSelected(t, e2, i) {
    return this.hasSelection ? (i -= t.buffer.active.viewportY, this.columnSelectMode ? this.startCol <= this.endCol ? e2 >= this.startCol && i >= this.viewportCappedStartRow && e2 < this.endCol && i <= this.viewportCappedEndRow : e2 < this.startCol && i >= this.viewportCappedStartRow && e2 >= this.endCol && i <= this.viewportCappedEndRow : i > this.viewportStartRow && i < this.viewportEndRow || this.viewportStartRow === this.viewportEndRow && i === this.viewportStartRow && e2 >= this.startCol && e2 < this.endCol || this.viewportStartRow < this.viewportEndRow && i === this.viewportEndRow && e2 < this.endCol || this.viewportStartRow < this.viewportEndRow && i === this.viewportStartRow && e2 >= this.startCol) : false;
  }
};
function Yo() {
  return new ms();
}
var _s = "xterm-dom-renderer-owner-";
var Le = "xterm-rows";
var jr = "xterm-fg-";
var jo = "xterm-bg-";
var ki = "xterm-focus";
var Xr = "xterm-selection";
var Na = 1;
var Yt = class extends D {
  constructor(e2, i, r, n, o2, l, a2, u, h2, c2, d2, _2, p, m) {
    super();
    this._terminal = e2;
    this._document = i;
    this._element = r;
    this._screenElement = n;
    this._viewportElement = o2;
    this._helperContainer = l;
    this._linkifier2 = a2;
    this._charSizeService = h2;
    this._optionsService = c2;
    this._bufferService = d2;
    this._coreService = _2;
    this._coreBrowserService = p;
    this._themeService = m;
    this._terminalClass = Na++;
    this._rowElements = [];
    this._selectionRenderModel = Yo();
    this.onRequestRedraw = this._register(new v()).event;
    this._rowContainer = this._document.createElement("div"), this._rowContainer.classList.add(Le), this._rowContainer.style.lineHeight = "normal", this._rowContainer.setAttribute("aria-hidden", "true"), this._refreshRowElements(this._bufferService.cols, this._bufferService.rows), this._selectionContainer = this._document.createElement("div"), this._selectionContainer.classList.add(Xr), this._selectionContainer.setAttribute("aria-hidden", "true"), this.dimensions = Vo(), this._updateDimensions(), this._register(this._optionsService.onOptionChange(() => this._handleOptionsChanged())), this._register(this._themeService.onChangeColors((f2) => this._injectCss(f2))), this._injectCss(this._themeService.colors), this._rowFactory = u.createInstance(Vt, document), this._element.classList.add(_s + this._terminalClass), this._screenElement.appendChild(this._rowContainer), this._screenElement.appendChild(this._selectionContainer), this._register(this._linkifier2.onShowLinkUnderline((f2) => this._handleLinkHover(f2))), this._register(this._linkifier2.onHideLinkUnderline((f2) => this._handleLinkLeave(f2))), this._register(C(() => {
      this._element.classList.remove(_s + this._terminalClass), this._rowContainer.remove(), this._selectionContainer.remove(), this._widthCache.dispose(), this._themeStyleElement.remove(), this._dimensionsStyleElement.remove();
    })), this._widthCache = new Yr(this._document, this._helperContainer), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
  }
  _updateDimensions() {
    let e2 = this._coreBrowserService.dpr;
    this.dimensions.device.char.width = this._charSizeService.width * e2, this.dimensions.device.char.height = Math.ceil(this._charSizeService.height * e2), this.dimensions.device.cell.width = this.dimensions.device.char.width + Math.round(this._optionsService.rawOptions.letterSpacing), this.dimensions.device.cell.height = Math.floor(this.dimensions.device.char.height * this._optionsService.rawOptions.lineHeight), this.dimensions.device.char.left = 0, this.dimensions.device.char.top = 0, this.dimensions.device.canvas.width = this.dimensions.device.cell.width * this._bufferService.cols, this.dimensions.device.canvas.height = this.dimensions.device.cell.height * this._bufferService.rows, this.dimensions.css.canvas.width = Math.round(this.dimensions.device.canvas.width / e2), this.dimensions.css.canvas.height = Math.round(this.dimensions.device.canvas.height / e2), this.dimensions.css.cell.width = this.dimensions.css.canvas.width / this._bufferService.cols, this.dimensions.css.cell.height = this.dimensions.css.canvas.height / this._bufferService.rows;
    for (let r of this._rowElements) r.style.width = `${this.dimensions.css.canvas.width}px`, r.style.height = `${this.dimensions.css.cell.height}px`, r.style.lineHeight = `${this.dimensions.css.cell.height}px`, r.style.overflow = "hidden";
    this._dimensionsStyleElement || (this._dimensionsStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._dimensionsStyleElement));
    let i = `${this._terminalSelector} .${Le} span { display: inline-block; height: 100%; vertical-align: top;}`;
    this._dimensionsStyleElement.textContent = i, this._selectionContainer.style.height = this._viewportElement.style.height, this._screenElement.style.width = `${this.dimensions.css.canvas.width}px`, this._screenElement.style.height = `${this.dimensions.css.canvas.height}px`;
  }
  _injectCss(e2) {
    this._themeStyleElement || (this._themeStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._themeStyleElement));
    let i = `${this._terminalSelector} .${Le} { pointer-events: none; color: ${e2.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;
    i += `${this._terminalSelector} .${Le} .xterm-dim { color: ${U.multiplyOpacity(e2.foreground, 0.5).css};}`, i += `${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`;
    let r = `blink_underline_${this._terminalClass}`, n = `blink_bar_${this._terminalClass}`, o2 = `blink_block_${this._terminalClass}`;
    i += `@keyframes ${r} { 50% {  border-bottom-style: hidden; }}`, i += `@keyframes ${n} { 50% {  box-shadow: none; }}`, i += `@keyframes ${o2} { 0% {  background-color: ${e2.cursor.css};  color: ${e2.cursorAccent.css}; } 50% {  background-color: inherit;  color: ${e2.cursor.css}; }}`, i += `${this._terminalSelector} .${Le}.${ki} .xterm-cursor.xterm-cursor-blink.xterm-cursor-underline { animation: ${r} 1s step-end infinite;}${this._terminalSelector} .${Le}.${ki} .xterm-cursor.xterm-cursor-blink.xterm-cursor-bar { animation: ${n} 1s step-end infinite;}${this._terminalSelector} .${Le}.${ki} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: ${o2} 1s step-end infinite;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-block { background-color: ${e2.cursor.css}; color: ${e2.cursorAccent.css};}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-block:not(.xterm-cursor-blink) { background-color: ${e2.cursor.css} !important; color: ${e2.cursorAccent.css} !important;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-outline { outline: 1px solid ${e2.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-bar { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${e2.cursor.css} inset;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-underline { border-bottom: 1px ${e2.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`, i += `${this._terminalSelector} .${Xr} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${Xr} div { position: absolute; background-color: ${e2.selectionBackgroundOpaque.css};}${this._terminalSelector} .${Xr} div { position: absolute; background-color: ${e2.selectionInactiveBackgroundOpaque.css};}`;
    for (let [l, a2] of e2.ansi.entries()) i += `${this._terminalSelector} .${jr}${l} { color: ${a2.css}; }${this._terminalSelector} .${jr}${l}.xterm-dim { color: ${U.multiplyOpacity(a2, 0.5).css}; }${this._terminalSelector} .${jo}${l} { background-color: ${a2.css}; }`;
    i += `${this._terminalSelector} .${jr}${257} { color: ${U.opaque(e2.background).css}; }${this._terminalSelector} .${jr}${257}.xterm-dim { color: ${U.multiplyOpacity(U.opaque(e2.background), 0.5).css}; }${this._terminalSelector} .${jo}${257} { background-color: ${e2.foreground.css}; }`, this._themeStyleElement.textContent = i;
  }
  _setDefaultSpacing() {
    let e2 = this.dimensions.css.cell.width - this._widthCache.get("W", false, false);
    this._rowContainer.style.letterSpacing = `${e2}px`, this._rowFactory.defaultSpacing = e2;
  }
  handleDevicePixelRatioChange() {
    this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
  }
  _refreshRowElements(e2, i) {
    for (let r = this._rowElements.length; r <= i; r++) {
      let n = this._document.createElement("div");
      this._rowContainer.appendChild(n), this._rowElements.push(n);
    }
    for (; this._rowElements.length > i; ) this._rowContainer.removeChild(this._rowElements.pop());
  }
  handleResize(e2, i) {
    this._refreshRowElements(e2, i), this._updateDimensions(), this.handleSelectionChanged(this._selectionRenderModel.selectionStart, this._selectionRenderModel.selectionEnd, this._selectionRenderModel.columnSelectMode);
  }
  handleCharSizeChanged() {
    this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
  }
  handleBlur() {
    this._rowContainer.classList.remove(ki), this.renderRows(0, this._bufferService.rows - 1);
  }
  handleFocus() {
    this._rowContainer.classList.add(ki), this.renderRows(this._bufferService.buffer.y, this._bufferService.buffer.y);
  }
  handleSelectionChanged(e2, i, r) {
    if (this._selectionContainer.replaceChildren(), this._rowFactory.handleSelectionChanged(e2, i, r), this.renderRows(0, this._bufferService.rows - 1), !e2 || !i || (this._selectionRenderModel.update(this._terminal, e2, i, r), !this._selectionRenderModel.hasSelection)) return;
    let n = this._selectionRenderModel.viewportStartRow, o2 = this._selectionRenderModel.viewportEndRow, l = this._selectionRenderModel.viewportCappedStartRow, a2 = this._selectionRenderModel.viewportCappedEndRow, u = this._document.createDocumentFragment();
    if (r) {
      let h2 = e2[0] > i[0];
      u.appendChild(this._createSelectionElement(l, h2 ? i[0] : e2[0], h2 ? e2[0] : i[0], a2 - l + 1));
    } else {
      let h2 = n === l ? e2[0] : 0, c2 = l === o2 ? i[0] : this._bufferService.cols;
      u.appendChild(this._createSelectionElement(l, h2, c2));
      let d2 = a2 - l - 1;
      if (u.appendChild(this._createSelectionElement(l + 1, 0, this._bufferService.cols, d2)), l !== a2) {
        let _2 = o2 === a2 ? i[0] : this._bufferService.cols;
        u.appendChild(this._createSelectionElement(a2, 0, _2));
      }
    }
    this._selectionContainer.appendChild(u);
  }
  _createSelectionElement(e2, i, r, n = 1) {
    let o2 = this._document.createElement("div"), l = i * this.dimensions.css.cell.width, a2 = this.dimensions.css.cell.width * (r - i);
    return l + a2 > this.dimensions.css.canvas.width && (a2 = this.dimensions.css.canvas.width - l), o2.style.height = `${n * this.dimensions.css.cell.height}px`, o2.style.top = `${e2 * this.dimensions.css.cell.height}px`, o2.style.left = `${l}px`, o2.style.width = `${a2}px`, o2;
  }
  handleCursorMove() {
  }
  _handleOptionsChanged() {
    this._updateDimensions(), this._injectCss(this._themeService.colors), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
  }
  clear() {
    for (let e2 of this._rowElements) e2.replaceChildren();
  }
  renderRows(e2, i) {
    let r = this._bufferService.buffer, n = r.ybase + r.y, o2 = Math.min(r.x, this._bufferService.cols - 1), l = this._coreService.decPrivateModes.cursorBlink ?? this._optionsService.rawOptions.cursorBlink, a2 = this._coreService.decPrivateModes.cursorStyle ?? this._optionsService.rawOptions.cursorStyle, u = this._optionsService.rawOptions.cursorInactiveStyle;
    for (let h2 = e2; h2 <= i; h2++) {
      let c2 = h2 + r.ydisp, d2 = this._rowElements[h2], _2 = r.lines.get(c2);
      if (!d2 || !_2) break;
      d2.replaceChildren(...this._rowFactory.createRow(_2, c2, c2 === n, a2, u, o2, l, this.dimensions.css.cell.width, this._widthCache, -1, -1));
    }
  }
  get _terminalSelector() {
    return `.${_s}${this._terminalClass}`;
  }
  _handleLinkHover(e2) {
    this._setCellUnderline(e2.x1, e2.x2, e2.y1, e2.y2, e2.cols, true);
  }
  _handleLinkLeave(e2) {
    this._setCellUnderline(e2.x1, e2.x2, e2.y1, e2.y2, e2.cols, false);
  }
  _setCellUnderline(e2, i, r, n, o2, l) {
    r < 0 && (e2 = 0), n < 0 && (i = 0);
    let a2 = this._bufferService.rows - 1;
    r = Math.max(Math.min(r, a2), 0), n = Math.max(Math.min(n, a2), 0), o2 = Math.min(o2, this._bufferService.cols);
    let u = this._bufferService.buffer, h2 = u.ybase + u.y, c2 = Math.min(u.x, o2 - 1), d2 = this._optionsService.rawOptions.cursorBlink, _2 = this._optionsService.rawOptions.cursorStyle, p = this._optionsService.rawOptions.cursorInactiveStyle;
    for (let m = r; m <= n; ++m) {
      let f2 = m + u.ydisp, A = this._rowElements[m], R = u.lines.get(f2);
      if (!A || !R) break;
      A.replaceChildren(...this._rowFactory.createRow(R, f2, f2 === h2, _2, p, c2, d2, this.dimensions.css.cell.width, this._widthCache, l ? m === r ? e2 : 0 : -1, l ? (m === n ? i : o2) - 1 : -1));
    }
  }
};
Yt = M2([S(7, xt), S(8, nt), S(9, H), S(10, F), S(11, ge), S(12, ae), S(13, Re)], Yt);
var jt = class extends D {
  constructor(e2, i, r) {
    super();
    this._optionsService = r;
    this.width = 0;
    this.height = 0;
    this._onCharSizeChange = this._register(new v());
    this.onCharSizeChange = this._onCharSizeChange.event;
    try {
      this._measureStrategy = this._register(new vs(this._optionsService));
    } catch {
      this._measureStrategy = this._register(new bs(e2, i, this._optionsService));
    }
    this._register(this._optionsService.onMultipleOptionChange(["fontFamily", "fontSize"], () => this.measure()));
  }
  get hasValidSize() {
    return this.width > 0 && this.height > 0;
  }
  measure() {
    let e2 = this._measureStrategy.measure();
    (e2.width !== this.width || e2.height !== this.height) && (this.width = e2.width, this.height = e2.height, this._onCharSizeChange.fire());
  }
};
jt = M2([S(2, H)], jt);
var Zr = class extends D {
  constructor() {
    super(...arguments);
    this._result = { width: 0, height: 0 };
  }
  _validateAndSet(e2, i) {
    e2 !== void 0 && e2 > 0 && i !== void 0 && i > 0 && (this._result.width = e2, this._result.height = i);
  }
};
var bs = class extends Zr {
  constructor(e2, i, r) {
    super();
    this._document = e2;
    this._parentElement = i;
    this._optionsService = r;
    this._measureElement = this._document.createElement("span"), this._measureElement.classList.add("xterm-char-measure-element"), this._measureElement.textContent = "W".repeat(32), this._measureElement.setAttribute("aria-hidden", "true"), this._measureElement.style.whiteSpace = "pre", this._measureElement.style.fontKerning = "none", this._parentElement.appendChild(this._measureElement);
  }
  measure() {
    return this._measureElement.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._measureElement.style.fontSize = `${this._optionsService.rawOptions.fontSize}px`, this._validateAndSet(Number(this._measureElement.offsetWidth) / 32, Number(this._measureElement.offsetHeight)), this._result;
  }
};
var vs = class extends Zr {
  constructor(e2) {
    super();
    this._optionsService = e2;
    this._canvas = new OffscreenCanvas(100, 100), this._ctx = this._canvas.getContext("2d");
    let i = this._ctx.measureText("W");
    if (!("width" in i && "fontBoundingBoxAscent" in i && "fontBoundingBoxDescent" in i)) throw new Error("Required font metrics not supported");
  }
  measure() {
    this._ctx.font = `${this._optionsService.rawOptions.fontSize}px ${this._optionsService.rawOptions.fontFamily}`;
    let e2 = this._ctx.measureText("W");
    return this._validateAndSet(e2.width, e2.fontBoundingBoxAscent + e2.fontBoundingBoxDescent), this._result;
  }
};
var Jr = class extends D {
  constructor(e2, i, r) {
    super();
    this._textarea = e2;
    this._window = i;
    this.mainDocument = r;
    this._isFocused = false;
    this._cachedIsFocused = void 0;
    this._screenDprMonitor = this._register(new gs(this._window));
    this._onDprChange = this._register(new v());
    this.onDprChange = this._onDprChange.event;
    this._onWindowChange = this._register(new v());
    this.onWindowChange = this._onWindowChange.event;
    this._register(this.onWindowChange((n) => this._screenDprMonitor.setWindow(n))), this._register($.forward(this._screenDprMonitor.onDprChange, this._onDprChange)), this._register(L(this._textarea, "focus", () => this._isFocused = true)), this._register(L(this._textarea, "blur", () => this._isFocused = false));
  }
  get window() {
    return this._window;
  }
  set window(e2) {
    this._window !== e2 && (this._window = e2, this._onWindowChange.fire(this._window));
  }
  get dpr() {
    return this.window.devicePixelRatio;
  }
  get isFocused() {
    return this._cachedIsFocused === void 0 && (this._cachedIsFocused = this._isFocused && this._textarea.ownerDocument.hasFocus(), queueMicrotask(() => this._cachedIsFocused = void 0)), this._cachedIsFocused;
  }
};
var gs = class extends D {
  constructor(e2) {
    super();
    this._parentWindow = e2;
    this._windowResizeListener = this._register(new ye());
    this._onDprChange = this._register(new v());
    this.onDprChange = this._onDprChange.event;
    this._outerListener = () => this._setDprAndFireIfDiffers(), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._updateDpr(), this._setWindowResizeListener(), this._register(C(() => this.clearListener()));
  }
  setWindow(e2) {
    this._parentWindow = e2, this._setWindowResizeListener(), this._setDprAndFireIfDiffers();
  }
  _setWindowResizeListener() {
    this._windowResizeListener.value = L(this._parentWindow, "resize", () => this._setDprAndFireIfDiffers());
  }
  _setDprAndFireIfDiffers() {
    this._parentWindow.devicePixelRatio !== this._currentDevicePixelRatio && this._onDprChange.fire(this._parentWindow.devicePixelRatio), this._updateDpr();
  }
  _updateDpr() {
    this._outerListener && (this._resolutionMediaMatchList?.removeListener(this._outerListener), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._resolutionMediaMatchList = this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`), this._resolutionMediaMatchList.addListener(this._outerListener));
  }
  clearListener() {
    !this._resolutionMediaMatchList || !this._outerListener || (this._resolutionMediaMatchList.removeListener(this._outerListener), this._resolutionMediaMatchList = void 0, this._outerListener = void 0);
  }
};
var Qr = class extends D {
  constructor() {
    super();
    this.linkProviders = [];
    this._register(C(() => this.linkProviders.length = 0));
  }
  registerLinkProvider(e2) {
    return this.linkProviders.push(e2), { dispose: () => {
      let i = this.linkProviders.indexOf(e2);
      i !== -1 && this.linkProviders.splice(i, 1);
    } };
  }
};
function Ci(s15, t, e2) {
  let i = e2.getBoundingClientRect(), r = s15.getComputedStyle(e2), n = parseInt(r.getPropertyValue("padding-left")), o2 = parseInt(r.getPropertyValue("padding-top"));
  return [t.clientX - i.left - n, t.clientY - i.top - o2];
}
function Xo(s15, t, e2, i, r, n, o2, l, a2) {
  if (!n) return;
  let u = Ci(s15, t, e2);
  if (u) return u[0] = Math.ceil((u[0] + (a2 ? o2 / 2 : 0)) / o2), u[1] = Math.ceil(u[1] / l), u[0] = Math.min(Math.max(u[0], 1), i + (a2 ? 1 : 0)), u[1] = Math.min(Math.max(u[1], 1), r), u;
}
var Xt = class {
  constructor(t, e2) {
    this._renderService = t;
    this._charSizeService = e2;
  }
  getCoords(t, e2, i, r, n) {
    return Xo(window, t, e2, i, r, this._charSizeService.hasValidSize, this._renderService.dimensions.css.cell.width, this._renderService.dimensions.css.cell.height, n);
  }
  getMouseReportCoords(t, e2) {
    let i = Ci(window, t, e2);
    if (this._charSizeService.hasValidSize) return i[0] = Math.min(Math.max(i[0], 0), this._renderService.dimensions.css.canvas.width - 1), i[1] = Math.min(Math.max(i[1], 0), this._renderService.dimensions.css.canvas.height - 1), { col: Math.floor(i[0] / this._renderService.dimensions.css.cell.width), row: Math.floor(i[1] / this._renderService.dimensions.css.cell.height), x: Math.floor(i[0]), y: Math.floor(i[1]) };
  }
};
Xt = M2([S(0, ce), S(1, nt)], Xt);
var en = class {
  constructor(t, e2) {
    this._renderCallback = t;
    this._coreBrowserService = e2;
    this._refreshCallbacks = [];
  }
  dispose() {
    this._animationFrame && (this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame), this._animationFrame = void 0);
  }
  addRefreshCallback(t) {
    return this._refreshCallbacks.push(t), this._animationFrame || (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh())), this._animationFrame;
  }
  refresh(t, e2, i) {
    this._rowCount = i, t = t !== void 0 ? t : 0, e2 = e2 !== void 0 ? e2 : this._rowCount - 1, this._rowStart = this._rowStart !== void 0 ? Math.min(this._rowStart, t) : t, this._rowEnd = this._rowEnd !== void 0 ? Math.max(this._rowEnd, e2) : e2, !this._animationFrame && (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh()));
  }
  _innerRefresh() {
    if (this._animationFrame = void 0, this._rowStart === void 0 || this._rowEnd === void 0 || this._rowCount === void 0) {
      this._runRefreshCallbacks();
      return;
    }
    let t = Math.max(this._rowStart, 0), e2 = Math.min(this._rowEnd, this._rowCount - 1);
    this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(t, e2), this._runRefreshCallbacks();
  }
  _runRefreshCallbacks() {
    for (let t of this._refreshCallbacks) t(0);
    this._refreshCallbacks = [];
  }
};
var tn = {};
Ll(tn, { getSafariVersion: () => Ha, isChromeOS: () => Ts, isFirefox: () => Ss, isIpad: () => Wa, isIphone: () => Ua, isLegacyEdge: () => Fa, isLinux: () => Bi, isMac: () => Zt, isNode: () => Mi, isSafari: () => Zo, isWindows: () => Es });
var Mi = typeof process < "u" && "title" in process;
var Pi = Mi ? "node" : navigator.userAgent;
var Oi = Mi ? "node" : navigator.platform;
var Ss = Pi.includes("Firefox");
var Fa = Pi.includes("Edge");
var Zo = /^((?!chrome|android).)*safari/i.test(Pi);
function Ha() {
  if (!Zo) return 0;
  let s15 = Pi.match(/Version\/(\d+)/);
  return s15 === null || s15.length < 2 ? 0 : parseInt(s15[1]);
}
var Zt = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].includes(Oi);
var Wa = Oi === "iPad";
var Ua = Oi === "iPhone";
var Es = ["Windows", "Win16", "Win32", "WinCE"].includes(Oi);
var Bi = Oi.indexOf("Linux") >= 0;
var Ts = /\bCrOS\b/.test(Pi);
var rn = class {
  constructor() {
    this._tasks = [];
    this._i = 0;
  }
  enqueue(t) {
    this._tasks.push(t), this._start();
  }
  flush() {
    for (; this._i < this._tasks.length; ) this._tasks[this._i]() || this._i++;
    this.clear();
  }
  clear() {
    this._idleCallback && (this._cancelCallback(this._idleCallback), this._idleCallback = void 0), this._i = 0, this._tasks.length = 0;
  }
  _start() {
    this._idleCallback || (this._idleCallback = this._requestCallback(this._process.bind(this)));
  }
  _process(t) {
    this._idleCallback = void 0;
    let e2 = 0, i = 0, r = t.timeRemaining(), n = 0;
    for (; this._i < this._tasks.length; ) {
      if (e2 = performance.now(), this._tasks[this._i]() || this._i++, e2 = Math.max(1, performance.now() - e2), i = Math.max(e2, i), n = t.timeRemaining(), i * 1.5 > n) {
        r - e2 < -20 && console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(r - e2))}ms`), this._start();
        return;
      }
      r = n;
    }
    this.clear();
  }
};
var Is = class extends rn {
  _requestCallback(t) {
    return setTimeout(() => t(this._createDeadline(16)));
  }
  _cancelCallback(t) {
    clearTimeout(t);
  }
  _createDeadline(t) {
    let e2 = performance.now() + t;
    return { timeRemaining: () => Math.max(0, e2 - performance.now()) };
  }
};
var ys = class extends rn {
  _requestCallback(t) {
    return requestIdleCallback(t);
  }
  _cancelCallback(t) {
    cancelIdleCallback(t);
  }
};
var Jt = !Mi && "requestIdleCallback" in window ? ys : Is;
var nn = class {
  constructor() {
    this._queue = new Jt();
  }
  set(t) {
    this._queue.clear(), this._queue.enqueue(t);
  }
  flush() {
    this._queue.flush();
  }
};
var Qt = class extends D {
  constructor(e2, i, r, n, o2, l, a2, u, h2) {
    super();
    this._rowCount = e2;
    this._optionsService = r;
    this._charSizeService = n;
    this._coreService = o2;
    this._coreBrowserService = u;
    this._renderer = this._register(new ye());
    this._pausedResizeTask = new nn();
    this._observerDisposable = this._register(new ye());
    this._isPaused = false;
    this._needsFullRefresh = false;
    this._isNextRenderRedrawOnly = true;
    this._needsSelectionRefresh = false;
    this._canvasWidth = 0;
    this._canvasHeight = 0;
    this._selectionState = { start: void 0, end: void 0, columnSelectMode: false };
    this._onDimensionsChange = this._register(new v());
    this.onDimensionsChange = this._onDimensionsChange.event;
    this._onRenderedViewportChange = this._register(new v());
    this.onRenderedViewportChange = this._onRenderedViewportChange.event;
    this._onRender = this._register(new v());
    this.onRender = this._onRender.event;
    this._onRefreshRequest = this._register(new v());
    this.onRefreshRequest = this._onRefreshRequest.event;
    this._renderDebouncer = new en((c2, d2) => this._renderRows(c2, d2), this._coreBrowserService), this._register(this._renderDebouncer), this._syncOutputHandler = new xs(this._coreBrowserService, this._coreService, () => this._fullRefresh()), this._register(C(() => this._syncOutputHandler.dispose())), this._register(this._coreBrowserService.onDprChange(() => this.handleDevicePixelRatioChange())), this._register(a2.onResize(() => this._fullRefresh())), this._register(a2.buffers.onBufferActivate(() => this._renderer.value?.clear())), this._register(this._optionsService.onOptionChange(() => this._handleOptionsChanged())), this._register(this._charSizeService.onCharSizeChange(() => this.handleCharSizeChanged())), this._register(l.onDecorationRegistered(() => this._fullRefresh())), this._register(l.onDecorationRemoved(() => this._fullRefresh())), this._register(this._optionsService.onMultipleOptionChange(["customGlyphs", "drawBoldTextInBrightColors", "letterSpacing", "lineHeight", "fontFamily", "fontSize", "fontWeight", "fontWeightBold", "minimumContrastRatio", "rescaleOverlappingGlyphs"], () => {
      this.clear(), this.handleResize(a2.cols, a2.rows), this._fullRefresh();
    })), this._register(this._optionsService.onMultipleOptionChange(["cursorBlink", "cursorStyle"], () => this.refreshRows(a2.buffer.y, a2.buffer.y, true))), this._register(h2.onChangeColors(() => this._fullRefresh())), this._registerIntersectionObserver(this._coreBrowserService.window, i), this._register(this._coreBrowserService.onWindowChange((c2) => this._registerIntersectionObserver(c2, i)));
  }
  get dimensions() {
    return this._renderer.value.dimensions;
  }
  _registerIntersectionObserver(e2, i) {
    if ("IntersectionObserver" in e2) {
      let r = new e2.IntersectionObserver((n) => this._handleIntersectionChange(n[n.length - 1]), { threshold: 0 });
      r.observe(i), this._observerDisposable.value = C(() => r.disconnect());
    }
  }
  _handleIntersectionChange(e2) {
    this._isPaused = e2.isIntersecting === void 0 ? e2.intersectionRatio === 0 : !e2.isIntersecting, !this._isPaused && !this._charSizeService.hasValidSize && this._charSizeService.measure(), !this._isPaused && this._needsFullRefresh && (this._pausedResizeTask.flush(), this.refreshRows(0, this._rowCount - 1), this._needsFullRefresh = false);
  }
  refreshRows(e2, i, r = false) {
    if (this._isPaused) {
      this._needsFullRefresh = true;
      return;
    }
    if (this._coreService.decPrivateModes.synchronizedOutput) {
      this._syncOutputHandler.bufferRows(e2, i);
      return;
    }
    let n = this._syncOutputHandler.flush();
    n && (e2 = Math.min(e2, n.start), i = Math.max(i, n.end)), r || (this._isNextRenderRedrawOnly = false), this._renderDebouncer.refresh(e2, i, this._rowCount);
  }
  _renderRows(e2, i) {
    if (this._renderer.value) {
      if (this._coreService.decPrivateModes.synchronizedOutput) {
        this._syncOutputHandler.bufferRows(e2, i);
        return;
      }
      e2 = Math.min(e2, this._rowCount - 1), i = Math.min(i, this._rowCount - 1), this._renderer.value.renderRows(e2, i), this._needsSelectionRefresh && (this._renderer.value.handleSelectionChanged(this._selectionState.start, this._selectionState.end, this._selectionState.columnSelectMode), this._needsSelectionRefresh = false), this._isNextRenderRedrawOnly || this._onRenderedViewportChange.fire({ start: e2, end: i }), this._onRender.fire({ start: e2, end: i }), this._isNextRenderRedrawOnly = true;
    }
  }
  resize(e2, i) {
    this._rowCount = i, this._fireOnCanvasResize();
  }
  _handleOptionsChanged() {
    this._renderer.value && (this.refreshRows(0, this._rowCount - 1), this._fireOnCanvasResize());
  }
  _fireOnCanvasResize() {
    this._renderer.value && (this._renderer.value.dimensions.css.canvas.width === this._canvasWidth && this._renderer.value.dimensions.css.canvas.height === this._canvasHeight || this._onDimensionsChange.fire(this._renderer.value.dimensions));
  }
  hasRenderer() {
    return !!this._renderer.value;
  }
  setRenderer(e2) {
    this._renderer.value = e2, this._renderer.value && (this._renderer.value.onRequestRedraw((i) => this.refreshRows(i.start, i.end, true)), this._needsSelectionRefresh = true, this._fullRefresh());
  }
  addRefreshCallback(e2) {
    return this._renderDebouncer.addRefreshCallback(e2);
  }
  _fullRefresh() {
    this._isPaused ? this._needsFullRefresh = true : this.refreshRows(0, this._rowCount - 1);
  }
  clearTextureAtlas() {
    this._renderer.value && (this._renderer.value.clearTextureAtlas?.(), this._fullRefresh());
  }
  handleDevicePixelRatioChange() {
    this._charSizeService.measure(), this._renderer.value && (this._renderer.value.handleDevicePixelRatioChange(), this.refreshRows(0, this._rowCount - 1));
  }
  handleResize(e2, i) {
    this._renderer.value && (this._isPaused ? this._pausedResizeTask.set(() => this._renderer.value?.handleResize(e2, i)) : this._renderer.value.handleResize(e2, i), this._fullRefresh());
  }
  handleCharSizeChanged() {
    this._renderer.value?.handleCharSizeChanged();
  }
  handleBlur() {
    this._renderer.value?.handleBlur();
  }
  handleFocus() {
    this._renderer.value?.handleFocus();
  }
  handleSelectionChanged(e2, i, r) {
    this._selectionState.start = e2, this._selectionState.end = i, this._selectionState.columnSelectMode = r, this._renderer.value?.handleSelectionChanged(e2, i, r);
  }
  handleCursorMove() {
    this._renderer.value?.handleCursorMove();
  }
  clear() {
    this._renderer.value?.clear();
  }
};
Qt = M2([S(2, H), S(3, nt), S(4, ge), S(5, Be), S(6, F), S(7, ae), S(8, Re)], Qt);
var xs = class {
  constructor(t, e2, i) {
    this._coreBrowserService = t;
    this._coreService = e2;
    this._onTimeout = i;
    this._start = 0;
    this._end = 0;
    this._isBuffering = false;
  }
  bufferRows(t, e2) {
    this._isBuffering ? (this._start = Math.min(this._start, t), this._end = Math.max(this._end, e2)) : (this._start = t, this._end = e2, this._isBuffering = true), this._timeout === void 0 && (this._timeout = this._coreBrowserService.window.setTimeout(() => {
      this._timeout = void 0, this._coreService.decPrivateModes.synchronizedOutput = false, this._onTimeout();
    }, 1e3));
  }
  flush() {
    if (this._timeout !== void 0 && (this._coreBrowserService.window.clearTimeout(this._timeout), this._timeout = void 0), !this._isBuffering) return;
    let t = { start: this._start, end: this._end };
    return this._isBuffering = false, t;
  }
  dispose() {
    this._timeout !== void 0 && (this._coreBrowserService.window.clearTimeout(this._timeout), this._timeout = void 0);
  }
};
function Jo(s15, t, e2, i) {
  let r = e2.buffer.x, n = e2.buffer.y;
  if (!e2.buffer.hasScrollback) return Ga(r, n, s15, t, e2, i) + sn(n, t, e2, i) + $a(r, n, s15, t, e2, i);
  let o2;
  if (n === t) return o2 = r > s15 ? "D" : "C", Fi(Math.abs(r - s15), Ni(o2, i));
  o2 = n > t ? "D" : "C";
  let l = Math.abs(n - t), a2 = za(n > t ? s15 : r, e2) + (l - 1) * e2.cols + 1 + Ka(n > t ? r : s15, e2);
  return Fi(a2, Ni(o2, i));
}
function Ka(s15, t) {
  return s15 - 1;
}
function za(s15, t) {
  return t.cols - s15;
}
function Ga(s15, t, e2, i, r, n) {
  return sn(t, i, r, n).length === 0 ? "" : Fi(el(s15, t, s15, t - gt(t, r), false, r).length, Ni("D", n));
}
function sn(s15, t, e2, i) {
  let r = s15 - gt(s15, e2), n = t - gt(t, e2), o2 = Math.abs(r - n) - Va(s15, t, e2);
  return Fi(o2, Ni(Qo(s15, t), i));
}
function $a(s15, t, e2, i, r, n) {
  let o2;
  sn(t, i, r, n).length > 0 ? o2 = i - gt(i, r) : o2 = t;
  let l = i, a2 = qa(s15, t, e2, i, r, n);
  return Fi(el(s15, o2, e2, l, a2 === "C", r).length, Ni(a2, n));
}
function Va(s15, t, e2) {
  let i = 0, r = s15 - gt(s15, e2), n = t - gt(t, e2);
  for (let o2 = 0; o2 < Math.abs(r - n); o2++) {
    let l = Qo(s15, t) === "A" ? -1 : 1;
    e2.buffer.lines.get(r + l * o2)?.isWrapped && i++;
  }
  return i;
}
function gt(s15, t) {
  let e2 = 0, i = t.buffer.lines.get(s15), r = i?.isWrapped;
  for (; r && s15 >= 0 && s15 < t.rows; ) e2++, i = t.buffer.lines.get(--s15), r = i?.isWrapped;
  return e2;
}
function qa(s15, t, e2, i, r, n) {
  let o2;
  return sn(e2, i, r, n).length > 0 ? o2 = i - gt(i, r) : o2 = t, s15 < e2 && o2 <= i || s15 >= e2 && o2 < i ? "C" : "D";
}
function Qo(s15, t) {
  return s15 > t ? "A" : "B";
}
function el(s15, t, e2, i, r, n) {
  let o2 = s15, l = t, a2 = "";
  for (; (o2 !== e2 || l !== i) && l >= 0 && l < n.buffer.lines.length; ) o2 += r ? 1 : -1, r && o2 > n.cols - 1 ? (a2 += n.buffer.translateBufferLineToString(l, false, s15, o2), o2 = 0, s15 = 0, l++) : !r && o2 < 0 && (a2 += n.buffer.translateBufferLineToString(l, false, 0, s15 + 1), o2 = n.cols - 1, s15 = o2, l--);
  return a2 + n.buffer.translateBufferLineToString(l, false, s15, o2);
}
function Ni(s15, t) {
  let e2 = t ? "O" : "[";
  return b2.ESC + e2 + s15;
}
function Fi(s15, t) {
  s15 = Math.floor(s15);
  let e2 = "";
  for (let i = 0; i < s15; i++) e2 += t;
  return e2;
}
var on = class {
  constructor(t) {
    this._bufferService = t;
    this.isSelectAllActive = false;
    this.selectionStartLength = 0;
  }
  clearSelection() {
    this.selectionStart = void 0, this.selectionEnd = void 0, this.isSelectAllActive = false, this.selectionStartLength = 0;
  }
  get finalSelectionStart() {
    return this.isSelectAllActive ? [0, 0] : !this.selectionEnd || !this.selectionStart ? this.selectionStart : this.areSelectionValuesReversed() ? this.selectionEnd : this.selectionStart;
  }
  get finalSelectionEnd() {
    if (this.isSelectAllActive) return [this._bufferService.cols, this._bufferService.buffer.ybase + this._bufferService.rows - 1];
    if (this.selectionStart) {
      if (!this.selectionEnd || this.areSelectionValuesReversed()) {
        let t = this.selectionStart[0] + this.selectionStartLength;
        return t > this._bufferService.cols ? t % this._bufferService.cols === 0 ? [this._bufferService.cols, this.selectionStart[1] + Math.floor(t / this._bufferService.cols) - 1] : [t % this._bufferService.cols, this.selectionStart[1] + Math.floor(t / this._bufferService.cols)] : [t, this.selectionStart[1]];
      }
      if (this.selectionStartLength && this.selectionEnd[1] === this.selectionStart[1]) {
        let t = this.selectionStart[0] + this.selectionStartLength;
        return t > this._bufferService.cols ? [t % this._bufferService.cols, this.selectionStart[1] + Math.floor(t / this._bufferService.cols)] : [Math.max(t, this.selectionEnd[0]), this.selectionEnd[1]];
      }
      return this.selectionEnd;
    }
  }
  areSelectionValuesReversed() {
    let t = this.selectionStart, e2 = this.selectionEnd;
    return !t || !e2 ? false : t[1] > e2[1] || t[1] === e2[1] && t[0] > e2[0];
  }
  handleTrim(t) {
    return this.selectionStart && (this.selectionStart[1] -= t), this.selectionEnd && (this.selectionEnd[1] -= t), this.selectionEnd && this.selectionEnd[1] < 0 ? (this.clearSelection(), true) : (this.selectionStart && this.selectionStart[1] < 0 && (this.selectionStart[1] = 0), false);
  }
};
function ws(s15, t) {
  if (s15.start.y > s15.end.y) throw new Error(`Buffer range end (${s15.end.x}, ${s15.end.y}) cannot be before start (${s15.start.x}, ${s15.start.y})`);
  return t * (s15.end.y - s15.start.y) + (s15.end.x - s15.start.x + 1);
}
var Ds = 50;
var Ya = 15;
var ja = 50;
var Xa = 500;
var Za = "\xA0";
var Ja = new RegExp(Za, "g");
var ei = class extends D {
  constructor(e2, i, r, n, o2, l, a2, u, h2) {
    super();
    this._element = e2;
    this._screenElement = i;
    this._linkifier = r;
    this._bufferService = n;
    this._coreService = o2;
    this._mouseService = l;
    this._optionsService = a2;
    this._renderService = u;
    this._coreBrowserService = h2;
    this._dragScrollAmount = 0;
    this._enabled = true;
    this._workCell = new q();
    this._mouseDownTimeStamp = 0;
    this._oldHasSelection = false;
    this._oldSelectionStart = void 0;
    this._oldSelectionEnd = void 0;
    this._onLinuxMouseSelection = this._register(new v());
    this.onLinuxMouseSelection = this._onLinuxMouseSelection.event;
    this._onRedrawRequest = this._register(new v());
    this.onRequestRedraw = this._onRedrawRequest.event;
    this._onSelectionChange = this._register(new v());
    this.onSelectionChange = this._onSelectionChange.event;
    this._onRequestScrollLines = this._register(new v());
    this.onRequestScrollLines = this._onRequestScrollLines.event;
    this._mouseMoveListener = (c2) => this._handleMouseMove(c2), this._mouseUpListener = (c2) => this._handleMouseUp(c2), this._coreService.onUserInput(() => {
      this.hasSelection && this.clearSelection();
    }), this._trimListener = this._bufferService.buffer.lines.onTrim((c2) => this._handleTrim(c2)), this._register(this._bufferService.buffers.onBufferActivate((c2) => this._handleBufferActivate(c2))), this.enable(), this._model = new on(this._bufferService), this._activeSelectionMode = 0, this._register(C(() => {
      this._removeMouseDownListeners();
    })), this._register(this._bufferService.onResize((c2) => {
      c2.rowsChanged && this.clearSelection();
    }));
  }
  reset() {
    this.clearSelection();
  }
  disable() {
    this.clearSelection(), this._enabled = false;
  }
  enable() {
    this._enabled = true;
  }
  get selectionStart() {
    return this._model.finalSelectionStart;
  }
  get selectionEnd() {
    return this._model.finalSelectionEnd;
  }
  get hasSelection() {
    let e2 = this._model.finalSelectionStart, i = this._model.finalSelectionEnd;
    return !e2 || !i ? false : e2[0] !== i[0] || e2[1] !== i[1];
  }
  get selectionText() {
    let e2 = this._model.finalSelectionStart, i = this._model.finalSelectionEnd;
    if (!e2 || !i) return "";
    let r = this._bufferService.buffer, n = [];
    if (this._activeSelectionMode === 3) {
      if (e2[0] === i[0]) return "";
      let l = e2[0] < i[0] ? e2[0] : i[0], a2 = e2[0] < i[0] ? i[0] : e2[0];
      for (let u = e2[1]; u <= i[1]; u++) {
        let h2 = r.translateBufferLineToString(u, true, l, a2);
        n.push(h2);
      }
    } else {
      let l = e2[1] === i[1] ? i[0] : void 0;
      n.push(r.translateBufferLineToString(e2[1], true, e2[0], l));
      for (let a2 = e2[1] + 1; a2 <= i[1] - 1; a2++) {
        let u = r.lines.get(a2), h2 = r.translateBufferLineToString(a2, true);
        u?.isWrapped ? n[n.length - 1] += h2 : n.push(h2);
      }
      if (e2[1] !== i[1]) {
        let a2 = r.lines.get(i[1]), u = r.translateBufferLineToString(i[1], true, 0, i[0]);
        a2 && a2.isWrapped ? n[n.length - 1] += u : n.push(u);
      }
    }
    return n.map((l) => l.replace(Ja, " ")).join(Es ? `\r
` : `
`);
  }
  clearSelection() {
    this._model.clearSelection(), this._removeMouseDownListeners(), this.refresh(), this._onSelectionChange.fire();
  }
  refresh(e2) {
    this._refreshAnimationFrame || (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._refresh())), Bi && e2 && this.selectionText.length && this._onLinuxMouseSelection.fire(this.selectionText);
  }
  _refresh() {
    this._refreshAnimationFrame = void 0, this._onRedrawRequest.fire({ start: this._model.finalSelectionStart, end: this._model.finalSelectionEnd, columnSelectMode: this._activeSelectionMode === 3 });
  }
  _isClickInSelection(e2) {
    let i = this._getMouseBufferCoords(e2), r = this._model.finalSelectionStart, n = this._model.finalSelectionEnd;
    return !r || !n || !i ? false : this._areCoordsInSelection(i, r, n);
  }
  isCellInSelection(e2, i) {
    let r = this._model.finalSelectionStart, n = this._model.finalSelectionEnd;
    return !r || !n ? false : this._areCoordsInSelection([e2, i], r, n);
  }
  _areCoordsInSelection(e2, i, r) {
    return e2[1] > i[1] && e2[1] < r[1] || i[1] === r[1] && e2[1] === i[1] && e2[0] >= i[0] && e2[0] < r[0] || i[1] < r[1] && e2[1] === r[1] && e2[0] < r[0] || i[1] < r[1] && e2[1] === i[1] && e2[0] >= i[0];
  }
  _selectWordAtCursor(e2, i) {
    let r = this._linkifier.currentLink?.link?.range;
    if (r) return this._model.selectionStart = [r.start.x - 1, r.start.y - 1], this._model.selectionStartLength = ws(r, this._bufferService.cols), this._model.selectionEnd = void 0, true;
    let n = this._getMouseBufferCoords(e2);
    return n ? (this._selectWordAt(n, i), this._model.selectionEnd = void 0, true) : false;
  }
  selectAll() {
    this._model.isSelectAllActive = true, this.refresh(), this._onSelectionChange.fire();
  }
  selectLines(e2, i) {
    this._model.clearSelection(), e2 = Math.max(e2, 0), i = Math.min(i, this._bufferService.buffer.lines.length - 1), this._model.selectionStart = [0, e2], this._model.selectionEnd = [this._bufferService.cols, i], this.refresh(), this._onSelectionChange.fire();
  }
  _handleTrim(e2) {
    this._model.handleTrim(e2) && this.refresh();
  }
  _getMouseBufferCoords(e2) {
    let i = this._mouseService.getCoords(e2, this._screenElement, this._bufferService.cols, this._bufferService.rows, true);
    if (i) return i[0]--, i[1]--, i[1] += this._bufferService.buffer.ydisp, i;
  }
  _getMouseEventScrollAmount(e2) {
    let i = Ci(this._coreBrowserService.window, e2, this._screenElement)[1], r = this._renderService.dimensions.css.canvas.height;
    return i >= 0 && i <= r ? 0 : (i > r && (i -= r), i = Math.min(Math.max(i, -Ds), Ds), i /= Ds, i / Math.abs(i) + Math.round(i * (Ya - 1)));
  }
  shouldForceSelection(e2) {
    return Zt ? e2.altKey && this._optionsService.rawOptions.macOptionClickForcesSelection : e2.shiftKey;
  }
  handleMouseDown(e2) {
    if (this._mouseDownTimeStamp = e2.timeStamp, !(e2.button === 2 && this.hasSelection) && e2.button === 0) {
      if (!this._enabled) {
        if (!this.shouldForceSelection(e2)) return;
        e2.stopPropagation();
      }
      e2.preventDefault(), this._dragScrollAmount = 0, this._enabled && e2.shiftKey ? this._handleIncrementalClick(e2) : e2.detail === 1 ? this._handleSingleClick(e2) : e2.detail === 2 ? this._handleDoubleClick(e2) : e2.detail === 3 && this._handleTripleClick(e2), this._addMouseDownListeners(), this.refresh(true);
    }
  }
  _addMouseDownListeners() {
    this._screenElement.ownerDocument && (this._screenElement.ownerDocument.addEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.addEventListener("mouseup", this._mouseUpListener)), this._dragScrollIntervalTimer = this._coreBrowserService.window.setInterval(() => this._dragScroll(), ja);
  }
  _removeMouseDownListeners() {
    this._screenElement.ownerDocument && (this._screenElement.ownerDocument.removeEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.removeEventListener("mouseup", this._mouseUpListener)), this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer), this._dragScrollIntervalTimer = void 0;
  }
  _handleIncrementalClick(e2) {
    this._model.selectionStart && (this._model.selectionEnd = this._getMouseBufferCoords(e2));
  }
  _handleSingleClick(e2) {
    if (this._model.selectionStartLength = 0, this._model.isSelectAllActive = false, this._activeSelectionMode = this.shouldColumnSelect(e2) ? 3 : 0, this._model.selectionStart = this._getMouseBufferCoords(e2), !this._model.selectionStart) return;
    this._model.selectionEnd = void 0;
    let i = this._bufferService.buffer.lines.get(this._model.selectionStart[1]);
    i && i.length !== this._model.selectionStart[0] && i.hasWidth(this._model.selectionStart[0]) === 0 && this._model.selectionStart[0]++;
  }
  _handleDoubleClick(e2) {
    this._selectWordAtCursor(e2, true) && (this._activeSelectionMode = 1);
  }
  _handleTripleClick(e2) {
    let i = this._getMouseBufferCoords(e2);
    i && (this._activeSelectionMode = 2, this._selectLineAt(i[1]));
  }
  shouldColumnSelect(e2) {
    return e2.altKey && !(Zt && this._optionsService.rawOptions.macOptionClickForcesSelection);
  }
  _handleMouseMove(e2) {
    if (e2.stopImmediatePropagation(), !this._model.selectionStart) return;
    let i = this._model.selectionEnd ? [this._model.selectionEnd[0], this._model.selectionEnd[1]] : null;
    if (this._model.selectionEnd = this._getMouseBufferCoords(e2), !this._model.selectionEnd) {
      this.refresh(true);
      return;
    }
    this._activeSelectionMode === 2 ? this._model.selectionEnd[1] < this._model.selectionStart[1] ? this._model.selectionEnd[0] = 0 : this._model.selectionEnd[0] = this._bufferService.cols : this._activeSelectionMode === 1 && this._selectToWordAt(this._model.selectionEnd), this._dragScrollAmount = this._getMouseEventScrollAmount(e2), this._activeSelectionMode !== 3 && (this._dragScrollAmount > 0 ? this._model.selectionEnd[0] = this._bufferService.cols : this._dragScrollAmount < 0 && (this._model.selectionEnd[0] = 0));
    let r = this._bufferService.buffer;
    if (this._model.selectionEnd[1] < r.lines.length) {
      let n = r.lines.get(this._model.selectionEnd[1]);
      n && n.hasWidth(this._model.selectionEnd[0]) === 0 && this._model.selectionEnd[0] < this._bufferService.cols && this._model.selectionEnd[0]++;
    }
    (!i || i[0] !== this._model.selectionEnd[0] || i[1] !== this._model.selectionEnd[1]) && this.refresh(true);
  }
  _dragScroll() {
    if (!(!this._model.selectionEnd || !this._model.selectionStart) && this._dragScrollAmount) {
      this._onRequestScrollLines.fire({ amount: this._dragScrollAmount, suppressScrollEvent: false });
      let e2 = this._bufferService.buffer;
      this._dragScrollAmount > 0 ? (this._activeSelectionMode !== 3 && (this._model.selectionEnd[0] = this._bufferService.cols), this._model.selectionEnd[1] = Math.min(e2.ydisp + this._bufferService.rows, e2.lines.length - 1)) : (this._activeSelectionMode !== 3 && (this._model.selectionEnd[0] = 0), this._model.selectionEnd[1] = e2.ydisp), this.refresh();
    }
  }
  _handleMouseUp(e2) {
    let i = e2.timeStamp - this._mouseDownTimeStamp;
    if (this._removeMouseDownListeners(), this.selectionText.length <= 1 && i < Xa && e2.altKey && this._optionsService.rawOptions.altClickMovesCursor) {
      if (this._bufferService.buffer.ybase === this._bufferService.buffer.ydisp) {
        let r = this._mouseService.getCoords(e2, this._element, this._bufferService.cols, this._bufferService.rows, false);
        if (r && r[0] !== void 0 && r[1] !== void 0) {
          let n = Jo(r[0] - 1, r[1] - 1, this._bufferService, this._coreService.decPrivateModes.applicationCursorKeys);
          this._coreService.triggerDataEvent(n, true);
        }
      }
    } else this._fireEventIfSelectionChanged();
  }
  _fireEventIfSelectionChanged() {
    let e2 = this._model.finalSelectionStart, i = this._model.finalSelectionEnd, r = !!e2 && !!i && (e2[0] !== i[0] || e2[1] !== i[1]);
    if (!r) {
      this._oldHasSelection && this._fireOnSelectionChange(e2, i, r);
      return;
    }
    !e2 || !i || (!this._oldSelectionStart || !this._oldSelectionEnd || e2[0] !== this._oldSelectionStart[0] || e2[1] !== this._oldSelectionStart[1] || i[0] !== this._oldSelectionEnd[0] || i[1] !== this._oldSelectionEnd[1]) && this._fireOnSelectionChange(e2, i, r);
  }
  _fireOnSelectionChange(e2, i, r) {
    this._oldSelectionStart = e2, this._oldSelectionEnd = i, this._oldHasSelection = r, this._onSelectionChange.fire();
  }
  _handleBufferActivate(e2) {
    this.clearSelection(), this._trimListener.dispose(), this._trimListener = e2.activeBuffer.lines.onTrim((i) => this._handleTrim(i));
  }
  _convertViewportColToCharacterIndex(e2, i) {
    let r = i;
    for (let n = 0; i >= n; n++) {
      let o2 = e2.loadCell(n, this._workCell).getChars().length;
      this._workCell.getWidth() === 0 ? r-- : o2 > 1 && i !== n && (r += o2 - 1);
    }
    return r;
  }
  setSelection(e2, i, r) {
    this._model.clearSelection(), this._removeMouseDownListeners(), this._model.selectionStart = [e2, i], this._model.selectionStartLength = r, this.refresh(), this._fireEventIfSelectionChanged();
  }
  rightClickSelect(e2) {
    this._isClickInSelection(e2) || (this._selectWordAtCursor(e2, false) && this.refresh(true), this._fireEventIfSelectionChanged());
  }
  _getWordAt(e2, i, r = true, n = true) {
    if (e2[0] >= this._bufferService.cols) return;
    let o2 = this._bufferService.buffer, l = o2.lines.get(e2[1]);
    if (!l) return;
    let a2 = o2.translateBufferLineToString(e2[1], false), u = this._convertViewportColToCharacterIndex(l, e2[0]), h2 = u, c2 = e2[0] - u, d2 = 0, _2 = 0, p = 0, m = 0;
    if (a2.charAt(u) === " ") {
      for (; u > 0 && a2.charAt(u - 1) === " "; ) u--;
      for (; h2 < a2.length && a2.charAt(h2 + 1) === " "; ) h2++;
    } else {
      let R = e2[0], O = e2[0];
      l.getWidth(R) === 0 && (d2++, R--), l.getWidth(O) === 2 && (_2++, O++);
      let I = l.getString(O).length;
      for (I > 1 && (m += I - 1, h2 += I - 1); R > 0 && u > 0 && !this._isCharWordSeparator(l.loadCell(R - 1, this._workCell)); ) {
        l.loadCell(R - 1, this._workCell);
        let k = this._workCell.getChars().length;
        this._workCell.getWidth() === 0 ? (d2++, R--) : k > 1 && (p += k - 1, u -= k - 1), u--, R--;
      }
      for (; O < l.length && h2 + 1 < a2.length && !this._isCharWordSeparator(l.loadCell(O + 1, this._workCell)); ) {
        l.loadCell(O + 1, this._workCell);
        let k = this._workCell.getChars().length;
        this._workCell.getWidth() === 2 ? (_2++, O++) : k > 1 && (m += k - 1, h2 += k - 1), h2++, O++;
      }
    }
    h2++;
    let f2 = u + c2 - d2 + p, A = Math.min(this._bufferService.cols, h2 - u + d2 + _2 - p - m);
    if (!(!i && a2.slice(u, h2).trim() === "")) {
      if (r && f2 === 0 && l.getCodePoint(0) !== 32) {
        let R = o2.lines.get(e2[1] - 1);
        if (R && l.isWrapped && R.getCodePoint(this._bufferService.cols - 1) !== 32) {
          let O = this._getWordAt([this._bufferService.cols - 1, e2[1] - 1], false, true, false);
          if (O) {
            let I = this._bufferService.cols - O.start;
            f2 -= I, A += I;
          }
        }
      }
      if (n && f2 + A === this._bufferService.cols && l.getCodePoint(this._bufferService.cols - 1) !== 32) {
        let R = o2.lines.get(e2[1] + 1);
        if (R?.isWrapped && R.getCodePoint(0) !== 32) {
          let O = this._getWordAt([0, e2[1] + 1], false, false, true);
          O && (A += O.length);
        }
      }
      return { start: f2, length: A };
    }
  }
  _selectWordAt(e2, i) {
    let r = this._getWordAt(e2, i);
    if (r) {
      for (; r.start < 0; ) r.start += this._bufferService.cols, e2[1]--;
      this._model.selectionStart = [r.start, e2[1]], this._model.selectionStartLength = r.length;
    }
  }
  _selectToWordAt(e2) {
    let i = this._getWordAt(e2, true);
    if (i) {
      let r = e2[1];
      for (; i.start < 0; ) i.start += this._bufferService.cols, r--;
      if (!this._model.areSelectionValuesReversed()) for (; i.start + i.length > this._bufferService.cols; ) i.length -= this._bufferService.cols, r++;
      this._model.selectionEnd = [this._model.areSelectionValuesReversed() ? i.start : i.start + i.length, r];
    }
  }
  _isCharWordSeparator(e2) {
    return e2.getWidth() === 0 ? false : this._optionsService.rawOptions.wordSeparator.indexOf(e2.getChars()) >= 0;
  }
  _selectLineAt(e2) {
    let i = this._bufferService.buffer.getWrappedRangeForLine(e2), r = { start: { x: 0, y: i.first }, end: { x: this._bufferService.cols - 1, y: i.last } };
    this._model.selectionStart = [0, i.first], this._model.selectionEnd = void 0, this._model.selectionStartLength = ws(r, this._bufferService.cols);
  }
};
ei = M2([S(3, F), S(4, ge), S(5, Dt), S(6, H), S(7, ce), S(8, ae)], ei);
var Hi = class {
  constructor() {
    this._data = {};
  }
  set(t, e2, i) {
    this._data[t] || (this._data[t] = {}), this._data[t][e2] = i;
  }
  get(t, e2) {
    return this._data[t] ? this._data[t][e2] : void 0;
  }
  clear() {
    this._data = {};
  }
};
var Wi = class {
  constructor() {
    this._color = new Hi();
    this._css = new Hi();
  }
  setCss(t, e2, i) {
    this._css.set(t, e2, i);
  }
  getCss(t, e2) {
    return this._css.get(t, e2);
  }
  setColor(t, e2, i) {
    this._color.set(t, e2, i);
  }
  getColor(t, e2) {
    return this._color.get(t, e2);
  }
  clear() {
    this._color.clear(), this._css.clear();
  }
};
var re = Object.freeze((() => {
  let s15 = [z2.toColor("#2e3436"), z2.toColor("#cc0000"), z2.toColor("#4e9a06"), z2.toColor("#c4a000"), z2.toColor("#3465a4"), z2.toColor("#75507b"), z2.toColor("#06989a"), z2.toColor("#d3d7cf"), z2.toColor("#555753"), z2.toColor("#ef2929"), z2.toColor("#8ae234"), z2.toColor("#fce94f"), z2.toColor("#729fcf"), z2.toColor("#ad7fa8"), z2.toColor("#34e2e2"), z2.toColor("#eeeeec")], t = [0, 95, 135, 175, 215, 255];
  for (let e2 = 0; e2 < 216; e2++) {
    let i = t[e2 / 36 % 6 | 0], r = t[e2 / 6 % 6 | 0], n = t[e2 % 6];
    s15.push({ css: j.toCss(i, r, n), rgba: j.toRgba(i, r, n) });
  }
  for (let e2 = 0; e2 < 24; e2++) {
    let i = 8 + e2 * 10;
    s15.push({ css: j.toCss(i, i, i), rgba: j.toRgba(i, i, i) });
  }
  return s15;
})());
var St = z2.toColor("#ffffff");
var Ki = z2.toColor("#000000");
var tl = z2.toColor("#ffffff");
var il = Ki;
var Ui = { css: "rgba(255, 255, 255, 0.3)", rgba: 4294967117 };
var Qa = St;
var ti = class extends D {
  constructor(e2) {
    super();
    this._optionsService = e2;
    this._contrastCache = new Wi();
    this._halfContrastCache = new Wi();
    this._onChangeColors = this._register(new v());
    this.onChangeColors = this._onChangeColors.event;
    this._colors = { foreground: St, background: Ki, cursor: tl, cursorAccent: il, selectionForeground: void 0, selectionBackgroundTransparent: Ui, selectionBackgroundOpaque: U.blend(Ki, Ui), selectionInactiveBackgroundTransparent: Ui, selectionInactiveBackgroundOpaque: U.blend(Ki, Ui), scrollbarSliderBackground: U.opacity(St, 0.2), scrollbarSliderHoverBackground: U.opacity(St, 0.4), scrollbarSliderActiveBackground: U.opacity(St, 0.5), overviewRulerBorder: St, ansi: re.slice(), contrastCache: this._contrastCache, halfContrastCache: this._halfContrastCache }, this._updateRestoreColors(), this._setTheme(this._optionsService.rawOptions.theme), this._register(this._optionsService.onSpecificOptionChange("minimumContrastRatio", () => this._contrastCache.clear())), this._register(this._optionsService.onSpecificOptionChange("theme", () => this._setTheme(this._optionsService.rawOptions.theme)));
  }
  get colors() {
    return this._colors;
  }
  _setTheme(e2 = {}) {
    let i = this._colors;
    if (i.foreground = K(e2.foreground, St), i.background = K(e2.background, Ki), i.cursor = U.blend(i.background, K(e2.cursor, tl)), i.cursorAccent = U.blend(i.background, K(e2.cursorAccent, il)), i.selectionBackgroundTransparent = K(e2.selectionBackground, Ui), i.selectionBackgroundOpaque = U.blend(i.background, i.selectionBackgroundTransparent), i.selectionInactiveBackgroundTransparent = K(e2.selectionInactiveBackground, i.selectionBackgroundTransparent), i.selectionInactiveBackgroundOpaque = U.blend(i.background, i.selectionInactiveBackgroundTransparent), i.selectionForeground = e2.selectionForeground ? K(e2.selectionForeground, ps) : void 0, i.selectionForeground === ps && (i.selectionForeground = void 0), U.isOpaque(i.selectionBackgroundTransparent) && (i.selectionBackgroundTransparent = U.opacity(i.selectionBackgroundTransparent, 0.3)), U.isOpaque(i.selectionInactiveBackgroundTransparent) && (i.selectionInactiveBackgroundTransparent = U.opacity(i.selectionInactiveBackgroundTransparent, 0.3)), i.scrollbarSliderBackground = K(e2.scrollbarSliderBackground, U.opacity(i.foreground, 0.2)), i.scrollbarSliderHoverBackground = K(e2.scrollbarSliderHoverBackground, U.opacity(i.foreground, 0.4)), i.scrollbarSliderActiveBackground = K(e2.scrollbarSliderActiveBackground, U.opacity(i.foreground, 0.5)), i.overviewRulerBorder = K(e2.overviewRulerBorder, Qa), i.ansi = re.slice(), i.ansi[0] = K(e2.black, re[0]), i.ansi[1] = K(e2.red, re[1]), i.ansi[2] = K(e2.green, re[2]), i.ansi[3] = K(e2.yellow, re[3]), i.ansi[4] = K(e2.blue, re[4]), i.ansi[5] = K(e2.magenta, re[5]), i.ansi[6] = K(e2.cyan, re[6]), i.ansi[7] = K(e2.white, re[7]), i.ansi[8] = K(e2.brightBlack, re[8]), i.ansi[9] = K(e2.brightRed, re[9]), i.ansi[10] = K(e2.brightGreen, re[10]), i.ansi[11] = K(e2.brightYellow, re[11]), i.ansi[12] = K(e2.brightBlue, re[12]), i.ansi[13] = K(e2.brightMagenta, re[13]), i.ansi[14] = K(e2.brightCyan, re[14]), i.ansi[15] = K(e2.brightWhite, re[15]), e2.extendedAnsi) {
      let r = Math.min(i.ansi.length - 16, e2.extendedAnsi.length);
      for (let n = 0; n < r; n++) i.ansi[n + 16] = K(e2.extendedAnsi[n], re[n + 16]);
    }
    this._contrastCache.clear(), this._halfContrastCache.clear(), this._updateRestoreColors(), this._onChangeColors.fire(this.colors);
  }
  restoreColor(e2) {
    this._restoreColor(e2), this._onChangeColors.fire(this.colors);
  }
  _restoreColor(e2) {
    if (e2 === void 0) {
      for (let i = 0; i < this._restoreColors.ansi.length; ++i) this._colors.ansi[i] = this._restoreColors.ansi[i];
      return;
    }
    switch (e2) {
      case 256:
        this._colors.foreground = this._restoreColors.foreground;
        break;
      case 257:
        this._colors.background = this._restoreColors.background;
        break;
      case 258:
        this._colors.cursor = this._restoreColors.cursor;
        break;
      default:
        this._colors.ansi[e2] = this._restoreColors.ansi[e2];
    }
  }
  modifyColors(e2) {
    e2(this._colors), this._onChangeColors.fire(this.colors);
  }
  _updateRestoreColors() {
    this._restoreColors = { foreground: this._colors.foreground, background: this._colors.background, cursor: this._colors.cursor, ansi: this._colors.ansi.slice() };
  }
};
ti = M2([S(0, H)], ti);
function K(s15, t) {
  if (s15 !== void 0) try {
    return z2.toColor(s15);
  } catch {
  }
  return t;
}
var Rs = class {
  constructor(...t) {
    this._entries = /* @__PURE__ */ new Map();
    for (let [e2, i] of t) this.set(e2, i);
  }
  set(t, e2) {
    let i = this._entries.get(t);
    return this._entries.set(t, e2), i;
  }
  forEach(t) {
    for (let [e2, i] of this._entries.entries()) t(e2, i);
  }
  has(t) {
    return this._entries.has(t);
  }
  get(t) {
    return this._entries.get(t);
  }
};
var ln = class {
  constructor() {
    this._services = new Rs();
    this._services.set(xt, this);
  }
  setService(t, e2) {
    this._services.set(t, e2);
  }
  getService(t) {
    return this._services.get(t);
  }
  createInstance(t, ...e2) {
    let i = Xs(t).sort((o2, l) => o2.index - l.index), r = [];
    for (let o2 of i) {
      let l = this._services.get(o2.id);
      if (!l) throw new Error(`[createInstance] ${t.name} depends on UNKNOWN service ${o2.id._id}.`);
      r.push(l);
    }
    let n = i.length > 0 ? i[0].index : e2.length;
    if (e2.length !== n) throw new Error(`[createInstance] First service dependency of ${t.name} at position ${n + 1} conflicts with ${e2.length} static arguments`);
    return new t(...e2, ...r);
  }
};
var ec = { trace: 0, debug: 1, info: 2, warn: 3, error: 4, off: 5 };
var tc = "xterm.js: ";
var ii2 = class extends D {
  constructor(e2) {
    super();
    this._optionsService = e2;
    this._logLevel = 5;
    this._updateLogLevel(), this._register(this._optionsService.onSpecificOptionChange("logLevel", () => this._updateLogLevel())), ic = this;
  }
  get logLevel() {
    return this._logLevel;
  }
  _updateLogLevel() {
    this._logLevel = ec[this._optionsService.rawOptions.logLevel];
  }
  _evalLazyOptionalParams(e2) {
    for (let i = 0; i < e2.length; i++) typeof e2[i] == "function" && (e2[i] = e2[i]());
  }
  _log(e2, i, r) {
    this._evalLazyOptionalParams(r), e2.call(console, (this._optionsService.options.logger ? "" : tc) + i, ...r);
  }
  trace(e2, ...i) {
    this._logLevel <= 0 && this._log(this._optionsService.options.logger?.trace.bind(this._optionsService.options.logger) ?? console.log, e2, i);
  }
  debug(e2, ...i) {
    this._logLevel <= 1 && this._log(this._optionsService.options.logger?.debug.bind(this._optionsService.options.logger) ?? console.log, e2, i);
  }
  info(e2, ...i) {
    this._logLevel <= 2 && this._log(this._optionsService.options.logger?.info.bind(this._optionsService.options.logger) ?? console.info, e2, i);
  }
  warn(e2, ...i) {
    this._logLevel <= 3 && this._log(this._optionsService.options.logger?.warn.bind(this._optionsService.options.logger) ?? console.warn, e2, i);
  }
  error(e2, ...i) {
    this._logLevel <= 4 && this._log(this._optionsService.options.logger?.error.bind(this._optionsService.options.logger) ?? console.error, e2, i);
  }
};
ii2 = M2([S(0, H)], ii2);
var ic;
var zi = class extends D {
  constructor(e2) {
    super();
    this._maxLength = e2;
    this.onDeleteEmitter = this._register(new v());
    this.onDelete = this.onDeleteEmitter.event;
    this.onInsertEmitter = this._register(new v());
    this.onInsert = this.onInsertEmitter.event;
    this.onTrimEmitter = this._register(new v());
    this.onTrim = this.onTrimEmitter.event;
    this._array = new Array(this._maxLength), this._startIndex = 0, this._length = 0;
  }
  get maxLength() {
    return this._maxLength;
  }
  set maxLength(e2) {
    if (this._maxLength === e2) return;
    let i = new Array(e2);
    for (let r = 0; r < Math.min(e2, this.length); r++) i[r] = this._array[this._getCyclicIndex(r)];
    this._array = i, this._maxLength = e2, this._startIndex = 0;
  }
  get length() {
    return this._length;
  }
  set length(e2) {
    if (e2 > this._length) for (let i = this._length; i < e2; i++) this._array[i] = void 0;
    this._length = e2;
  }
  get(e2) {
    return this._array[this._getCyclicIndex(e2)];
  }
  set(e2, i) {
    this._array[this._getCyclicIndex(e2)] = i;
  }
  push(e2) {
    this._array[this._getCyclicIndex(this._length)] = e2, this._length === this._maxLength ? (this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1)) : this._length++;
  }
  recycle() {
    if (this._length !== this._maxLength) throw new Error("Can only recycle when the buffer is full");
    return this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1), this._array[this._getCyclicIndex(this._length - 1)];
  }
  get isFull() {
    return this._length === this._maxLength;
  }
  pop() {
    return this._array[this._getCyclicIndex(this._length-- - 1)];
  }
  splice(e2, i, ...r) {
    if (i) {
      for (let n = e2; n < this._length - i; n++) this._array[this._getCyclicIndex(n)] = this._array[this._getCyclicIndex(n + i)];
      this._length -= i, this.onDeleteEmitter.fire({ index: e2, amount: i });
    }
    for (let n = this._length - 1; n >= e2; n--) this._array[this._getCyclicIndex(n + r.length)] = this._array[this._getCyclicIndex(n)];
    for (let n = 0; n < r.length; n++) this._array[this._getCyclicIndex(e2 + n)] = r[n];
    if (r.length && this.onInsertEmitter.fire({ index: e2, amount: r.length }), this._length + r.length > this._maxLength) {
      let n = this._length + r.length - this._maxLength;
      this._startIndex += n, this._length = this._maxLength, this.onTrimEmitter.fire(n);
    } else this._length += r.length;
  }
  trimStart(e2) {
    e2 > this._length && (e2 = this._length), this._startIndex += e2, this._length -= e2, this.onTrimEmitter.fire(e2);
  }
  shiftElements(e2, i, r) {
    if (!(i <= 0)) {
      if (e2 < 0 || e2 >= this._length) throw new Error("start argument out of range");
      if (e2 + r < 0) throw new Error("Cannot shift elements in list beyond index 0");
      if (r > 0) {
        for (let o2 = i - 1; o2 >= 0; o2--) this.set(e2 + o2 + r, this.get(e2 + o2));
        let n = e2 + i + r - this._length;
        if (n > 0) for (this._length += n; this._length > this._maxLength; ) this._length--, this._startIndex++, this.onTrimEmitter.fire(1);
      } else for (let n = 0; n < i; n++) this.set(e2 + n + r, this.get(e2 + n));
    }
  }
  _getCyclicIndex(e2) {
    return (this._startIndex + e2) % this._maxLength;
  }
};
var B = 3;
var X2 = Object.freeze(new De());
var an = 0;
var Ls = 2;
var Ze = class s12 {
  constructor(t, e2, i = false) {
    this.isWrapped = i;
    this._combined = {};
    this._extendedAttrs = {};
    this._data = new Uint32Array(t * B);
    let r = e2 || q.fromCharData([0, ir, 1, 0]);
    for (let n = 0; n < t; ++n) this.setCell(n, r);
    this.length = t;
  }
  get(t) {
    let e2 = this._data[t * B + 0], i = e2 & 2097151;
    return [this._data[t * B + 1], e2 & 2097152 ? this._combined[t] : i ? Ce(i) : "", e2 >> 22, e2 & 2097152 ? this._combined[t].charCodeAt(this._combined[t].length - 1) : i];
  }
  set(t, e2) {
    this._data[t * B + 1] = e2[0], e2[1].length > 1 ? (this._combined[t] = e2[1], this._data[t * B + 0] = t | 2097152 | e2[2] << 22) : this._data[t * B + 0] = e2[1].charCodeAt(0) | e2[2] << 22;
  }
  getWidth(t) {
    return this._data[t * B + 0] >> 22;
  }
  hasWidth(t) {
    return this._data[t * B + 0] & 12582912;
  }
  getFg(t) {
    return this._data[t * B + 1];
  }
  getBg(t) {
    return this._data[t * B + 2];
  }
  hasContent(t) {
    return this._data[t * B + 0] & 4194303;
  }
  getCodePoint(t) {
    let e2 = this._data[t * B + 0];
    return e2 & 2097152 ? this._combined[t].charCodeAt(this._combined[t].length - 1) : e2 & 2097151;
  }
  isCombined(t) {
    return this._data[t * B + 0] & 2097152;
  }
  getString(t) {
    let e2 = this._data[t * B + 0];
    return e2 & 2097152 ? this._combined[t] : e2 & 2097151 ? Ce(e2 & 2097151) : "";
  }
  isProtected(t) {
    return this._data[t * B + 2] & 536870912;
  }
  loadCell(t, e2) {
    return an = t * B, e2.content = this._data[an + 0], e2.fg = this._data[an + 1], e2.bg = this._data[an + 2], e2.content & 2097152 && (e2.combinedData = this._combined[t]), e2.bg & 268435456 && (e2.extended = this._extendedAttrs[t]), e2;
  }
  setCell(t, e2) {
    e2.content & 2097152 && (this._combined[t] = e2.combinedData), e2.bg & 268435456 && (this._extendedAttrs[t] = e2.extended), this._data[t * B + 0] = e2.content, this._data[t * B + 1] = e2.fg, this._data[t * B + 2] = e2.bg;
  }
  setCellFromCodepoint(t, e2, i, r) {
    r.bg & 268435456 && (this._extendedAttrs[t] = r.extended), this._data[t * B + 0] = e2 | i << 22, this._data[t * B + 1] = r.fg, this._data[t * B + 2] = r.bg;
  }
  addCodepointToCell(t, e2, i) {
    let r = this._data[t * B + 0];
    r & 2097152 ? this._combined[t] += Ce(e2) : r & 2097151 ? (this._combined[t] = Ce(r & 2097151) + Ce(e2), r &= -2097152, r |= 2097152) : r = e2 | 1 << 22, i && (r &= -12582913, r |= i << 22), this._data[t * B + 0] = r;
  }
  insertCells(t, e2, i) {
    if (t %= this.length, t && this.getWidth(t - 1) === 2 && this.setCellFromCodepoint(t - 1, 0, 1, i), e2 < this.length - t) {
      let r = new q();
      for (let n = this.length - t - e2 - 1; n >= 0; --n) this.setCell(t + e2 + n, this.loadCell(t + n, r));
      for (let n = 0; n < e2; ++n) this.setCell(t + n, i);
    } else for (let r = t; r < this.length; ++r) this.setCell(r, i);
    this.getWidth(this.length - 1) === 2 && this.setCellFromCodepoint(this.length - 1, 0, 1, i);
  }
  deleteCells(t, e2, i) {
    if (t %= this.length, e2 < this.length - t) {
      let r = new q();
      for (let n = 0; n < this.length - t - e2; ++n) this.setCell(t + n, this.loadCell(t + e2 + n, r));
      for (let n = this.length - e2; n < this.length; ++n) this.setCell(n, i);
    } else for (let r = t; r < this.length; ++r) this.setCell(r, i);
    t && this.getWidth(t - 1) === 2 && this.setCellFromCodepoint(t - 1, 0, 1, i), this.getWidth(t) === 0 && !this.hasContent(t) && this.setCellFromCodepoint(t, 0, 1, i);
  }
  replaceCells(t, e2, i, r = false) {
    if (r) {
      for (t && this.getWidth(t - 1) === 2 && !this.isProtected(t - 1) && this.setCellFromCodepoint(t - 1, 0, 1, i), e2 < this.length && this.getWidth(e2 - 1) === 2 && !this.isProtected(e2) && this.setCellFromCodepoint(e2, 0, 1, i); t < e2 && t < this.length; ) this.isProtected(t) || this.setCell(t, i), t++;
      return;
    }
    for (t && this.getWidth(t - 1) === 2 && this.setCellFromCodepoint(t - 1, 0, 1, i), e2 < this.length && this.getWidth(e2 - 1) === 2 && this.setCellFromCodepoint(e2, 0, 1, i); t < e2 && t < this.length; ) this.setCell(t++, i);
  }
  resize(t, e2) {
    if (t === this.length) return this._data.length * 4 * Ls < this._data.buffer.byteLength;
    let i = t * B;
    if (t > this.length) {
      if (this._data.buffer.byteLength >= i * 4) this._data = new Uint32Array(this._data.buffer, 0, i);
      else {
        let r = new Uint32Array(i);
        r.set(this._data), this._data = r;
      }
      for (let r = this.length; r < t; ++r) this.setCell(r, e2);
    } else {
      this._data = this._data.subarray(0, i);
      let r = Object.keys(this._combined);
      for (let o2 = 0; o2 < r.length; o2++) {
        let l = parseInt(r[o2], 10);
        l >= t && delete this._combined[l];
      }
      let n = Object.keys(this._extendedAttrs);
      for (let o2 = 0; o2 < n.length; o2++) {
        let l = parseInt(n[o2], 10);
        l >= t && delete this._extendedAttrs[l];
      }
    }
    return this.length = t, i * 4 * Ls < this._data.buffer.byteLength;
  }
  cleanupMemory() {
    if (this._data.length * 4 * Ls < this._data.buffer.byteLength) {
      let t = new Uint32Array(this._data.length);
      return t.set(this._data), this._data = t, 1;
    }
    return 0;
  }
  fill(t, e2 = false) {
    if (e2) {
      for (let i = 0; i < this.length; ++i) this.isProtected(i) || this.setCell(i, t);
      return;
    }
    this._combined = {}, this._extendedAttrs = {};
    for (let i = 0; i < this.length; ++i) this.setCell(i, t);
  }
  copyFrom(t) {
    this.length !== t.length ? this._data = new Uint32Array(t._data) : this._data.set(t._data), this.length = t.length, this._combined = {};
    for (let e2 in t._combined) this._combined[e2] = t._combined[e2];
    this._extendedAttrs = {};
    for (let e2 in t._extendedAttrs) this._extendedAttrs[e2] = t._extendedAttrs[e2];
    this.isWrapped = t.isWrapped;
  }
  clone() {
    let t = new s12(0);
    t._data = new Uint32Array(this._data), t.length = this.length;
    for (let e2 in this._combined) t._combined[e2] = this._combined[e2];
    for (let e2 in this._extendedAttrs) t._extendedAttrs[e2] = this._extendedAttrs[e2];
    return t.isWrapped = this.isWrapped, t;
  }
  getTrimmedLength() {
    for (let t = this.length - 1; t >= 0; --t) if (this._data[t * B + 0] & 4194303) return t + (this._data[t * B + 0] >> 22);
    return 0;
  }
  getNoBgTrimmedLength() {
    for (let t = this.length - 1; t >= 0; --t) if (this._data[t * B + 0] & 4194303 || this._data[t * B + 2] & 50331648) return t + (this._data[t * B + 0] >> 22);
    return 0;
  }
  copyCellsFrom(t, e2, i, r, n) {
    let o2 = t._data;
    if (n) for (let a2 = r - 1; a2 >= 0; a2--) {
      for (let u = 0; u < B; u++) this._data[(i + a2) * B + u] = o2[(e2 + a2) * B + u];
      o2[(e2 + a2) * B + 2] & 268435456 && (this._extendedAttrs[i + a2] = t._extendedAttrs[e2 + a2]);
    }
    else for (let a2 = 0; a2 < r; a2++) {
      for (let u = 0; u < B; u++) this._data[(i + a2) * B + u] = o2[(e2 + a2) * B + u];
      o2[(e2 + a2) * B + 2] & 268435456 && (this._extendedAttrs[i + a2] = t._extendedAttrs[e2 + a2]);
    }
    let l = Object.keys(t._combined);
    for (let a2 = 0; a2 < l.length; a2++) {
      let u = parseInt(l[a2], 10);
      u >= e2 && (this._combined[u - e2 + i] = t._combined[u]);
    }
  }
  translateToString(t, e2, i, r) {
    e2 = e2 ?? 0, i = i ?? this.length, t && (i = Math.min(i, this.getTrimmedLength())), r && (r.length = 0);
    let n = "";
    for (; e2 < i; ) {
      let o2 = this._data[e2 * B + 0], l = o2 & 2097151, a2 = o2 & 2097152 ? this._combined[e2] : l ? Ce(l) : we;
      if (n += a2, r) for (let u = 0; u < a2.length; ++u) r.push(e2);
      e2 += o2 >> 22 || 1;
    }
    return r && r.push(e2), n;
  }
};
function sl(s15, t, e2, i, r, n) {
  let o2 = [];
  for (let l = 0; l < s15.length - 1; l++) {
    let a2 = l, u = s15.get(++a2);
    if (!u.isWrapped) continue;
    let h2 = [s15.get(l)];
    for (; a2 < s15.length && u.isWrapped; ) h2.push(u), u = s15.get(++a2);
    if (!n && i >= l && i < a2) {
      l += h2.length - 1;
      continue;
    }
    let c2 = 0, d2 = ri(h2, c2, t), _2 = 1, p = 0;
    for (; _2 < h2.length; ) {
      let f2 = ri(h2, _2, t), A = f2 - p, R = e2 - d2, O = Math.min(A, R);
      h2[c2].copyCellsFrom(h2[_2], p, d2, O, false), d2 += O, d2 === e2 && (c2++, d2 = 0), p += O, p === f2 && (_2++, p = 0), d2 === 0 && c2 !== 0 && h2[c2 - 1].getWidth(e2 - 1) === 2 && (h2[c2].copyCellsFrom(h2[c2 - 1], e2 - 1, d2++, 1, false), h2[c2 - 1].setCell(e2 - 1, r));
    }
    h2[c2].replaceCells(d2, e2, r);
    let m = 0;
    for (let f2 = h2.length - 1; f2 > 0 && (f2 > c2 || h2[f2].getTrimmedLength() === 0); f2--) m++;
    m > 0 && (o2.push(l + h2.length - m), o2.push(m)), l += h2.length - 1;
  }
  return o2;
}
function ol(s15, t) {
  let e2 = [], i = 0, r = t[i], n = 0;
  for (let o2 = 0; o2 < s15.length; o2++) if (r === o2) {
    let l = t[++i];
    s15.onDeleteEmitter.fire({ index: o2 - n, amount: l }), o2 += l - 1, n += l, r = t[++i];
  } else e2.push(o2);
  return { layout: e2, countRemoved: n };
}
function ll(s15, t) {
  let e2 = [];
  for (let i = 0; i < t.length; i++) e2.push(s15.get(t[i]));
  for (let i = 0; i < e2.length; i++) s15.set(i, e2[i]);
  s15.length = t.length;
}
function al(s15, t, e2) {
  let i = [], r = s15.map((a2, u) => ri(s15, u, t)).reduce((a2, u) => a2 + u), n = 0, o2 = 0, l = 0;
  for (; l < r; ) {
    if (r - l < e2) {
      i.push(r - l);
      break;
    }
    n += e2;
    let a2 = ri(s15, o2, t);
    n > a2 && (n -= a2, o2++);
    let u = s15[o2].getWidth(n - 1) === 2;
    u && n--;
    let h2 = u ? e2 - 1 : e2;
    i.push(h2), l += h2;
  }
  return i;
}
function ri(s15, t, e2) {
  if (t === s15.length - 1) return s15[t].getTrimmedLength();
  let i = !s15[t].hasContent(e2 - 1) && s15[t].getWidth(e2 - 1) === 1, r = s15[t + 1].getWidth(0) === 2;
  return i && r ? e2 - 1 : e2;
}
var un = class un2 {
  constructor(t) {
    this.line = t;
    this.isDisposed = false;
    this._disposables = [];
    this._id = un2._nextId++;
    this._onDispose = this.register(new v());
    this.onDispose = this._onDispose.event;
  }
  get id() {
    return this._id;
  }
  dispose() {
    this.isDisposed || (this.isDisposed = true, this.line = -1, this._onDispose.fire(), Ne(this._disposables), this._disposables.length = 0);
  }
  register(t) {
    return this._disposables.push(t), t;
  }
};
un._nextId = 1;
var cn = un;
var ne = {};
var Je = ne.B;
ne[0] = { "`": "\u25C6", a: "\u2592", b: "\u2409", c: "\u240C", d: "\u240D", e: "\u240A", f: "\xB0", g: "\xB1", h: "\u2424", i: "\u240B", j: "\u2518", k: "\u2510", l: "\u250C", m: "\u2514", n: "\u253C", o: "\u23BA", p: "\u23BB", q: "\u2500", r: "\u23BC", s: "\u23BD", t: "\u251C", u: "\u2524", v: "\u2534", w: "\u252C", x: "\u2502", y: "\u2264", z: "\u2265", "{": "\u03C0", "|": "\u2260", "}": "\xA3", "~": "\xB7" };
ne.A = { "#": "\xA3" };
ne.B = void 0;
ne[4] = { "#": "\xA3", "@": "\xBE", "[": "ij", "\\": "\xBD", "]": "|", "{": "\xA8", "|": "f", "}": "\xBC", "~": "\xB4" };
ne.C = ne[5] = { "[": "\xC4", "\\": "\xD6", "]": "\xC5", "^": "\xDC", "`": "\xE9", "{": "\xE4", "|": "\xF6", "}": "\xE5", "~": "\xFC" };
ne.R = { "#": "\xA3", "@": "\xE0", "[": "\xB0", "\\": "\xE7", "]": "\xA7", "{": "\xE9", "|": "\xF9", "}": "\xE8", "~": "\xA8" };
ne.Q = { "@": "\xE0", "[": "\xE2", "\\": "\xE7", "]": "\xEA", "^": "\xEE", "`": "\xF4", "{": "\xE9", "|": "\xF9", "}": "\xE8", "~": "\xFB" };
ne.K = { "@": "\xA7", "[": "\xC4", "\\": "\xD6", "]": "\xDC", "{": "\xE4", "|": "\xF6", "}": "\xFC", "~": "\xDF" };
ne.Y = { "#": "\xA3", "@": "\xA7", "[": "\xB0", "\\": "\xE7", "]": "\xE9", "`": "\xF9", "{": "\xE0", "|": "\xF2", "}": "\xE8", "~": "\xEC" };
ne.E = ne[6] = { "@": "\xC4", "[": "\xC6", "\\": "\xD8", "]": "\xC5", "^": "\xDC", "`": "\xE4", "{": "\xE6", "|": "\xF8", "}": "\xE5", "~": "\xFC" };
ne.Z = { "#": "\xA3", "@": "\xA7", "[": "\xA1", "\\": "\xD1", "]": "\xBF", "{": "\xB0", "|": "\xF1", "}": "\xE7" };
ne.H = ne[7] = { "@": "\xC9", "[": "\xC4", "\\": "\xD6", "]": "\xC5", "^": "\xDC", "`": "\xE9", "{": "\xE4", "|": "\xF6", "}": "\xE5", "~": "\xFC" };
ne["="] = { "#": "\xF9", "@": "\xE0", "[": "\xE9", "\\": "\xE7", "]": "\xEA", "^": "\xEE", _: "\xE8", "`": "\xF4", "{": "\xE4", "|": "\xF6", "}": "\xFC", "~": "\xFB" };
var cl = 4294967295;
var $i = class {
  constructor(t, e2, i) {
    this._hasScrollback = t;
    this._optionsService = e2;
    this._bufferService = i;
    this.ydisp = 0;
    this.ybase = 0;
    this.y = 0;
    this.x = 0;
    this.tabs = {};
    this.savedY = 0;
    this.savedX = 0;
    this.savedCurAttrData = X2.clone();
    this.savedCharset = Je;
    this.markers = [];
    this._nullCell = q.fromCharData([0, ir, 1, 0]);
    this._whitespaceCell = q.fromCharData([0, we, 1, 32]);
    this._isClearing = false;
    this._memoryCleanupQueue = new Jt();
    this._memoryCleanupPosition = 0;
    this._cols = this._bufferService.cols, this._rows = this._bufferService.rows, this.lines = new zi(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
  }
  getNullCell(t) {
    return t ? (this._nullCell.fg = t.fg, this._nullCell.bg = t.bg, this._nullCell.extended = t.extended) : (this._nullCell.fg = 0, this._nullCell.bg = 0, this._nullCell.extended = new rt()), this._nullCell;
  }
  getWhitespaceCell(t) {
    return t ? (this._whitespaceCell.fg = t.fg, this._whitespaceCell.bg = t.bg, this._whitespaceCell.extended = t.extended) : (this._whitespaceCell.fg = 0, this._whitespaceCell.bg = 0, this._whitespaceCell.extended = new rt()), this._whitespaceCell;
  }
  getBlankLine(t, e2) {
    return new Ze(this._bufferService.cols, this.getNullCell(t), e2);
  }
  get hasScrollback() {
    return this._hasScrollback && this.lines.maxLength > this._rows;
  }
  get isCursorInViewport() {
    let e2 = this.ybase + this.y - this.ydisp;
    return e2 >= 0 && e2 < this._rows;
  }
  _getCorrectBufferLength(t) {
    if (!this._hasScrollback) return t;
    let e2 = t + this._optionsService.rawOptions.scrollback;
    return e2 > cl ? cl : e2;
  }
  fillViewportRows(t) {
    if (this.lines.length === 0) {
      t === void 0 && (t = X2);
      let e2 = this._rows;
      for (; e2--; ) this.lines.push(this.getBlankLine(t));
    }
  }
  clear() {
    this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.lines = new zi(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
  }
  resize(t, e2) {
    let i = this.getNullCell(X2), r = 0, n = this._getCorrectBufferLength(e2);
    if (n > this.lines.maxLength && (this.lines.maxLength = n), this.lines.length > 0) {
      if (this._cols < t) for (let l = 0; l < this.lines.length; l++) r += +this.lines.get(l).resize(t, i);
      let o2 = 0;
      if (this._rows < e2) for (let l = this._rows; l < e2; l++) this.lines.length < e2 + this.ybase && (this._optionsService.rawOptions.windowsMode || this._optionsService.rawOptions.windowsPty.backend !== void 0 || this._optionsService.rawOptions.windowsPty.buildNumber !== void 0 ? this.lines.push(new Ze(t, i)) : this.ybase > 0 && this.lines.length <= this.ybase + this.y + o2 + 1 ? (this.ybase--, o2++, this.ydisp > 0 && this.ydisp--) : this.lines.push(new Ze(t, i)));
      else for (let l = this._rows; l > e2; l--) this.lines.length > e2 + this.ybase && (this.lines.length > this.ybase + this.y + 1 ? this.lines.pop() : (this.ybase++, this.ydisp++));
      if (n < this.lines.maxLength) {
        let l = this.lines.length - n;
        l > 0 && (this.lines.trimStart(l), this.ybase = Math.max(this.ybase - l, 0), this.ydisp = Math.max(this.ydisp - l, 0), this.savedY = Math.max(this.savedY - l, 0)), this.lines.maxLength = n;
      }
      this.x = Math.min(this.x, t - 1), this.y = Math.min(this.y, e2 - 1), o2 && (this.y += o2), this.savedX = Math.min(this.savedX, t - 1), this.scrollTop = 0;
    }
    if (this.scrollBottom = e2 - 1, this._isReflowEnabled && (this._reflow(t, e2), this._cols > t)) for (let o2 = 0; o2 < this.lines.length; o2++) r += +this.lines.get(o2).resize(t, i);
    this._cols = t, this._rows = e2, this._memoryCleanupQueue.clear(), r > 0.1 * this.lines.length && (this._memoryCleanupPosition = 0, this._memoryCleanupQueue.enqueue(() => this._batchedMemoryCleanup()));
  }
  _batchedMemoryCleanup() {
    let t = true;
    this._memoryCleanupPosition >= this.lines.length && (this._memoryCleanupPosition = 0, t = false);
    let e2 = 0;
    for (; this._memoryCleanupPosition < this.lines.length; ) if (e2 += this.lines.get(this._memoryCleanupPosition++).cleanupMemory(), e2 > 100) return true;
    return t;
  }
  get _isReflowEnabled() {
    let t = this._optionsService.rawOptions.windowsPty;
    return t && t.buildNumber ? this._hasScrollback && t.backend === "conpty" && t.buildNumber >= 21376 : this._hasScrollback && !this._optionsService.rawOptions.windowsMode;
  }
  _reflow(t, e2) {
    this._cols !== t && (t > this._cols ? this._reflowLarger(t, e2) : this._reflowSmaller(t, e2));
  }
  _reflowLarger(t, e2) {
    let i = this._optionsService.rawOptions.reflowCursorLine, r = sl(this.lines, this._cols, t, this.ybase + this.y, this.getNullCell(X2), i);
    if (r.length > 0) {
      let n = ol(this.lines, r);
      ll(this.lines, n.layout), this._reflowLargerAdjustViewport(t, e2, n.countRemoved);
    }
  }
  _reflowLargerAdjustViewport(t, e2, i) {
    let r = this.getNullCell(X2), n = i;
    for (; n-- > 0; ) this.ybase === 0 ? (this.y > 0 && this.y--, this.lines.length < e2 && this.lines.push(new Ze(t, r))) : (this.ydisp === this.ybase && this.ydisp--, this.ybase--);
    this.savedY = Math.max(this.savedY - i, 0);
  }
  _reflowSmaller(t, e2) {
    let i = this._optionsService.rawOptions.reflowCursorLine, r = this.getNullCell(X2), n = [], o2 = 0;
    for (let l = this.lines.length - 1; l >= 0; l--) {
      let a2 = this.lines.get(l);
      if (!a2 || !a2.isWrapped && a2.getTrimmedLength() <= t) continue;
      let u = [a2];
      for (; a2.isWrapped && l > 0; ) a2 = this.lines.get(--l), u.unshift(a2);
      if (!i) {
        let I = this.ybase + this.y;
        if (I >= l && I < l + u.length) continue;
      }
      let h2 = u[u.length - 1].getTrimmedLength(), c2 = al(u, this._cols, t), d2 = c2.length - u.length, _2;
      this.ybase === 0 && this.y !== this.lines.length - 1 ? _2 = Math.max(0, this.y - this.lines.maxLength + d2) : _2 = Math.max(0, this.lines.length - this.lines.maxLength + d2);
      let p = [];
      for (let I = 0; I < d2; I++) {
        let k = this.getBlankLine(X2, true);
        p.push(k);
      }
      p.length > 0 && (n.push({ start: l + u.length + o2, newLines: p }), o2 += p.length), u.push(...p);
      let m = c2.length - 1, f2 = c2[m];
      f2 === 0 && (m--, f2 = c2[m]);
      let A = u.length - d2 - 1, R = h2;
      for (; A >= 0; ) {
        let I = Math.min(R, f2);
        if (u[m] === void 0) break;
        if (u[m].copyCellsFrom(u[A], R - I, f2 - I, I, true), f2 -= I, f2 === 0 && (m--, f2 = c2[m]), R -= I, R === 0) {
          A--;
          let k = Math.max(A, 0);
          R = ri(u, k, this._cols);
        }
      }
      for (let I = 0; I < u.length; I++) c2[I] < t && u[I].setCell(c2[I], r);
      let O = d2 - _2;
      for (; O-- > 0; ) this.ybase === 0 ? this.y < e2 - 1 ? (this.y++, this.lines.pop()) : (this.ybase++, this.ydisp++) : this.ybase < Math.min(this.lines.maxLength, this.lines.length + o2) - e2 && (this.ybase === this.ydisp && this.ydisp++, this.ybase++);
      this.savedY = Math.min(this.savedY + d2, this.ybase + e2 - 1);
    }
    if (n.length > 0) {
      let l = [], a2 = [];
      for (let f2 = 0; f2 < this.lines.length; f2++) a2.push(this.lines.get(f2));
      let u = this.lines.length, h2 = u - 1, c2 = 0, d2 = n[c2];
      this.lines.length = Math.min(this.lines.maxLength, this.lines.length + o2);
      let _2 = 0;
      for (let f2 = Math.min(this.lines.maxLength - 1, u + o2 - 1); f2 >= 0; f2--) if (d2 && d2.start > h2 + _2) {
        for (let A = d2.newLines.length - 1; A >= 0; A--) this.lines.set(f2--, d2.newLines[A]);
        f2++, l.push({ index: h2 + 1, amount: d2.newLines.length }), _2 += d2.newLines.length, d2 = n[++c2];
      } else this.lines.set(f2, a2[h2--]);
      let p = 0;
      for (let f2 = l.length - 1; f2 >= 0; f2--) l[f2].index += p, this.lines.onInsertEmitter.fire(l[f2]), p += l[f2].amount;
      let m = Math.max(0, u + o2 - this.lines.maxLength);
      m > 0 && this.lines.onTrimEmitter.fire(m);
    }
  }
  translateBufferLineToString(t, e2, i = 0, r) {
    let n = this.lines.get(t);
    return n ? n.translateToString(e2, i, r) : "";
  }
  getWrappedRangeForLine(t) {
    let e2 = t, i = t;
    for (; e2 > 0 && this.lines.get(e2).isWrapped; ) e2--;
    for (; i + 1 < this.lines.length && this.lines.get(i + 1).isWrapped; ) i++;
    return { first: e2, last: i };
  }
  setupTabStops(t) {
    for (t != null ? this.tabs[t] || (t = this.prevStop(t)) : (this.tabs = {}, t = 0); t < this._cols; t += this._optionsService.rawOptions.tabStopWidth) this.tabs[t] = true;
  }
  prevStop(t) {
    for (t == null && (t = this.x); !this.tabs[--t] && t > 0; ) ;
    return t >= this._cols ? this._cols - 1 : t < 0 ? 0 : t;
  }
  nextStop(t) {
    for (t == null && (t = this.x); !this.tabs[++t] && t < this._cols; ) ;
    return t >= this._cols ? this._cols - 1 : t < 0 ? 0 : t;
  }
  clearMarkers(t) {
    this._isClearing = true;
    for (let e2 = 0; e2 < this.markers.length; e2++) this.markers[e2].line === t && (this.markers[e2].dispose(), this.markers.splice(e2--, 1));
    this._isClearing = false;
  }
  clearAllMarkers() {
    this._isClearing = true;
    for (let t = 0; t < this.markers.length; t++) this.markers[t].dispose();
    this.markers.length = 0, this._isClearing = false;
  }
  addMarker(t) {
    let e2 = new cn(t);
    return this.markers.push(e2), e2.register(this.lines.onTrim((i) => {
      e2.line -= i, e2.line < 0 && e2.dispose();
    })), e2.register(this.lines.onInsert((i) => {
      e2.line >= i.index && (e2.line += i.amount);
    })), e2.register(this.lines.onDelete((i) => {
      e2.line >= i.index && e2.line < i.index + i.amount && e2.dispose(), e2.line > i.index && (e2.line -= i.amount);
    })), e2.register(e2.onDispose(() => this._removeMarker(e2))), e2;
  }
  _removeMarker(t) {
    this._isClearing || this.markers.splice(this.markers.indexOf(t), 1);
  }
};
var hn = class extends D {
  constructor(e2, i) {
    super();
    this._optionsService = e2;
    this._bufferService = i;
    this._onBufferActivate = this._register(new v());
    this.onBufferActivate = this._onBufferActivate.event;
    this.reset(), this._register(this._optionsService.onSpecificOptionChange("scrollback", () => this.resize(this._bufferService.cols, this._bufferService.rows))), this._register(this._optionsService.onSpecificOptionChange("tabStopWidth", () => this.setupTabStops()));
  }
  reset() {
    this._normal = new $i(true, this._optionsService, this._bufferService), this._normal.fillViewportRows(), this._alt = new $i(false, this._optionsService, this._bufferService), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }), this.setupTabStops();
  }
  get alt() {
    return this._alt;
  }
  get active() {
    return this._activeBuffer;
  }
  get normal() {
    return this._normal;
  }
  activateNormalBuffer() {
    this._activeBuffer !== this._normal && (this._normal.x = this._alt.x, this._normal.y = this._alt.y, this._alt.clearAllMarkers(), this._alt.clear(), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }));
  }
  activateAltBuffer(e2) {
    this._activeBuffer !== this._alt && (this._alt.fillViewportRows(e2), this._alt.x = this._normal.x, this._alt.y = this._normal.y, this._activeBuffer = this._alt, this._onBufferActivate.fire({ activeBuffer: this._alt, inactiveBuffer: this._normal }));
  }
  resize(e2, i) {
    this._normal.resize(e2, i), this._alt.resize(e2, i), this.setupTabStops(e2);
  }
  setupTabStops(e2) {
    this._normal.setupTabStops(e2), this._alt.setupTabStops(e2);
  }
};
var ks = 2;
var Cs = 1;
var ni = class extends D {
  constructor(e2) {
    super();
    this.isUserScrolling = false;
    this._onResize = this._register(new v());
    this.onResize = this._onResize.event;
    this._onScroll = this._register(new v());
    this.onScroll = this._onScroll.event;
    this.cols = Math.max(e2.rawOptions.cols || 0, ks), this.rows = Math.max(e2.rawOptions.rows || 0, Cs), this.buffers = this._register(new hn(e2, this)), this._register(this.buffers.onBufferActivate((i) => {
      this._onScroll.fire(i.activeBuffer.ydisp);
    }));
  }
  get buffer() {
    return this.buffers.active;
  }
  resize(e2, i) {
    let r = this.cols !== e2, n = this.rows !== i;
    this.cols = e2, this.rows = i, this.buffers.resize(e2, i), this._onResize.fire({ cols: e2, rows: i, colsChanged: r, rowsChanged: n });
  }
  reset() {
    this.buffers.reset(), this.isUserScrolling = false;
  }
  scroll(e2, i = false) {
    let r = this.buffer, n;
    n = this._cachedBlankLine, (!n || n.length !== this.cols || n.getFg(0) !== e2.fg || n.getBg(0) !== e2.bg) && (n = r.getBlankLine(e2, i), this._cachedBlankLine = n), n.isWrapped = i;
    let o2 = r.ybase + r.scrollTop, l = r.ybase + r.scrollBottom;
    if (r.scrollTop === 0) {
      let a2 = r.lines.isFull;
      l === r.lines.length - 1 ? a2 ? r.lines.recycle().copyFrom(n) : r.lines.push(n.clone()) : r.lines.splice(l + 1, 0, n.clone()), a2 ? this.isUserScrolling && (r.ydisp = Math.max(r.ydisp - 1, 0)) : (r.ybase++, this.isUserScrolling || r.ydisp++);
    } else {
      let a2 = l - o2 + 1;
      r.lines.shiftElements(o2 + 1, a2 - 1, -1), r.lines.set(l, n.clone());
    }
    this.isUserScrolling || (r.ydisp = r.ybase), this._onScroll.fire(r.ydisp);
  }
  scrollLines(e2, i) {
    let r = this.buffer;
    if (e2 < 0) {
      if (r.ydisp === 0) return;
      this.isUserScrolling = true;
    } else e2 + r.ydisp >= r.ybase && (this.isUserScrolling = false);
    let n = r.ydisp;
    r.ydisp = Math.max(Math.min(r.ydisp + e2, r.ybase), 0), n !== r.ydisp && (i || this._onScroll.fire(r.ydisp));
  }
};
ni = M2([S(0, H)], ni);
var si = { cols: 80, rows: 24, cursorBlink: false, cursorStyle: "block", cursorWidth: 1, cursorInactiveStyle: "outline", customGlyphs: true, drawBoldTextInBrightColors: true, documentOverride: null, fastScrollModifier: "alt", fastScrollSensitivity: 5, fontFamily: "monospace", fontSize: 15, fontWeight: "normal", fontWeightBold: "bold", ignoreBracketedPasteMode: false, lineHeight: 1, letterSpacing: 0, linkHandler: null, logLevel: "info", logger: null, scrollback: 1e3, scrollOnEraseInDisplay: false, scrollOnUserInput: true, scrollSensitivity: 1, screenReaderMode: false, smoothScrollDuration: 0, macOptionIsMeta: false, macOptionClickForcesSelection: false, minimumContrastRatio: 1, disableStdin: false, allowProposedApi: false, allowTransparency: false, tabStopWidth: 8, theme: {}, reflowCursorLine: false, rescaleOverlappingGlyphs: false, rightClickSelectsWord: Zt, windowOptions: {}, windowsMode: false, windowsPty: {}, wordSeparator: " ()[]{}',\"`", altClickMovesCursor: true, convertEol: false, termName: "xterm", cancelEvents: false, overviewRuler: {} };
var nc = ["normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
var dn = class extends D {
  constructor(e2) {
    super();
    this._onOptionChange = this._register(new v());
    this.onOptionChange = this._onOptionChange.event;
    let i = { ...si };
    for (let r in e2) if (r in i) try {
      let n = e2[r];
      i[r] = this._sanitizeAndValidateOption(r, n);
    } catch (n) {
      console.error(n);
    }
    this.rawOptions = i, this.options = { ...i }, this._setupOptions(), this._register(C(() => {
      this.rawOptions.linkHandler = null, this.rawOptions.documentOverride = null;
    }));
  }
  onSpecificOptionChange(e2, i) {
    return this.onOptionChange((r) => {
      r === e2 && i(this.rawOptions[e2]);
    });
  }
  onMultipleOptionChange(e2, i) {
    return this.onOptionChange((r) => {
      e2.indexOf(r) !== -1 && i();
    });
  }
  _setupOptions() {
    let e2 = (r) => {
      if (!(r in si)) throw new Error(`No option with key "${r}"`);
      return this.rawOptions[r];
    }, i = (r, n) => {
      if (!(r in si)) throw new Error(`No option with key "${r}"`);
      n = this._sanitizeAndValidateOption(r, n), this.rawOptions[r] !== n && (this.rawOptions[r] = n, this._onOptionChange.fire(r));
    };
    for (let r in this.rawOptions) {
      let n = { get: e2.bind(this, r), set: i.bind(this, r) };
      Object.defineProperty(this.options, r, n);
    }
  }
  _sanitizeAndValidateOption(e2, i) {
    switch (e2) {
      case "cursorStyle":
        if (i || (i = si[e2]), !sc(i)) throw new Error(`"${i}" is not a valid value for ${e2}`);
        break;
      case "wordSeparator":
        i || (i = si[e2]);
        break;
      case "fontWeight":
      case "fontWeightBold":
        if (typeof i == "number" && 1 <= i && i <= 1e3) break;
        i = nc.includes(i) ? i : si[e2];
        break;
      case "cursorWidth":
        i = Math.floor(i);
      case "lineHeight":
      case "tabStopWidth":
        if (i < 1) throw new Error(`${e2} cannot be less than 1, value: ${i}`);
        break;
      case "minimumContrastRatio":
        i = Math.max(1, Math.min(21, Math.round(i * 10) / 10));
        break;
      case "scrollback":
        if (i = Math.min(i, 4294967295), i < 0) throw new Error(`${e2} cannot be less than 0, value: ${i}`);
        break;
      case "fastScrollSensitivity":
      case "scrollSensitivity":
        if (i <= 0) throw new Error(`${e2} cannot be less than or equal to 0, value: ${i}`);
        break;
      case "rows":
      case "cols":
        if (!i && i !== 0) throw new Error(`${e2} must be numeric, value: ${i}`);
        break;
      case "windowsPty":
        i = i ?? {};
        break;
    }
    return i;
  }
};
function sc(s15) {
  return s15 === "block" || s15 === "underline" || s15 === "bar";
}
function oi(s15, t = 5) {
  if (typeof s15 != "object") return s15;
  let e2 = Array.isArray(s15) ? [] : {};
  for (let i in s15) e2[i] = t <= 1 ? s15[i] : s15[i] && oi(s15[i], t - 1);
  return e2;
}
var ul = Object.freeze({ insertMode: false });
var hl = Object.freeze({ applicationCursorKeys: false, applicationKeypad: false, bracketedPasteMode: false, cursorBlink: void 0, cursorStyle: void 0, origin: false, reverseWraparound: false, sendFocus: false, synchronizedOutput: false, wraparound: true });
var li = class extends D {
  constructor(e2, i, r) {
    super();
    this._bufferService = e2;
    this._logService = i;
    this._optionsService = r;
    this.isCursorInitialized = false;
    this.isCursorHidden = false;
    this._onData = this._register(new v());
    this.onData = this._onData.event;
    this._onUserInput = this._register(new v());
    this.onUserInput = this._onUserInput.event;
    this._onBinary = this._register(new v());
    this.onBinary = this._onBinary.event;
    this._onRequestScrollToBottom = this._register(new v());
    this.onRequestScrollToBottom = this._onRequestScrollToBottom.event;
    this.modes = oi(ul), this.decPrivateModes = oi(hl);
  }
  reset() {
    this.modes = oi(ul), this.decPrivateModes = oi(hl);
  }
  triggerDataEvent(e2, i = false) {
    if (this._optionsService.rawOptions.disableStdin) return;
    let r = this._bufferService.buffer;
    i && this._optionsService.rawOptions.scrollOnUserInput && r.ybase !== r.ydisp && this._onRequestScrollToBottom.fire(), i && this._onUserInput.fire(), this._logService.debug(`sending data "${e2}"`), this._logService.trace("sending data (codes)", () => e2.split("").map((n) => n.charCodeAt(0))), this._onData.fire(e2);
  }
  triggerBinaryEvent(e2) {
    this._optionsService.rawOptions.disableStdin || (this._logService.debug(`sending binary "${e2}"`), this._logService.trace("sending binary (codes)", () => e2.split("").map((i) => i.charCodeAt(0))), this._onBinary.fire(e2));
  }
};
li = M2([S(0, F), S(1, nr), S(2, H)], li);
var dl = { NONE: { events: 0, restrict: () => false }, X10: { events: 1, restrict: (s15) => s15.button === 4 || s15.action !== 1 ? false : (s15.ctrl = false, s15.alt = false, s15.shift = false, true) }, VT200: { events: 19, restrict: (s15) => s15.action !== 32 }, DRAG: { events: 23, restrict: (s15) => !(s15.action === 32 && s15.button === 3) }, ANY: { events: 31, restrict: (s15) => true } };
function Ms(s15, t) {
  let e2 = (s15.ctrl ? 16 : 0) | (s15.shift ? 4 : 0) | (s15.alt ? 8 : 0);
  return s15.button === 4 ? (e2 |= 64, e2 |= s15.action) : (e2 |= s15.button & 3, s15.button & 4 && (e2 |= 64), s15.button & 8 && (e2 |= 128), s15.action === 32 ? e2 |= 32 : s15.action === 0 && !t && (e2 |= 3)), e2;
}
var Ps = String.fromCharCode;
var fl = { DEFAULT: (s15) => {
  let t = [Ms(s15, false) + 32, s15.col + 32, s15.row + 32];
  return t[0] > 255 || t[1] > 255 || t[2] > 255 ? "" : `\x1B[M${Ps(t[0])}${Ps(t[1])}${Ps(t[2])}`;
}, SGR: (s15) => {
  let t = s15.action === 0 && s15.button !== 4 ? "m" : "M";
  return `\x1B[<${Ms(s15, true)};${s15.col};${s15.row}${t}`;
}, SGR_PIXELS: (s15) => {
  let t = s15.action === 0 && s15.button !== 4 ? "m" : "M";
  return `\x1B[<${Ms(s15, true)};${s15.x};${s15.y}${t}`;
} };
var ai = class extends D {
  constructor(e2, i, r) {
    super();
    this._bufferService = e2;
    this._coreService = i;
    this._optionsService = r;
    this._protocols = {};
    this._encodings = {};
    this._activeProtocol = "";
    this._activeEncoding = "";
    this._lastEvent = null;
    this._wheelPartialScroll = 0;
    this._onProtocolChange = this._register(new v());
    this.onProtocolChange = this._onProtocolChange.event;
    for (let n of Object.keys(dl)) this.addProtocol(n, dl[n]);
    for (let n of Object.keys(fl)) this.addEncoding(n, fl[n]);
    this.reset();
  }
  addProtocol(e2, i) {
    this._protocols[e2] = i;
  }
  addEncoding(e2, i) {
    this._encodings[e2] = i;
  }
  get activeProtocol() {
    return this._activeProtocol;
  }
  get areMouseEventsActive() {
    return this._protocols[this._activeProtocol].events !== 0;
  }
  set activeProtocol(e2) {
    if (!this._protocols[e2]) throw new Error(`unknown protocol "${e2}"`);
    this._activeProtocol = e2, this._onProtocolChange.fire(this._protocols[e2].events);
  }
  get activeEncoding() {
    return this._activeEncoding;
  }
  set activeEncoding(e2) {
    if (!this._encodings[e2]) throw new Error(`unknown encoding "${e2}"`);
    this._activeEncoding = e2;
  }
  reset() {
    this.activeProtocol = "NONE", this.activeEncoding = "DEFAULT", this._lastEvent = null, this._wheelPartialScroll = 0;
  }
  consumeWheelEvent(e2, i, r) {
    if (e2.deltaY === 0 || e2.shiftKey || i === void 0 || r === void 0) return 0;
    let n = i / r, o2 = this._applyScrollModifier(e2.deltaY, e2);
    return e2.deltaMode === WheelEvent.DOM_DELTA_PIXEL ? (o2 /= n + 0, Math.abs(e2.deltaY) < 50 && (o2 *= 0.3), this._wheelPartialScroll += o2, o2 = Math.floor(Math.abs(this._wheelPartialScroll)) * (this._wheelPartialScroll > 0 ? 1 : -1), this._wheelPartialScroll %= 1) : e2.deltaMode === WheelEvent.DOM_DELTA_PAGE && (o2 *= this._bufferService.rows), o2;
  }
  _applyScrollModifier(e2, i) {
    return i.altKey || i.ctrlKey || i.shiftKey ? e2 * this._optionsService.rawOptions.fastScrollSensitivity * this._optionsService.rawOptions.scrollSensitivity : e2 * this._optionsService.rawOptions.scrollSensitivity;
  }
  triggerMouseEvent(e2) {
    if (e2.col < 0 || e2.col >= this._bufferService.cols || e2.row < 0 || e2.row >= this._bufferService.rows || e2.button === 4 && e2.action === 32 || e2.button === 3 && e2.action !== 32 || e2.button !== 4 && (e2.action === 2 || e2.action === 3) || (e2.col++, e2.row++, e2.action === 32 && this._lastEvent && this._equalEvents(this._lastEvent, e2, this._activeEncoding === "SGR_PIXELS")) || !this._protocols[this._activeProtocol].restrict(e2)) return false;
    let i = this._encodings[this._activeEncoding](e2);
    return i && (this._activeEncoding === "DEFAULT" ? this._coreService.triggerBinaryEvent(i) : this._coreService.triggerDataEvent(i, true)), this._lastEvent = e2, true;
  }
  explainEvents(e2) {
    return { down: !!(e2 & 1), up: !!(e2 & 2), drag: !!(e2 & 4), move: !!(e2 & 8), wheel: !!(e2 & 16) };
  }
  _equalEvents(e2, i, r) {
    if (r) {
      if (e2.x !== i.x || e2.y !== i.y) return false;
    } else if (e2.col !== i.col || e2.row !== i.row) return false;
    return !(e2.button !== i.button || e2.action !== i.action || e2.ctrl !== i.ctrl || e2.alt !== i.alt || e2.shift !== i.shift);
  }
};
ai = M2([S(0, F), S(1, ge), S(2, H)], ai);
var Os = [[768, 879], [1155, 1158], [1160, 1161], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1536, 1539], [1552, 1557], [1611, 1630], [1648, 1648], [1750, 1764], [1767, 1768], [1770, 1773], [1807, 1807], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2305, 2306], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2388], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2672, 2673], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765, 2765], [2786, 2787], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2883], [2893, 2893], [2902, 2902], [2946, 2946], [3008, 3008], [3021, 3021], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3393, 3395], [3405, 3405], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3769], [3771, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3984, 3991], [3993, 4028], [4038, 4038], [4141, 4144], [4146, 4146], [4150, 4151], [4153, 4153], [4184, 4185], [4448, 4607], [4959, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6157], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7616, 7626], [7678, 7679], [8203, 8207], [8234, 8238], [8288, 8291], [8298, 8303], [8400, 8431], [12330, 12335], [12441, 12442], [43014, 43014], [43019, 43019], [43045, 43046], [64286, 64286], [65024, 65039], [65056, 65059], [65279, 65279], [65529, 65531]];
var ac = [[68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154], [68159, 68159], [119143, 119145], [119155, 119170], [119173, 119179], [119210, 119213], [119362, 119364], [917505, 917505], [917536, 917631], [917760, 917999]];
var se;
function cc(s15, t) {
  let e2 = 0, i = t.length - 1, r;
  if (s15 < t[0][0] || s15 > t[i][1]) return false;
  for (; i >= e2; ) if (r = e2 + i >> 1, s15 > t[r][1]) e2 = r + 1;
  else if (s15 < t[r][0]) i = r - 1;
  else return true;
  return false;
}
var fn = class {
  constructor() {
    this.version = "6";
    if (!se) {
      se = new Uint8Array(65536), se.fill(1), se[0] = 0, se.fill(0, 1, 32), se.fill(0, 127, 160), se.fill(2, 4352, 4448), se[9001] = 2, se[9002] = 2, se.fill(2, 11904, 42192), se[12351] = 1, se.fill(2, 44032, 55204), se.fill(2, 63744, 64256), se.fill(2, 65040, 65050), se.fill(2, 65072, 65136), se.fill(2, 65280, 65377), se.fill(2, 65504, 65511);
      for (let t = 0; t < Os.length; ++t) se.fill(0, Os[t][0], Os[t][1] + 1);
    }
  }
  wcwidth(t) {
    return t < 32 ? 0 : t < 127 ? 1 : t < 65536 ? se[t] : cc(t, ac) ? 0 : t >= 131072 && t <= 196605 || t >= 196608 && t <= 262141 ? 2 : 1;
  }
  charProperties(t, e2) {
    let i = this.wcwidth(t), r = i === 0 && e2 !== 0;
    if (r) {
      let n = Ae.extractWidth(e2);
      n === 0 ? r = false : n > i && (i = n);
    }
    return Ae.createPropertyValue(0, i, r);
  }
};
var Ae = class s13 {
  constructor() {
    this._providers = /* @__PURE__ */ Object.create(null);
    this._active = "";
    this._onChange = new v();
    this.onChange = this._onChange.event;
    let t = new fn();
    this.register(t), this._active = t.version, this._activeProvider = t;
  }
  static extractShouldJoin(t) {
    return (t & 1) !== 0;
  }
  static extractWidth(t) {
    return t >> 1 & 3;
  }
  static extractCharKind(t) {
    return t >> 3;
  }
  static createPropertyValue(t, e2, i = false) {
    return (t & 16777215) << 3 | (e2 & 3) << 1 | (i ? 1 : 0);
  }
  dispose() {
    this._onChange.dispose();
  }
  get versions() {
    return Object.keys(this._providers);
  }
  get activeVersion() {
    return this._active;
  }
  set activeVersion(t) {
    if (!this._providers[t]) throw new Error(`unknown Unicode version "${t}"`);
    this._active = t, this._activeProvider = this._providers[t], this._onChange.fire(t);
  }
  register(t) {
    this._providers[t.version] = t;
  }
  wcwidth(t) {
    return this._activeProvider.wcwidth(t);
  }
  getStringCellWidth(t) {
    let e2 = 0, i = 0, r = t.length;
    for (let n = 0; n < r; ++n) {
      let o2 = t.charCodeAt(n);
      if (55296 <= o2 && o2 <= 56319) {
        if (++n >= r) return e2 + this.wcwidth(o2);
        let u = t.charCodeAt(n);
        56320 <= u && u <= 57343 ? o2 = (o2 - 55296) * 1024 + u - 56320 + 65536 : e2 += this.wcwidth(u);
      }
      let l = this.charProperties(o2, i), a2 = s13.extractWidth(l);
      s13.extractShouldJoin(l) && (a2 -= s13.extractWidth(i)), e2 += a2, i = l;
    }
    return e2;
  }
  charProperties(t, e2) {
    return this._activeProvider.charProperties(t, e2);
  }
};
var pn = class {
  constructor() {
    this.glevel = 0;
    this._charsets = [];
  }
  reset() {
    this.charset = void 0, this._charsets = [], this.glevel = 0;
  }
  setgLevel(t) {
    this.glevel = t, this.charset = this._charsets[t];
  }
  setgCharset(t, e2) {
    this._charsets[t] = e2, this.glevel === t && (this.charset = e2);
  }
};
function Bs(s15) {
  let e2 = s15.buffer.lines.get(s15.buffer.ybase + s15.buffer.y - 1)?.get(s15.cols - 1), i = s15.buffer.lines.get(s15.buffer.ybase + s15.buffer.y);
  i && e2 && (i.isWrapped = e2[3] !== 0 && e2[3] !== 32);
}
var Vi = 2147483647;
var uc = 256;
var ci = class s14 {
  constructor(t = 32, e2 = 32) {
    this.maxLength = t;
    this.maxSubParamsLength = e2;
    if (e2 > uc) throw new Error("maxSubParamsLength must not be greater than 256");
    this.params = new Int32Array(t), this.length = 0, this._subParams = new Int32Array(e2), this._subParamsLength = 0, this._subParamsIdx = new Uint16Array(t), this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
  }
  static fromArray(t) {
    let e2 = new s14();
    if (!t.length) return e2;
    for (let i = Array.isArray(t[0]) ? 1 : 0; i < t.length; ++i) {
      let r = t[i];
      if (Array.isArray(r)) for (let n = 0; n < r.length; ++n) e2.addSubParam(r[n]);
      else e2.addParam(r);
    }
    return e2;
  }
  clone() {
    let t = new s14(this.maxLength, this.maxSubParamsLength);
    return t.params.set(this.params), t.length = this.length, t._subParams.set(this._subParams), t._subParamsLength = this._subParamsLength, t._subParamsIdx.set(this._subParamsIdx), t._rejectDigits = this._rejectDigits, t._rejectSubDigits = this._rejectSubDigits, t._digitIsSub = this._digitIsSub, t;
  }
  toArray() {
    let t = [];
    for (let e2 = 0; e2 < this.length; ++e2) {
      t.push(this.params[e2]);
      let i = this._subParamsIdx[e2] >> 8, r = this._subParamsIdx[e2] & 255;
      r - i > 0 && t.push(Array.prototype.slice.call(this._subParams, i, r));
    }
    return t;
  }
  reset() {
    this.length = 0, this._subParamsLength = 0, this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
  }
  addParam(t) {
    if (this._digitIsSub = false, this.length >= this.maxLength) {
      this._rejectDigits = true;
      return;
    }
    if (t < -1) throw new Error("values lesser than -1 are not allowed");
    this._subParamsIdx[this.length] = this._subParamsLength << 8 | this._subParamsLength, this.params[this.length++] = t > Vi ? Vi : t;
  }
  addSubParam(t) {
    if (this._digitIsSub = true, !!this.length) {
      if (this._rejectDigits || this._subParamsLength >= this.maxSubParamsLength) {
        this._rejectSubDigits = true;
        return;
      }
      if (t < -1) throw new Error("values lesser than -1 are not allowed");
      this._subParams[this._subParamsLength++] = t > Vi ? Vi : t, this._subParamsIdx[this.length - 1]++;
    }
  }
  hasSubParams(t) {
    return (this._subParamsIdx[t] & 255) - (this._subParamsIdx[t] >> 8) > 0;
  }
  getSubParams(t) {
    let e2 = this._subParamsIdx[t] >> 8, i = this._subParamsIdx[t] & 255;
    return i - e2 > 0 ? this._subParams.subarray(e2, i) : null;
  }
  getSubParamsAll() {
    let t = {};
    for (let e2 = 0; e2 < this.length; ++e2) {
      let i = this._subParamsIdx[e2] >> 8, r = this._subParamsIdx[e2] & 255;
      r - i > 0 && (t[e2] = this._subParams.slice(i, r));
    }
    return t;
  }
  addDigit(t) {
    let e2;
    if (this._rejectDigits || !(e2 = this._digitIsSub ? this._subParamsLength : this.length) || this._digitIsSub && this._rejectSubDigits) return;
    let i = this._digitIsSub ? this._subParams : this.params, r = i[e2 - 1];
    i[e2 - 1] = ~r ? Math.min(r * 10 + t, Vi) : t;
  }
};
var qi = [];
var mn = class {
  constructor() {
    this._state = 0;
    this._active = qi;
    this._id = -1;
    this._handlers = /* @__PURE__ */ Object.create(null);
    this._handlerFb = () => {
    };
    this._stack = { paused: false, loopPosition: 0, fallThrough: false };
  }
  registerHandler(t, e2) {
    this._handlers[t] === void 0 && (this._handlers[t] = []);
    let i = this._handlers[t];
    return i.push(e2), { dispose: () => {
      let r = i.indexOf(e2);
      r !== -1 && i.splice(r, 1);
    } };
  }
  clearHandler(t) {
    this._handlers[t] && delete this._handlers[t];
  }
  setHandlerFallback(t) {
    this._handlerFb = t;
  }
  dispose() {
    this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
    }, this._active = qi;
  }
  reset() {
    if (this._state === 2) for (let t = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; t >= 0; --t) this._active[t].end(false);
    this._stack.paused = false, this._active = qi, this._id = -1, this._state = 0;
  }
  _start() {
    if (this._active = this._handlers[this._id] || qi, !this._active.length) this._handlerFb(this._id, "START");
    else for (let t = this._active.length - 1; t >= 0; t--) this._active[t].start();
  }
  _put(t, e2, i) {
    if (!this._active.length) this._handlerFb(this._id, "PUT", It(t, e2, i));
    else for (let r = this._active.length - 1; r >= 0; r--) this._active[r].put(t, e2, i);
  }
  start() {
    this.reset(), this._state = 1;
  }
  put(t, e2, i) {
    if (this._state !== 3) {
      if (this._state === 1) for (; e2 < i; ) {
        let r = t[e2++];
        if (r === 59) {
          this._state = 2, this._start();
          break;
        }
        if (r < 48 || 57 < r) {
          this._state = 3;
          return;
        }
        this._id === -1 && (this._id = 0), this._id = this._id * 10 + r - 48;
      }
      this._state === 2 && i - e2 > 0 && this._put(t, e2, i);
    }
  }
  end(t, e2 = true) {
    if (this._state !== 0) {
      if (this._state !== 3) if (this._state === 1 && this._start(), !this._active.length) this._handlerFb(this._id, "END", t);
      else {
        let i = false, r = this._active.length - 1, n = false;
        if (this._stack.paused && (r = this._stack.loopPosition - 1, i = e2, n = this._stack.fallThrough, this._stack.paused = false), !n && i === false) {
          for (; r >= 0 && (i = this._active[r].end(t), i !== true); r--) if (i instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r, this._stack.fallThrough = false, i;
          r--;
        }
        for (; r >= 0; r--) if (i = this._active[r].end(false), i instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r, this._stack.fallThrough = true, i;
      }
      this._active = qi, this._id = -1, this._state = 0;
    }
  }
};
var pe = class {
  constructor(t) {
    this._handler = t;
    this._data = "";
    this._hitLimit = false;
  }
  start() {
    this._data = "", this._hitLimit = false;
  }
  put(t, e2, i) {
    this._hitLimit || (this._data += It(t, e2, i), this._data.length > 1e7 && (this._data = "", this._hitLimit = true));
  }
  end(t) {
    let e2 = false;
    if (this._hitLimit) e2 = false;
    else if (t && (e2 = this._handler(this._data), e2 instanceof Promise)) return e2.then((i) => (this._data = "", this._hitLimit = false, i));
    return this._data = "", this._hitLimit = false, e2;
  }
};
var Yi = [];
var _n = class {
  constructor() {
    this._handlers = /* @__PURE__ */ Object.create(null);
    this._active = Yi;
    this._ident = 0;
    this._handlerFb = () => {
    };
    this._stack = { paused: false, loopPosition: 0, fallThrough: false };
  }
  dispose() {
    this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
    }, this._active = Yi;
  }
  registerHandler(t, e2) {
    this._handlers[t] === void 0 && (this._handlers[t] = []);
    let i = this._handlers[t];
    return i.push(e2), { dispose: () => {
      let r = i.indexOf(e2);
      r !== -1 && i.splice(r, 1);
    } };
  }
  clearHandler(t) {
    this._handlers[t] && delete this._handlers[t];
  }
  setHandlerFallback(t) {
    this._handlerFb = t;
  }
  reset() {
    if (this._active.length) for (let t = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; t >= 0; --t) this._active[t].unhook(false);
    this._stack.paused = false, this._active = Yi, this._ident = 0;
  }
  hook(t, e2) {
    if (this.reset(), this._ident = t, this._active = this._handlers[t] || Yi, !this._active.length) this._handlerFb(this._ident, "HOOK", e2);
    else for (let i = this._active.length - 1; i >= 0; i--) this._active[i].hook(e2);
  }
  put(t, e2, i) {
    if (!this._active.length) this._handlerFb(this._ident, "PUT", It(t, e2, i));
    else for (let r = this._active.length - 1; r >= 0; r--) this._active[r].put(t, e2, i);
  }
  unhook(t, e2 = true) {
    if (!this._active.length) this._handlerFb(this._ident, "UNHOOK", t);
    else {
      let i = false, r = this._active.length - 1, n = false;
      if (this._stack.paused && (r = this._stack.loopPosition - 1, i = e2, n = this._stack.fallThrough, this._stack.paused = false), !n && i === false) {
        for (; r >= 0 && (i = this._active[r].unhook(t), i !== true); r--) if (i instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r, this._stack.fallThrough = false, i;
        r--;
      }
      for (; r >= 0; r--) if (i = this._active[r].unhook(false), i instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r, this._stack.fallThrough = true, i;
    }
    this._active = Yi, this._ident = 0;
  }
};
var ji = new ci();
ji.addParam(0);
var Xi = class {
  constructor(t) {
    this._handler = t;
    this._data = "";
    this._params = ji;
    this._hitLimit = false;
  }
  hook(t) {
    this._params = t.length > 1 || t.params[0] ? t.clone() : ji, this._data = "", this._hitLimit = false;
  }
  put(t, e2, i) {
    this._hitLimit || (this._data += It(t, e2, i), this._data.length > 1e7 && (this._data = "", this._hitLimit = true));
  }
  unhook(t) {
    let e2 = false;
    if (this._hitLimit) e2 = false;
    else if (t && (e2 = this._handler(this._data, this._params), e2 instanceof Promise)) return e2.then((i) => (this._params = ji, this._data = "", this._hitLimit = false, i));
    return this._params = ji, this._data = "", this._hitLimit = false, e2;
  }
};
var Fs = class {
  constructor(t) {
    this.table = new Uint8Array(t);
  }
  setDefault(t, e2) {
    this.table.fill(t << 4 | e2);
  }
  add(t, e2, i, r) {
    this.table[e2 << 8 | t] = i << 4 | r;
  }
  addMany(t, e2, i, r) {
    for (let n = 0; n < t.length; n++) this.table[e2 << 8 | t[n]] = i << 4 | r;
  }
};
var ke = 160;
var hc = (function() {
  let s15 = new Fs(4095), e2 = Array.apply(null, Array(256)).map((a2, u) => u), i = (a2, u) => e2.slice(a2, u), r = i(32, 127), n = i(0, 24);
  n.push(25), n.push.apply(n, i(28, 32));
  let o2 = i(0, 14), l;
  s15.setDefault(1, 0), s15.addMany(r, 0, 2, 0);
  for (l in o2) s15.addMany([24, 26, 153, 154], l, 3, 0), s15.addMany(i(128, 144), l, 3, 0), s15.addMany(i(144, 152), l, 3, 0), s15.add(156, l, 0, 0), s15.add(27, l, 11, 1), s15.add(157, l, 4, 8), s15.addMany([152, 158, 159], l, 0, 7), s15.add(155, l, 11, 3), s15.add(144, l, 11, 9);
  return s15.addMany(n, 0, 3, 0), s15.addMany(n, 1, 3, 1), s15.add(127, 1, 0, 1), s15.addMany(n, 8, 0, 8), s15.addMany(n, 3, 3, 3), s15.add(127, 3, 0, 3), s15.addMany(n, 4, 3, 4), s15.add(127, 4, 0, 4), s15.addMany(n, 6, 3, 6), s15.addMany(n, 5, 3, 5), s15.add(127, 5, 0, 5), s15.addMany(n, 2, 3, 2), s15.add(127, 2, 0, 2), s15.add(93, 1, 4, 8), s15.addMany(r, 8, 5, 8), s15.add(127, 8, 5, 8), s15.addMany([156, 27, 24, 26, 7], 8, 6, 0), s15.addMany(i(28, 32), 8, 0, 8), s15.addMany([88, 94, 95], 1, 0, 7), s15.addMany(r, 7, 0, 7), s15.addMany(n, 7, 0, 7), s15.add(156, 7, 0, 0), s15.add(127, 7, 0, 7), s15.add(91, 1, 11, 3), s15.addMany(i(64, 127), 3, 7, 0), s15.addMany(i(48, 60), 3, 8, 4), s15.addMany([60, 61, 62, 63], 3, 9, 4), s15.addMany(i(48, 60), 4, 8, 4), s15.addMany(i(64, 127), 4, 7, 0), s15.addMany([60, 61, 62, 63], 4, 0, 6), s15.addMany(i(32, 64), 6, 0, 6), s15.add(127, 6, 0, 6), s15.addMany(i(64, 127), 6, 0, 0), s15.addMany(i(32, 48), 3, 9, 5), s15.addMany(i(32, 48), 5, 9, 5), s15.addMany(i(48, 64), 5, 0, 6), s15.addMany(i(64, 127), 5, 7, 0), s15.addMany(i(32, 48), 4, 9, 5), s15.addMany(i(32, 48), 1, 9, 2), s15.addMany(i(32, 48), 2, 9, 2), s15.addMany(i(48, 127), 2, 10, 0), s15.addMany(i(48, 80), 1, 10, 0), s15.addMany(i(81, 88), 1, 10, 0), s15.addMany([89, 90, 92], 1, 10, 0), s15.addMany(i(96, 127), 1, 10, 0), s15.add(80, 1, 11, 9), s15.addMany(n, 9, 0, 9), s15.add(127, 9, 0, 9), s15.addMany(i(28, 32), 9, 0, 9), s15.addMany(i(32, 48), 9, 9, 12), s15.addMany(i(48, 60), 9, 8, 10), s15.addMany([60, 61, 62, 63], 9, 9, 10), s15.addMany(n, 11, 0, 11), s15.addMany(i(32, 128), 11, 0, 11), s15.addMany(i(28, 32), 11, 0, 11), s15.addMany(n, 10, 0, 10), s15.add(127, 10, 0, 10), s15.addMany(i(28, 32), 10, 0, 10), s15.addMany(i(48, 60), 10, 8, 10), s15.addMany([60, 61, 62, 63], 10, 0, 11), s15.addMany(i(32, 48), 10, 9, 12), s15.addMany(n, 12, 0, 12), s15.add(127, 12, 0, 12), s15.addMany(i(28, 32), 12, 0, 12), s15.addMany(i(32, 48), 12, 9, 12), s15.addMany(i(48, 64), 12, 0, 11), s15.addMany(i(64, 127), 12, 12, 13), s15.addMany(i(64, 127), 10, 12, 13), s15.addMany(i(64, 127), 9, 12, 13), s15.addMany(n, 13, 13, 13), s15.addMany(r, 13, 13, 13), s15.add(127, 13, 0, 13), s15.addMany([27, 156, 24, 26], 13, 14, 0), s15.add(ke, 0, 2, 0), s15.add(ke, 8, 5, 8), s15.add(ke, 6, 0, 6), s15.add(ke, 11, 0, 11), s15.add(ke, 13, 13, 13), s15;
})();
var bn = class extends D {
  constructor(e2 = hc) {
    super();
    this._transitions = e2;
    this._parseStack = { state: 0, handlers: [], handlerPos: 0, transition: 0, chunkPos: 0 };
    this.initialState = 0, this.currentState = this.initialState, this._params = new ci(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._printHandlerFb = (i, r, n) => {
    }, this._executeHandlerFb = (i) => {
    }, this._csiHandlerFb = (i, r) => {
    }, this._escHandlerFb = (i) => {
    }, this._errorHandlerFb = (i) => i, this._printHandler = this._printHandlerFb, this._executeHandlers = /* @__PURE__ */ Object.create(null), this._csiHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null), this._register(C(() => {
      this._csiHandlers = /* @__PURE__ */ Object.create(null), this._executeHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null);
    })), this._oscParser = this._register(new mn()), this._dcsParser = this._register(new _n()), this._errorHandler = this._errorHandlerFb, this.registerEscHandler({ final: "\\" }, () => true);
  }
  _identifier(e2, i = [64, 126]) {
    let r = 0;
    if (e2.prefix) {
      if (e2.prefix.length > 1) throw new Error("only one byte as prefix supported");
      if (r = e2.prefix.charCodeAt(0), r && 60 > r || r > 63) throw new Error("prefix must be in range 0x3c .. 0x3f");
    }
    if (e2.intermediates) {
      if (e2.intermediates.length > 2) throw new Error("only two bytes as intermediates are supported");
      for (let o2 = 0; o2 < e2.intermediates.length; ++o2) {
        let l = e2.intermediates.charCodeAt(o2);
        if (32 > l || l > 47) throw new Error("intermediate must be in range 0x20 .. 0x2f");
        r <<= 8, r |= l;
      }
    }
    if (e2.final.length !== 1) throw new Error("final must be a single byte");
    let n = e2.final.charCodeAt(0);
    if (i[0] > n || n > i[1]) throw new Error(`final must be in range ${i[0]} .. ${i[1]}`);
    return r <<= 8, r |= n, r;
  }
  identToString(e2) {
    let i = [];
    for (; e2; ) i.push(String.fromCharCode(e2 & 255)), e2 >>= 8;
    return i.reverse().join("");
  }
  setPrintHandler(e2) {
    this._printHandler = e2;
  }
  clearPrintHandler() {
    this._printHandler = this._printHandlerFb;
  }
  registerEscHandler(e2, i) {
    let r = this._identifier(e2, [48, 126]);
    this._escHandlers[r] === void 0 && (this._escHandlers[r] = []);
    let n = this._escHandlers[r];
    return n.push(i), { dispose: () => {
      let o2 = n.indexOf(i);
      o2 !== -1 && n.splice(o2, 1);
    } };
  }
  clearEscHandler(e2) {
    this._escHandlers[this._identifier(e2, [48, 126])] && delete this._escHandlers[this._identifier(e2, [48, 126])];
  }
  setEscHandlerFallback(e2) {
    this._escHandlerFb = e2;
  }
  setExecuteHandler(e2, i) {
    this._executeHandlers[e2.charCodeAt(0)] = i;
  }
  clearExecuteHandler(e2) {
    this._executeHandlers[e2.charCodeAt(0)] && delete this._executeHandlers[e2.charCodeAt(0)];
  }
  setExecuteHandlerFallback(e2) {
    this._executeHandlerFb = e2;
  }
  registerCsiHandler(e2, i) {
    let r = this._identifier(e2);
    this._csiHandlers[r] === void 0 && (this._csiHandlers[r] = []);
    let n = this._csiHandlers[r];
    return n.push(i), { dispose: () => {
      let o2 = n.indexOf(i);
      o2 !== -1 && n.splice(o2, 1);
    } };
  }
  clearCsiHandler(e2) {
    this._csiHandlers[this._identifier(e2)] && delete this._csiHandlers[this._identifier(e2)];
  }
  setCsiHandlerFallback(e2) {
    this._csiHandlerFb = e2;
  }
  registerDcsHandler(e2, i) {
    return this._dcsParser.registerHandler(this._identifier(e2), i);
  }
  clearDcsHandler(e2) {
    this._dcsParser.clearHandler(this._identifier(e2));
  }
  setDcsHandlerFallback(e2) {
    this._dcsParser.setHandlerFallback(e2);
  }
  registerOscHandler(e2, i) {
    return this._oscParser.registerHandler(e2, i);
  }
  clearOscHandler(e2) {
    this._oscParser.clearHandler(e2);
  }
  setOscHandlerFallback(e2) {
    this._oscParser.setHandlerFallback(e2);
  }
  setErrorHandler(e2) {
    this._errorHandler = e2;
  }
  clearErrorHandler() {
    this._errorHandler = this._errorHandlerFb;
  }
  reset() {
    this.currentState = this.initialState, this._oscParser.reset(), this._dcsParser.reset(), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._parseStack.state !== 0 && (this._parseStack.state = 2, this._parseStack.handlers = []);
  }
  _preserveStack(e2, i, r, n, o2) {
    this._parseStack.state = e2, this._parseStack.handlers = i, this._parseStack.handlerPos = r, this._parseStack.transition = n, this._parseStack.chunkPos = o2;
  }
  parse(e2, i, r) {
    let n = 0, o2 = 0, l = 0, a2;
    if (this._parseStack.state) if (this._parseStack.state === 2) this._parseStack.state = 0, l = this._parseStack.chunkPos + 1;
    else {
      if (r === void 0 || this._parseStack.state === 1) throw this._parseStack.state = 1, new Error("improper continuation due to previous async handler, giving up parsing");
      let u = this._parseStack.handlers, h2 = this._parseStack.handlerPos - 1;
      switch (this._parseStack.state) {
        case 3:
          if (r === false && h2 > -1) {
            for (; h2 >= 0 && (a2 = u[h2](this._params), a2 !== true); h2--) if (a2 instanceof Promise) return this._parseStack.handlerPos = h2, a2;
          }
          this._parseStack.handlers = [];
          break;
        case 4:
          if (r === false && h2 > -1) {
            for (; h2 >= 0 && (a2 = u[h2](), a2 !== true); h2--) if (a2 instanceof Promise) return this._parseStack.handlerPos = h2, a2;
          }
          this._parseStack.handlers = [];
          break;
        case 6:
          if (n = e2[this._parseStack.chunkPos], a2 = this._dcsParser.unhook(n !== 24 && n !== 26, r), a2) return a2;
          n === 27 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
          break;
        case 5:
          if (n = e2[this._parseStack.chunkPos], a2 = this._oscParser.end(n !== 24 && n !== 26, r), a2) return a2;
          n === 27 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
          break;
      }
      this._parseStack.state = 0, l = this._parseStack.chunkPos + 1, this.precedingJoinState = 0, this.currentState = this._parseStack.transition & 15;
    }
    for (let u = l; u < i; ++u) {
      switch (n = e2[u], o2 = this._transitions.table[this.currentState << 8 | (n < 160 ? n : ke)], o2 >> 4) {
        case 2:
          for (let m = u + 1; ; ++m) {
            if (m >= i || (n = e2[m]) < 32 || n > 126 && n < ke) {
              this._printHandler(e2, u, m), u = m - 1;
              break;
            }
            if (++m >= i || (n = e2[m]) < 32 || n > 126 && n < ke) {
              this._printHandler(e2, u, m), u = m - 1;
              break;
            }
            if (++m >= i || (n = e2[m]) < 32 || n > 126 && n < ke) {
              this._printHandler(e2, u, m), u = m - 1;
              break;
            }
            if (++m >= i || (n = e2[m]) < 32 || n > 126 && n < ke) {
              this._printHandler(e2, u, m), u = m - 1;
              break;
            }
          }
          break;
        case 3:
          this._executeHandlers[n] ? this._executeHandlers[n]() : this._executeHandlerFb(n), this.precedingJoinState = 0;
          break;
        case 0:
          break;
        case 1:
          if (this._errorHandler({ position: u, code: n, currentState: this.currentState, collect: this._collect, params: this._params, abort: false }).abort) return;
          break;
        case 7:
          let c2 = this._csiHandlers[this._collect << 8 | n], d2 = c2 ? c2.length - 1 : -1;
          for (; d2 >= 0 && (a2 = c2[d2](this._params), a2 !== true); d2--) if (a2 instanceof Promise) return this._preserveStack(3, c2, d2, o2, u), a2;
          d2 < 0 && this._csiHandlerFb(this._collect << 8 | n, this._params), this.precedingJoinState = 0;
          break;
        case 8:
          do
            switch (n) {
              case 59:
                this._params.addParam(0);
                break;
              case 58:
                this._params.addSubParam(-1);
                break;
              default:
                this._params.addDigit(n - 48);
            }
          while (++u < i && (n = e2[u]) > 47 && n < 60);
          u--;
          break;
        case 9:
          this._collect <<= 8, this._collect |= n;
          break;
        case 10:
          let _2 = this._escHandlers[this._collect << 8 | n], p = _2 ? _2.length - 1 : -1;
          for (; p >= 0 && (a2 = _2[p](), a2 !== true); p--) if (a2 instanceof Promise) return this._preserveStack(4, _2, p, o2, u), a2;
          p < 0 && this._escHandlerFb(this._collect << 8 | n), this.precedingJoinState = 0;
          break;
        case 11:
          this._params.reset(), this._params.addParam(0), this._collect = 0;
          break;
        case 12:
          this._dcsParser.hook(this._collect << 8 | n, this._params);
          break;
        case 13:
          for (let m = u + 1; ; ++m) if (m >= i || (n = e2[m]) === 24 || n === 26 || n === 27 || n > 127 && n < ke) {
            this._dcsParser.put(e2, u, m), u = m - 1;
            break;
          }
          break;
        case 14:
          if (a2 = this._dcsParser.unhook(n !== 24 && n !== 26), a2) return this._preserveStack(6, [], 0, o2, u), a2;
          n === 27 && (o2 |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
          break;
        case 4:
          this._oscParser.start();
          break;
        case 5:
          for (let m = u + 1; ; m++) if (m >= i || (n = e2[m]) < 32 || n > 127 && n < ke) {
            this._oscParser.put(e2, u, m), u = m - 1;
            break;
          }
          break;
        case 6:
          if (a2 = this._oscParser.end(n !== 24 && n !== 26), a2) return this._preserveStack(5, [], 0, o2, u), a2;
          n === 27 && (o2 |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
          break;
      }
      this.currentState = o2 & 15;
    }
  }
};
var dc = /^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/;
var fc = /^[\da-f]+$/;
function Ws(s15) {
  if (!s15) return;
  let t = s15.toLowerCase();
  if (t.indexOf("rgb:") === 0) {
    t = t.slice(4);
    let e2 = dc.exec(t);
    if (e2) {
      let i = e2[1] ? 15 : e2[4] ? 255 : e2[7] ? 4095 : 65535;
      return [Math.round(parseInt(e2[1] || e2[4] || e2[7] || e2[10], 16) / i * 255), Math.round(parseInt(e2[2] || e2[5] || e2[8] || e2[11], 16) / i * 255), Math.round(parseInt(e2[3] || e2[6] || e2[9] || e2[12], 16) / i * 255)];
    }
  } else if (t.indexOf("#") === 0 && (t = t.slice(1), fc.exec(t) && [3, 6, 9, 12].includes(t.length))) {
    let e2 = t.length / 3, i = [0, 0, 0];
    for (let r = 0; r < 3; ++r) {
      let n = parseInt(t.slice(e2 * r, e2 * r + e2), 16);
      i[r] = e2 === 1 ? n << 4 : e2 === 2 ? n : e2 === 3 ? n >> 4 : n >> 8;
    }
    return i;
  }
}
function Hs(s15, t) {
  let e2 = s15.toString(16), i = e2.length < 2 ? "0" + e2 : e2;
  switch (t) {
    case 4:
      return e2[0];
    case 8:
      return i;
    case 12:
      return (i + i).slice(0, 3);
    default:
      return i + i;
  }
}
function ml(s15, t = 16) {
  let [e2, i, r] = s15;
  return `rgb:${Hs(e2, t)}/${Hs(i, t)}/${Hs(r, t)}`;
}
var mc = { "(": 0, ")": 1, "*": 2, "+": 3, "-": 1, ".": 2 };
var ut = 131072;
var _l = 10;
function bl(s15, t) {
  if (s15 > 24) return t.setWinLines || false;
  switch (s15) {
    case 1:
      return !!t.restoreWin;
    case 2:
      return !!t.minimizeWin;
    case 3:
      return !!t.setWinPosition;
    case 4:
      return !!t.setWinSizePixels;
    case 5:
      return !!t.raiseWin;
    case 6:
      return !!t.lowerWin;
    case 7:
      return !!t.refreshWin;
    case 8:
      return !!t.setWinSizeChars;
    case 9:
      return !!t.maximizeWin;
    case 10:
      return !!t.fullscreenWin;
    case 11:
      return !!t.getWinState;
    case 13:
      return !!t.getWinPosition;
    case 14:
      return !!t.getWinSizePixels;
    case 15:
      return !!t.getScreenSizePixels;
    case 16:
      return !!t.getCellSizePixels;
    case 18:
      return !!t.getWinSizeChars;
    case 19:
      return !!t.getScreenSizeChars;
    case 20:
      return !!t.getIconTitle;
    case 21:
      return !!t.getWinTitle;
    case 22:
      return !!t.pushTitle;
    case 23:
      return !!t.popTitle;
    case 24:
      return !!t.setWinLines;
  }
  return false;
}
var vl = 5e3;
var gl = 0;
var vn = class extends D {
  constructor(e2, i, r, n, o2, l, a2, u, h2 = new bn()) {
    super();
    this._bufferService = e2;
    this._charsetService = i;
    this._coreService = r;
    this._logService = n;
    this._optionsService = o2;
    this._oscLinkService = l;
    this._coreMouseService = a2;
    this._unicodeService = u;
    this._parser = h2;
    this._parseBuffer = new Uint32Array(4096);
    this._stringDecoder = new er();
    this._utf8Decoder = new tr();
    this._windowTitle = "";
    this._iconName = "";
    this._windowTitleStack = [];
    this._iconNameStack = [];
    this._curAttrData = X2.clone();
    this._eraseAttrDataInternal = X2.clone();
    this._onRequestBell = this._register(new v());
    this.onRequestBell = this._onRequestBell.event;
    this._onRequestRefreshRows = this._register(new v());
    this.onRequestRefreshRows = this._onRequestRefreshRows.event;
    this._onRequestReset = this._register(new v());
    this.onRequestReset = this._onRequestReset.event;
    this._onRequestSendFocus = this._register(new v());
    this.onRequestSendFocus = this._onRequestSendFocus.event;
    this._onRequestSyncScrollBar = this._register(new v());
    this.onRequestSyncScrollBar = this._onRequestSyncScrollBar.event;
    this._onRequestWindowsOptionsReport = this._register(new v());
    this.onRequestWindowsOptionsReport = this._onRequestWindowsOptionsReport.event;
    this._onA11yChar = this._register(new v());
    this.onA11yChar = this._onA11yChar.event;
    this._onA11yTab = this._register(new v());
    this.onA11yTab = this._onA11yTab.event;
    this._onCursorMove = this._register(new v());
    this.onCursorMove = this._onCursorMove.event;
    this._onLineFeed = this._register(new v());
    this.onLineFeed = this._onLineFeed.event;
    this._onScroll = this._register(new v());
    this.onScroll = this._onScroll.event;
    this._onTitleChange = this._register(new v());
    this.onTitleChange = this._onTitleChange.event;
    this._onColor = this._register(new v());
    this.onColor = this._onColor.event;
    this._parseStack = { paused: false, cursorStartX: 0, cursorStartY: 0, decodedLength: 0, position: 0 };
    this._specialColors = [256, 257, 258];
    this._register(this._parser), this._dirtyRowTracker = new Zi(this._bufferService), this._activeBuffer = this._bufferService.buffer, this._register(this._bufferService.buffers.onBufferActivate((c2) => this._activeBuffer = c2.activeBuffer)), this._parser.setCsiHandlerFallback((c2, d2) => {
      this._logService.debug("Unknown CSI code: ", { identifier: this._parser.identToString(c2), params: d2.toArray() });
    }), this._parser.setEscHandlerFallback((c2) => {
      this._logService.debug("Unknown ESC code: ", { identifier: this._parser.identToString(c2) });
    }), this._parser.setExecuteHandlerFallback((c2) => {
      this._logService.debug("Unknown EXECUTE code: ", { code: c2 });
    }), this._parser.setOscHandlerFallback((c2, d2, _2) => {
      this._logService.debug("Unknown OSC code: ", { identifier: c2, action: d2, data: _2 });
    }), this._parser.setDcsHandlerFallback((c2, d2, _2) => {
      d2 === "HOOK" && (_2 = _2.toArray()), this._logService.debug("Unknown DCS code: ", { identifier: this._parser.identToString(c2), action: d2, payload: _2 });
    }), this._parser.setPrintHandler((c2, d2, _2) => this.print(c2, d2, _2)), this._parser.registerCsiHandler({ final: "@" }, (c2) => this.insertChars(c2)), this._parser.registerCsiHandler({ intermediates: " ", final: "@" }, (c2) => this.scrollLeft(c2)), this._parser.registerCsiHandler({ final: "A" }, (c2) => this.cursorUp(c2)), this._parser.registerCsiHandler({ intermediates: " ", final: "A" }, (c2) => this.scrollRight(c2)), this._parser.registerCsiHandler({ final: "B" }, (c2) => this.cursorDown(c2)), this._parser.registerCsiHandler({ final: "C" }, (c2) => this.cursorForward(c2)), this._parser.registerCsiHandler({ final: "D" }, (c2) => this.cursorBackward(c2)), this._parser.registerCsiHandler({ final: "E" }, (c2) => this.cursorNextLine(c2)), this._parser.registerCsiHandler({ final: "F" }, (c2) => this.cursorPrecedingLine(c2)), this._parser.registerCsiHandler({ final: "G" }, (c2) => this.cursorCharAbsolute(c2)), this._parser.registerCsiHandler({ final: "H" }, (c2) => this.cursorPosition(c2)), this._parser.registerCsiHandler({ final: "I" }, (c2) => this.cursorForwardTab(c2)), this._parser.registerCsiHandler({ final: "J" }, (c2) => this.eraseInDisplay(c2, false)), this._parser.registerCsiHandler({ prefix: "?", final: "J" }, (c2) => this.eraseInDisplay(c2, true)), this._parser.registerCsiHandler({ final: "K" }, (c2) => this.eraseInLine(c2, false)), this._parser.registerCsiHandler({ prefix: "?", final: "K" }, (c2) => this.eraseInLine(c2, true)), this._parser.registerCsiHandler({ final: "L" }, (c2) => this.insertLines(c2)), this._parser.registerCsiHandler({ final: "M" }, (c2) => this.deleteLines(c2)), this._parser.registerCsiHandler({ final: "P" }, (c2) => this.deleteChars(c2)), this._parser.registerCsiHandler({ final: "S" }, (c2) => this.scrollUp(c2)), this._parser.registerCsiHandler({ final: "T" }, (c2) => this.scrollDown(c2)), this._parser.registerCsiHandler({ final: "X" }, (c2) => this.eraseChars(c2)), this._parser.registerCsiHandler({ final: "Z" }, (c2) => this.cursorBackwardTab(c2)), this._parser.registerCsiHandler({ final: "`" }, (c2) => this.charPosAbsolute(c2)), this._parser.registerCsiHandler({ final: "a" }, (c2) => this.hPositionRelative(c2)), this._parser.registerCsiHandler({ final: "b" }, (c2) => this.repeatPrecedingCharacter(c2)), this._parser.registerCsiHandler({ final: "c" }, (c2) => this.sendDeviceAttributesPrimary(c2)), this._parser.registerCsiHandler({ prefix: ">", final: "c" }, (c2) => this.sendDeviceAttributesSecondary(c2)), this._parser.registerCsiHandler({ final: "d" }, (c2) => this.linePosAbsolute(c2)), this._parser.registerCsiHandler({ final: "e" }, (c2) => this.vPositionRelative(c2)), this._parser.registerCsiHandler({ final: "f" }, (c2) => this.hVPosition(c2)), this._parser.registerCsiHandler({ final: "g" }, (c2) => this.tabClear(c2)), this._parser.registerCsiHandler({ final: "h" }, (c2) => this.setMode(c2)), this._parser.registerCsiHandler({ prefix: "?", final: "h" }, (c2) => this.setModePrivate(c2)), this._parser.registerCsiHandler({ final: "l" }, (c2) => this.resetMode(c2)), this._parser.registerCsiHandler({ prefix: "?", final: "l" }, (c2) => this.resetModePrivate(c2)), this._parser.registerCsiHandler({ final: "m" }, (c2) => this.charAttributes(c2)), this._parser.registerCsiHandler({ final: "n" }, (c2) => this.deviceStatus(c2)), this._parser.registerCsiHandler({ prefix: "?", final: "n" }, (c2) => this.deviceStatusPrivate(c2)), this._parser.registerCsiHandler({ intermediates: "!", final: "p" }, (c2) => this.softReset(c2)), this._parser.registerCsiHandler({ intermediates: " ", final: "q" }, (c2) => this.setCursorStyle(c2)), this._parser.registerCsiHandler({ final: "r" }, (c2) => this.setScrollRegion(c2)), this._parser.registerCsiHandler({ final: "s" }, (c2) => this.saveCursor(c2)), this._parser.registerCsiHandler({ final: "t" }, (c2) => this.windowOptions(c2)), this._parser.registerCsiHandler({ final: "u" }, (c2) => this.restoreCursor(c2)), this._parser.registerCsiHandler({ intermediates: "'", final: "}" }, (c2) => this.insertColumns(c2)), this._parser.registerCsiHandler({ intermediates: "'", final: "~" }, (c2) => this.deleteColumns(c2)), this._parser.registerCsiHandler({ intermediates: '"', final: "q" }, (c2) => this.selectProtected(c2)), this._parser.registerCsiHandler({ intermediates: "$", final: "p" }, (c2) => this.requestMode(c2, true)), this._parser.registerCsiHandler({ prefix: "?", intermediates: "$", final: "p" }, (c2) => this.requestMode(c2, false)), this._parser.setExecuteHandler(b2.BEL, () => this.bell()), this._parser.setExecuteHandler(b2.LF, () => this.lineFeed()), this._parser.setExecuteHandler(b2.VT, () => this.lineFeed()), this._parser.setExecuteHandler(b2.FF, () => this.lineFeed()), this._parser.setExecuteHandler(b2.CR, () => this.carriageReturn()), this._parser.setExecuteHandler(b2.BS, () => this.backspace()), this._parser.setExecuteHandler(b2.HT, () => this.tab()), this._parser.setExecuteHandler(b2.SO, () => this.shiftOut()), this._parser.setExecuteHandler(b2.SI, () => this.shiftIn()), this._parser.setExecuteHandler(Ai.IND, () => this.index()), this._parser.setExecuteHandler(Ai.NEL, () => this.nextLine()), this._parser.setExecuteHandler(Ai.HTS, () => this.tabSet()), this._parser.registerOscHandler(0, new pe((c2) => (this.setTitle(c2), this.setIconName(c2), true))), this._parser.registerOscHandler(1, new pe((c2) => this.setIconName(c2))), this._parser.registerOscHandler(2, new pe((c2) => this.setTitle(c2))), this._parser.registerOscHandler(4, new pe((c2) => this.setOrReportIndexedColor(c2))), this._parser.registerOscHandler(8, new pe((c2) => this.setHyperlink(c2))), this._parser.registerOscHandler(10, new pe((c2) => this.setOrReportFgColor(c2))), this._parser.registerOscHandler(11, new pe((c2) => this.setOrReportBgColor(c2))), this._parser.registerOscHandler(12, new pe((c2) => this.setOrReportCursorColor(c2))), this._parser.registerOscHandler(104, new pe((c2) => this.restoreIndexedColor(c2))), this._parser.registerOscHandler(110, new pe((c2) => this.restoreFgColor(c2))), this._parser.registerOscHandler(111, new pe((c2) => this.restoreBgColor(c2))), this._parser.registerOscHandler(112, new pe((c2) => this.restoreCursorColor(c2))), this._parser.registerEscHandler({ final: "7" }, () => this.saveCursor()), this._parser.registerEscHandler({ final: "8" }, () => this.restoreCursor()), this._parser.registerEscHandler({ final: "D" }, () => this.index()), this._parser.registerEscHandler({ final: "E" }, () => this.nextLine()), this._parser.registerEscHandler({ final: "H" }, () => this.tabSet()), this._parser.registerEscHandler({ final: "M" }, () => this.reverseIndex()), this._parser.registerEscHandler({ final: "=" }, () => this.keypadApplicationMode()), this._parser.registerEscHandler({ final: ">" }, () => this.keypadNumericMode()), this._parser.registerEscHandler({ final: "c" }, () => this.fullReset()), this._parser.registerEscHandler({ final: "n" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "o" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "|" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "}" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "~" }, () => this.setgLevel(1)), this._parser.registerEscHandler({ intermediates: "%", final: "@" }, () => this.selectDefaultCharset()), this._parser.registerEscHandler({ intermediates: "%", final: "G" }, () => this.selectDefaultCharset());
    for (let c2 in ne) this._parser.registerEscHandler({ intermediates: "(", final: c2 }, () => this.selectCharset("(" + c2)), this._parser.registerEscHandler({ intermediates: ")", final: c2 }, () => this.selectCharset(")" + c2)), this._parser.registerEscHandler({ intermediates: "*", final: c2 }, () => this.selectCharset("*" + c2)), this._parser.registerEscHandler({ intermediates: "+", final: c2 }, () => this.selectCharset("+" + c2)), this._parser.registerEscHandler({ intermediates: "-", final: c2 }, () => this.selectCharset("-" + c2)), this._parser.registerEscHandler({ intermediates: ".", final: c2 }, () => this.selectCharset("." + c2)), this._parser.registerEscHandler({ intermediates: "/", final: c2 }, () => this.selectCharset("/" + c2));
    this._parser.registerEscHandler({ intermediates: "#", final: "8" }, () => this.screenAlignmentPattern()), this._parser.setErrorHandler((c2) => (this._logService.error("Parsing error: ", c2), c2)), this._parser.registerDcsHandler({ intermediates: "$", final: "q" }, new Xi((c2, d2) => this.requestStatusString(c2, d2)));
  }
  getAttrData() {
    return this._curAttrData;
  }
  _preserveStack(e2, i, r, n) {
    this._parseStack.paused = true, this._parseStack.cursorStartX = e2, this._parseStack.cursorStartY = i, this._parseStack.decodedLength = r, this._parseStack.position = n;
  }
  _logSlowResolvingAsync(e2) {
    this._logService.logLevel <= 3 && Promise.race([e2, new Promise((i, r) => setTimeout(() => r("#SLOW_TIMEOUT"), vl))]).catch((i) => {
      if (i !== "#SLOW_TIMEOUT") throw i;
      console.warn(`async parser handler taking longer than ${vl} ms`);
    });
  }
  _getCurrentLinkId() {
    return this._curAttrData.extended.urlId;
  }
  parse(e2, i) {
    let r, n = this._activeBuffer.x, o2 = this._activeBuffer.y, l = 0, a2 = this._parseStack.paused;
    if (a2) {
      if (r = this._parser.parse(this._parseBuffer, this._parseStack.decodedLength, i)) return this._logSlowResolvingAsync(r), r;
      n = this._parseStack.cursorStartX, o2 = this._parseStack.cursorStartY, this._parseStack.paused = false, e2.length > ut && (l = this._parseStack.position + ut);
    }
    if (this._logService.logLevel <= 1 && this._logService.debug(`parsing data ${typeof e2 == "string" ? ` "${e2}"` : ` "${Array.prototype.map.call(e2, (c2) => String.fromCharCode(c2)).join("")}"`}`), this._logService.logLevel === 0 && this._logService.trace("parsing data (codes)", typeof e2 == "string" ? e2.split("").map((c2) => c2.charCodeAt(0)) : e2), this._parseBuffer.length < e2.length && this._parseBuffer.length < ut && (this._parseBuffer = new Uint32Array(Math.min(e2.length, ut))), a2 || this._dirtyRowTracker.clearRange(), e2.length > ut) for (let c2 = l; c2 < e2.length; c2 += ut) {
      let d2 = c2 + ut < e2.length ? c2 + ut : e2.length, _2 = typeof e2 == "string" ? this._stringDecoder.decode(e2.substring(c2, d2), this._parseBuffer) : this._utf8Decoder.decode(e2.subarray(c2, d2), this._parseBuffer);
      if (r = this._parser.parse(this._parseBuffer, _2)) return this._preserveStack(n, o2, _2, c2), this._logSlowResolvingAsync(r), r;
    }
    else if (!a2) {
      let c2 = typeof e2 == "string" ? this._stringDecoder.decode(e2, this._parseBuffer) : this._utf8Decoder.decode(e2, this._parseBuffer);
      if (r = this._parser.parse(this._parseBuffer, c2)) return this._preserveStack(n, o2, c2, 0), this._logSlowResolvingAsync(r), r;
    }
    (this._activeBuffer.x !== n || this._activeBuffer.y !== o2) && this._onCursorMove.fire();
    let u = this._dirtyRowTracker.end + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp), h2 = this._dirtyRowTracker.start + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
    h2 < this._bufferService.rows && this._onRequestRefreshRows.fire({ start: Math.min(h2, this._bufferService.rows - 1), end: Math.min(u, this._bufferService.rows - 1) });
  }
  print(e2, i, r) {
    let n, o2, l = this._charsetService.charset, a2 = this._optionsService.rawOptions.screenReaderMode, u = this._bufferService.cols, h2 = this._coreService.decPrivateModes.wraparound, c2 = this._coreService.modes.insertMode, d2 = this._curAttrData, _2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._activeBuffer.x && r - i > 0 && _2.getWidth(this._activeBuffer.x - 1) === 2 && _2.setCellFromCodepoint(this._activeBuffer.x - 1, 0, 1, d2);
    let p = this._parser.precedingJoinState;
    for (let m = i; m < r; ++m) {
      if (n = e2[m], n < 127 && l) {
        let O = l[String.fromCharCode(n)];
        O && (n = O.charCodeAt(0));
      }
      let f2 = this._unicodeService.charProperties(n, p);
      o2 = Ae.extractWidth(f2);
      let A = Ae.extractShouldJoin(f2), R = A ? Ae.extractWidth(p) : 0;
      if (p = f2, a2 && this._onA11yChar.fire(Ce(n)), this._getCurrentLinkId() && this._oscLinkService.addLineToLink(this._getCurrentLinkId(), this._activeBuffer.ybase + this._activeBuffer.y), this._activeBuffer.x + o2 - R > u) {
        if (h2) {
          let O = _2, I = this._activeBuffer.x - R;
          for (this._activeBuffer.x = R, this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData(), true)) : (this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = true), _2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y), R > 0 && _2 instanceof Ze && _2.copyCellsFrom(O, I, 0, R, false); I < u; ) O.setCellFromCodepoint(I++, 0, 1, d2);
        } else if (this._activeBuffer.x = u - 1, o2 === 2) continue;
      }
      if (A && this._activeBuffer.x) {
        let O = _2.getWidth(this._activeBuffer.x - 1) ? 1 : 2;
        _2.addCodepointToCell(this._activeBuffer.x - O, n, o2);
        for (let I = o2 - R; --I >= 0; ) _2.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, d2);
        continue;
      }
      if (c2 && (_2.insertCells(this._activeBuffer.x, o2 - R, this._activeBuffer.getNullCell(d2)), _2.getWidth(u - 1) === 2 && _2.setCellFromCodepoint(u - 1, 0, 1, d2)), _2.setCellFromCodepoint(this._activeBuffer.x++, n, o2, d2), o2 > 0) for (; --o2; ) _2.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, d2);
    }
    this._parser.precedingJoinState = p, this._activeBuffer.x < u && r - i > 0 && _2.getWidth(this._activeBuffer.x) === 0 && !_2.hasContent(this._activeBuffer.x) && _2.setCellFromCodepoint(this._activeBuffer.x, 0, 1, d2), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
  }
  registerCsiHandler(e2, i) {
    return e2.final === "t" && !e2.prefix && !e2.intermediates ? this._parser.registerCsiHandler(e2, (r) => bl(r.params[0], this._optionsService.rawOptions.windowOptions) ? i(r) : true) : this._parser.registerCsiHandler(e2, i);
  }
  registerDcsHandler(e2, i) {
    return this._parser.registerDcsHandler(e2, new Xi(i));
  }
  registerEscHandler(e2, i) {
    return this._parser.registerEscHandler(e2, i);
  }
  registerOscHandler(e2, i) {
    return this._parser.registerOscHandler(e2, new pe(i));
  }
  bell() {
    return this._onRequestBell.fire(), true;
  }
  lineFeed() {
    return this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._optionsService.rawOptions.convertEol && (this._activeBuffer.x = 0), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows ? this._activeBuffer.y = this._bufferService.rows - 1 : this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false, this._activeBuffer.x >= this._bufferService.cols && this._activeBuffer.x--, this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._onLineFeed.fire(), true;
  }
  carriageReturn() {
    return this._activeBuffer.x = 0, true;
  }
  backspace() {
    if (!this._coreService.decPrivateModes.reverseWraparound) return this._restrictCursor(), this._activeBuffer.x > 0 && this._activeBuffer.x--, true;
    if (this._restrictCursor(this._bufferService.cols), this._activeBuffer.x > 0) this._activeBuffer.x--;
    else if (this._activeBuffer.x === 0 && this._activeBuffer.y > this._activeBuffer.scrollTop && this._activeBuffer.y <= this._activeBuffer.scrollBottom && this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y)?.isWrapped) {
      this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false, this._activeBuffer.y--, this._activeBuffer.x = this._bufferService.cols - 1;
      let e2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
      e2.hasWidth(this._activeBuffer.x) && !e2.hasContent(this._activeBuffer.x) && this._activeBuffer.x--;
    }
    return this._restrictCursor(), true;
  }
  tab() {
    if (this._activeBuffer.x >= this._bufferService.cols) return true;
    let e2 = this._activeBuffer.x;
    return this._activeBuffer.x = this._activeBuffer.nextStop(), this._optionsService.rawOptions.screenReaderMode && this._onA11yTab.fire(this._activeBuffer.x - e2), true;
  }
  shiftOut() {
    return this._charsetService.setgLevel(1), true;
  }
  shiftIn() {
    return this._charsetService.setgLevel(0), true;
  }
  _restrictCursor(e2 = this._bufferService.cols - 1) {
    this._activeBuffer.x = Math.min(e2, Math.max(0, this._activeBuffer.x)), this._activeBuffer.y = this._coreService.decPrivateModes.origin ? Math.min(this._activeBuffer.scrollBottom, Math.max(this._activeBuffer.scrollTop, this._activeBuffer.y)) : Math.min(this._bufferService.rows - 1, Math.max(0, this._activeBuffer.y)), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
  }
  _setCursor(e2, i) {
    this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._coreService.decPrivateModes.origin ? (this._activeBuffer.x = e2, this._activeBuffer.y = this._activeBuffer.scrollTop + i) : (this._activeBuffer.x = e2, this._activeBuffer.y = i), this._restrictCursor(), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
  }
  _moveCursor(e2, i) {
    this._restrictCursor(), this._setCursor(this._activeBuffer.x + e2, this._activeBuffer.y + i);
  }
  cursorUp(e2) {
    let i = this._activeBuffer.y - this._activeBuffer.scrollTop;
    return i >= 0 ? this._moveCursor(0, -Math.min(i, e2.params[0] || 1)) : this._moveCursor(0, -(e2.params[0] || 1)), true;
  }
  cursorDown(e2) {
    let i = this._activeBuffer.scrollBottom - this._activeBuffer.y;
    return i >= 0 ? this._moveCursor(0, Math.min(i, e2.params[0] || 1)) : this._moveCursor(0, e2.params[0] || 1), true;
  }
  cursorForward(e2) {
    return this._moveCursor(e2.params[0] || 1, 0), true;
  }
  cursorBackward(e2) {
    return this._moveCursor(-(e2.params[0] || 1), 0), true;
  }
  cursorNextLine(e2) {
    return this.cursorDown(e2), this._activeBuffer.x = 0, true;
  }
  cursorPrecedingLine(e2) {
    return this.cursorUp(e2), this._activeBuffer.x = 0, true;
  }
  cursorCharAbsolute(e2) {
    return this._setCursor((e2.params[0] || 1) - 1, this._activeBuffer.y), true;
  }
  cursorPosition(e2) {
    return this._setCursor(e2.length >= 2 ? (e2.params[1] || 1) - 1 : 0, (e2.params[0] || 1) - 1), true;
  }
  charPosAbsolute(e2) {
    return this._setCursor((e2.params[0] || 1) - 1, this._activeBuffer.y), true;
  }
  hPositionRelative(e2) {
    return this._moveCursor(e2.params[0] || 1, 0), true;
  }
  linePosAbsolute(e2) {
    return this._setCursor(this._activeBuffer.x, (e2.params[0] || 1) - 1), true;
  }
  vPositionRelative(e2) {
    return this._moveCursor(0, e2.params[0] || 1), true;
  }
  hVPosition(e2) {
    return this.cursorPosition(e2), true;
  }
  tabClear(e2) {
    let i = e2.params[0];
    return i === 0 ? delete this._activeBuffer.tabs[this._activeBuffer.x] : i === 3 && (this._activeBuffer.tabs = {}), true;
  }
  cursorForwardTab(e2) {
    if (this._activeBuffer.x >= this._bufferService.cols) return true;
    let i = e2.params[0] || 1;
    for (; i--; ) this._activeBuffer.x = this._activeBuffer.nextStop();
    return true;
  }
  cursorBackwardTab(e2) {
    if (this._activeBuffer.x >= this._bufferService.cols) return true;
    let i = e2.params[0] || 1;
    for (; i--; ) this._activeBuffer.x = this._activeBuffer.prevStop();
    return true;
  }
  selectProtected(e2) {
    let i = e2.params[0];
    return i === 1 && (this._curAttrData.bg |= 536870912), (i === 2 || i === 0) && (this._curAttrData.bg &= -536870913), true;
  }
  _eraseInBufferLine(e2, i, r, n = false, o2 = false) {
    let l = this._activeBuffer.lines.get(this._activeBuffer.ybase + e2);
    l.replaceCells(i, r, this._activeBuffer.getNullCell(this._eraseAttrData()), o2), n && (l.isWrapped = false);
  }
  _resetBufferLine(e2, i = false) {
    let r = this._activeBuffer.lines.get(this._activeBuffer.ybase + e2);
    r && (r.fill(this._activeBuffer.getNullCell(this._eraseAttrData()), i), this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase + e2), r.isWrapped = false);
  }
  eraseInDisplay(e2, i = false) {
    this._restrictCursor(this._bufferService.cols);
    let r;
    switch (e2.params[0]) {
      case 0:
        for (r = this._activeBuffer.y, this._dirtyRowTracker.markDirty(r), this._eraseInBufferLine(r++, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, i); r < this._bufferService.rows; r++) this._resetBufferLine(r, i);
        this._dirtyRowTracker.markDirty(r);
        break;
      case 1:
        for (r = this._activeBuffer.y, this._dirtyRowTracker.markDirty(r), this._eraseInBufferLine(r, 0, this._activeBuffer.x + 1, true, i), this._activeBuffer.x + 1 >= this._bufferService.cols && (this._activeBuffer.lines.get(r + 1).isWrapped = false); r--; ) this._resetBufferLine(r, i);
        this._dirtyRowTracker.markDirty(0);
        break;
      case 2:
        if (this._optionsService.rawOptions.scrollOnEraseInDisplay) {
          for (r = this._bufferService.rows, this._dirtyRowTracker.markRangeDirty(0, r - 1); r-- && !this._activeBuffer.lines.get(this._activeBuffer.ybase + r)?.getTrimmedLength(); ) ;
          for (; r >= 0; r--) this._bufferService.scroll(this._eraseAttrData());
        } else {
          for (r = this._bufferService.rows, this._dirtyRowTracker.markDirty(r - 1); r--; ) this._resetBufferLine(r, i);
          this._dirtyRowTracker.markDirty(0);
        }
        break;
      case 3:
        let n = this._activeBuffer.lines.length - this._bufferService.rows;
        n > 0 && (this._activeBuffer.lines.trimStart(n), this._activeBuffer.ybase = Math.max(this._activeBuffer.ybase - n, 0), this._activeBuffer.ydisp = Math.max(this._activeBuffer.ydisp - n, 0), this._onScroll.fire(0));
        break;
    }
    return true;
  }
  eraseInLine(e2, i = false) {
    switch (this._restrictCursor(this._bufferService.cols), e2.params[0]) {
      case 0:
        this._eraseInBufferLine(this._activeBuffer.y, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, i);
        break;
      case 1:
        this._eraseInBufferLine(this._activeBuffer.y, 0, this._activeBuffer.x + 1, false, i);
        break;
      case 2:
        this._eraseInBufferLine(this._activeBuffer.y, 0, this._bufferService.cols, true, i);
        break;
    }
    return this._dirtyRowTracker.markDirty(this._activeBuffer.y), true;
  }
  insertLines(e2) {
    this._restrictCursor();
    let i = e2.params[0] || 1;
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let r = this._activeBuffer.ybase + this._activeBuffer.y, n = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, o2 = this._bufferService.rows - 1 + this._activeBuffer.ybase - n + 1;
    for (; i--; ) this._activeBuffer.lines.splice(o2 - 1, 1), this._activeBuffer.lines.splice(r, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
  }
  deleteLines(e2) {
    this._restrictCursor();
    let i = e2.params[0] || 1;
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let r = this._activeBuffer.ybase + this._activeBuffer.y, n;
    for (n = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, n = this._bufferService.rows - 1 + this._activeBuffer.ybase - n; i--; ) this._activeBuffer.lines.splice(r, 1), this._activeBuffer.lines.splice(n, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
  }
  insertChars(e2) {
    this._restrictCursor();
    let i = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    return i && (i.insertCells(this._activeBuffer.x, e2.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
  }
  deleteChars(e2) {
    this._restrictCursor();
    let i = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    return i && (i.deleteCells(this._activeBuffer.x, e2.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
  }
  scrollUp(e2) {
    let i = e2.params[0] || 1;
    for (; i--; ) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  scrollDown(e2) {
    let i = e2.params[0] || 1;
    for (; i--; ) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 0, this._activeBuffer.getBlankLine(X2));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  scrollLeft(e2) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i = e2.params[0] || 1;
    for (let r = this._activeBuffer.scrollTop; r <= this._activeBuffer.scrollBottom; ++r) {
      let n = this._activeBuffer.lines.get(this._activeBuffer.ybase + r);
      n.deleteCells(0, i, this._activeBuffer.getNullCell(this._eraseAttrData())), n.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  scrollRight(e2) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i = e2.params[0] || 1;
    for (let r = this._activeBuffer.scrollTop; r <= this._activeBuffer.scrollBottom; ++r) {
      let n = this._activeBuffer.lines.get(this._activeBuffer.ybase + r);
      n.insertCells(0, i, this._activeBuffer.getNullCell(this._eraseAttrData())), n.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  insertColumns(e2) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i = e2.params[0] || 1;
    for (let r = this._activeBuffer.scrollTop; r <= this._activeBuffer.scrollBottom; ++r) {
      let n = this._activeBuffer.lines.get(this._activeBuffer.ybase + r);
      n.insertCells(this._activeBuffer.x, i, this._activeBuffer.getNullCell(this._eraseAttrData())), n.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  deleteColumns(e2) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i = e2.params[0] || 1;
    for (let r = this._activeBuffer.scrollTop; r <= this._activeBuffer.scrollBottom; ++r) {
      let n = this._activeBuffer.lines.get(this._activeBuffer.ybase + r);
      n.deleteCells(this._activeBuffer.x, i, this._activeBuffer.getNullCell(this._eraseAttrData())), n.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  eraseChars(e2) {
    this._restrictCursor();
    let i = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    return i && (i.replaceCells(this._activeBuffer.x, this._activeBuffer.x + (e2.params[0] || 1), this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
  }
  repeatPrecedingCharacter(e2) {
    let i = this._parser.precedingJoinState;
    if (!i) return true;
    let r = e2.params[0] || 1, n = Ae.extractWidth(i), o2 = this._activeBuffer.x - n, a2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).getString(o2), u = new Uint32Array(a2.length * r), h2 = 0;
    for (let d2 = 0; d2 < a2.length; ) {
      let _2 = a2.codePointAt(d2) || 0;
      u[h2++] = _2, d2 += _2 > 65535 ? 2 : 1;
    }
    let c2 = h2;
    for (let d2 = 1; d2 < r; ++d2) u.copyWithin(c2, 0, h2), c2 += h2;
    return this.print(u, 0, c2), true;
  }
  sendDeviceAttributesPrimary(e2) {
    return e2.params[0] > 0 || (this._is("xterm") || this._is("rxvt-unicode") || this._is("screen") ? this._coreService.triggerDataEvent(b2.ESC + "[?1;2c") : this._is("linux") && this._coreService.triggerDataEvent(b2.ESC + "[?6c")), true;
  }
  sendDeviceAttributesSecondary(e2) {
    return e2.params[0] > 0 || (this._is("xterm") ? this._coreService.triggerDataEvent(b2.ESC + "[>0;276;0c") : this._is("rxvt-unicode") ? this._coreService.triggerDataEvent(b2.ESC + "[>85;95;0c") : this._is("linux") ? this._coreService.triggerDataEvent(e2.params[0] + "c") : this._is("screen") && this._coreService.triggerDataEvent(b2.ESC + "[>83;40003;0c")), true;
  }
  _is(e2) {
    return (this._optionsService.rawOptions.termName + "").indexOf(e2) === 0;
  }
  setMode(e2) {
    for (let i = 0; i < e2.length; i++) switch (e2.params[i]) {
      case 4:
        this._coreService.modes.insertMode = true;
        break;
      case 20:
        this._optionsService.options.convertEol = true;
        break;
    }
    return true;
  }
  setModePrivate(e2) {
    for (let i = 0; i < e2.length; i++) switch (e2.params[i]) {
      case 1:
        this._coreService.decPrivateModes.applicationCursorKeys = true;
        break;
      case 2:
        this._charsetService.setgCharset(0, Je), this._charsetService.setgCharset(1, Je), this._charsetService.setgCharset(2, Je), this._charsetService.setgCharset(3, Je);
        break;
      case 3:
        this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(132, this._bufferService.rows), this._onRequestReset.fire());
        break;
      case 6:
        this._coreService.decPrivateModes.origin = true, this._setCursor(0, 0);
        break;
      case 7:
        this._coreService.decPrivateModes.wraparound = true;
        break;
      case 12:
        this._optionsService.options.cursorBlink = true;
        break;
      case 45:
        this._coreService.decPrivateModes.reverseWraparound = true;
        break;
      case 66:
        this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire();
        break;
      case 9:
        this._coreMouseService.activeProtocol = "X10";
        break;
      case 1e3:
        this._coreMouseService.activeProtocol = "VT200";
        break;
      case 1002:
        this._coreMouseService.activeProtocol = "DRAG";
        break;
      case 1003:
        this._coreMouseService.activeProtocol = "ANY";
        break;
      case 1004:
        this._coreService.decPrivateModes.sendFocus = true, this._onRequestSendFocus.fire();
        break;
      case 1005:
        this._logService.debug("DECSET 1005 not supported (see #2507)");
        break;
      case 1006:
        this._coreMouseService.activeEncoding = "SGR";
        break;
      case 1015:
        this._logService.debug("DECSET 1015 not supported (see #2507)");
        break;
      case 1016:
        this._coreMouseService.activeEncoding = "SGR_PIXELS";
        break;
      case 25:
        this._coreService.isCursorHidden = false;
        break;
      case 1048:
        this.saveCursor();
        break;
      case 1049:
        this.saveCursor();
      case 47:
      case 1047:
        this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(void 0), this._onRequestSyncScrollBar.fire();
        break;
      case 2004:
        this._coreService.decPrivateModes.bracketedPasteMode = true;
        break;
      case 2026:
        this._coreService.decPrivateModes.synchronizedOutput = true;
        break;
    }
    return true;
  }
  resetMode(e2) {
    for (let i = 0; i < e2.length; i++) switch (e2.params[i]) {
      case 4:
        this._coreService.modes.insertMode = false;
        break;
      case 20:
        this._optionsService.options.convertEol = false;
        break;
    }
    return true;
  }
  resetModePrivate(e2) {
    for (let i = 0; i < e2.length; i++) switch (e2.params[i]) {
      case 1:
        this._coreService.decPrivateModes.applicationCursorKeys = false;
        break;
      case 3:
        this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(80, this._bufferService.rows), this._onRequestReset.fire());
        break;
      case 6:
        this._coreService.decPrivateModes.origin = false, this._setCursor(0, 0);
        break;
      case 7:
        this._coreService.decPrivateModes.wraparound = false;
        break;
      case 12:
        this._optionsService.options.cursorBlink = false;
        break;
      case 45:
        this._coreService.decPrivateModes.reverseWraparound = false;
        break;
      case 66:
        this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire();
        break;
      case 9:
      case 1e3:
      case 1002:
      case 1003:
        this._coreMouseService.activeProtocol = "NONE";
        break;
      case 1004:
        this._coreService.decPrivateModes.sendFocus = false;
        break;
      case 1005:
        this._logService.debug("DECRST 1005 not supported (see #2507)");
        break;
      case 1006:
        this._coreMouseService.activeEncoding = "DEFAULT";
        break;
      case 1015:
        this._logService.debug("DECRST 1015 not supported (see #2507)");
        break;
      case 1016:
        this._coreMouseService.activeEncoding = "DEFAULT";
        break;
      case 25:
        this._coreService.isCursorHidden = true;
        break;
      case 1048:
        this.restoreCursor();
        break;
      case 1049:
      case 47:
      case 1047:
        this._bufferService.buffers.activateNormalBuffer(), e2.params[i] === 1049 && this.restoreCursor(), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(void 0), this._onRequestSyncScrollBar.fire();
        break;
      case 2004:
        this._coreService.decPrivateModes.bracketedPasteMode = false;
        break;
      case 2026:
        this._coreService.decPrivateModes.synchronizedOutput = false, this._onRequestRefreshRows.fire(void 0);
        break;
    }
    return true;
  }
  requestMode(e2, i) {
    let r;
    ((P) => (P[P.NOT_RECOGNIZED = 0] = "NOT_RECOGNIZED", P[P.SET = 1] = "SET", P[P.RESET = 2] = "RESET", P[P.PERMANENTLY_SET = 3] = "PERMANENTLY_SET", P[P.PERMANENTLY_RESET = 4] = "PERMANENTLY_RESET"))(r ||= {});
    let n = this._coreService.decPrivateModes, { activeProtocol: o2, activeEncoding: l } = this._coreMouseService, a2 = this._coreService, { buffers: u, cols: h2 } = this._bufferService, { active: c2, alt: d2 } = u, _2 = this._optionsService.rawOptions, p = (A, R) => (a2.triggerDataEvent(`${b2.ESC}[${i ? "" : "?"}${A};${R}$y`), true), m = (A) => A ? 1 : 2, f2 = e2.params[0];
    return i ? f2 === 2 ? p(f2, 4) : f2 === 4 ? p(f2, m(a2.modes.insertMode)) : f2 === 12 ? p(f2, 3) : f2 === 20 ? p(f2, m(_2.convertEol)) : p(f2, 0) : f2 === 1 ? p(f2, m(n.applicationCursorKeys)) : f2 === 3 ? p(f2, _2.windowOptions.setWinLines ? h2 === 80 ? 2 : h2 === 132 ? 1 : 0 : 0) : f2 === 6 ? p(f2, m(n.origin)) : f2 === 7 ? p(f2, m(n.wraparound)) : f2 === 8 ? p(f2, 3) : f2 === 9 ? p(f2, m(o2 === "X10")) : f2 === 12 ? p(f2, m(_2.cursorBlink)) : f2 === 25 ? p(f2, m(!a2.isCursorHidden)) : f2 === 45 ? p(f2, m(n.reverseWraparound)) : f2 === 66 ? p(f2, m(n.applicationKeypad)) : f2 === 67 ? p(f2, 4) : f2 === 1e3 ? p(f2, m(o2 === "VT200")) : f2 === 1002 ? p(f2, m(o2 === "DRAG")) : f2 === 1003 ? p(f2, m(o2 === "ANY")) : f2 === 1004 ? p(f2, m(n.sendFocus)) : f2 === 1005 ? p(f2, 4) : f2 === 1006 ? p(f2, m(l === "SGR")) : f2 === 1015 ? p(f2, 4) : f2 === 1016 ? p(f2, m(l === "SGR_PIXELS")) : f2 === 1048 ? p(f2, 1) : f2 === 47 || f2 === 1047 || f2 === 1049 ? p(f2, m(c2 === d2)) : f2 === 2004 ? p(f2, m(n.bracketedPasteMode)) : f2 === 2026 ? p(f2, m(n.synchronizedOutput)) : p(f2, 0);
  }
  _updateAttrColor(e2, i, r, n, o2) {
    return i === 2 ? (e2 |= 50331648, e2 &= -16777216, e2 |= De.fromColorRGB([r, n, o2])) : i === 5 && (e2 &= -50331904, e2 |= 33554432 | r & 255), e2;
  }
  _extractColor(e2, i, r) {
    let n = [0, 0, -1, 0, 0, 0], o2 = 0, l = 0;
    do {
      if (n[l + o2] = e2.params[i + l], e2.hasSubParams(i + l)) {
        let a2 = e2.getSubParams(i + l), u = 0;
        do
          n[1] === 5 && (o2 = 1), n[l + u + 1 + o2] = a2[u];
        while (++u < a2.length && u + l + 1 + o2 < n.length);
        break;
      }
      if (n[1] === 5 && l + o2 >= 2 || n[1] === 2 && l + o2 >= 5) break;
      n[1] && (o2 = 1);
    } while (++l + i < e2.length && l + o2 < n.length);
    for (let a2 = 2; a2 < n.length; ++a2) n[a2] === -1 && (n[a2] = 0);
    switch (n[0]) {
      case 38:
        r.fg = this._updateAttrColor(r.fg, n[1], n[3], n[4], n[5]);
        break;
      case 48:
        r.bg = this._updateAttrColor(r.bg, n[1], n[3], n[4], n[5]);
        break;
      case 58:
        r.extended = r.extended.clone(), r.extended.underlineColor = this._updateAttrColor(r.extended.underlineColor, n[1], n[3], n[4], n[5]);
    }
    return l;
  }
  _processUnderline(e2, i) {
    i.extended = i.extended.clone(), (!~e2 || e2 > 5) && (e2 = 1), i.extended.underlineStyle = e2, i.fg |= 268435456, e2 === 0 && (i.fg &= -268435457), i.updateExtended();
  }
  _processSGR0(e2) {
    e2.fg = X2.fg, e2.bg = X2.bg, e2.extended = e2.extended.clone(), e2.extended.underlineStyle = 0, e2.extended.underlineColor &= -67108864, e2.updateExtended();
  }
  charAttributes(e2) {
    if (e2.length === 1 && e2.params[0] === 0) return this._processSGR0(this._curAttrData), true;
    let i = e2.length, r, n = this._curAttrData;
    for (let o2 = 0; o2 < i; o2++) r = e2.params[o2], r >= 30 && r <= 37 ? (n.fg &= -50331904, n.fg |= 16777216 | r - 30) : r >= 40 && r <= 47 ? (n.bg &= -50331904, n.bg |= 16777216 | r - 40) : r >= 90 && r <= 97 ? (n.fg &= -50331904, n.fg |= 16777216 | r - 90 | 8) : r >= 100 && r <= 107 ? (n.bg &= -50331904, n.bg |= 16777216 | r - 100 | 8) : r === 0 ? this._processSGR0(n) : r === 1 ? n.fg |= 134217728 : r === 3 ? n.bg |= 67108864 : r === 4 ? (n.fg |= 268435456, this._processUnderline(e2.hasSubParams(o2) ? e2.getSubParams(o2)[0] : 1, n)) : r === 5 ? n.fg |= 536870912 : r === 7 ? n.fg |= 67108864 : r === 8 ? n.fg |= 1073741824 : r === 9 ? n.fg |= 2147483648 : r === 2 ? n.bg |= 134217728 : r === 21 ? this._processUnderline(2, n) : r === 22 ? (n.fg &= -134217729, n.bg &= -134217729) : r === 23 ? n.bg &= -67108865 : r === 24 ? (n.fg &= -268435457, this._processUnderline(0, n)) : r === 25 ? n.fg &= -536870913 : r === 27 ? n.fg &= -67108865 : r === 28 ? n.fg &= -1073741825 : r === 29 ? n.fg &= 2147483647 : r === 39 ? (n.fg &= -67108864, n.fg |= X2.fg & 16777215) : r === 49 ? (n.bg &= -67108864, n.bg |= X2.bg & 16777215) : r === 38 || r === 48 || r === 58 ? o2 += this._extractColor(e2, o2, n) : r === 53 ? n.bg |= 1073741824 : r === 55 ? n.bg &= -1073741825 : r === 59 ? (n.extended = n.extended.clone(), n.extended.underlineColor = -1, n.updateExtended()) : r === 100 ? (n.fg &= -67108864, n.fg |= X2.fg & 16777215, n.bg &= -67108864, n.bg |= X2.bg & 16777215) : this._logService.debug("Unknown SGR attribute: %d.", r);
    return true;
  }
  deviceStatus(e2) {
    switch (e2.params[0]) {
      case 5:
        this._coreService.triggerDataEvent(`${b2.ESC}[0n`);
        break;
      case 6:
        let i = this._activeBuffer.y + 1, r = this._activeBuffer.x + 1;
        this._coreService.triggerDataEvent(`${b2.ESC}[${i};${r}R`);
        break;
    }
    return true;
  }
  deviceStatusPrivate(e2) {
    switch (e2.params[0]) {
      case 6:
        let i = this._activeBuffer.y + 1, r = this._activeBuffer.x + 1;
        this._coreService.triggerDataEvent(`${b2.ESC}[?${i};${r}R`);
        break;
      case 15:
        break;
      case 25:
        break;
      case 26:
        break;
      case 53:
        break;
    }
    return true;
  }
  softReset(e2) {
    return this._coreService.isCursorHidden = false, this._onRequestSyncScrollBar.fire(), this._activeBuffer.scrollTop = 0, this._activeBuffer.scrollBottom = this._bufferService.rows - 1, this._curAttrData = X2.clone(), this._coreService.reset(), this._charsetService.reset(), this._activeBuffer.savedX = 0, this._activeBuffer.savedY = this._activeBuffer.ybase, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, this._coreService.decPrivateModes.origin = false, true;
  }
  setCursorStyle(e2) {
    let i = e2.length === 0 ? 1 : e2.params[0];
    if (i === 0) this._coreService.decPrivateModes.cursorStyle = void 0, this._coreService.decPrivateModes.cursorBlink = void 0;
    else {
      switch (i) {
        case 1:
        case 2:
          this._coreService.decPrivateModes.cursorStyle = "block";
          break;
        case 3:
        case 4:
          this._coreService.decPrivateModes.cursorStyle = "underline";
          break;
        case 5:
        case 6:
          this._coreService.decPrivateModes.cursorStyle = "bar";
          break;
      }
      let r = i % 2 === 1;
      this._coreService.decPrivateModes.cursorBlink = r;
    }
    return true;
  }
  setScrollRegion(e2) {
    let i = e2.params[0] || 1, r;
    return (e2.length < 2 || (r = e2.params[1]) > this._bufferService.rows || r === 0) && (r = this._bufferService.rows), r > i && (this._activeBuffer.scrollTop = i - 1, this._activeBuffer.scrollBottom = r - 1, this._setCursor(0, 0)), true;
  }
  windowOptions(e2) {
    if (!bl(e2.params[0], this._optionsService.rawOptions.windowOptions)) return true;
    let i = e2.length > 1 ? e2.params[1] : 0;
    switch (e2.params[0]) {
      case 14:
        i !== 2 && this._onRequestWindowsOptionsReport.fire(0);
        break;
      case 16:
        this._onRequestWindowsOptionsReport.fire(1);
        break;
      case 18:
        this._bufferService && this._coreService.triggerDataEvent(`${b2.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);
        break;
      case 22:
        (i === 0 || i === 2) && (this._windowTitleStack.push(this._windowTitle), this._windowTitleStack.length > _l && this._windowTitleStack.shift()), (i === 0 || i === 1) && (this._iconNameStack.push(this._iconName), this._iconNameStack.length > _l && this._iconNameStack.shift());
        break;
      case 23:
        (i === 0 || i === 2) && this._windowTitleStack.length && this.setTitle(this._windowTitleStack.pop()), (i === 0 || i === 1) && this._iconNameStack.length && this.setIconName(this._iconNameStack.pop());
        break;
    }
    return true;
  }
  saveCursor(e2) {
    return this._activeBuffer.savedX = this._activeBuffer.x, this._activeBuffer.savedY = this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, true;
  }
  restoreCursor(e2) {
    return this._activeBuffer.x = this._activeBuffer.savedX || 0, this._activeBuffer.y = Math.max(this._activeBuffer.savedY - this._activeBuffer.ybase, 0), this._curAttrData.fg = this._activeBuffer.savedCurAttrData.fg, this._curAttrData.bg = this._activeBuffer.savedCurAttrData.bg, this._charsetService.charset = this._savedCharset, this._activeBuffer.savedCharset && (this._charsetService.charset = this._activeBuffer.savedCharset), this._restrictCursor(), true;
  }
  setTitle(e2) {
    return this._windowTitle = e2, this._onTitleChange.fire(e2), true;
  }
  setIconName(e2) {
    return this._iconName = e2, true;
  }
  setOrReportIndexedColor(e2) {
    let i = [], r = e2.split(";");
    for (; r.length > 1; ) {
      let n = r.shift(), o2 = r.shift();
      if (/^\d+$/.exec(n)) {
        let l = parseInt(n);
        if (Sl(l)) if (o2 === "?") i.push({ type: 0, index: l });
        else {
          let a2 = Ws(o2);
          a2 && i.push({ type: 1, index: l, color: a2 });
        }
      }
    }
    return i.length && this._onColor.fire(i), true;
  }
  setHyperlink(e2) {
    let i = e2.indexOf(";");
    if (i === -1) return true;
    let r = e2.slice(0, i).trim(), n = e2.slice(i + 1);
    return n ? this._createHyperlink(r, n) : r.trim() ? false : this._finishHyperlink();
  }
  _createHyperlink(e2, i) {
    this._getCurrentLinkId() && this._finishHyperlink();
    let r = e2.split(":"), n, o2 = r.findIndex((l) => l.startsWith("id="));
    return o2 !== -1 && (n = r[o2].slice(3) || void 0), this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = this._oscLinkService.registerLink({ id: n, uri: i }), this._curAttrData.updateExtended(), true;
  }
  _finishHyperlink() {
    return this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = 0, this._curAttrData.updateExtended(), true;
  }
  _setOrReportSpecialColor(e2, i) {
    let r = e2.split(";");
    for (let n = 0; n < r.length && !(i >= this._specialColors.length); ++n, ++i) if (r[n] === "?") this._onColor.fire([{ type: 0, index: this._specialColors[i] }]);
    else {
      let o2 = Ws(r[n]);
      o2 && this._onColor.fire([{ type: 1, index: this._specialColors[i], color: o2 }]);
    }
    return true;
  }
  setOrReportFgColor(e2) {
    return this._setOrReportSpecialColor(e2, 0);
  }
  setOrReportBgColor(e2) {
    return this._setOrReportSpecialColor(e2, 1);
  }
  setOrReportCursorColor(e2) {
    return this._setOrReportSpecialColor(e2, 2);
  }
  restoreIndexedColor(e2) {
    if (!e2) return this._onColor.fire([{ type: 2 }]), true;
    let i = [], r = e2.split(";");
    for (let n = 0; n < r.length; ++n) if (/^\d+$/.exec(r[n])) {
      let o2 = parseInt(r[n]);
      Sl(o2) && i.push({ type: 2, index: o2 });
    }
    return i.length && this._onColor.fire(i), true;
  }
  restoreFgColor(e2) {
    return this._onColor.fire([{ type: 2, index: 256 }]), true;
  }
  restoreBgColor(e2) {
    return this._onColor.fire([{ type: 2, index: 257 }]), true;
  }
  restoreCursorColor(e2) {
    return this._onColor.fire([{ type: 2, index: 258 }]), true;
  }
  nextLine() {
    return this._activeBuffer.x = 0, this.index(), true;
  }
  keypadApplicationMode() {
    return this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire(), true;
  }
  keypadNumericMode() {
    return this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire(), true;
  }
  selectDefaultCharset() {
    return this._charsetService.setgLevel(0), this._charsetService.setgCharset(0, Je), true;
  }
  selectCharset(e2) {
    return e2.length !== 2 ? (this.selectDefaultCharset(), true) : (e2[0] === "/" || this._charsetService.setgCharset(mc[e2[0]], ne[e2[1]] || Je), true);
  }
  index() {
    return this._restrictCursor(), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._restrictCursor(), true;
  }
  tabSet() {
    return this._activeBuffer.tabs[this._activeBuffer.x] = true, true;
  }
  reverseIndex() {
    if (this._restrictCursor(), this._activeBuffer.y === this._activeBuffer.scrollTop) {
      let e2 = this._activeBuffer.scrollBottom - this._activeBuffer.scrollTop;
      this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase + this._activeBuffer.y, e2, 1), this._activeBuffer.lines.set(this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.getBlankLine(this._eraseAttrData())), this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
    } else this._activeBuffer.y--, this._restrictCursor();
    return true;
  }
  fullReset() {
    return this._parser.reset(), this._onRequestReset.fire(), true;
  }
  reset() {
    this._curAttrData = X2.clone(), this._eraseAttrDataInternal = X2.clone();
  }
  _eraseAttrData() {
    return this._eraseAttrDataInternal.bg &= -67108864, this._eraseAttrDataInternal.bg |= this._curAttrData.bg & 67108863, this._eraseAttrDataInternal;
  }
  setgLevel(e2) {
    return this._charsetService.setgLevel(e2), true;
  }
  screenAlignmentPattern() {
    let e2 = new q();
    e2.content = 1 << 22 | 69, e2.fg = this._curAttrData.fg, e2.bg = this._curAttrData.bg, this._setCursor(0, 0);
    for (let i = 0; i < this._bufferService.rows; ++i) {
      let r = this._activeBuffer.ybase + this._activeBuffer.y + i, n = this._activeBuffer.lines.get(r);
      n && (n.fill(e2), n.isWrapped = false);
    }
    return this._dirtyRowTracker.markAllDirty(), this._setCursor(0, 0), true;
  }
  requestStatusString(e2, i) {
    let r = (a2) => (this._coreService.triggerDataEvent(`${b2.ESC}${a2}${b2.ESC}\\`), true), n = this._bufferService.buffer, o2 = this._optionsService.rawOptions, l = { block: 2, underline: 4, bar: 6 };
    return r(e2 === '"q' ? `P1$r${this._curAttrData.isProtected() ? 1 : 0}"q` : e2 === '"p' ? 'P1$r61;1"p' : e2 === "r" ? `P1$r${n.scrollTop + 1};${n.scrollBottom + 1}r` : e2 === "m" ? "P1$r0m" : e2 === " q" ? `P1$r${l[o2.cursorStyle] - (o2.cursorBlink ? 1 : 0)} q` : "P0$r");
  }
  markRangeDirty(e2, i) {
    this._dirtyRowTracker.markRangeDirty(e2, i);
  }
};
var Zi = class {
  constructor(t) {
    this._bufferService = t;
    this.clearRange();
  }
  clearRange() {
    this.start = this._bufferService.buffer.y, this.end = this._bufferService.buffer.y;
  }
  markDirty(t) {
    t < this.start ? this.start = t : t > this.end && (this.end = t);
  }
  markRangeDirty(t, e2) {
    t > e2 && (gl = t, t = e2, e2 = gl), t < this.start && (this.start = t), e2 > this.end && (this.end = e2);
  }
  markAllDirty() {
    this.markRangeDirty(0, this._bufferService.rows - 1);
  }
};
Zi = M2([S(0, F)], Zi);
function Sl(s15) {
  return 0 <= s15 && s15 < 256;
}
var _c = 5e7;
var El = 12;
var bc = 50;
var gn = class extends D {
  constructor(e2) {
    super();
    this._action = e2;
    this._writeBuffer = [];
    this._callbacks = [];
    this._pendingData = 0;
    this._bufferOffset = 0;
    this._isSyncWriting = false;
    this._syncCalls = 0;
    this._didUserInput = false;
    this._onWriteParsed = this._register(new v());
    this.onWriteParsed = this._onWriteParsed.event;
  }
  handleUserInput() {
    this._didUserInput = true;
  }
  writeSync(e2, i) {
    if (i !== void 0 && this._syncCalls > i) {
      this._syncCalls = 0;
      return;
    }
    if (this._pendingData += e2.length, this._writeBuffer.push(e2), this._callbacks.push(void 0), this._syncCalls++, this._isSyncWriting) return;
    this._isSyncWriting = true;
    let r;
    for (; r = this._writeBuffer.shift(); ) {
      this._action(r);
      let n = this._callbacks.shift();
      n && n();
    }
    this._pendingData = 0, this._bufferOffset = 2147483647, this._isSyncWriting = false, this._syncCalls = 0;
  }
  write(e2, i) {
    if (this._pendingData > _c) throw new Error("write data discarded, use flow control to avoid losing data");
    if (!this._writeBuffer.length) {
      if (this._bufferOffset = 0, this._didUserInput) {
        this._didUserInput = false, this._pendingData += e2.length, this._writeBuffer.push(e2), this._callbacks.push(i), this._innerWrite();
        return;
      }
      setTimeout(() => this._innerWrite());
    }
    this._pendingData += e2.length, this._writeBuffer.push(e2), this._callbacks.push(i);
  }
  _innerWrite(e2 = 0, i = true) {
    let r = e2 || performance.now();
    for (; this._writeBuffer.length > this._bufferOffset; ) {
      let n = this._writeBuffer[this._bufferOffset], o2 = this._action(n, i);
      if (o2) {
        let a2 = (u) => performance.now() - r >= El ? setTimeout(() => this._innerWrite(0, u)) : this._innerWrite(r, u);
        o2.catch((u) => (queueMicrotask(() => {
          throw u;
        }), Promise.resolve(false))).then(a2);
        return;
      }
      let l = this._callbacks[this._bufferOffset];
      if (l && l(), this._bufferOffset++, this._pendingData -= n.length, performance.now() - r >= El) break;
    }
    this._writeBuffer.length > this._bufferOffset ? (this._bufferOffset > bc && (this._writeBuffer = this._writeBuffer.slice(this._bufferOffset), this._callbacks = this._callbacks.slice(this._bufferOffset), this._bufferOffset = 0), setTimeout(() => this._innerWrite())) : (this._writeBuffer.length = 0, this._callbacks.length = 0, this._pendingData = 0, this._bufferOffset = 0), this._onWriteParsed.fire();
  }
};
var ui = class {
  constructor(t) {
    this._bufferService = t;
    this._nextId = 1;
    this._entriesWithId = /* @__PURE__ */ new Map();
    this._dataByLinkId = /* @__PURE__ */ new Map();
  }
  registerLink(t) {
    let e2 = this._bufferService.buffer;
    if (t.id === void 0) {
      let a2 = e2.addMarker(e2.ybase + e2.y), u = { data: t, id: this._nextId++, lines: [a2] };
      return a2.onDispose(() => this._removeMarkerFromLink(u, a2)), this._dataByLinkId.set(u.id, u), u.id;
    }
    let i = t, r = this._getEntryIdKey(i), n = this._entriesWithId.get(r);
    if (n) return this.addLineToLink(n.id, e2.ybase + e2.y), n.id;
    let o2 = e2.addMarker(e2.ybase + e2.y), l = { id: this._nextId++, key: this._getEntryIdKey(i), data: i, lines: [o2] };
    return o2.onDispose(() => this._removeMarkerFromLink(l, o2)), this._entriesWithId.set(l.key, l), this._dataByLinkId.set(l.id, l), l.id;
  }
  addLineToLink(t, e2) {
    let i = this._dataByLinkId.get(t);
    if (i && i.lines.every((r) => r.line !== e2)) {
      let r = this._bufferService.buffer.addMarker(e2);
      i.lines.push(r), r.onDispose(() => this._removeMarkerFromLink(i, r));
    }
  }
  getLinkData(t) {
    return this._dataByLinkId.get(t)?.data;
  }
  _getEntryIdKey(t) {
    return `${t.id};;${t.uri}`;
  }
  _removeMarkerFromLink(t, e2) {
    let i = t.lines.indexOf(e2);
    i !== -1 && (t.lines.splice(i, 1), t.lines.length === 0 && (t.data.id !== void 0 && this._entriesWithId.delete(t.key), this._dataByLinkId.delete(t.id)));
  }
};
ui = M2([S(0, F)], ui);
var Tl = false;
var Sn = class extends D {
  constructor(e2) {
    super();
    this._windowsWrappingHeuristics = this._register(new ye());
    this._onBinary = this._register(new v());
    this.onBinary = this._onBinary.event;
    this._onData = this._register(new v());
    this.onData = this._onData.event;
    this._onLineFeed = this._register(new v());
    this.onLineFeed = this._onLineFeed.event;
    this._onResize = this._register(new v());
    this.onResize = this._onResize.event;
    this._onWriteParsed = this._register(new v());
    this.onWriteParsed = this._onWriteParsed.event;
    this._onScroll = this._register(new v());
    this._instantiationService = new ln(), this.optionsService = this._register(new dn(e2)), this._instantiationService.setService(H, this.optionsService), this._bufferService = this._register(this._instantiationService.createInstance(ni)), this._instantiationService.setService(F, this._bufferService), this._logService = this._register(this._instantiationService.createInstance(ii2)), this._instantiationService.setService(nr, this._logService), this.coreService = this._register(this._instantiationService.createInstance(li)), this._instantiationService.setService(ge, this.coreService), this.coreMouseService = this._register(this._instantiationService.createInstance(ai)), this._instantiationService.setService(rr, this.coreMouseService), this.unicodeService = this._register(this._instantiationService.createInstance(Ae)), this._instantiationService.setService(Js, this.unicodeService), this._charsetService = this._instantiationService.createInstance(pn), this._instantiationService.setService(Zs, this._charsetService), this._oscLinkService = this._instantiationService.createInstance(ui), this._instantiationService.setService(sr, this._oscLinkService), this._inputHandler = this._register(new vn(this._bufferService, this._charsetService, this.coreService, this._logService, this.optionsService, this._oscLinkService, this.coreMouseService, this.unicodeService)), this._register($.forward(this._inputHandler.onLineFeed, this._onLineFeed)), this._register(this._inputHandler), this._register($.forward(this._bufferService.onResize, this._onResize)), this._register($.forward(this.coreService.onData, this._onData)), this._register($.forward(this.coreService.onBinary, this._onBinary)), this._register(this.coreService.onRequestScrollToBottom(() => this.scrollToBottom(true))), this._register(this.coreService.onUserInput(() => this._writeBuffer.handleUserInput())), this._register(this.optionsService.onMultipleOptionChange(["windowsMode", "windowsPty"], () => this._handleWindowsPtyOptionChange())), this._register(this._bufferService.onScroll(() => {
      this._onScroll.fire({ position: this._bufferService.buffer.ydisp }), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
    })), this._writeBuffer = this._register(new gn((i, r) => this._inputHandler.parse(i, r))), this._register($.forward(this._writeBuffer.onWriteParsed, this._onWriteParsed));
  }
  get onScroll() {
    return this._onScrollApi || (this._onScrollApi = this._register(new v()), this._onScroll.event((e2) => {
      this._onScrollApi?.fire(e2.position);
    })), this._onScrollApi.event;
  }
  get cols() {
    return this._bufferService.cols;
  }
  get rows() {
    return this._bufferService.rows;
  }
  get buffers() {
    return this._bufferService.buffers;
  }
  get options() {
    return this.optionsService.options;
  }
  set options(e2) {
    for (let i in e2) this.optionsService.options[i] = e2[i];
  }
  write(e2, i) {
    this._writeBuffer.write(e2, i);
  }
  writeSync(e2, i) {
    this._logService.logLevel <= 3 && !Tl && (this._logService.warn("writeSync is unreliable and will be removed soon."), Tl = true), this._writeBuffer.writeSync(e2, i);
  }
  input(e2, i = true) {
    this.coreService.triggerDataEvent(e2, i);
  }
  resize(e2, i) {
    isNaN(e2) || isNaN(i) || (e2 = Math.max(e2, ks), i = Math.max(i, Cs), this._bufferService.resize(e2, i));
  }
  scroll(e2, i = false) {
    this._bufferService.scroll(e2, i);
  }
  scrollLines(e2, i) {
    this._bufferService.scrollLines(e2, i);
  }
  scrollPages(e2) {
    this.scrollLines(e2 * (this.rows - 1));
  }
  scrollToTop() {
    this.scrollLines(-this._bufferService.buffer.ydisp);
  }
  scrollToBottom(e2) {
    this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
  }
  scrollToLine(e2) {
    let i = e2 - this._bufferService.buffer.ydisp;
    i !== 0 && this.scrollLines(i);
  }
  registerEscHandler(e2, i) {
    return this._inputHandler.registerEscHandler(e2, i);
  }
  registerDcsHandler(e2, i) {
    return this._inputHandler.registerDcsHandler(e2, i);
  }
  registerCsiHandler(e2, i) {
    return this._inputHandler.registerCsiHandler(e2, i);
  }
  registerOscHandler(e2, i) {
    return this._inputHandler.registerOscHandler(e2, i);
  }
  _setup() {
    this._handleWindowsPtyOptionChange();
  }
  reset() {
    this._inputHandler.reset(), this._bufferService.reset(), this._charsetService.reset(), this.coreService.reset(), this.coreMouseService.reset();
  }
  _handleWindowsPtyOptionChange() {
    let e2 = false, i = this.optionsService.rawOptions.windowsPty;
    i && i.buildNumber !== void 0 && i.buildNumber !== void 0 ? e2 = i.backend === "conpty" && i.buildNumber < 21376 : this.optionsService.rawOptions.windowsMode && (e2 = true), e2 ? this._enableWindowsWrappingHeuristics() : this._windowsWrappingHeuristics.clear();
  }
  _enableWindowsWrappingHeuristics() {
    if (!this._windowsWrappingHeuristics.value) {
      let e2 = [];
      e2.push(this.onLineFeed(Bs.bind(null, this._bufferService))), e2.push(this.registerCsiHandler({ final: "H" }, () => (Bs(this._bufferService), false))), this._windowsWrappingHeuristics.value = C(() => {
        for (let i of e2) i.dispose();
      });
    }
  }
};
var gc = { 48: ["0", ")"], 49: ["1", "!"], 50: ["2", "@"], 51: ["3", "#"], 52: ["4", "$"], 53: ["5", "%"], 54: ["6", "^"], 55: ["7", "&"], 56: ["8", "*"], 57: ["9", "("], 186: [";", ":"], 187: ["=", "+"], 188: [",", "<"], 189: ["-", "_"], 190: [".", ">"], 191: ["/", "?"], 192: ["`", "~"], 219: ["[", "{"], 220: ["\\", "|"], 221: ["]", "}"], 222: ["'", '"'] };
function Il(s15, t, e2, i) {
  let r = { type: 0, cancel: false, key: void 0 }, n = (s15.shiftKey ? 1 : 0) | (s15.altKey ? 2 : 0) | (s15.ctrlKey ? 4 : 0) | (s15.metaKey ? 8 : 0);
  switch (s15.keyCode) {
    case 0:
      s15.key === "UIKeyInputUpArrow" ? t ? r.key = b2.ESC + "OA" : r.key = b2.ESC + "[A" : s15.key === "UIKeyInputLeftArrow" ? t ? r.key = b2.ESC + "OD" : r.key = b2.ESC + "[D" : s15.key === "UIKeyInputRightArrow" ? t ? r.key = b2.ESC + "OC" : r.key = b2.ESC + "[C" : s15.key === "UIKeyInputDownArrow" && (t ? r.key = b2.ESC + "OB" : r.key = b2.ESC + "[B");
      break;
    case 8:
      r.key = s15.ctrlKey ? "\b" : b2.DEL, s15.altKey && (r.key = b2.ESC + r.key);
      break;
    case 9:
      if (s15.shiftKey) {
        r.key = b2.ESC + "[Z";
        break;
      }
      r.key = b2.HT, r.cancel = true;
      break;
    case 13:
      r.key = s15.altKey ? b2.ESC + b2.CR : b2.CR, r.cancel = true;
      break;
    case 27:
      r.key = b2.ESC, s15.altKey && (r.key = b2.ESC + b2.ESC), r.cancel = true;
      break;
    case 37:
      if (s15.metaKey) break;
      n ? r.key = b2.ESC + "[1;" + (n + 1) + "D" : t ? r.key = b2.ESC + "OD" : r.key = b2.ESC + "[D";
      break;
    case 39:
      if (s15.metaKey) break;
      n ? r.key = b2.ESC + "[1;" + (n + 1) + "C" : t ? r.key = b2.ESC + "OC" : r.key = b2.ESC + "[C";
      break;
    case 38:
      if (s15.metaKey) break;
      n ? r.key = b2.ESC + "[1;" + (n + 1) + "A" : t ? r.key = b2.ESC + "OA" : r.key = b2.ESC + "[A";
      break;
    case 40:
      if (s15.metaKey) break;
      n ? r.key = b2.ESC + "[1;" + (n + 1) + "B" : t ? r.key = b2.ESC + "OB" : r.key = b2.ESC + "[B";
      break;
    case 45:
      !s15.shiftKey && !s15.ctrlKey && (r.key = b2.ESC + "[2~");
      break;
    case 46:
      n ? r.key = b2.ESC + "[3;" + (n + 1) + "~" : r.key = b2.ESC + "[3~";
      break;
    case 36:
      n ? r.key = b2.ESC + "[1;" + (n + 1) + "H" : t ? r.key = b2.ESC + "OH" : r.key = b2.ESC + "[H";
      break;
    case 35:
      n ? r.key = b2.ESC + "[1;" + (n + 1) + "F" : t ? r.key = b2.ESC + "OF" : r.key = b2.ESC + "[F";
      break;
    case 33:
      s15.shiftKey ? r.type = 2 : s15.ctrlKey ? r.key = b2.ESC + "[5;" + (n + 1) + "~" : r.key = b2.ESC + "[5~";
      break;
    case 34:
      s15.shiftKey ? r.type = 3 : s15.ctrlKey ? r.key = b2.ESC + "[6;" + (n + 1) + "~" : r.key = b2.ESC + "[6~";
      break;
    case 112:
      n ? r.key = b2.ESC + "[1;" + (n + 1) + "P" : r.key = b2.ESC + "OP";
      break;
    case 113:
      n ? r.key = b2.ESC + "[1;" + (n + 1) + "Q" : r.key = b2.ESC + "OQ";
      break;
    case 114:
      n ? r.key = b2.ESC + "[1;" + (n + 1) + "R" : r.key = b2.ESC + "OR";
      break;
    case 115:
      n ? r.key = b2.ESC + "[1;" + (n + 1) + "S" : r.key = b2.ESC + "OS";
      break;
    case 116:
      n ? r.key = b2.ESC + "[15;" + (n + 1) + "~" : r.key = b2.ESC + "[15~";
      break;
    case 117:
      n ? r.key = b2.ESC + "[17;" + (n + 1) + "~" : r.key = b2.ESC + "[17~";
      break;
    case 118:
      n ? r.key = b2.ESC + "[18;" + (n + 1) + "~" : r.key = b2.ESC + "[18~";
      break;
    case 119:
      n ? r.key = b2.ESC + "[19;" + (n + 1) + "~" : r.key = b2.ESC + "[19~";
      break;
    case 120:
      n ? r.key = b2.ESC + "[20;" + (n + 1) + "~" : r.key = b2.ESC + "[20~";
      break;
    case 121:
      n ? r.key = b2.ESC + "[21;" + (n + 1) + "~" : r.key = b2.ESC + "[21~";
      break;
    case 122:
      n ? r.key = b2.ESC + "[23;" + (n + 1) + "~" : r.key = b2.ESC + "[23~";
      break;
    case 123:
      n ? r.key = b2.ESC + "[24;" + (n + 1) + "~" : r.key = b2.ESC + "[24~";
      break;
    default:
      if (s15.ctrlKey && !s15.shiftKey && !s15.altKey && !s15.metaKey) s15.keyCode >= 65 && s15.keyCode <= 90 ? r.key = String.fromCharCode(s15.keyCode - 64) : s15.keyCode === 32 ? r.key = b2.NUL : s15.keyCode >= 51 && s15.keyCode <= 55 ? r.key = String.fromCharCode(s15.keyCode - 51 + 27) : s15.keyCode === 56 ? r.key = b2.DEL : s15.keyCode === 219 ? r.key = b2.ESC : s15.keyCode === 220 ? r.key = b2.FS : s15.keyCode === 221 && (r.key = b2.GS);
      else if ((!e2 || i) && s15.altKey && !s15.metaKey) {
        let l = gc[s15.keyCode]?.[s15.shiftKey ? 1 : 0];
        if (l) r.key = b2.ESC + l;
        else if (s15.keyCode >= 65 && s15.keyCode <= 90) {
          let a2 = s15.ctrlKey ? s15.keyCode - 64 : s15.keyCode + 32, u = String.fromCharCode(a2);
          s15.shiftKey && (u = u.toUpperCase()), r.key = b2.ESC + u;
        } else if (s15.keyCode === 32) r.key = b2.ESC + (s15.ctrlKey ? b2.NUL : " ");
        else if (s15.key === "Dead" && s15.code.startsWith("Key")) {
          let a2 = s15.code.slice(3, 4);
          s15.shiftKey || (a2 = a2.toLowerCase()), r.key = b2.ESC + a2, r.cancel = true;
        }
      } else e2 && !s15.altKey && !s15.ctrlKey && !s15.shiftKey && s15.metaKey ? s15.keyCode === 65 && (r.type = 1) : s15.key && !s15.ctrlKey && !s15.altKey && !s15.metaKey && s15.keyCode >= 48 && s15.key.length === 1 ? r.key = s15.key : s15.key && s15.ctrlKey && (s15.key === "_" && (r.key = b2.US), s15.key === "@" && (r.key = b2.NUL));
      break;
  }
  return r;
}
var ee = 0;
var En = class {
  constructor(t) {
    this._getKey = t;
    this._array = [];
    this._insertedValues = [];
    this._flushInsertedTask = new Jt();
    this._isFlushingInserted = false;
    this._deletedIndices = [];
    this._flushDeletedTask = new Jt();
    this._isFlushingDeleted = false;
  }
  clear() {
    this._array.length = 0, this._insertedValues.length = 0, this._flushInsertedTask.clear(), this._isFlushingInserted = false, this._deletedIndices.length = 0, this._flushDeletedTask.clear(), this._isFlushingDeleted = false;
  }
  insert(t) {
    this._flushCleanupDeleted(), this._insertedValues.length === 0 && this._flushInsertedTask.enqueue(() => this._flushInserted()), this._insertedValues.push(t);
  }
  _flushInserted() {
    let t = this._insertedValues.sort((n, o2) => this._getKey(n) - this._getKey(o2)), e2 = 0, i = 0, r = new Array(this._array.length + this._insertedValues.length);
    for (let n = 0; n < r.length; n++) i >= this._array.length || this._getKey(t[e2]) <= this._getKey(this._array[i]) ? (r[n] = t[e2], e2++) : r[n] = this._array[i++];
    this._array = r, this._insertedValues.length = 0;
  }
  _flushCleanupInserted() {
    !this._isFlushingInserted && this._insertedValues.length > 0 && this._flushInsertedTask.flush();
  }
  delete(t) {
    if (this._flushCleanupInserted(), this._array.length === 0) return false;
    let e2 = this._getKey(t);
    if (e2 === void 0 || (ee = this._search(e2), ee === -1) || this._getKey(this._array[ee]) !== e2) return false;
    do
      if (this._array[ee] === t) return this._deletedIndices.length === 0 && this._flushDeletedTask.enqueue(() => this._flushDeleted()), this._deletedIndices.push(ee), true;
    while (++ee < this._array.length && this._getKey(this._array[ee]) === e2);
    return false;
  }
  _flushDeleted() {
    this._isFlushingDeleted = true;
    let t = this._deletedIndices.sort((n, o2) => n - o2), e2 = 0, i = new Array(this._array.length - t.length), r = 0;
    for (let n = 0; n < this._array.length; n++) t[e2] === n ? e2++ : i[r++] = this._array[n];
    this._array = i, this._deletedIndices.length = 0, this._isFlushingDeleted = false;
  }
  _flushCleanupDeleted() {
    !this._isFlushingDeleted && this._deletedIndices.length > 0 && this._flushDeletedTask.flush();
  }
  *getKeyIterator(t) {
    if (this._flushCleanupInserted(), this._flushCleanupDeleted(), this._array.length !== 0 && (ee = this._search(t), !(ee < 0 || ee >= this._array.length) && this._getKey(this._array[ee]) === t)) do
      yield this._array[ee];
    while (++ee < this._array.length && this._getKey(this._array[ee]) === t);
  }
  forEachByKey(t, e2) {
    if (this._flushCleanupInserted(), this._flushCleanupDeleted(), this._array.length !== 0 && (ee = this._search(t), !(ee < 0 || ee >= this._array.length) && this._getKey(this._array[ee]) === t)) do
      e2(this._array[ee]);
    while (++ee < this._array.length && this._getKey(this._array[ee]) === t);
  }
  values() {
    return this._flushCleanupInserted(), this._flushCleanupDeleted(), [...this._array].values();
  }
  _search(t) {
    let e2 = 0, i = this._array.length - 1;
    for (; i >= e2; ) {
      let r = e2 + i >> 1, n = this._getKey(this._array[r]);
      if (n > t) i = r - 1;
      else if (n < t) e2 = r + 1;
      else {
        for (; r > 0 && this._getKey(this._array[r - 1]) === t; ) r--;
        return r;
      }
    }
    return e2;
  }
};
var Us = 0;
var yl = 0;
var Tn = class extends D {
  constructor() {
    super();
    this._decorations = new En((e2) => e2?.marker.line);
    this._onDecorationRegistered = this._register(new v());
    this.onDecorationRegistered = this._onDecorationRegistered.event;
    this._onDecorationRemoved = this._register(new v());
    this.onDecorationRemoved = this._onDecorationRemoved.event;
    this._register(C(() => this.reset()));
  }
  get decorations() {
    return this._decorations.values();
  }
  registerDecoration(e2) {
    if (e2.marker.isDisposed) return;
    let i = new Ks(e2);
    if (i) {
      let r = i.marker.onDispose(() => i.dispose()), n = i.onDispose(() => {
        n.dispose(), i && (this._decorations.delete(i) && this._onDecorationRemoved.fire(i), r.dispose());
      });
      this._decorations.insert(i), this._onDecorationRegistered.fire(i);
    }
    return i;
  }
  reset() {
    for (let e2 of this._decorations.values()) e2.dispose();
    this._decorations.clear();
  }
  *getDecorationsAtCell(e2, i, r) {
    let n = 0, o2 = 0;
    for (let l of this._decorations.getKeyIterator(i)) n = l.options.x ?? 0, o2 = n + (l.options.width ?? 1), e2 >= n && e2 < o2 && (!r || (l.options.layer ?? "bottom") === r) && (yield l);
  }
  forEachDecorationAtCell(e2, i, r, n) {
    this._decorations.forEachByKey(i, (o2) => {
      Us = o2.options.x ?? 0, yl = Us + (o2.options.width ?? 1), e2 >= Us && e2 < yl && (!r || (o2.options.layer ?? "bottom") === r) && n(o2);
    });
  }
};
var Ks = class extends Ee {
  constructor(e2) {
    super();
    this.options = e2;
    this.onRenderEmitter = this.add(new v());
    this.onRender = this.onRenderEmitter.event;
    this._onDispose = this.add(new v());
    this.onDispose = this._onDispose.event;
    this._cachedBg = null;
    this._cachedFg = null;
    this.marker = e2.marker, this.options.overviewRulerOptions && !this.options.overviewRulerOptions.position && (this.options.overviewRulerOptions.position = "full");
  }
  get backgroundColorRGB() {
    return this._cachedBg === null && (this.options.backgroundColor ? this._cachedBg = z2.toColor(this.options.backgroundColor) : this._cachedBg = void 0), this._cachedBg;
  }
  get foregroundColorRGB() {
    return this._cachedFg === null && (this.options.foregroundColor ? this._cachedFg = z2.toColor(this.options.foregroundColor) : this._cachedFg = void 0), this._cachedFg;
  }
  dispose() {
    this._onDispose.fire(), super.dispose();
  }
};
var Sc = 1e3;
var In = class {
  constructor(t, e2 = Sc) {
    this._renderCallback = t;
    this._debounceThresholdMS = e2;
    this._lastRefreshMs = 0;
    this._additionalRefreshRequested = false;
  }
  dispose() {
    this._refreshTimeoutID && clearTimeout(this._refreshTimeoutID);
  }
  refresh(t, e2, i) {
    this._rowCount = i, t = t !== void 0 ? t : 0, e2 = e2 !== void 0 ? e2 : this._rowCount - 1, this._rowStart = this._rowStart !== void 0 ? Math.min(this._rowStart, t) : t, this._rowEnd = this._rowEnd !== void 0 ? Math.max(this._rowEnd, e2) : e2;
    let r = performance.now();
    if (r - this._lastRefreshMs >= this._debounceThresholdMS) this._lastRefreshMs = r, this._innerRefresh();
    else if (!this._additionalRefreshRequested) {
      let n = r - this._lastRefreshMs, o2 = this._debounceThresholdMS - n;
      this._additionalRefreshRequested = true, this._refreshTimeoutID = window.setTimeout(() => {
        this._lastRefreshMs = performance.now(), this._innerRefresh(), this._additionalRefreshRequested = false, this._refreshTimeoutID = void 0;
      }, o2);
    }
  }
  _innerRefresh() {
    if (this._rowStart === void 0 || this._rowEnd === void 0 || this._rowCount === void 0) return;
    let t = Math.max(this._rowStart, 0), e2 = Math.min(this._rowEnd, this._rowCount - 1);
    this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(t, e2);
  }
};
var xl = 20;
var wl = false;
var Tt = class extends D {
  constructor(e2, i, r, n) {
    super();
    this._terminal = e2;
    this._coreBrowserService = r;
    this._renderService = n;
    this._rowColumns = /* @__PURE__ */ new WeakMap();
    this._liveRegionLineCount = 0;
    this._charsToConsume = [];
    this._charsToAnnounce = "";
    let o2 = this._coreBrowserService.mainDocument;
    this._accessibilityContainer = o2.createElement("div"), this._accessibilityContainer.classList.add("xterm-accessibility"), this._rowContainer = o2.createElement("div"), this._rowContainer.setAttribute("role", "list"), this._rowContainer.classList.add("xterm-accessibility-tree"), this._rowElements = [];
    for (let l = 0; l < this._terminal.rows; l++) this._rowElements[l] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[l]);
    if (this._topBoundaryFocusListener = (l) => this._handleBoundaryFocus(l, 0), this._bottomBoundaryFocusListener = (l) => this._handleBoundaryFocus(l, 1), this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._accessibilityContainer.appendChild(this._rowContainer), this._liveRegion = o2.createElement("div"), this._liveRegion.classList.add("live-region"), this._liveRegion.setAttribute("aria-live", "assertive"), this._accessibilityContainer.appendChild(this._liveRegion), this._liveRegionDebouncer = this._register(new In(this._renderRows.bind(this))), !this._terminal.element) throw new Error("Cannot enable accessibility before Terminal.open");
    wl ? (this._accessibilityContainer.classList.add("debug"), this._rowContainer.classList.add("debug"), this._debugRootContainer = o2.createElement("div"), this._debugRootContainer.classList.add("xterm"), this._debugRootContainer.appendChild(o2.createTextNode("------start a11y------")), this._debugRootContainer.appendChild(this._accessibilityContainer), this._debugRootContainer.appendChild(o2.createTextNode("------end a11y------")), this._terminal.element.insertAdjacentElement("afterend", this._debugRootContainer)) : this._terminal.element.insertAdjacentElement("afterbegin", this._accessibilityContainer), this._register(this._terminal.onResize((l) => this._handleResize(l.rows))), this._register(this._terminal.onRender((l) => this._refreshRows(l.start, l.end))), this._register(this._terminal.onScroll(() => this._refreshRows())), this._register(this._terminal.onA11yChar((l) => this._handleChar(l))), this._register(this._terminal.onLineFeed(() => this._handleChar(`
`))), this._register(this._terminal.onA11yTab((l) => this._handleTab(l))), this._register(this._terminal.onKey((l) => this._handleKey(l.key))), this._register(this._terminal.onBlur(() => this._clearLiveRegion())), this._register(this._renderService.onDimensionsChange(() => this._refreshRowsDimensions())), this._register(L(o2, "selectionchange", () => this._handleSelectionChange())), this._register(this._coreBrowserService.onDprChange(() => this._refreshRowsDimensions())), this._refreshRowsDimensions(), this._refreshRows(), this._register(C(() => {
      wl ? this._debugRootContainer.remove() : this._accessibilityContainer.remove(), this._rowElements.length = 0;
    }));
  }
  _handleTab(e2) {
    for (let i = 0; i < e2; i++) this._handleChar(" ");
  }
  _handleChar(e2) {
    this._liveRegionLineCount < xl + 1 && (this._charsToConsume.length > 0 ? this._charsToConsume.shift() !== e2 && (this._charsToAnnounce += e2) : this._charsToAnnounce += e2, e2 === `
` && (this._liveRegionLineCount++, this._liveRegionLineCount === xl + 1 && (this._liveRegion.textContent += _i.get())));
  }
  _clearLiveRegion() {
    this._liveRegion.textContent = "", this._liveRegionLineCount = 0;
  }
  _handleKey(e2) {
    this._clearLiveRegion(), /\p{Control}/u.test(e2) || this._charsToConsume.push(e2);
  }
  _refreshRows(e2, i) {
    this._liveRegionDebouncer.refresh(e2, i, this._terminal.rows);
  }
  _renderRows(e2, i) {
    let r = this._terminal.buffer, n = r.lines.length.toString();
    for (let o2 = e2; o2 <= i; o2++) {
      let l = r.lines.get(r.ydisp + o2), a2 = [], u = l?.translateToString(true, void 0, void 0, a2) || "", h2 = (r.ydisp + o2 + 1).toString(), c2 = this._rowElements[o2];
      c2 && (u.length === 0 ? (c2.textContent = "\xA0", this._rowColumns.set(c2, [0, 1])) : (c2.textContent = u, this._rowColumns.set(c2, a2)), c2.setAttribute("aria-posinset", h2), c2.setAttribute("aria-setsize", n), this._alignRowWidth(c2));
    }
    this._announceCharacters();
  }
  _announceCharacters() {
    this._charsToAnnounce.length !== 0 && (this._liveRegion.textContent += this._charsToAnnounce, this._charsToAnnounce = "");
  }
  _handleBoundaryFocus(e2, i) {
    let r = e2.target, n = this._rowElements[i === 0 ? 1 : this._rowElements.length - 2], o2 = r.getAttribute("aria-posinset"), l = i === 0 ? "1" : `${this._terminal.buffer.lines.length}`;
    if (o2 === l || e2.relatedTarget !== n) return;
    let a2, u;
    if (i === 0 ? (a2 = r, u = this._rowElements.pop(), this._rowContainer.removeChild(u)) : (a2 = this._rowElements.shift(), u = r, this._rowContainer.removeChild(a2)), a2.removeEventListener("focus", this._topBoundaryFocusListener), u.removeEventListener("focus", this._bottomBoundaryFocusListener), i === 0) {
      let h2 = this._createAccessibilityTreeNode();
      this._rowElements.unshift(h2), this._rowContainer.insertAdjacentElement("afterbegin", h2);
    } else {
      let h2 = this._createAccessibilityTreeNode();
      this._rowElements.push(h2), this._rowContainer.appendChild(h2);
    }
    this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._terminal.scrollLines(i === 0 ? -1 : 1), this._rowElements[i === 0 ? 1 : this._rowElements.length - 2].focus(), e2.preventDefault(), e2.stopImmediatePropagation();
  }
  _handleSelectionChange() {
    if (this._rowElements.length === 0) return;
    let e2 = this._coreBrowserService.mainDocument.getSelection();
    if (!e2) return;
    if (e2.isCollapsed) {
      this._rowContainer.contains(e2.anchorNode) && this._terminal.clearSelection();
      return;
    }
    if (!e2.anchorNode || !e2.focusNode) {
      console.error("anchorNode and/or focusNode are null");
      return;
    }
    let i = { node: e2.anchorNode, offset: e2.anchorOffset }, r = { node: e2.focusNode, offset: e2.focusOffset };
    if ((i.node.compareDocumentPosition(r.node) & Node.DOCUMENT_POSITION_PRECEDING || i.node === r.node && i.offset > r.offset) && ([i, r] = [r, i]), i.node.compareDocumentPosition(this._rowElements[0]) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_FOLLOWING) && (i = { node: this._rowElements[0].childNodes[0], offset: 0 }), !this._rowContainer.contains(i.node)) return;
    let n = this._rowElements.slice(-1)[0];
    if (r.node.compareDocumentPosition(n) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_PRECEDING) && (r = { node: n, offset: n.textContent?.length ?? 0 }), !this._rowContainer.contains(r.node)) return;
    let o2 = ({ node: u, offset: h2 }) => {
      let c2 = u instanceof Text ? u.parentNode : u, d2 = parseInt(c2?.getAttribute("aria-posinset"), 10) - 1;
      if (isNaN(d2)) return console.warn("row is invalid. Race condition?"), null;
      let _2 = this._rowColumns.get(c2);
      if (!_2) return console.warn("columns is null. Race condition?"), null;
      let p = h2 < _2.length ? _2[h2] : _2.slice(-1)[0] + 1;
      return p >= this._terminal.cols && (++d2, p = 0), { row: d2, column: p };
    }, l = o2(i), a2 = o2(r);
    if (!(!l || !a2)) {
      if (l.row > a2.row || l.row === a2.row && l.column >= a2.column) throw new Error("invalid range");
      this._terminal.select(l.column, l.row, (a2.row - l.row) * this._terminal.cols - l.column + a2.column);
    }
  }
  _handleResize(e2) {
    this._rowElements[this._rowElements.length - 1].removeEventListener("focus", this._bottomBoundaryFocusListener);
    for (let i = this._rowContainer.children.length; i < this._terminal.rows; i++) this._rowElements[i] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[i]);
    for (; this._rowElements.length > e2; ) this._rowContainer.removeChild(this._rowElements.pop());
    this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions();
  }
  _createAccessibilityTreeNode() {
    let e2 = this._coreBrowserService.mainDocument.createElement("div");
    return e2.setAttribute("role", "listitem"), e2.tabIndex = -1, this._refreshRowDimensions(e2), e2;
  }
  _refreshRowsDimensions() {
    if (this._renderService.dimensions.css.cell.height) {
      Object.assign(this._accessibilityContainer.style, { width: `${this._renderService.dimensions.css.canvas.width}px`, fontSize: `${this._terminal.options.fontSize}px` }), this._rowElements.length !== this._terminal.rows && this._handleResize(this._terminal.rows);
      for (let e2 = 0; e2 < this._terminal.rows; e2++) this._refreshRowDimensions(this._rowElements[e2]), this._alignRowWidth(this._rowElements[e2]);
    }
  }
  _refreshRowDimensions(e2) {
    e2.style.height = `${this._renderService.dimensions.css.cell.height}px`;
  }
  _alignRowWidth(e2) {
    e2.style.transform = "";
    let i = e2.getBoundingClientRect().width, r = this._rowColumns.get(e2)?.slice(-1)?.[0];
    if (!r) return;
    let n = r * this._renderService.dimensions.css.cell.width;
    e2.style.transform = `scaleX(${n / i})`;
  }
};
Tt = M2([S(1, xt), S(2, ae), S(3, ce)], Tt);
var hi = class extends D {
  constructor(e2, i, r, n, o2) {
    super();
    this._element = e2;
    this._mouseService = i;
    this._renderService = r;
    this._bufferService = n;
    this._linkProviderService = o2;
    this._linkCacheDisposables = [];
    this._isMouseOut = true;
    this._wasResized = false;
    this._activeLine = -1;
    this._onShowLinkUnderline = this._register(new v());
    this.onShowLinkUnderline = this._onShowLinkUnderline.event;
    this._onHideLinkUnderline = this._register(new v());
    this.onHideLinkUnderline = this._onHideLinkUnderline.event;
    this._register(C(() => {
      Ne(this._linkCacheDisposables), this._linkCacheDisposables.length = 0, this._lastMouseEvent = void 0, this._activeProviderReplies?.clear();
    })), this._register(this._bufferService.onResize(() => {
      this._clearCurrentLink(), this._wasResized = true;
    })), this._register(L(this._element, "mouseleave", () => {
      this._isMouseOut = true, this._clearCurrentLink();
    })), this._register(L(this._element, "mousemove", this._handleMouseMove.bind(this))), this._register(L(this._element, "mousedown", this._handleMouseDown.bind(this))), this._register(L(this._element, "mouseup", this._handleMouseUp.bind(this)));
  }
  get currentLink() {
    return this._currentLink;
  }
  _handleMouseMove(e2) {
    this._lastMouseEvent = e2;
    let i = this._positionFromMouseEvent(e2, this._element, this._mouseService);
    if (!i) return;
    this._isMouseOut = false;
    let r = e2.composedPath();
    for (let n = 0; n < r.length; n++) {
      let o2 = r[n];
      if (o2.classList.contains("xterm")) break;
      if (o2.classList.contains("xterm-hover")) return;
    }
    (!this._lastBufferCell || i.x !== this._lastBufferCell.x || i.y !== this._lastBufferCell.y) && (this._handleHover(i), this._lastBufferCell = i);
  }
  _handleHover(e2) {
    if (this._activeLine !== e2.y || this._wasResized) {
      this._clearCurrentLink(), this._askForLink(e2, false), this._wasResized = false;
      return;
    }
    this._currentLink && this._linkAtPosition(this._currentLink.link, e2) || (this._clearCurrentLink(), this._askForLink(e2, true));
  }
  _askForLink(e2, i) {
    (!this._activeProviderReplies || !i) && (this._activeProviderReplies?.forEach((n) => {
      n?.forEach((o2) => {
        o2.link.dispose && o2.link.dispose();
      });
    }), this._activeProviderReplies = /* @__PURE__ */ new Map(), this._activeLine = e2.y);
    let r = false;
    for (let [n, o2] of this._linkProviderService.linkProviders.entries()) i ? this._activeProviderReplies?.get(n) && (r = this._checkLinkProviderResult(n, e2, r)) : o2.provideLinks(e2.y, (l) => {
      if (this._isMouseOut) return;
      let a2 = l?.map((u) => ({ link: u }));
      this._activeProviderReplies?.set(n, a2), r = this._checkLinkProviderResult(n, e2, r), this._activeProviderReplies?.size === this._linkProviderService.linkProviders.length && this._removeIntersectingLinks(e2.y, this._activeProviderReplies);
    });
  }
  _removeIntersectingLinks(e2, i) {
    let r = /* @__PURE__ */ new Set();
    for (let n = 0; n < i.size; n++) {
      let o2 = i.get(n);
      if (o2) for (let l = 0; l < o2.length; l++) {
        let a2 = o2[l], u = a2.link.range.start.y < e2 ? 0 : a2.link.range.start.x, h2 = a2.link.range.end.y > e2 ? this._bufferService.cols : a2.link.range.end.x;
        for (let c2 = u; c2 <= h2; c2++) {
          if (r.has(c2)) {
            o2.splice(l--, 1);
            break;
          }
          r.add(c2);
        }
      }
    }
  }
  _checkLinkProviderResult(e2, i, r) {
    if (!this._activeProviderReplies) return r;
    let n = this._activeProviderReplies.get(e2), o2 = false;
    for (let l = 0; l < e2; l++) (!this._activeProviderReplies.has(l) || this._activeProviderReplies.get(l)) && (o2 = true);
    if (!o2 && n) {
      let l = n.find((a2) => this._linkAtPosition(a2.link, i));
      l && (r = true, this._handleNewLink(l));
    }
    if (this._activeProviderReplies.size === this._linkProviderService.linkProviders.length && !r) for (let l = 0; l < this._activeProviderReplies.size; l++) {
      let a2 = this._activeProviderReplies.get(l)?.find((u) => this._linkAtPosition(u.link, i));
      if (a2) {
        r = true, this._handleNewLink(a2);
        break;
      }
    }
    return r;
  }
  _handleMouseDown() {
    this._mouseDownLink = this._currentLink;
  }
  _handleMouseUp(e2) {
    if (!this._currentLink) return;
    let i = this._positionFromMouseEvent(e2, this._element, this._mouseService);
    i && this._mouseDownLink && Ec(this._mouseDownLink.link, this._currentLink.link) && this._linkAtPosition(this._currentLink.link, i) && this._currentLink.link.activate(e2, this._currentLink.link.text);
  }
  _clearCurrentLink(e2, i) {
    !this._currentLink || !this._lastMouseEvent || (!e2 || !i || this._currentLink.link.range.start.y >= e2 && this._currentLink.link.range.end.y <= i) && (this._linkLeave(this._element, this._currentLink.link, this._lastMouseEvent), this._currentLink = void 0, Ne(this._linkCacheDisposables), this._linkCacheDisposables.length = 0);
  }
  _handleNewLink(e2) {
    if (!this._lastMouseEvent) return;
    let i = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
    i && this._linkAtPosition(e2.link, i) && (this._currentLink = e2, this._currentLink.state = { decorations: { underline: e2.link.decorations === void 0 ? true : e2.link.decorations.underline, pointerCursor: e2.link.decorations === void 0 ? true : e2.link.decorations.pointerCursor }, isHovered: true }, this._linkHover(this._element, e2.link, this._lastMouseEvent), e2.link.decorations = {}, Object.defineProperties(e2.link.decorations, { pointerCursor: { get: () => this._currentLink?.state?.decorations.pointerCursor, set: (r) => {
      this._currentLink?.state && this._currentLink.state.decorations.pointerCursor !== r && (this._currentLink.state.decorations.pointerCursor = r, this._currentLink.state.isHovered && this._element.classList.toggle("xterm-cursor-pointer", r));
    } }, underline: { get: () => this._currentLink?.state?.decorations.underline, set: (r) => {
      this._currentLink?.state && this._currentLink?.state?.decorations.underline !== r && (this._currentLink.state.decorations.underline = r, this._currentLink.state.isHovered && this._fireUnderlineEvent(e2.link, r));
    } } }), this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange((r) => {
      if (!this._currentLink) return;
      let n = r.start === 0 ? 0 : r.start + 1 + this._bufferService.buffer.ydisp, o2 = this._bufferService.buffer.ydisp + 1 + r.end;
      if (this._currentLink.link.range.start.y >= n && this._currentLink.link.range.end.y <= o2 && (this._clearCurrentLink(n, o2), this._lastMouseEvent)) {
        let l = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
        l && this._askForLink(l, false);
      }
    })));
  }
  _linkHover(e2, i, r) {
    this._currentLink?.state && (this._currentLink.state.isHovered = true, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(i, true), this._currentLink.state.decorations.pointerCursor && e2.classList.add("xterm-cursor-pointer")), i.hover && i.hover(r, i.text);
  }
  _fireUnderlineEvent(e2, i) {
    let r = e2.range, n = this._bufferService.buffer.ydisp, o2 = this._createLinkUnderlineEvent(r.start.x - 1, r.start.y - n - 1, r.end.x, r.end.y - n - 1, void 0);
    (i ? this._onShowLinkUnderline : this._onHideLinkUnderline).fire(o2);
  }
  _linkLeave(e2, i, r) {
    this._currentLink?.state && (this._currentLink.state.isHovered = false, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(i, false), this._currentLink.state.decorations.pointerCursor && e2.classList.remove("xterm-cursor-pointer")), i.leave && i.leave(r, i.text);
  }
  _linkAtPosition(e2, i) {
    let r = e2.range.start.y * this._bufferService.cols + e2.range.start.x, n = e2.range.end.y * this._bufferService.cols + e2.range.end.x, o2 = i.y * this._bufferService.cols + i.x;
    return r <= o2 && o2 <= n;
  }
  _positionFromMouseEvent(e2, i, r) {
    let n = r.getCoords(e2, i, this._bufferService.cols, this._bufferService.rows);
    if (n) return { x: n[0], y: n[1] + this._bufferService.buffer.ydisp };
  }
  _createLinkUnderlineEvent(e2, i, r, n, o2) {
    return { x1: e2, y1: i, x2: r, y2: n, cols: this._bufferService.cols, fg: o2 };
  }
};
hi = M2([S(1, Dt), S(2, ce), S(3, F), S(4, lr)], hi);
function Ec(s15, t) {
  return s15.text === t.text && s15.range.start.x === t.range.start.x && s15.range.start.y === t.range.start.y && s15.range.end.x === t.range.end.x && s15.range.end.y === t.range.end.y;
}
var yn = class extends Sn {
  constructor(e2 = {}) {
    super(e2);
    this._linkifier = this._register(new ye());
    this.browser = tn;
    this._keyDownHandled = false;
    this._keyDownSeen = false;
    this._keyPressHandled = false;
    this._unprocessedDeadKey = false;
    this._accessibilityManager = this._register(new ye());
    this._onCursorMove = this._register(new v());
    this.onCursorMove = this._onCursorMove.event;
    this._onKey = this._register(new v());
    this.onKey = this._onKey.event;
    this._onRender = this._register(new v());
    this.onRender = this._onRender.event;
    this._onSelectionChange = this._register(new v());
    this.onSelectionChange = this._onSelectionChange.event;
    this._onTitleChange = this._register(new v());
    this.onTitleChange = this._onTitleChange.event;
    this._onBell = this._register(new v());
    this.onBell = this._onBell.event;
    this._onFocus = this._register(new v());
    this._onBlur = this._register(new v());
    this._onA11yCharEmitter = this._register(new v());
    this._onA11yTabEmitter = this._register(new v());
    this._onWillOpen = this._register(new v());
    this._setup(), this._decorationService = this._instantiationService.createInstance(Tn), this._instantiationService.setService(Be, this._decorationService), this._linkProviderService = this._instantiationService.createInstance(Qr), this._instantiationService.setService(lr, this._linkProviderService), this._linkProviderService.registerLinkProvider(this._instantiationService.createInstance(wt)), this._register(this._inputHandler.onRequestBell(() => this._onBell.fire())), this._register(this._inputHandler.onRequestRefreshRows((i) => this.refresh(i?.start ?? 0, i?.end ?? this.rows - 1))), this._register(this._inputHandler.onRequestSendFocus(() => this._reportFocus())), this._register(this._inputHandler.onRequestReset(() => this.reset())), this._register(this._inputHandler.onRequestWindowsOptionsReport((i) => this._reportWindowsOptions(i))), this._register(this._inputHandler.onColor((i) => this._handleColorEvent(i))), this._register($.forward(this._inputHandler.onCursorMove, this._onCursorMove)), this._register($.forward(this._inputHandler.onTitleChange, this._onTitleChange)), this._register($.forward(this._inputHandler.onA11yChar, this._onA11yCharEmitter)), this._register($.forward(this._inputHandler.onA11yTab, this._onA11yTabEmitter)), this._register(this._bufferService.onResize((i) => this._afterResize(i.cols, i.rows))), this._register(C(() => {
      this._customKeyEventHandler = void 0, this.element?.parentNode?.removeChild(this.element);
    }));
  }
  get linkifier() {
    return this._linkifier.value;
  }
  get onFocus() {
    return this._onFocus.event;
  }
  get onBlur() {
    return this._onBlur.event;
  }
  get onA11yChar() {
    return this._onA11yCharEmitter.event;
  }
  get onA11yTab() {
    return this._onA11yTabEmitter.event;
  }
  get onWillOpen() {
    return this._onWillOpen.event;
  }
  _handleColorEvent(e2) {
    if (this._themeService) for (let i of e2) {
      let r, n = "";
      switch (i.index) {
        case 256:
          r = "foreground", n = "10";
          break;
        case 257:
          r = "background", n = "11";
          break;
        case 258:
          r = "cursor", n = "12";
          break;
        default:
          r = "ansi", n = "4;" + i.index;
      }
      switch (i.type) {
        case 0:
          let o2 = U.toColorRGB(r === "ansi" ? this._themeService.colors.ansi[i.index] : this._themeService.colors[r]);
          this.coreService.triggerDataEvent(`${b2.ESC}]${n};${ml(o2)}${fs.ST}`);
          break;
        case 1:
          if (r === "ansi") this._themeService.modifyColors((l) => l.ansi[i.index] = j.toColor(...i.color));
          else {
            let l = r;
            this._themeService.modifyColors((a2) => a2[l] = j.toColor(...i.color));
          }
          break;
        case 2:
          this._themeService.restoreColor(i.index);
          break;
      }
    }
  }
  _setup() {
    super._setup(), this._customKeyEventHandler = void 0;
  }
  get buffer() {
    return this.buffers.active;
  }
  focus() {
    this.textarea && this.textarea.focus({ preventScroll: true });
  }
  _handleScreenReaderModeOptionChange(e2) {
    e2 ? !this._accessibilityManager.value && this._renderService && (this._accessibilityManager.value = this._instantiationService.createInstance(Tt, this)) : this._accessibilityManager.clear();
  }
  _handleTextAreaFocus(e2) {
    this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(b2.ESC + "[I"), this.element.classList.add("focus"), this._showCursor(), this._onFocus.fire();
  }
  blur() {
    return this.textarea?.blur();
  }
  _handleTextAreaBlur() {
    this.textarea.value = "", this.refresh(this.buffer.y, this.buffer.y), this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(b2.ESC + "[O"), this.element.classList.remove("focus"), this._onBlur.fire();
  }
  _syncTextArea() {
    if (!this.textarea || !this.buffer.isCursorInViewport || this._compositionHelper.isComposing || !this._renderService) return;
    let e2 = this.buffer.ybase + this.buffer.y, i = this.buffer.lines.get(e2);
    if (!i) return;
    let r = Math.min(this.buffer.x, this.cols - 1), n = this._renderService.dimensions.css.cell.height, o2 = i.getWidth(r), l = this._renderService.dimensions.css.cell.width * o2, a2 = this.buffer.y * this._renderService.dimensions.css.cell.height, u = r * this._renderService.dimensions.css.cell.width;
    this.textarea.style.left = u + "px", this.textarea.style.top = a2 + "px", this.textarea.style.width = l + "px", this.textarea.style.height = n + "px", this.textarea.style.lineHeight = n + "px", this.textarea.style.zIndex = "-5";
  }
  _initGlobal() {
    this._bindKeys(), this._register(L(this.element, "copy", (i) => {
      this.hasSelection() && Vs(i, this._selectionService);
    }));
    let e2 = (i) => qs(i, this.textarea, this.coreService, this.optionsService);
    this._register(L(this.textarea, "paste", e2)), this._register(L(this.element, "paste", e2)), Ss ? this._register(L(this.element, "mousedown", (i) => {
      i.button === 2 && Pn(i, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
    })) : this._register(L(this.element, "contextmenu", (i) => {
      Pn(i, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
    })), Bi && this._register(L(this.element, "auxclick", (i) => {
      i.button === 1 && Mn(i, this.textarea, this.screenElement);
    }));
  }
  _bindKeys() {
    this._register(L(this.textarea, "keyup", (e2) => this._keyUp(e2), true)), this._register(L(this.textarea, "keydown", (e2) => this._keyDown(e2), true)), this._register(L(this.textarea, "keypress", (e2) => this._keyPress(e2), true)), this._register(L(this.textarea, "compositionstart", () => this._compositionHelper.compositionstart())), this._register(L(this.textarea, "compositionupdate", (e2) => this._compositionHelper.compositionupdate(e2))), this._register(L(this.textarea, "compositionend", () => this._compositionHelper.compositionend())), this._register(L(this.textarea, "input", (e2) => this._inputEvent(e2), true)), this._register(this.onRender(() => this._compositionHelper.updateCompositionElements()));
  }
  open(e2) {
    if (!e2) throw new Error("Terminal requires a parent element.");
    if (e2.isConnected || this._logService.debug("Terminal.open was called on an element that was not attached to the DOM"), this.element?.ownerDocument.defaultView && this._coreBrowserService) {
      this.element.ownerDocument.defaultView !== this._coreBrowserService.window && (this._coreBrowserService.window = this.element.ownerDocument.defaultView);
      return;
    }
    this._document = e2.ownerDocument, this.options.documentOverride && this.options.documentOverride instanceof Document && (this._document = this.optionsService.rawOptions.documentOverride), this.element = this._document.createElement("div"), this.element.dir = "ltr", this.element.classList.add("terminal"), this.element.classList.add("xterm"), e2.appendChild(this.element);
    let i = this._document.createDocumentFragment();
    this._viewportElement = this._document.createElement("div"), this._viewportElement.classList.add("xterm-viewport"), i.appendChild(this._viewportElement), this.screenElement = this._document.createElement("div"), this.screenElement.classList.add("xterm-screen"), this._register(L(this.screenElement, "mousemove", (o2) => this.updateCursorStyle(o2))), this._helperContainer = this._document.createElement("div"), this._helperContainer.classList.add("xterm-helpers"), this.screenElement.appendChild(this._helperContainer), i.appendChild(this.screenElement);
    let r = this.textarea = this._document.createElement("textarea");
    this.textarea.classList.add("xterm-helper-textarea"), this.textarea.setAttribute("aria-label", mi.get()), Ts || this.textarea.setAttribute("aria-multiline", "false"), this.textarea.setAttribute("autocorrect", "off"), this.textarea.setAttribute("autocapitalize", "off"), this.textarea.setAttribute("spellcheck", "false"), this.textarea.tabIndex = 0, this._register(this.optionsService.onSpecificOptionChange("disableStdin", () => r.readOnly = this.optionsService.rawOptions.disableStdin)), this.textarea.readOnly = this.optionsService.rawOptions.disableStdin, this._coreBrowserService = this._register(this._instantiationService.createInstance(Jr, this.textarea, e2.ownerDocument.defaultView ?? window, this._document ?? typeof window < "u" ? window.document : null)), this._instantiationService.setService(ae, this._coreBrowserService), this._register(L(this.textarea, "focus", (o2) => this._handleTextAreaFocus(o2))), this._register(L(this.textarea, "blur", () => this._handleTextAreaBlur())), this._helperContainer.appendChild(this.textarea), this._charSizeService = this._instantiationService.createInstance(jt, this._document, this._helperContainer), this._instantiationService.setService(nt, this._charSizeService), this._themeService = this._instantiationService.createInstance(ti), this._instantiationService.setService(Re, this._themeService), this._characterJoinerService = this._instantiationService.createInstance(ct), this._instantiationService.setService(or, this._characterJoinerService), this._renderService = this._register(this._instantiationService.createInstance(Qt, this.rows, this.screenElement)), this._instantiationService.setService(ce, this._renderService), this._register(this._renderService.onRenderedViewportChange((o2) => this._onRender.fire(o2))), this.onResize((o2) => this._renderService.resize(o2.cols, o2.rows)), this._compositionView = this._document.createElement("div"), this._compositionView.classList.add("composition-view"), this._compositionHelper = this._instantiationService.createInstance($t, this.textarea, this._compositionView), this._helperContainer.appendChild(this._compositionView), this._mouseService = this._instantiationService.createInstance(Xt), this._instantiationService.setService(Dt, this._mouseService);
    let n = this._linkifier.value = this._register(this._instantiationService.createInstance(hi, this.screenElement));
    this.element.appendChild(i);
    try {
      this._onWillOpen.fire(this.element);
    } catch {
    }
    this._renderService.hasRenderer() || this._renderService.setRenderer(this._createRenderer()), this._register(this.onCursorMove(() => {
      this._renderService.handleCursorMove(), this._syncTextArea();
    })), this._register(this.onResize(() => this._renderService.handleResize(this.cols, this.rows))), this._register(this.onBlur(() => this._renderService.handleBlur())), this._register(this.onFocus(() => this._renderService.handleFocus())), this._viewport = this._register(this._instantiationService.createInstance(zt, this.element, this.screenElement)), this._register(this._viewport.onRequestScrollLines((o2) => {
      super.scrollLines(o2, false), this.refresh(0, this.rows - 1);
    })), this._selectionService = this._register(this._instantiationService.createInstance(ei, this.element, this.screenElement, n)), this._instantiationService.setService(Qs, this._selectionService), this._register(this._selectionService.onRequestScrollLines((o2) => this.scrollLines(o2.amount, o2.suppressScrollEvent))), this._register(this._selectionService.onSelectionChange(() => this._onSelectionChange.fire())), this._register(this._selectionService.onRequestRedraw((o2) => this._renderService.handleSelectionChanged(o2.start, o2.end, o2.columnSelectMode))), this._register(this._selectionService.onLinuxMouseSelection((o2) => {
      this.textarea.value = o2, this.textarea.focus(), this.textarea.select();
    })), this._register($.any(this._onScroll.event, this._inputHandler.onScroll)(() => {
      this._selectionService.refresh(), this._viewport?.queueSync();
    })), this._register(this._instantiationService.createInstance(Gt, this.screenElement)), this._register(L(this.element, "mousedown", (o2) => this._selectionService.handleMouseDown(o2))), this.coreMouseService.areMouseEventsActive ? (this._selectionService.disable(), this.element.classList.add("enable-mouse-events")) : this._selectionService.enable(), this.options.screenReaderMode && (this._accessibilityManager.value = this._instantiationService.createInstance(Tt, this)), this._register(this.optionsService.onSpecificOptionChange("screenReaderMode", (o2) => this._handleScreenReaderModeOptionChange(o2))), this.options.overviewRuler.width && (this._overviewRulerRenderer = this._register(this._instantiationService.createInstance(bt, this._viewportElement, this.screenElement))), this.optionsService.onSpecificOptionChange("overviewRuler", (o2) => {
      !this._overviewRulerRenderer && o2 && this._viewportElement && this.screenElement && (this._overviewRulerRenderer = this._register(this._instantiationService.createInstance(bt, this._viewportElement, this.screenElement)));
    }), this._charSizeService.measure(), this.refresh(0, this.rows - 1), this._initGlobal(), this.bindMouse();
  }
  _createRenderer() {
    return this._instantiationService.createInstance(Yt, this, this._document, this.element, this.screenElement, this._viewportElement, this._helperContainer, this.linkifier);
  }
  bindMouse() {
    let e2 = this, i = this.element;
    function r(l) {
      let a2 = e2._mouseService.getMouseReportCoords(l, e2.screenElement);
      if (!a2) return false;
      let u, h2;
      switch (l.overrideType || l.type) {
        case "mousemove":
          h2 = 32, l.buttons === void 0 ? (u = 3, l.button !== void 0 && (u = l.button < 3 ? l.button : 3)) : u = l.buttons & 1 ? 0 : l.buttons & 4 ? 1 : l.buttons & 2 ? 2 : 3;
          break;
        case "mouseup":
          h2 = 0, u = l.button < 3 ? l.button : 3;
          break;
        case "mousedown":
          h2 = 1, u = l.button < 3 ? l.button : 3;
          break;
        case "wheel":
          if (e2._customWheelEventHandler && e2._customWheelEventHandler(l) === false) return false;
          let c2 = l.deltaY;
          if (c2 === 0 || e2.coreMouseService.consumeWheelEvent(l, e2._renderService?.dimensions?.device?.cell?.height, e2._coreBrowserService?.dpr) === 0) return false;
          h2 = c2 < 0 ? 0 : 1, u = 4;
          break;
        default:
          return false;
      }
      return h2 === void 0 || u === void 0 || u > 4 ? false : e2.coreMouseService.triggerMouseEvent({ col: a2.col, row: a2.row, x: a2.x, y: a2.y, button: u, action: h2, ctrl: l.ctrlKey, alt: l.altKey, shift: l.shiftKey });
    }
    let n = { mouseup: null, wheel: null, mousedrag: null, mousemove: null }, o2 = { mouseup: (l) => (r(l), l.buttons || (this._document.removeEventListener("mouseup", n.mouseup), n.mousedrag && this._document.removeEventListener("mousemove", n.mousedrag)), this.cancel(l)), wheel: (l) => (r(l), this.cancel(l, true)), mousedrag: (l) => {
      l.buttons && r(l);
    }, mousemove: (l) => {
      l.buttons || r(l);
    } };
    this._register(this.coreMouseService.onProtocolChange((l) => {
      l ? (this.optionsService.rawOptions.logLevel === "debug" && this._logService.debug("Binding to mouse events:", this.coreMouseService.explainEvents(l)), this.element.classList.add("enable-mouse-events"), this._selectionService.disable()) : (this._logService.debug("Unbinding from mouse events."), this.element.classList.remove("enable-mouse-events"), this._selectionService.enable()), l & 8 ? n.mousemove || (i.addEventListener("mousemove", o2.mousemove), n.mousemove = o2.mousemove) : (i.removeEventListener("mousemove", n.mousemove), n.mousemove = null), l & 16 ? n.wheel || (i.addEventListener("wheel", o2.wheel, { passive: false }), n.wheel = o2.wheel) : (i.removeEventListener("wheel", n.wheel), n.wheel = null), l & 2 ? n.mouseup || (n.mouseup = o2.mouseup) : (this._document.removeEventListener("mouseup", n.mouseup), n.mouseup = null), l & 4 ? n.mousedrag || (n.mousedrag = o2.mousedrag) : (this._document.removeEventListener("mousemove", n.mousedrag), n.mousedrag = null);
    })), this.coreMouseService.activeProtocol = this.coreMouseService.activeProtocol, this._register(L(i, "mousedown", (l) => {
      if (l.preventDefault(), this.focus(), !(!this.coreMouseService.areMouseEventsActive || this._selectionService.shouldForceSelection(l))) return r(l), n.mouseup && this._document.addEventListener("mouseup", n.mouseup), n.mousedrag && this._document.addEventListener("mousemove", n.mousedrag), this.cancel(l);
    })), this._register(L(i, "wheel", (l) => {
      if (!n.wheel) {
        if (this._customWheelEventHandler && this._customWheelEventHandler(l) === false) return false;
        if (!this.buffer.hasScrollback) {
          if (l.deltaY === 0) return false;
          if (e2.coreMouseService.consumeWheelEvent(l, e2._renderService?.dimensions?.device?.cell?.height, e2._coreBrowserService?.dpr) === 0) return this.cancel(l, true);
          let h2 = b2.ESC + (this.coreService.decPrivateModes.applicationCursorKeys ? "O" : "[") + (l.deltaY < 0 ? "A" : "B");
          return this.coreService.triggerDataEvent(h2, true), this.cancel(l, true);
        }
      }
    }, { passive: false }));
  }
  refresh(e2, i) {
    this._renderService?.refreshRows(e2, i);
  }
  updateCursorStyle(e2) {
    this._selectionService?.shouldColumnSelect(e2) ? this.element.classList.add("column-select") : this.element.classList.remove("column-select");
  }
  _showCursor() {
    this.coreService.isCursorInitialized || (this.coreService.isCursorInitialized = true, this.refresh(this.buffer.y, this.buffer.y));
  }
  scrollLines(e2, i) {
    this._viewport ? this._viewport.scrollLines(e2) : super.scrollLines(e2, i), this.refresh(0, this.rows - 1);
  }
  scrollPages(e2) {
    this.scrollLines(e2 * (this.rows - 1));
  }
  scrollToTop() {
    this.scrollLines(-this._bufferService.buffer.ydisp);
  }
  scrollToBottom(e2) {
    e2 && this._viewport ? this._viewport.scrollToLine(this.buffer.ybase, true) : this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
  }
  scrollToLine(e2) {
    let i = e2 - this._bufferService.buffer.ydisp;
    i !== 0 && this.scrollLines(i);
  }
  paste(e2) {
    Cn(e2, this.textarea, this.coreService, this.optionsService);
  }
  attachCustomKeyEventHandler(e2) {
    this._customKeyEventHandler = e2;
  }
  attachCustomWheelEventHandler(e2) {
    this._customWheelEventHandler = e2;
  }
  registerLinkProvider(e2) {
    return this._linkProviderService.registerLinkProvider(e2);
  }
  registerCharacterJoiner(e2) {
    if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
    let i = this._characterJoinerService.register(e2);
    return this.refresh(0, this.rows - 1), i;
  }
  deregisterCharacterJoiner(e2) {
    if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
    this._characterJoinerService.deregister(e2) && this.refresh(0, this.rows - 1);
  }
  get markers() {
    return this.buffer.markers;
  }
  registerMarker(e2) {
    return this.buffer.addMarker(this.buffer.ybase + this.buffer.y + e2);
  }
  registerDecoration(e2) {
    return this._decorationService.registerDecoration(e2);
  }
  hasSelection() {
    return this._selectionService ? this._selectionService.hasSelection : false;
  }
  select(e2, i, r) {
    this._selectionService.setSelection(e2, i, r);
  }
  getSelection() {
    return this._selectionService ? this._selectionService.selectionText : "";
  }
  getSelectionPosition() {
    if (!(!this._selectionService || !this._selectionService.hasSelection)) return { start: { x: this._selectionService.selectionStart[0], y: this._selectionService.selectionStart[1] }, end: { x: this._selectionService.selectionEnd[0], y: this._selectionService.selectionEnd[1] } };
  }
  clearSelection() {
    this._selectionService?.clearSelection();
  }
  selectAll() {
    this._selectionService?.selectAll();
  }
  selectLines(e2, i) {
    this._selectionService?.selectLines(e2, i);
  }
  _keyDown(e2) {
    if (this._keyDownHandled = false, this._keyDownSeen = true, this._customKeyEventHandler && this._customKeyEventHandler(e2) === false) return false;
    let i = this.browser.isMac && this.options.macOptionIsMeta && e2.altKey;
    if (!i && !this._compositionHelper.keydown(e2)) return this.options.scrollOnUserInput && this.buffer.ybase !== this.buffer.ydisp && this.scrollToBottom(true), false;
    !i && (e2.key === "Dead" || e2.key === "AltGraph") && (this._unprocessedDeadKey = true);
    let r = Il(e2, this.coreService.decPrivateModes.applicationCursorKeys, this.browser.isMac, this.options.macOptionIsMeta);
    if (this.updateCursorStyle(e2), r.type === 3 || r.type === 2) {
      let n = this.rows - 1;
      return this.scrollLines(r.type === 2 ? -n : n), this.cancel(e2, true);
    }
    if (r.type === 1 && this.selectAll(), this._isThirdLevelShift(this.browser, e2) || (r.cancel && this.cancel(e2, true), !r.key) || e2.key && !e2.ctrlKey && !e2.altKey && !e2.metaKey && e2.key.length === 1 && e2.key.charCodeAt(0) >= 65 && e2.key.charCodeAt(0) <= 90) return true;
    if (this._unprocessedDeadKey) return this._unprocessedDeadKey = false, true;
    if ((r.key === b2.ETX || r.key === b2.CR) && (this.textarea.value = ""), this._onKey.fire({ key: r.key, domEvent: e2 }), this._showCursor(), this.coreService.triggerDataEvent(r.key, true), !this.optionsService.rawOptions.screenReaderMode || e2.altKey || e2.ctrlKey) return this.cancel(e2, true);
    this._keyDownHandled = true;
  }
  _isThirdLevelShift(e2, i) {
    let r = e2.isMac && !this.options.macOptionIsMeta && i.altKey && !i.ctrlKey && !i.metaKey || e2.isWindows && i.altKey && i.ctrlKey && !i.metaKey || e2.isWindows && i.getModifierState("AltGraph");
    return i.type === "keypress" ? r : r && (!i.keyCode || i.keyCode > 47);
  }
  _keyUp(e2) {
    this._keyDownSeen = false, !(this._customKeyEventHandler && this._customKeyEventHandler(e2) === false) && (Tc(e2) || this.focus(), this.updateCursorStyle(e2), this._keyPressHandled = false);
  }
  _keyPress(e2) {
    let i;
    if (this._keyPressHandled = false, this._keyDownHandled || this._customKeyEventHandler && this._customKeyEventHandler(e2) === false) return false;
    if (this.cancel(e2), e2.charCode) i = e2.charCode;
    else if (e2.which === null || e2.which === void 0) i = e2.keyCode;
    else if (e2.which !== 0 && e2.charCode !== 0) i = e2.which;
    else return false;
    return !i || (e2.altKey || e2.ctrlKey || e2.metaKey) && !this._isThirdLevelShift(this.browser, e2) ? false : (i = String.fromCharCode(i), this._onKey.fire({ key: i, domEvent: e2 }), this._showCursor(), this.coreService.triggerDataEvent(i, true), this._keyPressHandled = true, this._unprocessedDeadKey = false, true);
  }
  _inputEvent(e2) {
    if (e2.data && e2.inputType === "insertText" && (!e2.composed || !this._keyDownSeen) && !this.optionsService.rawOptions.screenReaderMode) {
      if (this._keyPressHandled) return false;
      this._unprocessedDeadKey = false;
      let i = e2.data;
      return this.coreService.triggerDataEvent(i, true), this.cancel(e2), true;
    }
    return false;
  }
  resize(e2, i) {
    if (e2 === this.cols && i === this.rows) {
      this._charSizeService && !this._charSizeService.hasValidSize && this._charSizeService.measure();
      return;
    }
    super.resize(e2, i);
  }
  _afterResize(e2, i) {
    this._charSizeService?.measure();
  }
  clear() {
    if (!(this.buffer.ybase === 0 && this.buffer.y === 0)) {
      this.buffer.clearAllMarkers(), this.buffer.lines.set(0, this.buffer.lines.get(this.buffer.ybase + this.buffer.y)), this.buffer.lines.length = 1, this.buffer.ydisp = 0, this.buffer.ybase = 0, this.buffer.y = 0;
      for (let e2 = 1; e2 < this.rows; e2++) this.buffer.lines.push(this.buffer.getBlankLine(X2));
      this._onScroll.fire({ position: this.buffer.ydisp }), this.refresh(0, this.rows - 1);
    }
  }
  reset() {
    this.options.rows = this.rows, this.options.cols = this.cols;
    let e2 = this._customKeyEventHandler;
    this._setup(), super.reset(), this._selectionService?.reset(), this._decorationService.reset(), this._customKeyEventHandler = e2, this.refresh(0, this.rows - 1);
  }
  clearTextureAtlas() {
    this._renderService?.clearTextureAtlas();
  }
  _reportFocus() {
    this.element?.classList.contains("focus") ? this.coreService.triggerDataEvent(b2.ESC + "[I") : this.coreService.triggerDataEvent(b2.ESC + "[O");
  }
  _reportWindowsOptions(e2) {
    if (this._renderService) switch (e2) {
      case 0:
        let i = this._renderService.dimensions.css.canvas.width.toFixed(0), r = this._renderService.dimensions.css.canvas.height.toFixed(0);
        this.coreService.triggerDataEvent(`${b2.ESC}[4;${r};${i}t`);
        break;
      case 1:
        let n = this._renderService.dimensions.css.cell.width.toFixed(0), o2 = this._renderService.dimensions.css.cell.height.toFixed(0);
        this.coreService.triggerDataEvent(`${b2.ESC}[6;${o2};${n}t`);
        break;
    }
  }
  cancel(e2, i) {
    if (!(!this.options.cancelEvents && !i)) return e2.preventDefault(), e2.stopPropagation(), false;
  }
};
function Tc(s15) {
  return s15.keyCode === 16 || s15.keyCode === 17 || s15.keyCode === 18;
}
var xn = class {
  constructor() {
    this._addons = [];
  }
  dispose() {
    for (let t = this._addons.length - 1; t >= 0; t--) this._addons[t].instance.dispose();
  }
  loadAddon(t, e2) {
    let i = { instance: e2, dispose: e2.dispose, isDisposed: false };
    this._addons.push(i), e2.dispose = () => this._wrappedAddonDispose(i), e2.activate(t);
  }
  _wrappedAddonDispose(t) {
    if (t.isDisposed) return;
    let e2 = -1;
    for (let i = 0; i < this._addons.length; i++) if (this._addons[i] === t) {
      e2 = i;
      break;
    }
    if (e2 === -1) throw new Error("Could not dispose an addon that has not been loaded");
    t.isDisposed = true, t.dispose.apply(t.instance), this._addons.splice(e2, 1);
  }
};
var wn = class {
  constructor(t) {
    this._line = t;
  }
  get isWrapped() {
    return this._line.isWrapped;
  }
  get length() {
    return this._line.length;
  }
  getCell(t, e2) {
    if (!(t < 0 || t >= this._line.length)) return e2 ? (this._line.loadCell(t, e2), e2) : this._line.loadCell(t, new q());
  }
  translateToString(t, e2, i) {
    return this._line.translateToString(t, e2, i);
  }
};
var Ji = class {
  constructor(t, e2) {
    this._buffer = t;
    this.type = e2;
  }
  init(t) {
    return this._buffer = t, this;
  }
  get cursorY() {
    return this._buffer.y;
  }
  get cursorX() {
    return this._buffer.x;
  }
  get viewportY() {
    return this._buffer.ydisp;
  }
  get baseY() {
    return this._buffer.ybase;
  }
  get length() {
    return this._buffer.lines.length;
  }
  getLine(t) {
    let e2 = this._buffer.lines.get(t);
    if (e2) return new wn(e2);
  }
  getNullCell() {
    return new q();
  }
};
var Dn = class extends D {
  constructor(e2) {
    super();
    this._core = e2;
    this._onBufferChange = this._register(new v());
    this.onBufferChange = this._onBufferChange.event;
    this._normal = new Ji(this._core.buffers.normal, "normal"), this._alternate = new Ji(this._core.buffers.alt, "alternate"), this._core.buffers.onBufferActivate(() => this._onBufferChange.fire(this.active));
  }
  get active() {
    if (this._core.buffers.active === this._core.buffers.normal) return this.normal;
    if (this._core.buffers.active === this._core.buffers.alt) return this.alternate;
    throw new Error("Active buffer is neither normal nor alternate");
  }
  get normal() {
    return this._normal.init(this._core.buffers.normal);
  }
  get alternate() {
    return this._alternate.init(this._core.buffers.alt);
  }
};
var Rn = class {
  constructor(t) {
    this._core = t;
  }
  registerCsiHandler(t, e2) {
    return this._core.registerCsiHandler(t, (i) => e2(i.toArray()));
  }
  addCsiHandler(t, e2) {
    return this.registerCsiHandler(t, e2);
  }
  registerDcsHandler(t, e2) {
    return this._core.registerDcsHandler(t, (i, r) => e2(i, r.toArray()));
  }
  addDcsHandler(t, e2) {
    return this.registerDcsHandler(t, e2);
  }
  registerEscHandler(t, e2) {
    return this._core.registerEscHandler(t, e2);
  }
  addEscHandler(t, e2) {
    return this.registerEscHandler(t, e2);
  }
  registerOscHandler(t, e2) {
    return this._core.registerOscHandler(t, e2);
  }
  addOscHandler(t, e2) {
    return this.registerOscHandler(t, e2);
  }
};
var Ln = class {
  constructor(t) {
    this._core = t;
  }
  register(t) {
    this._core.unicodeService.register(t);
  }
  get versions() {
    return this._core.unicodeService.versions;
  }
  get activeVersion() {
    return this._core.unicodeService.activeVersion;
  }
  set activeVersion(t) {
    this._core.unicodeService.activeVersion = t;
  }
};
var Ic = ["cols", "rows"];
var Ue = 0;
var Dl = class extends D {
  constructor(t) {
    super(), this._core = this._register(new yn(t)), this._addonManager = this._register(new xn()), this._publicOptions = { ...this._core.options };
    let e2 = (r) => this._core.options[r], i = (r, n) => {
      this._checkReadonlyOptions(r), this._core.options[r] = n;
    };
    for (let r in this._core.options) {
      let n = { get: e2.bind(this, r), set: i.bind(this, r) };
      Object.defineProperty(this._publicOptions, r, n);
    }
  }
  _checkReadonlyOptions(t) {
    if (Ic.includes(t)) throw new Error(`Option "${t}" can only be set in the constructor`);
  }
  _checkProposedApi() {
    if (!this._core.optionsService.rawOptions.allowProposedApi) throw new Error("You must set the allowProposedApi option to true to use proposed API");
  }
  get onBell() {
    return this._core.onBell;
  }
  get onBinary() {
    return this._core.onBinary;
  }
  get onCursorMove() {
    return this._core.onCursorMove;
  }
  get onData() {
    return this._core.onData;
  }
  get onKey() {
    return this._core.onKey;
  }
  get onLineFeed() {
    return this._core.onLineFeed;
  }
  get onRender() {
    return this._core.onRender;
  }
  get onResize() {
    return this._core.onResize;
  }
  get onScroll() {
    return this._core.onScroll;
  }
  get onSelectionChange() {
    return this._core.onSelectionChange;
  }
  get onTitleChange() {
    return this._core.onTitleChange;
  }
  get onWriteParsed() {
    return this._core.onWriteParsed;
  }
  get element() {
    return this._core.element;
  }
  get parser() {
    return this._parser || (this._parser = new Rn(this._core)), this._parser;
  }
  get unicode() {
    return this._checkProposedApi(), new Ln(this._core);
  }
  get textarea() {
    return this._core.textarea;
  }
  get rows() {
    return this._core.rows;
  }
  get cols() {
    return this._core.cols;
  }
  get buffer() {
    return this._buffer || (this._buffer = this._register(new Dn(this._core))), this._buffer;
  }
  get markers() {
    return this._checkProposedApi(), this._core.markers;
  }
  get modes() {
    let t = this._core.coreService.decPrivateModes, e2 = "none";
    switch (this._core.coreMouseService.activeProtocol) {
      case "X10":
        e2 = "x10";
        break;
      case "VT200":
        e2 = "vt200";
        break;
      case "DRAG":
        e2 = "drag";
        break;
      case "ANY":
        e2 = "any";
        break;
    }
    return { applicationCursorKeysMode: t.applicationCursorKeys, applicationKeypadMode: t.applicationKeypad, bracketedPasteMode: t.bracketedPasteMode, insertMode: this._core.coreService.modes.insertMode, mouseTrackingMode: e2, originMode: t.origin, reverseWraparoundMode: t.reverseWraparound, sendFocusMode: t.sendFocus, synchronizedOutputMode: t.synchronizedOutput, wraparoundMode: t.wraparound };
  }
  get options() {
    return this._publicOptions;
  }
  set options(t) {
    for (let e2 in t) this._publicOptions[e2] = t[e2];
  }
  blur() {
    this._core.blur();
  }
  focus() {
    this._core.focus();
  }
  input(t, e2 = true) {
    this._core.input(t, e2);
  }
  resize(t, e2) {
    this._verifyIntegers(t, e2), this._core.resize(t, e2);
  }
  open(t) {
    this._core.open(t);
  }
  attachCustomKeyEventHandler(t) {
    this._core.attachCustomKeyEventHandler(t);
  }
  attachCustomWheelEventHandler(t) {
    this._core.attachCustomWheelEventHandler(t);
  }
  registerLinkProvider(t) {
    return this._core.registerLinkProvider(t);
  }
  registerCharacterJoiner(t) {
    return this._checkProposedApi(), this._core.registerCharacterJoiner(t);
  }
  deregisterCharacterJoiner(t) {
    this._checkProposedApi(), this._core.deregisterCharacterJoiner(t);
  }
  registerMarker(t = 0) {
    return this._verifyIntegers(t), this._core.registerMarker(t);
  }
  registerDecoration(t) {
    return this._checkProposedApi(), this._verifyPositiveIntegers(t.x ?? 0, t.width ?? 0, t.height ?? 0), this._core.registerDecoration(t);
  }
  hasSelection() {
    return this._core.hasSelection();
  }
  select(t, e2, i) {
    this._verifyIntegers(t, e2, i), this._core.select(t, e2, i);
  }
  getSelection() {
    return this._core.getSelection();
  }
  getSelectionPosition() {
    return this._core.getSelectionPosition();
  }
  clearSelection() {
    this._core.clearSelection();
  }
  selectAll() {
    this._core.selectAll();
  }
  selectLines(t, e2) {
    this._verifyIntegers(t, e2), this._core.selectLines(t, e2);
  }
  dispose() {
    super.dispose();
  }
  scrollLines(t) {
    this._verifyIntegers(t), this._core.scrollLines(t);
  }
  scrollPages(t) {
    this._verifyIntegers(t), this._core.scrollPages(t);
  }
  scrollToTop() {
    this._core.scrollToTop();
  }
  scrollToBottom() {
    this._core.scrollToBottom();
  }
  scrollToLine(t) {
    this._verifyIntegers(t), this._core.scrollToLine(t);
  }
  clear() {
    this._core.clear();
  }
  write(t, e2) {
    this._core.write(t, e2);
  }
  writeln(t, e2) {
    this._core.write(t), this._core.write(`\r
`, e2);
  }
  paste(t) {
    this._core.paste(t);
  }
  refresh(t, e2) {
    this._verifyIntegers(t, e2), this._core.refresh(t, e2);
  }
  reset() {
    this._core.reset();
  }
  clearTextureAtlas() {
    this._core.clearTextureAtlas();
  }
  loadAddon(t) {
    this._addonManager.loadAddon(this, t);
  }
  static get strings() {
    return { get promptLabel() {
      return mi.get();
    }, set promptLabel(t) {
      mi.set(t);
    }, get tooMuchOutput() {
      return _i.get();
    }, set tooMuchOutput(t) {
      _i.set(t);
    } };
  }
  _verifyIntegers(...t) {
    for (Ue of t) if (Ue === 1 / 0 || isNaN(Ue) || Ue % 1 !== 0) throw new Error("This API only accepts integers");
  }
  _verifyPositiveIntegers(...t) {
    for (Ue of t) if (Ue && (Ue === 1 / 0 || isNaN(Ue) || Ue % 1 !== 0 || Ue < 0)) throw new Error("This API only accepts positive integers");
  }
};

// node_modules/@xterm/addon-fit/lib/addon-fit.mjs
var h = 2;
var _ = 1;
var o = class {
  activate(e2) {
    this._terminal = e2;
  }
  dispose() {
  }
  fit() {
    let e2 = this.proposeDimensions();
    if (!e2 || !this._terminal || isNaN(e2.cols) || isNaN(e2.rows)) return;
    let t = this._terminal._core;
    (this._terminal.rows !== e2.rows || this._terminal.cols !== e2.cols) && (t._renderService.clear(), this._terminal.resize(e2.cols, e2.rows));
  }
  proposeDimensions() {
    if (!this._terminal || !this._terminal.element || !this._terminal.element.parentElement) return;
    let t = this._terminal._core._renderService.dimensions;
    if (t.css.cell.width === 0 || t.css.cell.height === 0) return;
    let s15 = this._terminal.options.scrollback === 0 ? 0 : this._terminal.options.overviewRuler?.width || 14, r = window.getComputedStyle(this._terminal.element.parentElement), l = parseInt(r.getPropertyValue("height")), a2 = Math.max(0, parseInt(r.getPropertyValue("width"))), i = window.getComputedStyle(this._terminal.element), n = { top: parseInt(i.getPropertyValue("padding-top")), bottom: parseInt(i.getPropertyValue("padding-bottom")), right: parseInt(i.getPropertyValue("padding-right")), left: parseInt(i.getPropertyValue("padding-left")) }, m = n.top + n.bottom, d2 = n.right + n.left, c2 = l - m, p = a2 - d2 - s15;
    return { cols: Math.max(h, Math.floor(p / t.css.cell.width)), rows: Math.max(_, Math.floor(c2 / t.css.cell.height)) };
  }
};
export {
  o as FitAddon,
  RFB,
  Dl as Terminal
};
/*! Bundled license information:

@xterm/xterm/lib/xterm.mjs:
@xterm/addon-fit/lib/addon-fit.mjs:
  (**
   * Copyright (c) 2014-2024 The xterm.js authors. All rights reserved.
   * @license MIT
   *
   * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
   * @license MIT
   *
   * Originally forked from (with the author's permission):
   *   Fabrice Bellard's javascript vt100 for jslinux:
   *   http://bellard.org/jslinux/
   *   Copyright (c) 2011 Fabrice Bellard
   *)
*/
