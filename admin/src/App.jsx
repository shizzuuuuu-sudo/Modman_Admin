import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../src/assets/css/app.min.css";
import Header from "./Components/Shared/Header";
import Sidebar from "./Components/Shared/Sidebar";
import Footer from "./Components/Shared/Footer";
import PageRoutes from "./PageRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // hide header/sidebar/footer on login page
  const isLoginPage = location.pathname === "/";

  return (
    <div className={`wrapper${sidebarOpen ? " vertical-collpsed" : ""}`}>
      {!isLoginPage && <Header toggleSidebar={toggleSidebar} />}
      {!isLoginPage && <Sidebar />}
      <div className="content-area">
        <PageRoutes />
      </div>
      {!isLoginPage && <Footer />}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default App;
