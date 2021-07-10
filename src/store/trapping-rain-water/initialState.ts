import { Dialog, DialogScroll, Header, BasicInfo, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, alUsecases } from './contents';
import * as helper from '../../algorithms/trapping-rain-water';
import { State } from "./state";

export const basicInfo: BasicInfo = {
    id: 28,
    title: 'Trapping Rain Water',
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

const createButtons = (water: number[], left: number[], right: number[]): number[] => {
    const set = new Set<number>();
    water.forEach(item => set.add(item));
    left.forEach(item => set.add(item));
    right.forEach(item => set.add(item));
    return Array.from(set).sort();
};


export const create = (): State => {
    let heights: number[] = Array(9).fill(5).map(random);
    // heights = [1, 2, 4, 1, 3, 2, 5, 0, 1];
    const leftMax: number[] = helper.createLeftMax(heights);
    const rightMax: number[] = helper.createRightMax(heights);
    const water: number[] = helper.createDPTable(heights);
    const buttons: number[] = createButtons(water, leftMax, rightMax);
    return ({
        ...header,
        ...dialog,
        ...codeFormula,
        currentPoint: helper.startPoint,
        comparedTable: helper.createComparedTable(heights),
        table: helper.createTableMatrix(heights),
        tableStyles: helper.createTableStyles(heights),
        buttons,
        buttonsStyles: helper.createButtonsStyles(buttons),
        handleButtonClick: buttonClick,
        heights,
        leftMax,
        rightMax,
        water,
    });
};

export const state: State = create();
