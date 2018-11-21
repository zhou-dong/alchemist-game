import { State as BasicState } from '../BasicState';

export interface State extends BasicState {
    readonly length: number;
    readonly marksTable: number[][];
}
