import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { PlayerComponent } from './components/player/player.component';
import { PlayerAddComponent } from './components/player-add/player-add.component';
import { HomePageComponent } from './components/home-page/home-page.component';

import { ToastrModule } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {StepsModule} from 'primeng/steps';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { PersonelComponent } from './components/home-page/personel/personel.component';
import { SeatComponent } from './components/home-page/seat/seat.component';
import { PaymentComponent } from './components/home-page/payment/payment.component';
import { ConfirmationComponent } from './components/home-page/confirmation/confirmation.component';
import { PlayerUpdateComponent } from './components/player/player-update/player-update.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    PlayerAddComponent,
    HomePageComponent,
    PersonelComponent,
    SeatComponent,
    PaymentComponent,
    ConfirmationComponent,
    PlayerUpdateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    ButtonModule,
    TableModule,
    StepsModule,
    ToastModule,
    NgbModule,
    ConfirmDialogModule,
  ],
  exports: [ TableModule ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
