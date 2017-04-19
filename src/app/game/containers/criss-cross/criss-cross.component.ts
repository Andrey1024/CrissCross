import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Point } from '../../models/point.model';
import { Line } from '../../models/line.model';
import { GameService } from '../../services/game.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as game from '../../reducers/game.reducer';
import * as actions from '../../actions/game.action';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/do';

@Component({
    selector: 'criss-cross',
    templateUrl: './criss-cross.component.html',
    styleUrls: ['./criss-cross.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrissCrossComponent {
    crisses: Observable<Point[]>;
    crosses: Observable<Point[]>;
    gameState: Observable<string>;
    winLine: Observable<Line>;
    player: Observable<number>;

    onClick = new Subject<Point>();

    dimX = 15;
    dimY = 15;

    constructor(private store: Store<game.State>) {
        this.crisses = store.select(game.getCrisses);
        this.crosses = store.select(game.getCrosses);
        this.gameState = store.select(game.getGameState);
        this.winLine = store.select(game.getWinLine);
        this.player = store.select(game.getPlayer);
        this.onClick.withLatestFrom(this.player).subscribe(([point, player]) => {
            this.store.dispatch(new actions.MoveAction({point: point, player: player}));
        })
    }

    reset() {
        this.store.dispatch(new actions.ResetGameAction({}));
    }
}
