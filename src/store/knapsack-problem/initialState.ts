import { Dialog, DialogScroll, Header, BasicInfo, State, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, alUsecases } from './contents';
import { KnapSackItem } from '../../algorithms/knapsack-problem/KnapsackItem';
import * as helper from '../../algorithms/knapsack-problem';

export const basicInfo: BasicInfo = {
    id: 6,
    title: 'Knapsack Problem',
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
const totalWeight = 6;

export const create = () => {
    const items: KnapSackItem[] = Array(4).fill(0).map(() => ({ weight: random(5), value: random(10) }));
    return ({
        ...header,
        ...dialog,
        ...codeFormula,
        currentPoint: helper.startPoint,
        comparedTable: helper.createComparedTable(items, totalWeight),
        table: helper.createTableMatrix(items, totalWeight),
        tableStyles: helper.createTableStyles(items, totalWeight),
        buttons: helper.createButtons(items, totalWeight),
        buttonsStyles: helper.createButtonsStyles(items, totalWeight),
        handleButtonClick: buttonClick,
    });
};

export const state: State = create();
