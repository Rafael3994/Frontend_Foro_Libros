import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Accordion } from 'react-bootstrap';

import NavbarWithLogin from '../presentational/NavbarWithLogin';
import Banner from '../presentational/Banner';
import UserService from "../../services/user.service";
import TodosLibros from './TodosLibros';

import LibroService from "./../../services/libros.service"
import {
    fetchLibros,
    fetchLibrosSuccess,
    fetchRentalsError
} from "./../../services/redux/actions/libros";

function Libro(props) {
    const { id } = useParams();
    const { libros } = useSelector(state => state);

    // const dispatch = useDispatch();
    const navigate = useNavigate();

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
        } catch (error) {
        }
    }, []);

    const goBack = () => {
        navigate('/libros');
    }

    const verCapitulo = (e) => {
        navigate(`/libro/${id}/${e.target.getAttribute('datavalue')}`);
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
                                        {
                                            libro.comentarios.length !== 0 ?
                                                <Accordion.Body>
                                                    <ul className="list-group list-group-flush">
                                                        {

                                                            libro.comentarios.map((comentarios, i) => {
                                                                return <div className="comment mt-4 text-justify float-left"> <img src="https://i.imgur.com/yTFUilP.jpg" alt="" className="rounded-circle" width="40" height="40" />
                                                                    <h4>Jhon Doe</h4> <span>- {comentarios.comentario.fecha_publicacion.slice(0, 10)}</span> <br></br>
                                                                    <p>{comentarios.comentario.comentarioDesc}</p>
                                                                </div>
                                                            })
                                                        }
                                                    </ul>
                                                </Accordion.Body>
                                                :
                                                <Accordion.Body>
                                                    <p>No hay comentarios</p>
                                                </Accordion.Body>
                                        }
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