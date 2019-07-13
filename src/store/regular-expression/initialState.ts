import { Dialog, DialogScroll, Header, BasicInfo, State, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, alUsecases } from './contents';
import * as helper from '../../algorithms/regular-expression';

export const basicInfo: BasicInfo = {
    id: 17,
    title: 'Regular Expression',
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

const bases = 'AAAABBBC'.split('');
const random = (max: number) => Math.floor(Math.random() * max);

export const create = () => {
    const arrayOne: string[] = Array(6).fill(bases.length).map(random).map(i => bases[i]);
    arrayOne[random(6 - 1) + 1] = '*';
    arrayOne[random(6 - 1) + 1] = '.';
    const stringOne: string = arrayOne.join('');
    const stringTwo: string = Array(6).fill(bases.length).map(random).map(i => bases[i]).join('');
    return ({
        ...header,
        ...dialog,
        ...codeFormula,
        currentPoint: helper.startPoint,
        comparedTable: helper.createComparedTable(stringOne, stringTwo),
        table: helper.createTableMatrix(stringOne, stringTwo),
        tableStyles: helper.createTableStyles(stringOne, stringTwo),
        buttons: helper.createButtons(),
        buttonsStyles: helper.createButtonsStyles(),
        handleButtonClick: buttonClick,
    });
};

export const state: State = create();
