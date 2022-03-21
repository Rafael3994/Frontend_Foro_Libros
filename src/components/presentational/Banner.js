import React from 'react';
import { Link, Navigate, Outlet } from "react-router-dom";
import NavbarWithoutLogin from "./NavbarWithoutLogin";
import SobreNosotros from "./SobreNosotros";
import Login from "./../reactive/Login";
import Registrarse from './../reactive/Registrarse';


function Banner(props) {
    return (
       <div className='banner'>
           <a name="home"></a>
           <h1>Club de lectura</h1>
       </div>
    );
}

export default Banner;