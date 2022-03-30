import axios from "axios";
import { URL_API } from "../variablesGlobales"

const API_URL = URL_API+'lenguage/';

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
