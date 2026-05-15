import React from 'react'
import { NavLink } from 'react-router-dom'

export const AppHeader = () => {
    return <header className="main-header" >
        <nav className="header-nav container">
            <h1>TOYS ARE US</h1>
            <NavLink className="header-link" to="/">Home</NavLink>
            <NavLink className="header-link" to="/toy">Toys</NavLink>
        </nav>
    </header>
}
