import React from "react";
import { Link, useLocation } from "react-router-dom";
import darkmode from "./pics/darkmode.png";
import lightmode from "./pics/lightmode.png";
import campng from './pics/campng.png'
import "./Header.css";

export default function Header(props) {
  const location = useLocation();

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg navbar-${
          props.mode === "dark" ? "light" : "dark"
        } bg-transparent
        }`}
      >
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
        >
          <img className="mx-2" src={campng} alt="AI" style={{width:'60px',color:"white"}}/>
          Image Explorer
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
              <li
                className={`nav-item ${location.pathname==='/'?'active':''}`}
              >
                <Link
                  className="nav-link"
                  to="/"
                >
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li
                className={`nav-item ${location.pathname==='/staredimages'?'active':''}`}
              >
                <Link
                  className="nav-link"
                  to="/staredimages"
                >
                  Savedimages <span className="sr-only">(current)</span>
                </Link>
              </li>
          </ul>
        </div>
      </nav>
      <div className="mode">
        <img
          onClick={props.darkmode}
          src={props.mode === "light" ? lightmode : darkmode}
          alt=""
        />
      </div>
    </div>
  );
}
