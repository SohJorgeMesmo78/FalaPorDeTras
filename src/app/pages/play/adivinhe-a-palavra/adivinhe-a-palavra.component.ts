import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameService } from '../../../services/game.service';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-adivinhe-a-palavra',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './adivinhe-a-palavra.component.html'
})
export class AdivinheAPalavraComponent implements OnInit {
  gameService = inject(GameService);
  
  letter: string = '';

  ngOnInit() {
    this.generateNewLetter();
  }

  generateNewLetter() {
    this.letter = this.gameService.getRandomLetter();
  }
}
