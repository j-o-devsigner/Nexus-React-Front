import React from 'react'
import { Input, Label, Select, Option, Errors } from '../../../../../../components/form/components'
import { QuoteFormContext } from '../../../../../../contexts/QuoteFormContext'

const CustomerFormSection = () => {

    const {
        onChangeCustomer,
        customersData,
        emailCustomer,
        valueSelectCustomer,
        errors,
        listDone,
    } = React.useContext(QuoteFormContext)

    return (
        <>
            <div className="nexus__form-section_customer">
                {errors.noCustomer && <Errors message="Please, select a customer"/>}
                {errors.numberTaken && <Errors message="this quote number has already been taken, please enter another number"/>}
                <Label htmlFor="select-customer">Customer</Label>
                <Select
                        id="select-customer"
                        className={errors.noCustomer ? "input-error" : ""}
                        value={valueSelectCustomer}
                        onChange={onChangeCustomer}
                        disabled={listDone}
                        name="sendTo"
                        required
                    >
                    <Option
                        disabled
                        >Select a customer
                    </Option>
                    {customersData && customersData.length === 0 && <Option className="no-data" disabled>Create new clients...</Option>}
                    {customersData && customersData.length > 0 && customersData.map( (customer, index) => {
                        if(customer.active)
                        return <Option
                        key={index}
                        value={customer.id}
                        >{customer.name}</Option>
                    })
                    }
                </Select>
                <Input
                    placeholder="Email to send..."
                    readOnly
                    value={emailCustomer}
                />
            </div>
        </>
    )
}

export default CustomerFormSection