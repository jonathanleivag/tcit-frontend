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
    }
  }
})

export const { setPostInitialState } = postSlice.actions

export default postSlice.reducer
