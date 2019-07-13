import { Dialog, DialogScroll, Header, BasicInfo, State, Difficulty, Formula } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog, closeFormula, openFormula } from './actions';
import { description, formula, example, alUsecases } from './contents';
import * as helper from '../../algorithms/wildcard-matching';

export const basicInfo: BasicInfo = {
    id: 18,
    title: 'Wildcard Matching',
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

const bases = 'ABC'.split('');
const random = (max: number) => Math.floor(Math.random() * max);

const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const create = () => {
    const arrayOne: string[] = Array(4).fill(bases.length).map(random).map(i => bases[i]);
    arrayOne.push('?', '*');
    const stringOne: string = shuffle(arrayOne).join('');
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
