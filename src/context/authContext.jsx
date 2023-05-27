import { auth, db } from "../utils/firebaseconfig";
import { createContext, useContext, useEffect } from 'react'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged ,
  FacebookAuthProvider
} from "firebase/auth";
import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  // estado para el nombre completo en el registro comun de firebase
  const [fullName, setFullName] = useState('')

  // Estado para la pantalla de carga
  const [isLoading, setIsLoading] = useState(false);

  const crearDocumentoDeUsuario = async () => {
    if (user?.uid) {
      const docRef = doc(db, 'usuarios', user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          uid: user.uid,
          email: user.email,
          role: 'cliente',
          fullName: user.displayName !== null ? user.displayName : fullName,
          turnosActivos: [],
          img:''
        });
        setTimeout(() => {
          traerDatosDeUsuarioActual()
        }, 2000);
        console.log('Cliente registrado en la base de datos correctamente');
      } else {
        console.log('Cliente ya registrado');
      }
    }
  };

  const traerDatosDeUsuarioActual = async () => {
    if (user && user.uid) {
      console.log(user.uid);
      const docRef = doc(db, 'usuarios', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDatosUsuarioActual(docSnap.data());
      } else {
        //setDatosUsuarioActual({});
        await crearDocumentoDeUsuario(); 
      }
    }
  };



  useEffect(() => {
    const suscribed = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log('No hay usuario suscrito')
        setUser('')
      } else {
        setTimeout(() => {
          setUser(currentUser)
          console.log('Usuario logueado')
        }, 1000);
      }
    })
    return () => suscribed()
  }, [])

  useEffect(() => {
    if (user && user.uid) {
      traerDatosDeUsuarioActual();
      console.log('trayendo datos...')
    } else {
      console.log('No hay datos del usuario actual')
      setDatosUsuarioActual({})
    }
  }, [user]);



  const register = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = response.user;
      await traerDatosDeUsuarioActual();
      await crearDocumentoDeUsuario(newUser.uid);
    } catch (error) {
       if (error.code === 'auth/email-already-in-use') {
      toast.error("Email ya registrado", "error")
    } else if (error.code === 'auth/invalid-email') {
      toast.error("Email invalido", "error")
    } else if (error.code === 'auth/weak-password') {
      toast.error("Contraseña demasiado corta, Usar minimo 6 caracteres", "error")
    } else if (error.code) {
      toast.error("Ups, algo salio mal", "error")
    }
      // Aquí puedes realizar acciones adicionales en caso de error, como mostrar un mensaje de error al usuario.
    }
    setIsLoading(false);
  };
  
  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        toast.error("Contraseña incorrecta.", "error")
      } else if (error.code === 'auth/user-not-found') {
        toast.error("Usuario no encontrado.", "error")
      } else {
        toast.error("Ups, algo salio mal.", "error")
      }
      // Acciones adicionales en caso de error.
    }
  };
  
  const loginWithGoogle = async () => {
    try {
      const responseGoogle = new GoogleAuthProvider();
      return await signInWithPopup(auth, responseGoogle);
    } catch (error) {
      console.log('Error al iniciar sesión con Google:', error.message);
      setIsLoading(false)

      // Acciones adicionales en caso de error.
    }
  };
  
  const loginWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      return await signInWithPopup(auth, provider);
    } catch (error) {
      console.log('Error al iniciar sesión con Facebook:', error.message);
      // Acciones adicionales en caso de error.
    }
  };
  
  const logOut = async () => {
    try {
      setUser('')
      setDatosUsuarioActual({})
      const response = await signOut(auth);
      //setDatosUsuarioActual({});
      //window.location.reload();
      console.log(response);
    } catch (error) {
      console.log('Error al cerrar sesión:', error.message);
      // Acciones adicionales en caso de error.
    }
  };
  
  return (
    <authContext.Provider
      value={{
        register,
        login,
        loginWithGoogle,
        loginWithFacebook,
        logOut,
        user,
        datosUsuarioActual,
        setDatosUsuarioActual,
        traerDatosDeUsuarioActual,
        crearDocumentoDeUsuario,
        fullName,
        setFullName,

        isLoading,
        setIsLoading
      }}
    >
      {children}
      <ToastContainer />
    </authContext.Provider>
  )
}