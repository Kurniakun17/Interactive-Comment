import "./index.css";
import data from "./utils/data.json";
import Homepage from "./pages/Homepage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataContext, ThemeContext } from "./utils/Contexts";
import { userProps } from "./utils/interfaces";
import { Loading } from "./components/Loading";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  const [userData, setUserData] = useState<userProps>(data.user);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  const setLoading = (bool: boolean) => {
    setIsLoading(bool);
  };

  const setUser = (username: string, id: string) => {
    setUserData((prev: userProps) => ({ ...prev, username, _id: id }));
  };

  const toggleTheme = () => {
    setTheme(() => {
      if (theme === "light") {
        return "dark";
      }
      return "light";
    });
    document.body.classList.toggle("dark");
  };

  return (
    <div className="bg-veryLightGray dark:bg-slate-900 flex justify-center min-h-screen">
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
            <Route element={<Login />} path="/login"></Route>
            <Route element={<Register />} path="/register"></Route>
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
