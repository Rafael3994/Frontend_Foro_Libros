import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import NavbarWithoutLogin from "./NavbarWithoutLogin";
import Banner from "./Banner";
import Login from "./../reactive/Login";
import UltimosLibros from "./UltimosLibros";
import SobreNosotros from "./SobreNosotros";
import Registrarse from './../reactive/Registrarse';
import Footer from './Footer';

import UserService from "./../../services/user.service";

import {
    saveUser,
} from "./../../services/redux/actions/user";
import {
    saveIsAdmin,
    saveIsToken
} from "./../../services/redux/actions/session";

function Home(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = useState(false);
    //TODO: para mas adelante meter el isToken en la store
    const [isToken, setIsToken] = useState(false);

    useEffect(async () => {
        try {
            setIsToken(UserService.getCurrentUser() !== null);
            if (isToken) {
                let responseUser = await UserService.getUser();
                if (responseUser.data) {
                    dispatch(saveIsAdmin(responseUser.data.roles.includes('admin')))
                    dispatch(saveUser(responseUser.data));
                    return
                }
            }
            setIsLoaded(true);
        } catch (error) {
        }
    }, [isToken]);

    return (
        <div>
            {
                isLoaded && (
                    isToken
                        ?
                        <Navigate to="/loadingpage" />
                        :
                        <div>
                            <NavbarWithoutLogin />
                            <Banner />
                            <UltimosLibros />
                            <Login setIsToken={setIsToken} />
                            <SobreNosotros />
                            <Registrarse setIsToken={setIsToken} />
                            <Footer />
                        </div>
                )
            }
        </div >
    );
}

export default Home;