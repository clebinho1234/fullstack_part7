import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import BlogDetails from './components/BlogDetails.jsx'
import BlogUser from './components/BlogUser.jsx'
import UsersList from './components/UsersList.jsx'
import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import userService from './services/users'
import { logoutUser } from './reducers/userReducer.js'
import { Routes, Route, useMatch, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Container, AppBar, Button, Toolbar } from '@mui/material'

const Header = ({ currentUser }) => {
    return (
        <div>
            {currentUser ? (
                <div>
                    <h2>blogs</h2>
                </div>
            ) : (
                <div>
                    <h2>login</h2>
                </div>
            )}
            <Notification />
        </div>
    )
}

const App = () => {
    const currentUser = useSelector(({ user }) => user)
    const [users, setUsers] = useState([])
    const blogs = useSelector(({ blogs }) => blogs)
    const dispatch = useDispatch()

    const Logout = () => {
        dispatch(logoutUser())
        window.location.reload()
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await userService.getAll()
            setUsers(usersData)
        }

        fetchUsers()
    }, [])

    const userMatch = useMatch('/users/:id')
    const user = userMatch
        ? users.find((user) => user.id === userMatch.params.id)
        : null

    const blogMatch = useMatch('/blogs/:id')
    const blog = blogMatch
        ? blogs.find((blog) => blog.id === blogMatch.params.id)
        : null

    return (
        <Container>
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" component={Link} to="/">
                            home
                        </Button>
                        <Button color="inherit" component={Link} to="/users">
                            users
                        </Button>
                        {currentUser ? (
                            <em>
                                {currentUser.username} logged in
                                <Button color="inherit" onClick={Logout}>
                                    Logout
                                </Button>
                            </em>
                        ) : (
                            <Button
                                color="inherit"
                                component={Link}
                                to="/login"
                            >
                                login
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
            <Header currentUser={currentUser} />
            <Routes>
                <Route
                    path="/blogs/:id"
                    element={<BlogDetails blog={blog} />}
                />
                <Route path="/users/:id" element={<BlogUser user={user} />} />
                <Route path="/" element={<Blog blogs={blogs} />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/users" element={<UsersList />} />
            </Routes>
        </Container>
    )
}

export default App
