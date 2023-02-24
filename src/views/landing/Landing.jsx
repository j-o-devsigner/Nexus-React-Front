import React from 'react'
import main_img from '../../assets/header-img.png'
import Footer from '../../components/footer/Footer';
import logo from '../../assets/logo.svg';
import Title from './components/title/Title';
import P from './components/p/P'
import { Link } from 'react-router-dom';
import { Button } from '../../components/form/components';
import './landing.css';

const Main = () => {
    return (
        <>
            <main className="nexus__main section__padding" id="home">
                <div className="nexus__main-content">
                    <Title
                    className="gradient__text"
                    >Enhancing Business Success
                    through a NEXUS-Driven
                    Client Management Strategy</Title>
                    <P>
                    "Our service is a powerful tool that helps businesses manage and analyze their interactions with customers. It centralizes all customer data in one place, allowing companies to easily access and analyze customer information.This helps businesses improve communication, increase efficiency, our service is designed to help businesses of all sizes streamline their sales, customer service efforts, and manage and grow their customer relationships."
                    </P>
                </div>
                <div className="nexus__main-image">
                    <img src={main_img} alt="main_img" className="floating-image"/>
                </div>
            </main>
        </>
    )
}

const NavbarLanding = () => {
    return (
        <>
            <div className="nexus__navbarLanding">
                <div className="nexus_navbarLanding">
                <div className="nexus__navbarLanding-logo">
                        <img src={logo} alt="logo" />
                </div>
                </div>
                <Link to="/login">
                    <Button>Log in</Button>
                </Link>
            </div>
        </>
    )
}

const Landing = () => {
    return (
        <>
            <div className="gradient__bg">
                <NavbarLanding />
                <Main />
                <Footer />
            </div>
        </>
    )
}

export default Landing