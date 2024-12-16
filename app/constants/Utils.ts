import { Todo } from "../hooks/useFetch";
interface FilteredTodos {
  completedTodos: Todo[];
  pendingTodos: Todo[];
}

export const filterTodos = (todos: Todo[]): FilteredTodos => {
  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);

  return { completedTodos, pendingTodos };
};

export const generateRandom2DigitNumber = (): number => {
  return Math.floor(10 + Math.random() * 90); // Generates a number between 10 and 99
};
