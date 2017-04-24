import { Point } from '../models/point.model';
import * as moves from '../actions/moves.action';
import * as game from '../actions/game.action';

export interface State {
    moves: Point[];
    player: number;
}

export const initialState: State = {
    moves: [],
    player: 0
};

export function reducer(state: State = initialState, action: moves.Actions | game.Actions) {
    const { type, payload } = action;
    switch (type) {
        case moves.ADD_MOVE:
            return { moves: state.moves.concat(payload.point), player: payload.player };
        case moves.REVERT_MOVE:
            return { moves: state.moves.slice(-1), player: payload.player };
        case game.RESET_GAME:
            return { ...initialState };
        default:
            return state;
    }
}

export const getCrosses = (state: State) => state.moves.filter((v, i) => !(i % 2));
export const getCrisses = (state: State) => state.moves.filter((v, i) => i % 2);

export const getPlayer = (state: State) => state.player;