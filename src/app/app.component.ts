import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'music-app';

  tracks = [
    {
      image: 'assets/music-boy.jpg',
      audio: 'assets/Jaan-Hai-Meri(PagalWorld).mp3'
    },
    {
      image: 'assets/music-girl.jpg',
      audio: 'assets/Pehli-Nazar-Mein(PagalWorldl).mp3' // Add additional tracks as needed
    },
    {
      image: 'assets/music-girl.jpg',
      audio: 'assets/Pehli-Nazar-Mein(PagalWorldl).mp3' // Add additional tracks as needed
    },
    {
      image: 'assets/music-boy.jpg',
      audio: 'assets/Jaan-Hai-Meri(PagalWorld).mp3'
    },
    {
      image: 'assets/music-girl.jpg',
      audio: 'assets/Pehli-Nazar-Mein(PagalWorldl).mp3' // Add additional tracks as needed
    },
    {
      image: 'assets/music-girl.jpg',
      audio: 'assets/Pehli-Nazar-Mein(PagalWorldl).mp3' // Add additional tracks as needed
    },
    {
      image: 'assets/music-boy.jpg',
      audio: 'assets/Jaan-Hai-Meri(PagalWorld).mp3'
    },
    {
      image: 'assets/music-girl.jpg',
      audio: 'assets/Pehli-Nazar-Mein(PagalWorldl).mp3' // Add additional tracks as needed
    },
    {
      image: 'assets/music-girl.jpg',
      audio: 'assets/Pehli-Nazar-Mein(PagalWorldl).mp3' // Add additional tracks as needed
    }
    // Add more tracks as needed
  ];
}
