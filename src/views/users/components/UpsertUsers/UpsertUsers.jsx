import React from 'react'
import { Button, Input, Label, Form, Errors, Confirm, Success, Select, Option } from '../../../../components/form/components'
import { UserFormContext, UserFormProvider } from '../../../../contexts/UserFormContex'
import './upsertUsers.css'

const UpsertUsers = ( { action, data, closeUpdateForm } ) => {
    return (
        <>
        <UserFormProvider>
            <FormUser
                action={action}
                data={data}
                closeUpdateForm={closeUpdateForm}
            />
        </UserFormProvider>
        </>
    )
}

const FormUser = ( { action, data, closeUpdateForm } ) => {

    const {
        name,
        setName,
        username,
        setUsername,
        password,
        onChangeName,
        onChangePassword,
        onChangeUsername,
        setAction,
        closeForm,
        validateSubmitData,
        errors,
        confirmSubmit,
        submitData,
        closeModal,
        successMessage,
        role,
        onChangeRole,
        updateData,
        setRole,
        setOldUsername,
    } = React.useContext(UserFormContext)

    const setUpdateData = () => {
        setName(data.name)
        setUsername(data.username)
        setOldUsername(data.username)
        setRole(data.roleid)
    }

    React.useEffect( () => {
        if(action === "update") {
            setAction(action)
            setUpdateData()
        }
    }, [])

    return (
        <>
            <div className="nexus__form-containerForm">
                {errors.duplicateUsername && <Errors message="this username is already in use"/>}
                {errors.emptyName && <Errors message="enter a name for the user"/>}
                {errors.emptyUsername && <Errors message="enter an username for the user"/>}
                {errors.emptyPassword && action !== "update" && <Errors message="enter a password for the user"/>}
                {errors.emptyRole && action !== "update" && <Errors message="enter a role for the user"/>}
                {confirmSubmit &&
                <Confirm
                    title={action === "update" ? "Update a user" : "Create a user"}
                    text="Have you already validated all the data of this user?"
                    acceptAction={action === "update" ? updateData : submitData}
                    declineAction={closeModal}
                />}
                {successMessage &&
                <Success
                    message={action === "update" ? "done successfully" : `done successfully, User ${username} created`}
                    doneAction={closeForm}
                />}
            <Form
                className={action === "update" && data.roleid === 1 ? "small-form-users-update" : "small-form-users"}
                style={confirmSubmit || successMessage ? {zIndex: "-1"} : {zIndex: "0"} }
                >
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
                <Label
                    style={ action === "update" && data.roleid === 1 ? {display: "none"} : {display: "block"} }>
                        {action === "update" && data.roleid === 2 ? "New Password" : "Password"}
                </Label>
                    <Input
                        style={ action === "update" && data.roleid === 1 ? {display: "none"} : {} }
                        className={errors.emptyPassword && action !== "update" ? "input-error" : ""}
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                    />
                <Label className="block">Role</Label>
                <Select
                        id="select-users"
                        className={errors.emptyRole ? "input-error" : ""}
                        name="roleid"
                        value={role}
                        onChange={onChangeRole}
                    >
                    <Option
                        disabled
                        >Select a role
                    </Option>
                    <Option
                        value="1"
                        >Administrator
                    </Option>
                    <Option
                        value="2"
                        >Manager
                    </Option>
                </Select>
                <div className="nexus__form-buttons">
                        {action === "update" ?
                        <Button
                            id="create-btn"
                            type="button"
                            onClick={validateSubmitData}
                        >Update User</Button>
                        :
                        <Button
                            id="create-btn"
                            type="button"
                            onClick={validateSubmitData}
                        >Register User</Button>
                        }
                        {action === "update" ?
                        <Button
                            id="close-btn"
                            type="button"
                            onClick={closeUpdateForm}
                        >Cancel</Button>
                        :
                        <Button
                            id="close-btn"
                            type="button"
                            onClick={closeForm}
                        >Cancel</Button>
                        }
                    </div>
            </Form>
            </div>
        </>
    )
}

export default UpsertUsers