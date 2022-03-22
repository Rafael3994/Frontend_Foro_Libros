import axios from "axios";

// TODO: cambiar
const API_URL = 'http://localhost:5000/lenguage/';

class LenguageService {

    changeLenguage = (lenguage) => {
        return axios.get(API_URL + lenguage).then(res => {
            return Promise.resolve(res);
        }).catch(error => {
            return Promise.reject(error);
        })
    }

}

export default new LenguageService();
