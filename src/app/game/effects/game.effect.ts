import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { GameService } from '../services/game.service';
import { MoveResult } from '../models/game.model';
import * as gameActions from '../actions/game.action';
import * as movesActions from '../actions/moves.action';

@Injectable()
export class GameEffects {

    @Effect()
    move: Observable<Action> = this.actions$
        .ofType(movesActions.USER_CLICK)
        .map(toPayload)
        .switchMap(msg => {
            if (this.gameService.isEnded() || !this.gameService.isEmpty(msg.point)) {
                return of(new movesActions.CancelMoveAction({}));
            }
            return this.gameService.move(msg.point).mergeMap(res => {
                let result = []
                if (res.ended) {
                    result.push(new gameActions.EndGameAction(res.winLine));
                }
                result.unshift(new movesActions.AddMoveAction({
                    point: msg.point, 
                    player: (msg.player + 1) % 2
                }));
                return result;
            })
        });

    @Effect()
    reset: Observable<Action> = this.actions$
        .ofType(gameActions.RESET_GAME)
        .switchMap(() => this.gameService.resetGame().map(() => new movesActions.CancelMoveAction({})))

    constructor(private actions$: Actions, private gameService: GameService) { }
}