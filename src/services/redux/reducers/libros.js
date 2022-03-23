import {
    SAVE_LIBROS,
    FETCH_LIBROS_SUCCESS,
    FETCH_LIBROS_FAIL
} from "./../actions/types.js";

export function librosReducer (libros = [], action) {
    const { type, payload } = action; 

    switch (type) {
        case SAVE_LIBROS:
            return payload;
        case FETCH_LIBROS_SUCCESS:
            return payload;
        case FETCH_LIBROS_FAIL:
            console.log("payload ", libros);
            return libros;
        default:
            return libros;
    }
};