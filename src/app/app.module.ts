import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { PlayerComponent } from './components/player/player.component';
import { PlayerAddComponent } from './components/player-add/player-add.component';
import { HomePageComponent } from './components/home-page/home-page.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    PlayerAddComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
  ],
  exports: [ TableModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
