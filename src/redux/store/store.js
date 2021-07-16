import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { authReducer } from '../reducers/authReducers';
import thunk from 'redux-thunk';
import { resourceReducer } from '../reducers/resourceReducers';
import { obtenerMisRecursos, obtenerRecursosMasValorados, obtenerRecursosPendientes, obtenerRecursosRecientes, obtenerRecursosRecomendados } from '../actions/resourceAction'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    resources: resourceReducer
})


export const store = createStore(
    reducers,
    // Esto se hace para realizar acciones asincronas
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

// Recuperar los datos 
export default function generateStore() {
    let store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
    obtenerRecursosMasValorados(store.dispatch);
    obtenerRecursosRecientes(store.dispatch);
    obtenerRecursosRecomendados(store.dispatch);
    if (localStorage.getItem("userData")) {
        const data = JSON.parse(localStorage.getItem("userData"));
        obtenerMisRecursos(store.dispatch, data.token)
        // Si el usuario es admin consultar recursos pendientes
        console.log(data.user)
        if (data.user.rol === "admin") {
            obtenerRecursosPendientes(store.dispatch);
        }
    }
    return store;
}