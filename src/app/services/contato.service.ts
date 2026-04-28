import { Injectable } from '@angular/core';
import palavrasContato from '../data/palavras_contato.json';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * palavrasContato.length);
    return palavrasContato[randomIndex];
  }
}
