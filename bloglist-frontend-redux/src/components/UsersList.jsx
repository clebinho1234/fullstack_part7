import userService from '../services/users'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const UsersList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await userService.getAll()
            setUsers(usersData)
        }

        fetchUsers()
    }, [])

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>
                            <Link to={`/users/${user.id}`}>{user.name}</Link>
                        </td>
                        <td>{user.blogs.length}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UsersList
