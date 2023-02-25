import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'
import config from '../config'

const useAccount = () => {

    const { setUserLogged } = React.useContext(UserContext)

    const { id } = useParams()
    const navigate = useNavigate()

    const [idRef, setIdRef] = useState("")
    const [dataToUpdate, setDataToUpdate] = useState({})
    const [oldUsername, setOldUsername] = useState("")
    const [confirmSubmit, setConfirmSubmit] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})

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

    const setDataInputs = (name, value) => {
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

    const updateData = async (e) => {
        e.preventDefault()
        const dataToSend = {
            ...dataToUpdate,
            oldUsername: oldUsername,
            id: idRef
        }

    const token = localStorage.getItem('token')
        const configH = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        }

        const response = await axios.put(`${config.users_route}/account/${id}`, dataToSend, configH)
        if (response.data.body === "users updated!" || response.data.body === "auth updated!") {
            setConfirmSubmit(false)
            setSuccessMessage(true)

            const oldData = JSON.parse(localStorage.getItem('userLogged'))
            const newData = {
                ...oldData,
                ...dataToSend,
                id: id
            }
            setUserLogged(newData)
            localStorage.setItem('userLogged', JSON.stringify(newData))
        }
    }

    const closeModal = () => {
        setConfirmSubmit(false)
    }


    const backNexus = () => {
        navigate('/home')
    }

    return {
        backNexus,
        setName,
        setUsername,
        setPassword,
        name,
        username,
        password,
        onChangeName,
        onChangeUsername,
        onChangePassword,
        setOldUsername,
        errors,
        validateSubmitData,
        closeModal,
        confirmSubmit,
        successMessage,
        updateData,
        setIdRef,
    }
}

export default useAccount