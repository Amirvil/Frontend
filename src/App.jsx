import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { Home } from './pages/Home.jsx'
import { UserMsg } from './cmp/UserMsg.jsx'
import { AppHeader } from './cmp/AppHeader.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { About } from './pages/About.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { useSelector } from 'react-redux'
import '../src/assets/styles/basics/layout.css'

export function App() {

  function AdminRoute({ element }) {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    return user?.isAdmin ? element : <Navigate to="/" />
  }

  return (
    <div className="main-layout">
      <AppHeader />
      <main className="main-content" style={{ overflow: 'hidden' }}>
        <Routes>
          <Route element={<Signup />} path="/auth/signup" />
          <Route element={<Login />} path="/auth/login" />
          <Route element={<About />} path="/toy/about" />
          <Route element={<Dashboard />} path="/toy/dashboard" />
          <Route element={<AdminRoute element={<ToyEdit />} />} path="/toy/edit/:toyId?" />
          <Route element={<ToyDetails />} path="/toy/details/:toyId" />
          <Route element={<ToyIndex />} path="/toy" />
          <Route element={<Home />} path="/" />
        </Routes>
      </main>
      <UserMsg />
    </div>
  )
}