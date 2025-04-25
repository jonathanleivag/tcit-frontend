import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Post, PostStateSlice } from '../../type'

const initialState: PostStateSlice = {
  posts: []
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostInitialState: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload
    },
    setPost: (state, action: PayloadAction<Post>) => {
      state.posts = [action.payload, ...state.posts]
    }
  }
})

export const { setPostInitialState, setPost } = postSlice.actions

export default postSlice.reducer
