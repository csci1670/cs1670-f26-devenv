#!/bin/bash

set -eu

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)
target_user="${1:-cs1670-user}"

CI_UID=1001
CI_GID=1001

# set up default locale
export LANG=en_US.UTF-8

# set up libraries
apt-get -y install\
 libreadline-dev\
 locales\
 wamerican\
 libssl-dev

# set up default locale
locale-gen en_US.UTF-8
export LANG=en_US.UTF-8

# install programs used for system exploration
apt-get -y install\
 blktrace\
 linux-tools-generic\
 strace\
 tcpdump\
 htop

apt-get install -y python3 \
	python3-pip \
	python3-dev \
	python3-setuptools \
	python3-venv

# set up default locale
locale-gen en_US.UTF-8
export LANG=en_US.UTF-8

# install interactive programs (emacs, vim, nano, man, sudo, etc.)
apt-get -y install\
 bc\
 curl\
 dc\
 git\
 git-doc\
 man\
 micro\
 nano\
 psmisc\
 sudo\
 wget\
 screen\
 tmux\
 emacs-nox\
 vim\
 jq \
 file

# install useful system utilities
apt-get -y install\
 iproute2\
 netcat-openbsd\
 telnet\
 time\
 minicom


# install likely-used python modules
apt-get -y install \
	python3-requests \
	python3-yaml \
	python3-dacite

apt-get -y install qemu-system-arm gcc-aarch64-linux-gnu

# ###### Graphical setup ######
# Install wireshark and xterm (as a graphical demo)
apt-get -y install xterm

# Install xpra (used for backup display method if X11 forwarding doesn't work)
UBUNTU_VERSION=$(cat /etc/os-release | grep UBUNTU_CODENAME | sed 's/UBUNTU_CODENAME=//') && \
    XPRA_REPO="xpra"
    wget -O "/usr/share/keyrings/xpra.asc" https://xpra.org/xpra.asc && \
    wget -O "/etc/apt/sources.list.d/${XPRA_REPO}.sources" "https://raw.githubusercontent.com/Xpra-org/xpra/master/packaging/repos/${UBUNTU_VERSION}/${XPRA_REPO}.sources" && \
    apt-get update && \
    apt-get install -y --no-install-recommends xpra xpra-html5 xpra-x11

# #############################

# remove unneeded .deb files
rm -r /var/lib/apt/lists/*

# Set up the container user
if [[ $target_user == "cs1670-user" ]]; then
    userdel ubuntu || true
    groupdel ubuntu || true
    useradd -m -s /bin/bash $target_user

    # Also add a runner user
    groupadd -g ${CI_GID} runner
    useradd -s /bin/bash -u ${CI_UID} -g ${CI_GID} -m runner
else
    # If using the host's user, don't create one--podman will do this
    # automatically.  However, the default shell will be wrong, so set
    # a profile rule to update this
    chmod +x /etc/profile.d/20-fix-default-shell.sh # Copied in Podmanfile
fi


# set up passwordless sudo for user cs1670-user
echo "cs1670-user ALL=(ALL:ALL) NOPASSWD: ALL" > /etc/sudoers.d/cs1670-init

if [[ $target_user == "cs300-user" ]]; then
    echo "runner ALL=(ALL:ALL) NOPASSWD: ALL" >> /etc/sudoers.d/cs300-init
fi

# create binary reporting version of dockerfile
(echo '#\!/bin/sh'; echo 'echo 1') > /usr/bin/cs1670-docker-version
chmod ugo+rx,u+w,go-w /usr/bin/cs1670-docker-version

rm -f /root/.bash_logout
