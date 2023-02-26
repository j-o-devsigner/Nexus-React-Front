import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios';
import { mail } from '../views/quotes/components/quotesDetail/sendMail';
import config from '../config';

const useQuotesDetail = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [quoteData, setQuoteData] = useState({})
    const [customer, setCustomer] = useState({})
    const [showUpdate, setShowUpdate] = useState(false)
    const [productsItemsData, setProductsItemsData] = useState([])
    const [confirmModals, setConfirmModals] = useState({})
    const [inputConfirmDelete, setInputConfirmDelete] = useState("")
    const [errors, setErrors] = useState({})

    const getQuote = async (id) => {
        if(id) {
            await axios.get(`${config.quotes_route}/${id}`)
                .then( result => {
                    result = result.data.body[0]
                    setQuoteData(result)
                    const customer = {...result.customer, name: changeCase(result.customer.name)}

                    setCustomer(customer)
                    const productsData = createItemsData(result.productsDetail, result.products)
                    setProductsItemsData(productsData)
                })
        }
    }

    const changeCase = (text) => {
        return text.toLowerCase().replace(/(^|\s)[a-z]/g, (letter) => letter.toUpperCase());
    };

    const createItemsData = (productsDetail, products) => {
        const items = []
        products.map( product => {
            productsDetail.map( detail => {
                if(product.idproduct === detail.id) {
                    detail.amount = product.amount
                    detail.total = (detail.amount * detail.price).toFixed(2)
                    items.push({product: detail})
                }
            })
        })

        return items
    }

    const generateMail = async (e) => {
        e.preventDefault();
        let generateHTML = mail(quoteData, productsItemsData)
        generateHTML = generateHTML.replace(/,/g, '')
        const data = {
            to: customer.email,
            html: generateHTML
        }

        const response = await axios.post(`${config.quotes_route}/mail`, { data, sended: true, id: id })

        if(response.data.status === 200) {
            setConfirmModals({
                ...confirmModals,
                mail: false,
                success:true,
                successDelete: false,
            })
        }
    }

    const editQuote = (e) => {
        e.preventDefault();
        setShowUpdate(toggle => !toggle)
    }

    const deleteQuote = async (e) => {
        e.preventDefault();
        if(inputConfirmDelete === "I AM SURE") {
            const response = await axios.put(`${config.quotes_route}/${id}`, { active: false })
            if(response.data.body === "quotes updated!") {
                setConfirmModals({
                    ...confirmModals,
                    success: true,
                    successDelete:true,
                    delete: false,
                })
            }
        } else {
            setErrors({
                ...errors,
                inputDelete: true,
            })
        }
    }

    const onChangeConDel = (e) => {
        setInputConfirmDelete(e.target.value)
    }

    const closeForm = () => {
        setShowUpdate(false)
    }

    const backToQuotes = () => {
        navigate('/quotes')
    }

    const confirmModalDelete = () => {
        setConfirmModals({
            ...confirmModals,
            delete: !confirmModals.delete,
        })
    }

    const confirmModalMail = () => {
        setConfirmModals({
            ...confirmModals,
            mail: !confirmModals.mail,
        })
    }

    const closeModalMail = () => {
        setConfirmModals({
            ...confirmModals,
            success: false,
        })
        navigate('/quotes')
    }

    useEffect(() => {
        getQuote(id);
    }, []);

    return {
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
    }

}

export default useQuotesDetail