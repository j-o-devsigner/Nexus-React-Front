import React from "react";
import logo from "../../assets/logo.svg";
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { Button } from "../form/components";
import { UserContext } from "../../contexts/UserContext";


const Menu = () => {

    const {
        userLogged,
    } = React.useContext(UserContext)

    React.useEffect(() => {

    }, [userLogged])

    const routes = [
        {
        to: '/home',
        text: 'Home',
        private: false,
    }, {
        to: '/customers',
        text: 'Customers',
        private: false,
    }, {
        to: '/products',
        text: 'Products',
        private: false,
    }, {
        to: '/quotes',
        text: 'Quotes',
        private: false,
    }, {
        to: '/users',
        text: 'Users',
        private: true,
    },
];

    return (
    <>
    {routes.map(route => {
            if (route.private && userLogged.role === 2) return null
            return (<NavLink
                style={({ isActive }) => ({
                color: isActive ? '#EE6C4D' : '#293241'
                })}
                to={route.to}
                key={route.text}
            >
                <p>{route.text}</p>
            </NavLink>)
        })}
    </>
    )
}

const Navbar = () => {

    const {
        userLogged,
        setUserLogged,
    } = React.useContext(UserContext)

    React.useEffect(() => {

    }, [userLogged])

    const navigate = useNavigate()

    const [toggleMenu, setToggleMenu] = React.useState(false);

    const onClickLogOut = () => {
        setUserLogged("")
        localStorage.setItem('token', '')
        localStorage.setItem('userLogged', '')
        localStorage.setItem('active', 'false')
        navigate('/')
    }

    const navAccount = () => {
        navigate(`/account/${userLogged.id}`)
    }

    return (
    <>
        <div className="nexus__navbar">
        <div className="nexus_navbar-links">
            <div className="nexus__navbar-links_logo">
                <NavLink
                    to='/home'
                >
                <img src={logo} alt="logo" />
                </NavLink>
            </div>
            <div className="nexus__navbar-links_container">
                <Menu />
            </div>
        </div>
        <div className="nexus__navbar-logout">
            <Button
                className="account-btn"
                type="button"
                onClick={navAccount}
            >Account</Button>
            <Button
                type="button"
                onClick={onClickLogOut}
            >Log Out</Button>
        </div>
        <div className="nexus__navbar-menu">
            {toggleMenu ? (
            <RiCloseLine
                color="#E3C89B"
                size={27}
                onClick={() => setToggleMenu(false)}
            />
            ) : (
            <RiMenu3Line
                color="#E3C89B"
                size={27}
                onClick={() => setToggleMenu(true)}
            />
            )}
            {toggleMenu && (
            <div className="nexus__navbar-menu_container scale-up-center">
                <div className="nexus__navbar-menu_container-links">
                <Menu className="navbar-menu" />
                <div className="nexus__navbar-menu_container-links-logout">
                <Button
                    className="account-btn"
                    type="button"
                    onClick={navAccount}
                >Account
                </Button>
                <Button
                    type="button"
                    onClick={onClickLogOut}
                >Log Out</Button>
                </div>
                </div>
            </div>
            )}
        </div>
        </div>
    </>
    );
};

export default Navbar;
