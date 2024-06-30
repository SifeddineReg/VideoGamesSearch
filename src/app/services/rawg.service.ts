import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private cache = new Map<string, any>();

  constructor() {}

  fetchGames(): Promise<any> {
    return fetch('https://api.rawg.io/api/games?key=c9545eec8e5e4b85bcf86ebdf01c7d3d')
      .then(response => response.json())
      .then(data => data.results);
  }

  fetchGameDetails(gameId: string): Promise<any> {
    if (this.cache.has(gameId)) {
      return Promise.resolve(this.cache.get(gameId));
    } else {
      return fetch(`https://api.rawg.io/api/games/${gameId}?key=c9545eec8e5e4b85bcf86ebdf01c7d3d`)
        .then(response => response.json())
        .then(data => {
          this.cache.set(gameId, data);
          return data;
        });
    }
  }
}