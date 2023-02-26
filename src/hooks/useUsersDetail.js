import React, { useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import config from '../config'

const useUsersDetail = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [userData, setUserData] = useState({})
    const [showUpdate, setShowUpdate] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)

    const getUser = async () => {
        if(id) {
            await axios.get(`${config.users_route}/${id}`)
                .then( result => {
                    result = result.data.body[0]
                    const user = {...result, name: changeCase(result.name)}
                    setUserData(user)
                })
        }
    }

    const changeCase = (text) => {
        return text.toLowerCase().replace(/(^|\s)[a-z]/g, (letter) => letter.toUpperCase());
    };

    const deactiveUser = async (e) => {
        e.preventDefault()
        if(id) {
            const response = await axios.put(`${config.users_route}/${id}`, { active: false })
            if(response.data.body === "users updated!") {
                setSuccessMessage(true)
                setConfirmDelete(false)
            }
        }
    }

    const activeUser = async (e) => {
        e.preventDefault()
        if(id) {
            const response = await axios.put(`${config.users_route}/${id}`, { active: true })
            if(response.data.body === "users updated!") {
                setSuccessMessage(true)
                setConfirmDelete(false)
            }
        }
    }

    const editUser = () => {
        setShowUpdate(toggle => !toggle)
    }

    const backToUsers = () => {
        navigate('/users')
    }

    const closeForm = () => {
        setShowUpdate(false)
    }

    const confirmDeleteUser = () => {
        setConfirmDelete(toggle => !toggle)
    }

    useEffect( () => {
        getUser()
    }, [])

    return {
        userData,
        showUpdate,
        confirmDelete,
        successMessage,
        deactiveUser,
        editUser,
        backToUsers,
        closeForm,
        confirmDeleteUser,
        activeUser,
    }
}

export default useUsersDetail