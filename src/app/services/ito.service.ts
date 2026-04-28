import { Injectable } from '@angular/core';
import temasIto from '../data/temas_ito.json';

@Injectable({
  providedIn: 'root',
})
export class ItoService {
  getRandomTheme(): string {
    const randomIndex = Math.floor(Math.random() * temasIto.length);
    return temasIto[randomIndex];
  }
}
