import Alerta from '../utils/alerta';


export default function Turno({
    turno,
    index,
    handleModal,
    modal,
    setModalDatosDeTurno,
    setTurnoACancelar,
    cancelarTurno,
    modalEliminarTurno,
    setModalEliminarTurno,
    eliminarTurno,
}) {


    const { cliente, telefono, hora, servicio, estado, userId, turnoId, fechaCreacion } = turno;

    const verificarEstadoDelTurno = () => {
        if (estado === 'cancelado') {
            setTurnoACancelar(turno)
            setModalEliminarTurno(!modalEliminarTurno)
        } else {
            handleModal()
            setTurnoACancelar(turno)
        }
    }


    const formatDate = (fecha) => {
        const date = new Date(fecha);
        return date.toLocaleString(); // Utilizar el método toLocaleString para formatear la fecha como desees
      };

    return (
        <div
            className={
                `grid grid-cols-[3fr,3fr,1fr,1fr] 
                sm:grid-cols-[2fr,2fr,2fr,1fr]
                md:grid-cols-[2fr,2fr,2fr,2fr,2fr,2fr,1fr]
                lg:grid-cols-7
                place-items-start  content-center justify-center items-center 
                py-4 px-2 xl:px-10 text-negroPrincipal my-[2px] border-l-[5px]
                text-blanco
        ${estado === 'cancelado' ? 'border-rojo' : 'border-verde'}
        ${index % 2 ? 'bg-[#48464A]': 'bg-negroSecundario'}
        `}
        >
            <p className='font-light text-sm'>{cliente}</p>
            <div className='flex items-center gap-x-1 underline'>
                <ion-icon name="logo-whatsapp"></ion-icon>
                <a href={`https://wa.me/${telefono}`} className='font-medium text-sm'>{telefono}</a>
            </div>
            <p className='font-light text-sm'>{hora}</p>
            <p className='font-light text-sm hidden md:block'>{servicio}</p>
            <p className='font-light text-sm hidden md:block'>{formatDate(fechaCreacion)}</p>
            <p className={`font-medium text-sm hidden md:block `}>{estado}</p>
            <button
                className='lg:mx-7 hidden md:block'
                onClick={verificarEstadoDelTurno}
            >
                <img src="https://i.ibb.co/KwQGXF8/delete-3.png" alt="icono cancelar turno" />
            </button>

            <button
                className='md:hidden   pl-7'
                onClick={() => setModalDatosDeTurno(turno)}
            >
                <img src="https://i.ibb.co/sqMv74d/more-vert.png" alt="Ver más" />
            </button>


            {
                modal &&
                <Alerta
                    titulo={'Cancelar reserva'}
                    texto={`¿Estás seguro de cancelar la reserva? El horario se habilitara para que otra persona pueda reservar.`}
                    txtBtnCancelar={'No, conservar.'}
                    txtBtnConfirmar={'Si, cancelar.'}
                    cancelar={handleModal}
                    confirmar={cancelarTurno}
                />
            }
            {
                modalEliminarTurno &&
                <Alerta
                    titulo={'Eliminar reserva'}
                    texto={`¿Estás seguro de eliminar la reserva? La reserva cancelada sera eliminada y no podrá deshacerse.`}
                    txtBtnCancelar={'No, conservar.'}
                    txtBtnConfirmar={'Si, eliminar.'}
                    cancelar={() => setModalEliminarTurno(!modalEliminarTurno)}
                    confirmar={eliminarTurno}
                />
            }
        </div>

    )
}
