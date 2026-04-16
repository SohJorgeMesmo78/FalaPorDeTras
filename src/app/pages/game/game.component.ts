import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GameService, Game, PlayerProfile } from '../../services/game.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'], // Using scss if needed for custom UI later
})
export class GameComponent implements OnInit {
  game: Game | undefined;
  players: number = 4;
  imposters: number = 1;
  hasHint: boolean = true;

  showPlayerSelector: boolean = false;

  route = inject(ActivatedRoute);
  router = inject(Router);
  gameService = inject(GameService);
  toastr = inject(ToastrService);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Param ID:', id); // Log for debugging
    if (id) {
      this.game = await this.gameService.getGameById(id);

      // Override default players for specific games
      if (
        this.game?.id === 'pergunta-do-impostor' ||
        this.game?.id === 'impostor'
      ) {
        this.players = 4;
        this.imposters = 1;
        this.hasHint = true;
      }
    }
  }

  get maxImposters(): number {
    return Math.floor((this.players - 1) / 2);
  }

  get recommendedImposters(): number {
    return Math.floor((this.players - 1) / 3) || 1;
  }

  get minPlayers(): number {
    return this.game?.id === 'pergunta-do-impostor' ||
      this.game?.id === 'impostor'
      ? 3
      : 2;
  }

  openPlayerConfig() {
    if (
      this.game?.id === 'quem-sou-eu' ||
      this.game?.id === 'cha-ou-cafe' ||
      this.game?.id === 'contato' ||
      this.game?.id === 'adivinhe-a-palavra'
    ) {
      // These games don't require the player list
      this.startGameWithPlayers();
      return;
    }

    // Populate players
    this.gameService.customPlayers = [];
    for (let i = 1; i <= this.players; i++) {
      this.gameService.customPlayers.push({
        id: i,
        name: '',
        color: this.gameService.generateVibrantColor(),
      });
    }

    this.showPlayerSelector = true;
  }

  randomizeColor(player: PlayerProfile) {
    player.color = this.gameService.generateVibrantColor();
  }

  checkSpecialName(player: PlayerProfile) {
    const name = player.name.toLowerCase().trim();

    // Jorge / Jooj
    if (name === 'jorge' || name === 'jooj') {
      player.color = '#FFAA00';
    }
    // Marina / Mari
    else if (name === 'marina' || name === 'mari') {
      player.color = '#003B94';
    }
    // Matheus / Theu / Theus
    else if (name === 'matheus' || name === 'theu' || name === 'theus') {
      player.color = '#0A9400';
    }
    // Gabriela / Gabi
    else if (name === 'gabriela' || name === 'gabi') {
      player.color = '#940059';
    }
  }

  startGameWithPlayers() {
    if (this.game?.id === 'quem-sou-eu') {
      this.router.navigate(['/play', this.game.id]);
    } else if (this.game?.id === 'cha-ou-cafe') {
      this.router.navigate(['/play', this.game.id]);
    } else if (this.game?.id === 'ito') {
      this.router.navigate(['/play', this.game.id], {
        queryParams: { players: this.players },
      });
    } else if (this.game?.id === 'batata-quente') {
      this.router.navigate(['/play', this.game.id], {
        queryParams: { players: this.players },
      });
    } else if (this.game?.id === 'pergunta-do-impostor') {
      this.router.navigate(['/play', this.game.id], {
        queryParams: { players: this.players, imposters: this.imposters },
      });
    } else if (this.game?.id === 'impostor') {
      this.router.navigate(['/play', this.game.id], {
        queryParams: {
          players: this.players,
          imposters: this.imposters,
          hints: this.hasHint,
        },
      });
    } else if (this.game?.id === 'adivinhe-a-palavra') {
      this.router.navigate(['/play', this.game.id]);
    } else if (this.game?.id === 'contato') {
      this.router.navigate(['/play', this.game.id]);
    } else {
      this.toastr.info(
        `O jogo "${this.game?.name}" ainda está em construção 🚧`,
        'Paciência!',
      );
    }
  }

  get tiktokUrl() {
    return 'https://www.tiktok.com/@falapordetras';
  }
  get instagramUrl() {
    return 'https://www.instagram.com/falapordetras';
  }
}
