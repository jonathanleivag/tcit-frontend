import { FC } from 'react'
import { useFormik } from 'formik'
import { Post, PostReqBody, Res } from '../type'
import { getEnv } from '../utils/env.util'
import { ENV } from '../enum'
import { useAppDispatch } from '../hooks/redux'
import { setPost } from '../features/post/post.slice'

const FormCreateComponent: FC = () => {
  const initialValues: PostReqBody = {
    name: '',
    description: ''
  }

  const AppDispatch = useAppDispatch()

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${getEnv(ENV.ENDPOINT)}/post/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })

        const data: Res<Post> = await response.json()

        if (data.success) {
          AppDispatch(setPost(data.data))
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type='text'
        id='name'
        placeholder='Nombre'
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <input
        type='text'
        id='description'
        placeholder='Descripción'
        onChange={formik.handleChange}
        value={formik.values.description}
      />
      <button type='submit'>Crear</button>
    </form>
  )
}

export default FormCreateComponent
