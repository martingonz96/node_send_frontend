import Layout from "../../components/Layout";
import React, { useContext, useState } from 'react'
import clienteAxios from "../../config/axios";
import appContext from "../../context/appContext/appContext";
import Alerta from "../../components/Alerta";

export async function getServerSideProps({ params }) {

    const { enlace } = params

    const res = await clienteAxios.get(`/enlaces/${enlace}`);

    return {
        props: {
            enlace: res.data
        }
    }

}

export async function getServerSidePaths() {
    const enlaces = await clienteAxios.get('/enlaces');

    return {
        paths: enlaces.data.enlaces.map(enlace => ({
            params: { enlace: enlace.url }
        })),
        fallback: false
    }
}

export default ({ enlace }) => {

        
    const { mostrarAlerta, mensaje_archivo } = useContext(appContext)
    
    const [tienePassword, setTienePassword] = useState(enlace.password)

    const [password, setPassword] = useState('')

    const verificarPassword = async e => {
        e.preventDefault()

        const data = {
            password
        }

        try {
            const resultado = await clienteAxios.post(`/enlaces/${enlace.enlace}`, data)

            console.log(resultado)
            setTienePassword(resultado.data.password)
        } catch (error) {
            console.log(error.response.data.msg)
        }

    }




    return (

        <Layout>
            {
                tienePassword ? (
                    <div className=" flex flex-col items-center justify-center">
                        <p className=" text-center mb-4">Este enlace esta protegido por un passowrd, colocalo a continuacion</p>
                        {mensaje_archivo && <Alerta />}
                        <div className=' max-w-lg w-full text-center'>
                            <form
                                className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4 text-center'
                                onSubmit={e => verificarPassword(e)}
                            >
                                <div className='mb-4 text-center'>
                                    <label className='block text-black text-sm font-bold mb-2' htmlFor='password'>Password</label>
                                    <input
                                        name='password'
                                        id='password'
                                        type='password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    />
                                </div>
                                <input
                                    type='submit'
                                    className='bg-red-500 hover:bg-gray-900 hover:cursor-pointer w-full p-2 text-white uppercase font-bold'
                                    value='Verificar Password'
                                />
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className=" flex flex-col items-center justify-center">
                        <h1 className=" text-4xl text-gray-800 text-center">Descarga tu archivo</h1>
                        <div className=" display-flex justify-content-center mt-10 items-center">
                            <a className=' bg-red-500 py-2 px-10 rounded uppercase font-bold text-white text-center'
                                href={`${process.env.BACKEND_URL}/archivos/${enlace.archivo}`}

                            >Descargar</a>
                        </div>
                    </div>
                )
            }

        </Layout>
    )
}

