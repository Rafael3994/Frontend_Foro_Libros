import React, { useState, useEffect} from 'react';
import { Link, Navigate } from "react-router-dom";
import NavbarWithLogin from '../presentational/NavbarWithLogin';
import Banner from '../presentational/Banner';
import UserService from "../../services/user.service";

function PaginaLibro(props) {

    const [isToken, setIsToken] = useState(UserService.getCurrentUser() !== null);

    return (
        <div>
            {!isToken && (
                <Navigate to="/" />
            )}
            <NavbarWithLogin setIsToken={setIsToken}/>
            <Banner />
            <h1>Libros</h1>
        </div>
    );
}

export default PaginaLibro;