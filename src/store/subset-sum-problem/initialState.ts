import { Dialog, DialogScroll, Header, BasicInfo, State, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, alUsecases } from './contents';
import * as helper from '../../algorithms/subset-sum-problem';

export const basicInfo: BasicInfo = {
    id: 11,
    title: 'Subset Sum Problem',
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

const total = 8;
const random = (max: number) => Math.floor(Math.random() * max) + 1;

export const create = () => {

    const array: number[] = Array(4).fill(4).map(random);

    const table = helper.createTableMatrix(total, array);

    return ({
        ...header,
        ...dialog,
        ...codeFormula,
        currentPoint: helper.startPoint,
        comparedTable: helper.createComparedTable(total, array),
        table,
        tableStyles: helper.createTableStyles(total, array, table),
        buttons: helper.createButtons(total, array),
        buttonsStyles: helper.createButtonsStyles(total, array),
        handleButtonClick: buttonClick,
    });
};

export const state: State = create();
