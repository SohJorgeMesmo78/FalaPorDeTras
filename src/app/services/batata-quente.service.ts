import { Injectable } from '@angular/core';

export const WORDS_BATATA_QUENTE = [
  'Animais Mamíferos', 'Cores', 'Frutas Nacionais', 'Marcas de Carro', 'Séries de TV',
  'Personagens de Desenho Animado', 'Animais que vivem na Água', 'Objetos que tem na Cozinha',
  'Times de Futebol', 'Times de Basquete', 'Super-heróis', 'Cidades do Brasil',
  'Países da Europa', 'Ferramentas', 'Instrumentos Musicais',
];

@Injectable({
  providedIn: 'root',
})
export class BatataQuenteService {
  getRandomTheme(): string {
    const randomIndex = Math.floor(Math.random() * WORDS_BATATA_QUENTE.length);
    return WORDS_BATATA_QUENTE[randomIndex];
  }
}
