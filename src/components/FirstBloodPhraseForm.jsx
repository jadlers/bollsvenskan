import React, { useState, useContext } from "react";
import { SnackbarContext } from "../SnackbarContext";
import { FirstBloodHighlight } from "./MatchDetails";

export function FirstBloodPhraseForm({ phraseType }) {
  const [preName, setPreName] = useState("");
  const [postName, setPostName] = useState("");
  const [posting, setPosting] = useState(false);

  const snackbar = useContext(SnackbarContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (preName.trim() === "" && postName.trim() === "") {
      snackbar.open("Du måste skriva in någonting...");
      console.log("Need to specify at least one datapoint");
      return;
    }

    // Post the new phrase to the API
    setPosting(true);
    try {
      const baseUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${baseUrl}/fb-phrase`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ preName, postName, phraseType }),
      });

      if (response.ok) {
        snackbar.open("Tillagt!");
        setPreName("");
        setPostName("");
      } else {
        snackbar.open(
          "Någonting gick fel. Försök igen eller kontakta du vet vem."
        );
      }
    } catch (err) {
      console.error(err);
      snackbar.open(
        "Någonting gick fel. Försök igen eller kontakta du vet vem."
      );
    } finally {
      setPosting(false);
    }
  };

  const labelClasses = "text-sm font-bold block text-nord-4";
  const inputClasses = `w-full p-2 rounded mt-1
    bg-nord-3
    focus:outline-none focus:ring-2 focus:ring-nord-7 focus-border-transparent`;

  let mocks =
    phraseType === "mock" ? [preName, postName] : ["Default ", " mock"];
  let praises =
    phraseType === "praise"
      ? [preName, postName]
      : ["", " fick blodet att spillas."];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6 p-2">
      <div>
        <label htmlFor="preNameMock" className={labelClasses}>
          Före namnet
        </label>
        <input
          className={inputClasses}
          type="text"
          id="preNameMock"
          value={preName}
          onChange={(e) => setPreName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="postNameMock" className={labelClasses}>
          Efter namnet
        </label>
        <input
          className={inputClasses}
          type="text"
          id="postNameMock"
          value={postName}
          onChange={(e) => setPostName(e.target.value)}
        />
      </div>
      <div>
        <p className="italic">
          Tänk på att lägga till mellanslag så att namet hamnar korrekt! Se hur
          det kommer se ut nedan:
        </p>
        <div className="w-full bg-nord-3 rounded px-2 py-4">
          <FirstBloodHighlight
            died={{ name: "Albert" }}
            claimed={{ name: "Berit" }}
            mock={mocks}
            praise={praises}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button className="inline font-bold uppercase p-2 text-nord-8 hover:bg-nord-2 rounded">
          {posting ? "Lägger till..." : "Lägg till"}
        </button>
      </div>
    </form>
  );
}
