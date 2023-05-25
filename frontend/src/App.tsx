import "./index.css";
import Homepage from "./pages/Homepage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { DataContext, ThemeContext } from "./utils/Contexts";
import { userProps } from "./utils/interfaces";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { useTheme } from "./hooks/useTheme";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { userData, setUser, isLoading, setLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-veryLightGray dark:bg-primaryBlack flex justify-center min-h-screen">
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
