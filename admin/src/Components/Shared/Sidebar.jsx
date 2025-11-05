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
            <Link to="/" className="nav-link">
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
            <Link to="/AddProducts" className="nav-link">
              <span className="nav-icon">
                <iconify-icon icon="solar:t-shirt-bold-duotone"></iconify-icon>
              </span>
              <span className="nav-text">Products</span>
            </Link>
          </li>


          <li className="menu-title mt-2">Users</li>

          <li className="nav-item">
            <a className="nav-link menu-arrow" href="#sidebarRoles" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarRoles">
              <span className="nav-icon">
                <iconify-icon icon="solar:user-speak-rounded-bold-duotone"></iconify-icon>
              </span>
              <span className="nav-text"> Roles </span>
            </a>
            <div className="collapse" id="sidebarRoles">
              <ul className="nav sub-navbar-nav">
                <li className="sub-nav-item">
                  <a className="sub-nav-link" href="role-list.html">List</a>
                </li>
                <li className="sub-nav-item">
                  <a className="sub-nav-link" href="role-edit.html">Edit</a>
                </li>
                <li className="sub-nav-item">
                  <a className="sub-nav-link" href="role-add.html">Create</a>
                </li>
              </ul>
            </div>
          </li>

          <li className="nav-item">
            <a href="#sidebarCustomers" className="nav-link menu-arrow" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarCustomers">
              <span className="nav-icon">
                <iconify-icon icon="solar:users-group-two-rounded-bold-duotone"></iconify-icon>
              </span>
              <span className="nav-text"> Customers </span>
            </a>
            <div className="collapse" id="sidebarCustomers">
              <ul className="nav sub-navbar-nav">
                <li className="sub-nav-item">
                  <Link to="/CustomerList" className="sub-nav-link" href="customer-list.html">List</Link>
                </li>
                <li className="sub-nav-item">
                  <a className="sub-nav-link" href="customer-detail.html">Details</a>
                </li>
              </ul>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link menu-arrow" href="#sidebarSellers" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarSellers">
              <span className="nav-icon">
                <iconify-icon icon="solar:shop-bold-duotone"></iconify-icon>
              </span>
              <span className="nav-text"> Sellers </span>
            </a>
            <div className="collapse" id="sidebarSellers">
              <ul className="nav sub-navbar-nav">
                <li className="sub-nav-item">
                  <a className="sub-nav-link" href="seller-list.html">List</a>
                </li>
                <li className="sub-nav-item">
                  <a className="sub-nav-link" href="seller-details.html">Details</a>
                </li>
                <li className="sub-nav-item">
                  <a className="sub-nav-link" href="seller-edit.html">Edit</a>
                </li>
                <li className="sub-nav-item">
                  <a className="sub-nav-link" href="seller-add.html">Create</a>
                </li>
              </ul>
            </div>
          </li>

          <li className="menu-title mt-2">Other</li>

          <li className="nav-item">
            <a className="nav-link menu-arrow" href="#sidebarCoupons" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarCoupons">
              <span className="nav-icon">
                <iconify-icon icon="solar:leaf-bold-duotone"></iconify-icon>
              </span>
              <span className="nav-text"> Coupons </span>
            </a>
            <div className="collapse" id="sidebarCoupons">
              <ul className="nav sub-navbar-nav">
                <li className="sub-nav-item">
                  <a className="sub-nav-link" href="coupons-list.html">List</a>
                </li>
                <li className="sub-nav-item">
                  <a className="sub-nav-link" href="coupons-add.html">Add</a>
                </li>
              </ul>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="pages-review.html">
              <span className="nav-icon">
                <iconify-icon icon="solar:chat-square-like-bold-duotone"></iconify-icon>
              </span>
              <span className="nav-text"> Reviews </span>
            </a>
          </li>

        </ul>
      </div>
    </div>
    </section>
    </>
  );
};

export default Sidebar;