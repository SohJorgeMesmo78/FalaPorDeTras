import { Injectable } from '@angular/core';

export interface Game {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const GAMES_DATA: Game[] = [
  {
    id: 'quem-sou-eu',
    name: 'Quem sou eu?',
    description:
      'O clássico jogo de adivinhação! Um jogador escolhe secretamente um personagem, animal ou celebridade. Os demais participantes devem tentar descobrir a identidade misteriosa fazendo perguntas estratégicas que só podem ser respondidas com "Sim" ou "Não".',
    imageUrl: 'images/quem-sou-eu.png',
  },
  {
    id: 'cha-ou-cafe',
    name: 'Chá ou Café?',
    description:
      'Um desafio de associação e raciocínio rápido! Um jogador escolhe uma palavra secreta e os outros devem adivinhá-la através de comparações. A cada rodada, é oferecida uma escolha entre duas opções sempre iniciando com "Chá ou Café?", e o jogador revela qual delas mais se aproxima do seu segredo. O objetivo é afunilar as possibilidades até que alguém descubra a palavra oculta!',
    imageUrl: 'images/cha-ou-cafe.png',
  },
  {
    id: 'ito',
    name: 'Ito',
    description:
      'Um jogo cooperativo de percepção e intensidade! Cada jogador recebe um número secreto de 1 a 100 e deve dar uma dica baseada em um tema escolhido (ex: "Alimentos: do pior ao melhor"). O desafio é o grupo organizar todas as dicas em ordem crescente sem revelar os números. Será que a sua escala de valores é a mesma dos seus amigos?',
    imageUrl: 'images/ito.png',
  },
  {
    id: 'batata-quente',
    name: 'Batata Quente',
    description:
      'Um jogo de agilidade mental contra o relógio! Um tema é sorteado (ex: "Animais Mamíferos") e um cronômetro de 1 minuto começa a correr. Cada jogador deve dizer uma palavra relacionada ao tema sem repetir o que já foi dito. O objetivo é passar a vez rápido, pois quem estiver com a "bomba" na mão quando o tempo esgotar, perde!',
    imageUrl: 'images/batata-quente.png',
  },
];

export const WORDS_QUEM_SOU_EU = [
  'Bob Esponja',
  'Mickey Mouse',
  'Homem-Aranha',
  'Naruto',
  'Batman',
  'Pica-Pau',
  'Homer Simpson',
  'Mulher Maravilha',
  'Harry Potter',
  'Pikachu',
  'Silvio Santos',
  'Neymar',
  'Anitta',
  'Faustão',
  'Pelé',
  'Xuxa',
  'Ivete Sangalo',
  'Michael Jackson',
  'Ronaldo Fenômeno',
  'Tatá Werneck',
];

export const WORDS_CHA_OU_CAFE = [
  'Cachorro-quente',
  'Pão de Queijo',
  'Brigadeiro',
  'Feijoada',
  'Açaí',
  'Geladeira',
  'Televisão',
  'Bicicleta',
  'Celular',
  'Avião',
  'Sílvia Santos',
  'Monalisa',
  'Cachorro',
  'Gato',
  'Leão',
  'Praia',
  'Montanha',
  'Câmera Fotográfica',
  'Violão',
  'Piscina',
];

export const WORDS_ITO_THEMES = [
  'Filmes: do pior ao melhor',
  'Comidas: da pior à melhor',
  'Animais: do menos ao mais perigoso',
  'Superpoderes: do mais inútil ao mais apelão',
  'Profissões: da menos à mais estressante',
  'Lugares para passar as férias: do pior ao melhor',
  'Coisas para fazer no fim de semana: do mais chato ao mais legal',
  'Presentes: do pior ao melhor para se ganhar',
  'Esportes: do mais chato ao mais emocionante',
  'Jogos de Videogame: do pior ao melhor',
];

export const WORDS_BATATA_QUENTE = [
  'Animais Mamíferos',
  'Cores',
  'Frutas Nacionais',
  'Marcas de Carro',
  'Séries de TV',
  'Personagens de Desenho Animado',
  'Animais que vivem na Água',
  'Objetos que tem na Cozinha',
  'Times de Futebol',
  'Times de Basquete',
  'Super-heróis',
  'Cidades do Brasil',
  'Países da Europa',
  'Ferramentas',
  'Instrumentos Musicais',
];

@Injectable({
  providedIn: 'root',
})
export class GameService {
  showCountdown: boolean = true;

  getRandomQuemSouEuWord(): string {
    const randomIndex = Math.floor(Math.random() * WORDS_QUEM_SOU_EU.length);
    return WORDS_QUEM_SOU_EU[randomIndex];
  }

  getRandomChaOuCafeWord(): string {
    const randomIndex = Math.floor(Math.random() * WORDS_CHA_OU_CAFE.length);
    return WORDS_CHA_OU_CAFE[randomIndex];
  }

  getRandomItoTheme(): string {
    const randomIndex = Math.floor(Math.random() * WORDS_ITO_THEMES.length);
    return WORDS_ITO_THEMES[randomIndex];
  }

  getRandomBatataQuenteTheme(): string {
    const randomIndex = Math.floor(Math.random() * WORDS_BATATA_QUENTE.length);
    return WORDS_BATATA_QUENTE[randomIndex];
  }

  async getGames(): Promise<Game[]> {
    return GAMES_DATA;
  }

  async getGameById(id: string): Promise<Game | undefined> {
    return GAMES_DATA.find((g) => g.id === id);
  }
}
