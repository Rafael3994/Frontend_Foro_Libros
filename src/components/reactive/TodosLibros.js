import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";


import LibroService from "./../../services/libros.service"
import {
    fetchLibros,
    fetchLibrosSuccess,
    fetchRentalsError
} from "./../../services/redux/actions/libros";

function TodosLibros(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { libros } = useSelector(state => state);
    const [withoutLibros, setWithoutLibros] = useState(null);
    
    useEffect(async () => {
        try {
            let response = await LibroService.allLibros();
            if (typeof response === 'string' || response instanceof String) {
                setWithoutLibros(response);
            } else if (response.length > 0) {
                dispatch(fetchLibros(response));
            }
        } catch (error) {
        }
    }, []);

    const verLibro = (e) => {
        navigate('/libro/' + e.target.name);
    }

    return (
        <div className='mx-5 mt-5'>
            <h2 className='mb-5'>Libros</h2>
            {
                withoutLibros && (
                    <di>
                        <br></br>
                        <h3>{withoutLibros}</h3>
                    </di>
                )
            }
            <div className='row container margin-auto mb-5'>
                {
                    libros && (
                        libros.map((libro, i) => {
                            return <div key={i} className="col-md-3 mb-5">
                                <div className="card">
                                    <img onClick={verLibro} className="card-img-top pointer-cursor" name={libro._id} src={libro.caratula} alt={libro.nombre} />
                                    <div name={libro._id} className="card-body">
                                        <h5 className="card-title">{libro.nombre}</h5>
                                    </div>
                                </div>
                            </div>
                        })
                    )
                }
            </div>
        </div>
    );
}

export default TodosLibros;