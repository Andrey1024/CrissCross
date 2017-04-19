import { Point } from './point.model';
import { Line } from './line.model';

export interface Game {
    moves: Point[];
    lines: Line[][];
}


export interface MoveResult {
    ended: boolean;
    winLine?: Line;
}

export interface GetMoveResult {
    move: Point;
    result: MoveResult;
}

/**/