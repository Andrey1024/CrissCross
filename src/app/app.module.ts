import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GameModule } from './game/game.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdToolbarModule } from '@angular/material';
import { MdCardModule } from '@angular/material';

const appConfiguration: NgModule = {
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        GameModule,
        MdToolbarModule,
        MdCardModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
}

@NgModule(appConfiguration)
export class AppModule { }
