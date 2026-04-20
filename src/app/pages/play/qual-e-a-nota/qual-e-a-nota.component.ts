import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { GameService } from '../../../services/game.service';
import { ItoService } from '../../../services/ito.service';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-qual-e-a-nota',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './qual-e-a-nota.component.html'
})
export class QualEANotaComponent implements OnInit {
  gameService = inject(GameService);
  itoService = inject(ItoService);
  platformId = inject(PLATFORM_ID);
  route = inject(ActivatedRoute);

  gameState: 'setup_theme' | 'waiting' | 'revealed' | 'voting' = 'setup_theme';
  
  mode: 'duplas' | '1xtodos' = 'duplas';
  pairsCount: number = 2;
  currentPair: number = 1;
  grades: number[] = [];
  theme: string = '';

  get currentPairData() {
    if (this.mode === '1xtodos') return null;
    return this.gameService.customPlayers[this.currentPair - 1];
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.pairsCount = params['pairs'] ? parseInt(params['pairs'], 10) : 2;
      this.mode = params['mode'] || 'duplas';
      
      if (isPlatformBrowser(this.platformId)) {
        this.setupGame();
      }
    });
  }

  setupGame() {
    this.grades = [];
    const count = this.mode === '1xtodos' ? 1 : this.pairsCount;
    for (let i = 0; i < count; i++) {
      this.grades.push(Math.floor(Math.random() * 10) + 1);
    }
    this.theme = this.itoService.getRandomTheme();
    this.currentPair = 1;
    this.gameState = 'setup_theme';
  }

  confirmTheme() {
    this.gameState = 'waiting';
  }

  revealGrade() {
    this.gameState = 'revealed';
  }

  nextPair() {
    if (this.currentPair < this.pairsCount) {
      this.currentPair++;
      this.gameState = 'waiting';
    } else {
      this.gameState = 'voting';
    }
  }

  changeTheme() {
     this.theme = this.itoService.getRandomTheme();
  }

  resetGame() {
    this.setupGame();
  }
}
