import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DisplayScreen from "./DisplayScreen/DisplayScreen";
import AdminScreen from "./AdminScreen/AdminScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DisplayScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
