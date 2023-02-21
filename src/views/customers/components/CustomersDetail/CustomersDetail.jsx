import React, { useEffect } from 'react'
import Navbar from '../../../../components/navbar/Navbar'
import { Button, Input, Label, Title, Confirm, Success } from '../../../../components/form/components'
import UpsertCustomer from '../UpsertCustomer/UpsertCustomer'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import useCustomersDetail from '../../../../hooks/useCustomersDetail'


const CustomersDetail = () => {

    const {
        customerData,
        backToCustomers,
        editCustomer,
        showUpdate,
        closeForm,
        confirmDeleteCustomer,
        confirmDelete,
        deleteCustomer,
        successMessage,
    } = useCustomersDetail()

    return (
        <>
        {showUpdate && <UpsertCustomer
            action="update"
            data={customerData}
            closeUpdateForm={closeForm}
        />}
        {!showUpdate &&
            <div>
                <Navbar/>
                {confirmDelete &&
                    <Confirm
                        title={`Delete customer ${customerData.name}`}
                        text="Are you sure you want to delete this customer?"
                        acceptAction={deleteCustomer}
                        declineAction={confirmDeleteCustomer}
                />}
                {successMessage &&
                    <Success
                        message={`Customer Removed`}
                        doneAction={backToCustomers}
                />}
                    <section className="nexus__section section__padding">
                        <div className="nexus__section-buttons">
                            <Button
                                type="button"
                                id="edit-btn"
                                onClick={editCustomer}
                            >Edit Customer</Button>
                            <Button
                                type="button"
                                id="delete-btn"
                                onClick={confirmDeleteCustomer}
                            >Delete Customer</Button>
                            <Button
                                type="button"
                                id="back-btn"
                                onClick={backToCustomers}
                            ><AiOutlineArrowLeft/></Button>
                        </div>
                        <Title>Customer: {customerData.name}</Title>
                        <div className="nexus__section-email">
                            <Label>Email</Label>
                            <Input
                                value={customerData.email}
                                readOnly
                            />
                        </div>

                    </section>
            </div>
        }
        </>
    )
}

export default CustomersDetail