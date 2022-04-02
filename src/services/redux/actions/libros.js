import {
    SAVE_LIBROS,
} from "./types";

export const saveLibros = (libros) => {
    return {
        type: SAVE_LIBROS,
        payload: libros,
    };
};