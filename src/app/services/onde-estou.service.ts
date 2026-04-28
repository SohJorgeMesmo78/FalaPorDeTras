import { Injectable } from '@angular/core';
import { ImpostorWord } from '../models/game.models';
import locaisOndeEstou from '../data/locais_onde_estou.json';

@Injectable({
  providedIn: 'root',
})
export class OndeEstouService {
  getRandomWord(): ImpostorWord {
    const words: ImpostorWord[] = locaisOndeEstou;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }
}
