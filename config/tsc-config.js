"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
var fs = require("fs-extra");
var path = require("path");
var stripJsonComments = require("strip-json-comments");
var tsConfigPath = path.join(process.cwd(), '/tsconfig.json');
var packagePath = path.join(process.cwd(), '/package.json');
var readmePath = path.join(process.cwd(), '/README.md');
var licensePath = path.join(process.cwd(), '/LICENSE');
var tsContentContents = stripJsonComments(fs.readFileSync(tsConfigPath, { encoding: 'utf8' }), { whitespace: true });
var tsconfigJSON = JSON.parse(tsContentContents);
var packageContentContents = stripJsonComments(fs.readFileSync(packagePath, { encoding: 'utf8' }), { whitespace: true });
var packageJSON = JSON.parse(packageContentContents);
var licenseContents = fs.readFileSync(path.join(__dirname, '/LICENSE'), { encoding: 'utf8' });
tsconfigJSON.compilerOptions = {
    "target": "es6",
    "module": "commonjs",
    "sourceMap": true,
    "experimentalDecorators": true,
    "lib": ["es6", "dom"],
    "resolveJsonModule": true
};
fs.writeFileSync(tsConfigPath, JSON.stringify(tsconfigJSON, null, 4), { encoding: 'utf8' });
var scripts = {
    "pretest": "tsc",
    "test": "nyc mocha",
    "watch": "mocha-typescript-watch",
    "prepare": "tsc"
};
packageJSON.scripts = scripts;
packageJSON.main = "src/main.ts";
var nyc = {
    "check-coverage": true,
    "lines": 80,
    "statements": 80,
    "functions": 80,
    "branches": 80,
    "include": [
        "src/**/*.js"
    ],
    "exclude": [
        "test/**/*.js"
    ],
    "reporter": [
        "lcov",
        "text-summary"
    ],
    "all": true
};
var username = child_process_1.execSync("git config --global user.name", { encoding: 'utf8' }).trim().replace('\n', "");
var email = child_process_1.execSync("git config --global user.email", { encoding: 'utf8' }).trim().replace('\n', "");
packageJSON.author = username + " <" + email + ">";
packageJSON.nyc = nyc;
fs.writeFileSync(packagePath, JSON.stringify(packageJSON, null, 4), { encoding: 'utf8' });
fs.writeFileSync(readmePath, "# " + packageJSON.name + "\n\n" + packageJSON.description + "\n\nAuthor " + packageJSON.author + "\n\nCreated " + new Date().toString(), { encoding: 'utf8' });
fs.writeFileSync(licensePath, licenseContents, { encoding: 'utf8' });
console.log(tsconfigJSON);
