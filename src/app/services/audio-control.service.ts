import { Injectable } from '@angular/core';
import { Songs } from '../../dataType';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioControlService {
  private currentSong: HTMLAudioElement | null = null; // Currently playing audio element
  private currentComponent: any; // Reference to the current component controlling the song
  
  constructor(private http : HttpClient) {}
  // This method is called to play a new song, or resume/pause the current one
  playNewSong(song: HTMLAudioElement, component: any): void {
    // If there is a current song and it's not the same as the new one, handle it
    if (this.currentSong && this.currentSong !== song) {
      // Pause the current song and reset its progress
      this.currentSong.pause();
      this.currentSong.currentTime = 0; // Reset the song's current time to 0
      
      // If there is a previous component, reset its button and progress bar
      if (this.currentComponent) {
        this.currentComponent.updatePlayButton(false); // Show play icon on the previous component
        this.currentComponent.resetProgressBar(); // Reset the progress bar on the previous component
      }
    }

    // Set the new song and component as current
    this.currentSong = song;
    this.currentComponent = component;
  }

  getAllSongs() : Observable<Songs[]>{
    return this.http.get<Songs[]>('http://localhost:8080/music')
  }
}
