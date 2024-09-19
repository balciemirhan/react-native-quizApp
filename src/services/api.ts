import axios from "axios";
import { Question, Difficulty } from "../types";
import { shuffleArray } from "../utils/helpers";

const BASE_URL = "https://opentdb.com/api.php";

export const fetchQuizData = async (
  difficulty: Difficulty,
  amount: number
): Promise<Question[]> => {
  const url = `${BASE_URL}?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  try {
    const response = await axios.get(url);
    return response.data.results.map((dt: any) => ({
      ...dt,
      answers: shuffleArray([...dt.incorrect_answers, dt.correct_answer]),
    }));
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    throw error;
  }
};
