// src/app/services/data-loader.service.ts
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../../dataType';


@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {

  
  constructor(private http: HttpClient, private router: Router) { }

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private storageKey = 'emails';
  private jsonPath = 'assets/emailPassword.json';




  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  loadData(): void {
    this.http.get('assets/db.json').subscribe((data) => {
      localStorage.setItem('dbData', JSON.stringify(data));
    });
  }

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.jsonPath).pipe(
      tap(users => {
        if (this.isBrowser) {
          localStorage.setItem(this.storageKey, JSON.stringify(users));
        }
      })
    );
  }

  /** Get users stored in localStorage */
  getStoredUsers(): User[] {
    if (this.isBrowser) {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }

  /** Manually save a new user array */
  saveUsers(users: User[]): void {
    if (this.isBrowser) {
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    }
  }
}
