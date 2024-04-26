import { configureStore } from '@reduxjs/toolkit'
import blogReducer, { initializeBlogs } from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer, { getUser } from './reducers/userReducer'

const store = configureStore({
    reducer: {
        blogs: blogReducer,
        notification: notificationReducer,
        user: userReducer,
    },
})

store.dispatch(initializeBlogs())
store.dispatch(getUser())

export default store
