import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '../../../utils/firebaseconfig'

export default function TurnoActivo({ turno, datosUsuarioActual }) {

    const cancelarTurno = async () => {
        // Eliminando el turno activo en el documento del usuario
        const docRefUser = doc(db, 'usuarios', datosUsuarioActual.uid);
        const docUser = await getDoc(docRefUser);
        const turnosActivos = docUser.data().turnosActivos;
        const turnosActivosActualizados = turnosActivos.filter(turnoActivo => turnoActivo.id !== turno.id);

        await updateDoc(docRefUser, {
            turnosActivos: turnosActivosActualizados
        });

        console.log('Turno Activo del cliente eliminado')

        // Cambiamos la disponibilidad del turno para que este disponible nuevamente
        const docRefHoras = doc(db, 'horarios', turno.dia)
        const horaFirebase = await getDoc(docRefHoras)
        const horas = horaFirebase.data()

        const encontrarHora = horas.horariosLaborales.findIndex(obj => obj.hora === turno.hora)
        if (encontrarHora !== -1) {
            horas.horariosLaborales[encontrarHora] = {
                ...horas.horariosLaborales[encontrarHora],
                disponible: true
            };
        }
        await updateDoc(docRefHoras, horas)
        console.log('Horario disponible para todo el publico')

        // Eliminando el turno en la coleccion 'Turnos' que es el que se le va a mostrar al admin
        const docRefTurno = doc(db, 'Turnos', turno.dia)
        const docTurno = await getDoc(docRefTurno)
        const turnos = docTurno.data().turnos
        const turnosActualidados = turnos.filter(turn => turn.id !== turno.id)
        await updateDoc(docRefTurno, {
            turnos: turnosActualidados
        });
        console.log('Turno eliminado de la base de datos')
        window.location.reload();
    }

    useEffect(() => {
        const eliminarTurnosViejos = async () => {
          const docRefUser = doc(db, 'usuarios', datosUsuarioActual.uid);
          const docUser = await getDoc(docRefUser);
          const turnosActivos = docUser.data().turnosActivos;
          const fechaTurno = turno.objetoDiaSeleccionado.toDate(); // Suponiendo que la fecha está almacenada como un objeto de fecha en Firestore
      
          const fechaActual = new Date();
          fechaActual.setHours(0, 0, 0, 0); // Establecer las horas, minutos, segundos y milisegundos a cero para comparar solo las fechas
      
          const fechaTurnoSinHora = new Date(fechaTurno);
          fechaTurnoSinHora.setHours(0, 0, 0, 0); // Establecer las horas, minutos, segundos y milisegundos a cero para comparar solo las fechas
      
          if (fechaTurnoSinHora < fechaActual) {
            const turnosActivosActualizados = turnosActivos.filter(
              turnoActivo => turnoActivo.id !== turno.id
            );
      
            await updateDoc(docRefUser, {
              turnosActivos: turnosActivosActualizados
            });
          }
        };
      
        eliminarTurnosViejos();
      }, []);
      
      



    return (
        <div className='w-full flex justify-between h-[73px] rounded-lg bg-[#1e1e1e] my-2'>
            <p className='text-white text-lg font-medium'>Datos</p>
            <p className='text-white text-lg font-medium'>Servicio</p>
            <p className='text-white text-lg font-medium'>Profesional</p>
            <div className='flex flex-col gap-y-2'>
                <p className='text-white text-lg font-medium'>Fecha y hora</p>
                <p className='text-white text-lg font-medium'>{`${turno.nombreDia} - ${turno.dia} - ${turno.hora}`}</p>
            </div>
            <p
                className='text-white text-lg font-medium'
                onClick={cancelarTurno}
            >
                Cancelar turno</p>
        </div>
    )
}
