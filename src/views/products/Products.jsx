import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import ListData from '../../components/listdata/ListData';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { schemaColumns } from './schemaTable';

const Products = () => {

    const [schemaData, setSchemaData] = React.useState([]);

    const listProducts = async () => {
        await axios.get("http://localhost:3003/products")
        .then(res => {
            const capitalizedArray = res.data.body.map(obj => {
                return { ...obj, name: changeCase(obj.name) };
            });

            setSchemaData(capitalizedArray);
        });
    }

    const changeCase = (text) => {
        return text.toLowerCase().replace(/(^|\s)[a-z]/g, (letter) => letter.toUpperCase());
    };

    React.useEffect(() => {
        listProducts();
    }, []);

    return (
        <>
        <Navbar />
        <section className="nexus__section section__padding">
                <div className="nexus__section-container">
                    <div className="nexus__section-container-button">
                        <Link to="/products/create"><button>New Product</button></Link>
                    </div>
                    <ListData
                    section="products"
                    title="Products"
                    columns={schemaColumns}
                    data={schemaData}
                />
            </div>
        </section>
        </>
    )
}

export default Products