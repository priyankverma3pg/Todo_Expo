/**
 * A provider component that wraps the app and provides the global todos state and 
 * a function to update the todos through the `TodosContext`.
 *
 * This component must be wrapped around the components that need access to the global todos.
 *
 * @component
 * @param {ReactNode} children - The children components to be rendered inside the provider.
 * @returns {JSX.Element} The `TodosContext.Provider` wrapped with the provided global todos state and setter function.
 *
 * @example
 * <TodosProvider>
 *   <App />
 * </TodosProvider>
 */

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Todo } from "../hooks/useFetch";

/**
 * Context type for managing todos in the application.
 * This context stores the global state of todos and provides a function to update them.
 *
 * @interface TodosContextType
 * @property {Todo[]} globalTodos - The current list of todos.
 * @property {React.Dispatch<React.SetStateAction<Todo[]>>} setGlobalTodos - Function to update the `globalTodos` state.
 */
interface TodosContextType {
  globalTodos: Todo[];
  setGlobalTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}


// Create the context with default values
const TodosContext = createContext<TodosContextType | undefined>(undefined);


export const TodosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [globalTodos, setGlobalTodos] = useState<Todo[]>([]);

  return (
    <TodosContext.Provider value={{ globalTodos, setGlobalTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

/**
 * Custom hook to access the todos context. It provides access to the global todos 
 * and a function to update them. This hook ensures that the component using it is 
 * wrapped in a `TodosProvider`.
 *
 * @returns {TodosContextType} The `globalTodos` array and `setGlobalTodos` function.
 *
 * @throws {Error} If used outside the `TodosProvider`, it throws an error.
 *
 * @example
 * const { globalTodos, setGlobalTodos } = useTodos();
 */
export const useTodos = (): TodosContextType => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
};
