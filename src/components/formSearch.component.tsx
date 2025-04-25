import { FC } from 'react'
import { SearchPostBody } from '../type'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { filterPostByName, resetFilter } from '../features/post/post.slice'
import { FiSearch } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'

const FormSearchComponent: FC = () => {
  const initialValues: SearchPostBody = {
    name: ''
  }

  const filter = useAppSelector((state) => state.post.filteredPosts)
  const posts = useAppSelector((state) => state.post.posts)
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
    <>
      {posts.length > 0 && (
        <form
          onSubmit={formik.handleSubmit}
          className='bg-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto'
        >
          <div className='relative flex-1 w-full'>
            <FiSearch className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              id='name'
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder='Buscar tareas...'
              className='w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700'
            />
          </div>
          <div className='flex gap-2 w-full sm:w-auto'>
            <button
              type='submit'
              className='bg-primary text-white px-4 py-2 rounded-md hover:bg-hover transition-colors flex items-center gap-2 w-full sm:w-auto'
            >
              <FiSearch />
              Buscar
            </button>
            {filter.length !== posts.length && (
              <button
                type='button'
                onClick={handlerResetFilter}
                className='bg-error text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors flex items-center gap-2 w-full sm:w-auto'
              >
                <IoClose />
                Limpiar
              </button>
            )}
          </div>
        </form>
      )}
    </>
  )
}

export default FormSearchComponent
