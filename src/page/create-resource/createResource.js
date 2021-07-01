import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormCreateResource } from '../../hooks/useFormCreateResource';
import './createResource.css'
import Formulario from './formulario';

const CreateResource = () => {

  const {
    resources: { fetching, msgError },
  } = useSelector((state) => state);


  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const [valuesResource, handleInputChangeResource, sendDataResource] = useFormCreateResource({
    title: "",
    description: "",
    language: "",
    plataform: "",
    country: "",
    specialty: "",
    category: "",
    university: "",
  })

  const {
    title,
    description,
    language,
    plataform,
    country,
    specialty,
    category,
    university,
  } = valuesResource;
  return (
    <>
      <div className="container mt-container">
        <h3 className="title-resource" >Crear Recurso</h3>
        <Formulario
          title={title}
          category={category}
          country={country}
          description={description}
          language={language}
          plataform={plataform}
          specialty={specialty}
          university={university}
          onChange={handleInputChangeResource}
          setTag={setTag}
          setTags={setTags}
          tag={tag}
          tags={tags}
        />
      </div>
      {
        msgError ?
          <div className="container-error">
            <p>{msgError}</p>
          </div>
          : <></>
      }
      <div className="footer">
        <div className="btn-guardar" onClickCapture={sendDataResource} >
          <p> {fetching ? "Guardando..." : "Guardar"}</p>
        </div>
      </div>

    </>
  );
}

export default CreateResource;