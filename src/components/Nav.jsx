import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Nav({ searchQuery, setSearchQuery }) {
  const [isFocused, setIsFocused] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="navbar navbar-expand-lg py-4 px-4" style={{ backgroundColor: "#4e84f7ff" }}>
      <div className="container-fluid px-4">

        <Link
          className="navbar-brand fw-bold text-light"
          to="/"
          style={{
            fontFamily: "Trebuchet MS, sans-serif",
            fontSize: "28px",
            letterSpacing: "1px",
          }}
        >
          InternHouse
        </Link>


        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ border: "1px solid white" }}
        >
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
        </button>


        <div className="collapse navbar-collapse mt-3 mt-lg-0" id="navbarNav">
          <div className="d-flex flex-column flex-lg-row align-items-center w-100 gap-3">
         


            <ul className="navbar-nav d-flex flex-row align-items-center gap-3 ms-lg-3">
              <li className="nav-item">
                <Link className="nav-link text-light fs-6 fw-semibold" to="/">
                  Job Postings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light fs-6 fw-semibold" to="/post-job">
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
