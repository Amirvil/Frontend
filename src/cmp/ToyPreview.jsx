import React from 'react'
import { NavLink } from 'react-router-dom'

export function ToyPreview({ toy, onRemove }) {
    return (<>
        <button onClick={() => onRemove(toy._id)} className="btn-remove">X</button>
        <div className='toy-name'>
            {toy.name}
        </div>
        <div className='toy-labels'>
            {toy.labels.map(label => (<span key={label}>{label}</span>))}
        </div>

        <img src={`https://robohash.org/${toy.name}?set=set2`} alt="" />

        <div>
            In Stock: {(toy.inStock) ? 'Yes' : 'No'}
        </div>
        <div>
            Price: {`${toy.price}`}
        </div>
    </>

    )
}