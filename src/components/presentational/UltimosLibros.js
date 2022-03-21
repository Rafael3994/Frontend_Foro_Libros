import React from 'react';
import { Link, Navigate, Outlet } from "react-router-dom";


function UltimosLibros(props) {
    return (
        <div className='mx-5 m-5'>
            <a name='utlimosLibros'></a>
            <h2>Ultimos libros añadidos</h2>
            <div className='containerCards'>
                <div className="card">
                    <img class="card-img-top" src="https://4.bp.blogspot.com/-uLBbdVYOmBI/VyRyCDJuGwI/AAAAAAAAM8M/ulP_2-hNvN8dhqWhxEUa_qqqtWdBsPLlQCLcB/s1600/El-imperio-final.jpg" alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-text">Mistborn <br></br>El imperio final</h5>
                    </div>
                </div>
                <div className="card">
                    <img class="card-img-top" src="https://www.planetadelibros.com/usuaris/libros/fotos/300/m_libros/portada_el-ojo-del-mundo-n-0114_robert-jordan_201910151031.jpg" alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title">La rueda del tiempo <br></br>El ojo del mundo</h5>
                    </div>
                </div>
                <div className="card">
                    <img class="card-img-top" src="https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg" alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title">Harry Potter<br></br>y la piedra filosofal</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UltimosLibros;