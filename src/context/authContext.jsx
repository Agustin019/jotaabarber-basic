import { auth, db } from "../utils/firebaseconfig";
import { createContext, useContext, useEffect } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
        await crearDocumentoDeUsuario(user.uid); // Pasa el UID del usuario como parámetro
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
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = response.user;
    await traerDatosDeUsuarioActual(); // Elimina el parámetro newUser.uid
    await crearDocumentoDeUsuario(newUser.uid); // Pasa el UID del nuevo usuario
  };



  const login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password)
    console.log(response)
  }
  const loginWithGoogle = async () => {
    const responseGoogle = new GoogleAuthProvider()
    return await signInWithPopup(auth, responseGoogle)
  }
  const logOut = async () => {
    setDatosUsuarioActual({})
    const response = await signOut(auth)
    console.log(response)
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
        traerDatosDeUsuarioActual,
        crearDocumentoDeUsuario,
        fullName,
        setFullName
      }}
    >
      {children}
    </authContext.Provider>
  )
}