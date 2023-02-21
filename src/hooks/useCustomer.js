import { useState, useRef, useEffect } from "react";

const useCustomers = ( initialData ) => {

    const [valueSelectCustomer, setValueSelectCustomer] = useState("Select a customer")
    const [customersData, setCustomersData] = useState([])
    const [emailCustomer, setEmailCustomer] = useState("")

    useEffect(() => {
        setCustomersData(initialData);
    }, [initialData]);

    const onChangeCustomer = (e) => {
        customersData && customersData.length > 0 && customersData.map( customer => {
            if(customer.id === Number(e.target.value)) {
                setValueSelectCustomer(customer.id)
                setEmailCustomer(customer.email)
            }
        })
    }

    return {
        customersData, setCustomersData,
        emailCustomer, setEmailCustomer,
        valueSelectCustomer, setValueSelectCustomer,
        onChangeCustomer,
    }
}

export default useCustomers;