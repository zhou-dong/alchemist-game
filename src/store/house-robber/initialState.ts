import { Dialog, DialogScroll, Header, BasicInfo, State, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, useCases } from './contents';
import * as helper from '../../algorithms/house-robber';

export const basicInfo: BasicInfo = {
    id: 15,
    title: 'House Robber',
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

const random = (max: number) => Math.floor(Math.random() * max) + 1;

export const create = () => {
    const houses = Array(8).fill(10).map(random);
    return ({
        ...header,
        ...dialog,
        ...codeFormula,
        currentPoint: helper.startPoint,
        comparedTable: helper.createComparedTable(houses),
        table: helper.createTableMatrix(houses),
        tableStyles: helper.createTableStyles(houses),
        buttons: helper.createButtons(houses),
        buttonsStyles: helper.createButtonsStyles(houses),
        handleButtonClick: buttonClick,
    });
};

export const state: State = create();
