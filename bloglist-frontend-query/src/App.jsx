import Blog from './components/Blog'
import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'
import blogService from './services/blogs'
import loginService from './services/login'
import { useUserValue } from './contexts/LoginContext.jsx'

const App = () => {
    const user = useUserValue()

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        window.location.reload()
    }

    return (
        <div>
            <h2>{user ? 'blogs' : 'Login'}</h2>
            <Notification />
            {user ? (
                <div>
                    {user.username} logged in
                    <button onClick={handleLogout}>logout</button>
                    <Togglable
                        labelWhenVisible={'cancel'}
                        labelWhenNotVisible={'new blog'}
                    >
                        <BlogForm />
                    </Togglable>
                    <Blog />
                </div>
            ) : (
                <LoginForm />
            )}
        </div>
    )
}

export default App
