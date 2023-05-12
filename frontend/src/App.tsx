import "./index.css";
import data from "./utils/data.json";
import Homepage from "./pages/Homepage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { DataContext, ThemeContext } from "./utils/Contexts";
import { userProps } from "./utils/interfaces";
import { Loading } from "./components/Loading";

function App() {
  const [userData, setUserData] = useState<userProps>(data.user);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  const setLoading = (bool: boolean) => {
    setIsLoading(bool);
  };

  const setUser = (username: string) => {
    setUserData((prev: userProps) => ({ ...prev, username }));
  };

  const toggleTheme = () => {
    setTheme(() => {
      if (theme === "light") {
        return "dark";
      }
      return "light";
    });
  };

  return (
    <div className="bg-veryLightGray flex justify-center">
      <DataContext.Provider
        value={{
          user: userData,
          loading: isLoading,
          setLoading: setLoading,
          setUser,
        }}
      >
        <ThemeContext.Provider value={{ theme, toggleTheme: toggleTheme }}>
          <Routes>
            <Route element={<Homepage />} path="/home"></Route>
            <Route
              element={<Navigate to={"/home"}></Navigate>}
              path="*"
            ></Route>
          </Routes>
        </ThemeContext.Provider>
      </DataContext.Provider>
    </div>
  );
}

export default App;
