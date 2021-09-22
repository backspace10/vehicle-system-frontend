import axios from "axios";
import React, { useEffect, useState } from "react";
import base_url from "../../api/Services";
import LoginScreen from "../../screens/LoginScreen";

const Home = ({ isLogin }) => {
  const [vehicles, setVehicles] = useState([]);

  const getAllVehicles = async () => {
    const res = await axios.get(`${base_url}/all`);
    setVehicles(res.data);
  };

  useEffect(() => {
    getAllVehicles();
  }, []);

  const deleteVehicle = async (id) => {
    try {
      await axios.delete(`${base_url}/delete/${id}`);
      getAllVehicles();
    } catch (error) {
      window.location.href = "/";
    }
  };

  return (
    <div>
      {isLogin ? (
        <>
          <h1>Home</h1>

          <h1>Latest Vehicle</h1>

          <div>
            {vehicles.map((v) => (
              <div className="card" key={v.id}>
                <h4>{v.name}</h4>
                <div>
                  <p>{v.model}</p>
                  <p>{v.price}</p>
                </div>
                {/* <div >
      {v.name}
      <Link to={`edit/${note._id}`}>Edit</Link>
    </div> */}
                <button onClick={() => deleteVehicle(v.id)}>X</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <LoginScreen />
      )}
    </div>
  );
};

export default Home;
