import React, { useState } from 'react';
import { Link, Navigate, Outlet } from "react-router-dom";
import UserService from "./../../services/user.service";
import Swal from 'sweetalert2'


function Registrarse(props) {

    const [isLogged, setIsLogged] = useState(false);
    const [formData, setFormData] = useState({
        nameRegister: "",
        passwordRegister: "",
        emailRegister: ""
    });

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await UserService.register(
                formData.emailRegister, formData.passwordRegister,
                formData.nameRegister);
            if (response.request.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.request.response,
                })
                // return alert(response.request.response);
            } else if (response.request.status === 400) {
                const res = JSON.parse(response.request.response);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.message,
                })
                // return alert(res.message);
            } else if (response.request.status === 200){
                localStorage.setItem("userToken", JSON.stringify(response.data.tokens[response.data.tokens.length-1].token));
                return setIsLogged(true);
            }
        } catch (error) {

        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div>
            {isLogged && (
                <Navigate to="/libro" replace={true} />
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