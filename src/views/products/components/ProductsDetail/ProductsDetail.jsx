import React from 'react'
import Navbar from '../../../../components/navbar/Navbar'
import useProductsDetail from '../../../../hooks/useProductsDetail'
import { Button, Input, TextArea, Label, Title, Confirm, Success } from '../../../../components/form/components'

import { AiOutlineArrowLeft } from 'react-icons/ai'
import UpsertProduct from '../UpsertProduct/UpsertProduct'

const ProductsDetail = () => {

    const {
        productData,
        backToProducts,
        editProduct,
        showUpdate,
        closeForm,
        confirmDeleteProduct,
        confirmDelete,
        deleteProduct,
        successMessage,
    } = useProductsDetail()

    return (
        <>
        {showUpdate && <UpsertProduct
            action="update"
            data={productData}
            closeUpdateForm={closeForm}
        />}
        {!showUpdate &&
            <div>
                <Navbar/>
                {confirmDelete &&
                    <Confirm
                        title={`Delete product ${productData.name}`}
                        text="Are you sure you want to delete this product?"
                        acceptAction={deleteProduct}
                        declineAction={confirmDeleteProduct}
                />}
                {successMessage &&
                    <Success
                        message={`Product Removed`}
                        doneAction={backToProducts}
                />}
                    <section className="nexus__section section__padding">
                        <Title>Product: {productData.name}</Title>
                        <div className="nexus__section-buttons">
                            <Button
                                type="button"
                                id="edit-btn"
                                onClick={editProduct}
                            >Edit Product</Button>
                            <Button
                                type="button"
                                id="delete-btn"
                                onClick={confirmDeleteProduct}
                            >Delete Product</Button>
                            <Button
                                type="button"
                                id="back-btn"
                                onClick={backToProducts}
                            ><AiOutlineArrowLeft/></Button>
                        </div>
                        <div className="nexus__section-detail">
                            <Label>Detail</Label>
                            <TextArea
                                value={productData.detail}
                                readOnly
                            ></TextArea>
                        </div>
                        <div className="nexus__section-price">
                            <Label>Price</Label>
                            <Input
                                value={productData.price}
                                className="input-number"
                                readOnly
                            />
                        </div>

                    </section>
            </div>
        }
        </>
    )
}

export default ProductsDetail