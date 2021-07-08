import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
// import { useHistory } from 'react-router';
import { startLoginEmailPass } from '../redux/actions/authAction'

export const useFormLogin = (initialState = {}) => {

    const dispatch = useDispatch()
    const history = useHistory();
    const [valuesLogin, setValuesLogin] = useState(initialState);


    const handleInputChangeLogin = ({ target }) => {
        setValuesLogin({
            ...valuesLogin,
            [target.name]: target.value
        });
    }
    const sendDataLogin = (closeModal) => {
        if (valuesLogin.errorLogin === "") {
            console.log("")
            if (valuesLogin.email2 !== "" && valuesLogin.password2 !== "") {
                dispatch(startLoginEmailPass(valuesLogin.email2, valuesLogin.password2, closeModal, history))
            }
        } else {
            setValuesLogin({
                ...valuesLogin,
                errorLogin: "Existen errores. Revisa tus credenciales."
            })
        }
    }

    return [valuesLogin, handleInputChangeLogin, sendDataLogin];
}