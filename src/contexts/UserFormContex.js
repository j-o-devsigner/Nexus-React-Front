import React, { useState, useEffect, createContext } from "react"
import { useParams, useNavigate } from "react-router"
import axios from "axios"
import config from "../config"

const UserFormContext = createContext()

const UserFormProvider = ( { children } ) => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [dataUsers, setDataUsers] = useState({})
    const [action, setAction] = useState("create")
    const [confirmSubmit, setConfirmSubmit] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const [dataToCreate, setDataToCreate] = useState({})
    const [dataToUpdate, setDataToUpdate] = useState({})
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [oldUsername, setOldUsername] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("Select a role")
    const [errors, setErrors] = useState({})

    const listUsers = async () => {
        await axios.get(config.users_route)
        .then( res => setDataUsers(res.data.body))
    }

    useEffect(() => {
        listUsers();
    }, []);

    const onChangeName = (e) => {
        const onlyLettersAndSpaces = /^[a-zA-Z\s]*$/;
        const value = e.target.value;
        if (onlyLettersAndSpaces.test(value)) {
            setName(value);
            setDataInputs(e.target.name, value);
        }
    }

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
        setDataInputs(e.target.name, e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
        setDataInputs(e.target.name, e.target.value)
    }

    const onChangeRole = (e) => {
        setRole(e.target.value)
        setDataInputs(e.target.name, Number(e.target.value))
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

        if(!name || name === "") {
            setErrors({
                ...errors,
                emptyName: true
            })
            returnErrorsValues("emptyName")
            return 1
        }

        if(!username || username === "") {
            setErrors({
                ...errors,
                emptyUsername: true
            })
            returnErrorsValues("emptyUsername")
            return 1
        }

        if(action === "create") {
            if(!password || password === "") {
                setErrors({
                    ...errors,
                    emptyPassword: true
                })
                returnErrorsValues("emptyPassword")
                return 1
            }
        }

        if(role === "Select a role") {
            setErrors({
                ...errors,
                emptyRole: true
            })
            returnErrorsValues("emptyRole")
            return 1
        }

        const isDuplicate = dataUsers.some(user => user.username.toLocaleLowerCase() === username.toLocaleLowerCase().trim());
        if (isDuplicate && action === "create") {
            setErrors({
                ...errors,
                duplicateUsername: true,
            });
            returnErrorsValues("duplicateUsername");
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
        const response = await axios.post(`${config.users_route}/register`, dataToCreate)
        if (response.data.body === "users created") {
            setConfirmSubmit(false)
            setSuccessMessage(true)
        }
    }

    const updateData = async (e) => {
        e.preventDefault()
        const dataToSend = {
            ...dataToUpdate,
            oldUsername: oldUsername
        }
        const response = await axios.put(`${config.users_route}/${id}`, dataToSend)
        if (response.data.body === "users updated!" || response.data.body === "auth updated!") {
            setConfirmSubmit(false)
            setSuccessMessage(true)
        }
    }

    const closeModal = () => {
        setConfirmSubmit(false)
    }

    const closeForm = () => {
        navigate('/users')
    }

    return (
        <UserFormContext.Provider value={{
            name,
            setName,
            username,
            setUsername,
            password,
            setPassword,
            onChangeName,
            onChangePassword,
            onChangeUsername,
            setAction,
            closeForm,
            validateSubmitData,
            confirmSubmit,
            errors,
            submitData,
            closeModal,
            successMessage,
            role,
            onChangeRole,
            updateData,
            setRole,
            setOldUsername,
        }}>
            { children }
        </UserFormContext.Provider>
    )
}

export { UserFormContext, UserFormProvider }