import React, { useState } from "react";
// import { useDispatch, useSelector } from 'react-redux'
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../actions/userActions";
import wheel6 from "../../assets/wheel6.png";
import "./header.css";

function Header() {
  const history = useHistory();

  // const [userInfo, setUserInfo] = useState({ name: "Kunal" });
  // const [logout, setLogout] = useState(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandle = () => {
    localStorage.clear();
    dispatch(logout());
    history.push("/");
  };
  // const logoutHandler = () => {
  //   setLogout(!logout);
  //   setIsLogin(false);
  // };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-grad ">
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center"
          to="#"
        >
          <img src={wheel6} alt="" className="nav-logo" />
          <h4 className="fw-bold pt-2 ml-1 ">Vehica</h4>
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link class="nav-link" to="/">
                Home <span class="sr-only">(current)</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/home">
                Dashboard
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/about">
                About us
              </Link>
            </li>
          </ul>

          {userInfo ? (
            <>
              <span className="mr-3 user-name">
                <i className="fa fa-user fa-lg mr-2" aria-hidden="true"></i>
                Hello, <strong>{userInfo}</strong>
              </span>
              <button
                class="btn btn-outline-danger my-2 my-sm-0"
                onClick={logoutHandle}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button class="btn btn-outline-light m-1  my-sm-0">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button class="btn btn-outline-light m-1 my-sm-0">
                  Register
                </button>
              </Link>
            </>
          )}
          {/* <span class="navbar-text">Navbar text with an inline element</span> */}
        </div>
      </nav>
    </header>
  );
}

export default Header;
