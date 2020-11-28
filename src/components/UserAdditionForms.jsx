import React, { useState } from "react";

import Typography from "@material-ui/core/Typography";

function FirstBloodSentence() {
  const [preName, setPreName] = useState("Satans ");
  const [postName, setPostName] = useState(" gick hela vägen fram ");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (preName.trim() === "" && postName.trim() === "") {
      console.log("Need to specify at least one datapoint");
      return;
    }
    let data = { preName, postName };
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Text före namnet:
          <input
            type="text"
            placeholder="Före namn"
            value={preName}
            onChange={(e) => setPreName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Text efter namnet:
          <input
            type="text"
            placeholder="Efter namn"
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Lägg till" />
      </form>
      <p>Förhandsgranskning:</p>
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2em",
          boxShadow: "0 2px 3px",
        }}
      >
        <FirstBloodHighlight
          mock={[preName, postName]}
          died={{ name: "Albert" }}
          praise={["", " fick blodet att spillas."]}
          claimed={{ name: "Berit" }}
        />
      </div>
    </>
  );
}

function UserAdditionForms() {
  return (
    <div style={{ border: "2px solid #005050", padding: "1em" }}>
      <FirstBloodSentence />
    </div>
  );
}

export default UserAdditionForms;

// TODO: Rewrite actual one and use here instead
function FirstBloodHighlight({ mock, praise, died, claimed }) {
  return (
    <Typography>
      {mock[0]}
      <b>{died ? died.name : "???"}</b>
      {mock[1]}
      {" och dog first blood. "}
      {claimed ? praise[0] : ""}
      {claimed ? <b>{claimed.name}</b> : ""}
      {claimed ? praise[1] : ""}
    </Typography>
  );
}
