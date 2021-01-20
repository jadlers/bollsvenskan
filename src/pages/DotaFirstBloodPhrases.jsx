import React from "react";

import Card from "../components/Card";
import { FirstBloodPhraseForm } from "../components/FirstBloodPhraseForm";
import FirstBloodPhraseList from "../components/FirstBloodPhraseList";

function DotaFirstBloodPhrases() {
  return (
    <div className="flex flex-col space-y-6">
      <Card>
        <p className="text-xl text-center font-medium my-4">
          Lägg till en ny retfull mening till de som dör först.
        </p>
        <FirstBloodPhraseForm phraseType="mock" />
      </Card>
      <Card>
        <p className="text-xl text-center font-medium my-4">
          Lägg till en ny mening till de som får det första blodet att spillas.
        </p>
        <FirstBloodPhraseForm phraseType="praise" />
      </Card>
      <FirstBloodPhraseList />
    </div>
  );
}

export default DotaFirstBloodPhrases;
