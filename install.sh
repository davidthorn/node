#!/bin/sh

SCRIPT=$(readlink -f $0)
SCRIPT_PATH=`dirname $SCRIPT` 

npm install --prefix $SCRIPT_PATH

npm init
tsc --init

# run file system first to start configuring package files
npm install path typescript fs-extra @types/node @types/fs-extra strip-json-comments @types/strip-json-comments  --save-dev
npm install path @types/strip-json-comments
tsc /home/david/node/config/tsc-config.ts
node /home/david/node/config/tsc-config.js

npm install ts-node mocha chai typescript  mocha-typescript source-map-support nyc --save-dev
npm install @types/mocha @types/chai @types/node --save-dev

mkdir -p src
echo "export const result = true" > src/main.ts

mkdir -p tests
echo "import * as testData from '../src/main'\nimport { expect } from 'chai'\n\ndescribe('Test chai', () => {\n\tit('should be true' , () => {\n\t\texpect(testData.result).to.be.equal(true)\n\t})\n})" > tests/chai.test.ts 

npm run test

git init

echo "node_modules" > .gitignore
git add .
git commit -am "initialised project"

code .