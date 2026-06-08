import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "../components/Navbar";

export function RootLayout() {
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});
