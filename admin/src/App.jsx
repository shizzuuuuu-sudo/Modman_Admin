import React,{useState} from 'react';
import "../src/assets/css/app.min.css";
import Header from './Components/Shared/Header';
import Sidebar from './Components/Shared/Sidebar';
import Footer from './Components/Shared/Footer';
import PageRoutes from './PageRoutes';
import { ToastContainer } from 'react-bootstrap';
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`wrapper${sidebarOpen ? 'vertical-collpsed' : ''}`}>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar />
      <PageRoutes/>
      <Footer />
      <ToastContainer position="top-end" className="p-3"/>
    </div>
  );
}

export default App;
