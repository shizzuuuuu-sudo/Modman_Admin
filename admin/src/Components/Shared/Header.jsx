import React from "react";

const Header = () => {
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
                    src="assets/images/users/avatar-1.jpg"
                  />
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <h6 className="dropdown-header">Welcome Gaston!</h6>
                <a className="dropdown-item" href="pages-profile.html">
                  <i className="bx bx-user-circle text-muted fs-18 align-middle me-1"></i>
                  <span className="align-middle">Profile</span>
                </a>
                <a className="dropdown-item" href="apps-chat.html">
                  <i className="bx bx-message-dots text-muted fs-18 align-middle me-1"></i>
                  <span className="align-middle">Messages</span>
                </a>
                <a className="dropdown-item" href="pages-pricing.html">
                  <i className="bx bx-wallet text-muted fs-18 align-middle me-1"></i>
                  <span className="align-middle">Pricing</span>
                </a>
                <a className="dropdown-item" href="pages-faqs.html">
                  <i className="bx bx-help-circle text-muted fs-18 align-middle me-1"></i>
                  <span className="align-middle">Help</span>
                </a>
                <a className="dropdown-item" href="auth-lock-screen.html">
                  <i className="bx bx-lock text-muted fs-18 align-middle me-1"></i>
                  <span className="align-middle">Lock screen</span>
                </a>

                <div className="dropdown-divider my-1"></div>

                <a className="dropdown-item text-danger" href="auth-signin.html">
                  <i className="bx bx-log-out fs-18 align-middle me-1"></i>
                  <span className="align-middle">Logout</span>
                </a>
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
