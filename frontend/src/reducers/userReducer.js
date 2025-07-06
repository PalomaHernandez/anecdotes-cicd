import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    userSet(state, action) {
      return action.payload
    },
    userRemove(state, action) {
      return null
    },
  },
})

export const { userSet, userRemove } = userSlice.actions

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(userSet(user))
  }
}

export const removeUser = () => {
  return async (dispatch) => {
    dispatch(userRemove())
  }
}

export default userSlice.reducer
