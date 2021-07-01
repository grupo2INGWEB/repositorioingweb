import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { crearRecurso } from '../redux/actions/resourceAction'
import Swal from "sweetalert2";

export const useFormCreateResource = (initialState = {}) => {
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
            title: "Recurso Creado con éxito!",
            icon: "success",
        });
    }
    const sendDataResource = () => {
        if (valuesResource.title !== "" && valuesResource.description !== "" && valuesResource.language !== "" &&
            valuesResource.plataform !== "" && valuesResource.country !== "" && valuesResource.specialty !== "" &&
            valuesResource.category !== "" && valuesResource.university !== "") {
            dispatch(crearRecurso(valuesResource, userData.token, resetValues, mostrarAlertaOk));
        }
    }

    return [valuesResource, handleInputChangeResource, sendDataResource];
}