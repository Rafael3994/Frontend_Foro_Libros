import { BrowserRouter, Route, Routes } from "react-router-dom";


import './App.css';
import Home from "./components/presentational/Home";
import PerfilUser from "./components/reactive/PerfilUser";
import PaginaLibros from "./components/reactive/PaginaLibros";
import Libro from "./components/reactive/Libro";
import NavbarWithLogin from "./components/presentational/NavbarWithLogin";
import Capitulo from "./components/reactive/Capitulo";
import LibrosAdmin from "./components/reactive/LibrosAdmin";
import NavbarWithLoginAdmin from "./components/presentational/NavbarWithLoginAdmin";
import NewLibro from "./components/reactive/NewLibro";
import UserAdmin from "./components/reactive/UserAdmin";
import LoadingPage from "./components/reactive/LoadingPage";

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loadingpage" element={<LoadingPage />} />
        <Route path="" element={<NavbarWithLogin />}>
          <Route index path="libros" element={<PaginaLibros />} />
          <Route path="perfil" element={<PerfilUser />} />
          <Route path="libro/:id" element={<Libro />} />
          <Route path="libro/:idLibro/:idCap" element={<Capitulo />} />
        </Route>
        {/* Cambiar navbar */}
        <Route path="" element={<NavbarWithLoginAdmin />}>
          <Route path="admin/libros" element={<LibrosAdmin />} />
          <Route path="/admin/perfil" element={<PerfilUser />} />
          <Route path="/admin/newlibro" element={<NewLibro />} />
          <Route path="/admin/user" element={<UserAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
