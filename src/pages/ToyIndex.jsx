
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ToyList } from '../cmp/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { ToyFilter } from '../cmp/ToyFilter.jsx'
import '../assets/styles/pages/ToyIndex.css'

import {
    loadToys,
    removeToyOptimistic,
    setFilter,
} from '../store/actions/toy.actions.js'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const maxPage = useSelector(storeState => storeState.toyModule.maxPage)
    const isLoading = useSelector(
        storeState => storeState.toyModule.flag.isLoading
    )

    useEffect(() => {
        fetchToys()
    }, [filterBy])

    async function fetchToys() {
        try {
            await loadToys()
        } catch (error) {
            showErrorMsg('Cannot load toys')
        }
    }


    async function onRemoveToy(toyId) {
        if (!user?.isAdmin) {
            showErrorMsg('You must be admin to remove items')
            return
        }

        try {
            await removeToyOptimistic(toyId)
            showSuccessMsg('Toy removed')
        } catch (error) {
            console.log('Cannot remove toy', error)
            showErrorMsg('Cannot remove toy')
        }
    }

    function onSetFilter(newFilter) {
        setFilter({ ...filterBy, ...newFilter })
    }

    function onSetSort(sort) {
        setSort(sort)
    }

    if (!toys) return <div>Loading...</div>

    return (
        <div className="toy-app">
            <header className="toy-index-header">
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />


            </header>

            {toys.length === 0 ? (
                <div className="no-toys-fallback">No toys found matching current criteria.</div>
            ) : (
                <ToyList toys={toys} onRemove={onRemoveToy} />
            )}

            {user?.isAdmin && (
                <NavLink to="/toy/edit" className="btn-add">
                    Add Toy
                </NavLink>
            )}
        </div>
    )
}