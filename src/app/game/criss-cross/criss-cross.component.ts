import { Component } from '@angular/core';
import { Point, CrissCoss } from '../shared/game.model';
import { GameService } from '../shared/game.service';

@Component({
    selector: 'criss-cross',
    templateUrl: './criss-cross.component.html',
    styleUrls: ['./criss-cross.component.css'],
    providers: [ GameService ]
})
export class CrissCrossComponent {
    game: CrissCoss;

    constructor(private gameService: GameService) {
        this.gameService.newGame().then(game => this.game = game);
    }

    click(pos: Point) {
        this.game.addMove(pos);
    }
}
