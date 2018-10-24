import { State, Modal, DialogScroll } from '../State';
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
    closeModal
} from './actions';

const stringOne = 'AGGCT';
const stringTwo = 'GATC';

const modal: Modal = {
    open: true,
    title: 'EDIT DISTANCE',
    scroll: DialogScroll.Paper,
    content: 'INTRODUCTION, MODAL',
    formula: 'formula',
    examples: ['example1', 'example2'],
    handleClose: closeModal,
};

const state: State = {
    id: 0,
    success: false,
    loading: false,
    steps: 0,
    errors: 0,
    title: 'Edit Distance',
    time: 0,

    difficulty: Difficulty.Easy,
    modal: modal,
    currentPoint: startPoint,

    comparedTable: createComparedTable(stringOne, stringTwo),
    tableMatrix: createTableMatrix(stringOne, stringTwo),
    tableStyles: createTableStyles(stringOne, stringTwo),

    buttons: createButtons(stringOne, stringTwo),
    buttonsStyles: createButtonsStyles(stringOne, stringTwo),

    handleButtonClick: buttonClick,
    handleRefreshClick: refresh,
};

export default state;