import React from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const hanleSignOut = () => {
    logout()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <nav className="header">
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      <div>
        <Link to="/">Shop</Link>
        <Link  to="/orders">Orders</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        {user && (
          <small className="text-white">
            <span className="text-white ms-7 font-semibold">{user.email}</span>
            <button onClick={hanleSignOut} className="ms-2 btn btn-primary">
              Sign Out
            </button>
          </small>
        )}
      </div>
    </nav>
  );
};

export default Header;
