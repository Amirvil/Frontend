import React from "react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showErrorMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import '../assets/styles/pages/ToyDetails.css'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => { loadToy() }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(setToy)
            .catch(() => {
                showErrorMsg('Cant load toy')
                navigate('/toy')
            })
    }

    if (!toy) return <div className="loading-container">Loading...</div>

    const formattedDate = toy.createdAt ? new Date(toy.createdAt).toLocaleDateString() : 'N/A'

    return (
        <div className="toy-details-page">
            <button className="btn-back" onClick={() => navigate('/toy')}>
                <i className="ti ti-arrow-left"></i> Back to Shop
            </button>

            <div className="toy-details-card">
                <div className="toy-details-img">
                    <img src={`https://robohash.org/${toy.name}?set=set7`} alt={toy.name} />
                </div>

                <div className="toy-details-info">
                    <h1>{toy.name}</h1>

                    <div className="toy-details-labels">
                        {toy.labels?.map(label => (
                            <span key={label} className="label-chip">{label}</span>
                        ))}
                    </div>

                    <div className="toy-details-rows">
                        <div className="detail-row">
                            <span className="detail-label">Price</span>
                            <span className="detail-value price">${toy.price}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Availability</span>
                            <span className={`stock-badge ${toy.inStock ? 'in' : 'out'}`}>
                                {toy.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Added on</span>
                            <span className="detail-value">{formattedDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}