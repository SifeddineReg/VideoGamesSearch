import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})


export class GameListComponent implements OnInit, AfterViewInit {
  title = 'game-search';
  latest_releases: any = [];
  most_popular: any = [];
  all_games: any = [];
  filtered_games: any = [];
  paginatedGames: any = [];
  is_loading = true;

  carouselIndex = 0
  visibleItems_release: any = []
  
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  filterName: string = '';
  filterRating: string = '';
  filterGenres: string = '';
  filterReviews: string = '';

  async ngOnInit() {
    await this.fetchGames(1);
  }

  updateVisibleItems() {
    this.visibleItems_release = this.latest_releases.slice(this.carouselIndex, this.carouselIndex + 2)
  }

  ngAfterViewInit() {
    this.startAutoScroll();
  }

  startAutoScroll() {
    const carousel = document.querySelector('.carousel-container');

    if (carousel) {
      let activeIndex = 0;

      setInterval(() => {
        this.visibleItems_release = this.latest_releases.slice(activeIndex, activeIndex + 2)
        activeIndex = (activeIndex + 2) % this.latest_releases.length
      }, 5000);
    }
  }

  async fetchGames(page: number) {
    if (page > 20) {
      this.processGames()
      return
    }

    if (page == 1) {
      const url = `https://api.rawg.io/api/games?key=c9545eec8e5e4b85bcf86ebdf01c7d3d`
      await fetch(url)
      .then(response => response.json())
      .then(data => {
        this.all_games = this.all_games.concat(data.results);
        if (data.next && page < 20) {
          this.fetchGames(page + 1);
        } else {
          this.processGames();
        }
      });
    }
    else {
      const url = `https://api.rawg.io/api/games?key=c9545eec8e5e4b85bcf86ebdf01c7d3d&page=${page}`
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          this.all_games = this.all_games.concat(data.results)
          if (data.next && page < 20) {
            this.fetchGames(page + 1)
          } else {
            this.processGames()
          }
        })
    }
  }

  processGames() {
    this.latest_releases = [...this.all_games]
      .sort((a:any, b: any) => new Date(b.released).getTime() - new Date(a.released).getTime())
      .slice(0, 10)

    this.most_popular = [...this.all_games]
      .sort((a:any, b: any) => b.rating - a.rating)
      .slice(0, 12)

    this.filtered_games = [...this.all_games];
    this.is_loading = false
    this.updateVisibleItems()
    this.updatePaginatedGames();
  }

  applyFilters() {
    let filteredGames = [...this.all_games];

    if (this.filterName) {
      filteredGames = filteredGames.filter(game => game.name.toLowerCase().includes(this.filterName.toLowerCase()));
    }

    if (this.filterRating) {
      filteredGames = filteredGames.filter(game => game.rating >= parseFloat(this.filterRating));
    }

    if (this.filterGenres) {
      filteredGames = filteredGames.filter(game => 
        game.genres.some((g: any) => g.name.toLowerCase().includes(this.filterGenres.toLowerCase()))
      );
    }

    if (this.filterReviews) {
      filteredGames = filteredGames.filter(game => game.reviews_count >= parseInt(this.filterReviews));
    }

    this.filtered_games = filteredGames;
    this.totalPages = Math.ceil(this.filtered_games.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedGames();
  }

  reset() {
    this.filterName = '';
    this.filterRating = '';
    this.filterGenres = '';
    this.filterReviews = '';
    this.filtered_games = [...this.all_games];
    this.totalPages = Math.ceil(this.filtered_games.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedGames();
  }

  paginateGames(games: any[]) {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedGames = games.slice(startIndex, endIndex);
  }

  updatePaginatedGames() {
    this.totalPages = Math.ceil(this.filtered_games.length / this.itemsPerPage);
    this.paginatedGames = this.filtered_games.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedGames();
    }
  }

  formatGenres(genres: any[]): string {
    const genreNames = genres.map(g => g.name).join(', ');
    return genreNames.length > 20 ? genreNames.substring(0, 20) + '...' : genreNames;
  }

  formatNames(names: string): string {
    return names.length > 50 ? names.substring(0, 50) + '...' : names;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedGames();
    }
  }
}
