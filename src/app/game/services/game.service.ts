import { Game, GetMoveResult, MoveResult } from '../models/game.model';
import { Point } from '../models/point.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Line } from '../models/line.model';
import { CrissCross } from '../models/game-logic/criss-cross';
import { AI } from '../models/game-logic/ai';

@Injectable()
export class GameService {
    private gameInstanse = new CrissCross(15, 15);
    private ai = new AI();

    isEmpty(point: Point): boolean {
        return this.gameInstanse.isEmpty(point);
    }

    isEnded(): boolean {
        return this.gameInstanse.isEnded();
    }

    move(point: Point): Observable<MoveResult> {
        const result = new Subject<MoveResult>();

        setTimeout(() => {
            result.next(this.gameInstanse.addMove(point));
        });

        return result;
    }

    resetGame(): Observable<{}> {
        const result = new Subject();
        
        setTimeout(() => {
            this.gameInstanse = new CrissCross(15, 15);
            result.next();
        });

        return result.asObservable();
    }

    getAiMove(): Observable<GetMoveResult> {
        const result = new Subject<GetMoveResult>();

        setTimeout(() => {
            const move = this.ai.getMove(this.gameInstanse);
            result.next({
                move: move,
                result: this.gameInstanse.addMove(move)
            });
        });

        return result;
    }

    getEnemyMove(): Promise<GetMoveResult> {
        return;
    }
}