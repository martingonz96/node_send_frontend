import { useCallback, useContext } from "react"
import { useDropzone } from "react-dropzone"
import appContext from "../context/appContext/appContext"
import authContext from "../context/contextAuth/authContext";
import Formulario from "./Formulario";


function Dropzone() {

  const { mostrarAlerta, subirArchivos, cargando, creandoEnlace } = useContext(appContext);

  const { autenticado, usuario } = useContext(authContext)

    const onDropRejected = ()=> {

          mostrarAlerta('Archivo muy grande, solo se permite maximo de 1MB')
    }

    const onDropAccepted = useCallback (async (acceptedFiles)=> {


      //CREAR FROM 
      const formData = new FormData()
      formData.append('archivo', acceptedFiles[0])

      subirArchivos(formData, acceptedFiles[0].path)
    }, [])

    const { getInputProps, getRootProps, isDragActive, acceptedFiles } = useDropzone({onDropAccepted, onDropRejected, maxSize: 10000000})

    const archivos = acceptedFiles.map(archivo => (
          <li 
          key={archivo.lastModified}
          className=" bg-white flex-1 p-3 mb-4 shadow-lg rounded">
          <p className=" text-xl font-bold">{archivo.path}</p> 
          <p className=" text-sm text-gray-500">{ (archivo.size / Math.pow(1024, 2)).toFixed(2)}MB</p>
          </li>
    ))


  return (
    <div className=' md:flex-1 mx-3 mt-16 lg:mt-0 mb-3 flex flex-col items-center justify-center border-dashed broder-gray-400 border-2 bg-gray-100'>

        {acceptedFiles.length > 0 ? (
            <div className=" w-full mt-10 text-center">
                <h2 className=" text-center text-2xl mb-4 font-bold">Archivos</h2>
              <ul>
              {archivos}
              </ul>

              {
                autenticado ? <Formulario/> : null
              }

              {cargando && <p className=" text-center text-2xl mb-4 font-bold">Cargando...</p>}
              <button
              type="button"
              className=" text-white bg-blue-700 px-4 py-2 rounded-md mt-3 hover:bg-blue-800 text-center"
              onClick={()=> creandoEnlace()}
              >Crear enlace</button>
            </div>
          
        ): (
            <div {...getRootProps({ className: 'dropzone w-full py-32' })}>

            <input {...getInputProps()} className=" h-100"/>
            { isDragActive ? 
              <p className=" text-2xl text-gray-600 text-center">Suelta los archivos aquí</p>
            :
            <div className="text-center">
            <p className=" text-2xl text-gray-600">Seleccione su archivo</p>
            <button
            type="button"
            className=" text-white bg-blue-700 px-4 py-2 rounded-md mt-3 hover:bg-blue-800"
            >Seleccione archivos para subir</button>
           </div>
            }
            
          </div>
        )}

            
    </div>
  )
}

export default Dropzone