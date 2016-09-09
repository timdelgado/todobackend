#!/bin/bash

#todo: unpackage tarball from build directory to release directory
tar zxvf /build/*.tgz -C /release
#install release dependancies
cd /release/package
npm install --only=prod
#Run builder.sh arguments
exec $@