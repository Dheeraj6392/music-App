import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  images: string[] = [
    'https://preview.colorlib.com/theme/razo/img/bg-img/31.jpg.webp',
    'https://preview.colorlib.com/theme/razo/img/bg-img/32.jpg.webp',
    'https://preview.colorlib.com/theme/razo/img/bg-img/33.jpg.webp',
    'https://preview.colorlib.com/theme/razo/img/bg-img/34.jpg.webp'
  ];
  currentImage = this.images[0];
  nextImage = this.images[1];
  currentIndex = 0;

  currentOpacity = 1;
  nextOpacity = 0;

  textAnimation = true;

  ngOnInit(): void {
    setInterval(() => {
      // Start text animation
      this.textAnimation = false;

      setTimeout(() => {
        this.nextOpacity = 1;

        setTimeout(() => {
          // Swap images
          this.currentImage = this.nextImage;
          this.currentOpacity = 1;
          this.nextOpacity = 0;

          // Set up next image
          this.currentIndex = (this.currentIndex + 1) % this.images.length;
          const nextIndex = (this.currentIndex + 1) % this.images.length;
          this.nextImage = this.images[nextIndex];

          // Restart text animation
          this.textAnimation = true;
        }, 1500); // wait for image transition
      }, 2000); // slight delay before fading
    }, 5000); // every 5 seconds
  }
}