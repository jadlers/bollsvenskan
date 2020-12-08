import React from "react";
import { FirstBloodPhraseForm } from "../components/FirstBloodPhraseForm";
import FirstBloodPhraseList from "../components/FirstBloodPhraseList";

function Container({ children }) {
  return <div className="bg-nord-1 rounded shadow-xl">{children}</div>;
}

function DotaFirstBloodPhrases() {
  return (
    <div className="flex flex-col space-y-12">
      <div className="flex flex-col space-y-12">
        <Container>
          <p className="text-xl text-center font-medium my-4">
            Lägg till en ny retfull mening till de som dör först.
          </p>
          <FirstBloodPhraseForm phraseType="mock" />
        </Container>
        <Container>
          <p className="text-xl text-center font-medium my-4">
            Lägg till en ny mening till de som får det första blodet att
            spillas.
          </p>
          <FirstBloodPhraseForm phraseType="praise" />
        </Container>
      </div>
      <FirstBloodPhraseList />
    </div>
  );
}

export default DotaFirstBloodPhrases;
