import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AddMember from "./pages/AddMember";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import "./App.scss";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-member" element={<AddMember />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
