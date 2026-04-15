import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { GameService } from '../../../services/game.service';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-ito',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './ito.component.html'
})
export class ItoComponent implements OnInit {
  gameService = inject(GameService);
  platformId = inject(PLATFORM_ID);
  route = inject(ActivatedRoute);

  gameState: 'reveal_ready' | 'revealed' | 'finished' = 'reveal_ready';
  playersCount: number = 4;
  currentPlayer: number = 1;
  secretNumbers: number[] = [];
  theme: string = '';
  
  currentSecretNumber: number = 0;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.playersCount = params['players'] ? parseInt(params['players'], 10) : 4;
      if (isPlatformBrowser(this.platformId)) {
        this.generateNewGame();
      }
    });
  }

  generateNewGame() {
    const availableNumbers = Array.from({length: 100}, (_, i) => i + 1);
    for (let i = availableNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableNumbers[i], availableNumbers[j]] = [availableNumbers[j], availableNumbers[i]];
    }
    
    this.secretNumbers = availableNumbers.slice(0, this.playersCount);
    this.currentPlayer = 1;
    this.gameState = 'reveal_ready';
  }

  revealPlayerNumber() {
    this.currentSecretNumber = this.secretNumbers[this.currentPlayer - 1];
    this.gameState = 'revealed';
  }

  nextPlayer() {
    if (this.currentPlayer < this.playersCount) {
      this.currentPlayer++;
      this.gameState = 'reveal_ready';
    } else {
      this.finishGame();
    }
  }

  finishGame() {
    this.theme = this.gameService.getRandomItoTheme();
    this.gameState = 'finished';
  }

  changeTheme() {
    const backup = this.theme;
    this.theme = '';
    setTimeout(() => {
      this.theme = this.gameService.getRandomItoTheme();
      // Ensure we don't get the same theme twice in a row if possible, though random is fine
    }, 0);
  }

  playBeep(frequency: number, duration: number = 0.1) {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.error('Audio falhou', e);
    }
  }

  vibrate(pattern: number | number[]) {
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }
}
