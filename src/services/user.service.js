import axios from "axios";
import authHeader from './auth-header';

// TODO: cambiar
const API_URL = 'http://localhost:5000/user/';

class UserService {
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('userToken'));;
    }

    async upadate(name, email, password, photo) {
        try {
            const res = await axios.put(API_URL + 'edituser', {
                'name': name,
                'email': email,
                "password": password,
                "photo": photo
            }, { headers: authHeader() }).then(response => {
                if (response) {
                    return true;
                } else {
                    return false;
                }
            }).catch((error) => {
                return error;
            });
            return res;

        } catch (error) {

        }
    }

    login(email, password) {
        try {
            const res = axios.post(API_URL + 'login', {
                "email": email,
                "password": password
            }).then(response => {
                if (response.data.tokens) {
                    localStorage.setItem("userToken", JSON.stringify(response.data.tokens[response.data.tokens.length - 1].token));
                    return Promise.resolve(true);
                } else {
                    return Promise.resolve(response);
                }
            }).catch((error) => {
                return error;
            });
            return res;
        } catch (error) {
        }
    }

    register(email, password, name) {
        try {
            return axios.post(API_URL + "register", {
                "name": name,
                "email": email,
                "password": password
            }).then((res) => {
                return Promise.resolve(res);
            }).catch((err) => {
                return Promise.resolve(err);
            });
        } catch (error) {
        }
    }

    async logout() {
        try {
            const response = await axios.get(API_URL + 'logout', { headers: authHeader() })
            if (response.request.status === 200) {
                localStorage.removeItem('userToken');
                return true;
            } else if (response.request.status === 401) {
                return false;
            }
        } catch (error) {
        }
    }

    getUser() {
        try {
            return axios.get(API_URL + 'getuser', { headers: authHeader() })
                .then(response => {
                    return Promise.resolve(response);
                }).catch(error => {
                    return Promise.reject(error);
                })
        } catch (error) {

        }
    }

    deleteUser() {
        try {
            return axios.delete(API_URL + "deleteuser", { headers: authHeader() })
                .then((response) => {
                    return Promise.resolve(true);
                }).catch(() => {
                    return Promise.reject(false);
                });
        } catch (error) {

        }
    }

}

export default new UserService();
