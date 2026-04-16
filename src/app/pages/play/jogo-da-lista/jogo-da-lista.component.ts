import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { GameService } from '../../../services/game.service';
import { WordPoolService } from '../../../services/word-pool.service';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-jogo-da-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './jogo-da-lista.component.html'
})
export class JogoDaListaComponent implements OnInit {
  gameService = inject(GameService);
  wordPoolService = inject(WordPoolService);
  route = inject(ActivatedRoute);

  words: string[] = [];
  count: number = 5;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.count = params['count'] ? parseInt(params['count'], 10) : 5;
      this.shuffleAll();
    });
  }

  shuffleAll() {
    this.words = this.wordPoolService.getRandomWordList(this.count);
  }

  shuffleOne(index: number) {
    const newWord = this.wordPoolService.getRandomWord(this.words);
    this.words[index] = newWord;
  }
}
