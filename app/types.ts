export type RootStackParamList = {
  Welcome: undefined; // No params for Welcome screen
  TodoList: undefined; // No params for TodoList screen
  TodoDetail: { todoType: string }; // Params for TodoDetail screen, expects a 'todoId' string
};
