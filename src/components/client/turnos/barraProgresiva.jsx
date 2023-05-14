import React from 'react'
const barraSteps = [
  'Datos personales',
  'Servicio',
  'Profesional',
  'Dia Y Horario',
]

export default function BarraProgresiva({step}) {
  return (
    <article className='flex justify-center mx-auto'>
      {
        barraSteps.map((barStep, i) => (
          <div key={i} className='flex justify-center text-stone-600 '>
            <div className='flex flex-col items-center text-3xl'>
              { 
                step > +i 
                  ?<p className='transition-all duration-500 text-green-600'>
                    <ion-icon name="checkmark-circle"></ion-icon>
                  </p>
                  :<p className=''> 
                    <ion-icon name="checkmark-circle-outline"></ion-icon>
                  </p>
              }
              <p className={` text-lg transition-colors duration-500 ${step > +i ? 'font-semibold text-green-600': 'font-medium'}`}>{barStep}</p>
            </div>
            {i === barraSteps.length - 1 ? null : (
              <div className='border-dashed border m-auto border-stone-400 h-[2px] w-28'></div>
            )}
          </div>
        ))
        
      }
    </article>
  )
}
