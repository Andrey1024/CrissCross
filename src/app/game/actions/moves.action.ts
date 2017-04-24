import { Action } from '@ngrx/store';
import { Point } from '../models/point.model';
import { Line } from '../models/line.model';

export const USER_CLICK   = '[Moves] User Click';
export const ADD_MOVE     = '[Moves] Add Move';
export const REVERT_CLICK = '[Moves] Revert Click';
export const REVERT_MOVE  = '[Moves] Revert Move';
export const CANCEL_MOVE  = '[Moves] Cancel Move';

export class UserClickAction implements Action {
    readonly type = USER_CLICK;

    constructor(public payload: { point: Point, player: number }) { }
}

export class AddMoveAction implements Action {
    readonly type = ADD_MOVE;

    constructor(public payload: { point: Point, player: number }) { }
}

export class RevertClickAction implements Action {
    readonly type = REVERT_CLICK;

    constructor(public payload: any) { }
}

export class RevertMoveAction implements Action {
    readonly type = REVERT_MOVE;

    constructor(public payload: { player: number }) { }
}


export class CancelMoveAction implements Action {
    readonly type = CANCEL_MOVE;

    constructor(public payload) { }
}

export type Actions
    = UserClickAction
    | AddMoveAction
    | RevertClickAction
    | RevertMoveAction
    | CancelMoveAction;