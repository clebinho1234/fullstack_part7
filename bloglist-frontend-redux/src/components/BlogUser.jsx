const BlogUser = ({ user }) => {
    if (!user) {
        return null
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <h4>added blogs</h4>
            {user.blogs.map((blog) => (
                <ul>
                    <li key={blog.id}>{blog.title}</li>
                </ul>
            ))}
        </div>
    )
}

export default BlogUser
