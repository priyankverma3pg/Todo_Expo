/**
 * TodoDetail screen component that displays a list of either completed or pending todos.
 * It uses route parameters to determine the todo type (completed or pending) and updates
 * the screen's heading and list accordingly.
 *
 * @component
 * @example
 * <TodoDetail route={route} navigation={navigation} />
 *
 * @param {TodoDetailProps} props - The props for the TodoDetail component.
 * @param {TodoDetailRouteProp} props.route - The route prop containing the todoType.
 * @param {TodoDetailNavigationProp} props.navigation - The navigation prop to manage screen options and navigation actions.
 */

import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types"; // Import the types
import { useTodos } from "../contexts/TodosProvider";

import Listing from "../components/ListingComponent/Listing";
import { Todo } from "../hooks/useFetch";
import { filterTodos } from "../constants/Utils";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TodoTypes } from "../constants/ApiConstants";
import { useTheme } from "../contexts/ThemeProvider";

// Typing the route prop for the TodoDetail screen
type TodoDetailRouteProp = RouteProp<RootStackParamList, "TodoDetail">;
type TodoDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "TodoDetail"
>;

interface TodoDetailProps {
  route: TodoDetailRouteProp;
  navigation: TodoDetailNavigationProp;
}

const TodoDetail: React.FC<TodoDetailProps> = ({ route, navigation }) => {
  const { todoType } = route.params;
  const { theme } = useTheme();
  const { globalTodos } = useTodos(); // Access todos from context
  const [todos, setTodos] = useState<Todo[]>([]);
  const [heading, setHeading] = useState<string>("");

  useEffect(() => {
    // set the listing according to the type of todo selected by the user
    if (todoType === TodoTypes.completed) {
      navigation.setOptions({
        title: "Completed Todos", // Set the screen title
        headerTitleStyle: {
          color: theme.text,
        },
        headerStyle: {
          backgroundColor: theme.background,
        },
      });
      setTodos(filterTodos(globalTodos).completedTodos);
      setHeading("Hurray! 🥳, What a progress!");
    } else {
      navigation.setOptions({
        title: "Pending Todos", // Set the screen title
        headerTitleStyle: {
          color: theme.text,
        },
        headerStyle: {
          backgroundColor: theme.background,
        },
      });
      setHeading("Ohh! 🤓, Still need to speed up");
      setTodos(filterTodos(globalTodos).pendingTodos);
    }
  }, []);

  return (
    <Listing
      showActionButtons={false}
      data={todos}
      listHeading={todos.length ? heading : ""}
    />
  );
};

export default TodoDetail;
