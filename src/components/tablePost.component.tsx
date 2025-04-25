import { FC, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { getEnv } from '../utils/env.util'
import { ENV } from '../enum'
import { Post, Res } from '../type'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { deletePost, setPostInitialState } from '../features/post/post.slice'
import ModalSharedComponent from './shared/modal.shared.component'

const TablePostComponent: FC = () => {
  const dispatchApp = useAppDispatch()
  const posts = useAppSelector((state) => state.post.filteredPosts)

  const [postToDelete, setPostToDelete] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${getEnv(ENV.ENDPOINT)}/post`)
        const data: Res<Post[]> = await response.json()

        if (data.success) {
          dispatchApp(setPostInitialState(data.data))
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error('Error fetching posts')
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
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Error deleting post')
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
                          onClick={() => {
                            setPostToDelete(post.id)
                            setIsModalOpen(true)
                          }}
                          className='bg-error text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors cursor-pointer'
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
          {isModalOpen && (
            <ModalSharedComponent>
              <h2 className='text-lg font-semibold mb-4 text-gray-700'>
                ¿Estás seguro de eliminar esta tarea?
              </h2>
              <div className='flex justify-end space-x-4'>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors cursor-pointer'
                >
                  Cancelar
                </button>
                <button
                  onClick={async () => {
                    if (postToDelete !== null) {
                      await handleDelete(postToDelete)
                    }
                    setIsModalOpen(false)
                  }}
                  className='px-4 py-2 bg-error text-white rounded hover:bg-red-600 transition-colors cursor-pointer'
                >
                  Eliminar
                </button>
              </div>
            </ModalSharedComponent>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default TablePostComponent
