import "./index.css";
import data from "./utils/data.json";
import Homepage from "./pages/Homepage";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { DataContext } from "./utils/Contexts";
import { userProps } from "./utils/interfaces";

function App() {
  const [user, setUser] = useState<userProps>(data.user);

  return (
    <DataContext.Provider value={user}>
      <Routes>
        <Route element={<Homepage />} path="/home"></Route>
      </Routes>
    </DataContext.Provider>
  );
}

export default App;
