import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AddSongComponent } from './add-song/add-song.component';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './auth.guard'; // Make sure the path is correct
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'addSong', component: AddSongComponent, canActivate: [authGuard] },
  // { path: 'header', component: HeaderComponent, canActivate: [authGuard] },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
