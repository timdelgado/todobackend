#Primary functions
#1) Run unit and integration tests
#2) Build application artifacts

FROM tdelgado/todobackend-base
MAINTAINER timdelgado@gamestop.com

#OUTPUT: Build artifacts are output here
VOLUME /build
#OUTPUT: Test reports are output here
VOLUME /reports

#Add test entrypoint script
COPY scripts/test.sh /usr/local/bin/test.sh
RUN chmod +x /usr/local/bin/test.sh

ENTRYPOINT ["test.sh"]
CMD ["npm", "test"]

#Add application source
COPY src /application
WORKDIR /application
