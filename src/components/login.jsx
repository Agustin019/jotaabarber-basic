import React from 'react'

export default function Login({ setEmail, setPassword ,handleLogin }) {
    return (
        <form
            onSubmit={handleLogin}
        >
            <div className='mb-4'>
                <input
                    type="text"
                    placeholder='E-mail'
                    onChange={e => setEmail(e.target.value)}
                    className='p-2 w-full bg-slate-200'
                />
            </div>
            <div className='mb-4'>
                <input
                    type="password"
                    placeholder='Contraseña'
                    onChange={e => setPassword(e.target.value)}
                    className='p-2 w-full  bg-slate-200'
                />
            </div>
            <div className='flex justify-center'>
                <input
                    type="submit"
                    value="Iniciar sesion"
                    className='p-2 bg-yellow-500 text-white font-semibold rounded-xl mx-auto'
                />
            </div>
        </form>
    )
}
