import { Injectable } from '@angular/core';
import { ImpostorWord, ImpostorPair } from '../models/game.models';
import palavrasImpostor from '../data/palavras_impostor.json';
import perguntasImpostor from '../data/perguntas_impostor.json';

@Injectable({
  providedIn: 'root',
})
export class ImpostorService {
  getRandomWord(): ImpostorWord {
    const words: ImpostorWord[] = palavrasImpostor;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  getRandomPair(): ImpostorPair {
    const pairs: ImpostorPair[] = perguntasImpostor;
    const randomIndex = Math.floor(Math.random() * pairs.length);
    return pairs[randomIndex];
  }
}
