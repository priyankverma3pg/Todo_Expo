// contexts/TodosContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Todo } from "../hooks/useFetch";

// Define the type of the context
interface TodosContextType {
  globalTodos: Todo[];
  setGlobalTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

// Create the context with default values
const TodosContext = createContext<TodosContextType | undefined>(undefined);

// Create a provider to wrap around your components
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

// Custom hook to access the context
export const useTodos = (): TodosContextType => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
};
