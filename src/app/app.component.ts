import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit , OnDestroy{
  title = 'music-app';

  colors : string[]=['#000000' , '#1a1a1a' ,'#ff5733' ,'#33ff57' ,'#5733ff' ,'#ff33ff' ,'#ffff33' ,'#ff0000' ,];

  currentColor : string = this.colors[0];
  private colorChangeInterval : any;

  ngOnInit(){
    let index = 0;
    this.colorChangeInterval = setInterval(()=>{
      this.currentColor = this.colors[index];
      index = (index + 1) % this.colors.length;
    } , 3000);
  }

  ngOnDestroy(){
      clearInterval(this.colorChangeInterval) ;
  }
}
