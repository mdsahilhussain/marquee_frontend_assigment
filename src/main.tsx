import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./Context/userContext.tsx";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserProvider>
    <Router>
      <App />
    </Router>
  </UserProvider>
);
