import clienteAxios from '../../config/axios';
import {
    REGISTER_USER,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOGIN_USUARIO,
    LOGIN_USUARIO_ERROR,
    LOGIN_USUARIO_SUCCESS,
    CERRAR_SESION
} from '../../types/types'

export const startLoginEmailPass = (email, password, closeModal) => {
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
                localStorage.setItem("userData", JSON.stringify(resp.data))
                closeModal()
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
                history.replace("/");
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

export const cerrarSesion = () => {
    return (dispatch) => {
        dispatch({
            type: CERRAR_SESION
        })
    }
}
