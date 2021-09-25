import React from "react";
import Typewriter from "typewriter-effect";
import vid from "../assets/video.mp4";

const Welcome = () => {
  return (
    <div className="welcome">
      {/* <video
        className="video-bag"
        autoplay="autoplay"
        muted="muted"
        loop="loop"
      >
        <source
          src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4"
          type="video/mp4"
        />
      </video> */}
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
