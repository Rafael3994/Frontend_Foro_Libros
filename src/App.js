import { BrowserRouter, Route, Routes } from "react-router-dom";


import './App.css';
import Home from "./components/presentational/Home";
import PaginaLibros from "./components/reactive/PaginaLibros";
import Libro from "./components/reactive/Libro";
import NavbarWithLogin from "./components/presentational/NavbarWithLogin";

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="" element={<NavbarWithLogin />}>
          <Route index path="libros" element={<PaginaLibros />} />
          <Route path="libro/:id" element={<Libro />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
