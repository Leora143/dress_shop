// import {
//   createRootRoute,
//   createRoute,
//   createRouter,
// } from "@tanstack/react-router";

// import Home from "./routes/home";
// import Login from "./routes/login";
// import Register from "./routes/register";

// const rootRoute = createRootRoute();

// const homeRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: "/",
//   component: Home,
// });

// const loginRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: "/login",
//   component: Login,
// });

// const registerRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: "/register",
//   component: Register,
// });

// const routeTree = rootRoute.addChildren([
//   homeRoute,
//   loginRoute,
//   registerRoute,
// ]);

// export const router = createRouter({
//   routeTree,
// });