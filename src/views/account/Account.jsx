import React, { useState, useEffect } from 'react'
import { Button, Label, Title } from '../../components/form/components'
import Navbar from '../../components/navbar/Navbar'
import UpdateInfo from './components/UpdateInfo'
import './account.css'
import { UserContext  } from '../../contexts/UserContext'
import { useNavigate } from 'react-router'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const Account = () => {

    const navigate = useNavigate()

    const { userLogged } = React.useContext(UserContext)

    const [username, setUsername] = useState(userLogged.username)
    const [role, setRole] = useState(userLogged.role)
    const [updateForm, setUpdateForm] = React.useState(false)
    const [upperName, setUpperName] = useState("")

    const changeCase = (text) => {
        return text.toLowerCase().replace(/(^|\s)[a-z]/g, (letter) => letter.toUpperCase());
    };

    const backNexus = () => {
        navigate('/home')
    }

    const showUpdate = () => {
        setUpdateForm(toggle => !toggle)
    }


    useEffect(() => {
        const updatedUserLogged = JSON.parse(localStorage.getItem('userLogged'))
        setUpperName(changeCase(updatedUserLogged.name))
        setUsername(updatedUserLogged.username)
        setRole(updatedUserLogged.role)
    }, [localStorage.getItem('userLogged')])

    return (
        <>
        {updateForm ?
        <UpdateInfo
            data={userLogged}
            closeForm={showUpdate}
        />
        :
        <div>
            <Navbar />
            <section className="nexus__section section__padding center">
            <div className="nexus__section-buttons">
                    <Button
                        type="button"
                        id="edit-btn"
                        onClick={showUpdate}
                    >Edit My Info</Button>
                    <Button
                        type="button"
                        id="back-btn"
                        onClick={backNexus}
                    ><AiOutlineArrowLeft/></Button>
                </div>
                <div className="nexus__section-container-info">
                    <Title>Name: {upperName || "...Name..."}</Title>
                    <Title>Username: {username || "...Username..."}</Title>
                    <Title>Role: {Number(role) === 1 ? "Administrator" : "Manager"}</Title>
            </div>
            </section>
        </div>
        }
        </>
    )
}

export default Account