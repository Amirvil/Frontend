import React, { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.local.js'

const toyLabel = toyService.getLabels()

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        console.log('filterByToEdit', filterByToEdit)
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, type, name: field } = target
        if (type === 'number') value = +value || ''
        if (type === 'checkbox') value = target.checked
        if (type === 'select-multiple') value = Array.from(target.selectedOptions, (option) => option.value)
        if (field === 'inStock') {
            if (value === 'true') value = true
            else if (value === 'false') value = false
            else value = null
        }
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    return <div className="filter-container">
        <form className={'form-filter'}>
            <label className='filter-label'>
                <span className='filter-label'>Search</span>
                <input
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                    type="search"
                    className="search-input"
                    name="txt" />
            </label>
            <label className='filter-label'>
                <span className='filter-label'>Min-price</span>
                <input
                    onChange={handleChange}
                    type="number"
                    className="min-price"
                    name="minPrice" />
            </label>
            <label className='filter-label'>
                <span className='filter-label'>Max-price</span>
                <input
                    onChange={handleChange}
                    type="number"
                    className="max-price"
                    name="maxPrice" />
            </label>
            <label className='filter-label'>
                <span className='filter-label'>Filter By</span>
                <select
                    onChange={handleChange}
                    name="labels"
                    multiple
                    value={filterByToEdit.labels || []}>
                    <option value=""> All </option>
                    <>
                        {toyLabel.map(label => <option key={label} value={label}>{label}</option>)}
                    </>
                </select>
            </label>
            <label className='filter-label'>
                <span className='filter-label'>In stock</span>
                <select
                    onChange={handleChange}
                    name="inStock"
                    value={filterByToEdit.inStock || ''}>
                    <option value=""> All </option>
                    <option value={true}>In stock</option>
                    <option value={false}>Out of stock</option>
                </select>
            </label>
        </form>
    </div>
}

