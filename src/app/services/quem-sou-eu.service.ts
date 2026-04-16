import { Injectable } from '@angular/core';

export const WORDS_QUEM_SOU_EU = [
  'Bob Esponja', 'Mickey Mouse', 'Homem-Aranha', 'Naruto', 'Batman', 'Pica-Pau',
  'Homer Simpson', 'Mulher Maravilha', 'Harry Potter', 'Pikachu', 'Silvio Santos',
  'Neymar', 'Anitta', 'Faustão', 'Pelé', 'Xuxa', 'Ivete Sangalo', 'Michael Jackson',
  'Ronaldo Fenômeno', 'Tatá Werneck',
];

@Injectable({
  providedIn: 'root',
})
export class QuemSouEuService {
  getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * WORDS_QUEM_SOU_EU.length);
    return WORDS_QUEM_SOU_EU[randomIndex];
  }
}
