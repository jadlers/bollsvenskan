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

  const labelClasses = "text-sm font-bold text-gray-600 block ";
  const inputClasses =
    "w-full p-2 border border-gray-300 rounded mt-1 border focus:outline-none focus:ring-2 focus:ring-blue-600 focus-border-transparent";

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
          Text före namnet
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
          Text efter namnet
        </label>
        <input
          className={inputClasses}
          type="text"
          id="postNameMock"
          value={postName}
          onChange={(e) => setPostName(e.target.value)}
        />
      </div>
      <p className="italic">
        Tänk på att lägga till mellanslag så att namet hamnar korrekt! Se hur
        det kommer se ut nedan:
      </p>
      <div className="w-full self-center border-4 border-solid border-blue-200 rounded p-2">
        <FirstBloodHighlight
          died={{ name: "Albert" }}
          claimed={{ name: "Berit" }}
          mock={mocks}
          praise={praises}
        />
      </div>
      <button className="w-1/3 self-center py-2 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 rounded-md text-white text-sm font-bold">
        {posting ? "Lägger till..." : "Lägg till"}
      </button>
    </form>
  );
}
