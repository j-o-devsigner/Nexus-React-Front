import React from 'react'
import SuccessMessage from './SuccessStyled'
import './success.css'
import Button from '../Button/Button'

const Success = ( { message, doneAction } ) => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const displayLoader = () => {
        if(message) {
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
                setIsSuccess(true)
            }, 2000)
        }
    }

    React.useEffect( () => {
        displayLoader()
    }, [])

    return (
        <>
        <div className="unclickeable">
        {isLoading ? <img src="https://i.ibb.co/hMNcNmz/icon-loader.png" className="nexus__success-iconLoader" /> : <></>}
        {isSuccess &&
        <SuccessMessage>
            <div className="nexus__success-title">
                <h3>{ message }</h3>
            </div>
            <div className="nexus__success-button">
                <Button type="button" className="nexus__success-done-btn" onClick={doneAction}>Done!</Button>
            </div>
        </SuccessMessage>
        }
        </div>
        </>
    )
}

export default Success