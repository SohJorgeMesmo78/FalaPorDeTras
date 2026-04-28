import { Injectable } from '@angular/core';
import palavrasChaOuCafe from '../data/palavras_cha_ou_cafe.json';
import palavrasContato from '../data/palavras_contato.json';
import palavrasImpostor from '../data/palavras_impostor.json';

@Injectable({
  providedIn: 'root',
})
export class WordPoolService {
  private getAllWords(): string[] {
    return [
      ...new Set([
        ...palavrasChaOuCafe,
        ...palavrasContato,
        ...palavrasImpostor.map((i: any) => i.word),
      ]),
    ];
  }

  getRandomWord(excludeList: string[] = []): string {
    const allWords = this.getAllWords();
    const filtered = allWords.filter((w) => !excludeList.includes(w));
    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex] || 'Segredo';
  }

  getRandomWordList(count: number): string[] {
    const allWords = this.getAllWords();
    const shuffled = [...allWords].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
