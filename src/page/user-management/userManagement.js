import React from 'react';
import { useSelector } from 'react-redux';
import { useFormUserManagement } from '../../hooks/useFormUserManagement';
import './userManagement.css'

const UserManagement = () => {
    const [valuesResource, handleInputChangeResource, sendDataResource, handleBlur] = useFormUserManagement({
        email: "",
        name: "",
        telefono: "",
        rol: "",
        password: "",
        repassword: "",
        error: ""
    })
    const {
        auth: { fetching, msgError },
    } = useSelector((state) => state);
    const {
        email,
        name,
        telefono,
        rol,
        password,
        repassword,
        error
    } = valuesResource;
    return (
        <div className="conatinerManagement">
            {
                error !== "" ?
                    <div className="container-errorUser">
                        <p>{error}</p>
                    </div>
                    : <></>
            }
            {
                msgError ?
                    <div className="container-errorUser">
                        <p>{msgError}</p>
                    </div>
                    : <></>
            }
            <div className="titlte-user">
                <h3>Gestión</h3>
                <span>De Usuarios</span>
            </div>
            <div className="title-sectionUser">
                <h4>Crear Cuenta</h4>
            </div>
            <div className="container-formUser">
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name="name" placeholder="Nombre del usuario" value={name} onChange={handleInputChangeResource} />
                    <label htmlFor="email">Correo</label>
                    <input type="email" name="email" placeholder="ejemplo@ejemplo.com" value={email} onChange={handleInputChangeResource} />
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" placeholder="*****************" value={password} onChange={handleInputChangeResource} />
                    <label htmlFor="repassword">Repite la Contraseña</label>
                    <input type="password" name="repassword" placeholder="*****************" value={repassword} onChange={handleInputChangeResource} onBlur={handleBlur} />
                </div>
                <div>
                    <label htmlFor="telefono">Teléfono</label>
                    <input type="text" name="telefono" placeholder="098*******" value={telefono} onChange={handleInputChangeResource} />
                    <label htmlFor="telefono">Tipo Usuario</label>
                    <div className="container-tipoUsuario">
                        <div>
                            <input type="radio" id="admin" name="rol" value="admin" onChange={handleInputChangeResource} />
                            <label for="admin">Administrador</label>
                        </div>
                        <div>
                            <input type="radio" id="colaborador" name="rol" value="colaborador" onChange={handleInputChangeResource} />
                            <label for="colaborador">Colaborador</label>
                        </div>
                    </div>

                </div>
            </div>
            <div className="container-btnCrear">
                <div className="btnCrear" onClickCapture={() => {
                    if (!fetching) {
                        sendDataResource();
                    }
                }}>
                    {
                        fetching ?
                            "Creandu Usuario..."
                            : "Crear Cuenta"
                    }
                </div>
            </div>
        </div>
    );
}

export default UserManagement;