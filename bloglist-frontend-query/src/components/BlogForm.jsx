import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../contexts/NotificationContext.jsx'

const BlogForm = () => {
    const queryClient = useQueryClient()
    const dispatch = useNotificationDispatch()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthor = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrl = (event) => {
        setUrl(event.target.value)
    }

    const createBlogMutation = useMutation({
        mutationFn: blogService.create,
        onSuccess: (newBlog) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
            dispatch({
                text: `a new blog ${newBlog.title} added`,
                type: 'notification',
            })
        },
        onError: () => {
            dispatch({
                text: 'Error creating blog',
                type: 'error',
            })
        },
    })

    const handleCreate = (event) => {
        event.preventDefault()
        const blog = {
            title: title,
            author: author,
            url: url,
        }
        createBlogMutation.mutate(blog)
    }

    return (
        <div>
            <h2>create new</h2>
            <div>
                <form onSubmit={handleCreate}>
                    <div>
                        title:
                        <input
                            data-testid="title"
                            type="text"
                            value={title}
                            onChange={handleTitle}
                            placeholder="write title here"
                        />
                    </div>
                    <div>
                        author:
                        <input
                            data-testid="author"
                            type="text"
                            value={author}
                            onChange={handleAuthor}
                            placeholder="write author here"
                        />
                    </div>
                    <div>
                        url:
                        <input
                            data-testid="url"
                            type="text"
                            value={url}
                            onChange={handleUrl}
                            placeholder="write url here"
                        />
                    </div>
                    <button type="submit">create</button>
                </form>
            </div>
        </div>
    )
}

export default BlogForm
