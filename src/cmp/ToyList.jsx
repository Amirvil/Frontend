import React from 'react'
import { ToyPreview } from './ToyPreview.jsx'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../assets/styles/cmp/ToyList.css'

export function ToyList({ toys, onRemove }) {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    return (
        <div className="toy-list">
            {toys.map(toy =>
                <div className="toy-card" key={toy._id}>
                    <ToyPreview toy={toy} onRemove={onRemove} isAdmin={user?.isAdmin} />
                    <section className="toy-prev-btns">
                        {user?.isAdmin && <NavLink to={`/toy/edit/${toy._id}`}>Edit</NavLink>}
                        <NavLink to={`/toy/details/${toy._id}`}>Details</NavLink>
                    </section>
                </div>
            )}
        </div>
    )
}