import { Dialog, DialogScroll, Header, BasicInfo, State, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, alUsecases } from './contents';
import * as helper from '../../algorithms/coin-change-how-many-ways';

export const basicInfo: BasicInfo = {
    id: 8,
    title: 'Coin Change How Many Ways',
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

const shuffle = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const totalCoins = [1, 2, 3, 4, 5, 6, 7];
const total = 6;

export const create = () => {
    const coins = Array.from(shuffle(totalCoins));
    coins.pop();
    coins.pop();
    return ({
        ...header,
        ...dialog,
        ...codeFormula,
        currentPoint: helper.startPoint,
        comparedTable: helper.createComparedTable(coins, total),
        table: helper.createTableMatrix(coins, total),
        tableStyles: helper.createTableStyles(coins, total),
        buttons: helper.createButtons(coins, total),
        buttonsStyles: helper.createButtonsStyles(coins, total),
        handleButtonClick: buttonClick,
    });
};

export const state: State = create();
