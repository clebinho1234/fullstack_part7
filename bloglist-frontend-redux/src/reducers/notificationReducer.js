import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        changeNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return null
        },
    },
})

export const { changeNotification, clearNotification } =
    notificationSlice.actions

let notificationTimer = null

export const setNotification = (content, type, timer) => {
    const newNotification = {
        text: content,
        type: type,
    }

    return (dispatch) => {
        if (notificationTimer) {
            clearTimeout(notificationTimer)
        }

        dispatch(changeNotification(newNotification))
        notificationTimer = setTimeout(() => {
            dispatch(clearNotification())
        }, timer * 1000)
    }
}

export default notificationSlice.reducer
