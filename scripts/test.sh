#!/bin/bash
#Install application requirements
npm install
#pack the release files & copy to build directory
npm pack
#move npm package to build volume
mv *.tgz /build

#Run test.sh arguments
exec $@