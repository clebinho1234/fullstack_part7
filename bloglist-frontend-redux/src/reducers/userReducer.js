import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userStorage from '../userStorage'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        deleteUser() {
            return null
        },
    },
})

export const { setUser, deleteUser } = userSlice.actions

export const getUser = () => {
    return (dispatch) => {
        const user = userStorage.loadUser()
        if (user) blogService.setToken(user.token)
        dispatch(setUser(user))
    }
}

export const loginUser = (username, password) => {
    return async (dispatch) => {
        const user = await loginService.login({
            username,
            password,
        })
        userStorage.saveUser(user)
        blogService.setToken(user.token)
        dispatch(setUser(user))
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        userStorage.removeUser()
        dispatch(deleteUser())
    }
}

export default userSlice.reducer
