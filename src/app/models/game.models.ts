export interface Game {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface PlayerProfile {
  id: number;
  name: string;
  color: string;
}

export interface ImpostorWord {
  word: string;
  hints: string[];
}

export interface ImpostorPair {
  q1: string;
  q2: string;
}
