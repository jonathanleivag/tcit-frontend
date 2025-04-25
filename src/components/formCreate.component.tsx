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
    onSubmit: async (values, action) => {
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
          action.resetForm()
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }
  })

  return (
    <div className='flex justify-center my-3'>
      <form
        onSubmit={formik.handleSubmit}
        className='w-full sm:w-4/5 lg:w-3/5 bg-white p-6 rounded-lg shadow-md flex flex-col gap-4'
      >
        <input
          type='text'
          id='name'
          placeholder='Nombre'
          onChange={formik.handleChange}
          value={formik.values.name}
          className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700'
        />
        <textarea
          id='description'
          placeholder='Descripción'
          onChange={formik.handleChange}
          value={formik.values.description}
          className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700 resize-none'
          rows={4}
        />
        <button
          type='submit'
          className='bg-primary text-white px-4 py-2 rounded-md hover:bg-hover transition-colors'
        >
          Crear
        </button>
      </form>
    </div>
  )
}

export default FormCreateComponent
