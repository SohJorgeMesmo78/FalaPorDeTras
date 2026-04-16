import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdivinheAPalavraService {
  getRandomLetter(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[Math.floor(Math.random() * letters.length)];
  }
}
