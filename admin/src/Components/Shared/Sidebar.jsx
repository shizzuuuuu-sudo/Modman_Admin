import React from 'react';
import { Dropdown } from 'react-bootstrap';
import '../../assets/css/app.min.css';
import  {Link} from 'react-router-dom';
const Sidebar = () => {
  return (
    <>
    <section>
    <div className="main-nav">
      {/* Sidebar Logo */}
      <div className="logo-box">
        <Link to="/Dashboard" className="logo-dark my-2">
          <h1>ModMan</h1>
        </Link>
      </div>

      {/* Menu Toggle Button (sm-hover) */}
      <button type="button" className="button-sm-hover" aria-label="Show Full Sidebar">
        <iconify-icon icon="solar:double-alt-arrow-right-bold-duotone" className="button-sm-hover-icon"></iconify-icon>
      </button>

      <div className="scrollbar" data-simplebar>
        <ul className="navbar-nav" id="navbar-nav">

          <li className="menu-title">General</li>

          <li className="nav-item">
            <Link to="/Dashboard" className="nav-link">
              <span className="nav-icon">
                <iconify-icon icon="solar:widget-5-bold-duotone"></iconify-icon>
              </span>
              <span className="nav-text"> Dashboard </span>
            </Link>
          </li>


          <li className="nav-item">
            <Link to="/CategoryList" className="nav-link">
              <span className="nav-icon">
                <iconify-icon icon="solar:clipboard-list-bold-duotone"></iconify-icon>
              </span>
              <span className="nav-text">Category</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/ProductList" className="nav-link">
              <span className="nav-icon">
                <iconify-icon icon="solar:t-shirt-bold-duotone"></iconify-icon>
              </span>
              <span className="nav-text">Products</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/AdminList" className="nav-link">
              <span className="nav-icon">
                <iconify-icon icon="solar:user-bold-duotone"></iconify-icon>
              </span>
              <span className="nav-text">Admins</span>
            </Link>
          </li>


          <li className="menu-title mt-2">Users</li>


          <li className="nav-item">
            <Link to="/CustomerList" className="nav-link" aria-expanded="false">
              <span className="nav-icon">
                <iconify-icon icon="solar:users-group-two-rounded-bold-duotone"></iconify-icon>
              </span>
              <span className="nav-text"> Customers </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Orders" className="nav-link" aria-expanded="false">
              <span className="nav-icon">
                <iconify-icon icon="solar:users-group-two-rounded-bold-duotone"></iconify-icon>
              </span>
              <span className="nav-text"> Orders </span>
            </Link>
          </li>

        </ul>
      </div>
    </div>
    </section>
    </>
  );
};

export default Sidebar;