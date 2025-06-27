import { Injectable } from '@angular/core';
import { Songs } from '../../dataType';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioControlService {
  private currentSongElement: HTMLAudioElement | null = null;
  private currentComponentRef: any = null;
  private currentTrackIndex: number = 0;
  private tracks: Songs[] = [];

  private isPlayingSubject = new Subject<boolean>();
  isPlaying$ = this.isPlayingSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Load songs from localStorage or backend
  getAllSongs(): Observable<Songs[]> {
    const data = localStorage.getItem('dbData');
    let parsedData: any = [];

    if (data) {
      const obj = JSON.parse(data);
      parsedData = Array.isArray(obj.songs) ? obj.songs : [];
    }

    this.tracks = parsedData;
    return of(this.tracks);
  }

  // Assign audio and component
  registerAudioElement(audio: HTMLAudioElement, component: any) {
    this.currentSongElement = audio;
    this.currentComponentRef = component;

    // Set progress max on load
    audio.onloadedmetadata = () => {
      component.setProgressMax(audio.duration);
    };

    // Sync progress while playing
    audio.ontimeupdate = () => {
      component.updateProgress(audio.currentTime);
    };
  }

  // Play or pause
  togglePlayPause() {
    if (!this.currentSongElement) return;

    if (this.currentSongElement.paused) {
      this.stopOtherSongs();
      this.currentSongElement.play();
      this.currentComponentRef.updatePlayButton(true);
      this.isPlayingSubject.next(true);
    } else {
      this.currentSongElement.pause();
      this.currentComponentRef.updatePlayButton(false);
      this.isPlayingSubject.next(false);
    }
  }

  // Stop others
  stopOtherSongs() {
    if (this.currentSongElement) {
      this.currentSongElement.pause();
      this.currentSongElement.currentTime = 0;
      this.currentComponentRef.updatePlayButton(false);
      this.currentComponentRef.resetProgressBar();
    }
  }

  // Change track
  changeTrack(index: number) {
    if (!this.tracks[index]) return;

    this.currentTrackIndex = index;
    const songURL = this.tracks[index].song;
    this.currentComponentRef.setTrackSource(songURL);

    setTimeout(() => {
      if (this.currentSongElement) {
        this.currentSongElement.load();
        this.currentSongElement.play();
        this.currentComponentRef.updatePlayButton(true);
      }
    }, 100);
  }

  nextTrack() {
    const nextIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.changeTrack(nextIndex);
  }

  previousTrack() {
    const prevIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.changeTrack(prevIndex);
  }

  seekTo(time: number) {
    if (this.currentSongElement) {
      this.currentSongElement.currentTime = time;
    }
  }

  getTrackList(): Songs[] {
    return this.tracks;
  }

  getCurrentTrackIndex(): number {
    return this.currentTrackIndex;
  }

  playTrackByName(name: string): void {
  const index = this.tracks.findIndex(track => track.name.toLowerCase() === name.toLowerCase());
  if (index !== -1) {
    this.changeTrack(index);
  } else {
    console.warn('Track not found:', name);
  }
}
}
