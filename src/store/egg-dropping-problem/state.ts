import { State as BasicState } from '../BasicState';

export interface State extends BasicState {
    readonly helperTable: (string | number)[][];
    readonly resultsInDifferentFloors: number[];
}
