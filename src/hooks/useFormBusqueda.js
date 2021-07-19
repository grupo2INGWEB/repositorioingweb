import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { motorDeBusqueda } from '../redux/actions/resourceAction';

export const useFormBusqueda = (initialState = "") => {

    const dispatch = useDispatch()
    const history = useHistory();
    const [valuesMotor, setValuesMotor] = useState(initialState);


    const handleInputChangeMotor = ({ target }) => {
        setValuesMotor(target.value);
    }
    const sendDataMotor = () => {
        if (valuesMotor !== "") {
            dispatch(motorDeBusqueda(valuesMotor, history))
        }
    }

    return [valuesMotor, handleInputChangeMotor, sendDataMotor];
}