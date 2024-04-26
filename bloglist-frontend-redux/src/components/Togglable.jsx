import { useState } from 'react'
import { Button } from '@mui/material'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={showWhenVisible}>{props.children}</div>
            <Button onClick={toggleVisibility}>
                {visible
                    ? `${props.labelWhenVisible}`
                    : `${props.labelWhenNotVisible}`}
            </Button>
        </div>
    )
}

export default Togglable
