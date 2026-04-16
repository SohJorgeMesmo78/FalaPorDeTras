import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameService } from '../../../services/game.service';
import { AdivinheAPalavraService } from '../../../services/adivinhe-a-palavra.service';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-adivinhe-a-palavra',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './adivinhe-a-palavra.component.html'
})
export class AdivinheAPalavraComponent implements OnInit {
  gameService = inject(GameService);
  gameLogicService = inject(AdivinheAPalavraService);

  gameState: 'countdown' | 'playing' = 'countdown';
  countdown: number = 3;
  letter: string = '';

  ngOnInit() {
    this.generateNewLetter();
  }

  generateNewLetter() {
    this.letter = this.gameLogicService.getRandomLetter();
  }
}
