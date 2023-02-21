import React from 'react'
import { useNavigate } from 'react-router'
import nopage from '../../assets/nopage.png'
import { Button } from '../../components/form/components'
import './noPage.css'

const NoPage = () => {

    const navigate = useNavigate()

    const backToLanding = () => {
        navigate('/')
    }

    return (
        <>
            <div className="nopage-container">
                <img src={nopage} alter="Not found" className="floating-image"/>
            </div>
            <div className="nopage-container-btn">
                <Button
                    type="button"
                    className="create-btn"
                    onClick={backToLanding}
                    >Back Home</Button>
            </div>
        </>
    )
}

export default NoPage