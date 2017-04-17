import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GameFieldComponent } from './game-field/game-field.component';
import { GameGridComponent } from './game-grid/game-grid.component';
import { GameRoutingModule } from './game-routing.module';
import { CrissCrossComponent } from './criss-cross/criss-cross.component';
import { CrissComponent } from './criss/criss.component';
import { CrossComponent } from './cross/cross.component';
import { WinLineComponent } from './win-line/win-line.component';

@NgModule({
    imports: [
        CommonModule,
        GameRoutingModule
    ],
    declarations: [
        GameFieldComponent,
        GameGridComponent,
        CrissCrossComponent,
        CrissComponent,
        CrossComponent,
        WinLineComponent
    ]
})
export class GameModule { }