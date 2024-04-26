import { useNotificationValue } from '../contexts/NotificationContext'

const Notification = () => {
    const notification = useNotificationValue()

    if (notification === null) {
        return null
    }

    return <div className={notification.type}>{notification.text}</div>
}

export default Notification
