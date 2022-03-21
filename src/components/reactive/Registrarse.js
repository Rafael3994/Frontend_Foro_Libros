import React from 'react';
import { Link, Navigate, Outlet } from "react-router-dom";


function Registrarse(props) {
    return (
        <div className='mx-5'>
            <a name="registrarse" />
            <br></br>
            <h2>Registrarse</h2>
            <br></br>
            <form action=''>
                <label>Nombre: </label>
                <input type="nombre" className="form-control" id="nombre" />
                <br></br>
                <label>Email: </label>
                <input type="email" className="form-control" id="email" />
                <br></br>
                <label>Contraseña: </label>
                <input type="password" className="form-control" id="password" />
                <br></br>
                <button type="submit" className="btn btn-primary margin-right-7">Registrarse</button>
            </form>
            <br></br>
        </div>
    );
}

export default Registrarse;