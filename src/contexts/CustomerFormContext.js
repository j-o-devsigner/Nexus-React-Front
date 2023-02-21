import React, { useState, useEffect, createContext } from "react"
import { useParams, useNavigate } from "react-router"
import axios from "axios"
import config from "../config"

const CustomerFormContext = createContext()

const CustomerFormProvider = ( { children } ) => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [dataCustomers, setDataCustomers] = useState({})
    const [action, setAction] = useState("create")
    const [confirmSubmit, setConfirmSubmit] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const [dataToCreate, setDataToCreate] = useState({})
    const [dataToUpdate, setDataToUpdate] = useState({})
    const [nameCustomer, setNameCustomer] = useState("")
    const [emailCustomer, setEmailCustomer] = useState("")
    const [errors, setErrors] = useState({})

    const listProducts = async () => {
        await axios.get(config.customers_route)
        .then( res => setDataCustomers(res.data.body))
    }

    useEffect(() => {
        listProducts();
    }, []);

    const onChangeName = (e) => {
        const onlyLettersAndSpaces = /^[a-zA-Z\s]*$/;
        const value = e.target.value;
        if (onlyLettersAndSpaces.test(value)) {
            setNameCustomer(value);
            setDataInputs(e.target.name, value);
        }
    }

    const onChangeEmail = (e) => {
        setEmailCustomer(e.target.value)
        setDataInputs(e.target.name, e.target.value)
    }

    const setDataInputs = (name, value) => {
        action === "create" ?
        setDataToCreate({
            ...dataToCreate,
            [name]: value
        })
        :
        setDataToUpdate({
            ...dataToUpdate,
            [name]: value
        })
    }

    const validateInputs = () => {

        if(!nameCustomer || nameCustomer === "") {
            setErrors({
                ...errors,
                emptyName: true
            })
            returnErrorsValues("emptyName")
            return 1
        }

        if(!emailCustomer || emailCustomer === "") {
            setErrors({
                ...errors,
                emptyEmail: true
            })
            returnErrorsValues("emptyEmail")
            return 1
        }

        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailFormat.test(emailCustomer)) {
            setErrors({
                ...errors,
                invalidEmail: true
            })
            returnErrorsValues("invalidEmail");
            return 1;
        }

        return 0
    }

    const returnErrorsValues = (name) => {
        setTimeout( () => {
            setErrors({...errors, [name]:false})
        }, 3000)
    }

    const validateSubmitData = () => {
        const validator = validateInputs()
        if(validator === 0) {
            setConfirmSubmit(true)
        }
    }

    const submitData = async (e) => {
        e.preventDefault()
        const response = await axios.post(`${config.customers_route}/create`, dataToCreate)
        if (response.data.body === "customers created") {
            setConfirmSubmit(false)
            setSuccessMessage(true)
        }
    }

    const updateData = async (e) => {
        e.preventDefault()
        console.log(dataToUpdate)
        const response = await axios.put(`${config.customers_route}/${id}`, dataToUpdate)
        if (response.data.body === "customers updated!") {
            setConfirmSubmit(false)
            setSuccessMessage(true)
        }
    }

    const closeModal = () => {
        setConfirmSubmit(false)
    }

    const closeForm = () => {
        navigate('/customers')
    }

    return (
        <CustomerFormContext.Provider value={{
            onChangeName,
            onChangeEmail,
            nameCustomer,
            emailCustomer,
            setAction,
            errors,
            validateSubmitData,
            confirmSubmit,
            closeModal,
            successMessage,
            closeForm,
            submitData,
            setEmailCustomer,
            setNameCustomer,
            updateData,
        }}>
            { children }
        </CustomerFormContext.Provider>
    )
}

export { CustomerFormContext, CustomerFormProvider }