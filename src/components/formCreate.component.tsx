import { FC } from 'react'

const FormCreateComponent: FC = () => {
  return (
    <form>
      <input type='text' id='name' placeholder='Nombre' />
      <input type='text' id='description' placeholder='Descripción' />
      <button type='submit'>Crear</button>
    </form>
  )
}

export default FormCreateComponent
