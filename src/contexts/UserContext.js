import React, { useState, useEffect, createContext } from "react"
import { Navigate } from "react-router"

const UserContext = createContext()

const UserProvider = ( { children } ) => {

    const [userLogged, setUserLogged] = useState("")

    useEffect( () => {
        const userJSON = localStorage.getItem('userLogged')
        if(localStorage.getItem('active') === "true") {
            const user = JSON.parse(userJSON)
            setUserLogged(user)
        }
    }, [])

    return (
        <UserContext.Provider value={{
            setUserLogged,
            userLogged,
            AuthRoute,
        }}>
            { children }
        </UserContext.Provider>
    )
}

function AuthRoute(props) {

    const { userLogged } = React.useContext(UserContext)

    React.useEffect(() => {}, [userLogged]);

    if (localStorage.getItem('active') === 'false' && !userLogged.username) {
        return <Navigate to="/" />
    }
    return props.children
}

function AuthRouteRole(props) {
    const { userLogged } = React.useContext(UserContext)

    React.useEffect(() => {}, [userLogged]);

    if (localStorage.getItem('active') === 'true' && userLogged.role === 2) {
        return <Navigate to="/home" />
    }
    return props.children
}

function AuthActive(props) {
    const { userLogged } = React.useContext(UserContext)

    React.useEffect(() => {}, [userLogged]);

    if (localStorage.getItem('active') === 'true' && userLogged.username) {
        return <Navigate to="/home" />
    }
    return props.children
}

export { AuthRoute, AuthRouteRole, AuthActive }

export { UserContext, UserProvider }