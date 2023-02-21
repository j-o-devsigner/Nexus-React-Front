import React, { useEffect } from 'react'
import { Button, Confirm, Errors, Form, Input, Label, Success, Title } from '../../../../components/form/components'
import { CustomerFormContext, CustomerFormProvider } from '../../../../contexts/CustomerFormContext'
import './upsertCustomer.css'

const UpsertCustomer = ( { action, data, closeUpdateForm } ) => {
    return (
    <>
        <CustomerFormProvider>
            <FormCustomer
                action={action}
                data={data}
                closeUpdateForm={closeUpdateForm}
            />
        </CustomerFormProvider>
    </>
    )
}

const FormCustomer = ( { action, data, closeUpdateForm } ) => {

    const {
        onChangeName,
        onChangeEmail,
        nameCustomer,
        emailCustomer,
        setAction,
        errors,
        validateSubmitData,
        closeModal,
        confirmSubmit,
        successMessage,
        closeForm,
        submitData,
        setEmailCustomer,
        setNameCustomer,
        updateData,
    } = React.useContext(CustomerFormContext)

    const setUpdateData = () => {
        setNameCustomer(data.name)
        setEmailCustomer(data.email)
    }

    useEffect( () => {
        if(action === "update") {
            setAction(action)
            setUpdateData()
        }
    }, [])

    return (
        <>
            <div className="nexus__form-containerForm">
                {errors.emptyName && <Errors message="enter a name for the customer"/>}
                {errors.emptyEmail && <Errors message="enter an email for the customer"/>}
                {errors.invalidEmail && <Errors message="Invalid email"/>}
                {confirmSubmit &&
                <Confirm
                    title={action === "update" ? "Update a customer" : "Create a customer"}
                    text="Have you already validated all the data of your customer?"
                    acceptAction={action === "update" ? updateData : submitData}
                    declineAction={closeModal}
                />}
                {successMessage &&
                <Success
                    message={action === "update" ? "done successfully" : `done successfully, Customer ${nameCustomer} created`}
                    doneAction={closeForm}
                />}
                <Form
                    className="small-form-customers"
                    style={confirmSubmit || successMessage ? {zIndex: "-1"} : {zIndex: "0"}}
                >
                    <Title>{action === "update" ? "Update a Customer" : "Create a Customer"} </Title>
                    <Label>Name</Label>
                    <Input
                        className={errors.emptyName ? "input-error" : ""}
                        name="name"
                        value={nameCustomer}
                        onChange={onChangeName}
                    />
                    <Label>Email</Label>
                    <Input
                        className={errors.emptyEmail || errors.invalidEmail && action !== "update" ? "input-error" : ""}
                        type="email"
                        name="email"
                        value={emailCustomer}
                        onChange={onChangeEmail}
                        required
                    />
                    <div className="nexus__form-buttons">
                        {action === "update" ?
                        <Button
                            id="create-btn"
                            type="button"
                            onClick={validateSubmitData}
                        >Update Customer</Button>
                        :
                        <Button
                            id="create-btn"
                            type="button"
                            onClick={validateSubmitData}
                        >Create Customer</Button>
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

export default UpsertCustomer