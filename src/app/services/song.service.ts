import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Songs } from '../../dataType';

@Injectable({
  providedIn: 'root',
})
export class SongService {

  private baseUrl = 'http://localhost:8080/music';

  constructor(private http: HttpClient) { }

  addSong(song: Songs): Observable<Songs> {
    return this.http.post<Songs>(this.baseUrl, song);
  }

  seachMusic(musicname: string) {
    return this.http.get<string[]>(`${this.baseUrl}/searchMusic`, { params: { musicname } }
    );
  }
}
