import React from "react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Products from "./pages/Products.jsx";

function App() {
  const router = createBrowserRouter([
    { path: "/home", element: <Home /> },
    { path: "/products", element: <Products /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
