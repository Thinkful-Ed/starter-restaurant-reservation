import React from "react";
import { Link } from "react-router-dom";

const menuItems = [
  { to: "/dashboard", text: "Dashboard", icon: "bi-house-door-fill" },
  {
    to: "/reservations/new",
    text: "New Reservation",
    icon: "bi-plus-circle-fill",
  },
  { to: "/tables/new", text: "New Table", icon: "bi-plus-square" },
  { to: "/search", text: "Search", icon: "bi-search" },
];

const Menu = () => {
  return (
    <>
      {/* Sidebar for Desktop */}
      <nav
        className="d-none d-md-block position-static rounded-end-4 shadow-lg min-vh-100"
        style={{
          width: "250px",
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <div className="p-3 d-flex flex-column align-items-start">
          <Link className="navbar-brand mx-auto py-4 fs-1" to="/">
            TableFlow
          </Link>
          <ul className="nav flex-column m-2">
            {menuItems.map((item, index) => (
              <li key={index} className="nav-item d-flex py-2">
                <Link
                  className="nav-link d-flex align-items-center"
                  to={item.to}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className={`bi ${item.icon} me-4`}
                    viewBox="0 0 16 16"
                  >
                    {item.icon === "bi-house-door-fill" && (
                      <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                    )}
                    {item.icon === "bi-plus-circle-fill" && (
                      <>
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                      </>
                    )}
                    {item.icon === "bi-plus-square" && (
                      <>
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                      </>
                    )}
                    {item.icon === "bi-search" && (
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    )}
                  </svg>
                  <div className="pl-2">{item.text}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Top Nav for Mobile */}
      <nav className="navbar navbar-expand-md navbar-dark d-md-none p-3">
        <Link className="navbar-brand" to="/">
          TableFlow
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav p-2">
            {menuItems.map((item, index) => (
              <li key={index} className="nav-item mb-2">
                <Link
                  className="nav-link text-white d-flex align-items-center"
                  to={item.to}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className={`bi ${item.icon} me-4`}
                    viewBox="0 0 16 16"
                  >
                    {item.icon === "bi-house-door-fill" && (
                      <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                    )}
                    {item.icon === "bi-plus-circle-fill" && (
                      <>
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                      </>
                    )}
                    {item.icon === "bi-plus-square" && (
                      <>
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                      </>
                    )}
                    {item.icon === "bi-search" && (
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    )}
                  </svg>
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Menu;
