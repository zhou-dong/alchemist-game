import { Dialog, DialogScroll, Header, BasicInfo, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, alUsecases } from './contents';
import { State } from "./state";
import * as helper from '../../algorithms/trapping-rain-water-ii';

export const basicInfo: BasicInfo = {
    id: 29,
    title: 'Trapping Rain Water Ii',
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
    const heights: number[] = Array(9).fill(5).map(random);
    const leftMax: number[] = helper.createLeftMax(heights);
    const rightMax: number[] = helper.createRightMax(heights);
    const waters: number[] = helper.createDPTable(heights);
    return ({
        ...header,
        ...dialog,
        ...codeFormula,
        currentPoint: helper.startPoint,
        comparedTable: helper.createComparedTable(heights),
        table: helper.createTableMatrix(heights),
        tableStyles: helper.createTableStyles(heights),
        buttons: helper.createButtons(heights),
        buttonsStyles: helper.createButtonsStyles(heights),
        handleButtonClick: buttonClick,
        leftMax,
        rightMax,
        heights,
        waters,
        guiders: helper.createGuiders(heights),
    });
};

export const state: State = create();
