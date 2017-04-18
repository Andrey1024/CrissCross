import { Component, Input } from '@angular/core';
import { Point } from '../../models/point.model';

@Component({
    selector: '[cross]',
    templateUrl: './cross.component.html',
    styleUrls: ['./cross.component.css']
})
export class CrossComponent {
    @Input() crosses: Point[] = [];
}