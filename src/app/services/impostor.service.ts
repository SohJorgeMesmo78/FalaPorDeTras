import { Injectable } from '@angular/core';
import { ImpostorWord, ImpostorPair } from '../models/game.models';

export const WORDS_IMPOSTOR: ImpostorWord[] = [
  { word: 'Leite', hints: ['Vaca', 'Cabra', 'Branco', 'Líquido', 'Neném'] },
  { word: 'Avião', hints: ['Céu', 'Transporte', 'Asas', 'Turbina', 'Piloto'] },
  { word: 'Futebol', hints: ['Bola', 'Campo', 'Gol', 'Chute', 'Estádio'] },
  { word: 'Pizza', hints: ['Itália', 'Queijo', 'Redonda', 'Forno', 'Fatia'] },
  { word: 'Chocolate', hints: ['Doce', 'Cacau', 'Marrom', 'Barra', 'Derrete'] },
  { word: 'Praia', hints: ['Sol', 'Areia', 'Mar', 'Férias', 'Verão'] },
  { word: 'Cinema', hints: ['Pipoca', 'Tela', 'Filme', 'Escuro', 'Cadeira'] },
  { word: 'Escola', hints: ['Lápis', 'Professor', 'Aula', 'Caderno', 'Prova'] },
  { word: 'Hospital', hints: ['Médico', 'Remédio', 'Doente', 'Ambulância', 'Curativo'] },
  { word: 'Natal', hints: ['Papai Noel', 'Árvore', 'Presente', 'Dezembro', 'Família'] },
  { word: 'Cachorro', hints: ['Latido', 'Osso', 'Melhor Amigo', 'Pata', 'Estimação'] },
  { word: 'Café', hints: ['Xícara', 'Preto', 'Manhã', 'Acordar', 'Quente'] },
  { word: 'Telefone', hints: ['Ligação', 'Celular', 'Número', 'Alô', 'Mensagem'] },
  { word: 'Relógio', hints: ['Horas', 'Tempo', 'Pulso', 'Ponteiro', 'Despertador'] },
  { word: 'Computador', hints: ['Teclado', 'Internet', 'Tela', 'Mouse', 'Programação'] },
];

export const WORDS_IMPOSTOR_PAIRS: ImpostorPair[] = [
  { q1: 'Qual sua sobremesa favorita?', q2: 'Qual sobremesa você menos gosta?' },
  { q1: 'Qual superpoder você gostaria de ter?', q2: 'Qual superpoder você acha o mais inútil?' },
  { q1: 'Para qual país você adoraria viajar?', q2: 'Em qual país você nunca moraria?' },
  { q1: 'Qual animal doméstico você teria?', q2: 'Qual animal você tem muito medo?' },
  { q1: 'Qual seu filme de comédia favorito?', q2: 'Qual filme te fez chorar muito?' },
  { q1: 'Qual sua matéria preferida na escola?', q2: 'Qual matéria escolar você era pior?' },
  { q1: 'Qual sua rede social mais usada?', q2: 'Qual rede social você apagaria se pudesse?' },
  { q1: 'Qual cheiro você acha maravilhoso?', q2: 'Qual cheiro te dá nojo na hora?' },
];

@Injectable({
  providedIn: 'root',
})
export class ImpostorService {
  getRandomWord(): ImpostorWord {
    const randomIndex = Math.floor(Math.random() * WORDS_IMPOSTOR.length);
    return WORDS_IMPOSTOR[randomIndex];
  }

  getRandomPair(): ImpostorPair {
    const randomIndex = Math.floor(Math.random() * WORDS_IMPOSTOR_PAIRS.length);
    return WORDS_IMPOSTOR_PAIRS[randomIndex];
  }
}
