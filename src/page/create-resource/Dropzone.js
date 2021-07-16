import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'

const Dropzone = ({ agregarArchivo }) => {

    const onDrop = useCallback((acceptedFiles) => {
        console.log("soltando archivo...");
        console.log(acceptedFiles);
        agregarArchivo(acceptedFiles[acceptedFiles.length - 1])
    }, [])
    // Extraer contenido de dropzone
    const { getRootProps, getInputProps, isDragActive, acceptedFiles, } = useDropzone({ onDrop });

    // const archivos = acceptedFiles.map(archivo => (
    //     <p>{archivo.name}</p>
    // ))

    return (

        <div {...getRootProps({ className: 'dropzone container-dropzone' })} >
            <p>{
                isDragActive ? "Suelta el archivo" : "Seleccionar un archivo"
            }
            </p>
            {
                acceptedFiles.length > 0 ?
                    <div className="container-selectDoc">
                        {acceptedFiles[acceptedFiles.length - 1]?.name}
                    </div> : <></>

            }
            <input {...getInputProps()} />
        </div>
    );
}

export default Dropzone;