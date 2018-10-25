import { Dialog, DialogScroll, Header, BasicInfo, State, Difficulty } from '../BasicState';
import { buttonClick, refresh, openDialog, closeDialog } from './actions';
import { description, formula, example, useCases } from './contents';
import * as helper from '../../algorithms/edit-distance';

export const basicInfo: BasicInfo = {
    id: 1,
    title: 'EDIT DISTANCE',
};

const dialog: Dialog = {
    ...basicInfo,
    dialogOpen: false,
    dialogCroll: DialogScroll.Paper,
    description: description,
    formula: formula,
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
};

const bases = 'ACGT';
const random = (max: number) => Math.floor(Math.random() * max);

export const create = () => {
    const stringOne: string = Array(5).fill(bases.length).map(random).map(i => bases[i]).join('');
    const stringTwo: string = Array(4).fill(bases.length).map(random).map(i => bases[i]).join('');
    return ({
        ...header,
        ...dialog,
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
