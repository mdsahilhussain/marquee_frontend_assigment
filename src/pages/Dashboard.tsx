import React from "react";
import { useTodo } from "../Context/TodoContext";
import { Todo, TodoList, Navbar } from "../Components";

const Dashboard: React.FC = () => {
  const { addTodo } = useTodo();

  return (
    <React.Fragment>
      <Navbar />
      <div className="pt-16">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-2">My Todo</h1>
          <Todo addTodo={addTodo} />
          <div
            className=" scroll-m-0 overflow-y-scroll"
            style={{ height: "68vh" }}
          >
            <TodoList />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
