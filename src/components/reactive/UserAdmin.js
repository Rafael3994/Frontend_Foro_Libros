import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'

import Banner from '../presentational/Banner';
import Footer from '../presentational/Footer';

import UserService from "./../../services/user.service";

function UserAdmin(props) {

    const [usuarios, setUsuarios] = useState();
    const [isLogged, setIsLogged] = useState(false);
    const [isChangeComponent, setChangeComponent] = useState(false);


    useEffect(async () => {
        setChangeComponent(false)
        setUsuarios(await UserService.getAllUsers());
        setIsLogged(true);
    }, [isChangeComponent]);

    const deleteUser = (e) => {
        try {
            Swal.fire({
                title: '¿Segur@ que quieres eliminar este usuario?',
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
                    const response = await UserService.deleteUserByID(e.target.name);
                    toast.success(response);
                    setChangeComponent(true);
                }
            })
        } catch (error) {
            console.log('No se pudo borrar.');
        }
    }

    const addUserAdmin = (e) => {
        try {
            Swal.fire({
                title: '¿Segur@ que quieres que este usuario sea admin?',
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
                    const response = await UserService.addAdmin(e.target.name);
                    toast.success(response);
                    setChangeComponent(true);
                }
            })
        } catch (error) {
            console.log('No se pudo borrar.');
        }

    }

    return (
        <div>
            <div>
                <Banner />
                <Toaster position="top-right" />
                <div className='mx-5 mt-5'>
                    <h1>Usuarios</h1>
                    <div className='mx-5 mt-4'>
                        <table className="table-light mx-3 w-75">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Roles</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    isLogged && (
                                        usuarios.map((usuario, i) => {
                                            // console.log(usuario);
                                            return <tr key={i}>
                                                <td>{usuario.name}</td>
                                                <td>{usuario.email}</td>
                                                <td>
                                                    {usuario.roles.map(role => {
                                                        return ' ' + role + ' ';
                                                    })}
                                                </td>
                                                <td className='mx-4'>
                                                    <div className='row'>
                                                        <div className='col-4'>
                                                            {
                                                                usuario.roles.length <= 1 && (
                                                                    <button onClick={addUserAdmin} name={usuario._id} type="button" className="btn btn-outline-primary btn-sm">Asignar a admin</button>
                                                                )
                                                            }
                                                        </div>
                                                        <div className='col-2'>
                                                            <button onClick={deleteUser} name={usuario._id} type="button" className="btn btn-outline-danger btn-sm">Eliminar</button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Footer />
            </div>

        </div>
    );
}

export default UserAdmin;