import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/button";

const pages = [
  { path: "/employees", name: "👤 Xodimlar", component: () => <h2>Xodimlar sahifasi</h2> },
  { path: "/providers", name: "👤 Providers", component: () => <h2>Providers sahifasi</h2> },
  { path: "/clients", name: "👥 Mijozlar", component: () => <h2>Mijozlar sahifasi</h2> },
  { path: "/materials", name: "🌾 Xomashyo", component: () => <h2>Xomashyo sahifasi</h2> },
  { path: "/semi-finished-products", name: "⚙️ Yarim tayyor mahsulotlar", component: () => <h2>Yarim tayyor mahsulotlar sahifasi</h2> },
  { path: "/products", name: "📦 Tayyor mahsulotlar", component: () => <h2>Tayyor mahsulotlar sahifasi</h2> },

  // Adding Cutter routes
  { path: "/buy-raw", name: "🔧 Xomashyo sotib olish", component: () => "" },
  { path: "/get-raw", name: "🔧 Xomashyo olish", component: () => "" },
  { path: "/add-raw", name: "➕ Xomashyo qo'shish", component: () => "" },
  { path: "/send-semi", name: "📤 Yarim tayyor mahsulot yuborish", component: () => "" },
  { path: "/send-finished", name: "📤 Tayyor mahsulot yuborish", component: () => "" },
  { path: "/send-warehouse", name: "📦 Omborga jo'natish", component: () => "" },
  { path: "/request-to-product", name: "📋 Mahsulotga talab yuborish", component: () => "" },
  { path: "/selling-product", name: "💰 Mahsulot sotish", component: () => "" },
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
