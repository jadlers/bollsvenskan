import React from "react";
import { FirstBloodPhraseForm } from "../components/FirstBloodPhraseForm";

function DotaFirstBloodPhrases() {
  return (
    <div className="flex flex-col space-y-12">
      <div className="bg-gray-50 rounded shadow-xl">
        <p className="text-xl text-gray-800 text-center font-medium my-4">
          Lägg till en ny retfull mening till de som dör först.
        </p>
        <FirstBloodPhraseForm phraseType="mock" />
      </div>
      <div className="bg-gray-50 rounded shadow-xl">
        <p className="text-xl text-gray-800 text-center font-medium my-4">
          Lägg till en ny mening till de som får det första blodet att spillas.
        </p>
        <FirstBloodPhraseForm phraseType="praise" />
      </div>
    </div>
  );
}

export default DotaFirstBloodPhrases;
