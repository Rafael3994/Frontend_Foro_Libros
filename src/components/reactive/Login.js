import React, { useState } from 'react';
import Swal from 'sweetalert2'

import UserService from "./../../services/user.service";

function Login(props) {

    const [formData, setFormData] = useState({
        emailLogin: "",
        passwordLogin: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await UserService.login(formData.emailLogin, formData.passwordLogin);
        if (response === true) {
            return props.setIsToken(UserService.getCurrentUser() !== null)
        } else if (response.request.status === 401) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.request.response,
            })
        } else if (response.request.status === 400) {
            const res = JSON.parse(response.request.response);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.message,
            })
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // TODO: al hacer login que me envie a arriba de la pagina
    return (
        <div>
            <div name="login" className='mx-5'>
                <a name='iniciarSesion'></a>
                <br></br>
                <h2>Iniciar Sesion</h2>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <label>Email: </label>
                    <input value={formData.emailLogin} onChange={handleChange} type="email" className="form-control" name="emailLogin" />
                    <br></br>
                    <label>Contraseña: </label>
                    <input value={formData.passwordLogin} onChange={handleChange} type="password" className="form-control" name="passwordLogin" />
                    <br></br>
                    <button type="submit" className="btn btn-primary margin-right-7">Login</button>
                </form>
                <br></br><br></br>
            </div>
        </div>
    );
}

export default Login;