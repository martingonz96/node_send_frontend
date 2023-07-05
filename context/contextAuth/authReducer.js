import { REGISTRO_EXITOSO, REGISTRO_ERROR, LIMPIAR_ALERTA, SESION_ERROR, INICIAR_SESION, USUARIO_AUTENTICADO, USUARIO_AUTENTICADO_ERROR, CERRAR_SESION } from '../../types/index'


export default function(state, action) {
   switch(action.type) {
      case REGISTRO_EXITOSO:
         return {
            ...state,
            mensaje: action.payload
         }
      case REGISTRO_ERROR:
      case SESION_ERROR:
      case USUARIO_AUTENTICADO_ERROR:
         return {
            ...state,
            mensaje: action.payload
         }
      case INICIAR_SESION: 
      localStorage.setItem('token', action.payload)
      return {
         ...state,
         token: action.payload,
         autenticado: true
      }
      case LIMPIAR_ALERTA:
         return {
            ...state,
            mensaje: null
         }
      case USUARIO_AUTENTICADO:
         return {
            ...state,
            usuario: action.payload,
            autenticado: true
         }
      case CERRAR_SESION:
         localStorage.removeItem('token')
         return {
            ...state,
            usuario: null,
            token: null,
            autenticado: null
         }
      
    default:
        return state;
   }
}