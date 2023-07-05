
import React, { useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import authContext from '../context/contextAuth/authContext'
import Link from 'next/link'
import Dropzone from '../components/Dropzone'
import appContext from '../context/appContext/appContext'
import Alerta from '../components/Alerta'





export default function Home() {

  //Extraer usuario autenticado

  const { usuarioAutenticado } = useContext(authContext)

  const { mensaje_archivo, url } = useContext(appContext)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if(token) {
      usuarioAutenticado()
    }
   
  }, [])

  return (
    <Layout>
      <div className=' mx-auto md:w-4/5 lg:w-3/5 mb-32'>
        {url ? (
          <>
            <p className=' text-center text-2xl mt-10'><span className=' text-red-800 font-bold uppercase'>Tu url es:</span> {`${process.env.FRONTEND_URL}/enlaces/${url}`}</p>

            <button
              type='submit'
              className='bg-red-500 hover:bg-gray-900 hover:cursor-pointer w-full p-2 text-white uppercase font-bold mt-10'
              onClick={() => navigator.clipboard.writeText(`${process.env.FRONTEND_URL}/enlaces/${url}`)}
            >Copiar enlace</button>
          </>

        ) : (
          <>
            {mensaje_archivo && <Alerta />}
            <div className='lg:flex bg-white shadow rounded-lg py-10 px-5 md:px-10'>
              <Dropzone />
              <div className=' md:flex-1 mx-3 mt-16 lg:mt-0 mb-3'>
                <h2 className=' text-4xl font-bold text-gray-800 font-sans my-4'>Compartir archivos de forma sencilla y privada</h2>
                <p className=' text-lg leading-loose'><span className=' font-bold text-red-500'>React Node-send</span> te permite compartir archivos con cifrado de extremo a extremo</p>
                <Link legacyBehavior href='/registrarse'>
                  <a className=' text-red-500 font-bold text-lg hover:text-red-700'>Crea una cuenta para mayores beneficios</a>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}
