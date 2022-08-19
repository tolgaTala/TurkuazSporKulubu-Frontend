import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './components/home-page/confirmation/confirmation.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PaymentComponent } from './components/home-page/payment/payment.component';
import { PersonelComponent } from './components/home-page/personel/personel.component';
import { SeatComponent } from './components/home-page/seat/seat.component';
import { PlayerAddComponent } from './components/player-add/player-add.component';
import { PlayerUpdateComponent } from './components/player/player-update/player-update.component';
import { PlayerComponent } from './components/player/player.component';

const routes: Routes = [
  {path:"",component:HomePageComponent},
  {path:"player",component:PlayerComponent},
  {path:"playerAdd",component:PlayerAddComponent},
  {path:"playerUpdate",component:PlayerUpdateComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
