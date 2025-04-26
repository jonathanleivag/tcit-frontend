import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { EditPost, Post, PostStateSlice } from '../../type'

const initialState: PostStateSlice = {
  posts: [],
  filteredPosts: [],
  edit: undefined
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
    },
    setEdit: (state, action: PayloadAction<EditPost>) => {
      state.edit = action.payload
    },
    editPost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      )
      state.posts[index] = action.payload
      state.filteredPosts[index] = action.payload
    }
  }
})

export const {
  setPostInitialState,
  setPost,
  deletePost,
  filterPostByName,
  resetFilter,
  setEdit,
  editPost
} = postSlice.actions

export default postSlice.reducer
