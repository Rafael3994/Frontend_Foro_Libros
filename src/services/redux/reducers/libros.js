import {
    SAVE_LIBROS,
} from "./../actions/types.js";

export function librosReducer(libros = [], action) {
    const { type, payload } = action;

    switch (type) {
        case SAVE_LIBROS:
            return payload;
        default:
            return libros;
    }
};