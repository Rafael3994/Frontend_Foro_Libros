import React, { useState } from 'react';
import { Link, Navigate, Outlet } from "react-router-dom";
import NavbarWithoutLogin from "./NavbarWithoutLogin";
import Banner from "./Banner";
import Login from "./../reactive/Login";
import UltimosLibros from "./UltimosLibros";
import SobreNosotros from "./SobreNosotros";
import Registrarse from './../reactive/Registrarse';

import UserService from "./../../services/user.service";


function Home(props) {

    const [isToken, setIsToken] = useState(UserService.getCurrentUser() !== null);

    return (
        <div>
            {isToken && (
                <Navigate to="/" />
            )}
                <div>
                    <NavbarWithoutLogin />
                    <Banner />
                    <UltimosLibros />
                    <Login />
                    <SobreNosotros />
                    <Registrarse />
                </div>
        </div>
    );
}

export default Home;