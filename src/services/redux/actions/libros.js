import {
    SAVE_LIBROS,
    FETCH_LIBROS_SUCCESS,
    FETCH_LIBROS_FAIL
} from "./types";

import LibrosService from "./../../libros.service";


export const fetchLibros = (libros) => {
    return {
        type: SAVE_LIBROS,
        payload: libros,
    };
    // return (dispatch) => {
    //     try {
    //         return {
    //             type: SAVE_LIBROS,
    //             payload: libros,
    //         };
    //     } catch (err) {
    //         console.log(err);
    //         // dispatch(setError(err));
    //     }
    // }
};

export const fetchLibrosSuccess = (rentals) => {
    try {
        // console.log("pedidos ", pedidos);
        // return {
        //     type: FETCH_RENTALS_SUCCESS,
        //     payload: rentals,
        // };
    } catch (err) {
        console.log(err);
    }
};

export const fetchRentalsError = (error) => {
    try {
        // console.log("pedidos ", pedidos);
        // return {
        //     type: FETCH_RENTALS_SUCCESS,
        //     payload: error,
        // };
    } catch (err) {
        console.log(err);
    }
};