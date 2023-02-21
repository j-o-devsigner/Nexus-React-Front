import React from 'react'
import Input from '../Input/Input'
import './productItem.css'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

const ProductItem = ({ id, amount, name, detail, price, total, deleteAction, editAction, blockItems }) => {


    return (
        <>
            <div className="nexus__form-section_display-products_item" key={id}>
                <Input className="amount" defaultValue={amount} disabled/>
                <Input className="product" defaultValue={name} disabled/>
                <Input className="detail" defaultValue={detail} disabled/>
                <Input className="unit" defaultValue={"$" + price} disabled/>
                <Input className="total" defaultValue={"$" + total} disabled/>
                <div className="buttons">
                {editAction && <button className="edit-button"  value={id} onClick={editAction} style={blockItems ? { display: "none" } : { display: "flex" }}><AiFillEdit/></button>}
                {deleteAction && <button className="delete-button" value={id} onClick={deleteAction} style={blockItems ? { display: "none" } : { display: "flex" }}><AiFillDelete/></button>}
                </div>
            </div>
        </>
    )
}

export default ProductItem