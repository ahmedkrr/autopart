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
import { isUserAdmin } from "./common/utils/helpers";
import ItemsFilter from "./pages/Home/ItemsFilter";
import ItemsFilterByCar from "./pages/Home/ItemsFilterByCar";
import { NotAuthorized, NotFound } from "./NotAuthorized";
import FilterCategoryCar from "./pages/Home/FilterCategoryCar";
import CompanyProfileLookUps from "./pages/Home/CompanyProfileLookUps";
import Register from "./pages/Login/Register";
import ResetPassword from "./pages/Login/ResetPassword";
import NewPassword from "./pages/Login/NewPAssword";

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
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/resetpassword",
      element: <ResetPassword />,
    },
    {
      path: "/reset-password/:guid",
      element: <NewPassword />,
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
      path: "/itemsFilter",
      element: <ItemsFilter />,
    },
    {
      path: "/CategorySelect/ItemsFilterByCar",
      element: <ItemsFilterByCar />,
    },
    {
      path: "/CategorySelect",
      element: <FilterCategoryCar />,
    },
    {
      path: "/ViewCompany",
      element: <CompanyProfileLookUps />,
    },
    {
      path: "/admin/login",
      element: <AdminLogin />,
    },
    {
      path: "/admin/dashboard",
      element: <ProtectedDashboard />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAdmin = isUserAdmin();

  function ProtectedDashboard() {
    return <>{isAdmin ? <Dashboard /> : <NotAuthorized />}</>;
  }

  return (
    <div>
      {!isAdminRoute && <Navbar />}
      {routing}
    </div>
  );
}

export default App;
