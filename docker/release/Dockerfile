FROM timdelgado/todobackend-base
MAINTAINER timdelgado@gamestop.com

RUN mkdir -p /usr/scr/app
WORKDIR /usr/scr/app

COPY target /usr/scr/app

EXPOSE 8080

CMD [ "npm", "start" ]