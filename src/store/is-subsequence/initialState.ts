import { Dialog, DialogScroll, Header, BasicInfo, State, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, alUsecases } from './contents';
import * as helper from '../../algorithms/is-subsequence';

export const basicInfo: BasicInfo = {
    id: 2,
    title: 'Is Subsequence',
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

const bases = 'ABC';
const random = (max: number) => Math.floor(Math.random() * max);

export const create = () => {
    const stringOne: string = Array(8).fill(bases.length).map(random).map(i => bases[i]).join('');
    const stringTwo: string = Array(4).fill(bases.length).map(random).map(i => bases[i]).join('');

    const table = helper.createTableMatrix(stringOne, stringTwo);

    return ({
        ...header,
        ...dialog,
        ...codeFormula,
        currentPoint: helper.startPoint,
        comparedTable: helper.createComparedTable(stringOne, stringTwo),
        table,
        tableStyles: helper.createTableStyles(stringOne, stringTwo, table),
        buttons: helper.createButtons(stringOne, stringTwo),
        buttonsStyles: helper.createButtonsStyles(stringOne, stringTwo),
        handleButtonClick: buttonClick,
    });
};

export const state: State = create();
