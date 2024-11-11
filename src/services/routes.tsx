import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Layout from "../components/layout/layout";

// Lazy load components
const Home = lazy(() => import("../pages/Home"));
const AddEmployee = lazy(() => import("../pages/employee/AddEmployee"));
const EmployeeList = lazy(() => import("../pages/employee/EmployeeList"));
const AddProduct = lazy(() => import("../pages/product/AddProduct"));
const AddSemiFinishedProduct = lazy(() => import("../pages/product/AddSemiFinishedProduct"));
const AddProvider = lazy(() => import("../pages/provider/AddProvider"));
const AddMaterial = lazy(() => import("../pages/material/AddMaterial"));
const AddCustomer = lazy(() => import("../pages/customer/AddCustomer"));

// Define routes

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/employees",
        children: [
          { index: true, element: <EmployeeList /> },
          { path: "/employees/add", element: <AddEmployee /> },
        ],
      },
      { path: "/add-finished-product", element: <AddProduct /> },
      { path: "/add-semi-finished-product", element: <AddSemiFinishedProduct /> },
      { path: "/add-raw-seller", element: <AddProvider /> },
      { path: "/add-raw", element: <AddMaterial /> },
      { path: "/add-customer", element: <AddCustomer /> },
      { path: "*", element: <h1>Page not found</h1> },
    ],
  },
];

export default routes;
