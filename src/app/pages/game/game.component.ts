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

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.game = await this.gameService.getGameById(id);
    }
  }

  get tiktokUrl() { return 'https://www.tiktok.com/@falapordetras'; }
  get instagramUrl() { return 'https://www.instagram.com/falapordetras'; }
}
