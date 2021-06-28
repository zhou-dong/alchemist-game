import { State as BasicState } from '../BasicState';
import { Guiders } from "../../algorithms/trapping-rain-water-ii/algorithm";

export interface State extends BasicState {
    readonly heights: number[];
    readonly waters: number[];
    readonly leftMax: number[];
    readonly rightMax: number[];
    readonly guiders: Guiders;
}
