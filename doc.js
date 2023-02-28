//  useEffect(() => {
//   //   async function obtenerDocumento() {
//   //     const docRef = doc(db, 'horarios', value)
//   //     const docSnap = await getDoc(docRef)
//   //     const nuevaConsulta = docSnap.data().horariosLaborales
//   //     setHorarios(nuevaConsulta)
//   //   }
//   //   obtenerDocumento()
//  }, [])




/// calendar





// useEffect(() => {
    //     const unsub = onSnapshot(doc(db, "horarios", value), (doc) => {
    //         const newData =  doc.data().horariosLaborales
    //         setHorarios(newData)
    //       });

    //     return () => {
    //         unsub();
    //     };
    // }, [selectedDate])
    // useEffect(() => {
    //     async function obtenerDocumento() {
    //         setLoading(true)
    //         const docRef = doc(db, 'horarios', value)
    //         const docSnap = await getDoc(docRef)
    //         if(docSnap.exists()){
    //             const nuevaConsulta = docSnap.data().horariosLaborales
    //             setHorarios(nuevaConsulta)
    //             setLoading(false)
    //         }
    //         setLoading(false)
    //         diasNolaborales.push('No hay turnos disponibles para hoy')
    //         console.log(diasNolaborales)
    //     }
    //     obtenerDocumento()
    // }, [selectedDate])