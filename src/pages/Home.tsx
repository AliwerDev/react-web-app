import React, { useEffect } from "react";

const Home: React.FC = () => {
  useEffect(() => {
    const backButton = window.Telegram.WebApp.BackButton;
    backButton.hide(); // Hide back button on the home page
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome! Select an option to proceed:</p>
    </div>
  );
};

export default Home;
