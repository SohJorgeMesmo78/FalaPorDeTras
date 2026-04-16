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
  {
    id: 'pergunta-do-impostor',
    name: 'Pergunta do Impostor',
    description:
      'Um jogo de blefe e investigação! Todos os jogadores recebem a mesma pergunta, exceto um: o Impostor, que recebe uma pergunta diferente, mas com respostas parecidas. Após todos responderem, o grupo deve debater para identificar quem está fora de sintonia. O objetivo do Impostor é se misturar e não ser descoberto, enquanto os outros tentam desmascará-lo!',
    imageUrl: 'images/pergunta-do-impostor.png',
  },
  {
    id: 'contato',
    name: 'Contato',
    description:
      'Um jogo de sincronia e dedução por letras! O mestre pensa em uma palavra e revela apenas a primeira letra. Os jogadores dão dicas para que outros jogadores tentem adivinhar palavras com essa inicial. Se dois jogadores fizerem "contato" e disserem a mesma palavra juntos após a contagem, o mestre revela a próxima letra. Mas cuidado: o mestre pode bloquear a jogada se ele adivinhar a palavra antes de vocês!',
    imageUrl: 'images/contato.png',
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

export const WORDS_CONTATO = [
  'Laranja', 'Elefante', 'Girassol', 'Montanha', 'Bicicleta',
  'Televisão', 'Cachorro', 'Pinguim', 'Espelho', 'Diamante',
  'Sorvete', 'Bateria', 'Guitarra', 'Travesseiro', 'Abacaxi',
  'Foguete', 'Canguru', 'Hospital', 'Ventilador', 'Sinfonia',
  'Astronauta', 'Mochila', 'Biblioteca', 'Cicatriz', 'Helicóptero',
];

export interface ImpostorPair {
  q1: string;
  q2: string;
}

export interface PlayerProfile {
  id: number;
  name: string;
  color: string;
}

export const WORDS_IMPOSTOR_PAIRS: ImpostorPair[] = [
  {
    q1: 'Qual sua sobremesa favorita?',
    q2: 'Qual sobremesa você menos gosta?',
  },
  {
    q1: 'Qual superpoder você gostaria de ter?',
    q2: 'Qual superpoder você acha o mais inútil?',
  },
  {
    q1: 'Para qual país você adoraria viajar?',
    q2: 'Em qual país você nunca moraria?',
  },
  {
    q1: 'Qual animal doméstico você teria?',
    q2: 'Qual animal você tem muito medo?',
  },
  {
    q1: 'Qual seu filme de comédia favorito?',
    q2: 'Qual filme te fez chorar muito?',
  },
  {
    q1: 'Qual sua matéria preferida na escola?',
    q2: 'Qual matéria escolar você era pior?',
  },
  {
    q1: 'Qual sua rede social mais usada?',
    q2: 'Qual rede social você apagaria se pudesse?',
  },
  {
    q1: 'Qual cheiro você acha maravilhoso?',
    q2: 'Qual cheiro te dá nojo na hora?',
  },
];

@Injectable({
  providedIn: 'root',
})
export class GameService {
  showCountdown: boolean = true;
  customPlayers: PlayerProfile[] = [];

  generateVibrantColor(): string {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 80 + Math.floor(Math.random() * 20); // 80-100%
    const lightness = 60 + Math.floor(Math.random() * 20); // 60-80% (avoiding super darks)
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

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

  getRandomContatoWord(): string {
    const randomIndex = Math.floor(Math.random() * WORDS_CONTATO.length);
    return WORDS_CONTATO[randomIndex];
  }

  getRandomImpostorPair(): ImpostorPair {
    const randomIndex = Math.floor(Math.random() * WORDS_IMPOSTOR_PAIRS.length);
    return WORDS_IMPOSTOR_PAIRS[randomIndex];
  }

  async getGames(): Promise<Game[]> {
    return GAMES_DATA;
  }

  async getGameById(id: string): Promise<Game | undefined> {
    return GAMES_DATA.find((g) => g.id === id);
  }
}
