import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchQuizData } from "../../services/api";
import { Difficulty } from "../../types";

interface FetchQuizArgs {
  difficulty: Difficulty;
  amount: number;
}

export const fetchQuizQuestions = createAsyncThunk(
  "quiz/fetchQuizQuestions",
  async ({ difficulty, amount }: FetchQuizArgs) => {
    const data = await fetchQuizData(difficulty, amount);
    return data;
  }
);
