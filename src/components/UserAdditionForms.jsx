import React from "react";
import { FirstBloodPhrase } from "./FirstBloodPhrase";

function UserAdditionForms() {
  return (
    <div className="flex flex-col bg-white rounded shadow-2xl">
      <p className="text-xl text-gray-800 text-center font-medium my-4">
        Lägg till en ny retfull mening till de som dör först.
      </p>
      <FirstBloodPhrase phraseType="mock" />
      <FirstBloodPhrase phraseType="praise" />
    </div>
  );
}

export default UserAdditionForms;
