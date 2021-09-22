import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
import OrderReceipt from "../confirmationpage/OrderReceipt";

const ConfPageThree = () => {
  const history = useHistory();

  const [musicList, setMusicList] = useState([]);
  const [colorsList, setColorsList] = useState([]);

  const [selectedColorName, setSelectedColorName] = useState("");
  const [selectedMusicName, setSelectedMusicName] = useState("");

  const [modelPrice, setModelPrice] = useState();
  const [colorPrice, seColorPrice] = useState();
  const [musicPrice, setMusicPrice] = useState();

  //getting model id from local storage of selected model

  const modelInfoFromStorage = localStorage.getItem("modelInfo")
    ? JSON.parse(localStorage.getItem("modelInfo"))
    : {};

  const { modelId, modelName } = modelInfoFromStorage;

  const modelConfigFromStorage = localStorage.getItem("configInfo")
    ? JSON.parse(localStorage.getItem("configInfo"))
    : {};

  const { modelMusic } = modelConfigFromStorage;

  const fetchColorsList = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.post(
        "http://localhost:9090/api/vehicles/mdlIdColor",
        { modelId: modelId },
        config
      );

      setColorsList(data);
      console.log(colorsList);
    } catch (error) {
      console.log(error);
    }
  };

  //fetch color price

  //fetch ac price
  const fetchMusicPrice = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.post(
        "http://localhost:9090/api/vehicles/getMusicPrice",
        { musicName: selectedMusicName },
        config
      );

      musicPrice(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMusicSystemList = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.post(
        "http://localhost:9090/api/vehicles/mdlIdMusic",
        { modelId: modelId },
        config
      );

      setMusicList(data);
      console.log(musicList);
    } catch (error) {
      console.log(error);
    }
  };

  //fetch model price
  const fetchModelPrice = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.post(
        "http://localhost:9090/api/vehicles/getMdlPrice",
        { modelId: modelId },
        config
      );

      setModelPrice(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchColorsList();
    fetchMusicSystemList();
    fetchModelPrice();
    // fetchColorsPrice();
    // fetchMusicPrice();
  }, []);

  const configItems = {
    modelColor: selectedColorName,
    modelColorPrice: colorPrice,
    modelMusicPrice: musicPrice,
    modelMusic: selectedMusicName,
    modelPrice: modelPrice,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //set to local storage
    localStorage.setItem("configInfo", JSON.stringify(configItems));
    //move to invoice page
    history.push("/invoice");
  };

  return (
    <div className="row homebg-image">
      <div className="col-12 mt-5  d-flex justify-content-center align-items-start">
        <div className="card border-warning my-card bg-transparent">
          <div className="card-header text-center text-white border-warning fs-5 fw-bold ">
            Configuration
          </div>
          <div className="card-body text-primary">
            <form onSubmit={handleSubmit}>
              <span style={{ color: "#fff" }}>
                <h5>Color</h5>
              </span>
              <Select
                value={selectedColorName}
                onChange={(item) => {
                  setSelectedColorName(item);
                }}
                options={colorsList}
                getOptionValue={(item) => item}
                getOptionLabel={(item) => item}
                placeholder={
                  selectedColorName === ""
                    ? "Select color name"
                    : selectedColorName
                }
              />

              <span style={{ color: "#fff" }}>
                <h5 className="pt-2">Music</h5>
              </span>
              <Select
                value={selectedMusicName}
                onChange={(item) => {
                  setSelectedMusicName(item);
                }}
                options={musicList}
                getOptionValue={(item) => item}
                getOptionLabel={(item) => item}
                placeholder={
                  selectedMusicName === ""
                    ? "Select music system "
                    : selectedMusicName
                }
              />

              <div className="text-center">
                <button type="submit" className="btn btn-warning mt-3">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfPageThree;
