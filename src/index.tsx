import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

declare global {
  interface Window {
    Telegram: any;
  }
}

function TelegramInitializer() {
  useEffect(() => {
    if (window.Telegram) {
      window.Telegram.WebApp.init();
    }
  }, []);

  return <App />;
}

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<TelegramInitializer />);
}
