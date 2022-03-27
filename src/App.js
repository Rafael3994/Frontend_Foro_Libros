import { BrowserRouter, Route, Routes } from "react-router-dom";


import './App.css';
import Home from "./components/presentational/Home";
import PerfilUser from "./components/reactive/PerfilUser";
import PaginaLibros from "./components/reactive/PaginaLibros";
import Libro from "./components/reactive/Libro";
import NavbarWithLogin from "./components/presentational/NavbarWithLogin";
import Capitulo from "./components/reactive/Capitulo";
import LibrosAdmin from "./components/reactive/LibrosAdmin";

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="" element={<NavbarWithLogin />}>
          <Route index path="libros" element={<PaginaLibros />} />
          <Route path="perfil" element={<PerfilUser />} />
          <Route path="libro/:id" element={<Libro />} />
          <Route path="libro/:idLibro/:idCap" element={<Capitulo />} />
        </Route>
        {/* Cambiar navbar */}
        <Route path="" element={<NavbarWithLogin />}>
          <Route path="admin/libros" element={<LibrosAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
