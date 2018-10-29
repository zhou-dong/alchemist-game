"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var chalk_1 = require("chalk");
var green = chalk_1["default"].green;
var magenta = chalk_1["default"].magenta;
var yellow = chalk_1["default"].yellow;
var log = console.log;
var successLog = function (prefix, basePath, name) {
    log(green(prefix), yellow(name), 'at path', magenta(basePath));
};
exports.mkdir = function (basePath, dirName) {
    var dirPath = path.join(basePath, dirName);
    if (fs.existsSync(dirPath)) {
        throw dirPath + " already exist";
        process.exit();
    }
    fs.mkdirSync(dirPath);
    successLog('created directory', basePath, dirName);
    return dirPath;
};
exports.touch = function (basePath, fileName) {
    var filepath = path.join(basePath, fileName);
    fs.closeSync(fs.openSync(filepath, 'w'));
    successLog('created file', basePath, fileName);
    return filepath;
};
exports.cp = function (source, target) {
    fs.createReadStream(source).pipe(fs.createWriteStream(target));
    log(green('copied file from '), yellow(source), green('to'), magenta(target));
};
exports.write = function (filepath, content) {
    fs.writeFile(filepath, content, function (err) {
        if (err) {
            throw 'error writing file: ' + err;
        }
        else {
            log(green('write file'), magenta(filepath), yellow('finished'));
        }
    });
};
