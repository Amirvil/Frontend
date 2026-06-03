import React from 'react'
import { NavLink } from 'react-router-dom'
import '../assets/styles/cmp/AppHeader.css'
import logoImg from '../assets/img/rocket-ship-half-shadow.png'


export const AppHeader = () => {
    return (
        <aside className="main-sidebar">
            <h1>Kiddos</h1>
            <div className="links-container">
                <NavLink className="header-link" to="/">Home</NavLink>
                <NavLink className="header-link" to="/toy">Toys</NavLink>
                <NavLink className="header-link" to="/toy/dashboard">Dashboard</NavLink>
                <NavLink className="header-link" to="/toy/about">About</NavLink>
            </div>
        </aside>
    )
}
