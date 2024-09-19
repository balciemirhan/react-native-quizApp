import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./src/store/index";
import IntroduceScreen from "./src/screens/introduceScreen/IntroduceScreen";
import QuizScreen from "./src/screens/quizScreen/QuizScreen";
import LoadingScreen from "./src/components/loadingScreen/LoadingScreen";

export type RootStackParamList = {
  Introduce: undefined;
  Quiz: { difficulty: string; amount: number };
  Loading: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Introduce">
          <Stack.Screen
            name="Introduce"
            component={IntroduceScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Quiz"
            component={QuizScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
