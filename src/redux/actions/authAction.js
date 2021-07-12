import clienteAxios from '../../config/axios';
import {
    REGISTER_USER,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOGIN_USUARIO,
    LOGIN_USUARIO_ERROR,
    LOGIN_USUARIO_SUCCESS,
    CERRAR_SESION,
    CREATE_USER,
    CREATE_USER_ERROR,
    CREATE_USER_SUCCESS
} from '../../types/types'
import { obtenerRecursosMasValorados, obtenerRecursosPendientes, obtenerRecursosRecientes, obtenerMisRecursos } from './resourceAction';

export const startLoginEmailPass = (email, password, closeModal, history) => {
    return async (dispatch) => {
        dispatch({
            type: LOGIN_USUARIO,
        })
        try {
            const resp = await clienteAxios.post('auth/', {
                email,
                password
            })
            console.log(resp.data);
            if (resp.data.token) {
                dispatch({
                    type: LOGIN_USUARIO_SUCCESS,
                    payload: resp.data
                })
                localStorage.setItem("userData", JSON.stringify(resp.data));
                obtenerRecursosMasValorados(dispatch);
                obtenerRecursosRecientes(dispatch);
                obtenerMisRecursos(dispatch, resp.data.token);
                if (resp.data.user.rol === "admin") {
                    obtenerRecursosPendientes(dispatch);
                }
                closeModal()
                history.push('/')
            }

        } catch (error) {
            console.log("====> Error al Logearse");
            console.log(error);
            dispatch({
                type: LOGIN_USUARIO_ERROR,
                payload: "Error al iniciar Sesión."
            })
            setTimeout(() => {
                dispatch({
                    type: LOGIN_USUARIO_ERROR,
                    payload: null
                })
            }, 5000)
        }
    }
}

export const registerUser = (email, password, name, rol, history) => {
    return async (dispatch) => {
        dispatch({
            type: REGISTER_USER
        })
        try {
            const resp = await clienteAxios.post('user/', {
                email,
                password,
                name,
                rol
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            console.log("=====> USUARIO REGISTRADO");
            console.log(resp.data)
            // Si el usuario creado es un internauta
            if (resp.data.token) {
                dispatch({
                    type: REGISTER_USER_SUCCESS,
                    payload: resp.data
                })
                localStorage.setItem("userData", JSON.stringify(resp.data))
                history.push("/");
            } else {
                // si el usuario lo creo un admin
                console.log("==> CREADO POR UN ADMIN")
            }

        } catch (error) {
            console.log("=== ERROR AL REGISTRAR USUARIO ===");
            console.log(error);
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: "Error al crear usuario"
            })
            setTimeout(() => {
                dispatch({
                    type: REGISTER_USER_ERROR,
                    payload: null
                })
            }, 5000)
        }
    }
}

export const cerrarSesion = (history) => {
    return (dispatch) => {
        dispatch({
            type: CERRAR_SESION
        })
        history.push('/')
        // obtenerRecursosMasValorados(dispatch);
        // obtenerRecursosRecientes(dispatch);
    }
}
export const create_user = (values, accessToken, resetValues, alertaOk, alertaError) => {
    return async (dispatch) => {
        dispatch({
            type: CREATE_USER
        })
        try {
            const final = await clienteAxios.post('user/', values, {
                headers: {
                    'Authorization': `bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            })
            console.log("===> RESP CREAR USUARIO");
            console.log(final.data);
            dispatch({
                type: CREATE_USER_SUCCESS
            })
            alertaOk()
            resetValues()
        } catch (error) {
            console.log("====> Error al Crear usuario.")
            console.log(error.response);
            dispatch({
                type: CREATE_USER_ERROR,
                payload: "Error al crear usuario"
            })
            alertaError()
            setTimeout(() => {
                dispatch({
                    type: CREATE_USER_ERROR,
                    payload: null
                })
            }, 5000)
        }
    }
}
