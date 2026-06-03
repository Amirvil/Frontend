import React from 'react'
import { NavLink } from 'react-router-dom'

export function ToyPreview({ toy, onRemove }) {
    return (
        <>
            <button onClick={() => onRemove(toy._id)} className="btn-remove">✕</button>
            <img src={`https://robohash.org/${toy.name}?set=set7`} alt={toy.name} />
            <div className='toy-name'>{toy.name}</div>
            <div className='toy-labels'>
                {toy.labels.map(label => <span key={label}>{label}</span>)}
            </div>
            <div className="toy-info">
                <span className={`stock-badge ${toy.inStock ? 'in' : 'out'}`}>
                    {toy.inStock ? 'In stock' : 'Out of stock'}
                </span>
                <span className="toy-price">${toy.price}</span>
            </div>
        </>
    )
}