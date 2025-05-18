import { Component, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { AudioControlService } from '../services/audio-control.service';
import { Songs } from '../../dataType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  clr: string = '';
  tracks: Songs[] = [];
  
  selectedIndex : number = 0;
  musicTrack: string = 'assets/Jaan-Hai-Meri(PagalWorld).mp3';
  @Input() track: { image: string; audio: string } | undefined; // Input for track data
  @ViewChild('song') song!: ElementRef<HTMLAudioElement>;
  @ViewChild('progress') progress!: ElementRef<HTMLInputElement>;
  @ViewChild('ctrlIcon') ctrlIcon!: ElementRef<HTMLElement>;
  constructor(private audioControlService: AudioControlService) { }

  ngAfterViewInit(): void {

    // Set the progress bar max value based on song duration
    this.song.nativeElement.onloadedmetadata = () => {
      this.progress.nativeElement.max = this.song.nativeElement.duration.toString();
    };

    // Update progress bar value as song plays
    this.song.nativeElement.ontimeupdate = () => {
      this.progress.nativeElement.value = this.song.nativeElement.currentTime.toString();
    };


    this.audioControlService.getAllSongs().subscribe({
      next: (result) => {
        this.tracks = (result);
      },
      error: (error) => {
        console.error('Error Fetching song ', error);
      }
    });

  }

  // Play or Pause the song
  playPause(): void {
    const song = this.song.nativeElement;
    console.log(song);
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
    console.log(inputElement);
    const newTime = parseFloat(inputElement.value);

    if (this.song?.nativeElement) {
      this.song.nativeElement.currentTime = newTime;
    }

  }


  changeTrack(data: string , i : number) {
    this.musicTrack = data; // Change the track URL
    // Reload the audio element
    setTimeout(() => {
      this.song.nativeElement.load();
      this.song.nativeElement.play(); // Auto-play after change (optional)
    }, 100);
    this.updatePlayButton(true);
    this.selectedIndex = i;
  }

  backwardSong(){
    this.changeTrack(this.tracks[(this.selectedIndex - 1) % this.tracks.length].song , this.selectedIndex - 1);
  }
  forwardSong(){
    this.changeTrack(this.tracks[(this.selectedIndex + 1) % this.tracks.length].song , this.selectedIndex + 1);
  }
} 
