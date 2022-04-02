import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import UserService from "../../services/user.service";

import Banner from '../presentational/Banner';
import Footer from '../presentational/Footer';
import TodosLibros from './TodosLibros';

import LibroService from "./../../services/libros.service"
import {
    saveLibros,
} from "./../../services/redux/actions/libros";

import {
    saveUser,
} from "./../../services/redux/actions/user.js";

import {
    saveIsAdmin,
} from "./../../services/redux/actions/session.js";

function PaginaLibro(props) {

    const dispatch = useDispatch();

    const [isToken, setIsToken] = useState(UserService.getCurrentUser() !== null);
    const [isLoaded, setIsLoaded] = useState(false);
    const { session } = useSelector(state => state);

    useEffect(async () => {
        try {
            let responseUser = await UserService.getUser();
            if (responseUser.data) {
                dispatch(saveUser(responseUser.data))
                dispatch(saveIsAdmin(responseUser.data.roles.includes('admin')))
            }
            let response = await LibroService.allLibros();
            if (response.length > 0) {
                dispatch(saveLibros(response));
            }
        } catch (error) {
        }
    }, []);

    return (
        <div>
            {
                !isToken ?
                    <Navigate to="/" />
                    :
                    session.isAdmin ?
                        <Navigate to="/loadingpage" />
                        :
                        <div>
                            <Banner />
                            <TodosLibros />
                            <Footer />
                        </div>
            }
        </div>
    );
}

export default PaginaLibro;