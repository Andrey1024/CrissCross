import { Action } from '@ngrx/store';
import { Point } from '../models/point.model';

export const MOVE = 'Move';

export class MoveAction implements Action {
    readonly type = MOVE;

    constructor(public payload: Point) { }
}