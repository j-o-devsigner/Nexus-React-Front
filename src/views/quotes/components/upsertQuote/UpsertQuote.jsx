import React from 'react'
import { Form, Input, Title } from '../../../../components/form/components'
import CustomerFormSection from './components/customerFormSection/CustomerFormSection';
import ProductsFormSection from './components/productsFormSection/ProductsFormSection';
import DiscountsFormSection from './components/discountsFormSection/DiscountsFormSection';
import TotalFormSection from './components/totalFormSection/TotalFormSection';
import { QuoteFormContext, QuoteFormProvider } from '../../../../contexts/QuoteFormContext';
import './upsertQuote.css'

const UpsertQuote = ( { action, data, productsDataUpdate, closeUpdateForm } ) => {

    return (
        <>
        <QuoteFormProvider>
            <FormQuote
            action={action}
            data={data}
            productsDataUpdate={productsDataUpdate}
            closeUpdateForm={closeUpdateForm}
            />
        </QuoteFormProvider>
        </>
    )
}

const FormQuote = ( { action, data, productsDataUpdate, closeUpdateForm } ) => {

    const {
        formRef,
        quoteNumber,
        onChangeQuoteN,
        setQuoteNumber,
        setEmailCustomer,
        setProductsItemsData,
        setAction,
        setSubtotal,
        setTotal,
        setQuoteNumberUpdate,
        quoteNumberUpdate,
        setValueSelectCustomer,
        setValueSelectDiscount,
        setInputValuePercentage,
        setInputValueFixed,
        setInputShippingValue,
        setDataToUpdate,
        dataToUpdate,
        setInputDiscountValue,
        listDone,
        errors,
    } = React.useContext(QuoteFormContext)

    const setUpdateData = () => {
        setQuoteNumber(data.quotenumber)
        setValueSelectCustomer(data.customer.id)
        setEmailCustomer(data.customer.email)

        data.idtypediscount.toString() === "1" ?
        setValueSelectDiscount("1") :
        setDiscounts()

        setInputShippingValue(data.shippingvalue)
        setProductsItemsData(productsDataUpdate)
        setSubtotal(Number(data.subtotal))
        setTotal(Number(data.total))

        data.idtypediscount.toString() === "1" ?
        setDataToUpdate({
            ...dataToUpdate,
            sendTo: Number(data.customer.id),
            shippingValue: Number(data.shippingvalue),
            subtotal: Number(data.subtotal),
            total: Number(data.total),
            discount: false
        }) :
        setDataUpdate()
    }

    const setDiscounts = () => {
        setValueSelectDiscount(data.idtypediscount.toString())
        if (data.idtypediscount.toString() === "2") {
            setInputValuePercentage(Number(data.percentagediscount))
            setInputDiscountValue(Number(data.discountvalue))
        }
            setInputValueFixed(Number(data.discountvalue))
    }

    const setDataUpdate = () => {
        data.idtypediscount.toString() === "2" ?
        setDataToUpdate({
            ...dataToUpdate,
            sendTo: Number(data.customer.id),
            shippingValue: Number(data.shippingvalue),
            subtotal: Number(data.subtotal),
            total: Number(data.total),
            discount: true,
            idTypeDiscount: 2,
            percentageDiscount: Number(data.percentagediscount),
            discountValue: Number(data.discountvalue)
        })
        :
        setDataToUpdate({
            ...dataToUpdate,
            sendTo: Number(data.customer.id),
            shippingValue: Number(data.shippingvalue),
            subtotal: Number(data.subtotal),
            total: Number(data.total),
            discount: true,
            idTypeDiscount: 3,
            discountValue: Number(data.discountvalue)
        })
    }

    React.useEffect( () => {
        if(action === "update") {
            setQuoteNumberUpdate(data.quotenumber)
            setAction(action)
            setUpdateData()
        }
    }, [])

    return (
        <>
        <div className="nexus__form-containerForm">
            <Form ref={formRef}>
                {action === "update" ?
                <Title id="title-edit">Edit Quote
                <Input
                    className={errors.numberTaken ? "input-error" : ""}
                    id="quote-number"
                    value={action === "update" ? quoteNumberUpdate : quoteNumber}
                    readOnly={listDone}
                    onChange={onChangeQuoteN}
                ></Input></Title>
                :
                <Title>Create a New Quote</Title>
                }
                <CustomerFormSection/>
                <ProductsFormSection/>
                <DiscountsFormSection/>
                <TotalFormSection
                closeUpdateForm={closeUpdateForm}
                />
            </Form>
        </div>
        </>
    )
}

export default UpsertQuote