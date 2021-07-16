import React, { useEffect, useState } from 'react';
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

  const [valuesResource, handleInputChangeResource, sendDataResource, setValuesResource, agregarArchivo] = useFormCreateResource({
    title: "",
    description: "",
    language: "",
    platform: "",
    country: "",
    specialty: "Educación Infantil",
    category: "",
    university: "",
    // archivo: null
  })

  const {
    title,
    description,
    language,
    platform,
    country,
    specialty,
    category,
    university,
    // archivo
  } = valuesResource;

  useEffect(() => {
    setValuesResource({
      ...valuesResource,
      tags
    })
  }, [tags])

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
          platform={platform}
          specialty={specialty}
          university={university}
          onChange={handleInputChangeResource}
          setTag={setTag}
          setTags={setTags}
          tag={tag}
          tags={tags}
          agregarArchivo={agregarArchivo}
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