import { Component, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { AudioControlService } from '../audio-control.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  @Input() track: { image: string; audio: string } | undefined; // Input for track data
  @ViewChild('song') song!: ElementRef<HTMLAudioElement>;
  @ViewChild('progress') progress!: ElementRef<HTMLInputElement>;
  @ViewChild('ctrlIcon') ctrlIcon!: ElementRef<HTMLElement>;

  constructor(private audioControlService: AudioControlService) {}

  ngAfterViewInit(): void {
    // Set the audio source from the Input track object
    if (this.track) {
      this.song.nativeElement.src = this.track.audio; // Set audio source dynamically
    }

    // Set the progress bar max value based on song duration
    this.song.nativeElement.onloadedmetadata = () => {
      this.progress.nativeElement.max = this.song.nativeElement.duration.toString();
    };

    // Update progress bar value as song plays
    this.song.nativeElement.ontimeupdate = () => {
      this.progress.nativeElement.value = this.song.nativeElement.currentTime.toString();
    };
  }

  // Play or Pause the song
  playPause(): void {
    const song = this.song.nativeElement;
    const ctrlIcon = this.ctrlIcon.nativeElement;

    // Control multiple tracks using the service
    if (song.paused) {
      this.audioControlService.playNewSong(song, this); // Pass current component reference
      song.play();
      ctrlIcon.classList.remove('bi-play-fill');
      ctrlIcon.classList.add('bi-pause-fill');
    } else {
      song.pause();
      ctrlIcon.classList.remove('bi-pause-fill');
      ctrlIcon.classList.add('bi-play-fill');
    }
  }

  // Update the play button state based on whether the song is playing
  updatePlayButton(isPlaying: boolean): void {
    const ctrlIcon = this.ctrlIcon.nativeElement;
    if (isPlaying) {
      ctrlIcon.classList.remove('bi-play-fill');
      ctrlIcon.classList.add('bi-pause-fill');
    } else {
      ctrlIcon.classList.remove('bi-pause-fill');
      ctrlIcon.classList.add('bi-play-fill');
    }
  }

  // Reset the progress bar to 0
  resetProgressBar(): void {
    this.progress.nativeElement.value = '0'; // Reset the value to 0
  }

  // This method allows the user to manually change the song's current time using the progress bar
  updateSongTime(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const newTime = parseFloat(inputElement.value);
    
    if (this.song?.nativeElement) {
      this.song.nativeElement.currentTime = newTime;
    }

  }
 
}
