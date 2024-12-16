import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import TodoList from "./app/screens/TodoList";
import { ThemeProvider } from "./app/contexts/ThemeProvider";
import TodoDetail from "./app/screens/TodoDetail";
import { RootStackParamList } from "./app/types";
import { TodosProvider } from "./app/contexts/TodosProvider";
import Toast from "react-native-toast-message";
// Create the navigation stack type using the RootStackParamList
const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <TodosProvider>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerBackButtonDisplayMode: "minimal", // Hide the back button title
            }}
          >
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="TodoList"
              component={TodoList}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="TodoDetail" component={TodoDetail} />
          </Stack.Navigator>
        </TodosProvider>
        <Toast topOffset={80} />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
