import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Post, PostStateSlice } from '../../type'

const initialState: PostStateSlice = {
  posts: [],
  filteredPosts: []
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostInitialState: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload
      state.filteredPosts = action.payload
    },
    setPost: (state, action: PayloadAction<Post>) => {
      state.posts = [action.payload, ...state.posts]
      state.filteredPosts = state.posts
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload)
      state.filteredPosts = state.posts
    },
    filterPostByName: (state, action: PayloadAction<string>) => {
      state.filteredPosts = state.posts.filter((post) =>
        post.name.toLowerCase().includes(action.payload.toLowerCase())
      )
    },
    resetFilter: (state) => {
      state.filteredPosts = state.posts
    }
  }
})

export const {
  setPostInitialState,
  setPost,
  deletePost,
  filterPostByName,
  resetFilter
} = postSlice.actions

export default postSlice.reducer
