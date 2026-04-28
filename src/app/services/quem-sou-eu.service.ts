import { Injectable } from '@angular/core';
import palavrasQuemSouEu from '../data/palavras_quem_sou_eu.json';

@Injectable({
  providedIn: 'root',
})
export class QuemSouEuService {
  getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * palavrasQuemSouEu.length);
    return palavrasQuemSouEu[randomIndex];
  }
}
