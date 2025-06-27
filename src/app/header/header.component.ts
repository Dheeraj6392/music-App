import { Component, HostListener, OnInit } from '@angular/core';
import { AudioControlService } from '../services/audio-control.service';
import { HttpClient } from '@angular/common/http';
import { Songs } from '../../dataType';
import { Observable } from 'rxjs';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isSidebarOpen = false;
  dropdownVisible = false;
  allSongs: string[] = [];
  searchResult: string[] = [];
  selectedIndex = 0;
  tracks: Songs[] = [];
  searchResults: Songs[] = [];
  private apiUrl = 'http://localhost:8080/music/All';


  constructor(private audioService: AudioControlService, private http: HttpClient, private songService: SongService) { }

  ngOnInit() {
    // this.http.get<string[]>(this.apiUrl).subscribe(data => {
    //   this.allSongs = data;
    //   console.log(this.allSongs); // ✅ This logs correct data after fetch
    // });
    this.audioService.getAllSongs().subscribe({
      next: (result) => {
        this.tracks = result;
      },
      error: (err) => console.error('Song load error:', err)
    });
  }


  // Method to toggle the sidebar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Listen for clicks outside the sidebar to close it
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = (event.target as HTMLElement).closest('.sidebar, .three-dots-icon');
    if (!clickedInside) {
      this.isSidebarOpen = false; // Close the sidebar if clicked outside
    }
  }


  // Function to toggle dropdown visibility
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }


  changeTrack(songUrl: string, index: number) {
    this.selectedIndex = index;
    this.audioService.changeTrack(index);
  }

  search(query: string): void {
    const lowerQuery = query.trim().toLowerCase();

    if (lowerQuery === '') {
      this.searchResults = [];
      return;
    }

    this.searchResults = this.tracks.filter(track =>
      track.name.toLowerCase().includes(lowerQuery)
    );
  }

  onSongSelect(song: Songs, inputRef: HTMLInputElement): void {
  const index = this.tracks.findIndex(t => t.song === song.song);

  if (index !== -1) {
    this.changeTrack(song.song, index);   // play the song
    this.searchResults = [];              // close dropdown
    inputRef.value = '';                  // clear input box
  }
}
  // playSelectedSong(songName: string) {
  //   this.audioService.playTrackByName(songName);
  //   this.searchResult = []; // hide dropdown after selection
  // }

}
