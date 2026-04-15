import { Injectable } from '@angular/core';

export interface Game {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const GAMES_DATA: Game[] = [
  {
    id: 'quem-sou-eu',
    name: 'Quem sou eu?',
    description:
      'Um jogo onde você tem uma pessoa, personagem ou animal na testa e precisa adivinhar fazendo perguntas de sim ou não.',
    imageUrl: 'images/quem-sou-eu.png',
  },
  {
    id: 'cha-ou-cafe',
    name: 'Chá ou Café?',
    description:
      'Um jogo de escolhas rápidas. Prefere chá ou café? Escolha uma opção e descubra mais sobre os seus amigos!',
    imageUrl: 'images/cha-ou-cafe.png',
  },
];

@Injectable({
  providedIn: 'root',
})
export class GameService {
  async getGames(): Promise<Game[]> {
    return GAMES_DATA;
  }

  async getGameById(id: string): Promise<Game | undefined> {
    return GAMES_DATA.find((g) => g.id === id);
  }
}
