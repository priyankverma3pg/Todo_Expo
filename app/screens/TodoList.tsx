/**
 * TodoList screen component that displays a list of todos and allows actions such as
 * adding, editing, deleting, and viewing todos. It supports infinite scrolling, fetches
 * todos from an API, and provides a modal to add new todos.
 *
 * @component
 * @example
 * <TodoList navigation={navigation} />
 *
 * @param {TodoScreenProps} props - The props for the TodoList component.
 * @param {TodoListNavigationProps} props.navigation - The navigation prop to navigate between screens.
 */

import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import styled from "styled-components/native";
import { Container, StyledImage, Text } from "../components/CommonStyledComponents";
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

  /**
   * Fetch todos from the API and update the state and context.
   * Supports pagination and updates the `todos` state with new data.
   *
   * @param {number} skip - The number of todos to skip for pagination.
   * @param {number} limit - The maximum number of todos to fetch per request.
   */
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
    }
  };

  /**
   * Load more todos by incrementing the `skip` value for pagination.
   */
  const handleLoadMore = () => {
    if (hasMore) {
      setSkip((prevSkip) => prevSkip + limit);
    }
  };

  /**
   * Edit an existing todo by sending a PUT request to the API and updating the state.
   *
   * @param {number} id - The ID of the todo to be edited.
   * @param {Todo} updates - The updated todo data.
   */
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

  /**
   * Delete a selected todo by sending a DELETE request to the API and updating the state.
   *
   * @param {Todo} selectedTodo - The todo that should be deleted.
   */
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

  /**
   * Add a new todo by sending a POST request to the API and updating the state with the new todo.
   *
   * @param {string} title - The title of the new todo to be added.
   */
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

  /**
   * Show a toast notification with a given configuration.
   *
   * @param {ShowToast} config - The configuration object for the toast notification.
   */
  const showToast = (config: ShowToast) => {
    Toast.show(config);
  };

  return (
    <Container padding="50px 0 0">
      <GreetingSection>
        <TopView>
          <StyledImage
            source={require("../../assets/images/man.png")}
            width={50}
            height={50}
          />
          <View>
            <Text fontSize={24}>Hey, User 👋</Text>
            <Text fontSize={14}>Your daily adventure starts now</Text>
          </View>
        </TopView>
        <ThemeIcon
          onPress={toggleTheme}
        >
          <StyledImage
            source={
              isDarkMode
                ? require("../../assets/images/light.png")
                : require("../../assets/images/moon.png")
            }
            width={40}
            height={40}
          />
        </ThemeIcon>
      </GreetingSection>

      <GradientWrap>
        <GradientCard
          gradientColors={ColorPallete.greenGradient}
          iconName={require("../../assets/images/checklist.png")}
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
          iconName={require("../../assets/images/pending.png")}
          iconBackgoundColor={ColorPallete.orangeBackGround}
          label="Pending"
          tapAction={() => {
            navigation.navigate("TodoDetail", { todoType: TodoTypes.pending });
          }}
        />
      </GradientWrap>

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

export default TodoList;

const GreetingSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TopView = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 5%;
  padding-horizontal: 10px;
`;

const GradientWrap = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-vertical: 10px;
`;

const ThemeIcon = styled.TouchableOpacity`
  padding-horizontal: 15px;
`;

const ActivityWrap = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
