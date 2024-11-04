import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import AddMember from "./pages/AddMember";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";

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
