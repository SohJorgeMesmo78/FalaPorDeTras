import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameService } from '../../../services/game.service';
import { ContatoService } from '../../../services/contato.service';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './contato.component.html'
})
export class ContatoComponent implements OnInit {
  gameService = inject(GameService);
  contatoService = inject(ContatoService);
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
    this.shouldReveal = false; // DOM drop to force animation later
    this.secretWord = '';
    
    // Check global timer preference
    if (this.gameService.showCountdown && isPlatformBrowser(this.platformId)) {
      this.timerInterval = setInterval(() => {
        this.timerSeconds--;
        if (this.timerSeconds <= 0) {
          clearInterval(this.timerInterval);
          this.secretWord = this.contatoService.getRandomWord();
          this.shouldReveal = true;
          this.playBeep();
        }
      }, 1000);
    } else {
      // Instant reveal
      if (isPlatformBrowser(this.platformId)) {
         setTimeout(() => {
           this.secretWord = this.contatoService.getRandomWord();
           this.shouldReveal = true;
         }, 50); // Small delay to guarantee DOM reflow for CSS animations
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
