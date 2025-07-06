import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, type: null },
  reducers: {
    notificationSet(state, action) {
      return {
        message: action.payload.message,
        type: action.payload.type,
      }
    },
    notificationRemove(state, action) {
      return {
        message: null,
        type: null,
      }
    },
  },
})

export const { notificationSet, notificationRemove } = notificationSlice.actions

export const setNotification = (message, type, time) => {
  return async (dispatch) => {
    dispatch(notificationSet({ message, type }))
    setTimeout(() => {
      dispatch(notificationRemove())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
