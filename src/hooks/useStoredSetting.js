import { useState } from "react";

export default function useStoredSetting(name) {
  const initialVal = localStorage.getItem(name);
  const [value, setValue] = useState(initialVal);

  const updateValue = (newValue) => {
    localStorage.setItem(name, newValue);
    setValue(newValue);
  };

  return [value, updateValue];
}
