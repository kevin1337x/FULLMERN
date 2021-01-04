import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { checkToken } from "../auth/helper";
import { signout } from "../auth/helper/index";

import "../styles.css";

function Menu(history) {
  const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return { backgroundColor: "#20c8f7 ", color: "#000" };
    }
    return { color: "#d1d1d1" };
  };

  return (
    <div>
      <ul className="nav bg-dark nav-tabs justify-content-center border-0 mt-3 mx-3 ">
        <li className="nav-item">
          <Link
            style={currentTab(history, "/")}
            className="nav-link border-0"
            to="/"
          >
            <span className="hover">Home</span>
          </Link>
        </li>

        {checkToken() && (
          <>
            {!checkToken().user.role && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/user/dashboard")}
                  className="nav-link border-0"
                  to="/user/dashboard"
                >
                  <span className="hover">Dashboard</span>
                </Link>
              </li>
            )}

            {checkToken().user.role && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/admin/dashboard")}
                  className="nav-link border-0"
                  to="/admin/dashboard"
                >
                  <span className="hover">Dashboard</span>
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link border-0" to="#">
                <span
                  className="hover text-warning"
                  onClick={() => (signout(), history.history.push("/"))}
                >
                  Sign out
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                style={currentTab(history, "/cart")}
                className="nav-link border-0"
                to="/cart"
              >
                <span className="hover">Cart</span>
              </Link>
            </li>
          </>
        )}

        {!checkToken() && (
          <>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signin")}
                className="nav-link border-0"
                to="/signin"
              >
                <span className="hover">Sign in</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signup")}
                className="nav-link border-0"
                to="/signup"
              >
                <span className="hover">Sign up</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default withRouter(Menu);
