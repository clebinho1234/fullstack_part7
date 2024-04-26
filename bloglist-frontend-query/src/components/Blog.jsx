import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Togglable from '../components/Togglable.jsx'
import { useNotificationDispatch } from '../contexts/NotificationContext.jsx'
import { useUserValue } from '../contexts/LoginContext.jsx'

const Blog = () => {
    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll,
        refetchOnWindowFocus: false,
    })
    //console.log(JSON.parse(JSON.stringify(result)))

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    const blogs = result.data
    return (
        <div>
            {blogs.map((blog) => (
                <div className="blog" key={blog.id}>
                    <span>
                        {blog.title} {blog.author}
                    </span>
                    <Togglable
                        labelWhenVisible={'hide'}
                        labelWhenNotVisible={'view'}
                    >
                        <BlogDetails blog={blog} />
                    </Togglable>
                </div>
            ))}
        </div>
    )
}

const BlogDetails = ({ blog }) => {
    const queryClient = useQueryClient()
    const dispatch = useNotificationDispatch()
    const currentUser = useUserValue()

    const updateBlogMutation = useMutation({
        mutationFn: blogService.update,
        onSuccess: (response, newBlog) => {
            queryClient.invalidateQueries('blogs')
            dispatch({
                text: `blog ${newBlog.title} updated`,
                type: 'notification',
            })
        },
        onError: () => {
            dispatch({
                text: 'Error updating blog',
                type: 'error',
            })
        },
    })

    const deleteBlogMutation = useMutation({
        mutationFn: blogService.remove,
        onSuccess: (response, deletedBlogID) => {
            const blogs = queryClient.getQueryData(['blogs'])
            const { deletedBlog, updatedBlogs } = blogs.reduce(
                (result, blog) => {
                    if (blog.id === deletedBlogID) {
                        result.deletedBlog = blog
                    } else {
                        result.updatedBlogs.push(blog)
                    }
                    return result
                },
                { deletedBlog: null, updatedBlogs: [] }
            )
            queryClient.setQueryData(['blogs'], updatedBlogs)
            dispatch({
                text: `blog ${deletedBlog.title} deleted`,
                type: 'notification',
            })
        },
        onError: () => {
            dispatch({
                text: 'Error deleting blog',
                type: 'error',
            })
        },
    })

    const handleLike = (blog) => {
        updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
    }

    const handleDelete = (blog) => {
        if (window.confirm(`Remove ${blog.title} by ${blog.author}`))
            deleteBlogMutation.mutate(blog.id)
    }

    const nameOfUser = blog.user ? blog.user.name : 'anonymous'
    const canRemove = blog.user
        ? blog.user.username === currentUser.username
        : true

    return (
        <div>
            {blog.url} <br />
            Likes: {blog.likes}{' '}
            <button onClick={() => handleLike(blog)}>Like</button> <br />
            {nameOfUser}
            {canRemove && (
                <button onClick={() => handleDelete(blog)}>Remove</button>
            )}
        </div>
    )
}

export default Blog
