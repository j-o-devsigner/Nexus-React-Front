import React from 'react'
import Navbar from '../../../../components/navbar/Navbar'
import { Button, Input, Label, ProductItem, Title, DeleteConfirm, Success, Confirm } from '../../../../components/form/components'
import UpsertQuote from '../upsertQuote/UpsertQuote';
import useQuotesDetail from '../../../../hooks/useQuotesDetail';
import { AiOutlineArrowLeft } from 'react-icons/ai'

import './quotesDetail.css'

const QuotesDetail = () => {

    const {
        id,
        quoteData,
        customer,
        showUpdate,
        productsItemsData,
        generateMail,
        editQuote,
        deleteQuote,
        closeForm,
        backToQuotes,
        confirmModalDelete,
        confirmModals,
        onChangeConDel,
        inputConfirmDelete,
        errors,
        confirmModalMail,
        closeModalMail,
    } = useQuotesDetail()

    return (
        <>
            {showUpdate && <UpsertQuote
                action="update"
                data={quoteData}
                productsDataUpdate={productsItemsData}
                closeUpdateForm={closeForm}
            /> }
            {!showUpdate &&
            <div>
                <Navbar />
            <section className="nexus__section section__padding">
                {confirmModals.delete && <DeleteConfirm
                    title={`Delete quote ${id}`}
                    textInfo={`Are you sure you want to delete the quote number ${id} of the customer ${quoteData.customer.name}?`}
                    text={`this quote will be archived and can only be seen by system administrators, but never restored.`}
                    confirmInstruction={`write "I am sure" in capital letters if you are sure`}
                    placeholder={"I AM SURE"}
                    onChange={onChangeConDel}
                    value={inputConfirmDelete}
                    acceptAction={deleteQuote}
                    declineAction={confirmModalDelete}
                    error={errors.inputDelete}
                ></DeleteConfirm> }
                {confirmModals.mail && <Confirm
                    title="Send Email"
                    text={`Do you want to send quote ${id} to ${quoteData.customer.name} at ${quoteData.customer.email}`}
                    declineAction={confirmModalMail}
                    acceptAction={generateMail}
                />}
                {confirmModals.success && <Success
                    message={confirmModals.successDelete ? `Quote ${id} was successfully removed` : `The quote was sent to ${quoteData.customer.email}`}
                    doneAction={confirmModals.successDelete ? backToQuotes : closeModalMail}
                />}
            <Title id="title-detail">{`Quote number ${id}`}</Title>
            <div className="nexus__section-buttons">
            {!quoteData.sended && quoteData.active && (
            <>
                <Button id="send-btn" onClick={confirmModalMail}>Send Quote</Button>
                <Button id="edit-btn" onClick={editQuote}>Edit Quote</Button>
                <Button id="delete-btn" onClick={confirmModalDelete}>Delete Quote</Button>
            </>
            )}
            {quoteData.sended && quoteData.active && (
            <Button id="delete-btn" onClick={confirmModalDelete}>Delete Quote</Button>
            )}
                <Button
                    id="back-btn"
                    onClick={backToQuotes}
                ><AiOutlineArrowLeft/></Button>
                </div>
            <div className="nexus__section-customer">
                <Label>Customer</Label>
                <Input
                    readOnly
                    defaultValue={customer.name}
                    className="nexus_margin-inputs"
                />
                <Input
                    placeholder="Email to send..."
                    readOnly
                    defaultValue={customer.email}
                />
            </div>
            <div className="nexus__section-products">
            <div className="nexus__section-display-products">
                <div className="nexus__section-display-products_item-header">
                    <Input id="amount" defaultValue="Amount" disabled/>
                    <Input id="product" defaultValue="Product" disabled/>
                    <Input id="detail" defaultValue="Description" disabled/>
                    <Input id="unit" defaultValue="Unit Value" disabled/>
                    <Input id="total" defaultValue="Total Units" disabled/>
                </div>
                {productsItemsData.map( product => {
                    product = product.product
                        if (product.amount && product.name && product.detail && product.price && product.total)
                        return <ProductItem
                            key={product.id}
                            id={product.id}
                            amount={product.amount}
                            name={product.name}
                            detail={product.detail}
                            price={product.price}
                            total={product.total}
                            />
                    })
                    }
                </div>
                <div className="nexus__section-discounts">
                    <Label>Discounts</Label>
                    {Number(quoteData.idtypediscount) === 1 &&
                    <div>
                        <Input
                            defaultValue="No discount"
                            className="nexus_margin-inputs"
                            readOnly
                        />
                        <Label>Subtotal</Label>
                        <Input
                            defaultValue={quoteData.subtotal}
                            className="nexus_margin-inputs size-inputs-tNumbers"
                            readOnly
                        />
                    </div>
                    }
                    {Number(quoteData.idtypediscount) === 2 &&
                    <div>
                        <Input
                            defaultValue="Percentage"
                            className="nexus_margin-inputs"
                            readOnly
                            />
                        <Label>Discount Value</Label>
                        <Input
                            defaultValue={quoteData.discountvalue}
                            className="nexus_margin-inputs size-inputs-tNumbers"
                            readOnly
                            />
                        <Label>Subtotal</Label>
                        <Input
                            defaultValue={quoteData.subtotal}
                            className="nexus_margin-inputs size-inputs-tNumbers"
                            readOnly
                            />
                    </div>
                    }
                    {
                    Number(quoteData.idtypediscount) === 3 &&
                    <div>
                        <Input
                            defaultValue="Fixed Amount"
                            className="nexus_margin-inputs"
                            readOnly
                            />
                        <Label>Discount Value</Label>
                        <Input
                            defaultValue={quoteData.discountvalue}
                            className="nexus_margin-inputs size-inputs-tNumbers"
                            readOnly
                            />
                        <Label>Subtotal</Label>
                        <Input
                            defaultValue={quoteData.subtotal}
                            readOnly
                        />
                    </div>
                    }
                </div>
                <div className="nexus__section-total">
                    <Label>Shipping Value</Label>
                    <Input
                        defaultValue={quoteData.shippingvalue}
                        className="nexus_margin-inputs size-inputs-tNumbers"
                        readOnly
                    />
                    <Label>Total</Label>
                    <Input
                        defaultValue={quoteData.total}
                        className="size-inputs-tNumbers"
                        readOnly
                    />
                </div>
            </div>
            </section>
            </div>
            }
        </>
    )
}

export default QuotesDetail