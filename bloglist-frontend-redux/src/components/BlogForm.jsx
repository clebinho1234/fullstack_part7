import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { TextField, Button } from '@mui/material'

const BlogForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const style = {
        marginTop: 20,
        marginBottom: 20,
        display:'block'
    }

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthor = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrl = (event) => {
        setUrl(event.target.value)
    }

    const dispatch = useDispatch()

    const add = async (event) => {
        event.preventDefault()
        try {
            dispatch(createBlog(title, author, url))
            dispatch(
                setNotification(
                    `a new blog '${title}' added`,
                    'success',
                    5
                )
            )
        } catch (error) {
            dispatch(setNotification('Error creating blog', 'error', 5))
        }
    }

    return (
        <div>
            <h2>create new</h2>
            <div>
                <form onSubmit={add}>
                    <div>
                        <TextField
                            style={style}
                            data-testid="title"
                            label='Title'
                            value={title}
                            onChange={handleTitle}
                            variant='outlined'
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            style={style}
                            data-testid="author"
                            label='Author'
                            value={author}
                            onChange={handleAuthor}
                            variant='outlined'
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            style={style}
                            data-testid="url"
                            label='Url'
                            value={url}
                            onChange={handleUrl}
                            variant='outlined'
                            required
                        />
                    </div>
                    <Button type="submit" variant='outlined'>create</Button>
                </form>
            </div>
        </div>
    )
}

export default BlogForm
