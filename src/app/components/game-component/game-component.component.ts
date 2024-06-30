import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  imports: [NgFor],
  styleUrls: ['./game-component.component.css']
})
export class GameComponent implements OnInit {
  game: any = {};
  genres: any[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const gameId = params['id'];
      this.fetchGameDetails(gameId);
    });
  }

  fetchGameDetails(gameId: string): void {
  fetch(`https://api.rawg.io/api/games/${gameId}?key=c9545eec8e5e4b85bcf86ebdf01c7d3d`)
    .then(response => response.json())
    .then(data => {
      this.game = {
        ...data,
        genres: data.genres || []
      };
    });
  }

  getIconClass(slug: string): string {
    switch (slug) {
      case 'playstation-store':
        return 'bi bi-playstation';
      case 'xbox-store':
        return 'bi bi-xbox';
      default:
        return `bi bi-${slug}`;
    }
  }

  formatDevelopers(developers: any[]): string {
    return developers.map(developer => developer.name).join(', ');
  }

  formatGenres(genres: any[]): string {
    return genres.map(genre => genre.name).join(', ');
  }

  formatTags(tags: any[]): string {
    return tags.map(tag => tag.name).join(', ');
  } 
  
  formatPlatforms(platforms: any[]): string {
    return platforms.map(platform => platform.platform.name).join(', ');
  }

  sanitizeDescription(description: string): string {
    return description.replace(/<[^>]*>/g, '');
  }
}