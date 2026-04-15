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
      'O clássico jogo de adivinhação! Um jogador escolhe secretamente um personagem, animal ou celebridade. Os demais participantes devem tentar descobrir a identidade misteriosa fazendo perguntas estratégicas que só podem ser respondidas com "Sim" ou "Não".',
    imageUrl: 'images/quem-sou-eu.png',
  },
  {
    id: 'cha-ou-cafe',
    name: 'Chá ou Café?',
    description:
      'Um desafio de associação e raciocínio rápido! Um jogador escolhe uma palavra secreta e os outros devem adivinhá-la através de comparações. A cada rodada, é oferecida uma escolha entre duas opções sempre iniciando com "Chá ou Café?", e o jogador revela qual delas mais se aproxima do seu segredo. O objetivo é afunilar as possibilidades até que alguém descubra a palavra oculta!',
    imageUrl: 'images/cha-ou-cafe.png',
  },
];

export const WORDS_QUEM_SOU_EU = [
  'Bob Esponja', 'Mickey Mouse', 'Homem-Aranha', 'Naruto', 'Batman',
  'Pica-Pau', 'Homer Simpson', 'Mulher Maravilha', 'Harry Potter', 'Pikachu',
  'Silvio Santos', 'Neymar', 'Anitta', 'Faustão', 'Pelé',
  'Xuxa', 'Ivete Sangalo', 'Michael Jackson', 'Ronaldo Fenômeno', 'Tatá Werneck'
];

@Injectable({
  providedIn: 'root',
})
export class GameService {
  getRandomQuemSouEuWord(): string {
    const randomIndex = Math.floor(Math.random() * WORDS_QUEM_SOU_EU.length);
    return WORDS_QUEM_SOU_EU[randomIndex];
  }

  async getGames(): Promise<Game[]> {
    return GAMES_DATA;
  }

  async getGameById(id: string): Promise<Game | undefined> {
    return GAMES_DATA.find((g) => g.id === id);
  }
}
