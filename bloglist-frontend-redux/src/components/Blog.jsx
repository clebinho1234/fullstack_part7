import { Link } from 'react-router-dom'
import BlogForm from '../components/BlogForm.jsx'
import Togglable from '../components/Togglable.jsx'

const Blog = ({ blogs }) => {
    return (
        <div>
            <Togglable
                labelWhenVisible={'cancel'}
                labelWhenNotVisible={'new blog'}
            >
                <BlogForm />
            </Togglable>
            {blogs.map((blog) => (
                <div className="blog" key={blog.id}>
                    <span>
                        <Link to={`/blogs/${blog.id}`}>
                            {blog.title} {blog.author}
                        </Link>
                    </span>
                </div>
            ))}
        </div>
    )
}

export default Blog
