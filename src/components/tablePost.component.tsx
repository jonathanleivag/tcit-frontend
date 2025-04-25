import { FC, useEffect } from 'react'
import { getEnv } from '../utils/env.util'
import { ENV } from '../enum'

const TablePostComponent: FC = () => {
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${getEnv(ENV.ENDPOINT)}/post`)
        const data = await response.json()
        console.log('🚀 ~ fetchPosts ~ data:', data)
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
        <tr>
          <td>Post 1</td>
          <td>This is the body of post 1</td>
          <td>
            <button>delete</button>
          </td>
        </tr>
        <tr>
          <td>Post 2</td>
          <td>This is the body of post 2</td>
          <td>
            <button>delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default TablePostComponent
