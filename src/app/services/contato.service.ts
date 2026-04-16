import { Injectable } from '@angular/core';

export const WORDS_CONTATO = [
  'Lápis', 'Teclado', 'Caneta', 'Copo', 'Relógio', 'Garrafa', 'Mouse', 'Monitor',
  'Fone de Ouvido', 'Carteira', 'Chave', 'Caderno', 'Mesa', 'Cadeira', 'Luminária',
  'Celular', 'Mochila', 'Livro', 'Óculos', 'Sapato', 'Meia', 'Camiseta', 'Calça',
  'Boné', 'Relógio de Pulso', 'Anel', 'Brinco', 'Colar', 'Pulseira', 'Escova de Dentes',
  'Toalha', 'Sabonete', 'Shampoo', 'Condicionador', 'Pente', 'Espelho', 'Perfume',
  'Desodorante', 'Maquiagem', 'Batom',
];

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * WORDS_CONTATO.length);
    return WORDS_CONTATO[randomIndex];
  }
}
