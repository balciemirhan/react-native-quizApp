import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { resetQuiz } from "../../features/quiz/quizSlice";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ModalProps {
  score: number;
}

type ModalScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "Introduce"
>;

const Modal: React.FC<ModalProps> = ({ score }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<ModalScreenProp>();

  const handleRestart = () => {
    dispatch(resetQuiz());
    navigation.navigate("Loading");
  };

  return (
    <View style={styles.modal}>
      <Text style={styles.title}>Score: {score}</Text>
      <TouchableOpacity onPress={handleRestart} style={styles.button}>
        <Text style={styles.buttonText}>Yeniden Başla</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#621be7",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  button: {
    width: 350,
    height: 50,
    backgroundColor: "#621be7",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default Modal;
