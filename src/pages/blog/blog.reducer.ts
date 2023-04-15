import { createReducer, createAction } from '@reduxjs/toolkit'
import { initialPostList } from 'constants/blog'
import { Post } from 'types/blog.type'

interface BlogState {
  postList: Post[]
  editingPost: Post | null
}

const initialState: BlogState = {
  postList: initialPostList,
  editingPost: null
}

export const addPost = createAction<Post>('blog/addPost')
export const deletePost = createAction<string>('blog/deletePost')
export const startEditingPost = createAction<string>('blog/startEditingPost')
export const cancelEditingPost = createAction('blog/cancelEditingPost')
export const finishEditingPost = createAction<Post>('blog/finishEditingPost')

const blogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addPost, (state, action) => {
      state.postList.push(action.payload)
    })
    .addCase(deletePost, (state, action) => {
      const postId = action.payload
      const findPostIndex = state.postList.findIndex((post) => post.id === postId)
      if (findPostIndex !== -1) {
        state.postList.splice(findPostIndex, 1)
      }
    })
    .addCase(startEditingPost, (state, action) => {
      const postId = action.payload
      const findPost = state.postList.find((post) => post.id === postId) || null
      state.editingPost = findPost
    })
    .addCase(cancelEditingPost, (state) => {
      state.editingPost = null
    })
    .addCase(finishEditingPost, (state, action) => {
      const postId = action.payload.id
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.editingPost = null
    })
})

export default blogReducer
