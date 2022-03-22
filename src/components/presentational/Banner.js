import React from 'react';
import LenguageService from "./../../services/lenguage.service";
import Swal from 'sweetalert2'

function Banner(props) {

    const changeLenguage = async (e) => {
        try {
            const result = await LenguageService.changeLenguage(e.target.name);
            if (result.status === 200) {
                Swal.fire(result.data);
            }
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className='banner'>
            <a name="home"></a>
            <div className='lenguage'>
                <a name='en' onClick={changeLenguage}>EN</a>
                <a name='cat' onClick={changeLenguage}>CAT</a>
                <a name='es' onClick={changeLenguage}>ES</a>
            </div>
            <h1>Club de lectura</h1>
        </div>
    );
}

export default Banner;