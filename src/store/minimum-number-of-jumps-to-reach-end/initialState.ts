import { Dialog, DialogScroll, Header, BasicInfo, State, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, alUsecases } from './contents';
import * as helper from '../../algorithms/minimum-number-of-jumps-to-reach-end';

export const basicInfo: BasicInfo = {
    id: 21,
    title: 'Minimum Number Of Jumps To Reach End',
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

const random = (max: number) => Math.floor(Math.random() * max);

export const create = () => {
    let array = Array(8).fill(4).map(random);

    // array = [1, 2, 0, 2, 1, 2, 3, 3];
    return ({
        ...header,
        ...dialog,
        ...codeFormula,
        currentPoint: helper.startPoint,
        comparedTable: helper.createComparedTable(array),
        table: helper.createTableMatrix(array),
        tableStyles: helper.createTableStyles(array),
        buttons: helper.createButtons(array),
        buttonsStyles: helper.createButtonsStyles(array),
        handleButtonClick: buttonClick,
    });
};

export const state: State = create();
