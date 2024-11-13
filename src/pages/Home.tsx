import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/button";

const pages = [
  { path: "/", name: "🏠 Bosh sahifa", component: () => <h2>Bosh sahifa</h2> },
  { path: "/employees/add", name: "👤 Xodim +", component: () => <h2>Xodim sahifasi</h2> },
  { path: "/employees", name: "👤 Xodimlar", component: () => <h2>Xodim sahifasi</h2> },
  { path: "/providers", name: "👤 Providers", component: () => <h2>Providers</h2> },
  { path: "/add-finished-product", name: "📦 Tayyor mahsulot", component: () => <h2>Tayyor mahsulot sahifasi</h2> },
  { path: "/add-semi-finished-product", name: "⚙️ Yarim tayyor mahsulot", component: () => <h2>Yarim tayyor mahsulot sahifasi</h2> },
  { path: "/add-raw-seller", name: "🏢 Xomashyo sotuvchisi", component: () => <h2>Xomashyo sotuvchisi sahifasi</h2> },
  { path: "/add-raw", name: "🌾 Xomashyo", component: () => <h2>Xomashyo sahifasi</h2> },
  { path: "/add-customer", name: "👥 Mijoz", component: () => <h2>Mijoz sahifasi</h2> },
];

const Home: React.FC = () => {
  return (
    <div className="main-container">
      <h1>Home Page</h1>
      <p>Welcome! Select an option to proceed:</p>

      <div className="pages">
        {pages.map(({ path, name }) => (
          <Link key={path} to={path}>
            <Button fullWidth>{name}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
