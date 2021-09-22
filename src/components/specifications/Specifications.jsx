import React, { useEffect, useState } from "react";
import axios from "axios";
import "./specifications.css";

const Specifications = () => {
  const [spesfList, setSpesfList] = useState([]);
  // const [defaultSpec, setDefaultSpec] = useState([]);

  // const getSpecs = async () => {
  //   try {
  //     const resData = await axios.get(
  //       "http://localhost:9090/api/vehicles/getSpecf"
  //     );

  //     setSpecList(resData.data);
  //     console.log(resData);
  //     console.log(specList);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    let arr = [];
    axios
      .get("http://localhost:9090/api/vehicles/getSpecf")
      .then((response) => {
        arr = [...response.data];
        setSpesfList([...arr]);
        console.log(response.data);
        console.log(arr);
        console.log(spesfList);
      });
  }, []);

  return (
    <div>
      <div className="row mt-5">
        <div className="features">
          <div className="card text-white mb-3">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Primary card title</h5>

              {spesfList.map((spec, index) => {
                <p className="card-text" key={index}>
                  {spec}
                </p>;
              })}
            </div>
          </div>
          <div className="card text-white mb-3">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Secondary card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="card text-white mb-3">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Success card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="card text-white mb-3">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Danger card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specifications;
