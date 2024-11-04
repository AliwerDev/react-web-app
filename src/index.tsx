import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WebAppProvider } from "@vkruglikov/react-telegram-web-app";

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
    <WebAppProvider
      options={{
        smoothButtonsTransition: true,
      }}
    >
      <App />
    </WebAppProvider>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<TelegramInitializer />);
}
