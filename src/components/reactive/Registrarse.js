import React, { useState } from 'react';
import { Link, Navigate, Outlet } from "react-router-dom";
import UserService from "./../../services/user.service";


function Registrarse(props) {

    const [isLogged, setIsLogged] = useState(false);
    const [formData, setFormData] = useState({
        nameRegister: "",
        passwordRegister: "",
        emailRegister: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            UserService.register(
                formData.emailRegister, formData.passwordRegister,
                formData.nameRegister)
                .then((res) => {
                    if (res) {
                        setIsLogged(true);
                    }
                })
        } catch (error) {

        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div>
            {isLogged && (
                <Navigate to="/user" replace={true} />
            )}
            <div className='mx-5'>
                <a name="registrarse" />
                <br></br>
                <h2>Registrarse</h2>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <label>Nombre: </label>
                    <input value={formData.nameRegister} onChange={handleChange} type="text" className="form-control" name="nameRegister" />
                    <br></br>
                    <label>Email: </label>
                    <input value={formData.emailRegister} onChange={handleChange} type="email" className="form-control" name="emailRegister" />
                    <br></br>
                    <label>Contraseña: </label>
                    <input value={formData.passwordRegister} onChange={handleChange} type="password" className="form-control" name="passwordRegister" />
                    <br></br>
                    <button type="submit" className="btn btn-primary margin-right-7">Registrarse</button>
                </form>
                <br></br>
            </div>
        </div>
    );
}

export default Registrarse;