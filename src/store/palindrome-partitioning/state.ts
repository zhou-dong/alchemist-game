import { State as BasicState } from '../BasicState';

export interface State extends BasicState {
    readonly length: number;
    readonly palindromeTable: string[][];
    readonly palindromeTableStyles: React.CSSProperties[][];
}
