import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './home.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useHome from '../../hooks/useHome';
import { Title } from '../../components/form/components';

const Home = () => {

    const { dataChart } = useHome()

    return (
        <>
            <Navbar />
                <Title
                    style={
                        {marginTop: "12px",
                        marginBottom: "0",
                        color: "var(--color-text)",
                        }}>
                            Total Daily Quotes
                            </Title>
            <div className="area-chart-home">
                <AreaChart
                    width={820}
                    height={400}
                    data={dataChart}
                    margin={{
                        top: 0,
                        right: 15,
                        left: 15,
                        bottom: 0
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 " />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="total" stroke="#8884d8" fill="var(--color-footer)" />
                </AreaChart>

            </div>
        </>
    )
}

export default Home