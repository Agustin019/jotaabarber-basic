import { auth, db } from "../utils/firebaseconfig";
import { createContext, useContext, useEffect } from 'react'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) {
        console.log('error creando al crear contexto')
    }
    return context
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState('')
    const [datosUsuarioActual, setDatosUsuarioActual] = useState({})

    const traerDatosDeUsuarioActual = async () => {
        const docref = doc(db, 'usuarios', user.uid);
        const data = await getDoc(docref);
        setDatosUsuarioActual(data.data());
    };

    useEffect(() => {
        const suscribed = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                console.log('No hay usuario suscrito')
                setUser('')
            } else {
                setUser(currentUser)
                console.log('Usuario logueado')
            }
        })
        return () => suscribed()
    }, [])

    useEffect(() => {
        if (user && user.uid) {
            setTimeout(() => {
                traerDatosDeUsuarioActual();
            }, 3000);
            console.log('trayendo datos...')
        } else {
            console.log('No hay datos del usuario actual')
            setDatosUsuarioActual({})
        }
    }, [user])

    
    const register = async (email, password) => {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        console.log(response)
    }
    const login = async (email, password) => {
        const response = await signInWithEmailAndPassword(auth, email, password)
        console.log(response)
    }
    const loginWithGoogle = async () => {
        const responseGoogle = new GoogleAuthProvider()
        return await signInWithPopup(auth, responseGoogle)
    }
    const logOut = async () => {
        const response = await signOut(auth)
        console.log(response)
        setUser('')
    }
    return (
        <authContext.Provider
            value={{
                register,
                login,
                loginWithGoogle,
                logOut,
                user,
                datosUsuarioActual,
                setDatosUsuarioActual,
                traerDatosDeUsuarioActual
            }}
        >
            {children}
        </authContext.Provider>
    )
}