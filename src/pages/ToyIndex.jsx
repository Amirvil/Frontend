
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ToyList } from '../cmp/ToyList.jsx'
import { loadToys, removeToy } from '../store/actions/toy.actions.js'
import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { ToyFilter } from '../cmp/ToyFilter.jsx'
import { ToySort } from '../cmp/ToySort.jsx'

export function ToyIndex() {
    const toys = useSelector((state) => state.toyModule.toys)

    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilterBy())
    const [sort, setSort] = useState(toyService.getDefaultSort())

    useEffect(() => {
        console.log('filterBy changed:', filterBy)
        loadToys(filterBy, sort)
            .then(() => {
                console.log('Loaded successfully')
            })
            .catch((err) => {
                showErrorMsg('Oops.. something went wrong, try again')
            })
    }, [filterBy, sort])


    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed successfully')
            })
            .catch(err => {
                showErrorMsg('Cant remove toy, try again.')
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onSetSort(sort) {
        setSort(sort)
    }

    if (!toys) return <div>Loading...</div>

    return (
        <div className="toy-app">
            <section className="main-control-container">

                <NavLink to="/toy/edit" className="btn-add">Add Toy</NavLink>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <ToySort sort={sort} onSetSort={onSetSort} />

            </section>

            <ToyList toys={toys} onRemove={onRemoveToy} />

        </div>
    )
}



