import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import blogReducer from '../reducers/blogReducer'
import notificationReducer from '../reducers/notificationReducer'
import userReducer from '../reducers/userReducer'
import usersReducer from '../reducers/usersReducer'

function renderWithRedux(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        blogs: blogReducer,
        notification: notificationReducer,
        user: userReducer,
        users: usersReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export default renderWithRedux
