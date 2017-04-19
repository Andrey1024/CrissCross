import { Action } from '@ngrx/store';
import { Point } from '../models/point.model';
import { Line } from '../models/line.model';

export const MOVE        = '[Game] Move';
export const ADD_MOVE    = '[Game] Add Move';
export const RESET_GAME  = '[Game] Reset Game';
export const END_GAME    = '[Game] End Game';
export const CANCEL_MOVE = '[Game] Cancel Move';

export class MoveAction implements Action {
    readonly type = MOVE;

    constructor(public payload: {point: Point, player: number}) { }
}

export class AddMoveAction implements Action {
    readonly type = ADD_MOVE;

    constructor(public payload: {point: Point, nextPlayer: number, player: number, ended: boolean}) { }
}

export class ResetGameAction implements Action {
    readonly type = RESET_GAME;

    constructor(public payload) { }
}

export class EndGameAction implements Action {
    readonly type = END_GAME;

    constructor(public payload: Line) { }
}

export class CancelMoveAction implements Action {
    readonly type = CANCEL_MOVE;

    constructor(public payload) { }
}

export type Actions
    = MoveAction
    | AddMoveAction
    | ResetGameAction
    | EndGameAction
    | CancelMoveAction;