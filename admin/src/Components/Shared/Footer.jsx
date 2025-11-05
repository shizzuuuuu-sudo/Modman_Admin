import React from "react";

const Footer = () => {
  return (
    <section>
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center">
            {new Date().getFullYear()} &copy; Larkon. Crafted by{" "}
            <iconify-icon
              icon="iconamoon:heart-duotone"
              class="fs-18 align-middle text-danger"
            ></iconify-icon>{" "}
            <a
              href="https://1.envato.market/techzaa"
              className="fw-bold footer-text"
              target="_blank"
              rel="noopener noreferrer"
            >
              Techzaa
            </a>
          </div>
        </div>
      </div>
    </footer>
    </section>
  );
};

export default Footer;
