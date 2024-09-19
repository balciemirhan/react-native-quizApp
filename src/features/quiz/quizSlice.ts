import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question } from "../../types";
import { fetchQuizQuestions } from "./quizThunk";

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  loading: boolean;
  error: string | null;
  quizStarted: boolean;
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  loading: false,
  error: null,
  quizStarted: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startQuiz: state => {
      state.quizStarted = true;
    },
    nextQuestion: state => {
      state.currentQuestionIndex += 1;
    },
    updateScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
    resetQuiz: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchQuizQuestions.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuizQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { nextQuestion, updateScore, resetQuiz, startQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;
