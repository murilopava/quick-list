import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import Items from "./pages/Items.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/items" element={<Items />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
