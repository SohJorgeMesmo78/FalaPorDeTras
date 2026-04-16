import { Injectable } from '@angular/core';
import { ImpostorWord } from '../models/game.models';

export const WORDS_ONDE_ESTOU: ImpostorWord[] = [
  { word: 'Escola', hints: ['Crianças', 'Aprender', 'Lousa', 'Recreio', 'Mochilas'] },
  { word: 'Hospital', hints: ['Médicos', 'Saúde', 'Cuidado', 'Silêncio', 'Emergência'] },
  { word: 'Praia', hints: ['Areia', 'Sol', 'Mar', 'Férias', 'Bronzeador'] },
  { word: 'Supermercado', hints: ['Carrinho', 'Compras', 'Caixa', 'Alimentos', 'Prateleiras'] },
  { word: 'Academia', hints: ['Pesos', 'Treino', 'Suor', 'Músculos', 'Esteira'] },
  { word: 'Cinema', hints: ['Pipoca', 'Tela Grande', 'Filme', 'Escuro', 'Ingresso'] },
  { word: 'Restaurante', hints: ['Comida', 'Garçom', 'Cardápio', 'Mesa', 'Conta'] },
  { word: 'Aeroporto', hints: ['Avião', 'Malas', 'Portão de Embarque', 'Passaporte', 'Viagem'] },
  { word: 'Estádio de Futebol', hints: ['Torcida', 'Campo', 'Gol', 'Bandeiras', 'Uniforme'] },
  { word: 'Biblioteca', hints: ['Livros', 'Silêncio', 'Estudo', 'Prateleiras', 'Leitura'] },
  { word: 'Circo', hints: ['Palhaço', 'Picadeiro', 'Pipoca', 'Malabares', 'Alegria'] },
  { word: 'Zoológico', hints: ['Animais', 'Gaiolas', 'Visitação', 'Natureza', 'Ingresso'] },
  { word: 'Parque de Diversões', hints: ['Montanha-russa', 'Roda-gigante', 'Algodão Doce', 'Brinquedos', 'Fila'] },
  { word: 'Casamento', hints: ['Noiva', 'Festa', 'Bolo', 'Vestido', 'Igreja'] },
  { word: 'Escritório', hints: ['Trabalho', 'Computador', 'Reunião', 'Café', 'Mesa'] }
];

@Injectable({
  providedIn: 'root',
})
export class OndeEstouService {
  getRandomWord(): ImpostorWord {
    const randomIndex = Math.floor(Math.random() * WORDS_ONDE_ESTOU.length);
    return WORDS_ONDE_ESTOU[randomIndex];
  }
}
