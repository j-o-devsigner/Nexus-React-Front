import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import ListData from '../../components/listdata/ListData'
import { Link } from 'react-router-dom'
import { Button } from '../../components/form/components'
import { schemaColumns } from './schemaTable'
import axios from 'axios'

const Users = () => {

    const [schemaData, setSchemaData] = React.useState([]);
    const [deactivated, setDeactivated] = React.useState(false)

    const listUsers = async () => {
        const userLogged = JSON.parse(localStorage.getItem('userLogged'))

        await axios.get("http://localhost:3001/users")
        .then(res => {
            const capitalizedArray = res.data.body.map(obj => {
                return { ...obj, name: changeCase(obj.name) };
            });

            const roleChangedArray = capitalizedArray.map(obj => {
                return { ...obj, roleid: obj.roleid === 1 ? "Administrator" : "Manager" };
            });

            const filteredArray = roleChangedArray.filter(user => user.id !== userLogged.id)

            setSchemaData(filteredArray);
        });
    }

    const changeCase = (text) => {
        return text.toLowerCase().replace(/(^|\s)[a-z]/g, (letter) => letter.toUpperCase());
    };

    const toggleTables = () => {
        setDeactivated(toggle => !toggle)
    }

    React.useEffect(() => {
        listUsers();
    }, []);

    return (
        <>
        <Navbar />
        <section className="nexus__section section__padding">
                <div className="nexus__section-container">
                    <div className="nexus__section-container-button">
                        <Link to="/users/register"><Button>Register User</Button></Link>
                        <Button style={ {backgroundColor: "var(--color-btn)"} }
                            type="button"
                            onClick={toggleTables}
                        >{!deactivated ? "Deactivated Users" : "Active Users"}</Button>
                    </div>
                    {!deactivated ?
                    <ListData
                    section="users"
                    title="Users"
                    columns={schemaColumns}
                    data={schemaData}
                    />
                    :
                    <ListData
                    section="users"
                    title="Deactivated Users"
                    columns={schemaColumns}
                    data={schemaData}
                    deactivated={true}
                    />

                    }
            </div>
        </section>
        </>
    )
}

export default Users