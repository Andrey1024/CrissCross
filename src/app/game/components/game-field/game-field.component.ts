import { Component, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Point } from '../../models/point.model';
import { Line } from '../../models/line.model';

@Component({
    selector: 'game-field',
    templateUrl: './game-field.component.html',
    styleUrls: ['./game-field.component.css'],
    inputs: ['crisses', 'crosses', 'dimX', 'dimY', 'winLine'],
    outputs: ['clicks']
})
export class GameFieldComponent {
    crisses: Point[];
    crosses: Point[];
    winLine: Line;
    dimX = 15;
    dimY = 15;

    clicks: EventEmitter<Point> = new EventEmitter();

    @ViewChild('field') field: ElementRef;

    click(event: MouseEvent) {
        let bbox = (<SVGElement>this.field.nativeElement).getBoundingClientRect();
        let width = bbox.width;
        let height = bbox.height;
        let cellSize = width / this.dimX;
        let x = Math.floor(event.offsetX / cellSize);
        let y = Math.floor(event.offsetY / cellSize);
        this.clicks.emit({x: x, y: y});
    }
}