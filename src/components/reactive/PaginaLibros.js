import React, { useState } from 'react';
import {Navigate } from "react-router-dom";

import UserService from "../../services/user.service";

import Banner from '../presentational/Banner';
import Footer from '../presentational/Footer';
import TodosLibros from './TodosLibros';

function PaginaLibro(props) {

    const [isToken, setIsToken] = useState(UserService.getCurrentUser() !== null);

    return (
        <div>
            {
                !isToken ?
                    <Navigate to="/" />
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