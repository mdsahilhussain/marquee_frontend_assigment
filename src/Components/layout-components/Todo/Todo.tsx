import React, { useState } from "react";
import { iTodo } from "../../../interface/Types";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";

interface TodoProps {
  addTodo: (todo: iTodo) => void;
}

const Todo: React.FC<TodoProps> = ({ addTodo }) => {
  const [todoInput, setTodoInput] = useState("");
  const [isAddTodo, setAddTodo] = useState<boolean>(false);

  const handleAddTodo = () => {
    if (todoInput.trim() === "") {
      setAddTodo(false);
      return;
    }

    const newTodo: iTodo = {
      id: Date.now(),
      text: todoInput.trim(),
      subtasks: [],
      isDone: false,
    };

    addTodo(newTodo);
    setTodoInput("");
    setAddTodo(false);
  };

  return (
    <div className="p-4">
      <div className="text-right">
        <button
          onClick={() => setAddTodo(true)}
          className="bg-pink-500 text-white rounded px-4 py-1"
        >
          Add New Todo
        </button>
      </div>

      <Modal
        isOpen={isAddTodo}
        onRequestClose={() => {
          setAddTodo(false);
        }}
        className="Modal fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
        overlayClassName="Overlay"
      >
        <div className="relative bg-white rounded-lg px-8 py-4  max-w-md mx-auto w-96">
          <button
            onClick={() => {
              setAddTodo(false);
            }}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <MdClose color="black" size={20} />
          </button>
          <h2 className="text-lg font-bold mb-2">Hello,</h2>
          <p className="mb-4">Add your today tasks</p>
          <div className="flex flex-col gap-y-3 ">
            <input
              type="text"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              placeholder="enter your task"
              className="border border-gray-300 rounded px-2 py-1"
            />
            <div className="text-right">
              <button
                onClick={handleAddTodo}
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

export default Todo;
