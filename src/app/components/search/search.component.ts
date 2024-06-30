// import { Component } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { RawgService } from '../../services/rawg.service';
// import { GameListComponent } from '../game-list/game-list.component';

// @Component({
//   selector: 'app-search',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule, FormsModule, GameListComponent],
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.css']
// })
// export class SearchComponent {
//   query: string = '';
//   games: any[] = [];

//   constructor(private rawgService: RawgService) {}

//   search(): void {
//     this.rawgService.searchGames(this.query).subscribe(response => {
//       this.games = response.results;
//     });
//   }
// }