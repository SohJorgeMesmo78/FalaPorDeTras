import { Injectable } from '@angular/core';

export const WORDS_ITO_THEMES = [
  'Filmes: do pior ao melhor', 'Comidas: da pior à melhor', 'Animais: do menos ao mais perigoso',
  'Superpoderes: do mais inútil ao mais apelão', 'Profissões: da menos à mais estressante',
  'Lugares para passar as férias: do pior ao melhor', 'Coisas para fazer no fim de semana: do mais chato ao mais legal',
  'Presentes: do pior ao melhor para se ganhar', 'Esportes: do mais chato ao mais emocionante',
  'Jogos de Videogame: do pior ao melhor',
];

@Injectable({
  providedIn: 'root',
})
export class ItoService {
  getRandomTheme(): string {
    const randomIndex = Math.floor(Math.random() * WORDS_ITO_THEMES.length);
    return WORDS_ITO_THEMES[randomIndex];
  }
}
