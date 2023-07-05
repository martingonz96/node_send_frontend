import { useReducer } from "react";
import appContext from "./appContext";
import clienteAxios from "../../config/axios";
import appReducer from "./appReducer";
import {
  CREAR_ENLACE_ERROR,
  CREAR_ENLACE_EXITO,
  SUBIR_ARCHIVO_ERROR,
  SUBIR_ARCHIVO_EXITO,
  LIMPIAR_ALERTA,
  MOSTRAR_ALERTA,
  SUBIR_ARCHIVO,
  LIMPIAR_STATE,
  AGREGAR_PASSWORD,
  AGREGAR_DESCARGAS
} from "../../types";

const Appstate = ({ children }) => {
  const initialState = {
    mensaje_archivo: null,
    nombre: "",
    nombre_original: "",
    cargando:null,
    descargas: 1,
    autor: null,
    password:'',
    url:''

  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  // MUESTRA ALERTA
  const mostrarAlerta = (msg) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: msg
    });

    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA
      });
    }, 30000);
  };

  // Subir archivos
  const subirArchivos = async (formData, nombreArchivo) => {
    dispatch ({
        type: SUBIR_ARCHIVO
    })
    try {
      const resultado = await clienteAxios.post("/archivos", formData);
      console.log(resultado.data.archivo);
      dispatch({
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          nombre: resultado.data.archivo,
          nombre_original: nombreArchivo
        }
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.message // Puedes ajustar el payload según el error que desees mostrar
      });
    }
  };

  // Crear enlace
  const creandoEnlace = async () => {
    const data = {
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor
    };

    try {
      const res = await clienteAxios.post("/enlaces", data);
      console.log(res.data.msg);
      dispatch({
        type: CREAR_ENLACE_EXITO,
        payload: res.data.msg
      })
    } catch (error) {
      console.log(error);
      dispatch({
        type: CREAR_ENLACE_ERROR,
        payload: error.message // Puedes ajustar el payload según el error que desees mostrar
      });
    }
  };

  //Limpiar state

  const limpiarState = () => {
    dispatch({
      type: LIMPIAR_STATE
    })
  }

  const agregarPassword = (value)=> {
    dispatch({
      type: AGREGAR_PASSWORD,
      payload: value
    })
  }

  //Agregar descargas
  const agregarDescargas = (value) => {
    dispatch ({
      type: AGREGAR_DESCARGAS,
      payload: value
    })
  }

  return (
    <appContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargando: state.cargando,
        password: state.password,
        autor: state.autor,
        descargas: state.descargas,
        url: state.url,
        subirArchivos,
        creandoEnlace,
        mostrarAlerta,
        limpiarState,
        agregarPassword,
        agregarDescargas
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default Appstate;
