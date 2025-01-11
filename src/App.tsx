import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import CharacterPage from "./pages/CharacterPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/character/:id" element={<CharacterPage />} />
    </Routes>
  );
};

export default App;
