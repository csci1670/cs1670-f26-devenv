#!/bin/bash

set -eu

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)
target_user="${1:-cs1670-user}"

export DEBIAN_FRONTEND=noninteractive
export TZ=America/New_York

# set up default locale
export LANG=en_US.UTF-8

apt-get update

apt-get -y install unminimize &&\
    yes | unminimize

# install GCC-related packages
apt-get update && apt-get -y install\
 build-essential\
 binutils-doc\
 cpp-doc\
 gcc-doc\
 g++\
 g++-multilib\
 gdb\
 gdb-doc\
 glibc-doc\
 libblas-dev\
 liblapack-dev\
 liblapack-doc\
 libstdc++-13-doc\
 make\
 make-doc\
 locales


# Do main setup
$SCRIPT_DIR/container-setup-common $target_user

