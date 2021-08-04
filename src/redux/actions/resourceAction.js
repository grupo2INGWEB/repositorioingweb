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
    GET_MORE_CALIFICATION_RESOURCES_SUCCESS,
    UPDATE_RESOURCE,
    UPDATE_RESOURCE_ERROR,
    UPDATE_RESOURCE_SUCCESS,
    COMMENT_RESOURCE,
    COMMENT_RESOURCE_ERROR,
    COMMENT_RESOURCE_SUCCESS,
    FILTER_SPECIALTY,
    FILTER_SPECIALTY_ERROR,
    FILTER_SPECIALTY_SUCCESS,
    GET_RECOMMENDED_RESOURCES,
    GET_RECOMMENDED_RESOURCES_ERROR,
    GET_RECOMMENDED_RESOURCES_SUCCESS,
    GET_TAGS_IGUALES,
    GET_TAGS_IGUALES_ERROR,
    GET_TAGS_IGUALES_SUCCESS,
    DELETE_RESOURCES,
    DELETE_RESOURCES_ERROR,
    DELETE_RESOURCES_SUCCESS,
    GET_FIND_MOTOR,
    GET_FIND_MOTOR_ERROR,
    GET_FIND_MOTOR_SUCCESS,
    GET_ID_RESOURCE,
    GET_ID_RESOURCE_ERROR,
    GET_ID_RESOURCE_SUCCESS
} from '../../types/types'

export const crearRecurso = (data, accessToken, resetValues, alertOK, archivo) => {
    console.log(accessToken);
    return async (dispatch) => {
        dispatch({
            type: CREATE_RESOURCE,
        })
        try {
            data.create = Date.now().toString();
            const resp = await clienteAxios.post('resource/', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${accessToken}`
                }
            })
            console.log("====> DATA CREACIÓN DE RECURSO")
            console.log(resp.data.resource);
            const formData = new FormData();
            formData.append('archivo', archivo);
            const resp2 = await clienteAxios.post(`resource/subirArchivo/${resp.data.resource._id}`, formData)
            console.log("===> SE CREÓ EL LINK CORRECTAMENTE");
            console.log(resp2.data)
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

export const comentarElRecurso = (id, accessToken, comment, setComment) => {
    console.log("==> ID DEL RECURSO");
    console.log(id);
    return async (dispatch) => {
        dispatch({
            type: COMMENT_RESOURCE
        })
        try {
            const resp = await clienteAxios.put(`resource/comment/${id}`, {
                comment,
                created: Date.now().toString()
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${accessToken}`
                    }
                });
            dispatch({
                type: COMMENT_RESOURCE_SUCCESS,
                payload: resp.data.resource
            })
            console.log("======> Comentar Ok");
            console.log(resp.data)
            setComment("")
            obtenerRecursosRecientes(dispatch);
            obtenerRecursosMasValorados(dispatch);
            obtenerMisRecursos(dispatch, accessToken);
            obtenerRecursosPendientes(dispatch);
        } catch (error) {
            console.log("===> Error al Comentar");
            console.log(error.response);
            dispatch({
                type: COMMENT_RESOURCE_ERROR,
                action: "Error al comentar recurso"
            })
        }

    }
}

export const filterSpecialtyResources = (specialty) => {

    return async (dispatch) => {
        dispatch({
            type: FILTER_SPECIALTY
        })
        try {
            const resp = await clienteAxios.post('resource/specialty', {
                specialty
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log("===> RESULTADOS DE FILTRO POR ESPECIALIDAD");
            console.log(resp.data.resources);
            dispatch({
                type: FILTER_SPECIALTY_SUCCESS,
                payload: resp.data.resources
            })
        } catch (error) {
            console.log("==> Error al filtrar especualidad")
            console.log(error?.response);
            dispatch({
                type: FILTER_SPECIALTY_ERROR,
                payload: "Error al filtar por especialidad"
            })

        }
    }

}

export const likeARecurso = (id, accessToken) => {
    return async (dispatch) => {
        try {
            const resp = await clienteAxios.put(`resource/like/${id}`, {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${accessToken}`
                    }
                });
            console.log("======> Like Ok");
            obtenerRecursosRecientes(dispatch);
            obtenerRecursosMasValorados(dispatch);
            obtenerMisRecursos(dispatch, accessToken);
            obtenerRecursosPendientes(dispatch);
        } catch (error) {
            console.log("===> Error al Dar Like");
            console.log(error.response);
        }

    }
}
export const disLikeARecurso = (id, accessToken) => {
    return async (dispatch) => {
        try {
            const resp = await clienteAxios.put(`resource/dislike/${id}`, {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${accessToken}`
                    }
                });
            console.log("======> Like Ok");
            obtenerRecursosRecientes(dispatch);
            obtenerRecursosMasValorados(dispatch);
            obtenerMisRecursos(dispatch, accessToken);
            obtenerRecursosPendientes(dispatch);
        } catch (error) {
            console.log("===> Error al Dar Like");
            console.log(error.response);
        }

    }
}

export const actualizarRecurso = (data, id, accessToken, resetValues, alertOK, mostrarAlertaError) => {
    console.log(accessToken);
    return async (dispatch) => {
        dispatch({
            type: UPDATE_RESOURCE,
        })
        try {
            data.updateDate = Date.now().toString();
            const resp = await clienteAxios.put(`resource/${id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${accessToken}`
                }
            })
            console.log("====> DATA ACTUALIZAR RECURSO")
            console.log(resp.data);
            dispatch({
                type: UPDATE_RESOURCE_SUCCESS,
                payload: resp.data.resource
            })
            resetValues();
            alertOK();
        } catch (error) {
            console.log("====> Error al actualizar recurso");
            console.log(error);
            console.log(error.response);
            dispatch({
                type: UPDATE_RESOURCE_ERROR,
                payload: "No se pudo actualizar el recurso."
            })
            mostrarAlertaError()
            setTimeout(() => {
                dispatch({
                    type: UPDATE_RESOURCE_ERROR,
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
export const obtenerRecursosRecomendados = async (dispatch) => {
    // return async (dispatch) => {
    dispatch({
        type: GET_RECOMMENDED_RESOURCES
    })
    try {
        const resp = await clienteAxios.get('resource/recommended')
        dispatch({
            type: GET_RECOMMENDED_RESOURCES_SUCCESS,
            payload: resp.data.resources
        })

    } catch (error) {
        console.log("==> Error al obtener Recursos Recomendados");
        console.log(error);
        dispatch({
            type: GET_RECOMMENDED_RESOURCES_ERROR,
            payload: "No se pudieron ontener los recursos Recomendados"
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

export const changeSinglePage = (data, history, isEdit) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_SINGLE_RESOURCE,
            payload: data
        })
        if (!isEdit) {
            setTimeout(() => {
                history.push(`/single-resource/${data.id}`);
            }, 1000)

        } else {
            console.log("====> Navegar a editar");
            setTimeout(() => {
                history.push('/edit-resource');
            }, 1000)
        }
    }
}

export const reinicarState = () => {
    return (dispatch) => {
        dispatch({
            type: CERRAR_SESION
        })
    }
}

export const buscarPorTags = (tag, history) => {
    return async (dispatch) => {
        dispatch({
            type: GET_TAGS_IGUALES
        })
        try {
            const resp = await clienteAxios.get(`resource/resourceTags/${tag}`);
            history.push("/resources-tags")
            dispatch({
                type: GET_TAGS_IGUALES_SUCCESS,
                payload: resp.data.resources
            })

        } catch (error) {
            console.log("==> Error al buscar por tags");
            console.log(error);
            dispatch({
                type: GET_TAGS_IGUALES_ERROR,
                payload: "Error al obtener tags parecidos"
            })
        }
    }
}

export const deleteResource = (id, alertOk, alertError, accessToken, typeObtener, history) => {
    return async (dispatch) => {
        dispatch({
            type: DELETE_RESOURCES
        })
        try {
            await clienteAxios.delete(`resource/${id}`, {
                headers: {
                    "Authorization": `bearer ${accessToken}`
                }
            });
            alertOk()
            dispatch({
                type: DELETE_RESOURCES_SUCCESS,
            })
            if (history) {
                history.replace("/")
            }
            if (typeObtener === "other") {
                obtenerRecursosPendientes(dispatch);
                obtenerRecursosMasValorados(dispatch);
                obtenerRecursosRecientes(dispatch)
                obtenerRecursosRecomendados(dispatch)
            } else {
                obtenerMisRecursos(dispatch, accessToken);
            }
        } catch (error) {
            console.log("===> Error al eliminar recurso");
            console.log(error.response);
            dispatch({
                type: DELETE_RESOURCES_ERROR
            })
            alertError();
        }
    }
}

export const motorDeBusqueda = (query, history) => {
    return async (dispatch) => {
        dispatch({
            type: GET_FIND_MOTOR
        })
        try {

            const resp = await clienteAxios.get('resource/motorBusqueda', {
                headers: {
                    "query": query
                }
            })
            dispatch({
                type: GET_FIND_MOTOR_SUCCESS,
                payload: resp.data.resources
            })
            history.push("/all-resource", "Recursos Disponibles");
        } catch (error) {
            console.log("===> Error en el motor de Búsqueda");
            console.log(error.response);
            dispatch({
                type: GET_FIND_MOTOR_ERROR,
            })
        }
    }
}

export const obtenerRecursoID = (id) => {
    return async (dispatch) => {
        dispatch({
            type: GET_ID_RESOURCE
        })
        console.log("===> DENTRO DE action");
        console.log(id);
        try {
            const resp = await clienteAxios.get(`resource/singleResource/${id}`)
            console.log("==> RECURSOOOO ");
            console.log(resp.data.resource)
            dispatch({
                type: GET_ID_RESOURCE_SUCCESS,
                payload: resp.data.resource
            })

        } catch (error) {
            console.log("==> Error al obtener Recurso por ID")
            console.log(error.response);
            dispatch({
                type: GET_ID_RESOURCE_ERROR
            })
        }
    }
}


