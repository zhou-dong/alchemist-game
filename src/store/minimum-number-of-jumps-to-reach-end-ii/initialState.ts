import { Dialog, DialogScroll, Header, BasicInfo, State, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, alUsecases } from './contents';
import * as helper from '../../algorithms/minimum-number-of-jumps-to-reach-end-ii';

export const basicInfo: BasicInfo = {
    id: 26,
    title: 'Minimum Number Of Jumps To Reach End Ii',
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

const random = (max: number) => Math.floor(Math.random() * max) + 1;

export const create = () => {
    const array = Array(9).fill(3).map(random);
    const table = helper.createTableMatrix(array);
    return ({
        ...header,
        ...dialog,
        ...codeFormula,
        currentPoint: helper.startPoint,
        comparedTable: helper.createComparedTable(array),
        table: table,
        tableStyles: helper.createTableStyles(array, table),
        buttons: helper.createButtons(array),
        buttonsStyles: helper.createButtonsStyles(array),
        handleButtonClick: buttonClick,
        other: array,
    });
};


export const state: State = create();
