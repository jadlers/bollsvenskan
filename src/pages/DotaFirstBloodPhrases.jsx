import React from "react";
import { FirstBloodPhraseForm } from "../components/FirstBloodPhraseForm";

function DotaFirstBloodPhrases() {
  return (
    <div className="flex flex-col bg-white rounded shadow-2xl">
      <p className="text-xl text-gray-800 text-center font-medium my-4">
        Lägg till en ny retfull mening till de som dör först.
      </p>
      <FirstBloodPhraseForm phraseType="mock" />
      {/* <FirstBloodPhraseForm phraseType="praise" /> */}
    </div>
  );
}

export default DotaFirstBloodPhrases;
