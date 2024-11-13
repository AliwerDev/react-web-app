import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/button";

const pages = [
  { path: "/employees", name: "👤 Xodimlar", component: () => <h2>Xodimlar sahifasi</h2> },
  { path: "/employees/add", name: "👤 Xodim +", component: () => <h2>Xodim qo'shish sahifasi</h2> },
  { path: "/providers", name: "👤 Providers", component: () => <h2>Providers sahifasi</h2> },
  { path: "/providers/add", name: "👤 Provider qo'shish", component: () => <h2>Provider qo'shish sahifasi</h2> },
  { path: "/clients", name: "👥 Mijozlar", component: () => <h2>Mijozlar sahifasi</h2> },
  { path: "/clients/add", name: "👥 Mijoz qo'shish", component: () => <h2>Mijoz qo'shish sahifasi</h2> },
  { path: "/materials", name: "🌾 Xomashyo", component: () => <h2>Xomashyo sahifasi</h2> },
  { path: "/materials/add", name: "🌾 Xomashyo qo'shish", component: () => <h2>Xomashyo qo'shish sahifasi</h2> },
  { path: "/products", name: "📦 Tayyor mahsulotlar", component: () => <h2>Tayyor mahsulotlar sahifasi</h2> },
  { path: "/products/add", name: "📦 Tayyor mahsulot qo'shish", component: () => <h2>Tayyor mahsulot qo'shish sahifasi</h2> },
  { path: "/semi-finished-products", name: "⚙️ Yarim tayyor mahsulotlar", component: () => <h2>Yarim tayyor mahsulotlar sahifasi</h2> },
  { path: "/semi-finished-products/add", name: "⚙️ Yarim tayyor mahsulot qo'shish", component: () => <h2>Yarim tayyor mahsulot qo'shish sahifasi</h2> },
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
