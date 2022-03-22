import { BrowserRouter, Route, Routes } from "react-router-dom";


import './App.css';
import Home from "./components/presentational/Home";
import UserLogin from "./components/reactive/UserLogin";

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserLogin />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
