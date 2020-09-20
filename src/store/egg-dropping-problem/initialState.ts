import { Dialog, DialogScroll, Header, BasicInfo, State, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, alUsecases } from './contents';
import * as helper from '../../algorithms/egg-dropping-problem';

export const basicInfo: BasicInfo = {
    id: 20,
    title: 'Egg Dropping Problem',
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

const eggs = 3;
const size = 7;

const resultsInDifferentFloors: number[] = [];
const helperTable: string[][] = [];

export const create = () => {
    return ({
        ...header,
        ...dialog,
        ...codeFormula,
        currentPoint: helper.startPoint,
        comparedTable: helper.createComparedTable(eggs, size),
        table: helper.createTableMatrix(eggs, size),
        tableStyles: helper.createTableStyles(eggs, size),
        buttons: helper.createButtons(eggs, size),
        buttonsStyles: helper.createButtonsStyles(eggs, size),
        handleButtonClick: buttonClick,
        helperTable,
        resultsInDifferentFloors,
    });
};

export const state: State = create();
