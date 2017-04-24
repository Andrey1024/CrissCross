import { Action } from '@ngrx/store';
import { Point } from '../models/point.model';
import { Line } from '../models/line.model';

export const RESET_GAME  = '[Game] Reset Game';
export const END_GAME    = '[Game] End Game';


export class ResetGameAction implements Action {
    readonly type = RESET_GAME;

    constructor(public payload?) { }
}

export class EndGameAction implements Action {
    readonly type = END_GAME;

    constructor(public payload: Line) { }
}


export type Actions
    = ResetGameAction
    | EndGameAction;