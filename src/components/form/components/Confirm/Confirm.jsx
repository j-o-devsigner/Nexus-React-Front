import React from 'react'
import Button from '../Button/Button'
import ConfirmAction from './ConfirmStyled'
import './confirm.css'

const Confirm = ({ title, text, acceptAction, declineAction}) => {
    return (
        <>
        <div className="unclickeable">
            <ConfirmAction>
                <div className="nexus__confirm-title"><h3>{ title }</h3></div>
                <div className="nexus__confirm-text">{ text }</div>
                <div className="nexus__confirm-buttons">
                <Button type="button" className="accept" onClick={acceptAction}>Accept</Button>
                <Button type="button" className="cancel" onClick={declineAction}>Decline</Button>
                </div>
            </ConfirmAction>
        </div>
        </>
    )
}

export default Confirm