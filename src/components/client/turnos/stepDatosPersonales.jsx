import React from 'react'

export default function StepDatosPersonales({ nombre, setNombre, telefono, setTelefono }) {

  return (
    <div className=' w-[90%] sm:w-[93%]  mx-auto flex flex-col justify-center pt-20 gap-y-8 '>
      <div className="form__group  ">
        <input
          type="text"
          value={nombre}
          className="form__field"
          onChange={e => setNombre(e.target.value)}
          placeholder="Input"
          id='fullname'
          autocomplete= "off"
          required
        />
        <label className="form__label "  htmlFor='fullname'>
          Nombre Completo
        </label>
      </div>
      <div className="form__group  ">
        <input
          type="number"
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
          className="form__field"
          placeholder="Input"
          id='telefono'
          autocomplete= "off"
          required
        />
        <label className="form__label " htmlFor='telefono'>
          Telefono
        </label>
      </div>
    </div>
  )
}
