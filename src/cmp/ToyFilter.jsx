import { useRef, useState } from 'react'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'
import { toyService } from '../services/toy.service'
import { utilService } from '../services/util.service'
import { ToySort } from './ToySort'
import { MultiSelect } from './MultiSelect'
import '../assets/styles/cmp/ToyFilter.css'

export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffectUpdate(() => {
        console.log('filterByToEdit changed:', filterByToEdit)  // check this fires
        debouncedOnSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value || '' : value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onLabelsChange(labels) {
        console.log('labels changed:', labels)
        setFilterByToEdit(prevFilter => ({ ...prevFilter, labels }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { txt, inStock, labels } = filterByToEdit

    return (
        <section className="toy-filter">
            <div className="filter-txt">
                <span className="section-label">Search</span>
                <div className="filter-input">
                    <i className="ti ti-search"></i>
                    <input
                        onChange={handleChange}
                        value={txt}
                        type="text"
                        placeholder="Search toys..."
                        name="txt"
                    />
                </div>
                <select name="inStock" value={inStock || ''} onChange={handleChange}>
                    <option value="">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Not in stock</option>
                </select>
            </div>

            <div className="filter-labels">
                <span className="section-label">Labels</span>
                <MultiSelect value={labels || []} onChange={onLabelsChange} />
            </div>

            <div className="sort-row">
                <span className="section-label">Sort</span>
                <ToySort sortBy={filterBy.sortBy} onSetFilter={onSetFilter} />
            </div>
        </section>
    )
}