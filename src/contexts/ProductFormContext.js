import React, { useState, useEffect, createContext } from "react"
import { useParams, useNavigate } from "react-router"
import axios from "axios"
import config from "../config"

const ProductFormContext = createContext()

const ProductFormProvider = ( { children } ) => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [action, setAction] = useState("create")
    const [dataProducts, setDataProducts] = useState([])
    const [dataToCreate, setDataToCreate] = useState({})
    const [dataToUpdate, setDataToUpdate] = useState({})
    const [nameProduct, setNameProduct] = useState("")
    const [detailProduct, setDetailProduct] = useState("")
    const [priceProduct, setPriceProduct] = useState("")
    const [confirmSubmit, setConfirmSubmit] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const [errors, setErrors] = useState({})

    const listProducts = async () => {
        await axios.get(config.products_route)
        .then( res => setDataProducts(res.data.body))
    }

    useEffect(() => {
        listProducts();
    }, []);

    const onChangeName = (e) => {
        setNameProduct(e.target.value)
        setDataInInputs(e.target.name, e.target.value)
    }

    const onChangeDetail = (e) => {
        setDetailProduct(e.target.value)
        setDataInInputs(e.target.name, e.target.value)
    }

    const onChangePrice = (e) => {
        const value = e.target.value
        if(!isNaN(value)) {
            setPriceProduct(value)
        }
        setDataInInputs(e.target.name, Number(value))
    }

    const setDataInInputs = (name, value) => {

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

            if(!nameProduct || nameProduct === "") {
                setErrors({
                    ...errors,
                    emptyName: true,
                })
                returnErrorsValues("emptyName")
                return 1
            }

            if(!detailProduct || detailProduct === "") {
                setErrors({
                    ...errors,
                    emptyDetail: true,
                })
                returnErrorsValues("emptyDetail")
                return 1
            }

            if(!priceProduct || priceProduct === "") {
                setErrors({
                    ...errors,
                    emptyPrice: true,
                })
                returnErrorsValues("emptyPrice")
                return 1
            }

            if(Number(priceProduct) === 0) {
                setErrors({
                    ...errors,
                    priceZero: true,
                })
                returnErrorsValues("priceZero")
                return 1
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
        const response = await axios.post(`${config.products_route}/create`, dataToCreate)
        if (response.data.body === "products created") {
            setConfirmSubmit(false)
            setSuccessMessage(true)
        }
    }

    const updateData = async (e) => {
        e.preventDefault()
        if(id) {
            const response = await axios.put(`${config.products_route}/${id}`, dataToUpdate)
            if (response.data.body === "products updated!") {
                setConfirmSubmit(false)
                setSuccessMessage(true)
            }
        }
    }

    const closeModal = () => {
        setConfirmSubmit(false)
    }

    const closeForm = () => {
        navigate('/products')
    }

    return (
        <ProductFormContext.Provider value={{
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
            action,
            setAction,
            closeModal,
            submitData,
            successMessage,
            closeForm,
            updateData,
        }}>
            { children }
        </ProductFormContext.Provider>
    )
}

export { ProductFormContext, ProductFormProvider }