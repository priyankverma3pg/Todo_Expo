import { useState } from "react";
import * as Network from "expo-network";
import { useTodos } from "../contexts/TodosProvider";

/**
 * Represents a Todo item.
 *
 * @interface Todo
 * @property {number} id - The unique identifier for the todo.
 * @property {string} todo - The text of the todo item.
 * @property {boolean} completed - Whether the todo has been completed.
 * @property {number} userId - The user ID associated with the todo.
 * @property {boolean} [addedLocally] - Optional flag to indicate if the todo was added locally.
 */
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  addedLocally?: boolean; // Flag to indicate locally added Todo
}

/**
 * Type definition for the API response used in the `useFetch` hook.
 *
 * @interface FetchResult
 * @template T
 * @property {T | null} data - The fetched data or null if an error occurs.
 * @property {boolean} loading - Indicates if the data is currently being fetched.
 * @property {string | null} error - Any error message if the fetch operation fails.
 * @property {function} triggerFetch - Function to trigger the fetch operation.
 */
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

/**
 * Custom hook for fetching data, handling offline operations, and updating global todos state.
 *
 * @template T
 * @returns {FetchResult<T>} The result of the fetch operation, including data, loading, error, and the `triggerFetch` function.
 *
 * @example
 * const { data, loading, error, triggerFetch } = useFetch<T>();
 */
const useFetch = <T>(): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { globalTodos, setGlobalTodos } = useTodos(); // Global Todos Context

  /**
   * Trigger a network fetch operation. Handles both online and offline scenarios.
   *
   * @param {string} url - The API endpoint to fetch data from.
   * @param {"GET" | "POST" | "PUT" | "DELETE"} [method="GET"] - The HTTP method for the request.
   * @param {Todo} [body] - The body data to send for POST, PUT, or DELETE requests.
   * @returns {Promise<{ data: T | null; error: string | null; loading: boolean }>} The fetch result, including data, error, and loading state.
   *
   * @throws {Error} If the fetch operation fails.
   */
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

  /**
   * Handles offline operations, such as using local data when the network is unavailable.
   *
   * @param {("GET" | "POST" | "PUT" | "DELETE")} method - The HTTP method for the operation.
   * @param {Todo} [body] - The todo item involved in the operation (for POST, PUT, or DELETE).
   * @returns {Promise<{ data: T | null; error: string | null; loading: boolean }>} The result of the offline operation.
   */
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

  /**
   * Updates the global todos state after a successful online operation (GET, POST, PUT, DELETE).
   *
   * @param {("GET" | "POST" | "PUT" | "DELETE")} method - The HTTP method for the operation.
   * @param {any} result - The result data returned from the API.
   * @param {Todo} [body] - The todo item involved in the operation (for POST, PUT, or DELETE).
   */
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
