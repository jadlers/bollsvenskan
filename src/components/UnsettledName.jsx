import React, { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";

export default function UnsettledName({ names }) {
  const [name, setName] = useState("");
  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * names.length);
      setName(names[randomIdx]);
    }, 100);

    return () => clearInterval(intervalId);
  });

  return (
    <li>
      <Typography style={{ color: "#dd7788" }}>{name}</Typography>
    </li>
  );
}
