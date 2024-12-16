import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { Container, StyledImage, Text } from "../components/Container";
import useFetch, { Todo } from "../hooks/useFetch";
import { useTheme } from "../contexts/ThemeProvider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ColorPallete } from "../constants/Colors";
import { ApiBaseURL, TodoTypes } from "../constants/ApiConstants";
import GradientCard from "../components/GradientCard";
import Listing from "../components/ListingComponent/Listing";
import { RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTodos } from "../contexts/TodosProvider";
import Toast from "react-native-toast-message";
import InputModal from "../components/InputModal";
import { generateRandom2DigitNumber } from "../constants/Utils";
import { useNetworkState } from "expo-network";

// Typing the navigation prop for the WelcomeScreen
type TodoListNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "TodoList"
>;

interface TodoScreenProps {
  navigation: TodoListNavigationProps;
}

interface ShowToast {
  type: string;
  text1: string;
  text2: string;
}

const TodoList: React.FC<TodoScreenProps> = ({ navigation }) => {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const { globalTodos, setGlobalTodos } = useTodos();
  const { triggerFetch } = useFetch<{ todos: Todo[] }>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  // New State for Add Modal
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getTodos(skip, limit);
  }, [skip, limit]);

  useEffect(() => {
    setGlobalTodos(todos);
  }, [todos, globalTodos]);

  const getTodos = async (skip: number, limit: number) => {
    try {
      const { data, loading } = await triggerFetch(
        `${ApiBaseURL}?limit=${limit}&skip=${skip}`,
        "GET"
      );
      setLoading(loading);
      if (data) {
        setGlobalTodos([]); // Empty existing TODOS on a fresh API CALL
        setTodos((prevTodos) => [...prevTodos, ...data.todos]);
        setHasMore(data.todos.length > 0);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      alert("Failed to fetch todos. Please try again.");
    }
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setSkip((prevSkip) => prevSkip + limit);
    }
  };

  const handleEditTodo = async (id: number, updates: Todo) => {
    try {
      const { data } = await triggerFetch(
        `${ApiBaseURL}/${id}`,
        "PUT",
        updates
      );

      if (data) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, ...updates } : todo
          )
        );
        showToast({
          type: "success",
          text1: "Success",
          text2: "Edit Success ✅",
        });
      } else {
        showToast({
          type: "error",
          text1: "Error",
          text2: "Failed Editing",
        });
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (selectedTodo: Todo) => {
    try {
      const { data } = await triggerFetch(
        `${ApiBaseURL}/1`,
        "DELETE",
        selectedTodo
      ); // used 1 so as to depict the delete operation successfully

      if (data) {
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo.id !== selectedTodo.id)
        );
        showToast({
          type: "success",
          text1: "Deleted!",
          text2: "Deletion Success ✅",
        });
      } else {
        showToast({
          type: "error",
          text1: "Error",
          text2: "Failed Deleting",
        });
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleAddTodo = async (title: string) => {
    const newTodo: Todo = {
      todo: title,
      completed: false,
      userId: generateRandom2DigitNumber(),
      id: generateRandom2DigitNumber(),
    };
    try {
      const { data } = await triggerFetch(`${ApiBaseURL}/add`, "POST", newTodo);
      const newTodoData = Array.isArray(data) ? data[0] : data; // In case response is wrapped in an array
      if (data) {
        newTodoData.addedLocally = true;
        setTodos((prevTodos) => [newTodoData, ...prevTodos]);
        setModalVisible(false);
        showToast({
          type: "success",
          text1: "Success",
          text2: "New Todo Added ✅",
        });
      } else {
        showToast({
          type: "error",
          text1: "Error",
          text2: "Failed adding A Todo",
        });
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const showToast = (config: ShowToast) => {
    Toast.show(config);
  };

  return (
    <Container padding="50px 0 0">
      <GreetingSection>
        <View style={styles.topView}>
          <StyledImage
            source={require("../../assets/images/man.png")}
            width={50}
            height={50}
          />
          <View>
            <Text fontSize={24}>Hey, User 👋</Text>
            <Text fontSize={14}>Your daily adventure starts now</Text>
          </View>
        </View>
        <MaterialIcons
          name={isDarkMode ? "light-mode" : "dark-mode"}
          color={theme.text}
          size={32}
          onPress={toggleTheme}
          style={styles.themeIcon}
        />
      </GreetingSection>

      <View style={styles.gradientWrap}>
        <GradientCard
          gradientColors={ColorPallete.greenGradient}
          iconName="fact-check"
          iconBackgoundColor={ColorPallete.greenBackGround}
          label="Completed"
          tapAction={() => {
            navigation.navigate("TodoDetail", {
              todoType: TodoTypes.completed,
            });
          }}
        />
        <GradientCard
          gradientColors={ColorPallete.orangeGradient}
          gradientStart={{ x: 0, y: 0 }}
          gradientEnd={{ x: 1, y: 0 }}
          iconName="pending-actions"
          iconBackgoundColor={ColorPallete.orangeBackGround}
          label="Pending"
          tapAction={() => {
            navigation.navigate("TodoDetail", { todoType: TodoTypes.pending });
          }}
        />
      </View>

      {loading ? (
        <ActivityWrap>
          <ActivityIndicator size="large" color={"black"} />
        </ActivityWrap>
      ) : (
        <>
          <Listing
            data={todos}
            listHeading="Todo List"
            editAction={handleEditTodo}
            deleteAction={handleDelete}
            onEndReached={handleLoadMore}
            onToggleComplete={handleEditTodo}
            showActionButtons
            showActionButton
            onAddTodo={() => setModalVisible(true)}
          />

          <InputModal
            visible={modalVisible}
            title="Add New Todo"
            placeholder="Enter Todo Title"
            onClose={() => setModalVisible(false)}
            onConfirm={handleAddTodo}
          />
        </>
      )}
    </Container>
  );
};
//TODO: Inline CSS
//TODO: Unused code
//TODO: see more
export default TodoList;

const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: "5%",
    paddingHorizontal: 10,
  },
  gradientWrap: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  themeIcon: {
    paddingHorizontal: 15,
  },
});

const GreetingSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ActivityWrap = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
