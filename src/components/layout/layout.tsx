import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useWebApp from "../../hooks/use-webapp";

const Layout = () => {
  const { pathname } = useLocation();
  const webapp = useWebApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== "/") {
      webapp.BackButton.show();
      webapp.BackButton.onClick(() => navigate("/"));
    } else {
      webapp.BackButton.hide();
      webapp.MainButton.hide();
    }
  }, [pathname, webapp, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};
export default Layout;
