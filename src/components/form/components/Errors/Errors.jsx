import React from 'react'
import InputErrorMessage from './ErrorStyled';

const Errors = ( { message } ) => {
const [visible, setVisible] = React.useState(false)
const [animation, setAnimation] = React.useState(false)

React.useEffect(() => {
    if (message) {
        setVisible(true)
        transition()
        setTimeout(() => {
        setVisible(false)
        }, 3000)
    }
    }, [message])

    const transition = () => {
        setAnimation(true)
        setTimeout( () => {
            setAnimation(false)
        }, 2800)
    }

    if (!visible) return null;
    return (
        <>
            <InputErrorMessage style={ !animation ? { opacity: "0" } : {}  }>{message}</InputErrorMessage>
        </>
    )
}

export default Errors