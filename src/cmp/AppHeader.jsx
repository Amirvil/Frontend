import React from 'react'
import { NavLink } from 'react-router-dom'
import '../assets/styles/cmp/AppHeader.css'
import logoImg from '../assets/img/rocket-ship-half-shadow.png'


export const AppHeader = () => {
    return <header className="main-header" >
        <nav className="header-nav container">
            <div className='header-logo'>
                <img src={logoImg} className='logo'></img>
                <h1>A's Toys</h1>
            </div>

            <div className="header-links">
                <NavLink className="header-link" to="/">Home</NavLink>
                <NavLink className="header-link" to="/toy">Toys</NavLink>
                <NavLink className="header-link" to="/toy/dashboard">Dashboard</NavLink>
                <NavLink className="header-link" to="/toy/about">About</NavLink>
            </div>

        </nav>
    </header>
}
