import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/index";
import QuestionCard from "../../components/questionCard/QuestionCard";
import ModalComponent from "../../components/modal/Modal";
import { startQuiz } from "../../features/quiz/quizSlice";

const QuizScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {
    questions,
    currentQuestionIndex,
    score,
    quizStarted,
    loading,
    error,
  } = useSelector((state: RootState) => state.quiz);

  useEffect(() => {
    if (questions.length > 0 && !quizStarted) {
      dispatch(startQuiz());
    }
  }, [questions, quizStarted, dispatch]);

  const showModal = currentQuestionIndex > questions.length - 1;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!quizStarted) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Quiz Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.quiz}>
      {showModal ? <ModalComponent score={score} /> : <QuestionCard />}
    </View>
  );
};

const styles = StyleSheet.create({
  quiz: {
    flex: 1,
    backgroundColor: "#621be7",
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    flex: 1,
    backgroundColor: "#621be7",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});

export default QuizScreen;
