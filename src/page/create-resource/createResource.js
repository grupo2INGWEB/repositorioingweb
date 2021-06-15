import React from 'react';
import './createResource.css'
import Formulario from './formulario';

const CreateResource = () => {
  return (
    <>
      <div className="container mt-container">
        <h3 className="title-resource" >Crear Recurso</h3>
        <Formulario />
      </div>
      <div className="footer">
        <div className="btn-guardar">
          <p>Guardar</p>
        </div>
      </div>

    </>
  );
}

export default CreateResource;