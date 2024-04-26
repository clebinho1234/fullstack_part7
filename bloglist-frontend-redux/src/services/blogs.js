import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const createComment = async (comment, blog) => {
    const response = await axios.post(`${baseUrl}/${blog.id}/comments`, {
        comment,
        blog,
    })
    return response.data
}

const update = async (updatedObject) => {
    const response = await axios.put(
        `${baseUrl}/${updatedObject.id}`,
        updatedObject
    )
    return response.data
}

const remove = async (ObjectId) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${baseUrl}/${ObjectId}`, config)
    return response.data
}

export default { setToken, getAll, create, createComment, update, remove }
