import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import base_url from "../../api/Services";

const AddVehicle = () => {
  const [vehicle, setVehicle] = useState({
    name: "",
    model: "",
    price: "",
  });

  const history = useHistory();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const createVehicle = async (e) => {
    e.preventDefault();
    try {
      const { name, model, price } = vehicle;
      const newVehicle = { name, model, price };

      await axios.post(`${base_url}/add`, newVehicle);
      return history.push("/");
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <div className="create-note">
      <h2>Create Vehicle</h2>
      <form onSubmit={createVehicle} autoComplete="off">
        <div className="row">
          <label htmlFor="name">Title</label>
          <input
            type="text"
            value={vehicle.name}
            id="name"
            name="name"
            required
            onChange={onChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="content">Model</label>
          <textarea
            type="text"
            value={vehicle.model}
            id="model"
            name="model"
            required
            onChange={onChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Price</label>
          <input
            type="text"
            value={vehicle.price}
            id="price"
            name="price"
            required
            onChange={onChangeInput}
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddVehicle;
