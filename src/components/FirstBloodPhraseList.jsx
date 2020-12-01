import React, { useState, useEffect } from "react";

function FirstBloodPhraseList(props) {
  const [phrases, setPhrases] = useState([]);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const fetchPhrases = async () => {
      try {
        const res = await fetch(`${baseUrl}/fb-phrase`);
        if (!res.ok) {
          return;
        }

        const body = await res.json();
        if (body.ok) {
          setPhrases(body.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPhrases();
  }, []);

  console.log("Phrases: ", phrases);

  const mocks = phrases.filter((phrase) => phrase.type === "mock");
  const praises = phrases.filter((phrase) => phrase.type === "praise");
  return (
    <div className="flex flex-col lg:flex-row lg:justify-evenly w-full ">
      <div className="lg:w-2/5">
        <p className="text-lg">Riktade till de som dör:</p>
        <ul>
          {mocks.map(({ id, phrase }) => (
            <li className="my-2" key={id}>
              {phrase}
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:w-2/5 my-4">
        <p className="text-lg">Riktade till de som dödar:</p>
        <ul>
          {praises.map(({ id, phrase }) => (
            <li className="my-2" key={id}>
              {phrase}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default FirstBloodPhraseList;
