import { Injectable } from '@angular/core';
import { Game, PlayerProfile } from '../models/game.models';

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
  {
    id: 'impostor',
    name: 'Impostor',
    description:
      'Um jogo de blefe e investigação! Todos os jogadores recebem uma palavra secreta, exceto o Impostor, que recebe apenas uma dica genérica. Cada participante deve dizer uma única palavra relacionada ao segredo. O objetivo dos jogadores é identificar o infiltrado, enquanto o Impostor deve tentar se misturar e descobrir a palavra real antes de ser desmascarado!',
    imageUrl: 'images/impostor.png',
  },
  {
    id: 'adivinhe-a-palavra',
    name: 'Adivinhe a Palavra',
    description:
      'Um desafio de vocabulário onde terminar a palavra é o que te faz perder! Os jogadores adicionam letras alternadamente para formar uma palavra oculta. O objetivo é evitar colocar a última letra que completa uma palavra válida. Se você acha que o jogador anterior inventou uma sequência impossível, pode lançar o "Duvido" — mas cuidado, se a palavra existir, quem perde é você!',
    imageUrl: 'images/adivinhe-a-palavra.png',
  },
  {
    id: 'qual-e-a-nota',
    name: 'Qual é a Nota?',
    description:
      'Um teste de sintonia e interpretação em duplas! Um jogador conhece uma nota secreta de 1 a 10 e deve dar uma dica baseada em um tema (ex: "Superpoderes: 1 é inútil, 10 é apocalíptico"). O parceiro precisa decifrar a dica e adivinhar exatamente qual foi a nota atribuída. Quanto mais próxima a resposta, maior a conexão da dupla!',
    imageUrl: 'images/qual-e-a-nota.png',
  },
  {
    id: 'jogo-da-lista',
    name: 'Jogo da Lista',
    description:
      'Uma corrida contra os adversários! Duplas se enfrentam para adivinhar uma lista de cinco palavras. O mestre de cada dupla deve dar dicas precisas para que seu parceiro acerte a palavra da vez. Se houver um erro, a dupla rival assume o controle para tentar "roubar" o ponto. Vence quem completar a lista primeiro!',
    imageUrl: 'images/jogo-da-lista.png',
  },
  {
    id: 'onde-estou',
    name: 'Onde estou?',
    description:
      'Um jogo de dedução e espionagem em locais inusitados! Todos os jogadores sabem onde estão (ex: "Aeroporto"), exceto o Impostor. O objetivo é fazer perguntas estratégicas para descobrir quem está perdido, enquanto o Impostor tenta descobrir o local através das respostas dos outros. Seja discreto: se o Impostor descobrir o local, ele vence!',
    imageUrl: 'images/onde-estou.png',
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
    const lightness = 60 + Math.floor(Math.random() * 20); // 60-80%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  async getGames(): Promise<Game[]> {
    return GAMES_DATA;
  }

  async getGameById(id: string): Promise<Game | undefined> {
    return GAMES_DATA.find((g) => g.id === id);
  }
}
