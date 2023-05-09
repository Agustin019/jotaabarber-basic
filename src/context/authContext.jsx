import { auth } from "../utils/firebaseconfig";
import { createContext, useContext } from 'react'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if(!context){
        console.log('error creando al crear contexto')
    }
    return context
}

export const AuthProvider = ({children}) =>{
    const register = async () =>{
       const response = await createUserWithEmailAndPassword(email, password)
        console.log(response)
    }
    const login = async (email, password) => {
        const response = await signInWithEmailAndPassword(email, password)
        console.log(response)
    }
    const loginWithGoogle = async () =>{
        const responseGoogle = new GoogleAuthProvider
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
                logOut
           }}
        >
            {children}
        </authContext.Provider>
    )
}