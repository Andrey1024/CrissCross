import { CrissCoss } from './game.model';
import { Point } from './point.model';
import { Injectable } from '@angular/core';

@Injectable()
export class GameService {
    game: CrissCoss;

    newGame(): Promise<CrissCoss> {
        this.game = new CrissCoss(15, 15);
        return Promise.resolve(this.game);
    }

    move(pos: Point) {
        this.game.moves.push(pos);
    }
}