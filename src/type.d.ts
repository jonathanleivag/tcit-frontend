export type Res<T> =
  | {
      success: true
      message: string
      status: number
      data: T
    }
  | {
      success: false
      status: number
      message: string
    }

export interface Post {
  id: number
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface PostStateSlice {
  posts: Post[]
  filteredPosts: Post[]
}

export interface PostReqBody {
  name: string
  description: string
}

export interface SearchPostBody {
  name: string
}
