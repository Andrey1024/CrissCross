import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Point } from '../../models/point.model';
import { Line } from '../../models/line.model';
import { GameService } from '../../services/game.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as movesActions from '../../actions/moves.action';
import * as gameActions from '../../actions/game.action';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/do';

import * as game from '../../reducers';

@Component({
    selector: 'criss-cross',
    templateUrl: './criss-cross.component.html',
    styleUrls: ['./criss-cross.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrissCrossComponent implements OnDestroy {
    crisses$: Observable<Point[]>;
    crosses$: Observable<Point[]>;
    gameState$: Observable<string>;
    winLine$: Observable<Line>;
    player$: Observable<number>;
    waiting$: Observable<boolean>;

    onClick = new Subject<Point>();
    reset = new Subject<void>();

    dimX = 15;
    dimY = 15;

    constructor(private store: Store<game.State>) {
        this.crisses$ = store.select(game.getCrisses);
        this.crosses$ = store.select(game.getCrosses);
        this.gameState$ = store.select(game.getCurrentGameState);
        this.winLine$ = store.select(game.getWinLine);
        this.player$ = store.select(game.getPlayer);
        this.waiting$ = store.select(game.getWaiting);
        this.onClick
            .withLatestFrom(this.player$, this.waiting$)
            .subscribe(([point, player, waiting]) => {
                !waiting ? this.store.dispatch(new movesActions.UserClickAction({point: point, player: player})) : null;
            })
        this.reset.subscribe(() => this.store.dispatch(new gameActions.ResetGameAction()));
    }


    ngOnDestroy() {
        this.onClick.unsubscribe();
        this.reset.unsubscribe();
    }
}
