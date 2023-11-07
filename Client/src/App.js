import React, { useContext } from "react";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import OrganizationRegister from "./pages/register/OrganizationRegister";
import DAORegistration from "./pages/register/DAORegistration";
import DAOLogin from "./pages/login/DAOLogin";
import OrganizationLogin from "./pages/login/OrganizationLogin";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import Organization from "./pages/Organization/Organization";
import EventsPage from "./pages/Events/EventsPage";
import TicketSalesAndPayments from './pages/Organization/TicketSalesAndPayments'

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
  );

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/organizationRegister",
      element: <OrganizationRegister />
    },
    {
      path: "/orgDashboard",
      element: <Organization />
    },
    {
      path: "/orglogin",
      element: <OrganizationLogin /> 
    },
    {
      path: "/events",
      element: <EventsPage />
    },
    {
      path: "/payments",
      element: <TicketSalesAndPayments />
    },
    {
      path: "/daoReg",
      element: <DAORegistration />
    },
    {
      path: "/daoLogin",
      element: <DAOLogin />
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
