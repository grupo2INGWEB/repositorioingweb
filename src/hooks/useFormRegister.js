import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { registerUser } from '../redux/actions/authAction'

export const useFormRegister = (initialState = {}) => {
    const dispatch = useDispatch()
    const history = useHistory();
    const [values, setValues] = useState(initialState);


    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    }
    const handleBlur = () => {
        if (values.password !== values.repassword) {
            setValues({
                ...values,
                errorRegister: "Las contraseñas no son iguales."
            })
        } else {
            setValues({
                ...values,
                errorRegister: ""
            })
        }
    }
    const sendDataRegister = () => {
        if (values.errorRegister === "") {
            if (values.email !== "" && values.name !== "" && values.password !== "") {
                dispatch(registerUser(values.email, values.password, values.name, "internauta", history))
            }
        }
    }

    return [values, handleInputChange, handleBlur, sendDataRegister];
}