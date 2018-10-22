import { State } from '../State';
import { Difficulty } from '../State';

import {
    createTableMatrix,
    createComparedTable,
    createTableStyles,
    createButtons,
    createButtonsStyles,
    startPoint,
} from '../../algorithms/edit-distance';

const stringOne = 'AGGCT';
const stringTwo = 'GATC';

const state: State = {
    id: 0,
    success: false,
    loading: false,
    steps: 0,
    errors: 0,
    title: 'Edit Distance',
    time: 0,

    difficulty: Difficulty.Easy,
    currentPoint: startPoint,

    comparedTable: createComparedTable(stringOne, stringTwo),
    tableMatrix: createTableMatrix(stringOne, stringTwo),
    tableStyles: createTableStyles(stringOne, stringTwo),

    buttons: createButtons(stringOne, stringTwo),
    buttonsStyles: createButtonsStyles(stringOne, stringTwo),
};

export default state;