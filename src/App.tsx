import {
  BrowserRouter as Router,
  useRoutes,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./common/components/Navbar";
import { Login } from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import CreateCompany from "./pages/companyProfile/CreateCompany";
import Companyprofile from "./pages/companyProfile/Companyprofile";
import Dashboard from "./Admin/Pages/Dashboard/Dashboard";
import AdminLogin from "./Admin/Pages/AdminLogin";
import { jwtdecoder } from "./Jwtdecode";
import { useEffect, useState } from "react";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  const routing = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "Login",
      element: <Login />,
    },
    {
      path: "/createcompany",
      element: <CreateCompany />,
    },
    {
      path: "/companyprofile",
      element: <Companyprofile />,
    },
    {
      path: "/admin/login",
      element: <AdminLogin />,
    },
    {
      path: "/admin/dashboard",
      element: <ProtectedDashboard />,
    },
  ]);

  const isAdminRoute = location.pathname.startsWith("/admin");
  const [isUserAdmin, setUserAdmin] = useState(false);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken != null) {
      const decodedToken = jwtdecoder(storedToken);
      if (decodedToken != null) {
        setUserAdmin(decodedToken.isAdmin.toLowerCase?.() === "true");
        console.log(decodedToken.isAdmin);
      }
    }
  });

  function ProtectedDashboard() {
    if (isUserAdmin) {
      console.log(isUserAdmin);
      return <Dashboard />;
    } else {
      return <AdminLogin />;
    }
  }

  return (
    <div>
      {!isAdminRoute && <Navbar />}
      {routing}
    </div>
  );
}

export default App;
