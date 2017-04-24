import { Point } from './point.model';

export interface Line {
    points: Point[];
    first: Point;
    last: Point;
    direction: Point;
}

/**/