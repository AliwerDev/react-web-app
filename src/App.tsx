import React, { Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./services/routes";
import useWebApp from "./hooks/use-webapp";
import { api } from "./services/api";

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  const webapp = useWebApp();

  useEffect(() => {
    if (!webapp) throw new Error("Web app is not available");

    webapp.expand();
    webapp.disableVerticalSwipes();
    webapp.enableClosingConfirmation();

    api.defaults.headers.common["DataCheckString"] = webapp.initData;
    api.defaults.headers.common["Hash"] = webapp.initDataUnsafe?.hash;
  }, [webapp]);

  return (
    <Suspense
      fallback={
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
