import axios from "axios";

import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/libro/';

class LibroService {

    async allLibros() {
        return axios.get(API_URL + "alllibros", { headers: authHeader() })
            .then((response) => {
                return Promise.resolve(response.data);
            }).catch(() => {
                return Promise.reject(false);
            });
    }

}

export default new LibroService;