import React, { useState, useRef, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import useCustomers from "../hooks/useCustomer"
import useProducts from "../hooks/useProducts"
import axios from "axios"
import { UserContext } from "./UserContext"
import config from "../config"

const QuoteFormContext = React.createContext()

const QuoteFormProvider = ( { children } ) => {

    const { userLogged } = React.useContext(UserContext)

    const { id } = useParams()
    const navigate = useNavigate()

    const formRef = useRef()

    const [errors, setErrors] = useState({})
    const [quoteNumber, setQuoteNumber] = useState(0)
    const [dataToCreate, setDataToCreate] = useState({})
    const [dataToUpdate, setDataToUpdate] = useState({})
    const [quoteNumberUpdate, setQuoteNumberUpdate] = useState(0)

    const [valueSelectDiscount, setValueSelectDiscount] = useState("1")
    const [inputDiscountValue, setInputDiscountValue] = useState("")

    const [quotesData, setQuotesData] = useState([])
    const [customersDataRef, setCustomersDataRef] = useState([])
    const [productsDataRef, setProductsDataRef] = useState([])

    const [inputValuePercentage, setInputValuePercentage] = useState("")
    const [inputValueFixed, setInputValueFixed] = useState("")

    const [inputShippingValue, setInputShippingValue] = useState("")
    const [subtotal, setSubtotal] = useState(0)
    const [subtotalRef, setSubtotalRef] = useState(0)
    const [total, setTotal] = useState(0)
    const [listDone, setListDone] = useState(false)
    const [action, setAction] = useState("create")

    const [confirmSubmit, setConfirmSubmit] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)

    const {
        onChangeCustomer,
        customersData,
        emailCustomer,
        setEmailCustomer,
        valueSelectCustomer,
        setValueSelectCustomer,
        } = useCustomers(customersDataRef);

    const {
        productsData,
        addItem,
        deleteItem,
        updateItem,
        selectProducts,
        productsItemsData,
        setProductsItemsData,
        inputAmountValue,
        amountInput,
        onChangeAmount,
        errorsProducts,
        setAmountInput,
        } = useProducts(productsDataRef, {subtotal, setSubtotal, setTotal});

    const getQuotesData = async () => {

        await axios.get(config.quotes_route)
        .then( res => {
            getMaxQuoteNumber(res.data.body.quotes)

            const dataQuotes = res.data.body.quotes
            const dataCustomers = res.data.body.customers
            const dataProducts = res.data.body.products

            const capNameCustomers = dataCustomers.map( customer => {
                return  {...customer, name: changeCase(customer.name)}
            })

            const capNameProducts = dataProducts.map( product => {
                return  {...product, name: changeCase(product.name)}
            })

            setQuotesData(dataQuotes)
            setCustomersDataRef(capNameCustomers);
            setProductsDataRef(capNameProducts);
        })
    }

    const changeCase = (text) => {
        return text.toLowerCase().replace(/(^|\s)[a-z]/g, (letter) => letter.toUpperCase());
    };

    const getMaxQuoteNumber = (quotesData) => {

        quotesData.sort(function(a, b) {
            return a.quotenumber - b.quotenumber;
        });

        let counter = 1

        for (let i = 0; i < quotesData.length - 1; i++) {
            if (quotesData[i + 1].quotenumber - quotesData[i].quotenumber > 1) {
                counter = quotesData[i].quotenumber + 1;
                break;
            } else {
                counter = quotesData[quotesData.length - 1].quotenumber + 1;
            }
        }

        setQuoteNumber(counter)
    }

    const onChangeQuoteN = (e) => {
        setQuoteNumberUpdate(e.target.value)
        setQuoteNumber(e.target.value)
    }

    const blockList = (e) => {
        e.preventDefault();
        if(valueSelectCustomer === "Select a customer") {
            setErrors({...errors, noCustomer: true})
            setTimeout( () => {setErrors({...errors, noCustomer: false})}, 3000)
        } else if(productsItemsData.length !== 0) {
            setListDone(toggle => !toggle)
            setAmountInput(1)
        } else {
            setErrors({...errors, emptyList: true})
            setTimeout( () => {setErrors({...errors, emptyList: false})}, 3000)
        }

        const products = productsItemsData.map(product => ({
            "idQuote": "",
            "idProduct": product.product.id,
            "amount": Number(product.product.amount)
        }))
        setSubtotalRef(subtotal)

        setDataToCreate({
            ...dataToCreate,
            products: products,
            sendTo: Number(valueSelectCustomer),
            discount: false,
            idTypeDiscount: 1,
            subtotal: Number(subtotal),
            total: Number(total)
        })

        setDataToUpdate({
            ...dataToUpdate,
            products: products,
            sendTo: Number(valueSelectCustomer)
        })
    }

    const onChangeDiscount = (e) => {
        const value = Number(e.target.value)
        setValueSelectDiscount(e.target.value)
        setInputDiscountValue("")
        setInputValuePercentage("")
        setInputShippingValue("")
        setInputValueFixed("")
        calculateSubtotal()

        action === "create" ?
        updateDataCreate(value)
        :
        updateDataUpdate(value)
    }

    const updateDataCreate = (value) => {
        if(value !== 1) {
            setDataToCreate({
                ...dataToCreate,
                discount: true,
                idTypeDiscount: value,
                percentageDiscount: 0,
                discountValue: 0,
                subtotal: Number(subtotal)
                })
            } else {
            setDataToCreate({
                ...dataToCreate,
                discount: false,
                idTypeDiscount: value,
                percentageDiscount: 0,
                discountValue: 0,
                subtotal: Number(subtotal)
                })
            }
    }

    const updateDataUpdate = (value) => {
        if(value !== 1) {
            setDataToUpdate({
                ...dataToUpdate,
                discount: true,
                idTypeDiscount: value,
                percentageDiscount: 0,
                discountValue: 0,
                subtotal: Number(subtotal)
                })
            } else {
            setDataToUpdate({
                ...dataToCreate,
                discount: false,
                idTypeDiscount: value,
                percentageDiscount: 0,
                discountValue: 0,
                subtotal: Number(subtotal)
                })
            }
    }

    const calculatePercentage = (e) => {
        let total = 0;
        productsItemsData.map((product) => {
            total += Number(product.product.total);
            total.toFixed(2);
        });

        const value = e.target.value
        if(!isNaN(value)) {
            setInputValuePercentage(value);
        }

        const parsedValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
        let valuePercentageRef = (parsedValue / 100 * total).toFixed(2);

        setInputDiscountValue(valuePercentageRef);
        setSubtotal((total - valuePercentageRef).toFixed(2));

        if (inputShippingValue) {
            const inputShipping = Number(inputShippingValue);
            setTotal((total - valuePercentageRef + inputShipping).toFixed(2))

            action === "create" ?
            setDataCreatePercentage(Number(value), Number(valuePercentageRef), Number((total - valuePercentageRef).toFixed(2)), Number((total - valuePercentageRef + inputShipping).toFixed(2)))
            :
            setDataUpdatePercentage(Number(value), Number(valuePercentageRef), Number((total - valuePercentageRef).toFixed(2)), Number((total - valuePercentageRef + inputShipping).toFixed(2)))

        } else {
            setTotal((total - valuePercentageRef).toFixed(2))

            action === "create" ?
            setDataCreatePercentage(Number(value), Number(valuePercentageRef), Number((total - valuePercentageRef).toFixed(2)), Number((total - valuePercentageRef).toFixed(2)))
            :
            setDataUpdatePercentage(Number(value), Number(valuePercentageRef), Number((total - valuePercentageRef).toFixed(2)), Number((total - valuePercentageRef).toFixed(2)))

        }
    };

    const setDataCreatePercentage = (percentageDiscount, discountValue, subtotal, total) => {
        setDataToCreate({
            ...dataToCreate,
            percentageDiscount: percentageDiscount,
            discountValue: discountValue,
            subtotal: subtotal,
            total: total
        })
    }

    const setDataUpdatePercentage = (percentageDiscount, discountValue, subtotal, total) => {
        setDataToUpdate({
            ...dataToUpdate,
            percentageDiscount: percentageDiscount,
            discountValue: discountValue,
            subtotal: subtotal,
            total: total
        })
    }

    const calculateFixedAmount = (e) => {
        let total = 0;
        productsItemsData.map( product => {
            total += Number(product.product.total)
            total.toFixed(2)
        })

        const value = e.target.value
        if(!isNaN(value)) {
            setInputValueFixed(value)
            setSubtotal((total - value).toFixed(2))
            setTotal((total - value).toFixed(2))
        }

        action === "create" ?
        setDataToCreate({...dataToCreate,
            discountValue: Number(value),
            subtotal: Number((total - value).toFixed(2)),
            total: Number((total - value).toFixed(2))
        })
        :
        setDataToUpdate({...dataToUpdate,
            discountValue: Number(value),
            subtotal: Number((total - value).toFixed(2)),
            total: Number((total - value).toFixed(2))
        })
    }

    const calculateSubtotal = () => {
        let total = 0;
        productsItemsData.map( product => {
            total += Number(product.product.total)
            total.toFixed(2)
        })
        setSubtotal(total.toFixed(2))
        setTotal(total.toFixed(2))

        action === "create" ?
        setDataToCreate({...dataToCreate,
            subtotal: total,
            total: total
        })
        :
        setDataToUpdate({...dataToUpdate,
            subtotal: total,
            total: total
        })
    }

    const calculateTotal = (e) => {

        const value = e.target.value
        if(!isNaN(value)) {
            setInputShippingValue(value);
        }

        const parseShippingValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
        const totalRef = Number(subtotal) + parseShippingValue;
        setTotal(parseShippingValue !== 0 ? totalRef : Number(subtotal));

        action === "create" ?
        setDataToCreate({...dataToCreate,
            shippingValue: parseShippingValue,
            total: parseShippingValue !== 0 ? totalRef : Number(subtotal)
        })
        :
        setDataToUpdate({...dataToUpdate,
            shippingValue: parseShippingValue,
            total: parseShippingValue !== 0 ? totalRef : Number(subtotal)
        })
    }

    const validateDiscountsTotal = () => {
        if(!inputShippingValue || inputShippingValue === "") {
            setErrors({...errors, shippingInput: true})
            returnErrorsValues("shippingInput")
            return 1
        }

        if (valueSelectDiscount === "2") {
            if(!inputValuePercentage || inputValuePercentage === "") {
                setErrors({...errors, percentageInput: true})
                returnErrorsValues("percentageInput")
                return 1
            }
        } else if (valueSelectDiscount === "3") {
            if(!inputValueFixed || inputValueFixed === "") {
                setErrors({...errors, valueFixedInput: true})
                returnErrorsValues("valueFixedInput")
                return 1
            }
        }

        if(quotesData.find(quote => quote.quotenumber === Number(quoteNumberUpdate) && quote.quotenumber !== Number(id))) {
            setErrors({...errors, numberTaken: true})
            returnErrorsValues("numberTaken")
            return 1
        }

        if(inputValuePercentage >= 100) {
            setErrors({...errors, invalidPercentage: true})
            returnErrorsValues("invalidPercentage")
            return 1
        }

        if(inputValueFixed >= subtotalRef) {
            setErrors({...errors, invalidValueFixed: true})
            returnErrorsValues("invalidValueFixed")
            return 1
        }

        return 0
    }


    const returnErrorsValues = (name) => {
        setTimeout( () => {
            setErrors({...errors, [name]:false})
        }, 3000)
    }

    const validateSubmitData = async (e) => {
        e.preventDefault();
        const validator = validateDiscountsTotal()
        if(validator === 0) {
            setConfirmSubmit(true)
        }
    }

    const submitData = async () => {
        let dataToSubmit = dataToCreate

        if(!dataToSubmit.subtotal && dataToSubmit.discount === false ){
            dataToSubmit.subtotal = dataToSubmit.total
        }

        dataToSubmit.quoteNumber = quoteNumber
        dataToSubmit.sendFrom = userLogged.id || 1
        const response = await axios.post(`${config.quotes_route}/create`, dataToSubmit)
            if (response.data.body === "quotes created") {
                setConfirmSubmit(false)
                setSuccessMessage(true)
            }
    }

    const updateData = async (e) => {
        e.preventDefault()
        let data = dataToUpdate

        if(Number(data.subtotal) !== Number(subtotal)){
            data.subtotal = Number(subtotal)
        }
        await axios.put(`${config.quotes_route}/${id}`, data)
        .then( async (result) => {
            if(id !== quoteNumberUpdate) {
                await axios.put(`${config.quotes_route}/${id}`, {quoteNumber: quoteNumberUpdate})
            }
            if(result.data.body === "quotes updated!") {
                setConfirmSubmit(false)
                setSuccessMessage(true)
            }
        })

    }

    const closeForm = () => {
        action === "update" ? navigate(-1) : navigate('/quotes')
    }

    useEffect(() => {
        getQuotesData();
    }, [userLogged])

    return (
        <QuoteFormContext.Provider value={{
            quoteNumber,
            onChangeQuoteN,
            formRef,
            subtotal,
            total,
            inputValueFixed,
            inputShippingValue,
            onChangeCustomer,
            customersData,
            emailCustomer,
            productsData,
            addItem,
            deleteItem,
            updateItem,
            selectProducts,
            productsItemsData,
            inputAmountValue,
            amountInput,
            onChangeAmount,
            errorsProducts,
            listDone,
            blockList,
            calculateSubtotal,
            calculateTotal,
            validateSubmitData,
            onChangeDiscount,
            calculatePercentage,
            calculateFixedAmount,
            inputValuePercentage,
            discountValue: inputDiscountValue,
            inputValueFixed,
            setQuoteNumber,
            setEmailCustomer,
            action,
            setAction,
            setProductsItemsData,
            setInputValuePercentage,
            setSubtotal,
            setTotal,
            setInputDiscountValue,
            setQuoteNumberUpdate,
            quoteNumberUpdate,
            updateData,
            valueSelectCustomer,
            setValueSelectCustomer,
            valueSelectDiscount,
            setValueSelectDiscount,
            errors,
            setConfirmSubmit,
            confirmSubmit,
            submitData,
            closeForm,
            successMessage,
            setInputValueFixed,
            setInputShippingValue,
            setDataToUpdate,
            dataToUpdate,
            quotesData,
        }}>
            { children }
        </QuoteFormContext.Provider>
    )
}


export { QuoteFormContext, QuoteFormProvider }