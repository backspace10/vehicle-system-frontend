import React from "react";
// import one from "assets/";
import two from "../../assets/66.jpeg";
import thrr from "../../assets/77.jpg";
import "./carousel.css";

const VehicleCarousel = () => {
  const modelInfoFromStorage = localStorage.getItem("modelInfo")
    ? JSON.parse(localStorage.getItem("modelInfo"))
    : {};

  const { modelId, modelName } = modelInfoFromStorage;

  // import one from `/../../assets/${modelId}a.jpg`
  // const two = `/../../assets/${modelId}b.jpg`
  // const three = `/../../assets/${modelId}c.jpeg`

  return (
    <div 
      id="carouselExampleDark"
      className=" carousel carousel-dark slide"
      data-bs-ride="carousel"
      style={{background:"#000"}}
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="container carousel-inner">
        <div className="carousel-item active" data-bs-interval="10000">
          <img src={`/images/${modelId}a.jpg`} className="" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h3 className="text-white" >{modelName}</h3>
            {/* <p>Some representative placeholder content for the first slide.</p> */}
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img src={`/images/${modelId}b.jpg`} className="" alt="..." />
          <div className="carousel-caption d-none d-md-block">
          <h3 className="text-white" >{modelName}</h3>
            {/* <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p> */}
          </div>
        </div>
        
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default VehicleCarousel;
