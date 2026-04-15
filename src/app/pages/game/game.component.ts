import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { GameService, Game } from '../../services/game.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {
  game: Game | undefined;
  route = inject(ActivatedRoute);
  router = inject(Router);
  gameService = inject(GameService);
  toastr = inject(ToastrService);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Param ID:', id); // Log for debugging
    if (id) {
      this.game = await this.gameService.getGameById(id);
      console.log('Game found:', this.game); // Log for debugging
    }
  }

  startGame() {
    if (this.game?.id === 'quem-sou-eu') {
      this.router.navigate(['/play', this.game.id]);
    } else if (this.game?.id === 'cha-ou-cafe') {
      this.router.navigate(['/play', this.game.id]);
    } else if (this.game?.id === 'ito') {
      this.router.navigate(['/play', this.game.id]);
    } else {
      this.toastr.info(`O jogo "${this.game?.name}" ainda está em construção 🚧`, 'Paciência!');
    }
  }

  get tiktokUrl() { return 'https://www.tiktok.com/@falapordetras'; }
  get instagramUrl() { return 'https://www.instagram.com/falapordetras'; }
}
