FROM ubuntu:resolute

LABEL org.opencontainers.image.source=https://github.com/csci1670/csci1670-f26-devenv

# set environment variables for tzdata
ARG TZ=America/New_York
ENV TZ=${TZ}

# include manual pages and documentation
ARG DEBIAN_FRONTEND=noninteractive
ENV LANG en_US.UTF-8

COPY container-setup-amd64.sh /usr/local/bin/container-setup-amd64
COPY container-setup-common.sh /usr/local/bin/container-setup-common
COPY entrypoint.sh /usr/local/bin/container-entrypoint
COPY .image-version /etc/image-version

RUN /usr/local/bin/container-setup-amd64

# git build arguments
ARG USER=cs1670\ User
ARG EMAIL=nobody@example.com

# configure your environment
USER cs1670-user
RUN rm -f ~/.bash_logout

WORKDIR /home/cs1670
CMD ["/bin/bash", "-l"]
