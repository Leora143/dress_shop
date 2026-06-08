import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { AuthProvider } from "@/context/AuthContext";

import { routeTree } from "./routeTree.gen";
import { StrictMode } from "react";
import {  CartProvider } from "./context/CartContext";

const router = createRouter({
  routeTree,
});


createRoot(document.getElementById("root")).render(
  <StrictMode>
  <AuthProvider>
    <CartProvider>
    <RouterProvider router={router} />
    </CartProvider>
  </AuthProvider>
</StrictMode>
);