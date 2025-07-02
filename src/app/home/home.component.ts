import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AudioControlService } from '../services/audio-control.service';
import { Songs } from '../../dataType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  tracks: Songs[] = [];
  selectedIndex: number = -1;
  musicTrack: string = '';


  @ViewChild('song') song!: ElementRef<HTMLAudioElement>;
  @ViewChild('progress') progress!: ElementRef<HTMLInputElement>;
  @ViewChild('ctrlIcon') ctrlIcon!: ElementRef<HTMLElement>;

  constructor(private audioService: AudioControlService) { }

  ngAfterViewInit(): void {
    this.audioService.getAllSongs().subscribe({
      next: (result) => {
        this.tracks = result;
      },
      error: (err) => console.error('Song load error:', err)
    });

    this.audioService.registerAudioElement(this.song.nativeElement, this);
  }

  playPause(): void {
    this.audioService.togglePlayPause();
  }

  changeTrack(songUrl: string, index: number) {
    this.selectedIndex = index;
    this.audioService.changeTrack(index);
  }

  backwardSong() {
    if (this.selectedIndex != 0) {
      this.selectedIndex -= 1;
      this.audioService.previousTrack();
    }
  }

  forwardSong() {
    if (this.selectedIndex < this.tracks.length - 1) {
      this.selectedIndex += 1;
      this.audioService.nextTrack();
    }
  }

  updateSongTime(event: Event) {
    const time = parseFloat((event.target as HTMLInputElement).value);
    this.audioService.seekTo(time);
  }

  // METHODS CALLED BY SERVICE
  setTrackSource(url: string) {
    this.musicTrack = url;
  }

  setProgressMax(duration: number) {
    this.progress.nativeElement.max = duration.toString();
  }

  updateProgress(currentTime: number) {
    this.progress.nativeElement.value = currentTime.toString();
  }

  updatePlayButton(isPlaying: boolean) {
    const icon = this.ctrlIcon.nativeElement;
    icon.classList.toggle('bi-play-fill', !isPlaying);
    icon.classList.toggle('bi-pause-fill', isPlaying);
  }

  resetProgressBar() {
    this.progress.nativeElement.value = '0';
  }
}
