import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'

const useProductsDetail = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [productData, setProductData] = useState({})
    const [showUpdate, setShowUpdate] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)

    const getProduct = async () => {
        if(id) {
            await axios.get(`http://localhost:3003/products/${id}`)
                .then( result => {
                    result = result.data.body[0]
                    setProductData(result)
                })
        }
    }

    const deleteProduct = async (e) => {
        e.preventDefault()
        if(id) {
            const response = await axios.put(`http://localhost:3003/products/${id}`, { active: false })
            if(response.data.body === "products updated!") {
                setSuccessMessage(true)
                setConfirmDelete(false)
            }
        }
    }

    const editProduct = () => {
        setShowUpdate(toggle => !toggle)
    }

    const backToProducts = () => {
        navigate('/products')
    }

    const closeForm = () => {
        setShowUpdate(false)
    }

    const confirmDeleteProduct = () => {
        setConfirmDelete(toggle => !toggle)
    }

    useEffect( () => {
        getProduct()
    }, [])

    return {
        productData,
        backToProducts,
        editProduct,
        showUpdate,
        closeForm,
        confirmDeleteProduct,
        confirmDelete,
        deleteProduct,
        successMessage,
    }
}

export default useProductsDetail