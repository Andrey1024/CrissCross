import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameFieldComponent } from './game-field/game-field.component';
import { CrissCrossComponent } from './criss-cross/criss-cross.component';

const appRoutes: Routes = [
    {
        path: 'game',
        component: CrissCrossComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class GameRoutingModule { }