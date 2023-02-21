import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from './contexts/UserContext';
import { AuthRoute, AuthRouteRole, AuthActive } from './contexts/UserContext';

import {
    Landing,
    Login,
    Home,
    Quotes,
    UpsertQuote,
    QuotesDetail,
    Customers,
    UpsertCustomer,
    CustomersDetail,
    Products,
    UpsertProduct,
    ProductsDetail,
    Users,
    UpsertUsers,
    UsersDetail,
    Account,
    NoPage,
    } from './views'

const App = () => {

    return (
        <BrowserRouter>
            <UserProvider>
            <Routes>
                <Route path="/" element={
                <AuthActive>
                    <Landing />
                </AuthActive>
                } />
                <Route path="/login" element={
                <AuthActive>
                    <Login />
                </AuthActive>
                } />
                <Route path="/home" element={
                    <AuthRoute>
                        <Home />
                    </AuthRoute>
                } />
                <Route path="/account/:id" element={
                    <AuthRoute>
                        <Account/>
                    </AuthRoute>
                } />
                <Route path="/customers" element={
                    <AuthRoute>
                        <Customers />
                    </AuthRoute>
                } />
                <Route path="/customers/create" element={
                    <AuthRoute>
                        <UpsertCustomer />
                    </AuthRoute>
                } />
                <Route path="/customers/:id" element={
                    <AuthRoute>
                        <CustomersDetail />
                    </AuthRoute>
                } />
                <Route path="/products" element={
                    <AuthRoute>
                        <Products />
                    </AuthRoute>
                } />
                <Route path="/products/create" element={
                    <AuthRoute>
                        <UpsertProduct />
                    </AuthRoute>
                } />
                <Route path="/products/:id" element={
                    <AuthRoute>
                        <ProductsDetail />
                    </AuthRoute>
                } />
                <Route path="/quotes" element={
                    <AuthRoute>
                        <Quotes />
                    </AuthRoute>
                } />
                <Route path="/quotes/create" element={
                    <AuthRoute>
                        <UpsertQuote />
                    </AuthRoute>
                } />
                <Route path="/quotes/:id" element={
                    <AuthRoute>
                        <QuotesDetail />
                    </AuthRoute>
                } />
                <Route path="/users" element={
                    <AuthRoute>
                        <AuthRouteRole>
                            <Users />
                        </AuthRouteRole>
                    </AuthRoute>
                } />
                <Route path="/users/register" element={
                    <AuthRoute>
                        <AuthRouteRole>
                            <UpsertUsers />
                        </AuthRouteRole>
                    </AuthRoute>
                } />
                <Route path="/users/:id" element={
                    <AuthRoute>
                        <AuthRouteRole>
                            <UsersDetail />
                        </AuthRouteRole>
                    </AuthRoute>
                } />
                <Route path="*" element={<NoPage/>} />
            </Routes>
            </UserProvider>
        </BrowserRouter>
    )
}

export default App