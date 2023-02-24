import React from 'react'
import logo from '../../assets/logo.svg';
import { Errors } from '../../components/form/components';
import useAuth from '../../hooks/useAuth';
import './login.css'
import { Button } from '../../components/form/components';

const Login = () => {

    const {
        username,
        password,
        onChangeUsername,
        onChangePassword,
        submitData,
        errors,
        backToLanding,
    } = useAuth()

    return (
    <>
        <div className="base__shapes">
            <div className="shape"></div>
            <div className="shape"></div>
        </div>
        <form className="nexus__login-form">
        {errors.usernameEmpty && <Errors message="Enter a username" />}
        {errors.passwordEmpty && <Errors message="Enter a password" />}
        {errors.wrongAttempt && <Errors message="Wrong username or password" />}
        {errors.accountDisabled && <Errors message="This account is disabled" />}
            <h3 className="nexus__login-form_title">Welcome to</h3>
            <div className="nexus__login-logo">
                <img src={logo} alt="logo" />
            </div>

            <label htmlFor="username" className="nexus__login-form_label" >Username</label>
            <input
                className={errors.usernameEmpty || errors.wrongAttempt ? "input-error" : ""}
                type="text"
                placeholder="Username"
                id="username"
                name="username"
                value={username}
                onChange={onChangeUsername}
            />

            <label htmlFor="password" className="nexus__login-form_label" >Password</label>
            <input
                className={errors.passwordEmpty || errors.wrongAttempt ? "input-error" : ""}
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                value={password}
                onChange={onChangePassword}
            />

            <button
                type="submit"
                className="nexus__login-button"
                onClick={submitData}
            >Log in</button>
        </form>
        <div className="nexus__login-accounts">
            <p>
                Username: admin
                Password: admin
            </p>
            <p>
                Username: manager
                Password: manager
            </p>
        </div>
        <Button
            type="button"
            onClick={backToLanding}
            id="login_btn"
        >Back</Button>
    </>
    )
}

export default Login