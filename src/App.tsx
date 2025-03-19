import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PrivateRoutes from "./components/PrivateRoutes";
import AuthPage from "./pages/AuthPage";
import About from "./pages/About";
import TaskManager from "./pages/TaskManager";

const App: React.FC = () => {
  return (
      <>
        <Navbar />
        <Container>
          <Routes>
              <Route path="/" element={<PrivateRoutes />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/task-manager" element={<TaskManager />} />
              </Route>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </>
  );
};

export default App;

