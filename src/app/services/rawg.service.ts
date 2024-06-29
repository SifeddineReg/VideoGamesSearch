import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environement/environement';

@Injectable({
  providedIn: 'root'
})
export class RawgService {
  private apiUrl = 'https://api.rawg.io/api';

  constructor(private http: HttpClient) {}

  searchGames(query: string): Observable<any> {
    const params = new HttpParams()
      .set('key', environment.apiKey)
      .set('search', query);

    return this.http.get(`${this.apiUrl}/games`, { params });
  }
}
