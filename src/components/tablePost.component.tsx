import { FC, useEffect } from 'react'
import { getEnv } from '../utils/env.util'
import { ENV } from '../enum'
import { Post, Res } from '../type'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setPostInitialState } from '../features/post/post.slice'

const TablePostComponent: FC = () => {
  const dispatchApp = useAppDispatch()
  const posts = useAppSelector((state) => state.post.posts)

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

  return (
    <table border={1} cellPadding={5} cellSpacing={0}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id}>
            <td> {post.name} </td>
            <td> {post.description} </td>
            <td>
              <button>delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TablePostComponent
