import { Dialog, DialogScroll, Header, BasicInfo, State, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, alUsecases } from './contents';
import * as helper from '../../algorithms/maximum-subarray-problem';

export const basicInfo: BasicInfo = {
    id: 10,
    title: `Maximum Subarray (Kadane's algorithm)`,
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

const maxNumber = 15;
const size = 9;
const random = (max: number) => Math.floor(Math.random() * max) + 1;
const randomInt = (max: number) => random(2) === 1 ? random(max) : 0 - random(max);

export const create = () => {
    const data = Array(size).fill(maxNumber).map(randomInt);
    return ({
        ...header,
        ...dialog,
        ...codeFormula,
        currentPoint: helper.startPoint,
        comparedTable: helper.createComparedTable(data),
        table: helper.createTableMatrix(data),
        tableStyles: helper.createTableStyles(data),
        buttons: helper.createButtons(data),
        buttonsStyles: helper.createButtonsStyles(data),
        handleButtonClick: buttonClick,
    });
};

export const state: State = create();
