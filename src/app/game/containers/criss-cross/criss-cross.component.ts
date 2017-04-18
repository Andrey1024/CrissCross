import { Component } from '@angular/core';
import { CrissCoss } from '../../models/game.model';
import { Point } from '../../models/point.model';
import { GameService } from '../../services/game.service';

@Component({
    selector: 'criss-cross',
    templateUrl: './criss-cross.component.html',
    styleUrls: ['./criss-cross.component.css'],
    providers: [ GameService ]
})
export class CrissCrossComponent {
    game: CrissCoss;

    constructor(private gameService: GameService) {
    }

    click(pos: Point) {
        this.game.addMove(pos);
    }
}
