import { Dialog, DialogScroll, Header, BasicInfo, State, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, alUsecases } from './contents';
import * as helper from '../../algorithms/minimum-path-sum';

export const basicInfo: BasicInfo = {
    id: 9,
    title: 'Minimum Path Sum',
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

const maxNumber = 9;
const rows = 4;
const cols = 6;

const createRow = (len: number, max: number): number[] => {
    return Array(len).fill(max).map(random);
};

export const create = () => {
    const table = Array(rows).fill(0).map(() => createRow(cols, maxNumber));
    return ({
        ...header,
        ...dialog,
        ...codeFormula,
        currentPoint: helper.startPoint,
        comparedTable: helper.createComparedTable(table),
        table: helper.createTableMatrix(table),
        tableStyles: helper.createTableStyles(table),
        buttons: helper.createButtons(table),
        buttonsStyles: helper.createButtonsStyles(table),
        handleButtonClick: buttonClick,
    });
};

export const state: State = create();
