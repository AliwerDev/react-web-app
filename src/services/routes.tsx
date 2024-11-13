import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Layout from "../layout/layout";

// Lazy load components
const Home = lazy(() => import("../pages/Home"));
const Employees = lazy(() => import("../pages/employee/Employees"));
const AddEmployee = lazy(() => import("../pages/employee/AddEmployee"));

const Providers = lazy(() => import("../pages/provider/Providers"));
const AddProvider = lazy(() => import("../pages/provider/AddProvider"));

const Clients = lazy(() => import("../pages/client/Clients"));
const AddClient = lazy(() => import("../pages/client/AddClient"));

const Materials = lazy(() => import("../pages/material/Materials"));
const AddMaterial = lazy(() => import("../pages/material/AddMaterial"));

const Products = lazy(() => import("../pages/product/Products"));
const AddProduct = lazy(() => import("../pages/product/AddProduct"));

const SemiFinishedProducts = lazy(() => import("../pages/semi-finished-product/SemiFinishedProducts"));
const AddSemiFinishedProduct = lazy(() => import("../pages/semi-finished-product/AddSemiFinishedProduct"));

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
          { index: true, element: <Employees /> },
          { path: "/employees/add", element: <AddEmployee /> },
          { path: "/employees/edit/:id", element: <AddEmployee /> },
        ],
      },
      {
        path: "/providers",
        children: [
          { index: true, element: <Providers /> },
          { path: "/providers/add", element: <AddProvider /> },
          { path: "/providers/edit/:id", element: <AddProvider /> },
        ],
      },
      {
        path: "/clients",
        children: [
          { index: true, element: <Clients /> },
          { path: "/clients/add", element: <AddClient /> },
          { path: "/clients/edit/:id", element: <AddClient /> },
        ],
      },
      {
        path: "/materials",
        children: [
          { index: true, element: <Materials /> },
          { path: "/materials/add", element: <AddMaterial /> },
          { path: "/materials/edit/:id", element: <AddMaterial /> },
        ],
      },
      {
        path: "/products",
        children: [
          { index: true, element: <Products /> },
          { path: "/products/add", element: <AddProduct /> },
          { path: "/products/edit/:id", element: <AddProduct /> },
        ],
      },
      {
        path: "/semi-finished-products",
        children: [
          { index: true, element: <SemiFinishedProducts /> },
          { path: "/semi-finished-products/add", element: <AddSemiFinishedProduct /> },
          { path: "/semi-finished-products/edit/:id", element: <AddSemiFinishedProduct /> },
        ],
      },
      { path: "*", element: <h1>Page not found</h1> },
    ],
  },
];

export default routes;
