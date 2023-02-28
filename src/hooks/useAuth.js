import React, { useState } from 'react'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router'
import config from '../config'

const useAuth = () => {

    const {
        setUserLogged,
    } = React.useContext(UserContext)

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})
    const [loaderLogin, setLoaderLogin] = useState(false)

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
        setDataToAuth(e.target.name, e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
        setDataToAuth(e.target.name, e.target.value)
    }

    const setDataToAuth = (name, value) => {
        setData({
            ...data,
            [name]: value
        })
    }
    const validateData = () => {

        if(!username, username === "") {
            setErrors({
                ...errors,
                usernameEmpty: true
            })
            backStateInput("usernameEmpty")
            return 1
        }

        if(!password, password === "") {
            setErrors({
                ...errors,
                passwordEmpty: true
            })
            backStateInput("passwordEmpty")
            return 1
        }

        return 0
    }

    const backStateInput = (name) => {
        setTimeout( () => {
            setErrors({...errors,
                [name]:false
            })
        }, 3000)
    }

    const submitData = async (e) => {
    e.preventDefault();
    const validator = validateData();
    if (validator === 0) {
        setLoaderLogin(true)
        const validate = await axios.post(`${config.login_route}`, data)
        if(validate.data.body.message === "This account is disabled") {
            setLoaderLogin(false)
            setErrors({
                ...errors,
                accountDisabled: true
            })
            backStateInput("accountDisabled")
        } else if(validate.data.body.username) {
            setLoaderLogin(false)
            localStorage.setItem('token', validate.data.body.token)
            delete(validate.data.body.token)
            localStorage.setItem('userLogged', JSON.stringify(validate.data.body))
            localStorage.setItem('active', 'true')
            setUserLogged(validate.data.body)
            navigate('/home')
        } else {
            setLoaderLogin(false)
            wrongAttempt()
        }
        }
    }

    const wrongAttempt = () => {
        setErrors({
            errors,
            wrongAttempt: true
        })
        backStateInput("wrongAttempt")
    }

    const backToLanding = () => {
        navigate('/')
    }

    return {
        username,
        password,
        onChangeUsername,
        onChangePassword,
        submitData,
        errors,
        backToLanding,
        loaderLogin,
    }
}

export default useAuth