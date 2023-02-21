import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useHome = () => {

    const [quotesData, setQuotesData] = useState([])
    const [dataChart, setDataChart] = useState([])


    const getQuotesData = async () => {
        await axios.get("http://localhost:3002/quotes")
        .then( res => {
            const quotes = res.data.body.quotes
            const totals = quotes.map( quote => {
                return {
                    total: quote.total,
                    date: quote.created_at
                }
            })
            setQuotesData(totals)
            separateTotals(totals)
        })
    }

    const separateTotals = (quotesData) => {
        const dataByDay = quotesData.reduce((acc, item) => {
            const date = item.date.slice(0, 10);
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += parseFloat(item.total);
            return acc;
        }, {});

        const dataChartArray = Object.entries(dataByDay).map(([date, total]) => ({
            date,
            total,
        }));

        setDataChart(dataChartArray);
    }

    useEffect( () => {
        getQuotesData()
    }, [])

    return {
        quotesData,
        dataChart,
    }
}

export default useHome