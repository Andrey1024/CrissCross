import { Component, Input } from '@angular/core';

@Component({
    selector: 'player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})
export class PlayerComponent {
    @Input() player: number;
    @Input() waiting: boolean;
}