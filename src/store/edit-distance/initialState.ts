import { State, Dialog, DialogScroll, Header } from '../State';
import { Difficulty } from '../State';

import {
    createTableMatrix,
    createComparedTable,
    createTableStyles,
    createButtons,
    createButtonsStyles,
    startPoint,
} from '../../algorithms/edit-distance';

import {
    buttonClick,
    refresh,
    openDialog,
    closeDialog,
} from './actions';

const stringOne = 'AGGCT';
const stringTwo = 'GATC';

const dialog: Dialog = {
    dialogOpen: false,
    title: 'EDIT DISTANCE',
    dialogCroll: DialogScroll.Paper,
    dialogContent: 'INTRODUCTION, MODAL',
    formula: 'formula',
    examples: ['example1', 'example2'],
    handleCloseDialogClick: closeDialog,
    handleDialogOnClose: () => { console.log('close dialog'); },
};

const header: Header = {
    success: false,
    loading: false,
    steps: 0,
    errors: 0,
    title: 'Edit Distance',
    time: 0,
    difficulty: Difficulty.Easy,
    handleRefreshClick: refresh,
    handleOpenDialogClick: openDialog,
};

const state: State = {
    id: 0,

    ...header,
    ...dialog,

    currentPoint: startPoint,

    comparedTable: createComparedTable(stringOne, stringTwo),
    tableMatrix: createTableMatrix(stringOne, stringTwo),
    tableStyles: createTableStyles(stringOne, stringTwo),

    buttons: createButtons(stringOne, stringTwo),
    buttonsStyles: createButtonsStyles(stringOne, stringTwo),

    handleButtonClick: buttonClick,
};

export default state;