import { State } from './types';

const state: State = {
    id: 1,
    success: true,
    loading: false,
    steps: 20,
    errors: 10,
    title: 'Edit Distance',
    subHeader: 'Hard',
    tableMatrix: [
        ['a', 'b', 'c', 'd', 'e'],
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
    ],
    tableStyles: [
        [{ color: 'yellow' }, { color: 'red' }, { color: 'red' }, { color: 'red' }, { color: 'red' }],
        [{ color: 'yellow' }, { color: 'yellow' }, { color: 'red' }, { color: 'red' }, { color: 'red' }],
        [{ color: 'yellow' }, { color: 'red' }, { color: 'yellow' }, { color: 'red' }, { color: 'red' }],
        [{ color: 'yellow' }, { color: 'yellow' }, { color: 'red' }, { color: 'red' }, { color: 'red' }],
    ],
    buttonsArray: ['a', 1, 2, 3, 4],
    buttonsStyles:
        [{ color: 'red' }, { color: 'red' }, { color: 'red' }, { color: 'red' }, { color: 'red' }],
    buttonsHandleClick: (data: number | string) => alert(data),
};

export default state;