import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Lazy load components
const Home = lazy(() => import("../pages/Home"));
const AddEmployee = lazy(() => import("../pages/AddEmployee"));
const AddFinishedProduct = lazy(() => import("../pages/AddFinishedProduct"));
const AddSemiFinishedProduct = lazy(() => import("../pages/AddSemiFinishedProduct"));
const AddRawSeller = lazy(() => import("../pages/AddRawSeller"));
const AddRaw = lazy(() => import("../pages/AddRaw"));
const AddCustomer = lazy(() => import("../pages/AddCustomer"));

// Define routes

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/add-employee", element: <AddEmployee /> },
  { path: "/add-finished-product", element: <AddFinishedProduct /> },
  { path: "/add-semi-finished-product", element: <AddSemiFinishedProduct /> },
  { path: "/add-raw-seller", element: <AddRawSeller /> },
  { path: "/add-raw", element: <AddRaw /> },
  { path: "/add-customer", element: <AddCustomer /> },
  { path: "*", element: <h1>Page not found</h1> },
];

export default routes;
