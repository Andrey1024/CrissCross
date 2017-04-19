import { Game, GetMoveResult, MoveResult } from '../models/game.model';
import { Point } from '../models/point.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Line } from '../models/line.model';
import { CrissCoss } from '../models/game-logic/game-instance';

@Injectable()
export class GameService {
    private gameInstanse = new CrissCoss(15, 15);

    isEmpty(point: Point): boolean {
        return this.gameInstanse.isEmpty(point);
    }

    isEnded(): boolean {
        return this.gameInstanse.isEnded();
    }

    move(point: Point): Observable<MoveResult> {
        const result = new Subject();

        setTimeout(() => {
            result.next(this.gameInstanse.addMove(point));
        });

        return result;
    }

    resetGame(): Observable<{}> {
        const result = new Subject();
        
        setTimeout(() => {
            this.gameInstanse = new CrissCoss(15, 15);
            result.next();
        });

        return result.asObservable();
    }

    getAiMove(): Promise<GetMoveResult> {
        return;
    }

    getEnemyMove(): Promise<GetMoveResult> {
        return;
    }
}