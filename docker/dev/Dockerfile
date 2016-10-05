#Primary functions
#1) Run unit and integration tests
#2) Build application artifacts

FROM timdelgado/todobackend-base
MAINTAINER timdelgado@gamestop.com

#OUTPUT: Release artifacts are output here
VOLUME /release
#OUTPUT: Build artifacts are output here
VOLUME /build
#OUTPUT: Test reports are output here
VOLUME /reports

#Add test entrypoint script
COPY scripts /usr/local/bin
RUN chmod +x /usr/local/bin/test.sh && chmod +x /usr/local/bin/build.sh

ENTRYPOINT ["test.sh"]
CMD ["npm", "test"]

#Add application source
COPY src /application
WORKDIR /application
