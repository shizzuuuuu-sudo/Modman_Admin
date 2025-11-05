import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // import SweetAlert2
import avtar1 from "../../assets/images/users/avatar-1.jpg"
import { useNavigate } from "react-router-dom"; // for redirect

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Logout function with confirmation alert
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        Swal.fire({
          icon: "success",
          title: "Logged out successfully",
          showConfirmButton: false,
          timer: 1200,
        });
        navigate("/auth-signin"); // redirect to login page
      }
    });
  };

  return (
    <section>
      <header className="topbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <div className="d-flex align-items-center">
              {/* Menu Toggle Button */}
              <div className="topbar-item">
                <button type="button" className="button-toggle-menu me-2">
                  <iconify-icon
                    icon="solar:hamburger-menu-broken"
                    className="fs-24 align-middle"
                  ></iconify-icon>
                </button>
              </div>

              {/* Welcome Text */}
              <div className="topbar-item">
                <h4 className="fw-bold topbar-button pe-none text-uppercase mb-0">
                  Welcome!
                </h4>
              </div>
            </div>

            <div className="d-flex align-items-center gap-1">
              {/* User */}
              <div className="dropdown topbar-item">
                <a
                  type="button"
                  className="topbar-button"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="d-flex align-items-center">
                    <img
                      className="rounded-circle"
                      width="32"
                      height="32"
                      src={avtar1}
                      alt="User avatar"
                    />
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  {user ? (
                    <h6 className="dropdown-header">Welcome {user.username}</h6>
                  ) : (
                    <h6 className="dropdown-header">Welcome Guest</h6>
                  )}

                  <div className="dropdown-divider my-1"></div>

                  {/* Logout */}
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    <i className="bx bx-log-out fs-18 align-middle me-1"></i>
                    <span className="align-middle">Logout</span>
                  </button>
                </div>
              </div>

              {/* App Search */}
              <form className="app-search d-none d-md-block ms-2">
                <div className="position-relative">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search..."
                    autoComplete="off"
                    defaultValue=""
                  />
                  <iconify-icon
                    icon="solar:magnifer-linear"
                    className="search-widget-icon"
                  ></iconify-icon>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
    </section>
  );
};

export default Header;
