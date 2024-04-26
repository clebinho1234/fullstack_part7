import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { TextField, Button } from '@mui/material'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const Login = async (event) => {
        event.preventDefault()

        try {
            await dispatch(loginUser(username, password))
            dispatch(setNotification('user logged in succesfull', 'success', 5))
            navigate('/')
        } catch (exception) {
            dispatch(setNotification('Wrong username or password', 'error', 5))
        }
    }

    return (
        <div>
            <form onSubmit={Login}>
                <div>
                    <TextField
                        label="username"
                        data-testid="username"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <TextField
                        label="passsword"
                        data-testid="password"
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <Button variant="contained" color="primary" type="submit">
                    login
                </Button>
            </form>
        </div>
    )
}

export default LoginForm
