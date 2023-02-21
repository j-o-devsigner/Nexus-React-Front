import React from 'react'
import { Button, Confirm, Errors, Form, Input, Label, Success, Title } from '../../../components/form/components'
import useAccount from '../../../hooks/useAccount'

const UpdateInfo = ( { data, closeForm } ) => {

    const {
        setName,
        setUsername,
        name,
        username,
        password,
        onChangeName,
        onChangeUsername,
        onChangePassword,
        setOldUsername,
        validateSubmitData,
        errors,
        closeModal,
        confirmSubmit,
        successMessage,
        updateData,
        setIdRef,
    } = useAccount()

    const setDataInInputs = () => {
        setName(data.name)
        setUsername(data.username)
        setOldUsername(data.username)
        setIdRef(data.idRef)
    }

    React.useEffect( () => {
        setDataInInputs()
    }, [])

    return (
        <>
            <div className="nexus__form-containerForm">
                {errors.emptyName && <Errors message="enter a name for the customer"/>}
                {errors.emptyUsername && <Errors message="enter an email for the customer"/>}
                {errors.invalidEmail && <Errors message="Invalid email"/>}
                {errors.duplicateUsername && <Errors message="This email has already been registered"/>}
                {confirmSubmit &&
                <Confirm
                    title="Update Account"
                    text="Have you already validated all the data?"
                    acceptAction={updateData}
                    declineAction={closeModal}
                />}
                {successMessage &&
                <Success
                    message={"done successfully"}
                    doneAction={closeForm}
                />}
                <Form
                    className="small-form-users account"
                    style={confirmSubmit || successMessage ? {zIndex: "-1"} : {zIndex: "0"}}
                >
                    <Title>Update my Info</Title>
                    <Label>Name </Label>
                    <Input
                        className={errors.emptyName ? "input-error" : ""}
                        name="name"
                        value={name}
                        onChange={onChangeName}
                    />
                    <Label>Username</Label>
                    <Input
                        className={errors.emptyUsername || errors.duplicateUsername ? "input-error" : ""}
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                    />
                    <Label style={{display: "block"}}>New Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                    />
                    <div className="nexus__form-buttons">
                        <Button
                            id="create-btn"
                            type="button"
                            onClick={validateSubmitData}
                        >Update</Button>
                        <Button
                            id="close-btn"
                            type="button"
                            onClick={closeForm}
                        >Cancel</Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default UpdateInfo