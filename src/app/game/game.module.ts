import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GameFieldComponent } from './game-field/game-field.component';
import { GameGridComponent } from './game-grid/game-grid.component';
import { GameRoutingModule } from './game-routing.module';
import { CrissCrossComponent } from './criss-cross/criss-cross.component';

@NgModule({
    imports: [
        CommonModule,
        GameRoutingModule
    ],
    declarations: [
        GameFieldComponent,
        GameGridComponent,
        CrissCrossComponent
    ]
})
export class GameModule { }