import { useState } from 'react'
import { useNotificationDispatch } from '../contexts/NotificationContext.jsx'
import { useUserDispatch } from '../contexts/LoginContext.jsx'
import loginService from '../services/login.js'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const notificationDispatch = useNotificationDispatch()
    const userDispatch = useUserDispatch()

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })
            userDispatch(user)
            notificationDispatch({
                text: 'user logged in succesfull',
                type: 'notification',
            })
        } catch (exception) {
            notificationDispatch({
                text: 'Wrong username or password',
                type: 'error',
            })
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        data-testid="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password
                    <input
                        data-testid="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm
