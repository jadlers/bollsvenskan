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
        console.error(err);
      }
    };

    fetchPhrases();
  }, []);

  const mocks = phrases.filter((phrase) => phrase.type === "mock");
  const praises = phrases.filter((phrase) => phrase.type === "praise");
  return (
    <div className="flex flex-col lg:flex-row lg:justify-evenly w-full lg:my-4">
      <List title="Riktade till de som dör" items={mocks} />
      <List title="Riktade till de som dödar" items={praises} />
    </div>
  );
}

function List({ title, items }) {
  return (
    <div className="bg-nord-1 rounded shadow p-2 lg:w-2/5 my-4 lg:my-0 ">
      <p className="text-xl font-bold lg:text-center">{title}</p>
      <ul>
        {items.map(({ id, phrase }) => (
          <li className="my-2" key={id}>
            {phrase}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FirstBloodPhraseList;
