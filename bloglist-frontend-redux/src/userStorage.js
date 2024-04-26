const KEY = 'loggedBlogAppUser'

const saveUser = (user) => {
    localStorage.setItem(KEY, JSON.stringify(user))
}

const loadUser = () => {
    const user = localStorage.getItem(KEY)
    return user ? JSON.parse(user) : null
}

const removeUser = () => {
    localStorage.removeItem(KEY)
}

export default { saveUser, loadUser, removeUser }
