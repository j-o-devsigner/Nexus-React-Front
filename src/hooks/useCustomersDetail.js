import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import config from '../config'

const useCustomersDetail = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [customerData, setCustomerData] = useState({})
    const [showUpdate, setShowUpdate] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)

    const getCustomer = async () => {
        if(id) {
            await axios.get(`${config.customers_route}/${id}`)
                .then( result => {
                    result = result.data.body[0]
                    setCustomerData(result)
                })
        }
    }

    const deleteCustomer = async (e) => {
        e.preventDefault()
        if(id) {
            const response = await axios.put(`${config.customers_route}/${id}`, { active: false })
            if(response.data.body === "customers updated!") {
                setSuccessMessage(true)
                setConfirmDelete(false)
            }
        }
    }

    const editCustomer = () => {
        setShowUpdate(toggle => !toggle)
    }

    const backToCustomers = () => {
        navigate('/customers')
    }

    const closeForm = () => {
        setShowUpdate(false)
    }

    const confirmDeleteCustomer = () => {
        setConfirmDelete(toggle => !toggle)
    }

    useEffect( () => {
        getCustomer()
    }, [])

    return {
        customerData,
        backToCustomers,
        editCustomer,
        showUpdate,
        closeForm,
        confirmDeleteCustomer,
        confirmDelete,
        deleteCustomer,
        successMessage,
    }
}

export default useCustomersDetail