import { useState } from 'react'



export default function BarraProgresiva({ step }) {

  const [progress, setProgress] = useState(0);
  const handleClick = () => {
    if (progress < 100) {
      setProgress(progress + 25);
    }
  };

  const barraSteps = [
    'Datos personales',
    'Servicio',
    'Dia Y Horario',
  ]

  const pasosNombres = () =>{
    if(step === 0){
      return 'Datos personales'
    }else if (step === 1){
      return 'Selecciona el servicio'
    }else if (step === 2){
      return 'Selecciona dia y hora'
    }
  }

  return (
    <article className='flex  justify-center w-full text-blanco'>
     <div className='w-full'>
      <p className=' font-semibold text-lg'>Paso {step + 1} de 3 : <span className='font-light text-base sm:text-lg'>{pasosNombres()}</span></p>
       <div className="w-full h-2 bg-negroSecundario rounded overflow-hidden">
         {barraSteps.map((barStep, i) => (
           <div
             key={i}
             className="h-full transition-width duration-500"
             style={{
               width: `${((step - 1) >= i ? (step - 1) + 1 : step) * 33.3 + 33.3}%`,
               backgroundColor: step  >= i ? '#F2AF29' : '#313033',
             }}
           ></div>
         ))}
       </div>
     </div>



    </article>
  )
}
