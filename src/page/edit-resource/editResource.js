import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useFormEditResource } from '../../hooks/useFormEditResource';
import Formulario from './formulario';

const EditResource = () => {
  const history = useHistory();
  const {
    resources: { fetching, msgError, singleResource },
  } = useSelector((state) => state);
  const redirigir = () => {
    history.replace("/");
  }

  if (!singleResource) {
    console.log("=====> REDIRIGIR NO EXISTE RECURSO")
    redirigir()
  }


  const [tag, setTag] = useState("");
  const [tags, setTags] = useState(singleResource?.tags ?? []);

  const [valuesResource, handleInputChangeResource, sendDataResource, setValuesResource] = useFormEditResource({
    title: singleResource?.title,
    description: singleResource?.description,
    language: singleResource?.language,
    platform: singleResource?.platform,
    country: singleResource?.country,
    specialty: singleResource?.specialty,
    category: singleResource?.category,
    university: singleResource?.university,
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
  } = valuesResource;



  useEffect(() => {
    if (!singleResource) {
      console.log("=====> REDIRIGIR NO EXISTE RECURSO")
      redirigir()
    } else {
      window.scroll({
        top: 0
      })

    }
  }, [singleResource])

  useEffect(() => {
    setValuesResource({
      ...valuesResource,
      tags
    })
  }, [tags])
  return (
    <>
      <div className="container mt-container">
        <h3 className="title-resource">Editar Recurso</h3>
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
          setValuesResource={setValuesResource}
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
        <div className="btn-guardar" onClickCapture={() => sendDataResource(singleResource.id)} >
          <p> {fetching ? "Actualizando..." : "Actualizar"}</p>
        </div>
      </div>

    </>
  );
}

export default EditResource;