import { FC, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { Post, PostReqBody, Res } from '../type'
import { getEnv } from '../utils/env.util'
import { ENV } from '../enum'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { editPost, setEdit, setPost } from '../features/post/post.slice'
import { validationSchemaFormCreate } from '../validationSchema'

const FormCreateComponent: FC = () => {
  const initialValues: PostReqBody = {
    name: '',
    description: ''
  }
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const AppDispatch = useAppDispatch()
  const edit = useAppSelector((state) => state.post.edit)

  useEffect(() => {
    if (edit?.isEdit) {
      formik.setFieldValue('name', edit?.post?.name)
      formik.setFieldValue('description', edit?.post?.description)
    } else {
      formik.setFieldValue('name', '')
      formik.setFieldValue('description', '')
    }
    return () => {}
  }, [edit])

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaFormCreate,
    onSubmit: async (values, action) => {
      try {
        setIsLoading(true)
        const method = edit?.isEdit ? 'PUT' : 'POST'
        const url = edit?.isEdit
          ? `${getEnv(ENV.ENDPOINT)}/post/${edit?.post?.id}`
          : `${getEnv(ENV.ENDPOINT)}/post/`

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })

        const data: Res<Post> = await response.json()

        if (data.success) {
          toast.success(data.message)
          if (edit?.isEdit) {
            AppDispatch(editPost(data.data))
          } else {
            AppDispatch(setPost(data.data))
          }
          action.resetForm()
          AppDispatch(
            setEdit({
              isEdit: false,
              post: undefined
            })
          )
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
            className={`bg-primary text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-hover'
            } ${edit?.isEdit ? 'w-1/2' : 'w-full'}`}
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
                {edit?.isEdit ? 'Editando...' : 'Cargando...'}
              </>
            ) : edit?.isEdit ? (
              'Editar'
            ) : (
              'Crear'
            )}
          </button>
          {edit?.isEdit && (
            <button
              type='button'
              className={`bg-error hover:bg-red-600 w-1/2 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer`}
              onClick={() =>
                AppDispatch(
                  setEdit({
                    isEdit: false,
                    post: undefined
                  })
                )
              }
            >
              <svg
                className='h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='currentColor'
                  strokeWidth='2'
                  d='M12 4v16m8-8H4'
                ></path>
              </svg>
              Limpiar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default FormCreateComponent
