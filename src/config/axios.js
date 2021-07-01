import axios from 'axios';
import { urlApi } from '../constantes/constants';

const clienteAxios = axios.create({
    baseURL: urlApi
})
export default clienteAxios;