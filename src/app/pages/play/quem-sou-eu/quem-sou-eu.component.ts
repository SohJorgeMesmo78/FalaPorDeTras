import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameService } from '../../../services/game.service';
import { QuemSouEuService } from '../../../services/quem-sou-eu.service';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-quem-sou-eu',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './quem-sou-eu.component.html'
})
export class QuemSouEuComponent implements OnInit {
  gameService = inject(GameService);
  quemSouEuService = inject(QuemSouEuService);
  platformId = inject(PLATFORM_ID);
  
  gameState: 'countdown' | 'playing' = 'countdown';
  countdownValue: number = 3;
  secretWord: string = '';

  ngOnInit() {
    this.secretWord = this.quemSouEuService.getRandomWord();
    if (isPlatformBrowser(this.platformId)) {
      this.startQuemSouEu();
    }
  }

  startQuemSouEu() {
    if (!this.gameService.showCountdown) {
      this.gameState = null as any;
      setTimeout(() => {
        this.secretWord = this.quemSouEuService.getRandomWord();
        this.gameState = 'playing';
      }, 0);
      return;
    }

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
        this.secretWord = this.quemSouEuService.getRandomWord();
        this.gameState = 'playing';
      }
    }, 1000);
  }

  toggleCountdown() {
    this.gameService.showCountdown = !this.gameService.showCountdown;
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
