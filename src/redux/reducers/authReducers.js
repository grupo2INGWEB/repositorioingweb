import { bindActionCreators } from 'redux'
import {
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USUARIO,
    LOGIN_USUARIO_ERROR,
    LOGIN_USUARIO_SUCCESS,
    CERRAR_SESION
} from '../../types/types'

const initialState = {
    fetching: false,
    msgError: null,
    userData: JSON.parse(localStorage.getItem("userData")) || null,
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                fetching: true,
                msgError: null,
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                fetching: false,
                msgError: null,
                userData: action.payload
            }
        case REGISTER_USER_ERROR:
            return {
                ...state,
                fetching: false,
                msgError: action.payload,
                userData: null
            }
        case LOGIN_USUARIO:
            return {
                ...state,
                fetching: true,
                msgError: null,
            }
        case LOGIN_USUARIO_SUCCESS:
            return {
                ...state,
                fetching: false,
                msgError: null,
                userData: action.payload
            }
        case LOGIN_USUARIO_ERROR:
            return {
                ...state,
                fetching: false,
                msgError: action.payload,
                userData: null
            }
        case CERRAR_SESION:
            return initialState;

        default:
            return initialState;
    }
}