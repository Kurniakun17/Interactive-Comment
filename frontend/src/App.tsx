import "./index.css";
import data from "./utils/data.json";
import Homepage from "./pages/Homepage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { DataContext } from "./utils/Contexts";
import { userProps } from "./utils/interfaces";

function App() {
  const [user, setUser] = useState<userProps>(data.user);

  return (
    <DataContext.Provider value={user}>
      <Routes>
        <Route element={<Homepage />} path="/home"></Route>
        <Route element={<Navigate to={'/home'}></Navigate>} path="*"></Route>
      </Routes>
    </DataContext.Provider>
  );
}

export default App;
