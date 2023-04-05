import React from "react";
import Wave from "react-wavify";

function Test() {
  return (
    <div className="wave-wrapper">
      <Wave
        className="wave"
        fill="black"
        paused={false}
        options={{
          height: 700,
          amplitude: 40,
          speed: 0.25,
          points: 6,
        }}
      />
      <Wave
        className="wave-two"
        fill="white"
        paused={false}
        options={{
          height: 600,
          amplitude: 60,
          speed: 0.15,
          points: 8,
        }}
      />
      <Wave
        className="wave-th"
        fill="white"
        paused={false}
        options={{
          height: 850,
          amplitude: 20,
          speed: 0.3,
          points: 6,
        }}
      />
    </div>
  );
}

export default Test;
