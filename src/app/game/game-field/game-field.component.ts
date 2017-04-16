import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Point } from '../shared/game.model';

@Component({
    selector: 'game-field',
    templateUrl: './game-field.component.html',
    styleUrls: ['./game-field.component.css']
})
export class GameFieldComponent {
    @Input() moves: Point[];
    @Input() dimX = 15;
    @Input() dimY = 15;
    @Output() clicks: EventEmitter<Point> = new EventEmitter();

    @ViewChild('field') field: ElementRef;

    click(event: MouseEvent) {
        let width = (<SVGElement>this.field.nativeElement).clientWidth;
        let height = (<SVGElement>this.field.nativeElement).clientHeight;
        let cellSize = width / this.dimX;
        let x = Math.floor(event.offsetX / cellSize);
        let y = Math.floor(event.offsetY / cellSize);
        this.clicks.emit(new Point(x, y));
    }

    get crisses() {
        return this.moves.filter((v, i) => !(i % 2))
    }

    get crosses() {
        return this.moves.filter((v, i) => i % 2);
    }
}