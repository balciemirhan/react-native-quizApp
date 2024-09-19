export interface Question {
  category: string;
  type: string;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
}

export type Difficulty = "easy" | "medium" | "hard";
