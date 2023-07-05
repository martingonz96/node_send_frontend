import React, { useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import authContext from '../context/contextAuth/authContext'
import Alerta from '../components/Alerta'
import { useRouter } from 'next/router'

function login() {

    const router = useRouter()

    const { iniciarSesion, mensaje, autenticado } = useContext(authContext)


    useEffect(() =>{
        if(autenticado){
           router.push('/')
        }
    
    }, [autenticado])



  //Formulario y validacion
  const formik = useFormik({
    initialValues: {
        email: '',
        password: ''
    },
    validationSchema: Yup.object({
       email: Yup.string()
                .email('El email no es válido')
                .required('El email es obligatorio'),
       password: Yup.string()
                   .required('El password es obligatorio')
                   .min(6, 'El password debe tener al menos 6 caracteres')
    
    }),

    onSubmit: valores => {
        iniciarSesion(valores)
    }
})


  return (
    <Layout>
    <div className=' md:w-4/5 xl:w-3/5 mx-auto mb-32'>
     <h2 className='text-4xl font-sans font-bold text-gray-800 text-center my-4'>Registrarse</h2>

     { mensaje && <Alerta/> }

     <div className=' flex justify-center mt-5'>
          <div className=' max-w-lg w-full'>
            <form 
            onSubmit={formik.handleSubmit}
            className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
                <div className='mb-4'>
                    <label className='block text-black text-sm font-bold mb-2' htmlFor='email'/>
                    <input 
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='email' id='email' type='email' className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Email'/>
                    { formik.touched.email && formik.errors.email ? (
                        <div className=' my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                             <p className='font-bold'>Error</p>
                             <p>{formik.errors.email}</p>
                        </div>
                    ): null}
                </div>
                <div className='mb-4'>
                    <label className='block text-black text-sm font-bold mb-2' htmlFor='password'/>
                    <input 
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='password' id='password' type='password' className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Password'/>
                    { formik.touched.password && formik.errors.password ? (
                        <div className=' my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                             <p className='font-bold'>Error</p>
                             <p>{formik.errors.password}</p>
                        </div>
                    ): null}
                </div>
                <input
                    type='submit'
                    className='bg-red-500 hover:bg-gray-900 hover:cursor-pointer w-full p-2 text-white uppercase font-bold'
                    value='Iniciar Sesión'
                />
            </form>
          </div>
     </div>
     </div>
    </Layout>
  )
}

export default login