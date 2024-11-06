import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AddMember from "./pages/AddMember";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import "./App.scss";
import AddEmployee from "./pages/AddEmployee";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
