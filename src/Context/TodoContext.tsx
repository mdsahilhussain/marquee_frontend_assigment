/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, useEffect, useContext } from "react";
import { Todo, iTodoContextProps } from "../interface/Types";

const TodoContext = createContext<iTodoContextProps>({
  todos: [],
  addTodo: () => {},
  addSubtask: () => {},
  deleteTodo: () => {},
  deleteSubtask: () => {},
  editTodo: () => {},
  editSubtask: () => {},
  completeSubtask: () => {},
});

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  console.log(todos, "-----todos");

  const addSubtask = (todoId: number, subtask: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: [...todo.subtasks, subtask],
            }
          : todo
      )
    );
  };

  const deleteTodo = (todoId: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  const completeSubtask = (todoId: number, subtaskId: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, isDone: !subtask.isDone }
                  : subtask
              ),
            }
          : todo
      )
    );
  };

  const deleteSubtask = (todoId: number, subtaskId: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.filter(
                (subtask) => subtask.id !== subtaskId
              ),
            }
          : todo
      )
    );
  };

  const editTodo = (todoId: number, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, text: newText } : todo
      )
    );
  };

  const editSubtask = (todoId: number, subtaskId: number, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, text: newText }
                  : subtask
              ),
            }
          : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        addSubtask,
        deleteTodo,
        deleteSubtask,
        editTodo,
        editSubtask,
        completeSubtask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): iTodoContextProps => useContext(TodoContext);
