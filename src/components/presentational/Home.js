import React, { useState, useEffect } from 'react';
import { Link, Navigate, Outlet } from "react-router-dom";
import NavbarWithoutLogin from "./NavbarWithoutLogin";
import Banner from "./Banner";
import Login from "./../reactive/Login";
import UltimosLibros from "./UltimosLibros";
import SobreNosotros from "./SobreNosotros";
import Registrarse from './../reactive/Registrarse';

import UserService from "./../../services/user.service";


function Home(props) {

    const [isLogged, setIsLogged] = useState(false);
    const [isToken, setIsToken] = useState(false);

    useEffect(() => {
        try {
            setIsToken(UserService.getCurrentUser() !== null);
            setIsLogged(true);
        } catch (error) {
        }
    }, []);

    return (
        <div>
            {
                isLogged && (
                    isToken
                        ?
                        <Navigate to="/libros" />
                        :
                        < div >
                            <NavbarWithoutLogin />
                            <Banner />
                            <UltimosLibros />
                            <Login />
                            <SobreNosotros />
                            <Registrarse />
                        </div>
                        // TODO: poner footer
                )
            }
        </div >
    );
}

export default Home;