import { Component, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-batata-quente',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './batata-quente.component.html'
})
export class BatataQuenteComponent implements OnInit, OnDestroy {
  gameService = inject(GameService);
  platformId = inject(PLATFORM_ID);
  route = inject(ActivatedRoute);

  gameState: 'setup' | 'playing' | 'exploded' = 'setup';
  
  playersCount: number = 4;
  currentPlayer: number = 1;
  theme: string = '';
  
  timerValueSeconds: number = 60;
  private intervalId: any;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.playersCount = params['players'] ? parseInt(params['players'], 10) : 4;
      if (isPlatformBrowser(this.platformId)) {
        this.theme = this.gameService.getRandomBatataQuenteTheme();
      }
    });
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  changeTheme() {
    const backup = this.theme;
    this.theme = '';
    setTimeout(() => {
      this.theme = this.gameService.getRandomBatataQuenteTheme();
    }, 0);
  }
  
  increaseTime() {
    if (this.timerValueSeconds < 180) {
      this.timerValueSeconds += 30;
    }
  }

  decreaseTime() {
    if (this.timerValueSeconds > 30) {
      this.timerValueSeconds -= 30;
    }
  }
  
  get formattedTime(): string {
    const m = Math.floor(this.timerValueSeconds / 60);
    const s = this.timerValueSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  startGame() {
    this.gameState = 'playing';
    this.currentPlayer = 1;
    this.startTimer();
  }
  
  startTimer() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.clearTimer();
    
    // Play an entry tick
    this.playBeep(500, 0.1);

    this.intervalId = setInterval(() => {
      this.timerValueSeconds--;
      
      if (this.timerValueSeconds <= 0) {
        this.explode();
      } else {
        // Fast warning beeps under 10 seconds
        if (this.timerValueSeconds <= 10) {
          this.playBeep(880, 0.05);
        } else {
          this.playBeep(400, 0.05);
        }
      }
    }, 1000);
  }
  
  clearTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  passBomb() {
    if (this.gameState !== 'playing') return;
    
    if (this.currentPlayer < this.playersCount) {
      this.currentPlayer++;
    } else {
      this.currentPlayer = 1;
    }
    
    this.vibrate(50);
  }

  explode() {
    this.clearTimer();
    this.gameState = 'exploded';
    
    // Explosion feedback
    this.playBeep(150, 1.0); 
    this.vibrate([100, 50, 200, 50, 400]);
  }

  resetGame() {
    this.timerValueSeconds = 60;
    this.theme = this.gameService.getRandomBatataQuenteTheme();
    this.gameState = 'setup';
  }

  playBeep(frequency: number, duration: number = 0.1) {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = 'square';
      oscillator.frequency.value = frequency;
      gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  vibrate(pattern: number | number[]) {
    if (isPlatformBrowser(this.platformId) && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }
}
