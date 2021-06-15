import React, { useState } from 'react';
import './header.css';
import { Link } from "react-router-dom"
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

    return (
        <>
            <header>
                <div className="logo">
                    <Link to='/'>Logo</Link>
                </div>
                <nav>
                    <ul>
                        <li><Link to='/create-resource'>Crear Recurso</Link></li>
                        <li><Link>Especialidad</Link></li>
                        <li><Link>Mas Valorado</Link></li>
                        <li><Link>Recomendados</Link></li>
                        <li><Link>Recientes</Link></li>
                        <li><i class="fas fa-search" ></i></li>
                        <li><i class="fas fa-sign-out-alt" onClickCapture={openModal}></i></li>
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