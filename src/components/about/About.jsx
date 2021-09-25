import React from "react";
import "./aboutus.css";

const About = () => {
  return (
    <div className="about-us text-center">
      <h2 className="pt-3">About us</h2>
      <div className="container">
        <p className="text-justify pt-2">
          It is a B2B portal designed for Car Leasing Company. Rental Car
          Companies will purchase the cars in lot and then provide those to
          their Customers. The website is completely database driven. It
          provides detailed specification about cars. It allows a user to select
          a car model, modify the configurable items (interior and exterior;
          such as body color, seats, music system etc.) & order the cars. Based
          on the configuration an invoice is generated in PDF and emailed to the
          client.
        </p>
      </div>
    </div>
  );
};

export default About;
