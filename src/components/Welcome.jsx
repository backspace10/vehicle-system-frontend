import React from "react";
import Typewriter from "typewriter-effect";

const Welcome = () => {
  return (
    <div className="welcome">
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString("Welcome To Vehicle Configuration System.")
            .start();
        }}
      />
    </div>
  );
};

export default Welcome;
