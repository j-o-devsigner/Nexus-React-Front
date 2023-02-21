import React from 'react'
import { useEffect } from 'react'
import { Button, Confirm, Errors, Form, Input, Label, Success, TextArea, Title } from '../../../../components/form/components'
import { ProductFormContext, ProductFormProvider } from '../../../../contexts/ProductFormContext'
import './upsertProduct.css'

const UpsertProduct = ( { action, data, closeUpdateForm } ) => {
    return (
        <>
            <ProductFormProvider>
                <FormProduct
                    action={action}
                    data={data}
                    closeUpdateForm={closeUpdateForm}
                />
            </ProductFormProvider>
        </>
    )
}

const FormProduct = ( { action, data, closeUpdateForm } ) => {

    const {
        onChangeName,
        onChangeDetail,
        onChangePrice,
        nameProduct,
        setNameProduct,
        detailProduct,
        setDetailProduct,
        priceProduct,
        setPriceProduct,
        validateSubmitData,
        confirmSubmit,
        errors,
        setAction,
        closeModal,
        submitData,
        successMessage,
        closeForm,
        updateData,
    } = React.useContext(ProductFormContext)

    const setUpdateData = () => {
        setNameProduct(data.name)
        setDetailProduct(data.detail)
        setPriceProduct(Number(data.price))
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
            {errors.emptyName && <Errors message="Enter the name of your product" />}
            {errors.emptyDetail && <Errors message="Enter the details of your product" />}
            {errors.emptyPrice && <Errors message="Enter the price of your product" />}
            {errors.priceZero && <Errors message="The price of your product cannot be 0" />}
            {confirmSubmit &&
                <Confirm
                    title={action === "update" ? "Update a product" : "Create a product"}
                    text="Have you already validated all the data of your product?"
                    acceptAction={action === "update" ? updateData : submitData}
                    declineAction={closeModal}
                />}
            {successMessage &&
                <Success
                    message={action === "update" ? "done successfully" : `done successfully, Product ${nameProduct} created`}
                    doneAction={closeForm}
                />}
                <Form
                    className="small-form"
                    style={confirmSubmit || successMessage ? {zIndex: "-1"} : {zIndex: "0"}}
                    >
                    <Title>{action === "update" ? "Update a Product" : "Create a Product"}</Title>
                    <div className="nexus__form-nameSection">
                    <Label>Name</Label>
                    <Input
                        className={errors.duplicateName && action !== "update" || errors.emptyName ?  "input-error" : ""}
                        name="name"
                        value={nameProduct}
                        onChange={onChangeName}
                        placeholder="Product..."
                    />
                    </div>
                    <div className="nexus__form-detailSection">
                    <Label>Detail</Label>
                    <TextArea
                        className={errors.emptyDetail ? "input-error" : ""}
                        name="detail"
                        onChange={onChangeDetail}
                        value={detailProduct}
                        placeholder="Amazing product description..."
                    ></TextArea>
                    </div>
                    <div className="nexus__form-priceSection">
                    <Label>Price</Label>
                    <Input
                        className={errors.emptyPrice || errors.priceZero ? "input-number input-error" : "input-number"}
                        name="price"
                        value={priceProduct}
                        onChange={onChangePrice}
                        placeholder="1..."
                    />
                    </div>
                    <div className="nexus__form-buttons">
                        {action === "update" ?
                        <Button
                            id="create-btn"
                            type="button"
                            onClick={validateSubmitData}
                        >Update Product</Button>
                        :
                        <Button
                            id="create-btn"
                            type="button"
                            onClick={validateSubmitData}
                        >Create Product</Button>
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


export default UpsertProduct