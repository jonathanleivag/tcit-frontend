import { FC } from 'react'

const FormSearchComponent: FC = () => {
  return (
    <form>
      <input type='text' id='search' placeholder='Filtro de nombres' />
      <button type='submit'>Buscar</button>
    </form>
  )
}

export default FormSearchComponent
