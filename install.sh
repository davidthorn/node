#!/bin/sh

SCRIPT=$(readlink -f $0)
SCRIPT_PATH=`dirname $SCRIPT` 

npm install --prefix $SCRIPT_PATH

npm init
tsc --init

# run file system first to start configuring package files
npm install path typescript fs-extra @types/node @types/fs-extra strip-json-comments @types/strip-json-comments  --save-dev
npm install path @types/strip-json-comments
tsc "$SCRIPT_PATH"/config/tsc-config.ts
node "$SCRIPT_PATH"/config/tsc-config.js

npm install ts-node mocha chai typescript  mocha-typescript source-map-support nyc --save-dev
npm install @types/mocha @types/chai @types/node --save-dev

mkdir -p src
cp -r "$SCRIPT_PATH"/config/src/* src

mkdir -p test
cp -r "$SCRIPT_PATH"/config/test/* test

npm run test

git init

echo "node_modules" > .gitignore
git add .
git commit -am "initialised project"

code .