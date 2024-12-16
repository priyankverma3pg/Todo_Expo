import { useState } from "react";
import * as Network from "expo-network";
import { useTodos } from "../contexts/TodosProvider";
import { generateRandom2DigitNumber } from "../constants/Utils";

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  addedLocally?: boolean; // Flag to indicate locally added Todo
}

// Type for the API response
interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  triggerFetch: (
    url: string,
    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: Todo
  ) => Promise<{ data: T | null; error: string | null; loading: boolean }>;
}

const useFetch = <T>(): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { globalTodos, setGlobalTodos } = useTodos(); // Global Todos Context

  const triggerFetch = async (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: Todo
  ): Promise<{ data: T | null; error: string | null; loading: boolean }> => {
    setLoading(true);
    setError(null);

    try {
      // Check for internet connectivity
      const networkState = await Network.getNetworkStateAsync();
      const isOnline =
        networkState.isConnected && networkState.isInternetReachable;

      // Handle offline case
      if (!isOnline) {
        console.warn("No internet connection. Using offline data.");
        return handleOfflineOperations(method, body); // Offline handling
      }

      // Prepare URL and options
      let fetchUrl = url;
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (body && (method === "POST" || method === "PUT")) {
        const { id, ...filteredBody } = body; // Exclude 'id' as API doesn't supports it
        options.body = JSON.stringify(filteredBody);
      }

      // Make API call
      const response = await fetch(fetchUrl, options);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      result.id = body?.id; // so that we don't get duplicate Key issue, because server always return 255 as `id`
      setData(result);

      // Update global context for consistency
      updateGlobalTodos(method, result, body);

      return { data: result, error: null, loading: false };
    } catch (err: any) {
      setError(err.message || "An error occurred");
      return {
        data: null,
        error: err.message || "An error occurred",
        loading: false,
      };
    } finally {
      setLoading(false);
    }
  };

  // Handle Offline Operations
  const handleOfflineOperations = async (
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: Todo
  ): Promise<{ data: T | null; error: string | null; loading: boolean }> => {
    if (method === "GET") {
      return { data: { todos: globalTodos } as T, error: null, loading: false };
    } else if (method === "POST" && body) {
      setGlobalTodos((prev) => [...prev, body]);
      return { data: body as T, error: null, loading: false };
    } else if (method === "PUT" && body) {
      setGlobalTodos((prev) =>
        prev.map((todo) => (todo.id === body.id ? { ...todo, ...body } : todo))
      );
      return { data: body as T, error: null, loading: false };
    } else if (method === "DELETE" && body) {
      setGlobalTodos((prev) => prev.filter((todo) => todo.id !== body.id));
      return { data: body as T, error: null, loading: false };
    }
    return {
      data: null,
      error: "Unsupported operation offline",
      loading: false,
    };
  };

  // Update Global Todos for Online Operations
  const updateGlobalTodos = (
    method: "GET" | "POST" | "PUT" | "DELETE",
    result: any,
    body?: Todo
  ) => {
    if (method === "GET") {
      setGlobalTodos(result.todos);
    } else if (method === "POST" && body) {
      setGlobalTodos((prev) => [...prev, { ...result, addedLocally: false }]);
    } else if (method === "PUT" && body) {
      setGlobalTodos((prev) =>
        prev.map((todo) => (todo.id === body.id ? { ...todo, ...body } : todo))
      );
    } else if (method === "DELETE" && body) {
      setGlobalTodos((prev) => prev.filter((todo) => todo.id !== body.id));
      return { data: true, error: null, loading: false };
    }
  };

  return { data, loading, error, triggerFetch };
};

export default useFetch;
