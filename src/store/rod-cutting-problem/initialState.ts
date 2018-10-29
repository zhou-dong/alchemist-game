import { Dialog, DialogScroll, Header, BasicInfo, State, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, useCases } from './contents';
import * as helper from '../../algorithms/rod-cutting-problem';
import { RodCuttingItem } from '../../algorithms/rod-cutting-problem/RodCuttingItem';

export const basicInfo: BasicInfo = {
    id: 19,
    title: 'Rod Cutting Problem',
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
    useCases: useCases,
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

const shuffle = (array: RodCuttingItem[]) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const totalWeight = 6;
const items: RodCuttingItem[] = [
    { length: 1, price: 2 },
    { length: 2, price: 5 },
    { length: 3, price: 7 },
    { length: 4, price: 8 },
];

export const create = () => {
    shuffle(items);
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
