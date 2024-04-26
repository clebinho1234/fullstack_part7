import { createContext } from 'react'
import { useReducer, useContext, useEffect } from 'react'

const notificationReducer = (state, action) => {
    return action
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(
        notificationReducer,
        null
    )

    useEffect(() => {
        const timer = setTimeout(() => {
            notificationDispatch(null)
        }, 5000)
        return () => clearTimeout(timer)
    }, [notification])

    return (
        <NotificationContext.Provider
            value={[notification, notificationDispatch]}
        >
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext
