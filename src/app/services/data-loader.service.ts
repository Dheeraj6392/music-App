// src/app/services/data-loader.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {
  constructor(private http: HttpClient) {}

  loadData(): void {
    this.http.get('/assets/db.json').subscribe((data) => {
      localStorage.setItem('dbData', JSON.stringify(data));
    });
  }
}
