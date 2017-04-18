import { CrissCoss } from '../models/game.model';
import { Point } from '../models/point.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Line } from '../models/line.model';

@Injectable()
export class GameService {
    crisses: Observable<Point[]>;
    crosses: Observable<Point[]>;
    winLine: Observable<Line>;


    newGame(): Promise<CrissCoss> {
    }

    move(pos: Point) {
    }
}