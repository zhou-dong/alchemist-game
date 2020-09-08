import { Dialog, DialogScroll, Header, BasicInfo, State, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, alUsecases } from './contents';
import * as helper from '../../algorithms/minimum-number-of-jumps-to-reach-end-ii';

export const basicInfo: BasicInfo = {
    id: 26,
    title: 'Minimum Number Of Jumps To Reach End Ii',
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

const bases = 'ACGT';
const random = (max: number) => Math.floor(Math.random() * max);

export const create = () => {
    const stringOne: string = Array(5).fill(bases.length).map(random).map(i => bases[i]).join('');
    const stringTwo: string = Array(5).fill(bases.length).map(random).map(i => bases[i]).join('');
    return ({
        ...header,
        ...dialog,
        ...codeFormula,
        currentPoint: helper.startPoint,
        comparedTable: helper.createComparedTable(stringOne, stringTwo),
        table: helper.createTableMatrix(stringOne, stringTwo),
        tableStyles: helper.createTableStyles(stringOne, stringTwo),
        buttons: helper.createButtons(stringOne, stringTwo),
        buttonsStyles: helper.createButtonsStyles(stringOne, stringTwo),
        handleButtonClick: buttonClick,
    });
};

export const state: State = create();
