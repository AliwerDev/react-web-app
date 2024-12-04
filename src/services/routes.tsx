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

const SaleHistories = lazy(() => import("../pages/sale-history/SaleHistories"));

// Processes
const BuyingRaw = lazy(() => import("../pages/processes/buyer/BuyingRaw"));
const GetRawForCutting = lazy(() => import("../pages/processes/cutter/GetRawForCutting"));
const AddCutRaw = lazy(() => import("../pages/processes/cutter/AddCutRaw"));
const SendSemiToTailor = lazy(() => import("../pages/processes/cutter/SendSemiToTailor"));
const SendFinishedProduct = lazy(() => import("../pages/processes/tailor/SendFinishedProduct"));
const SendToWarehouse = lazy(() => import("../pages/processes/packager/SendToWarehouse"));
const RequestToProduct = lazy(() => import("../pages/processes/seller/RequestToProduct"));
const SellingProduct = lazy(() => import("../pages/processes/seller/SellingProduct"));
const CashSubmission = lazy(() => import("../pages/processes/seller/CashSubmission"));
const ReturnProduct = lazy(() => import("../pages/processes/seller/ReturnProduct"));

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

      { path: "/sale-history", element: <SaleHistories /> },

      { path: "/buy-raw", element: <BuyingRaw /> },
      { path: "/get-raw", element: <GetRawForCutting /> },
      { path: "/add-raw", element: <AddCutRaw /> },
      { path: "/send-semi", element: <SendSemiToTailor /> },
      { path: "/send-finished", element: <SendFinishedProduct /> },
      { path: "/send-warehouse", element: <SendToWarehouse /> },
      { path: "/request-to-product", element: <RequestToProduct /> },
      { path: "/selling-product", element: <SellingProduct /> },
      { path: "/cash-submission", element: <CashSubmission /> },
      { path: "/return-product", element: <ReturnProduct /> },

      // OTHER
      { path: "*", element: <h2 style={{ textAlign: "center" }}>404 Page not found</h2> },
    ],
  },
];

export default routes;
