import React from 'react';
import { Link, Navigate, Outlet } from "react-router-dom";


function Login(props) {
    return (
        <div name="login" className='mx-5'>
            <a name='iniciarSesion'></a>
            <br></br>
            <h2>Iniciar Sesion</h2>
            <br></br>
            <form action=''>
                <label>Email: </label>
                <input type="emailLogin" className="form-control" id="emailLogin" />
                <br></br>
                <label>Contraseña: </label>
                <input type="password" className="form-control" id="passwordLogin" />
                <br></br>
                <button type="submit" className="btn btn-primary margin-right-7">Login</button>
            </form>
            <br></br><br></br>
        </div>
    );
}

export default Login;