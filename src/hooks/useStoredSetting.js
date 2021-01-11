import { useState } from "react";

export default function useStoredSetting(name) {
  const initialVal = localStorage.getItem(name);
  const [value, setValue] = useState(initialVal);

  const updateValue = (newValue) => {
    if (newValue === null) {
      localStorage.removeItem(name);
    } else {
      localStorage.setItem(name, newValue);
    }
    setValue(newValue);
  };

  return [value, updateValue];
}
