import React from 'react'
import { Button, Confirm, Success, Title } from '../../../../components/form/components'
import Navbar from '../../../../components/navbar/Navbar'
import useUsersDetail from '../../../../hooks/useUsersDetail'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import UpsertUsers from '../UpsertUsers/UpsertUsers'

const UsersDetail = () => {

    const {
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
    } = useUsersDetail()

    return (
        <>
        {showUpdate && <UpsertUsers
            action="update"
            data={userData}
            closeUpdateForm={closeForm}
        />}
        {!showUpdate &&
            <div>
                <Navbar/>
                {confirmDelete &&
                    <Confirm
                        title={userData.active ? `Deactive user ${userData.name}` : `Active user ${userData.name}`}
                        text={userData.active ?
                            "Are you sure you want to deactive this user? This user will not be able to enter again until they are activated again"
                            :
                            "This user will be able to re-enter until they are activated again"
                        }
                        acceptAction={userData.active ? deactiveUser : activeUser}
                        declineAction={confirmDeleteUser}
                />}
                {successMessage &&
                    <Success
                        message={`User deactivated`}
                        doneAction={backToUsers}
                />}
                    <section className="nexus__section section__padding center">
                        <div className="nexus__section-buttons">
                            {userData.active === true && <Button
                                type="button"
                                id="edit-btn"
                                onClick={editUser}
                            >Edit User</Button>}
                            <Button
                                type="button"
                                id="delete-btn"
                                onClick={confirmDeleteUser}
                            >{userData.active ? "Deactive User" : "Active User"}</Button>
                            <Button
                                type="button"
                                id="back-btn"
                                onClick={backToUsers}
                            ><AiOutlineArrowLeft/></Button>
                        </div>
                        <div className="nexus__section-container-info">
                            <Title>Name: { userData.name }</Title>
                            <Title>Username: {userData.username || "...Username..."}</Title>
                            <Title>Role: {Number(userData.role) === 1 ? "Administrator" : "Manager"}</Title>
                        </div>
                    </section>
            </div>
        }
        </>
    )
}

export default UsersDetail