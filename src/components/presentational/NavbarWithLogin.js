import React from 'react';
import { Link, Navigate, Outlet } from "react-router-dom";

import UserService from './../../services/user.service';

function NavbarWithLogin(props) {

    const logout = async () => {
        const result = UserService.logout();
        if (result) {
            props.setIsToken(false);
        }
    }

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
                            {/* TODO: poner enlaces */}
                            <li className="nav-item nav-link px-lg-3 py-3 py-lg-4" ><Link to='/libros' className="navbar-brand mx-3">Libros</Link></li>
                            <li className="nav-item nav-link px-lg-3 py-3 py-lg-4" ><a href="#" className="navbar-brand mx-3">Perfil</a></li>
                            <li className="nav-item nav-link px-lg-3 py-3 py-lg-4" ><a onClick={logout} className="pointer-cursor navbar-brand mx-3">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavbarWithLogin;