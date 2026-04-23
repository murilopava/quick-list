import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import Products from "./pages/Products.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
