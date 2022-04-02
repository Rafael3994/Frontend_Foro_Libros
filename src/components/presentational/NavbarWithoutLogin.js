import React from 'react';

function NavbarWithoutLogin(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
                <div className="container px-4 px-lg-5">
                    <a className="navbar-brand" href="#">Club de lectura</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto py-4 py-lg-0">
                            <li className="nav-item nav-link px-lg-3 py-3 py-lg-4" ><a href="#" className="navbar-brand mx-3">Home</a></li>
                            <li className="nav-item nav-link px-lg-3 py-3 py-lg-4" ><a href="#sobreNosotros" className="navbar-brand mx-3">Sobre Nosotros</a></li>
                            <li className="nav-item nav-link px-lg-3 py-3 py-lg-4" ><a href="#utlimosLibros" className="navbar-brand mx-3">Ultimos Libros</a></li>
                            <li className="nav-item nav-link px-lg-3 py-3 py-lg-4" ><a href="#iniciarSesion" className="navbar-brand mx-3">Iniciar Sesion</a></li>
                            <li className="nav-item nav-link px-lg-3 py-3 py-lg-4" ><a href="#registrarse" className="navbar-brand mx-3">Registrarse</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavbarWithoutLogin;