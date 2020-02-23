import { 
    FORMULARIO_ANUNCIO,
    FORMULARIO_EDICION,
    FORMULARIO_CERRAR_EDICION,
    OBTENER_ANUNCIOS,
    OBTENER_TAGS,
    AGREGAR_ANUNCIO,
    ANUNCIO_ERROR,
    VALIDAR_FORMULARIO,
    ANUNCIO_ACTUAL,
    ACTUALIZAR_ANUNCIO,
    ELIMINAR_ANUNCIO,
    ANUNCIO_SELECTED
} from '../../types';


export default (state, action) => {
    switch(action.type) {
        case FORMULARIO_ANUNCIO:
            return {
                ...state,
                formulario: true
            }
        case FORMULARIO_EDICION:
            return {
                ...state,
                formedit: true
            }
        case FORMULARIO_CERRAR_EDICION:
            return {
            ...state,
            formedit: false
            }
        case OBTENER_ANUNCIOS:
            return {
                ...state,
                anuncios: action.payload
            }
        case OBTENER_TAGS:
            return {
                 ...state,
                 tags: action.payload
            }
        case AGREGAR_ANUNCIO:
            return {
                ...state,
                anuncios: [...state.anuncios, action.payload],
                formulario: false,
                errorformulario: false
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state, 
                errorformulario: true
            }
        case ANUNCIO_ACTUAL:
            return {
                ...state,
                anuncio: state.anuncios.filter(anuncio => anuncio._id === action.payload )
            }
        case ANUNCIO_SELECTED:
            return {
                ...state,
                anuncioseleccionado: action.payload,
                formanuncio: true,
            }
        case ACTUALIZAR_ANUNCIO:
            return {
                ...state,
                anuncios: state.anuncios.map(anuncio => anuncio._id === action.payload._id ? action.payload : anuncio)
            }
        case ELIMINAR_ANUNCIO:
            return {
                ...state,
                anuncios: state.anuncios.filter(anuncio => anuncio._id !== action.payload ),
                anuncio: null
            }
        case ANUNCIO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        default:
            return state;
    }
}