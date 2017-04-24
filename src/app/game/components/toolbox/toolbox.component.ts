import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'toolbox',
    templateUrl: './toolbox.component.html',
    styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent {
    @Output() reset = new EventEmitter();
}