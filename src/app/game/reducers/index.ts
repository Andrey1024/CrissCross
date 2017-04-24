import * as fromGame from './game.reducer';
import * as fromMoves from './moves.reducer';
import * as fromWin from './win.reducer';
import { ActionReducer } from '@ngrx/store';

import { combineReducers } from '@ngrx/store';
import { createSelector } from 'reselect';
import { compose } from '@ngrx/core/compose';

export interface State {
    game: fromGame.State;
    moves: fromMoves.State;
    win: fromWin.State;
}

const reducers = {
    game: fromGame.reducer,
    moves: fromMoves.reducer,
    win: fromWin.reducer
}

export function reducer(state: any, action: any) {
    return compose(combineReducers)(reducers)(state, action);
}

export const getGameState = (state: State) => state.game;
export const getMovesState = (state: State) => state.moves;
export const getWinState = (state: State) => state.win;

export const getCrisses = createSelector(getMovesState, fromMoves.getCrisses);
export const getCrosses = createSelector(getMovesState, fromMoves.getCrosses);
export const getPlayer = createSelector(getMovesState, fromMoves.getPlayer);

export const getWon = createSelector(getWinState, fromWin.getWon);
export const getWinLine = createSelector(getWinState, fromWin.getWinLine);

export const getWaiting = createSelector(getGameState, fromGame.getWaiting);
export const getCurrentGameState = createSelector(getGameState, fromGame.getGameState);