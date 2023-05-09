import { auth } from "../utils/firebaseconfig";
import { useContext, createContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) {
        console.log('Error with auth context')
    }
    return context
}

export const AuthProvider = ({ children }) => {

    const register = async (email,password) => {
        const response = await createUserWithEmailAndPassword(email,password)
        console.log(response)
    }
    const login = async (email,password) => {
        const response = await signInWithEmailAndPassword(email,password)
        console.log(response)
    }
    return (
        <authContext.Provider
            value={{
                register,
                login,
                
            }}
        >
            {children}
        </authContext.Provider>
    )
}