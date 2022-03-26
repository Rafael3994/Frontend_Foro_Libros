import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Accordion } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'


import Banner from '../presentational/Banner';

import UserService from "../../services/user.service";
import LibroService from "./../../services/libros.service"

import {
    saveLibros
} from "./../../services/redux/actions/libros";

function Libro(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const { libros, user } = useSelector(state => state);

    const [changeComponent, setChangeComponent] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);
    const [isToken, setIsToken] = useState(UserService.getCurrentUser() !== null);
    const [libro, setLibro] = useState();

    useEffect(() => {
        try {
            const libroFilter = libros.filter(libro => {
                if (libro._id === id) {
                    return libro;
                }
            })
            setLibro(libroFilter[0]);
            setIsLoaded(true);
            setChangeComponent(false);
        } catch (error) {
        }
    }, [changeComponent]);

    const goBack = () => {
        navigate('/libros');
    }

    const verCapitulo = (e) => {
        navigate(`/libro/${id}/${e.target.getAttribute('datavalue')}`);
    }

    const deleteCommentAccion = async (e) => {
        try {
            Swal.fire({
                title: '¿Segur@ que quieres eliminar el comentario?',
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
                    const response = await LibroService.deleteCommentLibro(id, e.target.getAttribute('idComentario'));
                    let res = await LibroService.allLibros();
                    dispatch(saveLibros(res));
                    setChangeComponent(true);
                    toast.success(response);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const añadirComentarioAccion = () => {
        try {
            Swal.fire({
                title: 'Pon tu comentario.',
                input: 'textarea',
                showCancelButton: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // console.log(result.value);
                    const response = await LibroService.addCommentLibro(id, result.value);
                    let res = await LibroService.allLibros();
                    dispatch(saveLibros(res));
                    setChangeComponent(true);
                    toast.success(response);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const editComentarioAccion = (e) => {
        try {
            Swal.fire({
                title: 'Pon tu comentario.',
                input: 'textarea',
                inputValue: e.target.getAttribute('comment'),
                showCancelButton: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await LibroService.editCommentLibro(id, e.target.getAttribute('idcomentario'), result.value);
                    let res = await LibroService.allLibros();
                    dispatch(saveLibros(res));
                    setChangeComponent(true);
                    toast.success(response);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {
                !isToken ?
                    <Navigate to="/" />
                    :
                    isLoaded && (
                        <div>
                            <Banner />
                            <Toaster position="top-right" />
                            <div >
                                <img onClick={goBack} className="goBack pointer-cursor" src={require('./../../assets/img/flecha.png')} alt='flecha' />
                            </div>
                            <div className='mx-5 mt-3 center'>
                                <div className='row'>
                                    <div className='col'>
                                        <h2>{libro.nombre}</h2>
                                        <br></br>
                                        <img className="caratula" src={libro.caratula} alt={libro.nombre} />
                                        <p>Pag: {libro.paginas}</p>
                                    </div>
                                    <div className='col'>
                                        <br></br><br></br><br></br>
                                        <h3>Sinopsis</h3>
                                        <p>{libro.descripcion}</p>
                                        <br></br>
                                        <h4>Fecha de publicacion:   <span className='dato'>{libro.fecha_publicacion}</span></h4>
                                        <h4>Autor:   <span className='dato'>{libro.autor}</span></h4>
                                    </div>
                                </div>
                            </div>
                            <br></br><br></br>
                            <div className='mx-5 mt-3'>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item>
                                        <Accordion.Header><h2>Capitulos</h2></Accordion.Header>
                                        {
                                            libro.capitulos.length !== 0 ?
                                                <Accordion.Body>
                                                    <ul className="list-group list-group-flush list-group-item-action">
                                                        {
                                                            libro.capitulos.map((capitulo, i) => {
                                                                return <li onClick={verCapitulo} datavalue={capitulo._id} key={i} className="list-group-item list-group-item-action">{capitulo.capitulo.nombreCap}</li>
                                                            })
                                                        }
                                                    </ul>
                                                </Accordion.Body>
                                                :
                                                <Accordion.Body>
                                                    <p>No hay capitulos</p>
                                                </Accordion.Body>
                                        }
                                    </Accordion.Item>
                                </Accordion>
                            </div>

                            <div className='mx-5 mt-3'>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item>
                                        <Accordion.Header><h2>Comentarios</h2></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='d-flex justify-content-center'>
                                                <img onClick={añadirComentarioAccion} className='btn-añadir pointer-cursor' src={require('./../../assets/img/añadir.png')}></img>
                                            </div>
                                            {
                                                libro.comentarios.length !== 0 ?
                                                    <ul className="list-group list-group-flush">
                                                        {

                                                            libro.comentarios.map((comentarios, i) => {
                                                                //TODO: Modificar back para encontrar user by id
                                                                return <div key={i} className="comment mt-4 text-justify float-left">
                                                                    {user.photo === null ?
                                                                        <img src={require('./../../assets/img/perfil-empty.png')} alt="" className="rounded-circle" width="40" height="40" />
                                                                        :
                                                                        <img src="https://i.imgur.com/yTFUilP.jpg" alt="" className="rounded-circle" width="40" height="40" />
                                                                    }
                                                                    <h4>Name</h4> <span>- {comentarios.comentario.fecha_publicacion.slice(0, 10)}</span> <br></br>
                                                                    <p>{comentarios.comentario.comentarioDesc}</p>
                                                                    {
                                                                        comentarios.comentario.idUser === user._id && (
                                                                            <div className='mb-2'>
                                                                                <button onClick={editComentarioAccion} idcomentario={comentarios._id} comment={comentarios.comentario.comentarioDesc} className="pointer-cursor button btn btn-secondary btn-sm">Modificar</button>
                                                                                <button onClick={deleteCommentAccion} idcomentario={comentarios._id} className="pointer-cursor button btn btn-secondary btn-sm">Eliminar</button>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            })
                                                        }
                                                    </ul>
                                                    // </Accordion.Body>
                                                    :
                                                    // <Accordion.Body>
                                                    <p>No hay comentarios</p>
                                            }
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>


                    )
            }
        </div >
    );
}

export default Libro;