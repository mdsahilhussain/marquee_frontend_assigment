import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { TodoProvider } from "./Context/TodoContext";
import ProtectedRoute from "./ProtectRoute/ProtectRoute";

function App() {
  const navigate = useNavigate();

  const mockUser = {
    name: "userOne Test",
    email: "useronetest1@gmail.com",
    password: "test@123",
  };

  useEffect(() => {
    localStorage.setItem("user_info", JSON.stringify(mockUser));
  }, []);

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("token");

    if (!isUserLoggedIn) {
      navigate("/");
    } else {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <TodoProvider>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </TodoProvider>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <div className="w-screen h-screen flex justify-center items-center flex-col">
              <img
                src="./assets/oops404.png"
                alt="page not found"
                width={500}
                height={500}
              />
              <button
                className="bg-pink-500 text-white px-4 py-2 shadow-lg rounded-md hover:scale-105 transition-all ease-out"
                onClick={() => navigate("/")}
              >
                Go to home
              </button>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
