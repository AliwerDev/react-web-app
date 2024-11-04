import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import AddMember from "./pages/AddMember";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> |<Link to="/add-product">Add Product</Link> |<Link to="/add-member">Add Member</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/add-member" element={<AddMember />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
