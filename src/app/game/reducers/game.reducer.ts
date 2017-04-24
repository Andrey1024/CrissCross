import { Point } from '../models/point.model';
import { Line } from '../models/line.model';
import * as game from '../actions/game.action';
import * as moves from '../actions/moves.action';

export interface State {
    waiting: boolean;
    gameState: 'playing' | 'ended';
}

export const initialState: State = {
    waiting: false,
    gameState: 'playing'
}

export function reducer(state: State = initialState, action: game.Actions | moves.Actions) {
    const { type, payload } = action;
    switch (type) {
        case moves.USER_CLICK:
        case moves.REVERT_CLICK:
            return { ...state, waiting: true };
        case moves.ADD_MOVE:
        case moves.REVERT_MOVE:
        case moves.CANCEL_MOVE:
            return { ...state, waiting: false };
        case game.END_GAME:
            return { waiting: false, gameState: 'ended' };
        case game.RESET_GAME:
            return { waiting: false, gameState: 'playing' };
        default:
            return state;
    }
}

export const getWaiting = (state: State) => state.waiting;
export const getGameState = (state: State) => state.gameState;