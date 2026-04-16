import { Injectable } from '@angular/core';
import { WORDS_CHA_OU_CAFE } from './cha-ou-cafe.service';
import { WORDS_CONTATO } from './contato.service';
import { WORDS_IMPOSTOR } from './impostor.service';

@Injectable({
  providedIn: 'root',
})
export class WordPoolService {
  private getAllWords(): string[] {
    return [
      ...new Set([
        ...WORDS_CHA_OU_CAFE,
        ...WORDS_CONTATO,
        ...WORDS_IMPOSTOR.map((i) => i.word),
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
