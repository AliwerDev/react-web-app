import React from "react";
import { Link } from "react-router-dom";

const pages = [
  { path: "/", name: "Home", component: () => <h2>Home Page</h2> },
  { path: "/add-employee", name: "Employee", component: () => <h2>Employee Page</h2> },
  { path: "/add-finished-product", name: "Finished Product", component: () => <h2>Finished Product Page</h2> },
  { path: "/add-semi-finished-product", name: "Semi-Finished Product", component: () => <h2>Semi-Finished Product Page</h2> },
  { path: "/add-raw-seller", name: "Raw Seller", component: () => <h2>Raw Seller Page</h2> },
  { path: "/add-raw", name: "Raw", component: () => <h2>Raw Page</h2> },
  { path: "/add-customer", name: "Customer", component: () => <h2>Customer Page</h2> },
];

const Home: React.FC = () => {
  return (
    <div className="main-container">
      <h1>Home Page</h1>
      <p>Welcome! Select an option to proceed:</p>

      {pages.map(({ path, name }) => (
        <Link key={path} to={path}>
          <button>{name}</button>
        </Link>
      ))}
    </div>
  );
};

export default Home;
