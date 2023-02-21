import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import ListData from '../../components/listdata/ListData';
import './quotes.css';
import axios from 'axios';
import { Button } from '../../components/form/components';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { schemaColumns } from './schemas';
import config from '../../config'

const Quotes = () => {

    const { userLogged } = React.useContext(UserContext)

    const [schemaData, setSchemaData] = React.useState([])
    const [notSended, setNotSended] = React.useState(true)
    const [sended, setSended] = React.useState(false)
    const [deactivated, setDeactivated] = React.useState(false)

    const listQuotes = async () => {
        await axios.get(config.quotes_route)
        .then( res => {
            let customersData = res.data.body.customers
            let quotesData = res.data.body.quotes
            quotesData.map( quote => {
                if(customersData.find(customer => {
                    if(quote.sendto === customer.id) {
                        quote.customer = customer.name;
                    }
                })) {
                }
            })
            setSchemaData([quotesData])
        })
    }

    const toggleTables = () => {
        setSended(toggle => !toggle)
        setNotSended(sended)
        setDeactivated(false)
    }

    const toggleDeactivated = () => {
        setDeactivated(toggle => !toggle)
        setNotSended(false)
        setSended(false)
    }

    React.useEffect(() => {
        listQuotes();
    }, []);

    return (
        <>
            <Navbar />
            <section className="nexus__section section__padding">
                <div className="nexus__section-container">
                    <div className="nexus__section-container-button">
                        <Link to="/quotes/create"><Button>New Quote</Button></Link>
                        <Button style={ {backgroundColor: "var(--color-btn)"} }
                            type="button"
                            onClick={toggleTables}
                        >{!sended ? "Sended Quotes" : "Quotes"}</Button>
                        {!deactivated && userLogged.role === 1 && <Button style={ {backgroundColor: "#9e2a2b", color: "var(--color-bg)"} }
                            type="button"
                            onClick={toggleDeactivated}
                        >{!deactivated ? "Deleted Quotes" : "Quotes"}</Button>}
                    </div>
                    {notSended &&
                        <ListData
                        section="quotes"
                        title="Quotes"
                        columns={schemaColumns}
                        data={schemaData}
                        />
                    }
                    {sended &&
                        <ListData
                        section="quotes"
                        title="Sended Quotes"
                        columns={schemaColumns}
                        data={schemaData}
                        sended={true}
                        />
                    }
                    {deactivated &&
                        <ListData
                        section="quotes"
                        title="Deleted Quotes"
                        columns={schemaColumns}
                        data={schemaData}
                        onRowClicked
                        deactivated={true}
                    />
                    }
                </div>
            </section>
        </>
    )
}

export default Quotes