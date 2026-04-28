import { Injectable } from '@angular/core';
import palavrasChaOuCafe from '../data/palavras_cha_ou_cafe.json';

@Injectable({
  providedIn: 'root',
})
export class ChaOuCafeService {
  getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * palavrasChaOuCafe.length);
    return palavrasChaOuCafe[randomIndex];
  }
}
