import React from 'react'
import { NavLink } from 'react-router-dom'
import '../assets/styles/cmp/AppHeader.css'

export const AppHeader = () => {
    return <header className="main-header" >
        <nav className="header-nav container">
            <h1>A'S TOYS</h1>
            <div className="header-links">
                <NavLink className="header-link" to="/">Home</NavLink>
                <NavLink className="header-link" to="/toy">Toys</NavLink>
            </div>

        </nav>
    </header>
}
