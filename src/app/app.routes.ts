import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameComponent } from './pages/game/game.component';
import { QuemSouEuComponent } from './pages/play/quem-sou-eu/quem-sou-eu.component';
import { ChaOuCafeComponent } from './pages/play/cha-ou-cafe/cha-ou-cafe.component';
import { ItoComponent } from './pages/play/ito/ito.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game/:id', component: GameComponent },
  { path: 'play/quem-sou-eu', component: QuemSouEuComponent },
  { path: 'play/cha-ou-cafe', component: ChaOuCafeComponent },
  { path: 'play/ito', component: ItoComponent },
  { path: '**', redirectTo: '' }
];
