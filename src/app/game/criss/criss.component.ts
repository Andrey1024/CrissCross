import { Component, Input } from '@angular/core';
import { Point } from '../shared/game.model';

@Component({
    selector: '[criss]',
    templateUrl: './criss.component.html',
    styleUrls: ['./criss.component.css']
})
export class CrissComponent {
    @Input() crisses: Point[] = [];
}