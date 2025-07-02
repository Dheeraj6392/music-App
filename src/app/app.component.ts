import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataLoaderService } from './services/data-loader.service';

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
  flag : boolean = false;

  constructor(private dataLoader : DataLoaderService){}

  ngOnInit(){
    let index = 0;
    this.colorChangeInterval = setInterval(()=>{
      this.currentColor = this.colors[index];
      index = (index + 1) % this.colors.length;
    } , 3000);

    this.dataLoader.loadData();
    this.dataLoader.loadUsers().subscribe(() => {
      const users = this.dataLoader.getStoredUsers();
      console.log('Loaded users from JSON:', users);
    });
  }

  ngOnDestroy(){
      clearInterval(this.colorChangeInterval) ;
  }
}
