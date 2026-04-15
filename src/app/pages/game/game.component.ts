import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameService, Game } from '../../services/game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  game: Game | undefined;
  route = inject(ActivatedRoute);
  gameService = inject(GameService);

  gameState: 'info' | 'countdown' | 'playing' = 'info';
  countdownValue: number = 3;
  secretWord: string = '';

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.game = await this.gameService.getGameById(id);
    }
  }

  startGame() {
    if (this.game?.id === 'quem-sou-eu') {
      this.startQuemSouEu();
    } else {
      // Default fallback if a generic game is clicked
      alert('Em breve!');
    }
  }

  startQuemSouEu() {
    this.gameState = 'countdown';
    this.countdownValue = 3;
    this.playBeep(440);
    this.vibrate(100);

    const interval = setInterval(() => {
      this.countdownValue--;
      
      if (this.countdownValue > 0) {
        this.playBeep(440);
        this.vibrate(100);
      } else {
        clearInterval(interval);
        this.playBeep(880, 0.4);
        this.vibrate([200, 100, 200]);
        this.secretWord = this.gameService.getRandomQuemSouEuWord();
        this.gameState = 'playing';
      }
    }, 1000);
  }

  resetGame() {
    this.gameState = 'info';
    this.secretWord = '';
  }

  playBeep(frequency: number, duration: number = 0.1) {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
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
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }

  get tiktokUrl() { return 'https://www.tiktok.com/@falapordetras'; }
  get instagramUrl() { return 'https://www.instagram.com/falapordetras'; }
}
