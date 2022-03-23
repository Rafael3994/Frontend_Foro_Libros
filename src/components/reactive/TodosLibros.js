import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from "react-redux";

import LibroService from "./../../services/libros.service"
import {
    fetchLibros,
    fetchLibrosSuccess,
    fetchRentalsError
} from "./../../services/redux/actions/libros";

function TodosLibros(props) {
    const dispatch = useDispatch();
    const { libros } = useSelector(state => state);

    const [withoutLibros, setWithoutLibros] = useState(null);

    useEffect(async () => {
        try {
            let response = await LibroService.allLibros();
            if (typeof response === 'string' || response instanceof String) {
                setWithoutLibros(response);
            } else if (response.length > 0){
                console.log(response);
                dispatch(fetchLibros(response));
            }
        } catch (error) {
        }
    }, []);

    return (
        <div className='mx-5 mt-5'>
            <h2>Libros</h2>
            {
                withoutLibros && (
                    <di>
                        <br></br>
                        <h3>{withoutLibros}</h3>
                    </di>
                )
            }
            {libros && (
                <h3>{libros[0].nombre}</h3>   
            )}
        </div>
    );
}

export default TodosLibros;