import { Component, Input } from '@angular/core';
import { Point } from '../shared/game.model';

@Component({
    selector: '[cross]',
    templateUrl: './cross.component.html',
    styleUrls: ['./cross.component.css']
})
export class CrossComponent {
    @Input() crosses: Point[] = [];
}