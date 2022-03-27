import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import UserService from "../../services/user.service";

import Banner from '../presentational/Banner';
import Footer from '../presentational/Footer';
import TodosLibros from './TodosLibros';

function PaginaLibro(props) {

    const [isToken, setIsToken] = useState(UserService.getCurrentUser() !== null);
    const { session } = useSelector(state => state);


    return (
        <div>
            {
                !isToken ?
                    <Navigate to="/" />
                    :
                    session.isAdmin ?
                        <Navigate to="/admin/libros" />
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