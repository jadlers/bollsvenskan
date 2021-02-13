import useStoredSetting from "./useStoredSetting";

function useTheme() {
  const [storedTheme, setStoredTheme] = useStoredSetting("theme");

  if (storedTheme === null) {
    const clientPreferredTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";
    return [clientPreferredTheme, setStoredTheme];
  }

  return [storedTheme, setStoredTheme];
}

export default useTheme;
