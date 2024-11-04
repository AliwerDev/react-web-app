import React, { useEffect, useState } from "react";

const AddProduct: React.FC = () => {
  const [productName, setProductName] = useState<string>("");

  useEffect(() => {
    const backButton = window.Telegram.WebApp.BackButton;
    backButton.show(); // Show back button for navigation
    return () => backButton.hide(); // Clean up when navigating away
  }, []);

  const handleAddProduct = () => {
    // Send product data back to Telegram bot
    window.Telegram.WebApp.sendData(JSON.stringify({ productName }));
  };

  return (
    <div className="main-container">
      <h1>Add Product</h1>
      <input type="text" placeholder="Enter product name" value={productName} onChange={(e) => setProductName(e.target.value)} />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default AddProduct;
