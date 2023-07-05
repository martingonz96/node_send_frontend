import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import authContext from '../context/contextAuth/authContext'
import appContext from '../context/appContext/appContext'
import { useRouter } from 'next/router'



function Header() {

  const router = useRouter()

  const { usuarioAutenticado, usuario, cerrarSesion } = useContext(authContext)

  const { limpiarState } = useContext(appContext)

  useEffect(() => {
       usuarioAutenticado()
  }, [])

  const redireccionar = () => {
    router.push('/');
    limpiarState()
  }

  return (
    <header className=' py-8 flex flex-col md:flex-row items-center justify-between'>

         <img 
         onClick={() => redireccionar()}
         src='/logo.svg' alt='logo' className='w-64 mb-8 md:mb-0 cursor-pointer'/>

         
         <div>
          {usuario ? ( 
            <div className=' flex gap-4 items-center'>
            <p className='mr-4'> Hola {usuario.nombre}</p>
            <button
            type='button'
            className='bg-red-500 text-white px-5 py-3 font-bold rounded-lg uppercase mr-2'
            onClick={() => cerrarSesion()}
            >
            Cerrar Sesión
            </button> 
            </div>
          
          ): (
            <>
            <Link legacyBehavior href='/login'>
             <a className=' bg-red-500 text-white px-5 py-3 font-bold rounded-lg uppercase mr-2'>
                 Iniciar Sesión
             </a>
           </Link>
           <Link legacyBehavior href='/registrarse'>
             <a className=' bg-black text-white px-5 py-3 font-bold rounded-lg uppercase'>
                 Crear Cuenta
             </a>
           </Link> 
            </>            
          )}
          
          </div>
    </header>
  )
}

export default Header