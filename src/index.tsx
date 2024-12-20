import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Global } from "@emotion/react";
import globalStyles from "./theme";

declare global {
  interface Window {
    Telegram: any;
  }
}

function TelegramInitializer() {
  useEffect(() => {
    if (window.Telegram) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  return (
    <>
      <Global styles={globalStyles} />
      <App />
    </>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<TelegramInitializer />);
}
