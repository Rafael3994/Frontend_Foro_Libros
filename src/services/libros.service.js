import axios from "axios";

import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/libro/';

class LibroService {

    allLibros() {
        return axios.get(API_URL + "alllibros", { headers: authHeader() })
            .then((response) => {
                return Promise.resolve(response.data);
            }).catch(() => {
                return Promise.reject(false);
            });
    }

    deleteCommentLibro(idLibro, idComment) {
        return axios.delete(API_URL + "comentariolibro/deletecomentario", {
            headers: authHeader(),
            data: {
                idLibro: idLibro,
                idComentario: idComment
            }
        })
            .then((response) => {
                return Promise.resolve(response.data);
            }).catch(() => {
                return Promise.reject(false);
            });
    }

    deleteCommenCapitulo(idLibro, idCapitulo, idComment) {
        return axios.delete(API_URL + "comentariocap/deletecomentario", {
            headers: authHeader(),
            data: {
                idLibro: idLibro,
                idCapitulo: idCapitulo,
                idComentario: idComment
            }
        })
            .then((response) => {
                return Promise.resolve(response.data);
            }).catch(() => {
                return Promise.reject(false);
            });
    }

    addCommentLibro(idLibro, comentarioDesc) {
        return axios.post(API_URL + "comentariolibro/newcomentario", {
            'idLibro': idLibro,
            'comentarioDesc': comentarioDesc
        }, { headers: authHeader() })
            .then((response) => {
                return Promise.resolve(response.data);
            }).catch(() => {
                return Promise.reject(false);
            });
    }

    addCommentCapitulo(idLibro, idCapitulo, comentarioDesc) {
        return axios.post(API_URL + "comentariocap/newcomentario", {
            'idLibro': idLibro,
            'idCapitulo': idCapitulo,
            'comentarioDesc': comentarioDesc
        }, { headers: authHeader() })
            .then((response) => {
                return Promise.resolve(response.data);
            }).catch(() => {
                return Promise.reject(false);
            });
    }

    editCommentLibro(idLibro, idComentario, comentarioDesc) {
        return axios.put(API_URL + "comentariolibro/editcomentario", {
            'idLibro': idLibro,
            'idComentario': idComentario,
            'comentarioDesc': comentarioDesc
        }, { headers: authHeader() })
            .then((response) => {
                return Promise.resolve(response.data);
            }).catch(() => {
                return Promise.reject(false);
            });
    }

    editCommentCapitulo(idLibro, idCapitulo, idComentario, comentarioDesc) {
        return axios.put(API_URL + "comentariocap/editcomentario", {
            'idLibro': idLibro,
            'idCapitulo': idCapitulo,
            'idComentario': idComentario,
            'comentarioDesc': comentarioDesc
        }, { headers: authHeader() })
            .then((response) => {
                return Promise.resolve(response.data);
            }).catch(() => {
                return Promise.reject(false);
            });
    }

}

export default new LibroService;