import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { GameService } from '../../../services/game.service';
import { OndeEstouService } from '../../../services/onde-estou.service';
import { HeaderComponent } from '../../../components/header/header.component';
import { ImpostorWord } from '../../../models/game.models';

@Component({
  selector: 'app-onde-estou',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './onde-estou.component.html'
})
export class OndeEstouComponent implements OnInit {
  gameService = inject(GameService);
  ondeEstouService = inject(OndeEstouService);
  platformId = inject(PLATFORM_ID);
  route = inject(ActivatedRoute);

  gameState: 'hidden' | 'revealed' | 'debate' | 'finished' = 'hidden';
  
  playersCount: number = 4;
  impostersCount: number = 1;
  hasHints: boolean = true;
  currentPlayer: number = 1;
  
  currentPlace: string = '';
  currentHint: string = '';
  impostorIndexes: Set<number> = new Set();

  get currentPlayerData() {
    return this.gameService.customPlayers[this.currentPlayer - 1];
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.playersCount = params['players'] ? parseInt(params['players'], 10) : 4;
      this.impostersCount = params['imposters'] ? parseInt(params['imposters'], 10) : 1;
      this.hasHints = params['hints'] === 'true';
      
      this.setupGame();
    });
  }

  setupGame() {
    const data = this.ondeEstouService.getRandomWord();
    this.currentPlace = data.word;
    this.currentHint = data.hints[Math.floor(Math.random() * data.hints.length)];
    
    // Assign impostors randomly
    this.impostorIndexes.clear();
    while (this.impostorIndexes.size < this.impostersCount) {
      const randomPlayer = Math.floor(Math.random() * this.playersCount) + 1;
      this.impostorIndexes.add(randomPlayer);
    }
    
    this.currentPlayer = 1;
    this.gameState = 'hidden';
  }

  revealInfo() {
    this.gameState = 'revealed';
  }

  nextPlayer() {
    if (this.currentPlayer < this.playersCount) {
      this.currentPlayer++;
      this.gameState = 'hidden';
    } else {
      this.gameState = 'debate';
    }
  }

  revealResults() {
    this.gameState = 'finished';
  }

  resetGame() {
    this.setupGame();
  }

  get isCurrentImpostor(): boolean {
    return this.impostorIndexes.has(this.currentPlayer);
  }
}
