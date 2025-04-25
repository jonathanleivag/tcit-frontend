import { FC } from 'react'
import { SearchPostBody } from '../type'
import { useFormik } from 'formik'
import { useAppDispatch } from '../hooks/redux'
import { filterPostByName, resetFilter } from '../features/post/post.slice'

const FormSearchComponent: FC = () => {
  const initialValues: SearchPostBody = {
    name: ''
  }

  const appDispatch = useAppDispatch()

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      appDispatch(filterPostByName(values.name))
    }
  })

  const handlerResetFilter = () => {
    formik.setFieldValue('name', '')
    appDispatch(resetFilter())
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type='text'
        id='name'
        onChange={formik.handleChange}
        value={formik.values.name}
        placeholder='Filtro de nombres'
      />
      <button type='submit'>Buscar</button>
      <button type='button' onClick={handlerResetFilter}>
        Borrar Filtro
      </button>
    </form>
  )
}

export default FormSearchComponent
