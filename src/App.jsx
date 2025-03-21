import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import { LanguageContext } from "./Helper/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Sahifalar
import Home from "./pages/Dashboart/dashHome";
import Dashboard from "./pages/Dashboart";
import Language from "./pages/Dashboart/Language";
import Comfort from "./pages/Dashboart/Comfort";
import Place from "./pages/Dashboart/Place";
import Translate from "./pages/Dashboart/Translate";
import Region from "./pages/Dashboart/Region";
import Login from "./pages/Login";
import Cottage from "./pages/Dashboart/Cottage";
import Notification from "./pages/Dashboart/Notification";
import CottageType from "./pages/Dashboart/CottageType";
import Roles from "./pages/Dashboart/Roles";
import Users from "./pages/Dashboart/Users";
import Services from "./pages/Dashboart/Services";
import Tariff from "./pages/Dashboart/Tariff";
import UserProfile from "./pages/Dashboart/UserProfile";
import PageNotFound from "./pages/PageNotFound";
import Order from "./pages/Dashboart/Order";
import ProgressCottages from "./pages/Dashboart/ProgressCattages";

// React Query client
const queryClient = new QueryClient();

// Tilni boshqarish
const getInitialLanguage = () => {
  return localStorage.getItem("language") || "uz";
};

function App() {
  const [languageChange, setLanguageChange] = useState(getInitialLanguage());

  const toggleLanguage = (value) => {
    localStorage.setItem("language", value);
    setLanguageChange(value);
    queryClient.invalidateQueries();
  };

  // Foydalanuvchi login qilganmi?
  const accessToken = localStorage.getItem("accessToken");

  // Marshrutlar (routes)
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: accessToken ? <Navigate to="/dashboart" replace /> : <Login />,
      },
      {
        path: "/dashboart",
        element: accessToken ? <Dashboard /> : <Navigate to="/" replace />,
        children: [
          { index: true, element: <Home /> },
          { path: "home", element: <Home /> },
          { path: "language", element: <Language /> },
          { path: "comfort", element: <Comfort /> },
          { path: "place", element: <Place /> },
          { path: "translate", element: <Translate /> },
          { path: "region", element: <Region /> },
          { path: "cottage", element: <Cottage /> },
          { path: "notification", element: <Notification /> },
          { path: "cottage-type", element: <CottageType /> },
          { path: "roles", element: <Roles /> },
          { path: "user", element: <Users /> },
          { path: "services", element: <Services /> },
          { path: "tariff", element: <Tariff /> },
          { path: "order", element: <Order /> },
          { path: "profile", element: <UserProfile /> },
          { path: "progress-cottages", element: <ProgressCottages /> },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
    {
      future: { v7_startTransition: true },
    }
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageContext.Provider value={{ languageChange, toggleLanguage }}>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={1500} />
      </LanguageContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
