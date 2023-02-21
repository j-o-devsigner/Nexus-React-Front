import React from 'react'
import DeleteConfirmAction from './DeleteConfirmStyled'
import Button from '../Button/Button'
import Input from '../Input/Input'
import './deleteConfirm.css'

const DeleteConfirm = ( { title, text, textInfo, confirmInstruction, placeholder, value, onChange, acceptAction, declineAction, error } ) => {

    return (
        <>
        <div className="unclickeable">
            <DeleteConfirmAction>
                <div className="nexus__delete-confirm-title"><h3> { title } </h3></div>
                <div className="nexus__delete-confirm-text">
                    <p>{ textInfo }</p><br/>
                    <p id="text-delete">{ text }</p>
                    <p id="instructions"> {confirmInstruction}</p>
                </div>
                <div className="nexus__delete-confirm-input">
                    <Input
                    className={error ? "input-error" : ""}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    ></Input>
                </div>
                <div className="nexus__delete-confirm-buttons">
                <Button type="button" className="accept" onClick={acceptAction}>Accept</Button>
                <Button type="button" className="cancel" onClick={declineAction}>Decline</Button>
                </div>
            </DeleteConfirmAction>
        </div>
        </>
    )
}

export default DeleteConfirm