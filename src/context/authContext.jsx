import { auth } from "../utils/firebaseconfig";
import { createContext, useContext, useEffect } from 'react'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if(!context){
        console.log('error creando al crear contexto')
    }
    return context
}

export const AuthProvider = ({children}) =>{

    const [ user, setUser ] = useState('')

    useEffect(()=>{
        const suscribed = onAuthStateChanged(auth, (currentUser) => {
            if(!currentUser){
                console.log('No hay usuario suscrito')
                setUser('')
            }else{
                setUser(currentUser)
            }
        })
        return () => suscribed()
    },[])

    const register = async (email, password) =>{
       const response = await createUserWithEmailAndPassword(auth, email, password)
        console.log(response)
    }
    const login = async (email, password) => {
        const response = await signInWithEmailAndPassword(auth, email, password)
        console.log(response)
    }
    const loginWithGoogle = async () =>{
        const responseGoogle = new GoogleAuthProvider()
        return await signInWithPopup(auth, responseGoogle)
    }
    const logOut = async () => {
        const response = await signOut(auth)
        console.log(response)
    }   
    return(
        <authContext.Provider
            value={{
                register,
                login,
                loginWithGoogle,
                logOut,
                user
           }}
        >
            {children}
        </authContext.Provider>
    )
}