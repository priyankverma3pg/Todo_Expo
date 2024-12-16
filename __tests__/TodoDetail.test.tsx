import React from "react";
import { render, waitFor, fireEvent, act } from "@testing-library/react-native";
import TodoDetail from "../app/screens/TodoDetail";
import { useTodos } from "../app/contexts/TodosProvider";
import { useTheme } from "../app/contexts/ThemeProvider";
import { TodoTypes } from "../app/constants/ApiConstants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../app/types";
import { filterTodos } from "../app/constants/Utils";
import { RouteProp } from "@react-navigation/native";
type TodoDetailRouteProp = Partial<RouteProp<RootStackParamList, "TodoDetail">>;

type NavigationMock = Partial<
  NativeStackNavigationProp<RootStackParamList, "TodoDetail">
>;

// Mock required modules
jest.mock("../app/contexts/TodosProvider", () => ({
  useTodos: jest.fn(),
}));
jest.mock("../app/contexts/ThemeProvider", () => ({
  useTheme: jest.fn(),
}));
jest.mock("../app/constants/Utils", () => ({
  filterTodos: jest.fn(),
}));
jest.mock("@react-navigation/native-stack", () => ({
  NativeStackNavigationProp: jest.fn(),
}));

// Sample Todo data to mock API responses
const mockTodos = [
  { id: 1, todo: "Test Todo 1", completed: true, userId: 1 },
  { id: 2, todo: "Test Todo 2", completed: false, userId: 2 },
];

// Test suite
describe("TodoDetail Component", () => {
  const mockRoute = {
    params: { todoType: TodoTypes.completed },
  };
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: { background: "white", text: "black" },
    });
    (useTodos as jest.Mock).mockReturnValue({
      globalTodos: mockTodos,
    });
    (filterTodos as jest.Mock).mockReturnValue({
      completedTodos: [mockTodos[0]],
      pendingTodos: [mockTodos[1]],
    });
  });



  it("displays correct heading when todos are present", async () => {
    const mockNavigation = {
      setOptions: jest.fn(),
    };
    const route = {
      params: { todoType: TodoTypes.completed },
    };

    const { getByText } = render(
      <TodoDetail route={mockRoute as any} navigation={mockNavigation as any} />
    );

    await act(async () => {
      expect(getByText("Hurray! 🥳, What a progress!")).toBeTruthy();
      expect(getByText("Test Todo 1")).toBeTruthy();
    });
  });


});
