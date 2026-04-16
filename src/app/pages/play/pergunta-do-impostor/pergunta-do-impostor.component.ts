import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { GameService } from '../../../services/game.service';
import { ImpostorService } from '../../../services/impostor.service';
import { HeaderComponent } from '../../../components/header/header.component';
import { ImpostorPair } from '../../../models/game.models';

@Component({
  selector: 'app-pergunta-do-impostor',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './pergunta-do-impostor.component.html'
})
export class PerguntaDoImpostorComponent implements OnInit {
  gameService = inject(GameService);
  impostorService = inject(ImpostorService);
  platformId = inject(PLATFORM_ID);
  route = inject(ActivatedRoute);

  gameState: 'hidden' | 'revealed' | 'finished' = 'hidden';
  
  playersCount: number = 4;
  impostersCount: number = 1;
  currentPlayer: number = 1;
  

  normalQuestion: string = '';
  impostorQuestion: string = '';
  impostorIndexes: Set<number> = new Set();

  get currentPlayerData() {
    return this.gameService.customPlayers[this.currentPlayer - 1];
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.playersCount = params['players'] ? parseInt(params['players'], 10) : 4;
      this.impostersCount = params['imposters'] ? parseInt(params['imposters'], 10) : 1;
      
      this.setupGame();
    });
  }

  setupGame() {
    const pair = this.impostorService.getRandomPair();
    
    // Randomize which is normal and which is imposter so it's impossible to memorize by order
    if (Math.random() > 0.5) {
      this.normalQuestion = pair.q1;
      this.impostorQuestion = pair.q2;
    } else {
      this.normalQuestion = pair.q2;
      this.impostorQuestion = pair.q1;
    }
    
    // Assign impostors randomly
    this.impostorIndexes.clear();
    while (this.impostorIndexes.size < this.impostersCount) {
      const randomPlayer = Math.floor(Math.random() * this.playersCount) + 1;
      this.impostorIndexes.add(randomPlayer);
    }
  }

  revealQuestion() {
    this.gameState = 'revealed';
  }

  nextPlayer() {
    if (this.currentPlayer < this.playersCount) {
      this.currentPlayer++;
      this.gameState = 'hidden';
    } else {
      this.gameState = 'finished';
    }
  }

  resetGame() {
    this.setupGame();
    this.currentPlayer = 1;
    this.gameState = 'hidden';
  }

  get currentQuestion(): string {
    return this.impostorIndexes.has(this.currentPlayer) ? this.impostorQuestion : this.normalQuestion;
  }
}
