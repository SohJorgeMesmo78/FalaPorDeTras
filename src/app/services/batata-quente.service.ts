import { Injectable } from '@angular/core';
import temasBatataQuente from '../data/temas_batata_quente.json';

@Injectable({
  providedIn: 'root',
})
export class BatataQuenteService {
  getRandomTheme(): string {
    const randomIndex = Math.floor(Math.random() * temasBatataQuente.length);
    return temasBatataQuente[randomIndex];
  }
}
