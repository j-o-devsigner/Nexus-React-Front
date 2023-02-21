import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './listData.css'
import DataTable from 'react-data-table-component';

const ListData = ( { section, columns, data, title, deactivated, sended } ) => {

    const navigate = useNavigate()

    const [columnsData, setColumnsData] = useState([])
    const [dataData, setDataData] = useState([])

    const changePage = (row, e) => {
        section === "quotes" ?
        navigate(`/${section}/${row.quotenumber}`)
        :
        navigate(`/${section}/${row.id}`)
    }

    useEffect( () => {
        setColumnsData(columns)
        if(section === "quotes") {
            if(data.length > 0) {
                if(sended === true) {
                    const filteredData = data[0].filter(row => row.sended === true && row.active === true)
                    setDataData(filteredData)
                } else if(sended !== true && deactivated !== true) {
                    const filteredData = data[0].filter(row => row.sended === false && row.active === true)
                    setDataData(filteredData)
                } else if(deactivated === true) {
                    const filteredData = data[0].filter(row => row.active === false)
                    setDataData(filteredData)
                }
            }
        } else if (section === "users" || section === "products" || section === "customers") {
            if (deactivated === true) {
                const filteredData = data.filter(row => row.active === false);
                setDataData(filteredData)
            } else {
                const filteredData = data.filter(row => row.active === true);
                setDataData(filteredData)
            }
        } else {
            setDataData(data)
        }
    }, [columns, data, deactivated, sended])

    return (
            <DataTable
                title={title}
                columns={columnsData}
                data={dataData}
                keys={data.id}
                onRowClicked={changePage}
                highlightOnHover
                pointerOnHover
                persistTableHead
                pagination
            />
    )
}

export default ListData