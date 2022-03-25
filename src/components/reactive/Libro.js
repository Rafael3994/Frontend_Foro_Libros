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

    return (
        <div>
            {
                !isToken ?
                    <Navigate to="/" />
                    :
                    isLoaded && (
                        <div>
                            <NavbarWithLogin />
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



                            {/* <Accordion>
                                <Accordion.Item>
                                    <Accordion.Header>Accordion Item #1</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                        est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion> */}





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
                                                            return <li key={i} className="list-group-item list-group-item-action">{capitulo.capitulo.nombreCap}</li>
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
                        </div>
                    )
            }
        </div >
    );
}

export default Libro;