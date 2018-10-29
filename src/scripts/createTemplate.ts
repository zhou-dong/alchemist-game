import * as fs from 'fs';
import * as path from 'path';
import * as ejs from 'ejs';
import * as rimraf from 'rimraf';
import chalk from 'chalk';

import { mkdir, touch, cp, write } from './fileHelpers';

const inputName = process.argv[2];
if (!inputName) {
    throw 'Please type in algorithm name';
}

const id = parseInt(process.argv[3], 10);
if (!id) {
    throw 'Please type in algorithm id';
}

const fileLoader = (basePath: string, fileName: string): string => {
    const filePath = path.join(basePath, fileName);
    return ejs.fileLoader(filePath).toString();
};

// hyphen-case
const getHyphenCaseName = (): string => {
    return inputName.toLowerCase();
};

const srcPath = path.join(path.resolve(__dirname), '../');
const templateDir = path.join(srcPath, 'scripts', 'template');
const templateAlgorithm = path.join(templateDir, 'algorithm');
const templateStore = path.join(templateDir, 'store');

const hyphenCase = getHyphenCaseName();

if (process.argv[4] === 'force') {
    const toBeRemovedAlgorithm = path.join(srcPath, 'algorithms', hyphenCase);
    rimraf.sync(toBeRemovedAlgorithm, fs);
    console.log(chalk.bold.red(`removed directory: ${toBeRemovedAlgorithm}`));

    const toBeRemovedStore = path.join(srcPath, 'store', hyphenCase);
    rimraf.sync(toBeRemovedStore, fs);
    console.log(chalk.bold.red(`removed directory: ${toBeRemovedStore}`));
}

const findHyphens = (array: string[]): number[] => {
    return array.map((ch, index) => (ch === '-') ? index : -1).filter(i => i !== -1);
};

const getCamelCaseName = (): string => {
    const array = inputName.split('');
    findHyphens(array).forEach(i => {
        array[i + 1] = array[i + 1].toUpperCase();
    });
    return array.filter(ch => ch !== '-').join('');
};

// PascalCase
const getPascalCaseName = (): string => {
    const array = getCamelCaseName().split('');
    array[0] = array[0].toUpperCase();
    return array.filter(ch => ch !== '-').join('');
};

// UPPER_SNAKE_CASE
const getUpperSnakeCaseName = (): string => {
    return inputName.split('').map(ch => (ch === '-' ? '_' : ch)).join('').toUpperCase();
};

const getTitle = () => {
    const array = inputName.split('');
    array[0] = array[0].toUpperCase();
    findHyphens(array).forEach(i => {
        array[i + 1] = array[i + 1].toUpperCase();
    });
    return array.map(ch => (ch === '-' ? ' ' : ch)).join('');
};

const destAlgorithmsDir = mkdir(path.join(srcPath, 'algorithms'), hyphenCase);
const destStoreDir = mkdir(path.join(srcPath, 'store'), hyphenCase);

const mockDir = mkdir(destAlgorithmsDir, '__mock__');
const testsDir = mkdir(destAlgorithmsDir, '__tests__');

write(path.join(mockDir, `${hyphenCase}-mock.json`), '{}');
touch(testsDir, `${hyphenCase}.unit.test.js`);

const cpAlgorithmTs = () => {
    const source = path.join(templateAlgorithm, 'algorithm.ejs');
    const target = path.join(destAlgorithmsDir, 'algorithm.ts');
    cp(source, target);
};

const cpIndexTs = () => {
    const source = path.join(templateAlgorithm, 'index.ejs');
    const target = path.join(destAlgorithmsDir, 'index.ts');
    cp(source, target);
};

const cpUpdateTs = () => {
    const source = path.join(templateAlgorithm, 'update.ejs');
    const target = path.join(destAlgorithmsDir, 'update.ts');
    cp(source, target);
};

// store
const cpActionsTs = () => {
    const source = path.join(templateStore, 'actions.ejs');
    const target = path.join(destStoreDir, 'actions.ts');
    cp(source, target);
};

const renderConstantsTs = () => {
    const ejsTemplate = fileLoader(templateStore, 'constants.ejs');
    const render = ejs.render(ejsTemplate, { UPPER_SNAKE_CASE: getUpperSnakeCaseName() });
    write(path.join(destStoreDir, 'constants.ts'), render);
};

const renderContainerTs = () => {
    const ejsTemplate = fileLoader(templateStore, 'container.ejs');
    const render = ejs.render(ejsTemplate, { camelCase: getCamelCaseName() });
    write(path.join(destStoreDir, 'container.ts'), render);
};

const cpContentsTs = () => {
    const source = path.join(templateStore, 'contents.ejs');
    const target = path.join(destStoreDir, 'contents.ts');
    cp(source, target);
};

const renderIndexTs = () => {
    const ejsTemplate = fileLoader(templateStore, 'index.ejs');
    const render = ejs.render(ejsTemplate, { PascalCase: getPascalCaseName() });
    write(path.join(destStoreDir, 'index.ts'), render);
};

const renderInitialStateTs = () => {
    const ejsTemplate = fileLoader(templateStore, 'initialState.ejs');
    const render = ejs.render(ejsTemplate, {
        id: id,
        hyphen_case: hyphenCase,
        CAPITAL_NAME: getTitle(),
    });
    write(path.join(destStoreDir, 'initialState.ts'), render);
};

const cpReducerJs = () => {
    const ejsTemplate = fileLoader(templateStore, 'reducer.ejs');
    const render = ejs.render(ejsTemplate, { hyphen_case: hyphenCase });
    write(path.join(destStoreDir, 'reducer.ts'), render);
};

const cpSagasTs = () => {
    const source = path.join(templateStore, 'sagas.ejs');
    const target = path.join(destStoreDir, 'sagas.ts');
    cp(source, target);
};

cpAlgorithmTs();
cpIndexTs();
cpUpdateTs();

cpActionsTs();
renderConstantsTs();
renderContainerTs();
cpContentsTs();
renderIndexTs();
renderInitialStateTs();
cpReducerJs();
cpSagasTs();
