import React from "react";

import Card from "../components/Card";
import { FirstBloodPhraseForm } from "../components/FirstBloodPhraseForm";
import FirstBloodPhraseList from "../components/FirstBloodPhraseList";

function DotaFirstBloodPhrases() {
  return (
    <div className="flex flex-col space-y-6">
      <Card title="Lägg till en ny retfull mening till de som dör först.">
        <FirstBloodPhraseForm phraseType="mock" />
      </Card>
      <Card title="Lägg till en ny mening till de som får det första blodet att spillas.">
        <FirstBloodPhraseForm phraseType="praise" />
      </Card>
      <FirstBloodPhraseList />
    </div>
  );
}

export default DotaFirstBloodPhrases;
