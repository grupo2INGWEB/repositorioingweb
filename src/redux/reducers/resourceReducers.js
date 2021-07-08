import {
    CREATE_RESOURCE,
    CREATE_RESOURCE_ERROR,
    CREATE_RESOURCE_SUCCESS,
    GET_MY_RESOURCES_SUCCESS,
    GET_MY_RESOURCES_ERROR,
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

const initialState = {
    fetching: false,
    msgError: null,
    msgErrorMyResources: null,
    listResource: null,
    myResources: null,
    pendingResources: null,
    singleResource: null,
    fetchingRecent: false,
    fetchingValued: false,
    msgErrorRecent: null,
    listRecentResources: [],
    listMostValued: [],
}
export const resourceReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_RESOURCE:
            return {
                ...state,
                fetching: true,
                msgError: null,
            }
        case CREATE_RESOURCE_SUCCESS:
            return {
                ...state,
                fetching: false,
                msgError: null,
                creado: action.payload
            }
        case CREATE_RESOURCE_ERROR:
            return {
                ...state,
                fetching: false,
                msgError: action.payload,
            }
        case GET_MY_RESOURCES_SUCCESS:
            return {
                ...state,
                fetching: false,
                myResources: action.payload,
                msgErrorMyResources: null
            }
        case GET_MY_RESOURCES_ERROR:
            return {
                ...state,
                fetching: false,
                myResources: null,
                msgErrorMyResources: action.payload
            }
        case GET_PENDING_RESOURCES:
            return {
                ...state,
                fetching: true,
                msgError: null
            }
        case GET_PENDING_RESOURCES_SUCCESS:
            return {
                ...state,
                fetching: false,
                msgError: null,
                pendingResources: action.payload
            }
        case GET_PENDING_RESOURCES_ERROR:
            return {
                ...state,
                fetching: false,
                msgError: action.payload,
                pendingResources: null
            }
        case UPDATE_CONDITION:
            return {
                ...state,
                fetching: true
            }
        case UPDATE_CONDITION_SUCCESS:
            return {
                ...state,
                fetching: false,
                msgError: null
            }
        case UPDATE_CONDITION_ERROR:
            return {
                ...state,
                fetching: false,
                msgError: action.payload
            }
        case CHANGE_SINGLE_RESOURCE:
            return {
                ...state,
                singleResource: action.payload
            }
        case GET_RECENT_RESOURCES:
            return {
                ...state,
                fetchingRecent: true,
                msgErrorRecent: null
            }
        case GET_RECENT_RESOURCES_SUCCESS:
            return {
                ...state,
                listRecentResources: action.payload,
                fetchingRecent: false,
                msgErrorRecent: null
            }
        case GET_MY_RESOURCES_ERROR:
            return {
                ...state,
                fetchingRecent: false,
                msgErrorRecent: action.payload
            }
        case GET_MORE_CALIFICATION_RESOURCES:
            return {
                ...state,
                fetchingValued: true
            }
        case GET_MORE_CALIFICATION_RESOURCES_SUCCESS:
            return {
                ...state,
                fetchingValued: false,
                listMostValued: action.payload
            }



        // case CERRAR_SESION:
        //     return initialState;
        default:
            return initialState;
    }
}