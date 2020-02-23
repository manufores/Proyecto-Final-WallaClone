import {
    FORMULARIO_BUSQUEDA,
    URL_SEARCH,
    ANUNCIOS_BUSQUEDA,
    BUSQUEDA_ERROR,
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_BUSQUEDA:
            return{
                ...state,
                formulario_busqueda: action.payload
            }
        case URL_SEARCH:
            return{
                ...state,
                url_search: action.payload
            }
        case ANUNCIOS_BUSQUEDA:
            return{
                ...state,
                anunciosbuscados: action.payload
            }
        case BUSQUEDA_ERROR:
               return {
                   ...state,
                   mensaje: action.payload
            }
        default:
            return state;
    }
}

