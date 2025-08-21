import HomePage from "./components/ui/Homepage";
import Layout from "./components/ui/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/ui/RegisterPage";
import LoginPage from "./components/ui/LoginPage";

import TaskPage from "./components/ui/TaskPage";
import CreatePage from "./components/ui/CreatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/task" element={<TaskPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
