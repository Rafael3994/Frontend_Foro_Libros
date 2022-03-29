import axios from "axios";
import authHeader from './auth-header';

// TODO: cambiar
const API_URL = 'http://localhost:5000/user/';

class UserService {
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('userToken'));;
    }

    deleteUserByID(idUser) {
        try {
            return axios.delete(API_URL + "deleteuserbyid", {
                headers: authHeader(),
                data: {
                    idUser: idUser
                }
            })
                .then((response) => {
                    return Promise.resolve(response.data);
                }).catch(() => {
                    return Promise.reject(false);
                });
        } catch (error) {
            console.log(error);
        }

    }

    getAllUsers() {
        try {
            return axios.get(API_URL + 'allusers', { headers: authHeader() })
                .then((res) => {
                    return Promise.resolve(res.data);
                }).catch((error) => {
                    return Promise.reject(error);
                });
        } catch (error) {
            return error;
        }
    }

    addAdmin(idUser) {
        try {
            return axios.put(API_URL + 'newadmin', {
                idUser: idUser
            }, { headers: authHeader() }).then(response => {
                if (response) {
                    return Promise.resolve(response.data);
                } else {
                    return Promise.resolve(false);
                }
            }).catch((error) => {
                return error;
            });
        } catch (error) {
            console.log(error);
        }
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
                    return { response: response.data, status: true };
                } else {
                    return false;
                }
            }).catch((error) => {
                return error;
            });
            return res;

        } catch (error) {
            console.log(error);
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
