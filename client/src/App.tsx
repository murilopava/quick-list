import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import Items from "./pages/Items.js";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Routes>
        <Route path="/" element={<Navigate to="/lists" replace />}></Route>
        <Route path="/lists" element={<Home />}></Route>
        <Route path="/lists/:shareId" element={<Items />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
