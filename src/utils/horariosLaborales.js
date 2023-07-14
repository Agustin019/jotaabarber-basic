import { format } from 'date-fns';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseconfig';
import { v4 as uuidv4 } from "uuid";

export const horariosLunes = [
    {
        hora: '09:00',
        servicio:'color',
        disponible: true,
        periodo: 'mañana',
        id:uuidv4()
    },
    {
        hora: '10:00',
        servicio:'color',
        disponible: true,
        periodo: 'mañana',
        id:uuidv4()
    },{
        hora: '11:00',
        servicio:'color',
        disponible: true,
        periodo: 'mañana',
        id:uuidv4()
    },{
        hora: '12:00',
        servicio:'color',
        disponible: true,
        periodo: 'mañana',
        id:uuidv4()
    },
    {
        hora: '13:00',
        servicio:'color',
        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '14:00',
        servicio:'color',
        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '15:00',
        servicio:'color',
        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
]
export const horariosLaborales = [
    {
        hora: '09:00',
        servicio:'corte',

        disponible: true,
        periodo: 'mañana',
        id:uuidv4()
    },
    {
        hora: '09:30',
        servicio:'corte',

        disponible: true,
        periodo: 'mañana',
        id:uuidv4()
    },
    {
        hora: '10:00',
        servicio:'corte',

        disponible: true,
        periodo: 'mañana',
        id:uuidv4()
    },
    {
        hora: '10:30',
        servicio:'corte',

        disponible: true,
        periodo: 'mañana',
        id:uuidv4()
    },
    {
        hora: '11:00',
        servicio:'corte',

        disponible: true,
        periodo: 'mañana',
        id:uuidv4()
    },
    {
        hora: '11:30',
        servicio:'corte',

        disponible: true,
        periodo: 'mañana',
        id:uuidv4()
    },
    {
        hora: '12:00',
        servicio:'corte',

        disponible: true,
        periodo: 'mañana',
        id:uuidv4()
    },
    {
        hora: '12:30',
        servicio:'corte',

        disponible: true,
        periodo: 'mañana',
        id:uuidv4()
    },

    {
        hora: '13:00',
        servicio:'corte',

        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '13:30',
        servicio:'corte',

        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '14:00',
        servicio:'corte',

        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '14:30',
        servicio:'corte',

        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '15:00',
        servicio:'corte',

        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '15:30',
        servicio:'corte',

        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '16:00',
        servicio:'corte',

        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '16:30',
        servicio:'corte',

        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '17:00',
        servicio:'corte',

        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '17:30',
        servicio:'corte',

        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '18:00',
        servicio:'corte',

        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '18:30',
        servicio:'corte',

        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '19:00',
        servicio:'corte',

        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '19:30',
        servicio:'corte',

        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '20:00',
        servicio:'corte',

        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '20:30',
        servicio:'corte',

        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '21:00',
        servicio:'corte',

        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '21:30',
        servicio:'corte',

        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    },
    {
        hora: '22:00',
        servicio:'corte',

        disponible: true,
        periodo: 'tarde',
        id:uuidv4()
    }
]





export async function generarDocumentoPorCadaDiaDisponible() {
    // Crear arreglo con las fechas formateadas del día actual hasta 30 días adelante
    const currentDate = new Date();
    const thirtyDaysLater = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 30);
  
    const availableDates = [];
    for (let date = currentDate; date <= thirtyDaysLater; date.setDate(date.getDate() + 1)) {
      if (date.getDay() !== 0) { // Verificar si el día no es domingo (0: domingo, 1: lunes, ..., 6: sábado)
        const formattedDate = format(date, 'dd-MM');
        availableDates.push(formattedDate);
      }
    }
  
    for (let i = 0; i < availableDates.length; i++) {
      const fecha = availableDates[i];
      const docRef = doc(db, 'horarios', fecha);
      try {
        const documento = await getDoc(docRef);
        if (!documento.exists()) {
          let horariosConID;
          const year = Number(fecha.slice(6, 10));
          const month = Number(fecha.slice(3, 5)) - 1;
          const day = Number(fecha.slice(0, 2));
          const dayOfWeek = new Date(year, month, day).getDay(); // Obtener el día de la semana (0: domingo, 1: lunes, ..., 6: sábado)
  
          if (dayOfWeek === 2) { // 1: lunes
            horariosConID = horariosLunes.map(horario => ({
              ...horario,
              id: uuidv4()
            }));
          } else {
            horariosConID = horariosLaborales.map(horario => ({
              ...horario,
              id: uuidv4()
            }));
          }
  
          // Cambiar el valor de "disponible" para los horarios de mañana
          if (dayOfWeek === 0) { // 0: sabado
            horariosConID.forEach(horario => {
              if (horario.periodo === 'mañana') {
                horario.disponible = true;
              }
            });
          } else {
            horariosConID.forEach(horario => {
              if (horario.periodo === 'mañana') {
                horario.disponible = false;
              }
            });
          }
          await setDoc(docRef, {
            horariosLaborales: horariosConID
          });
        }
      } catch (e) {
        console.log(`Error en la fecha ${fecha}`, e);
      }
    }
  }
  
  



// Genera un documento con un arreglo vacio llamado "turnos" por cada dia de turnos disponible
export async function generarDocumentoPorCadaDiaDeTurnosDisponible() {

    // crear arreglo con las fechas formateadas del dia actual hasta 30 dias adelante
    const currentDate = new Date();
    const thirtyDaysLater = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 30);


    const availableDates = [];
    const turnos = []
    for (let date = currentDate; date <= thirtyDaysLater; date.setDate(date.getDate() + 1)) {
        if (date.getDay() !== 0) { // Verificar si el día no es domingo (0: domingo, 1: lunes, ..., 6: sábado)
            const formattedDate = format(date, 'dd-MM');
            availableDates.push(formattedDate);
        }
    }


    for (let i = 0; i < availableDates.length; i++) {
        const fecha = availableDates[i];
        const docRef = doc(db, 'Turnos', fecha);
        try {
            const documento = await getDoc(docRef)
            if (!documento.exists()) {
                await setDoc(docRef, {
                    turnos
                })
            }
        } catch (e) {
            console.log(`Error en la fecha ${fecha}`, e)
        }

    }
}
