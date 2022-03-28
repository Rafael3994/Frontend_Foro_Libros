import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LibroService from "./../../services/libros.service"
import {
    saveLibros,
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
                dispatch(saveLibros(response));
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
                    <div>
                        <br></br>
                        <h3>{withoutLibros}</h3>
                    </div>
                )
            }
            <div className='row container margin-auto mb-5'>
                {
                    typeof libros !== 'string' && (
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