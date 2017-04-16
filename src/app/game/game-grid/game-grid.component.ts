import { Component, Input, OnChanges} from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
    selector: '[game-grid]',
    templateUrl: './game-grid.component.html',
    styleUrls: ['./game-grid.component.css']
})
export class GameGridComponent implements OnChanges {
    @Input() dimX: number;
    @Input() dimY: number;

    xIterator = [];
    yIterator = [];

    ngOnChanges() {
        this.xIterator = new Array(this.dimX + 1).fill(0).map((v, i) => i);
        this.yIterator = new Array(this.dimY + 1).fill(0).map((v, i) => i);
    }
}