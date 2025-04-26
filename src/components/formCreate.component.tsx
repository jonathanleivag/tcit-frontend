import { FC, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { Post, PostReqBody, Res } from '../type'
import { getEnv } from '../utils/env.util'
import { ENV } from '../enum'
import { useAppDispatch } from '../hooks/redux'
import { setPost } from '../features/post/post.slice'
import { validationSchemaFormCreate } from '../validationSchema'

const FormCreateComponent: FC = () => {
  const initialValues: PostReqBody = {
    name: '',
    description: ''
  }
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const AppDispatch = useAppDispatch()

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaFormCreate,
    onSubmit: async (values, action) => {
      try {
        setIsLoading(true)

        const response = await fetch(`${getEnv(ENV.ENDPOINT)}/post/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })

        const data: Res<Post> = await response.json()

        if (data.success) {
          toast.success(data.message)
          AppDispatch(setPost(data.data))
          action.resetForm()
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
          toast.error('Error creating post')
        }
      } finally {
        setIsLoading(false)
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
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700'
        />
        {formik.touched.name && formik.errors.name && (
          <div className='text-red-500 text-sm'>{formik.errors.name}</div>
        )}
        <textarea
          id='description'
          placeholder='Descripción'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700 resize-none'
          rows={4}
        />
        {formik.touched.description && formik.errors.description && (
          <div className='text-red-500 text-sm'>
            {formik.errors.description}
          </div>
        )}
        <div className='w-full flex flex-row justify-center items-center gap-2'>
          <button
            type='submit'
            disabled={isLoading}
            className={`bg-primary w-full text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-hover'
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className='animate-spin h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z'
                  ></path>
                </svg>
                Creando...
              </>
            ) : (
              ' Crear'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormCreateComponent
