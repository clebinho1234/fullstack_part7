import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        addBlog(state, action) {
            state.push(action.payload)
        },
        likeBlog(state, action) {
            const updateBlog = action.payload
            return state
                .map((blog) => (blog.id !== updateBlog.id ? blog : updateBlog))
                .sort((a, b) => b.likes - a.likes)
        },
        removeBlog(state, action) {
            const blogToDelete = action.payload
            return state.filter((blog) => blog.id !== blogToDelete.id)
        },
        commentBlog(state, action) {
            const updateBlog = action.payload
            return state
                .map((blog) => (blog.id !== updateBlog.id ? blog : updateBlog))
                .sort((a, b) => b.likes - a.likes)
        },
    },
})

export const { setBlogs, addBlog, likeBlog, removeBlog, commentBlog } =
    blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
    }
}

export const createBlog = (title, author, url) => {
    const newBlog = {
        title: title,
        author: author,
        url: url,
    }
    return async (dispatch) => {
        const blogAdded = await blogService.create(newBlog)
        dispatch(addBlog(blogAdded))
    }
}

export const updateLike = (blog) => {
    const updateBlog = {
        ...blog,
        likes: blog.likes + 1,
    }
    return async (dispatch) => {
        await blogService.update(updateBlog)
        dispatch(likeBlog(updateBlog))
    }
}

export const deleteBlog = (blog) => {
    return async (dispatch) => {
        await blogService.remove(blog.id)
        dispatch(removeBlog(blog))
    }
}

export const createComment = (comment, blog) => {
    const newComment = {
        text: comment,
    }
    return async (dispatch) => {
        await blogService.createComment(newComment, blog)
        const blogs = await blogService.getAll()
        const updateBlog = blogs.find((b) => b.id === blog.id)
        dispatch(commentBlog(updateBlog))
    }
}

export default blogSlice.reducer
