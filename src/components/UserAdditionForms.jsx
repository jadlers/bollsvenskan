import React, { useState, useContext } from "react";
import { SnackbarContext } from "../SnackbarContext";

function FirstBloodSentence({ phraseType }) {
  const [preName, setPreName] = useState("");
  const [postName, setPostName] = useState("");

  const snackbar = useContext(SnackbarContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (preName.trim() === "" && postName.trim() === "") {
      snackbar.open("Du måste skriva in någonting...");
      console.log("Need to specify at least one datapoint");
      return;
    }

    // Post the new phrase to the API
    try {
      const baseUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${baseUrl}/new-fb-phrase`, {
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
    }
  };

  const labelClasses = "text-sm font-bold text-gray-600 block ";
  const inputClasses =
    "w-full p-2 border border-gray-300 rounded mt-1 border focus:outline-none focus:ring-2 focus:ring-blue-600 focus-border-transparent";

  return (
    <>
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
            mock={[preName, postName]}
            died={{ name: "Albert" }}
            praise={["", " fick blodet att spillas."]}
            claimed={{ name: "Berit" }}
          />
        </div>
        <button className="w-1/3 self-center py-2 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 rounded-md text-white text-sm font-bold">
          Lägg till
        </button>
      </form>
    </>
  );
}

function UserAdditionForms() {
  return (
    <div className="flex flex-col bg-white rounded shadow-2xl">
      <p className="text-xl text-gray-800 text-center font-medium my-4">
        Lägg till en ny retfull mening till de som dör först.
      </p>
      <FirstBloodSentence phraseType="mock" />
    </div>
  );
}

export default UserAdditionForms;

// TODO: Rewrite actual one and use here instead
function FirstBloodHighlight({ mock, praise, died, claimed }) {
  return (
    <p>
      {mock[0]}
      <span className="font-bold">{died ? died.name : "???"}</span>
      {mock[1]}
      {" och dog first blood. "}
      {claimed ? (
        <>
          {praise[0]}
          <span className="font-bold">{claimed.name}</span>
          {praise[1]}
        </>
      ) : (
        ""
      )}
    </p>
  );
}
