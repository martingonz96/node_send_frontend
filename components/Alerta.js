import React, { useContext } from 'react'
import authContext from '../context/contextAuth/authContext'
import appContext from '../context/appContext/appContext'



function Alerta() {


    const { mensaje } = useContext(authContext)

    const { mensaje_archivo } = useContext(appContext)

  return (
    <div className=' bg-red-500 text-white text-center py-2 px-3 uppercase font-bold mx-auto max-w-lg'>
        { mensaje || mensaje_archivo }
    </div>
  )
}

export default Alerta