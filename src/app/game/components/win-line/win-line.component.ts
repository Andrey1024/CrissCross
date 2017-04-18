import { Component, Input } from '@angular/core';
import { Line } from '../../models/line.model';

@Component({
    selector: '[win-line]',
    templateUrl: './win-line.component.html',
    styleUrls: ['./win-line.component.css']
})
export class WinLineComponent {
    @Input() winLine: Line;
}