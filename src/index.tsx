import React, { useEffect } from "react";
import ReactDOM from "react-dom";
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

ReactDOM.render(<TelegramInitializer />, document.getElementById("root"));
