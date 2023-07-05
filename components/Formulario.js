import React, { useContext, useState } from 'react'
import appContext from '../context/appContext/appContext'



function Formulario() {

    const { agregarPassword, agregarDescargas } = useContext(appContext)

    const [tienePassword, setTienePassword] = useState(false)

    return (
        <div className=' w-full mt-20'>
            <div>
                <label className=' text-lg text-gray-800'>Eliminar Tras:</label>
                <select className=' appearence-none w-full mt-2 bg-gray-200 text-gray-800 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                onChange={ e => agregarDescargas(Number(e.target.value)) }
                >
                    <option value='' selected disabled>Seleccione</option>
                    <option value='1'> 1 Descarga</option>
                    <option value='5'> 5 Descargas</option>
                    <option value='10'> 10 Descargas</option>
                    <option value='20'> 20 Descargas</option>
                    <option value='25'> 25 Descargas</option>
                    <option value='30'> 30 Descargas</option>
                </select>
            </div>

            <div className=' mt-4'>
                <div className=' flex justify-between items-center'>
                    <label className=' text-lg text-gray-800 mr-2'>Proteger con contrasena</label>
                    <input 
                    type='checkbox' 
                    className='appearence-none w-4 h-4 border border-gray-400 rounded' 
                    onChange={ () => setTienePassword(!tienePassword) }
                    />
                </div>

                { tienePassword && (
                     <input
                     type='password'
                     className='appearence-none w-full mt-2 bg-gray-200 text-gray-800 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                     onChange={ e => agregarPassword(e.target.value) }
                 />
                )}
          

            </div>
        </div>
    )
}

export default Formulario