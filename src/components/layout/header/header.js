import React, { useCallback, useState } from 'react';
import './header.css';
import { Link, useHistory } from "react-router-dom"
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '25%'
    }
};
const custom2Styles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '35%'
    }
};
Modal.setAppElement('#root');

const LayoutHeader = props => {
    const isAdmin = false;

    const history = useHistory();

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modal2IsOpen, setIsOpen2] = useState(false);

    function openModal() {
        setIsOpen(true);
    }
    function openModalRegister() {
        setIsOpen2(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    function closeModal2() {
        setIsOpen2(false);
    }

    // Función para escuchar cambios en el select de recurso
    const handleChangeRecurso = useCallback((itemSelected) => {
       
        switch (itemSelected) {
            case 0:
                // Redirigir a los recursos (Home)
                history.push('/');
                break;
            case 1:
                // Redirigir a Crear recurso
                history.push('/create-resource');
                break;
            case 2:
                // Redirigir a Mis recursos
                history.push('/my-resource');
                break;

            default:
                break;
        }
    },[history]);



    return (
        <>
            <header>
                <div className="logo">
                    <Link to='/'>Logo</Link>
                </div>
                <nav>
                    <ul className="ul-nav">
                        <li>
                            <p>Recursos <i class="fas fa-sort-down"></i></p>
                            <ul>
                                <li onClickCapture={()=>handleChangeRecurso(1)} >Crear Recurso</li>
                                <li onClickCapture={()=>handleChangeRecurso(2)}>Mis Recursos</li>
                                {/* En caso de ser admin saldrá esta opcion */}
                                {
                                    isAdmin ?
                                        <li >Recursos Pendientes</li> :
                                        <></>
                                }
                            </ul>

                        </li>
                        <li>
                            <p>Especialidad <i class="fas fa-sort-down"></i></p>
                            <ul>
                                <li >Educaciónn Infantil</li>
                                <li >Educaciónn Primaria</li>
                                <li >Educaciónn Secundaria</li>
                                <li >Educaciónn Superior</li>
                                <li >Mis Recursos</li>
                                {/* En caso de ser admin saldrá esta opcion */}
                                {
                                    isAdmin ?
                                        <li >Recursos Pendientes</li> :
                                        <></>
                                }
                            </ul>

                        </li>
                        <li><a href="/#" onClickCapture={() => {
                            history.push('/all-resource', 'Más Valorados');
                            window.scroll({
                                top: 0
                            })
                        }} >Más Valorado</a></li>
                        <li><a href="/#" onClickCapture={() => {
                            history.push('/all-resource', 'Recomendados');
                            window.scroll({
                                top: 0
                            })
                        }}>Recomendados</a></li>
                        <li><a href="/#" onClickCapture={() => {
                            history.push('/all-resource', 'Recientes');
                            window.scroll({
                                top: 0
                            })
                        }}>Recientes</a></li>
                        <li><i className="fas fa-search" ></i></li>
                        <li><i className="fas fa-sign-out-alt" onClickCapture={openModal}></i></li>
                    </ul>
                </nav>
            </header>
            {props.children}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Login"
            >
                <div className="container-login">
                    <h2>Repositorio</h2>
                    <strong>Correo</strong>
                    <input type="email" name="email" id="email" placeholder="Correo" />
                    <strong>Contraseña</strong>
                    <input type="password" name="password" id="password" placeholder="Contraseña" />
                    <button className="btn-ingresar">Ingresar</button>
                    <button onClickCapture={() => {
                        closeModal();
                        openModalRegister();
                    }} className="btn-pass" >Registrarse</button>
                </div>
            </Modal>
            <Modal
                isOpen={modal2IsOpen}
                onRequestClose={closeModal2}
                style={custom2Styles}
                contentLabel="Login"
            >
                <div className="container-login">
                    <h2>Registro</h2>
                    <strong>Nombre</strong>
                    <input type="text" name="name" id="name" placeholder=" Tu Nombre" />
                    <strong>Correo</strong>
                    <input type="email" name="email" id="email" placeholder="Correo" />
                    <strong>Contraseña</strong>
                    <input type="password" name="password" id="password" placeholder="Contraseña" />
                    <button className="btn-ingresar">Registrarse</button>
                    <button
                        onClickCapture={() => {
                            closeModal2();
                            openModal();
                        }}
                        className="btn-pass" >Iniciar Sesión</button>
                </div>
            </Modal>

        </>
    );
}

export default LayoutHeader;