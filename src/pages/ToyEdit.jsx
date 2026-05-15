import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { MultiSelect } from '../cmp/MultiSelect.jsx'
import { toyService } from '../services/toy.service.local.js'
import { saveToy } from "../store/actions/toy.actions.js"
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const toyLabels = toyService.getLabels()

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!toyId) return
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
    }, [])

    function handleChange(ev) {
        const { type, name } = ev.target
        let value = ev.target.value

        if (type === 'select-multiple') value = Array.from(ev.target.selectedOptions, option => option.value)
        if (type === 'number') value = +ev.target.value

        setToyToEdit(prevToy => ({ ...prevToy, [name]: value }))
    }

    function onSetLabels(labels) {
        setToyToEdit(prevToy => ({ ...prevToy, labels }))
    }

    function onSave(ev) {
        ev.preventDefault()

        const inStock = (toyToEdit.inStock === 'true') ? true : false
        const newToy = { ...toyToEdit, inStock }

        saveToy(newToy)
            .then(() => {
                showSuccessMsg('Toy saved successfully')
                navigate('/toy')
            })
            .catch(err => {
                showErrorMsg('Can not save toy, please try again')
            })
    }

    function getYesNo() {
        return toyToEdit.inStock
    }

    if (!toyToEdit) return <div>Loading...</div>
    return (
        <form onSubmit={onSave} className="container edit-form" action="">
            <div>
                <label>
                    <span>Name</span>
                    <input
                        className="edit-input name-input"
                        value={toyToEdit.name}
                        onChange={handleChange}
                        type="text"
                        name="name" />
                </label>
            </div>
            <div>
                <label>
                    <span>Price</span>
                    <input
                        className="edit-input price-input"
                        value={toyToEdit.price}
                        onChange={handleChange}
                        type="number"
                        name="price" />
                </label>
            </div>
            <div>
                <select 
                    multiple 
                    onChange={handleChange} 
                    name="labels" 
                    value={toyToEdit.labels}
                    className='edit-input'>
                        {toyLabels.map(label => <option key={label}>{label}</option>)}
                </select>
            </div>
            <div>
                <select value={getYesNo() || '1'} onChange={handleChange} name="inStock" className='edit-input'>
                    <option value={'1'} disabled>
                        In Stock
                    </option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <button onClick={onSave} className="save-toy-btn">Save</button>
        </form>
    )
}