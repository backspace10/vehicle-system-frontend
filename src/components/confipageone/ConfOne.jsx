import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import Select from "react-select/src/Select";
import Select from "react-select";
import { saveModelData } from "../../actions/confOneAction";
import "./conf.css";

const ConfOne = () => {
  const [segmId, setSegId] = useState(0);
  const [mnfId, setMnfId] = useState(0);
  const [modelId, setModelId] = useState(0);

  const [selectedSegName, setSelectedSegName] = useState("");
  const [selectedManuf, setSelectedManuf] = useState("");
  const [qty, setQty] = useState(0);
  const [selectedModel, setSelectedModel] = useState("");
  // const [selectedModelPrice, setSelectedModelPrice] = useState();

  const [segmentNames, setSegmentNames] = useState([]);
  const [manufacturersList, setManufacturersList] = useState([]);
  const [modelsList, setModelsList] = useState([]);

  console.log(selectedSegName);
  console.log(segmId);
  console.log(mnfId);
  console.log(modelsList);
  console.log(selectedModel);
  console.log(modelId);

  // console.log(selectedManuf);

  // console.log(selectedSegName);

  const getSegIdBySegName = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.post(
        "http://localhost:9090/api/vehicles/postSeggName",
        { name: selectedSegName },
        config
      );

      setSegId(data);
      // console.log(segId);
    } catch (error) {
      console.log(error);
    }
  };

  const getMnfIdByMnfName = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.post(
        "http://localhost:9090/api/vehicles/postMnffName",
        { mnfName: selectedManuf },
        config
      );

      setMnfId(data);
      // console.log(mnfId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getManufList = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        //destructuring original => res.data
        const { data } = await axios.post(
          "http://localhost:9090/api/vehicles/postSegName",
          { name: selectedSegName },
          config
        );

        setManufacturersList(data);
      } catch (error) {
        console.log(error);
      }
    };

    getManufList();
    getSegIdBySegName();
  }, [selectedSegName]);

  useEffect(() => {
    getMnfIdByMnfName();
  }, [selectedManuf]);

  useEffect(() => {
    const getModels = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        //destructuring original => res.data
        const { data } = await axios.post(
          "http://localhost:9090/api/vehicles/getModelName",
          { mnfId: segmId, segId: mnfId },
          config
        );

        console.log(data);
        setModelsList(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (mnfId != 0) {
      getModels();
    }
  }, [mnfId]);

  //get model id on change of model name
  useEffect(() => {
    const getModelIdByName = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        //destructuring original => res.data
        const { data } = await axios.post(
          "http://localhost:9090/api/vehicles/postModelName",
          { modelName: selectedModel },
          config
        );
        setModelId(data);
      } catch (error) {
        console.log(error);
      }
    };

    getModelIdByName();
  }, [selectedModel]);
  //to get segments
  useEffect(() => {
    // let isActive = true;
    const fetchSegmentsList = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:9090/api/vehicles/getSegment"
        );

        // if (isActive) {
        setSegmentNames(data);
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
      } catch (error) {
        console.log(error);
      }
    };

    fetchSegmentsList();

    // return () => {
    //   isActive = false;
    // };
  }, []);

  const modelData = {
    modelId: modelId,
    segmentName: selectedSegName,
    modelManufacturer: selectedManuf,
    modelsQuantity: qty,
    modelName: selectedModel,
  };

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    //set dropdown data
    dispatch(saveModelData(modelData));
    history.push("/conf");
  };

  return (
    <div className="card border-warning mb-3 my-card bg-transparent  ">
      <div className="card-header text-center text-white border-warning fs-5 fw-bold ">
        Configuration
      </div>
      <div className="card-body text-primary">
        <form onSubmit={handleSubmit}>
          <Select
            value={selectedSegName}
            onChange={(item) => {
              setSelectedSegName(item);
            }}
            options={segmentNames}
            getOptionValue={(item) => item}
            getOptionLabel={(item) => item}
            placeholder={
              selectedSegName === "" ? "Select Segment" : selectedSegName
            }
            className="pb-3"
          />

          <input
            type="number"
            placeholder="Enter quantity"
            className="form-control mb-3"
            aria-describedby="minQty"
            value={qty}
            onChange={(e) => {
              setQty(e.target.value);
            }}
          />

          <Select
            value={selectedManuf}
            onChange={(item) => {
              setSelectedManuf(item);
            }}
            options={manufacturersList}
            getOptionValue={(item) => item}
            getOptionLabel={(item) => item}
            placeholder={
              selectedManuf === "" ? "Select Manufacturer" : selectedManuf
            }
            className="pb-3"
          />

          <Select
            value={selectedModel}
            onChange={(item) => {
              setSelectedModel(item);
            }}
            options={modelsList}
            getOptionValue={(item) => item}
            getOptionLabel={(item) => item}
            placeholder={selectedModel === "" ? "Select Model" : selectedModel}
            className="pb-3"
          />

          <div className="text-center">
            <button type="submit" className="btn btn-warning">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfOne;
