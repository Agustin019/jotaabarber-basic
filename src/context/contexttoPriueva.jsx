import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../utils/firebaseconfig";
import { createContext, useContext } from "react";

const authContext = createContext()

export const useAuth = () =>{
    const context = useContext(authContext)

    if(!context){
        console.log('Error en el contexto de autenticacion')
    }
    return context
} 

export const AuthProvider = ({ children }) => {

    const login = async (email,password) => {
        const response = await signInWithEmailAndPassword(auth, email, password) 
        console.log(response)
    }

    const register = async (email,password) => {
        const response = createUserWithEmailAndPassword(auth, email, password)
        console.log(response)
    }

    const loginWithGoogle = async () => {
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
                login,
                register,
                loginWithGoogle,
                logOut
            }}    
        >
            {children}
        </authContext.Provider>
    )
}