import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LanguageContext } from "./Helper/LanguageContext";
import { useQueryClient } from "@tanstack/react-query";

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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  if (!localStorage.getItem("language")) localStorage.setItem("language", "uz");

  const [languageChange, setLanguageChange] = useState(
    localStorage.getItem("language")
  );

  const toggleLanguage = (value) => {
    localStorage.setItem("language", value);
    setLanguageChange(value);
    queryClient.invalidateQueries();
  };

  // Protected Route
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) {
      navigate("/",{ replace: true });
    }
  }, [accessToken, navigate]);

  return (
    <div className="App">
      <LanguageContext.Provider value={{ languageChange, toggleLanguage }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboart" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="language" element={<Language />} />
            <Route path="comfort" element={<Comfort />} />
            <Route path="place" element={<Place />} />
            <Route path="translate" element={<Translate />} />
            <Route path="region" element={<Region />} />
            <Route path="cottage" element={<Cottage />} />
            <Route path="notification" element={<Notification />} />
            <Route path="cottage-type" element={<CottageType />} />
            <Route path="roles" element={<Roles />} />
            <Route path="user" element={<Users />} />
            <Route path="services" element={<Services />} />
            <Route path="tariff" element={<Tariff />} />
            <Route path="order" element={<Order />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={1500} />
      </LanguageContext.Provider>
    </div>
  );
}

export default App;
