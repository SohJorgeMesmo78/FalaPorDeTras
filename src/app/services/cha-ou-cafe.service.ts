import { Injectable } from '@angular/core';

export const WORDS_CHA_OU_CAFE = [
  'Cachorro-quente', 'Pão de Queijo', 'Brigadeiro', 'Feijoada', 'Açaí', 'Geladeira',
  'Televisão', 'Bicicleta', 'Celular', 'Avião', 'Sílvia Santos', 'Monalisa',
  'Cachorro', 'Gato', 'Leão', 'Praia', 'Montanha', 'Câmera Fotográfica', 'Violão', 'Piscina',
];

@Injectable({
  providedIn: 'root',
})
export class ChaOuCafeService {
  getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * WORDS_CHA_OU_CAFE.length);
    return WORDS_CHA_OU_CAFE[randomIndex];
  }
}
