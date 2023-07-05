import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import { REGISTRO_EXITOSO, REGISTRO_ERROR, LIMPIAR_ALERTA, INICIAR_SESION, SESION_ERROR, USUARIO_AUTENTICADO, USUARIO_AUTENTICADO_ERROR,CERRAR_SESION } from '../../types/index'
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = ({children}) => {

    //Definir State inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null,
        autenticado: false
    }

    //Definir el reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    const registrarUsuario = async datos => {
        
        try {
            const res = await clienteAxios.post('/usuarios', datos)
            console.log(res.data.msg)
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: res.data.msg
            })

            //Limpiar alerta despues de 3 segundos
            setTimeout(() => {
                dispatch({
                    type: LIMPIAR_ALERTA
                })
            }, 30000)
                
            }
         catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    //Autenticar Usuario
    const iniciarSesion = async datos => {
        try {
            const res = await clienteAxios.post('/auth', datos)
            console.log(res.data.token)
            dispatch({
                type: INICIAR_SESION,
                payload: res.data.token
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: SESION_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    //Extraer usuario autenticado EN BASE A JWT
    // Extraer usuario autenticado EN BASE A JWT
const usuarioAutenticado = async () => {
    const token = localStorage.getItem('token');
  
    if (token) {
      tokenAuth(token); // Configurar el token en el cliente Axios
    }

    try {
        const respuesta = await clienteAxios.get('/auth');
        if(respuesta.data.usuario){
            dispatch({
                type: USUARIO_AUTENTICADO,
                payload: respuesta.data.usuario
            })
        }
        
      } catch (error) {
        dispatch ({
            type: USUARIO_AUTENTICADO_ERROR,
            payload: error.response.data.msg
        })         
      }
  };

const cerrarSesion = () => {
    dispatch({
        type: CERRAR_SESION
    })
}

    
    
    return (
        <authContext.Provider
        value={{
             token: state.token,
             autenticado: state.autenticado,
             usuario: state.usuario,
             mensaje: state.mensaje,
             registrarUsuario,
             iniciarSesion,
             usuarioAutenticado,
             cerrarSesion
        }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState