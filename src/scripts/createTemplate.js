"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var ejs = require("ejs");
var rimraf = require("rimraf");
var chalk_1 = require("chalk");
var fileHelpers_1 = require("./fileHelpers");
var inputName = process.argv[2];
if (!inputName) {
    throw 'Please type in algorithm name';
}
var id = parseInt(process.argv[3], 10);
if (!id) {
    throw 'Please type in algorithm id';
}
var fileLoader = function(basePath, fileName) {
    var filePath = path.join(basePath, fileName);
    return ejs.fileLoader(filePath).toString();
};
// hyphen-case
var getHyphenCaseName = function() {
    return inputName.toLowerCase();
};
var srcPath = path.join(path.resolve(__dirname), '../');
var templateDir = path.join(srcPath, 'scripts', 'template');
var templateAlgorithm = path.join(templateDir, 'algorithm');
var templateStore = path.join(templateDir, 'store');
var hyphenCase = getHyphenCaseName();
if (process.argv[4] === 'force') {
    var toBeRemovedAlgorithm = path.join(srcPath, 'algorithms', hyphenCase);
    rimraf.sync(toBeRemovedAlgorithm, fs);
    console.log(chalk_1["default"].bold.red("removed directory: " + toBeRemovedAlgorithm));
    var toBeRemovedStore = path.join(srcPath, 'store', hyphenCase);
    rimraf.sync(toBeRemovedStore, fs);
    console.log(chalk_1["default"].bold.red("removed directory: " + toBeRemovedStore));
}
var findHyphens = function(array) {
    return array.map(function(ch, index) { return (ch === '-') ? index : -1; }).filter(function(i) { return i !== -1; });
};
var getCamelCaseName = function() {
    var array = inputName.split('');
    findHyphens(array).forEach(function(i) {
        array[i + 1] = array[i + 1].toUpperCase();
    });
    return array.filter(function(ch) { return ch !== '-'; }).join('');
};
// PascalCase
var getPascalCaseName = function() {
    var array = getCamelCaseName().split('');
    array[0] = array[0].toUpperCase();
    return array.filter(function(ch) { return ch !== '-'; }).join('');
};
// UPPER_SNAKE_CASE
var getUpperSnakeCaseName = function() {
    return inputName.split('').map(function(ch) { return (ch === '-' ? '_' : ch); }).join('').toUpperCase();
};
var getTitle = function() {
    var array = inputName.split('');
    array[0] = array[0].toUpperCase();
    findHyphens(array).forEach(function(i) {
        array[i + 1] = array[i + 1].toUpperCase();
    });
    return array.map(function(ch) { return (ch === '-' ? ' ' : ch); }).join('');
};
var destAlgorithmsDir = fileHelpers_1.mkdir(path.join(srcPath, 'algorithms'), hyphenCase);
var destStoreDir = fileHelpers_1.mkdir(path.join(srcPath, 'store'), hyphenCase);
var mockDir = fileHelpers_1.mkdir(destAlgorithmsDir, '__mock__');
var testsDir = fileHelpers_1.mkdir(destAlgorithmsDir, '__tests__');
fileHelpers_1.write(path.join(mockDir, hyphenCase + "-mock.json"), '{}');
fileHelpers_1.touch(testsDir, hyphenCase + ".unit.test.js");
var cpAlgorithmTs = function() {
    var source = path.join(templateAlgorithm, 'algorithm.ejs');
    var target = path.join(destAlgorithmsDir, 'algorithm.ts');
    fileHelpers_1.cp(source, target);
};
var cpIndexTs = function() {
    var source = path.join(templateAlgorithm, 'index.ejs');
    var target = path.join(destAlgorithmsDir, 'index.ts');
    fileHelpers_1.cp(source, target);
};
var cpUpdateTs = function() {
    var source = path.join(templateAlgorithm, 'update.ejs');
    var target = path.join(destAlgorithmsDir, 'update.ts');
    fileHelpers_1.cp(source, target);
};
// store
var cpActionsTs = function() {
    var source = path.join(templateStore, 'actions.ejs');
    var target = path.join(destStoreDir, 'actions.ts');
    fileHelpers_1.cp(source, target);
};
var renderConstantsTs = function() {
    var ejsTemplate = fileLoader(templateStore, 'constants.ejs');
    var render = ejs.render(ejsTemplate, { UPPER_SNAKE_CASE: getUpperSnakeCaseName() });
    fileHelpers_1.write(path.join(destStoreDir, 'constants.ts'), render);
};
var renderContainerTs = function() {
    var ejsTemplate = fileLoader(templateStore, 'container.ejs');
    var render = ejs.render(ejsTemplate, { camelCase: getCamelCaseName() });
    fileHelpers_1.write(path.join(destStoreDir, 'container.ts'), render);
};
var cpContentsTs = function() {
    var source = path.join(templateStore, 'contents.ejs');
    var target = path.join(destStoreDir, 'contents.ts');
    fileHelpers_1.cp(source, target);
};
var renderIndexTs = function() {
    var ejsTemplate = fileLoader(templateStore, 'index.ejs');
    var render = ejs.render(ejsTemplate, { PascalCase: getPascalCaseName() });
    fileHelpers_1.write(path.join(destStoreDir, 'index.ts'), render);
};
var renderInitialStateTs = function() {
    var ejsTemplate = fileLoader(templateStore, 'initialState.ejs');
    var render = ejs.render(ejsTemplate, {
        id: id,
        hyphen_case: hyphenCase,
        CAPITAL_NAME: getTitle()
    });
    fileHelpers_1.write(path.join(destStoreDir, 'initialState.ts'), render);
};
var cpReducerJs = function() {
    var ejsTemplate = fileLoader(templateStore, 'reducer.ejs');
    var render = ejs.render(ejsTemplate, { hyphen_case: hyphenCase });
    fileHelpers_1.write(path.join(destStoreDir, 'reducer.ts'), render);
};
var cpSagasTs = function() {
    var source = path.join(templateStore, 'sagas.ejs');
    var target = path.join(destStoreDir, 'sagas.ts');
    fileHelpers_1.cp(source, target);
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

// example:
// node ./src/scripts/createTemplate.js binary-tree-inorder-traversal 23
// node ./src/scripts/createTemplate.js binary-tree-preorder-traversal 24
// node ./src/scripts/createTemplate.js binary-tree-postorder-traversal 25
// node ./src/scripts/createTemplate.js minimum-number-of-jumps-to-reach-end-ii 26
// node ./src/scripts/createTemplate.js two-sum 27
// node ./src/scripts/createTemplate.js trapping-rain-water 28