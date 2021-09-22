import React, { useEffect, useState } from "react";
import "./conf.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveModelData } from "../../actions/confOneAction";
import Select from "react-select";
import { getSegmentId } from "../../actions/segmentActions";

const ConfPageOne = () => {
  const history = useHistory();

  // const [selectedVal, setSelectedVal] = useState("");
  const [segId, setSegId] = useState();
  const [mnfId, setMnfId] = useState();

  const [segmentNames, setSegmentNames] = useState([]);
  const [manufacturersList, setManufacturersList] = useState([]);
  const [modelsList, setModelsList] = useState([]);
  // const [specfList, setSpecfList] = useState([]);

  const [selectedSegName, setSelectedSegName] = useState("");
  const [selectedManuf, setSelectedManuf] = useState("");
  const [qty, setQty] = useState(0);
  const [model, setModel] = useState("");
  const [mdlId, setMdlId] = useState();

  // const onchangeSelect = (item) => {
  //   setSelectedVal(item);
  // };
  // console.log(selectedVal);

  const handleSelectSegment = (e) => {
    setSelectedSegName(e.target.value);

    console.log(selectedSegName);
  };

  const handleSelectManuf = (e) => {
    setSelectedManuf(e.target.value);
    console.log(selectedManuf);
  };

  //to get list of segments and set that into state variable
  const getSegment = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9090/api/vehicles/getSegment"
      );

      setSegmentNames(data);
      // setOptions(data);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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

  //to get models list
  // const getModels = async () => {
  //   try {
  //     const resData = await axios.get(
  //       "http://localhost:9090/api/vehicles/getModelName"
  //     );

  //     setModelsList(resData.data);
  //     console.log(resData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
      console.log(mnfId);
    } catch (error) {
      console.log(error);
    }
  };

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
        { segId: segId, mnfId: mnfId },
        config
      );

      setModelsList(data);
    } catch (error) {
      console.log(error);
    }
  };

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
      console.log(segId);
    } catch (error) {
      console.log(error);
    }
  };

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
        { modelName: model },
        config
      );

      setMdlId(data);
      console.log(mdlId);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(selectedSegName);
  useEffect(() => {
    getSegment();
  }, []);

  useEffect(() => {
    getManufList();
  }, [selectedSegName]);

  useEffect(() => {
    // if (selectedSegName.length > 0 && selectedManuf.length > 0) {
    getMnfIdByMnfName();
    console.log("manuf id: ", mnfId);
    getSegIdBySegName();
    console.log("seg id: ", mnfId);
    getModels();
    // }
  }, [selectedManuf]);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(selectedSegName);
    // const getSegIdBySegName = async () => {
    //   try {
    //     const config = {
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //     };
    //     //destructuring original => res.data
    //     const { data } = await axios.post(
    //       "http://localhost:9090/api/vehicles/postSeggName",
    //       { name: selectedSegName },
    //       config
    //     );

    //     setSegId(data);
    //     console.log(segId);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // getSegIdBySegName();
  }, [setSelectedSegName]);

  // useEffect(() => {
  //   if (selectedSegName !== "") {
  //     getManufList();
  //   }
  // }, [selectedSegName]);

  // useEffect(() => {
  //   if (selectedSegName !== "") {
  //     getSegIdBySegName();
  //   }
  // }, [selectedSegName]);

  // useEffect(() => {
  //   if (selectedManuf !== "") {
  //     getMnfIdByMnfName();
  //   }
  // }, [selectedManuf]);

  // useEffect(() => {
  //   if (selectedManuf !== "") {
  //     getModels();
  //   }
  // }, [selectedManuf]);

  // useEffect(() => {
  //   // if (model !== "") {
  //   getModelIdByName();
  //   // }
  // }, [model]);

  const modelData = {
    modelId: mdlId,
    segmentName: selectedSegName,
    modelManufacturer: selectedManuf,
    modelsQuantity: qty,
    modelName: model,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //set dropdown data
    dispatch(saveModelData(modelData));
    history.push("/conf");
  };

  // console.log(name);

  return (
    <div className="card border-warning mb-3 my-card bg-transparent  ">
      <div className="card-header text-center text-white border-warning fs-5 fw-bold ">
        Fill Data
      </div>
      <div className="card-body text-primary">
        <form onSubmit={handleSubmit}>
          {/* <select
            className="form-select form-select-lg mb-3 text-warning  bg-transparent"
            aria-label=".form-select-lg example"
            id="segment"
            onChange={(e) => {
              handleSelectSegment(e);
            }}
            // value={selectedSegName}
          >
            <option selected>select segment</option>
            {segmentNames.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select> */}

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
          />

          <input
            type="number"
            placeholder="Enter quantity"
            className="form-control mb-3 text-warning bg-transparent"
            aria-describedby="minQty"
            value={qty}
            onChange={(e) => {
              setQty(e.target.value);
            }}
          />
          {/* 
          <select
            className="form-select form-select-lg mb-3 text-warning  bg-transparent"
            aria-label=".form-select-lg example"
            id="manuf"
            onChange={handleSelectManuf}
            value={selectedManuf}
          >
            <option selected>select manufacturers</option>
            {manufacturersList.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
 */}

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
          />

          {/* <select
            className="form-select form-select-lg mb-3 text-warning  bg-transparent"
            aria-label=".form-select-lg example"
            id="manuf"
            onChange={handleSelectModel}
            value={model}
          >
            
            {modelsList.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select> */}

          <Select
            value={model}
            onChange={(item) => {
              setModel(item);
            }}
            options={modelsList}
            getOptionValue={(item) => item}
            getOptionLabel={(item) => item}
            placeholder={model === "" ? "Select Model" : model}
          />

          <div className="text-center">
            <button type="submit" className="btn btn-warning">
              Next
            </button>
          </div>
        </form>

        {/* <Select
          value={selectedVal}
          onChange={(item) => {
            setSelectedVal(item);
          }}
          options={options}
          getOptionValue={(item) => item}
          getOptionLabel={(item) => item}
          // defaultValue={selectedVal}

          placeholder={selectedVal === "" ? "select val" : selectedVal}
        /> */}
      </div>
    </div>
  );
};

export default ConfPageOne;
