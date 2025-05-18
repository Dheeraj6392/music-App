import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AddSongComponent } from './add-song/add-song.component';

const routes: Routes = [
  {
    path : '',
    component: HomeComponent
  },
  {
    path : 'signin',
    component : SignInComponent
  },
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : 'addSong',
    component : AddSongComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
