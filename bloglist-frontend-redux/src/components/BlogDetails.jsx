import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { deleteBlog, createComment, updateLike } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link, useNavigate } from 'react-router-dom'

const BlogDetails = ({ blog }) => {
    const currentUser = useSelector(({ user }) => user)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const create = async (event) => {
        event.preventDefault()
        try {
            dispatch(createComment(comment, blog))
            dispatch(
                setNotification(
                    `a new comment '${comment}' added`,
                    'success',
                    5
                )
            )
        } catch (error) {
            dispatch(setNotification('Error creating comment', 'error', 5))
        }
    }

    const handleComment = (event) => {
        setComment(event.target.value)
    }

    const like = (blog) => {
        try {
            dispatch(updateLike(blog))
            dispatch(setNotification(`You liked '${blog.title}'`, 'success', 5))
        } catch (error) {
            dispatch(setNotification('Error updating blog', 'error', 5))
        }
    }

    const handleDelete = (blogToDelete) => {
        if (
            window.confirm(
                `Remove ${blogToDelete.title} by ${blogToDelete.author}`
            )
        ) {
            try {
                dispatch(deleteBlog(blogToDelete))
                dispatch(
                    setNotification(
                        `blog '${blogToDelete.title}' deleted`,
                        'success',
                        5
                    )
                )
                navigate('/')
            } catch (error) {
                dispatch(setNotification('Error deleting blog', 'error', 5))
            }
        }
    }

    if (!blog) {
        return null
    }

    const nameOfUser = blog.user ? `added by ${blog.user.name}` : 'anonymous'
    const canRemove =
        blog.user && currentUser
            ? blog.user.username === currentUser.username
            : false

    return (
        <div>
            <h2>
                {blog.title} {blog.author}
            </h2>
            <Link to={blog.url}>{blog.url}</Link>
            <br />
            Likes: {blog.likes} <button onClick={() => like(blog)}>Like</button>{' '}
            <br />
            {nameOfUser}
            {canRemove && (
                <button onClick={() => handleDelete(blog)}>Remove</button>
            )}
            <div>
                <h4>comments</h4>
                <form onSubmit={create}>
                    <div>
                        <input
                            data-testid="comment"
                            type="text"
                            value={comment}
                            onChange={handleComment}
                            placeholder="write comment here"
                        />
                    </div>
                    <button type="submit">create comment</button>
                </form>
                <ul>
                    {blog.comments.map((comment) => (
                        <li key={comment.id}>{comment.text}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default BlogDetails
