import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { nextQuestion, updateScore } from "../../features/quiz/quizSlice";

const QuestionCard: React.FC = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, score } = useSelector(
    (state: RootState) => state.quiz
  );
  const [timer, setTimer] = useState(30);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    if (timer === 0) {
      handleNextQuestion();
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(nextQuestion());
      setTimer(30);
    } else {
      dispatch(nextQuestion());
    }
  }, [currentQuestionIndex, questions.length, dispatch]);

  const handleAnswer = useCallback(
    (answer: string) => {
      const isCorrect = answer === currentQuestion.correct_answer;
      if (isCorrect) {
        dispatch(updateScore(100));
      }
      handleNextQuestion();
    },
    [currentQuestion.correct_answer, dispatch, handleNextQuestion]
  );

  if (!currentQuestion) return null;

  return (
    <View style={styles.questionCard}>
      <View style={styles.timer}>
        <Text style={styles.timerText}>{timer}</Text>
      </View>
      <Text style={styles.title}>
        {currentQuestionIndex + 1}/{questions.length} {currentQuestion.question}
      </Text>
      {currentQuestion.answers.map((answer, i) => (
        <TouchableOpacity
          key={i}
          style={styles.answerButton}
          onPress={() => handleAnswer(answer)}
        >
          <Text style={styles.answerText}>{answer}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  questionCard: {
    maxWidth: 700,
    width: "90%",
    backgroundColor: "#621be7",
    padding: 20,
    borderRadius: 10,
    position: "relative",
  },
  timer: {
    width: 50,
    height: 50,
    backgroundColor: "black",
    borderRadius: 25,
    position: "absolute",
    top: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  answerButton: {
    width: "48%",
    height: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  answerText: {
    fontSize: 17,
    color: "black",
  },
});

export default QuestionCard;
