import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useTodo } from "../../../Context/TodoContext";
import { sanitizeInput } from "../../../utils/SanitizeChecker";
import { iTodo, Todo } from "../../../interface/Types";

import {
  MdAdd,
  MdClose,
  MdDelete,
  MdEdit,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";

interface TodoItemProps {
  todo: iTodo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const {
    addSubtask,
    deleteTodo,
    deleteSubtask,
    editTodo,
    editSubtask,
    completeSubtask,
    completeTodo,
  } = useTodo();
  const [subtaskInput, setSubtaskInput] = useState<string>("");
  const [showAddSubtaskModal, setShowAddSubtaskModal] =
    useState<boolean>(false);
  const [showEditSubtaskModal, setShowEditSubtaskModal] =
    useState<boolean>(false);
  const [selectedSubtask, setSelectedSubtask] = useState<Todo | null>(null);
  const [isSubtasksVisible, setIsSubtasksVisible] = useState<boolean>(false);
  const [subtasksCompleted, setSubtasksCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (todo.subtasks.length === 0) {
      setSubtasksCompleted(false);
      return;
    }
    const allSubtasksCompleted = todo.subtasks.every(
      (subtask) => subtask.isDone
    );
    setSubtasksCompleted(allSubtasksCompleted);
  }, [todo.subtasks]);

  const handleAddSubtask = () => {
    setShowAddSubtaskModal(true);
  };

  const handleDeleteSubtask = (subtaskId: number) => {
    deleteSubtask(todo.id, subtaskId);
  };

  const onClickedTaskHandler = (todoId: number) => {
    if (todo.subtasks.length > 0) {
      subtasksCompleted
        ? alert("Your all subtask completed\nthere is not pending subtask")
        : alert("Complete your subtask\nyour subtask still pending");
      return;
    }
    completeTodo(todoId);
    setSubtasksCompleted((preValue) => !preValue);
  };

  const onCheckedHandler = (subtaskId: number) => {
    completeSubtask(todo.id, subtaskId);
  };

  const handleDeleteTask = (subtaskId: number) => {
    deleteTodo(subtaskId);
  };

  const handleEditTask = (taskId: number, taskText: string) => {
    setShowEditSubtaskModal(true);
  };

  const handleEditSubtask = (subtaskId: number, subtaskText: string) => {
    setShowEditSubtaskModal(true);
    setSubtaskInput(subtaskText);
    setSelectedSubtask({
      id: subtaskId,
      text: subtaskText,
      subtasks: [],
      isDone: false,
    });
  };

  const handleSaveSubtask = () => {
    const sanitizedText = sanitizeInput(subtaskInput);
    if (sanitizedText.trim() !== "") {
      if (selectedSubtask) {
        editSubtask(todo.id, selectedSubtask.id, sanitizedText);
      } else {
        const newSubtask: Todo = {
          id: Date.now(),
          text: sanitizedText.trim(),
          subtasks: [],
          isDone: false,
        };
        addSubtask(todo.id, newSubtask);
      }
    }
    setSubtaskInput("");
    setShowAddSubtaskModal(false);
    setShowEditSubtaskModal(false);
    setSelectedSubtask(null);
  };

  const toggleSubtasksVisibility = () => {
    setIsSubtasksVisible(!isSubtasksVisible);
  };

  return (
    <div className=" px-4 pb-2 pt-4 mb-4 hover:rounded hover:border-gray-0 shadow">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center ">
          <input
            checked={subtasksCompleted}
            className="mr-2"
            type="checkbox"
            onChange={() => onClickedTaskHandler(todo.id)}
          />
          <h3
            className="text-lg font-semibold capitalize text-pink-500 "
            style={
              subtasksCompleted
                ? { textDecoration: "line-through", opacity: "60%" }
                : undefined
            }
          >
            {todo.text}
          </h3>
        </div>
        <div>
          <button
            onClick={() => handleDeleteTask(todo.id)}
            className="bg-red-300 text-white rounded px-2 py-2 ml-2 hover:bg-red-500 mr-2"
          >
            <MdDelete size={20} color="white" />
          </button>
          <button
            onClick={handleAddSubtask}
            className="bg-pink-300 text-white rounded px-2 py-2 hover:bg-pink-500"
          >
            <MdAdd size={20} color="white" />
          </button>
        </div>
      </div>
      {todo.subtasks.length <= 0 && (
        <p style={{ fontSize: "0.7em", opacity: "60%" }}>No subtasks yet.</p>
      )}

      {isSubtasksVisible && todo.subtasks.length > 0 && (
        <React.Fragment>
          {todo.subtasks.map((subtask) => (
            <div
              key={subtask.id}
              className="flex items-center mt-1 py-2 px-4 border-t border-gray-200"
            >
              <input
                checked={subtask.isDone}
                className="mr-2"
                type="checkbox"
                onChange={() => onCheckedHandler(subtask.id)}
              />
              <p
                className="flex-grow"
                style={
                  subtask.isDone
                    ? { textDecoration: "line-through", opacity: "60%" }
                    : undefined
                }
              >
                {subtask.text}
              </p>
              <button
                disabled={subtask.isDone}
                style={subtask.isDone ? { cursor: "no-drop" } : undefined}
                onClick={() => handleEditSubtask(subtask.id, subtask.text)}
                className="border border-yellow-500 rounded-full px-2 py-2 ml-2  "
              >
                <MdEdit size={12} className="text-yellow-500 " />
              </button>
              <button
                onClick={() => handleDeleteSubtask(subtask.id)}
                className="border border-red-500 rounded-full px-2 py-2 ml-2 "
              >
                <MdDelete size={12} className="text-red-500" />
              </button>
            </div>
          ))}
        </React.Fragment>
      )}

      {todo.subtasks.length > 0 && (
        <button
          onClick={toggleSubtasksVisibility}
          className="flex items-center mt-2 text-gray-500 hover:text-gray-800"
        >
          {isSubtasksVisible ? (
            <span style={{ fontSize: "0.7em" }} className="flex items-center">
              <MdKeyboardArrowUp size={18} /> Hide
            </span>
          ) : (
            <span style={{ fontSize: "0.7em" }} className="flex items-center">
              <MdKeyboardArrowDown size={18} />
              {`Show ${todo.subtasks.length} subtask`}
            </span>
          )}
        </button>
      )}

      <Modal
        isOpen={showAddSubtaskModal || showEditSubtaskModal}
        onRequestClose={() => {
          setSubtaskInput("");
          setShowAddSubtaskModal(false);
          setShowEditSubtaskModal(false);
          setSelectedSubtask(null);
        }}
        className="Modal fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
        overlayClassName="Overlay"
      >
        <div className="relative bg-white rounded-lg px-8 py-4  max-w-md mx-auto w-96">
          <button
            onClick={() => {
              setSubtaskInput("");
              setShowAddSubtaskModal(false);
              setShowEditSubtaskModal(false);
              setSelectedSubtask(null);
            }}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <MdClose color="black" size={20} />
          </button>
          <h2 className="text-lg font-semibold mb-4">
            {showEditSubtaskModal ? "Edit Subtask" : "Add Subtask"}
          </h2>
          <div className="flex flex-col gap-y-3 ">
            <input
              type="text"
              placeholder="enter your subtask"
              value={subtaskInput}
              onChange={(e) => setSubtaskInput(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4"
            />
            <div className="text-right">
              <button
                onClick={handleSaveSubtask}
                className="bg-pink-600 text-white rounded px-4 py-2 w-48 text-right"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const TodoList: React.FC = () => {
  const { todos } = useTodo();

  return (
    <div className="p-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
