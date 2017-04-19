import { Point } from '../models/point.model';
import { Line } from '../models/line.model';
import * as game from '../actions/game.action';

export interface State {
    moves: Point[][];
    waiting: boolean;
    gameState: 'playing' | 'ended';
    winLine: Line;
    player: number;
}

export const initialState: State = {
    moves: [[], []],
    waiting: false,
    gameState: 'playing',
    winLine: null,
    player: 0
}

export function reducer(state: State = initialState, action: game.Actions) {
    const { type, payload } = action;
    switch (action.type) {
        case game.MOVE:
            if (state.gameState == 'playing') {
                return Object.assign({}, state, { waiting: true });
            } else {
                return state;
            }
        case game.ADD_MOVE:
            return Object.assign({}, state, {
                moves: state.moves.map((p, i) => i == payload.player ? p.concat(payload.point) : p),
                waiting: false,
                player: payload.nextPlayer,
                gameState: payload.ended ? 'ended' : 'playing'
            })
        case game.END_GAME:
            return Object.assign({}, state, {
                winLine: payload,
                gameState: 'ended'
            })
        case game.RESET_GAME:
            return Object.assign({}, initialState, { waiting: true });
        case game.CANCEL_MOVE:
            return Object.assign({}, state, { waiting: false });
        default:
            return state;
    }
}

export const getCrisses = (state: State) => state.moves[1];

export const getCrosses = (state: State) => state.moves[0];

export const getPlayer = (state: State) => state.player;

export const getWaiting = (state: State) => state.waiting;

export const getGameState =(state: State) => state.gameState;

export const getWinLine = (state: State) => state.winLine;