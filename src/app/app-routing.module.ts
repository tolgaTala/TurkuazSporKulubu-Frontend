import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PlayerAddComponent } from './components/player-add/player-add.component';
import { PlayerComponent } from './components/player/player.component';

const routes: Routes = [
  {path:"",component:HomePageComponent},
  {path:"player",component:PlayerComponent},
  {path:"playerAdd",component:PlayerAddComponent},
  {path:"home",component:HomePageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
