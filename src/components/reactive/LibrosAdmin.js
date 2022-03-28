import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'


import Banner from '../presentational/Banner';
import Footer from '../presentational/Footer';

import LibroService from "./../../services/libros.service"
import {
    saveLibros,
} from "./../../services/redux/actions/libros";

function LibrosAdmin(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { libros } = useSelector(state => state);
    const [changeComponent, setChangeComponent] = useState(false);

    useEffect(async () => {
        try {
            let response = await LibroService.allLibros();
            if (response.length > 0) {
                dispatch(saveLibros(response));
            }
            setChangeComponent(false);
        } catch (error) {
        }
    }, [changeComponent]);

    const deleteLibro = (e) => {
        try {
            // console.log(e.target.getAttribute('idlibro'));
            Swal.fire({
                title: '¿Segur@ que quieres eliminar el libro?',
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
                    const response = await LibroService.deleteLibro(e.target.getAttribute('idlibro'));
                    let res = await LibroService.allLibros();
                    dispatch(saveLibros(res));
                    setChangeComponent(true);
                    toast.success(response);
                }
            })
        } catch (error) {

        }
    }

    const newLibro = () => {
        // TODO: crear pagina
        // navigate('/admin/newlibro');
    }

    const verLibro = () => {
        // TODO: crear pagina
        // navigate('/admin/libro' + idLibro);
    }

    return (
        <div>
            <Banner />
            <Toaster position="top-right" />
            <div className='mx-5 mt-5'>
                <h1>Libros</h1>
                <div className='mx-5 mt-5'>
                    <button onClick={newLibro} type="button" className="btn btn-outline-success  btn-sm">Añadir libro</button>
                </div>
                <div className='mt-5'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Autor</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                typeof libros !== 'string' && (
                                    libros.map((libro, i) => {
                                        // console.log(libro);
                                        return <tr key={i}>
                                            <th scope="row"></th>
                                            <td>{libro._id}</td>
                                            <td>{libro.nombre}</td>
                                            <td>{libro.autor}</td>
                                            <td>
                                                <button onClick={verLibro} idlibro={libro._id} type="button" className="btn mx-5 btn-outline-primary btn-sm">Ver</button>
                                                <button onClick={deleteLibro} idlibro={libro._id} type="button" className="btn btn-outline-danger btn-sm">Eliminar</button>
                                            </td>
                                        </tr>
                                    }
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div >
    )

}

export default LibrosAdmin;