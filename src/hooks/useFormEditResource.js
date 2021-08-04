import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { actualizarRecurso, crearRecurso } from '../redux/actions/resourceAction'
import Swal from "sweetalert2";

export const useFormEditResource = (initialState = {}) => {
    const dispatch = useDispatch()
    // const history = useHistory();
    const [valuesResource, setValuesResource] = useState(initialState);

    const {
        auth: { userData },
    } = useSelector((state) => state);

    const handleInputChangeResource = ({ target }) => {
        setValuesResource({
            ...valuesResource,
            [target.name]: target.value
        });
    }
    const resetValues = () => {
        setValuesResource(initialState);
    }
    const mostrarAlertaOk = () => {
        return Swal.fire({
            title: "Recurso Actualizado con éxito!",
            icon: "success",
        });
    }
    const mostrarAlertaError = () => {
        return Swal.fire({
            title: "No se pudo editar el recurso!",
            icon: "error",
        });
    }
    const sendDataResource = (id, tags) => {
        if (valuesResource.title !== "" && valuesResource.description !== "" && valuesResource.language !== "" &&
            valuesResource.platform !== "" && valuesResource.country !== "" && valuesResource.specialty !== "" &&
            valuesResource.category !== "" && valuesResource.university !== "" && valuesResource.licence) {
            valuesResource.tags = tags;
            dispatch(actualizarRecurso(valuesResource, id, userData.token, resetValues, mostrarAlertaOk, mostrarAlertaError));
        }
    }

    return [valuesResource, handleInputChangeResource, sendDataResource, setValuesResource];
}