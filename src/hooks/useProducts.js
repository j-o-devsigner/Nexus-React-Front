import { useState, useEffect, useRef } from 'react'

const useProducts = ( initialData, totalActions ) => {

    const { subtotal, setSubtotal, setTotal} = totalActions;

    const selectProducts = useRef();
    const inputAmountValue = useRef();

    const [errorsProducts, setErrorsProducts] = useState({selectProducts: false})
    const [productsData, setProductsData] = useState([])
    const [productsItemsData, setProductsItemsData] = useState([])
    const [amountInput, setAmountInput] = useState(1)

    useEffect(() => {
        setProductsData(initialData);
    }, [initialData]);

    const onChangeAmount = (e) => {
        const value = e.target.value
        if(!isNaN(value)) {
            setAmountInput(value)
        }
    }

    const addItem = (e) => {
        e.preventDefault();
        validateAddItems();

        let subtotalItems = Number(subtotal);
        const productToDisplay = selectProducts.current.value
        if(Number(amountInput) === 0 || !amountInput) {
            setErrorsProducts({...errorsProducts, notZero: true})
            setTimeout( ()=> {
                setErrorsProducts({...errorsProducts, notZero: false})
            }, 3000)
            resetAmountInput();
        } else {
            productsData && productsData.length > 0 && productsData.map( productItem => {
                if(Number(productItem.id) === Number(productToDisplay)) {
                    if(!productsItemsData.find(item => item.product.id === productItem.id)){

                        const product = setDataProduct(productItem);
                        setProductsItemsData(productsItemsData.concat({product}));
                        subtotalItems += calculateSubtotal(product.amount, product.price)
                        setTotals(subtotalItems.toFixed(2))
                    } else {
                        setErrorsProducts({selectProducts: true, existingProduct: true})
                        setTimeout(() => {
                        setErrorsProducts({...errorsProducts, existingProduct: false})
                        }, 3000)
                    }
                }
            })
            resetAmountInput();
        }
    }

    const deleteItem = (e, id) => {
        e.preventDefault();
        const newData = []
        let number;
        id === undefined ? number = e.currentTarget.value : number = id

        let subtotalItems = 0;

        productsItemsData.filter(product => {
            product = product.product
                if(Number(product.id) !== Number(number)) {
                    newData.push({product})
                    subtotalItems += calculateSubtotal(product.amount, product.price)
                }
            })
            setProductsItemsData(newData)
            setTotals(subtotalItems.toFixed(2))
    }

    const updateItem = (e) => {
        selectProducts.current.value = e.currentTarget.value
            productsItemsData.filter(product => {
                if(Number(product.product.id) === Number(e.currentTarget.value)) {
                    inputAmountValue.current.value = product.product.amount
                }
            })
            deleteItem(e, e.currentTarget.value);
    }

    const validateAddItems = () => {
        setErrorsProducts({selectProducts: false});
        setErrorsProducts({selectProducts: selectProducts.current.value === "Select a product"});
    }

    const setDataProduct = (product) => {
        const amountValue = inputAmountValue.current.value

        const newProduct = product;
        newProduct.amount = amountValue;
        const total = parseFloat(newProduct.amount) * parseFloat(newProduct.price);
        newProduct.total = total.toFixed(2)

        return newProduct;
    }

    const resetAmountInput = () => {
        setAmountInput(1)
    }

    const calculateSubtotal = (amount, price) => {
        return parseFloat(amount) * parseFloat(price)
    }

    const setTotals = (value) => {
        setSubtotal(value)
        setTotal(value)
    }

    return {
        productsData,
        addItem,
        deleteItem,
        updateItem,
        selectProducts,
        productsItemsData,
        setProductsItemsData,
        setAmountInput,
        inputAmountValue,
        amountInput,
        onChangeAmount,
        errorsProducts,
    }
}
export default useProducts