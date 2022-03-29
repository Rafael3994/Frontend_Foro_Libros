import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';

import LibroService from "./../../services/libros.service"

import Banner from '../presentational/Banner';
import Footer from '../presentational/Footer';

function NewLibro(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { session } = useSelector(state => state);

    const [formData, setFormData] = useState({
        nameLibro: "",
        autorLibro: "",
        fechaPublicacionLibro: "",
        caraturaLibro: "",
        descripcionLibro: "",
        pagLibro: ""
    });

    const [capitulosLibro, setCapitulosLibro] = useState([]);
    const [newCapitulo, setNewCapitulo] = useState("");



    const goBack = () => {
        navigate('/admin/libros');
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await LibroService.addLibro(
                formData.nameLibro,
                formData.autorLibro,
                formData.descripcionLibro,
                formData.fechaPublicacionLibro,
                formData.caraturaLibro,
                formData.pagLibro,
                capitulosLibro
            )
            if (response) {
                toast.success('Libro Creado.');
            }
        } catch (error) {
            toast.error('El libro no se pudo crear.');
            console.log(error);
        }
    }

    const añadirCapitulo = () => {
        try {
            setNewCapitulo("");
            setCapitulosLibro([...capitulosLibro, newCapitulo]);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteCapitulo = (e) => {
        try {
            e.preventDefault();
            const ActCapitulosLibro = capitulosLibro.filter((capitulo) => {
                if (capitulo !== e.target.name) {
                    return capitulo;
                }
            })
            setCapitulosLibro(ActCapitulosLibro)
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleChangeNewCapitulo = (e) => {
        setNewCapitulo(e.target.value)
    }

    return (
        <div>
            {
                !session.isAdmin && (
                    <Navigate to="/libros" />
                )
            }
            <Banner />
            <Toaster position="top-right" />
            <div >
                <img onClick={goBack} className="goBack pointer-cursor" src={require('./../../assets/img/flecha.png')} alt='flecha' />
            </div>
            <div className='mx-5 mt-5'>
                <h1>Añadir Libro</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='row mt-5'>
                            <div className='col-5 mx-5'>
                                <label>Nombre: </label>
                                <input value={formData.nameLibro} onChange={handleChange} type="text" className="form-control" name="nameLibro" />
                                <br></br>
                                <label>Fecha de publicacion: </label>
                                <input value={formData.fechaPublicacionLibro} onChange={handleChange} type="date" className="form-control" name="fechaPublicacionLibro" />
                                <br></br>
                                <label>Paginas: </label>
                                <input value={formData.pagLibro} onChange={handleChange} type="text" className="form-control" name="pagLibro" />
                                <br></br>
                            </div>
                            <div className='col-5 mx-5'>
                                <label>Autor: </label>
                                <input value={formData.autorLibro} onChange={handleChange} type="text" className="form-control" name="autorLibro" />
                                <br></br>
                                <label>Caratula: </label>
                                <input value={formData.caraturaLibro} onChange={handleChange} type="text" className="form-control" name="caraturaLibro" />
                                <br></br>
                            </div>
                            <div className='col-11 mx-5'>
                                <label>Descripcion: </label>
                                <textarea rows="5" value={formData.descripcionLibro} onChange={handleChange} type="text" className="form-control" name="descripcionLibro" />
                                <br></br>
                            </div>
                            <div className='col-5 mx-5'>
                                <label>Capitulo: </label>
                                <input value={newCapitulo} onChange={handleChangeNewCapitulo} type="text" className="form-control" name="newCapitulo" />
                                <br></br>
                            </div>
                            <div className='col-5'>
                                <br></br>
                                <button onClick={añadirCapitulo} type="button" className="btn btn-outline-success btn-sm">Añadir</button>
                            </div>
                            <div className='mx-5'>
                                <table className="table-light mx-3 w-25">
                                    {
                                        capitulosLibro.map((capitulo, i) => {
                                            return <tr key={i}>
                                                <td>{capitulo}</td>
                                                <td className='mx-4'>
                                                    <button onClick={deleteCapitulo} name={capitulo} type="button" className="btn btn-outline-danger btn-sm">Eliminar</button>
                                                </td>
                                            </tr>
                                        })
                                    }
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                        <br></br><br></br>
                        <button type="submit" className="btn btn-primary margin-right-7">Crear</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default NewLibro;