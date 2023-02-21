import React from 'react'
import { Button, Input, Label, Select, Option, ProductItem, Errors } from '../../../../../../components/form/components'
import { QuoteFormContext } from '../../../../../../contexts/QuoteFormContext'

const ProductsFormSection = () => {

        const {
            listDone,
            addItem,
            deleteItem,
            updateItem,
            selectProducts,
            productsItemsData,
            inputAmountValue,
            productsData,
            blockList,
            amountInput,
            onChangeAmount,
            errorsProducts,
            errors
        } = React.useContext(QuoteFormContext)

    return (
        <>
        <div className="nexus__form-section_products">
            {errorsProducts.selectProducts && <Errors message="Please Select a product"/>}
            {errorsProducts.existingProduct && <Errors message="This product already exists in the list, modify it instead"/>}
            {errorsProducts.notZero && <Errors message="The amount value can't be 0 or null"/>}
            {errors.emptyList && <Errors message="ops! your list is empty, enter some products"/>}
                    <Label className="nexus__form-section_products-title">Add Products</Label>
                    <Label htmlFor="select-products">Product</Label>
                        <Select
                                id="select-products"
                                className={errorsProducts.selectProducts ? "input-error" : ""}
                                defaultValue="Select a product"
                                ref={selectProducts}
                                disabled={listDone}
                            >
                            <Option
                                disabled
                                >Select a product
                            </Option>
                            {productsData && productsData.length === 0 && <Option className="no-data" disabled>Create new products...</Option>}
                            {productsData && productsData.length > 0 && productsData.map( (product, index) => {
                                if(product.active)
                                return <Option
                                key={index}
                                value={product.id}
                                >{product.name}</Option>
                            })
                            }
                        </Select>
                    <Label>Amount</Label>
                    <Input
                        id="amountInput"
                        value={amountInput}
                        onChange={onChangeAmount}
                        ref={inputAmountValue}
                        readOnly={listDone}
                    />
                    <Button
                        className="nexus__form-create-btn"
                        onClick={addItem}
                        disabled={listDone}
                        >
                    Add product
                    </Button>
                    <Button
                        className="nexus__form-list-done-btn"
                        onClick={blockList}
                        >
                        {listDone === false ? 'List Done!' : 'Edit List'}
                    </Button>
                </div>
                <div className={errors.emptyList ? "nexus__form-section_display-products input-error" : "nexus__form-section_display-products"}>
                    <div className="nexus__form-section_display-products_item-header">
                        <Input id="amount" defaultValue="Amount" disabled/>
                        <Input id="product" defaultValue="Product" disabled/>
                        <Input id="detail" defaultValue="Description" disabled/>
                        <Input id="unit" defaultValue="Unit Value" disabled/>
                        <Input id="total" defaultValue="Total Units" disabled/>
                    </div>
                    {productsItemsData.map( product => {
                        product = product.product;
                        if (product.amount && product.name && product.detail && product.price && product.total)
                        return <ProductItem
                            key={product.id}
                            id={product.id}
                            amount={product.amount}
                            name={product.name}
                            detail={product.detail}
                            price={product.price}
                            total={product.total}
                            deleteAction={deleteItem}
                            editAction={updateItem}
                            blockItems={listDone}
                            />
                    })
                    }
            </div>
        </>
    )
}

export default ProductsFormSection