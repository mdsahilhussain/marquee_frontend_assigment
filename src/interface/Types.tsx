import { Todo } from "../Components";

export interface iLoginInfo {
  email: string;
  password: string;
}

export interface Todo {
  id: number;
  text: string;
  subtasks: Todo[];
  isDone: boolean;
}

export interface iTodo {
  id: number;
  text: string;
  subtasks: Todo[];
  isDone: boolean;
}

export interface iTodoContextProps {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  addSubtask: (todoId: number, subtask: Todo) => void;
  deleteTodo: (todoId: number) => void;
  deleteSubtask: (todoId: number, subtaskId: number) => void;
  completeSubtask: (todoId: number, subtaskId: number) => void;
  editTodo: (todoId: number, newText: string) => void;
  editSubtask: (todoId: number, subtaskId: number, newText: string) => void;
}

export interface iUser {
  name: string;
  email: string;
  password: string;
}

export interface iUserContextProps {
  user: iUser | null;
  logoutHandler: () => void;
  setUser: (user: iUser | null) => void;
}

