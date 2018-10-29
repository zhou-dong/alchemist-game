import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

const green = chalk.green;
const magenta = chalk.magenta;
const yellow = chalk.yellow;
const log = console.log;

const successLog = (prefix: string, basePath: string, name: string) => {
    log(green(prefix), yellow(name), 'at path', magenta(basePath));
};

export const mkdir = (basePath: string, dirName: string): string => {
    const dirPath = path.join(basePath, dirName);
    if (fs.existsSync(dirPath)) {
        throw `${dirPath} already exist`;
        process.exit();
    }
    fs.mkdirSync(dirPath);
    successLog('created directory', basePath, dirName);
    return dirPath;
};

export const touch = (basePath: string, fileName: string) => {
    const filepath = path.join(basePath, fileName);
    fs.closeSync(fs.openSync(filepath, 'w'));
    successLog('created file', basePath, fileName);
    return filepath;
};

export const cp = (source: string, target: string) => {
    fs.createReadStream(source).pipe(fs.createWriteStream(target));
    log(green('copied file from '), yellow(source), green('to'), magenta(target));
};

export const write = (filepath: string, content: string) => {
    fs.writeFile(filepath, content, err => {
        if (err) {
            throw 'error writing file: ' + err;
        } else {
            log(green('write file'), magenta(filepath), yellow('finished'));
        }
    });
};
