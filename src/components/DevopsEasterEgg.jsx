import React from "react";
import rubberDuck from "../img/rubber-duck.jpg";

function DevopsEasterEgg(props) {
  return (
    <div
      style={{
        margin: "1em auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        /* textAlign: "center", */
        height: "70vh",
      }}
    >
      <img
        src={rubberDuck}
        style={{ width: "600px", maxWidth: "100%" }}
        alt="Detective rubber duck saying good job finding it and telling you to leave spring 2021 free for the devops course at KTH."
      />
      <i>
        <a href="https://github.com/kth/devops-course">
          {"Read more about the course ->"}
        </a>
      </i>
    </div>
  );
}

export default DevopsEasterEgg;
