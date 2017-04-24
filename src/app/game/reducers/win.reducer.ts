import { Point } from '../models/point.model';
import { Line } from '../models/line.model';
import * as game from '../actions/game.action';

export interface State {
    display: boolean;
    winLine: Line | null;
}

export const initialState: State = {
    display: false,
    winLine: null
}

export function reducer(state: State = initialState, action: game.Actions) {
    const { type, payload } = action;
    switch (type) {
        case game.END_GAME:
            return { display: true, winLine: payload };
        case game.RESET_GAME:
            return { display: false, winLine: null };
        default:
            return state;
    }
}

export const getWinLine = (state: State) => state.winLine;
export const getWon = (state: State) => state.display;