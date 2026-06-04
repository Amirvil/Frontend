import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { userService } from '../services/user.service.js'
import { store } from '../store/store.js'
import { SET_USER } from '../store/reducers/user.reducer.js'
import '../assets/styles/cmp/AppHeader.css'
import loginIcon from '../assets/icons/account_circle_24dp_202124_FILL0_wght400_GRAD0_opsz24.svg'

export const AppHeader = () => {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const navigate = useNavigate()

    async function onLogout() {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
        navigate('/')
    }
    return (
        <aside className="main-sidebar">
            <h1>Kiddos</h1>
            <div className="links-container">
                <NavLink className="header-link" to="/">Home</NavLink>
                <NavLink className="header-link" to="/toy" end>Toys</NavLink>
                <NavLink className="header-link" to="/toy/dashboard">Dashboard</NavLink>
                <NavLink className="header-link" to="/toy/about">About</NavLink>
            </div>
            <div className="sidebar-footer">
                {user ? (
                    <div className="user-info">
                        <img src={loginIcon} className="nav-icon" alt="User" />
                        <span className="username">{user.fullname || user.username}</span>
                        <button className="btn-logout" onClick={onLogout}>Logout</button>
                    </div>
                ) : (
                    <NavLink className="header-link login-link" to="/auth/login">
                        <img src={loginIcon} className="nav-icon" alt="Login" />
                    </NavLink>
                )}
            </div>

        </aside>
    )
}
