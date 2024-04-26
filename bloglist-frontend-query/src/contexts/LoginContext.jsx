import { createContext } from 'react'
import { useReducer, useContext } from 'react'
import blogService from '../services/blogs'

const LoginReducer = (state, action) => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(action))
    return action
}

const LoginContext = createContext()

export const LoginContextProvider = (props) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    const data = loggedUserJSON ? JSON.parse(loggedUserJSON) : null

    if (data) {
        blogService.setToken(data.token)
    }
    const [user, userDispatch] = useReducer(LoginReducer, data)

    return (
        <LoginContext.Provider value={[user, userDispatch]}>
            {props.children}
        </LoginContext.Provider>
    )
}

export const useUserValue = () => {
    const userAndDispatch = useContext(LoginContext)
    return userAndDispatch[0]
}

export const useUserDispatch = () => {
    const userAndDispatch = useContext(LoginContext)
    return userAndDispatch[1]
}

export default LoginContext
