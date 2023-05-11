import "./index.css";
import { CommentsList } from "./components/CommentsList";
import Homepage from "./pages/Homepage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
      <Routes>
        <Route element={<Homepage />} path="/home"></Route>
      </Routes>
  );
}

export default App;
