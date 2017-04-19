import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrissCrossComponent } from './containers/criss-cross/criss-cross.component';

const appRoutes: Routes = [
    {
        path: '',
        component: CrissCrossComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class GameRoutingModule { }