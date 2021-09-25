import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import VehicleCarousel from "../carausel/VehicleCarousel";
import axios from "axios";
import Specifications from "../specifications/Specifications";
import "./conftwo.css";
import { useSelector } from "react-redux";

const ConfTwo = () => {
  const [specfList, setSpecfList] = useState([]);
  const [defaultSpec, setDefaultSpec] = useState([]);
  const [interiorList, setInteriorList] = useState([]);
  const [exteriorList, setExteriorList] = useState([]);

  // const [modelId, setModelId] = useState();

  // const modelDataa = useSelector((state) => state.modelDataa);
  // const { modelInfo } = modelDataa;

  // console.log(modelInfo);
  // console.log(modelInfo);
  const modelInfoFromStorage = localStorage.getItem("modelInfo")
    ? JSON.parse(localStorage.getItem("modelInfo"))
    : {};

  const { modelName, modelId } = modelInfoFromStorage;

  console.log(modelInfoFromStorage);

  console.log(modelId);

  //to get standard specifications
  const getSpec = async () => {
    try {
      const resData = await axios.get(
        "http://localhost:9090/api/vehicles/getSpecf"
      );

      setSpecfList(resData.data);
      // console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };

  //get default specifications by model name
  const fetchDefaultSpec = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.post(
        "http://localhost:9090/api/vehicles/postMdlName",
        { modelName: modelName },
        config
      );

      //let split string data to array inorder to display in atomic value
      let splitedData = data.split(",");

      setDefaultSpec(splitedData);
      // console.log(splitedData);
    } catch (error) {
      console.log(error);
    }
  };

  //to get interior features by model id
  const getInteriorInfo = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.post(
        "http://localhost:9090/api/vehicles/modelId",
        { modelId: modelId },
        config
      );
      let splitData = data.split(",");
      setInteriorList(splitData);
      console.log(data);
      // console.log(splitedData);
      // console.log(interiorList);
    } catch (error) {
      console.log(error);
    }
  };

  //get exterior info by modelid
  const getExteriorInfo = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.post(
        "http://localhost:9090/api/vehicles/mdId",
        { modelId: modelId },
        config
      );
      let splitData = data.split(",");
      setExteriorList(splitData);
      console.log(data);
      // console.log(splitedData);
      // console.log(interiorList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpec();
  }, []);

  useEffect(() => {
    if (modelName !== "") {
      fetchDefaultSpec();
    }
  }, [modelName]);

  useEffect(() => {
    getInteriorInfo();
    getExteriorInfo();
  }, []);

  const history = useHistory();

  const handleBack = () => {
    // localStorage.clear("modelInfo");
    // localStorage.clear("configInfo");
    history.goBack("/conf");
  };

  const handleConfirm = () => {
    history.push("/invoice");
  };

  const handleConfig = () => {
    history.push("/confthree");
  };

  return (
    <div>
      {/* slider */}
      <div className="row">
        <div className="col col-md-12 ">
          <div className="custom-img">
            <VehicleCarousel />
          </div>
        </div>
      </div>

      {/* <div className="container">
        <div className="row">
          
          <div className="col-md-10" >
            
          </div>

        </div>

      </div> */}

      {/* specifications */}

    {/* <div className="container">
      <div className="feature">
        <div className="item">
            <strong>Standard Features</strong>
            {specfList.map((item, index) => (
                  <p className="card-text" key={index}>
                    {item}
                  </p>
            ))}
        </div>

        <div className="item">
            <strong>Default Features</strong>

            {defaultSpec.map((item, index) => (
                  <p className="card-text" key={index}>
                    {item}
                  </p>
            ))}
        </div>

        <div className="item">
            <strong>Interior Features</strong>
          
            {interiorList.map((item, index) => (
                  <p className="card-text" key={index}>
                    {item}
                  </p>
            ))}
        </div>

        <div className="item">
            <strong>Interior Features</strong>
             {exteriorList.map((item, index) => (
                  <p className="card-text" key={index}>
                    {item}
                  </p>
              ))}
        </div>

      </div>
    </div> */}


       <div className="row">
        <div className="row mt-5">
          <div className="features">
            <div className="card text-white mb-3">
              <div className="card-header">
                <strong>Standard Features</strong>
              </div>
              <div className="card-body">
                <h5 className="card-title"></h5>

                {specfList.map((item, index) => (
                  <p className="card-text" key={index}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="card text-white mb-3">
              <div className="card-header">Default Features</div>
              <div className="card-body">
                <h5 className="card-title"></h5>

                {defaultSpec.map((item, index) => (
                  <p className="card-text" key={index}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="card text-white mb-3">
              <div className="card-header">Interior Features</div>
              <div className="card-body">
                <h5 className="card-title"></h5>
                {interiorList.map((item, index) => (
                  <p className="card-text" key={index}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="card text-white mb-3">
              <div className="card-header">Exterior Features</div>
              <div className="card-body">
                <h5 className="card-title"></h5>
                {exteriorList.map((item, index) => (
                  <p className="card-text" key={index}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* buttons */}
      <div className="row mt-5 mb-5">
        <div className="features-btns">
          {/* <div className="col"> */}
          <button
            type="button"
            className="btn btn-outline-primary mr-1"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="button"
            className="btn btn-outline-success mr-1"
            onClick={handleConfirm}
          >
            Order
          </button>
          <button
            type="button"
            className="btn btn-outline-warning mr-1"
            onClick={handleConfig}
          >
            Configure
          </button>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default ConfTwo;
