import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AddSongComponent } from './add-song/add-song.component';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './auth.guard'; // Make sure the path is correct
import { HeaderComponent } from './header/header.component';
import { PodcastComponent } from './podcast/podcast.component';
import { VideosComponent } from './videos/videos.component';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, 
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'footer', component: FooterComponent },
      { path: 'home', component: HomeComponent },
      { path: 'header', component: HeaderComponent },
      { path: 'podcast', component: PodcastComponent },
      { path: 'home', component: HomeComponent },
      { path: 'videos', component: VideosComponent },
    ]
  },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
