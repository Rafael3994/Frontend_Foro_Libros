import React from 'react';
import { Link, Navigate, Outlet } from "react-router-dom";
import NavbarWithoutLogin from "./NavbarWithoutLogin";
import Banner from "./Banner";
import Login from "./../reactive/Login";
import UltimosLibros from "./UltimosLibros";
import SobreNosotros from "./SobreNosotros";
import Registrarse from './../reactive/Registrarse';


function Home(props) {
    return (
        <div>
            <NavbarWithoutLogin />
            <Banner />
            <UltimosLibros />
            <Login />
            <SobreNosotros />
            <Registrarse />
        </div>
    );
}

export default Home;