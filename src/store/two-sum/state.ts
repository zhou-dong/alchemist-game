import { State as BasicState } from '../BasicState';

export interface State extends BasicState {
    readonly target: number;
}
