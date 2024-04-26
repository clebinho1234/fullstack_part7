import { useState } from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={showWhenVisible}>{props.children}</div>
            <button onClick={toggleVisibility}>
                {visible
                    ? `${props.labelWhenVisible}`
                    : `${props.labelWhenNotVisible}`}
            </button>
        </div>
    )
}

export default Togglable
