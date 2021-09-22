import axios from "axios";
import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import base_url from "../api/Services";
import ConfPageOne from "../components/confipageone/ConfPageOne";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ConfOne from "../components/confipageone/ConfOne";

function HomeScreen() {
  //   const dispatch = useDispatch();
  //   const productList = useSelector((state) => state.productList);
  //   const { error, loading, products, page, pages } = productList;

  //   let keyword = history.location.search;

  //   useEffect(() => {
  //     dispatch(listProducts(keyword));
  //   }, [dispatch, keyword]);
  const history = useHistory();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //   const userInfoFromStorage = localStorage.getItem("userInfo")
  //   ? JSON.parse(localStorage.getItem("userInfo"))
  //   : null;

  // const initialState = {
  //   userLogin: {
  //     userInfo: userInfoFromStorage
  //   },
  // };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login"); //when user tries to access route, if user is not authenticated then redirect to login page
    }
  }, [userInfo]);

  const getAllVehicles = async () => {
    const res = await axios.get(`${base_url}/all`);
    setVehicles(res.data);
  };

  // useEffect(() => {
  //   getAllVehicles();
  // }, []);

  return (
    <div className="row homebg-image">
      <div className="col-12 mt-5  d-flex justify-content-center align-items-start">
        {/* <ConfPageOne /> */}
        <ConfOne />
      </div>
    </div>
  );
}

export default HomeScreen;
