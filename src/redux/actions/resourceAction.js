import clienteAxios from '../../config/axios';
import {
    CREATE_RESOURCE,
    CREATE_RESOURCE_ERROR,
    CREATE_RESOURCE_SUCCESS,
    GET_MY_RESOURCES,
    GET_MY_RESOURCES_ERROR,
    GET_MY_RESOURCES_SUCCESS,
    CERRAR_SESION,
    GET_PENDING_RESOURCES,
    GET_PENDING_RESOURCES_ERROR,
    GET_PENDING_RESOURCES_SUCCESS,
    UPDATE_CONDITION,
    UPDATE_CONDITION_ERROR,
    UPDATE_CONDITION_SUCCESS,
    CHANGE_SINGLE_RESOURCE,
    GET_RECENT_RESOURCES,
    GET_RECENT_RESOURCES_SUCCESS,
    GET_RECENT_RESOURCES_ERROR,
    GET_MORE_CALIFICATION_RESOURCES,
    GET_MORE_CALIFICATION_RESOURCES_ERROR,
    GET_MORE_CALIFICATION_RESOURCES_SUCCESS
} from '../../types/types'

export const crearRecurso = (data, accessToken, resetValues, alertOK) => {
    console.log(accessToken);
    return async (dispatch) => {
        dispatch({
            type: CREATE_RESOURCE,
        })
        try {
            data.tags = [
                "tag"
            ];
            data.create = Date.now().toString();
            const resp = await clienteAxios.post('resource/', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${accessToken}`
                }
            })
            console.log("====> DATA CREACIÓN DE RECURSO")
            console.log(resp.data);
            dispatch({
                type: CREATE_RESOURCE_SUCCESS,
                payload: true
            })
            resetValues();
            alertOK();
            setTimeout(() => {
                dispatch({
                    type: CREATE_RESOURCE_SUCCESS,
                    payload: false
                })
            }, 5000)
        } catch (error) {
            console.log("====> Error al crear recurso");
            console.log(error);
            console.log(error.response);
            dispatch({
                type: CREATE_RESOURCE_ERROR,
                payload: "No se pudo crear el recurso."
            })
            setTimeout(() => {
                dispatch({
                    type: CREATE_RESOURCE_ERROR,
                    payload: null
                })
            }, 5000)
        }
    }
}

export const obtenerMisRecursos = async (dispatch, accessToken) => {
    try {
        const resp = await clienteAxios.get('resource/myresources', {
            headers: {
                'Authorization': `bearer ${accessToken}`
            }
        })
        console.log("==== MIS RECURSOS ===");
        console.log(resp.data)
        dispatch({
            type: GET_MY_RESOURCES_SUCCESS,
            payload: resp.data.resources
        })
    } catch (error) {
        console.log("==> Error al obtener mis recursos");
        console.log(error.response)
        dispatch({
            type: GET_MY_RESOURCES_ERROR,
            payload: "Error al obtener recursos"
        })
    }

}

export const obtenerRecursosPendientes = async (dispatch) => {
    // return async (dispatch) => {
    dispatch({
        type: GET_PENDING_RESOURCES
    })
    try {
        const resp = await clienteAxios.get('resource/pendingResources')
        console.log("===> RECURSOS PENDIENTES");
        console.log(resp.data.resources);

        dispatch({
            type: GET_PENDING_RESOURCES_SUCCESS,
            payload: resp.data.resources
        })

    } catch (error) {
        console.log("==> Error al obtener Recursos Pendientes");
        console.log(error);
        dispatch({
            type: GET_PENDING_RESOURCES_ERROR,
            payload: "No se pudieron ontener los recursos Pendientes"
        })
    }
    // }
}
export const cambiarEstadoPublicacion = (id, accessToken, isPublish, alertaOk, alertaError) => {
    return async (dispatch) => {
        dispatch({
            type: UPDATE_CONDITION
        })
        try {
            const resp = await clienteAxios.put(`resource/cambiarestado/${id}`, {
                condition: isPublish
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${accessToken}`
                }
            })
            console.log("====> RECURSO ACTUALZAIDO");
            console.log(resp);
            dispatch({
                type: UPDATE_CONDITION_SUCCESS,
            })
            obtenerRecursosPendientes(dispatch);
            alertaOk()
        } catch (error) {
            console.log("==> Error al actualizar Recurso ")
            console.log(error);
            console.log(error?.response);
            dispatch({
                type: UPDATE_CONDITION_ERROR,
                payload: "No se pudo actualizar el estado del recurso"
            })
            alertaError()
        }
    }
}

export const obtenerRecursosRecientes = async (dispatch) => {
    dispatch({
        type: GET_RECENT_RESOURCES
    })
    try {
        const resp = await clienteAxios.get('resource/recentresources', {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
        console.log("===> RECURSOS RECIENTES");
        console.log(resp.data.resources);
        dispatch({
            type: GET_RECENT_RESOURCES_SUCCESS,
            payload: resp.data.resources
        })

    } catch (error) {
        console.log("===> Error al obtener Recursos RECIENTES")
        console.log(error);
        console.log(error?.response);
        dispatch({
            type: GET_RECENT_RESOURCES_ERROR,
            payload: "Error al obtener recursos RECIENTES"
        })

    }
}
export const obtenerRecursosMasValorados = async (dispatch) => {
    dispatch({
        type: GET_MORE_CALIFICATION_RESOURCES
    })
    try {
        const resp = await clienteAxios.get('resource/mostCalifications', {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
        console.log("===> RECURSOS MÁS VALORADOS");
        console.log(resp.data.resources);
        dispatch({
            type: GET_MORE_CALIFICATION_RESOURCES_SUCCESS,
            payload: resp.data.resources
        })

    } catch (error) {
        console.log("===> Error al obtener Recursos más valorados")
        console.log(error);
        console.log(error?.response);
        dispatch({
            type: GET_MORE_CALIFICATION_RESOURCES_ERROR,
            payload: "Error al obtener recursos más valoradps"
        })

    }
}

export const changeSinglePage = (data, history) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_SINGLE_RESOURCE,
            payload: data
        })
        setTimeout(() => {
            history.push('/single-resource');
        }, 1200)
    }
}

export const reinicarState = () => {
    return (dispatch) => {
        dispatch({
            type: CERRAR_SESION
        })
    }
}

