import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contato.component.html'
})
export class ContatoComponent implements OnInit {
  gameService = inject(GameService);
  platformId = inject(PLATFORM_ID);
  
  secretWord: string = '';
  shouldReveal: boolean = false;
  timerSeconds: number = 3;
  private timerInterval: any;

  ngOnInit() {
    this.refreshWord();
  }

  refreshWord() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerSeconds = 3;
    
    // Check global timer preference
    if (this.gameService.showCountdown && isPlatformBrowser(this.platformId)) {
      this.shouldReveal = false;
      this.timerInterval = setInterval(() => {
        this.timerSeconds--;
        if (this.timerSeconds <= 0) {
          clearInterval(this.timerInterval);
          this.shouldReveal = true;
          this.secretWord = this.gameService.getRandomContatoWord();
          this.playBeep();
        }
      }, 1000);
    } else {
      // Instant reveal
      this.shouldReveal = true;
      if (isPlatformBrowser(this.platformId)) {
         this.secretWord = this.gameService.getRandomContatoWord();
      }
    }
  }

  playBeep() {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 523.25; // C5 note
      
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      // Ignore audio errors silently
    }
  }
}
