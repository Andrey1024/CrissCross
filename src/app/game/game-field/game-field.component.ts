import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CrissCoss, Point } from '../shared/game.model';

@Component({
    selector: 'game-field',
    templateUrl: './game-field.component.html',
    styleUrls: ['./game-field.component.css']
})
export class GameFieldComponent {
    @Input() game: CrissCoss;
    @Output() move: EventEmitter<Point> = new EventEmitter();

    click(event: MouseEvent) {

        this.move.emit(new Point(10, 10));
    }
}