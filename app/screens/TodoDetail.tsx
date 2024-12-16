import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types"; // Import the types
import { useTodos } from "../contexts/TodosProvider";

import Listing from "../components/ListingComponent/Listing";
import { Todo } from "../hooks/useFetch";
import { filterTodos } from "../constants/Utils";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TodoTypes } from "../constants/ApiConstants";

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
  const { globalTodos } = useTodos(); // Access todos from context
  const [todos, setTodos] = useState<Todo[]>([]);
  const [heading, setHeading] = useState<string>("");

  useEffect(() => {
    // set the listing according to the type of todo selected by the user
    if (todoType === TodoTypes.completed) {
      navigation.setOptions({
        title: "Completed Todos",
      });
      setTodos(filterTodos(globalTodos).completedTodos);
      setHeading("Hurray! 🥳, What a progress!");
    } else {
      navigation.setOptions({
        title: "Pending Todos",
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
