import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GameFieldComponent } from './components/game-field/game-field.component';
import { GameGridComponent } from './components/game-grid/game-grid.component';
import { GameRoutingModule } from './game-routing.module';
import { CrissCrossComponent } from './containers/criss-cross/criss-cross.component';
import { CrissComponent } from './components/criss/criss.component';
import { CrossComponent } from './components/cross/cross.component';
import { WinLineComponent } from './components/win-line/win-line.component';

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