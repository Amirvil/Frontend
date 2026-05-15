import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { Home } from './pages/Home.jsx'
import { UserMsg } from './cmp/UserMsg.jsx'
import { AppHeader } from './cmp/AppHeader.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'

export function App() {
  return <main className="main-toy-app">
    <AppHeader />
    <Routes>
      <Route element={<ToyDetails />} path="/toy/details/:toyId" />
      <Route element={<ToyEdit />} path="/toy/edit/:toyId?" />
      <Route element={<ToyIndex />} path="/toy" />
      <Route element={<Home />} path="/" />
    </Routes>

    <UserMsg />
  </main >

}