"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var child_process_1 = require("child_process");
var fs = require("fs-extra");
var path = require("path");
var djt_json_sanitizer_1 = require("djt-json-sanitizer");
var tsConfigPath = path.join(process.cwd(), '/tsconfig.json');
var packagePath = path.join(process.cwd(), '/package.json');
var readmePath = path.join(process.cwd(), '/README.md');
var licensePath = path.join(process.cwd(), '/LICENSE');
var sanitizer = new djt_json_sanitizer_1.Sanitizer("");
var tsContentContents = sanitizer.jsonFile(fs.readFileSync(tsConfigPath, { encoding: 'utf8' }));
var tsconfigJSON = JSON.parse(tsContentContents);
var packageContentContents = sanitizer.jsonFile(fs.readFileSync(packagePath, { encoding: 'utf8' }));
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
var scripts = __assign({}, packageJSON.scripts, { "pretest": "tsc", "test": "nyc mocha", "watch": "mocha-typescript-watch", "prepare": "tsc", "start": "webpack-dev-server --open", "build": "webpack && cp -r assets/* dist && tsc" });
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
