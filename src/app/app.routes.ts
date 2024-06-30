import { Routes } from '@angular/router';
// import { SearchComponent } from './components/search/search.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameComponent } from './components/game-component/game-component.component';

export const routes: Routes = [
  { path: '', component: GameListComponent },
  { path: 'post/:id', component: GameComponent },
];