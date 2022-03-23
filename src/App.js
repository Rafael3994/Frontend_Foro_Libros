import { BrowserRouter, Route, Routes } from "react-router-dom";


import './App.css';
import Home from "./components/presentational/Home";
import PaginaLibro from "./components/reactive/PaginaLibro";

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/libro" element={<PaginaLibro />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
