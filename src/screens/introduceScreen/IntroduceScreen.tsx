import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Dropdown from "../../components/dropdown/Dropdown";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchQuizQuestions } from "../../features/quiz/quizThunk";
import { Difficulty } from "../../types/index";
import { RootStackParamList } from "../../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type IntroduceScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "Introduce"
>;

const IntroduceScreen: React.FC = () => {
  const difficulties: Difficulty[] = ["easy", "medium", "hard"];
  const [difficultyChange, setDifficultyChange] = useState<Difficulty>("easy");
  const navigation = useNavigation<IntroduceScreenProp>();
  const dispatch = useAppDispatch();
  const TOTAL_QUESTIONS = 10;

  const startQuiz = async () => {
    if (difficultyChange) {
      await dispatch(
        fetchQuizQuestions({
          difficulty: difficultyChange,
          amount: TOTAL_QUESTIONS,
        })
      );
      navigation.navigate("Quiz", {
        difficulty: difficultyChange,
        amount: TOTAL_QUESTIONS,
      });
    }
  };

  return (
    <View style={styles.introduce}>
      <View style={styles.introduceContainer}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Bkx-bV8Y7oosGWM6rxIzAZdNyqNw1QaZKw&usqp=CAU",
          }}
          style={styles.logo}
        />
        <Dropdown
          data={difficulties}
          setDifficultyChange={setDifficultyChange}
        />
        <TouchableOpacity onPress={startQuiz} style={styles.introduceBtn}>
          <Text style={styles.btnText}>Quiz'e Başla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  introduce: {
    flex: 1,
    backgroundColor: "#621be7",
    justifyContent: "center",
    alignItems: "center",
  },
  introduceContainer: {
    maxWidth: 700,
    width: "90%",
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    borderRadius: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  introduceBtn: {
    width: 350,
    height: 50,
    backgroundColor: "#621be7",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  btnText: {
    color: "white",
    fontSize: 18,
  },
});

export default IntroduceScreen;
