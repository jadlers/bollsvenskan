import React, { useState, useEffect } from "react";
import Card from "./Card";

function FirstBloodPhraseList() {
  const [phrases, setPhrases] = useState([]);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const fetchPhrases = async () => {
      try {
        const res = await fetch(`${baseUrl}/dota/fb-phrase`);
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <List title="Riktade till de som dör" items={mocks} />
      <List title="Riktade till de som dödar" items={praises} />
    </div>
  );
}

function List({ title, items }) {
  return (
    <Card title={title}>
      <ul>
        {items.map(({ id, phrase }) => (
          <li className="my-2" key={id}>
            {phrase}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default FirstBloodPhraseList;
