import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Banner from '../presentational/Banner';


function Capitulo(props) {
    
    const { libros } = useSelector(state => state);
    const { idLibro, idCap } = useParams();
    
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        try {

        } catch (error) {
        }
    }, []);

    return (
        <div>
            <Banner />
            <h1>{idLibro}</h1>
            <h1>{idCap}</h1>
            
        </div>
    );
}

export default Capitulo;