import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GameService } from './services/game.service';

import { GameFieldComponent } from './components/game-field/game-field.component';
import { GameGridComponent } from './components/game-grid/game-grid.component';
import { GameRoutingModule } from './game-routing.module';
import { CrissCrossComponent } from './containers/criss-cross/criss-cross.component';
import { CrissComponent } from './components/criss/criss.component';
import { CrossComponent } from './components/cross/cross.component';
import { WinLineComponent } from './components/win-line/win-line.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducer, initialState } from './reducers/game.reducer';
import { GameEffects } from './effects/game.effect';

@NgModule({
    imports: [
        CommonModule,
        GameRoutingModule,
        StoreModule.provideStore(reducer, initialState),
        EffectsModule.run(GameEffects)
    ],
    declarations: [
        GameFieldComponent,
        GameGridComponent,
        CrissCrossComponent,
        CrissComponent,
        CrossComponent,
        WinLineComponent
    ],
    providers: [
        GameService
    ]
})
export class GameModule { }