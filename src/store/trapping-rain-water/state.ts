import { State as BasicState } from '../BasicState';

export interface State extends BasicState {
    readonly heights: number[];
    readonly water: number[];
    readonly leftMax: number[];
    readonly rightMax: number[];
}
