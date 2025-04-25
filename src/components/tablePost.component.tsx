import { FC, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getEnv } from '../utils/env.util'
import { ENV } from '../enum'
import { Post, Res } from '../type'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { deletePost, setPostInitialState } from '../features/post/post.slice'

const TablePostComponent: FC = () => {
  const dispatchApp = useAppDispatch()
  const posts = useAppSelector((state) => state.post.filteredPosts)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${getEnv(ENV.ENDPOINT)}/post`)
        const data: Res<Post[]> = await response.json()

        if (data.success) {
          dispatchApp(setPostInitialState(data.data))
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching posts:', error.message)
        }
      }
    }
    void fetchPosts()
    return () => {}
  }, [])

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${getEnv(ENV.ENDPOINT)}/post/${id}`, {
        method: 'DELETE'
      })
      const data: Res<Post> = await response.json()
      if (data.success) {
        dispatchApp(deletePost(id))
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting post:', error.message)
      }
    }
  }

  return (
    <div className='flex justify-center my-3'>
      <div className='w-full sm:w-4/5 lg:w-3/5'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className='overflow-hidden border border-gray-200 rounded-lg shadow-md'
        >
          <table className='min-w-full table-fixed'>
            {/* Encabezado fijo */}
            <thead className='bg-primary text-white'>
              <tr>
                <th className='w-1/3 px-6 py-3 text-left text-sm font-semibold'>
                  Nombre
                </th>
                <th className='w-1/3 px-6 py-3 text-left text-sm font-semibold'>
                  Descripción
                </th>
                <th className='w-1/3 px-6 py-3 text-center text-sm font-semibold'>
                  Acción
                </th>
              </tr>
            </thead>
          </table>
          <div className='max-h-60 overflow-y-auto'>
            <table className='min-w-full table-fixed'>
              <tbody className='divide-y divide-gray-200'>
                {posts.length > 0 &&
                  posts.map((post, index) => (
                    <motion.tr
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        duration: 0.4,
                        ease: 'easeOut',
                        delay: index * 0.05
                      }}
                      className={`${
                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      } hover:bg-gray-100 transition-colors`}
                    >
                      <td className='w-1/3 px-6 py-4 text-sm text-gray-700'>
                        {post.name}
                      </td>
                      <td className='w-1/3 px-6 py-4 text-sm text-gray-700'>
                        {post.description}
                      </td>
                      <td className='w-1/3 px-6 py-4 text-center'>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className='bg-error text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors'
                        >
                          Eliminar
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                {posts.length === 0 && (
                  <motion.tr
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <td colSpan={3} className='text-center py-4'>
                      No hay tareas disponibles
                    </td>
                  </motion.tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TablePostComponent
