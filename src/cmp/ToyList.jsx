import React from 'react'
import { ToyPreview } from './ToyPreview.jsx'
import { NavLink } from 'react-router-dom'
import '../assets/styles/cmp/ToyList.css'

export function ToyList({ toys, onRemove }) {
    return (
        <div className="toy-list">
            {
                toys.map(toy =>
                    <div className="toy-card" key={toy._id}>

                        <ToyPreview toy={toy} key={toy._id} onRemove={onRemove} />

                        <section className="toy-prev-btns">
                            <NavLink to={`/toy/edit/${toy._id}`}>Edit</NavLink>
                            <NavLink to={`/toy/details/${toy._id}`}>Details</NavLink>
                        </section>
                    </div>
                )}
        </div>
    )
}
