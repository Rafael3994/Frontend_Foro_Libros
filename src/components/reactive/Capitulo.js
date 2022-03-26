import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Accordion } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

import Banner from '../presentational/Banner';
import Footer from '../presentational/Footer';

import UserService from "../../services/user.service";
import LibroService from "./../../services/libros.service"

import {
    saveLibros
} from "./../../services/redux/actions/libros";

function Capitulo(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { libros, user } = useSelector(state => state);
    const { idLibro, idCap } = useParams();

    const [isToken, setIsToken] = useState(UserService.getCurrentUser() !== null);
    const [libro, setLibro] = useState();
    const [capitulo, setCapitulo] = useState();
    const [changeComponent, setChangeComponent] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const libroFilter = libros.filter(libro => {
                if (libro._id === idLibro) {
                    return libro;
                }
            })
            setLibro(libroFilter[0]);
            const capituloFilter = libroFilter[0].capitulos.filter(capitulo => {
                if (capitulo._id === idCap) {
                    return capitulo;
                }
            })
            setCapitulo(capituloFilter[0]);
            setChangeComponent(false);
            setIsLoaded(true);
        } catch (error) {
        }
    }, [changeComponent]);

    const goBack = () => {
        navigate('/libro/' + idLibro);
    }

    const añadirComentarioAccion = () => {
        try {
            Swal.fire({
                title: 'Pon tu comentario.',
                input: 'textarea',
                showCancelButton: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await LibroService.addCommentCapitulo(idLibro, idCap, result.value);
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
                    const response = await LibroService.editCommentCapitulo(idLibro, idCap, e.target.getAttribute('idcomentario'), result.value);
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

    const deleteCommentAccion = (e) => {
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
                    const response = await LibroService.deleteCommenCapitulo(idLibro, idCap, e.target.getAttribute('idcomentario'));
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


    return (
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
                    <div className='mx-5 mt-3'>
                        <h1>{libro.nombre}</h1>
                        <h2>Capitulo: {capitulo.capitulo.nombreCap}</h2>
                    </div>
                    <div className='mx-5 mt-5'>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item>
                                <Accordion.Header><h2>Comentarios</h2></Accordion.Header>
                                <Accordion.Body>
                                    <div className='d-flex justify-content-center'>
                                        <img onClick={añadirComentarioAccion} className='btn-añadir pointer-cursor' src={require('./../../assets/img/añadir.png')}></img>
                                    </div>
                                    {
                                        capitulo.capitulo.comentarios.length !== 0 ?
                                            <ul className="list-group list-group-flush">
                                                {
                                                    capitulo.capitulo.comentarios.map((comentarios, i) => {
                                                        //TODO: Modificar back para encontrar user by id
                                                        return <div key={i} className="comment mt-4 text-justify float-left">
                                                            {user.photo === null ?
                                                                <img src={require('./../../assets/img/perfil-empty.png')} alt="" className="rounded-circle" width="40" height="40" />
                                                                :
                                                                <img src="" alt="" className="rounded-circle" width="40" height="40" />
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
                                            :
                                            <p>No hay comentarios</p>
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                    <Footer />
                </div>
            )
    );
}

export default Capitulo;