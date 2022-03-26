import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import { Accordion } from 'react-bootstrap';
import Swal from 'sweetalert2'

import UserService from "../../services/user.service";

import Banner from '../presentational/Banner';
import Footer from '../presentational/Footer';

import {
    saveUser
} from "./../../services/redux/actions/user";

function PaginaLibro(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isToken, setIsToken] = useState(UserService.getCurrentUser() !== null);

    const { user } = useSelector(state => state);
    const [changeComponent, setChangeComponent] = useState(false);

    const [formData, setFormData] = useState({
        emailEdit: "",
        nameEdit: "",
        passwordEdit: "",
        passwordRepeatEdit: "",
        photoEdit: ""
    })

    useEffect(async () => {
        try {
            let responseUser = await UserService.getUser();
            if (responseUser.data) {
                dispatch(saveUser(responseUser.data));
            }
            setFormData({ ...formData, emailEdit: user.email, nameEdit: user.name })

            setChangeComponent(false);
        } catch (error) {
        }
    }, [changeComponent]);


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            // Comprovacion de las contraseñas
            if (formData.passwordEdit !== formData.passwordRepeatEdit) {
                toast.error('Las contraseñas no coinciden.');
                return;
            }
            // Si los campos son iguales al que tienen por defecto se envian los campos vacios
            if (formData.emailEdit === user.email) {
                formData.emailEdit = '';
            }
            if (formData.nameEdit === user.name) {
                formData.nameEdit = '';
            }
            if (formData.photoEdit === user.photo) {
                formData.photoEdit = '';
            }
            // Hacer peticion
            Swal.fire({
                title: '¿Segur@ que quieres modificar los datos de tu cuenta?',
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: 'No',
                customClass: {
                    actions: 'my-actions',
                    confirmButton: 'order-2',
                    denyButton: 'order-3',
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let responseUser = await UserService.upadate(formData.nameEdit, formData.emailEdit, formData.passwordEdit, formData.photoEdit);
                    if (responseUser.status) {
                        console.log(responseUser.response);
                        localStorage.setItem("userToken", JSON.stringify(responseUser.response.tokens[responseUser.response.tokens.length - 1].token));
                        toast.success('Perfil modificado.');
                        setChangeComponent(true);
                    } else {
                        toast.error(responseUser.response.data.message);
                    }
                }
            })
        } catch (error) {
            console.log(error);
        }

    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const eliminarUser = () => {
        try {
            Swal.fire({
                title: '¿Segur@ que quieres eliminar tu cuenta de usuario?',
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: 'No',
                customClass: {
                    actions: 'my-actions',
                    confirmButton: 'order-2',
                    denyButton: 'order-3',
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // TODO: Implementar mas adelante, borrar los comentarios del usuario borrado.
                    const response = await UserService.deleteUser();
                    if (response) {
                        localStorage.removeItem('userToken');
                        navigate('/');
                    }
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const buscarImagen = (e) => {
        e.preventDefault();
        toast(
            "Accion en desarrollo",
            {
                duration: 3000,
            }
        );
    }

    return (
        <div>
            {
                !isToken ?
                    <Navigate to="/" />
                    :
                    <div>
                        <Banner />
                        <Toaster position="top-right" />
                        <div className='mx-5 mt-5'>
                            <h1>Perfil</h1>
                            <div className='mx-5 mt-5'>
                                <div className='row mx-3'>
                                    <div className='col-7'>
                                        <div className='row'>
                                            <div className='col mb-5'>
                                                {
                                                    user.photo === null ?
                                                        <img className='perfil-img' src={require('./../../assets/img/perfil-empty.png')} />
                                                        :
                                                        <img className='perfil-img' src={user.photo} />
                                                }
                                            </div>
                                            <div className='col'>
                                                <br></br>
                                                <h2>{user.name}</h2>
                                                <br></br><br></br>
                                                <h2>{user.email}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item>
                                        <Accordion.Header><h2>Editar</h2></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='mt-3'>
                                                <form onSubmit={handleSubmit}>
                                                    <label>Nombre: </label>
                                                    <input value={formData.nameEdit} onChange={handleChange} type="text" className="form-control" name="nameEdit" />
                                                    <br></br>
                                                    <label>Email: </label>
                                                    <input value={formData.emailEdit} onChange={handleChange} type="email" className="form-control" name="emailEdit" />
                                                    <br></br>
                                                    <label>Contraseña: </label>
                                                    <input value={formData.passwordEdit} onChange={handleChange} type="password" className="form-control" name="passwordEdit" />
                                                    <br></br>
                                                    <label>Repite la Contraseña: </label>
                                                    <input value={formData.passwordRepeatEdit} onChange={handleChange} type="password" className="form-control" name="passwordRepeatEdit" />
                                                    <br></br>
                                                    <label>Foto: </label>
                                                    <div className='row'>
                                                        <div className='col-6 d-flex align-items-center'>
                                                            <input value={formData.photoEdit} onChange={handleChange} type="text" className="form-control" name="photoEdit" />
                                                        </div>
                                                        <div className='col-3 d-flex align-items-center'>
                                                            <button onClick={buscarImagen} className="btn btn btn-info btn-sm">Buscar</button>
                                                        </div>
                                                    </div>
                                                    <br></br>
                                                    <button type="submit" className="btn btn-primary margin-right-7">Modificar</button>
                                                </form>
                                                <div className='mt-4 ml-5em'>
                                                    <button onClick={eliminarUser} className="btn btn-outline-danger btn-sm">Eliminar cuenta</button>
                                                </div>
                                            </div>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                        <Footer />
                    </div>
            }
        </div>
    );
}

export default PaginaLibro;