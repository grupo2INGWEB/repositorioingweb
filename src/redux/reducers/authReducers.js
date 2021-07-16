import { bindActionCreators } from 'redux'
import {
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USUARIO,
    LOGIN_USUARIO_ERROR,
    LOGIN_USUARIO_SUCCESS,
    CERRAR_SESION,
    CREATE_USER,
    CREATE_USER_ERROR,
    CREATE_USER_SUCCESS
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
            return {
                ...state,
                fetching: false,
                msgError: null,
                userData: null,
            };
        case CREATE_USER:
            return {
                ...state,
                fetching: true,
                msgError: null
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                fetching: false,
                msgError: null
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                fetching: false,
                msgError: action.payload
            }
        default:
            return state;
    }
}