import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import {
    create_user
} from '../redux/actions/authAction'
import Swal from "sweetalert2";

export const useFormUserManagement = (initialState = {}) => {
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
            title: "Usuario Creado con éxito!",
            icon: "success",
        });
    }
    const mostrarAlertaError = () => {
        return Swal.fire({
            title: "Error al crear usuario!",
            icon: "error",
        });
    }
    const handleBlur = () => {
        if (valuesResource.password !== valuesResource.repassword) {
            setValuesResource({
                ...valuesResource,
                error: "Las contraseñas no son iguales."
            })
        } else {
            setValuesResource({
                ...valuesResource,
                error: ""
            })
        }
    }
    const sendDataResource = () => {
        if (valuesResource.error === "") {
            if (valuesResource.name !== "" && valuesResource.email !== "" && valuesResource.telefono !== "" &&
                valuesResource.rol !== "" && valuesResource.password !== "") {
                setValuesResource({
                    ...valuesResource,
                    error: ""
                })
                dispatch(create_user(valuesResource, userData.token, resetValues, mostrarAlertaOk, mostrarAlertaError));
            } else {
                setValuesResource({
                    ...valuesResource,
                    error: "Hay Datos Vacío. Rellena todos los campos."
                })
                setTimeout(() => {
                    setValuesResource({
                        ...valuesResource,
                        error: ""
                    })
                }, 5000)
            }

        }
    }

    return [valuesResource, handleInputChangeResource, sendDataResource, handleBlur];
}