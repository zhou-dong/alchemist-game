import { Dialog, DialogScroll, Header, BasicInfo, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, alUsecases } from './contents';
import * as helper from '../../algorithms/word-break';
import { State } from './state';

export const basicInfo: BasicInfo = {
    id: 5,
    title: 'Word Break',
};

const codeFormula: Formula = {
    ...basicInfo,
    formulaOpen: false,
    formulaCroll: DialogScroll.Paper,
    formula: formula,
    handleCloseFormulaClick: closeFormula,
};

const dialog: Dialog = {
    ...basicInfo,
    dialogOpen: false,
    dialogCroll: DialogScroll.Paper,
    description: description,
    example: example,
    alUsecases: alUsecases,
    handleCloseDialogClick: closeDialog,
};

const header: Header = {
    ...basicInfo,
    success: false,
    loading: false,
    steps: 0,
    errors: 0,
    startTime: 0,
    finishTime: 0,
    difficulty: Difficulty.Easy,
    handleRefreshClick: refresh,
    handleOpenDialogClick: openDialog,
    handleOpenFormulaClick: openFormula,
};

const arrayShuffle = (array: Array<any>): Array<any> => {
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        swap(array, i, j);
    }
    return array;
};

const swap = (array: Array<any>, i: number, j: number) => {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
};

const stringShuffle = (str: string): string => arrayShuffle(str.split('')).join('');
const random = (max: number) => Math.floor(Math.random() * max);
const input = 'itisanice';
const dictionary = ["a", "an", "i", "ice", "is", "it", "nice"];

export const create = () => {
    let sentence = stringShuffle(input);
    if (random(3) === 2) {
        sentence = input;
    }
    return ({
        ...header,
        ...dialog,
        ...codeFormula,
        currentPoint: helper.startPoint,
        comparedTable: helper.createComparedTable(sentence, dictionary),
        table: helper.createTableMatrix(sentence, dictionary),
        tableStyles: helper.createTableStyles(sentence, dictionary),
        buttons: helper.createButtons(sentence, dictionary),
        buttonsStyles: helper.createButtonsStyles(sentence, dictionary),
        handleButtonClick: buttonClick,
        length: 1,
        dictionary,
    });
};

export const state: State = create();
