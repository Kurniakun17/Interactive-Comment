import React, { useEffect, useState } from "react";
import { getThemeLS } from "../utils/localStorageUtils";

export const useTheme = () => {
  const [theme, setTheme] = useState(getThemeLS());

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setTheme(() => {
      if (theme === "light") {
        localStorage.setItem("theme", "dark");
        return "dark";
      }
      localStorage.setItem("theme", "light");
      return "light";
    });
    document.body.classList.toggle("dark");
  };

  return { theme, toggleTheme };
};
