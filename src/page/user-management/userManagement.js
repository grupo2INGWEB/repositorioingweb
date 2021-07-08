import React from 'react';

const UserManagement = () => {
    return (
        <div className="conatinerManagement">
            <div className="titlte-user">
                <h3>Gestión <span>De Usuarios</span> </h3>
            </div>
            <div className="title-sectionUser">
                <h4>Crear Cuenta</h4>
            </div>
            <div className="container-formUser">
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name="name" placeholder="Nombre del usuario" />
                    <label htmlFor="email">Correo</label>
                    <input type="email" name="email" placeholder="ejemplo@ejemplo.com" />
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" placeholder="*****************" />
                    <label htmlFor="repassword">Repite la Contraseña</label>
                    <input type="password" name="repassword" placeholder="*****************" />
                </div>
                <div>
                    <label htmlFor="telefono">Teléfono</label>
                    <input type="text" name="telefono" placeholder="098*******" />
                    <label htmlFor="telefono">Tipo Usuario</label>

                </div>
            </div>
            <div className="container-btnCrear">
                <div className="btnCrear">
                    Crear Cuenta
                </div>
            </div>
        </div>
    );
}

export default UserManagement;