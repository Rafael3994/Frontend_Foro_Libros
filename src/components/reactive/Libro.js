import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from "react-redux";
import { Link, useParams } from "react-router-dom";


import LibroService from "./../../services/libros.service"
import {
    fetchLibros,
    fetchLibrosSuccess,
    fetchRentalsError
} from "./../../services/redux/actions/libros";

function Libro(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { libros } = useSelector(state => state);

    // useEffect(() => {
    //     try {
    //         // let response = await LibroService.allLibros();
    //         // if (typeof response === 'string' || response instanceof String) {
    //         //     setWithoutLibros(response);
    //         // } else if (response.length > 0) {
    //         //     // console.log(response);
    //         //     dispatch(fetchLibros(response));
    //         // }
    //     } catch (error) {
    //     }
    // }, []);


    return (
        <div className='mx-5 mt-5'>
            <h2>Libros</h2>
            <p>{id}</p>
        </div>
    );
}

export default Libro;