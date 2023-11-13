import "./App.css";
import Sign_in from "./components/Sign_in/Sign_in";
import Sign_up from "./components/Sign_up/Sign_up";
import Homepage from "./components/Homepage/Homepage";
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/expense-management/" element={<Sign_up />} />
        <Route path="/expense-management/sign-up" element={<Sign_up />} />
        <Route path="/expense-management/sign-in" element={<Sign_in />} />
        <Route path="/expense-management/homepage" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
