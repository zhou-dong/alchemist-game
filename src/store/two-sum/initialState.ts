import { Dialog, DialogScroll, Header, BasicInfo, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, alUsecases } from './contents';
import * as helper from '../../algorithms/two-sum';
import { State } from "./state";

export const basicInfo: BasicInfo = {
    id: 27,
    title: 'Two Sum',
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
    const nums: number[] = Array(6).fill(10).map(random);
    return ({
        ...header,
        ...dialog,
        ...codeFormula,
        currentPoint: helper.startPoint,
        comparedTable: helper.createComparedTable(nums),
        table: helper.createTableMatrix(nums),
        tableStyles: helper.createTableStyles(nums),
        buttons: helper.createButtons(),
        buttonsStyles: helper.createButtonsStyles(nums),
        handleButtonClick: buttonClick,
        target: 100,
        nums,
    });
};

export const state: State = create();
