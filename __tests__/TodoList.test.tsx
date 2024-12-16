import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import TodoList from "../app/screens/TodoList";
import { useTheme } from "../app/contexts/ThemeProvider";
import { useTodos } from "../app/contexts/TodosProvider";
import useFetch from "../app/hooks/useFetch";
import { ApiBaseURL } from "../app/constants/ApiConstants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../app/types";

type NavigationMock = Partial<
  NativeStackNavigationProp<RootStackParamList, "TodoList">
>;
// Mock required modules
jest.mock("../app/contexts/ThemeProvider", () => ({
  useTheme: jest.fn(),
}));
jest.mock("../app/contexts/TodosProvider", () => ({
  useTodos: jest.fn(),
}));
jest.mock("../app/hooks/useFetch", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));
jest.mock("@react-navigation/native-stack", () => ({
  NativeStackNavigationProp: jest.fn(),
}));

// Sample Todo data to mock API responses
const mockTodos = [
  { id: 1, todo: "Test Todo 1", completed: false, userId: 1 },
  { id: 2, todo: "Test Todo 2", completed: false, userId: 2 },
];

// Test suite
describe("TodoList Component", () => {
  const mockNavigation: NavigationMock = {
    replace: jest.fn(),
  };
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      toggleTheme: jest.fn(),
      isDarkMode: false,
    });
    (useTodos as jest.Mock).mockReturnValue({
      globalTodos: mockTodos,
      setGlobalTodos: jest.fn(),
    });
    (useFetch as jest.Mock).mockReturnValue({
      triggerFetch: jest.fn().mockResolvedValue({
        data: { todos: mockTodos },
        loading: false,
      }),
    });
  });

  it("renders the TodoList correctly", async () => {
    const { getByText, getByTestId } = render(
      <TodoList navigation={mockNavigation as any} />
    );

    // Check if the title and some todos are rendered
    await waitFor(() => expect(getByText("Todo List")).toBeTruthy());
    expect(getByText("Test Todo 1")).toBeTruthy();
    expect(getByText("Test Todo 2")).toBeTruthy();
  });

  it("calls the API on initial load and sets todos", async () => {
    const { triggerFetch } = (useFetch as jest.Mock).mock.results[0].value;

    render(<TodoList navigation={mockNavigation as any} />);

    // Check that the API fetch is called once
    expect(triggerFetch).toHaveBeenCalledWith(
      `${ApiBaseURL}?limit=10&skip=0`,
      "GET"
    );
  });

});
