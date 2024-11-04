import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  useEffect(() => {
    const backButton = window.Telegram.WebApp.BackButton;
    backButton.hide();
  }, []);

  return (
    <div>
      <h1>Home Page sdfasdfsd</h1>
      <p>Welcome! Select an option to proceed:</p>

      <nav>
        <Link to="/">Home</Link> |<Link to="/add-product">Add Product</Link> |<Link to="/add-member">Add Member</Link>
      </nav>
    </div>
  );
};

export default Home;
