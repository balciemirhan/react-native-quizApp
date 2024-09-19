import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type LoadingScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "Introduce"
>;

const LoadingScreen: React.FC = () => {
  const navigation = useNavigation<LoadingScreenProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Introduce");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.loadingScreen}>
      <Text style={styles.text}>Quiz Yeniden Başlatılıyor...</Text>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: "#621be7",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
});

export default LoadingScreen;
