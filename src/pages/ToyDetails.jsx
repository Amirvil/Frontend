import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import '../assets/styles/pages/ToyDetails.css'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [msgTxt, setMsgTxt] = useState('')
    const { toyId } = useParams()
    const navigate = useNavigate()
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    useEffect(() => { loadToy() }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(setToy)
            .catch(() => {
                showErrorMsg('Cant load toy')
                navigate('/toy')
            })
    }

    async function onAddMsg(ev) {
        ev.preventDefault()
        if (!msgTxt.trim()) return
        try {
            const addedMsg = await toyService.addMsg(toyId, { txt: msgTxt })
            setToy(prev => ({ ...prev, msgs: [...(prev.msgs || []), addedMsg] }))
            setMsgTxt('')
            showSuccessMsg('Message added!')
        } catch {
            showErrorMsg('Could not add message')
        }
    }

    async function onRemoveMsg(msgId) {
        try {
            await toyService.removeMsg(toyId, msgId)
            setToy(prev => ({ ...prev, msgs: prev.msgs.filter(m => m.id !== msgId) }))
            showSuccessMsg('Message removed')
        } catch {
            showErrorMsg('Could not remove message')
        }
    }

    if (!toy) return <div className="loading-container">Loading...</div>

    const formattedDate = toy.createdAt ? new Date(toy.createdAt).toLocaleDateString() : 'N/A'

    return (
        <div className="toy-details-page">

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

            {/* Messages Section */}
            <div className="toy-msgs">
                <h2>Messages</h2>

                {!toy.msgs?.length && <p className="no-msgs">No messages yet</p>}

                <ul className="msgs-list">
                    {toy.msgs?.map(msg => (
                        <li key={msg.id} className="msg-item">
                            <span className="msg-by">{msg.by.fullname}</span>
                            <span className="msg-txt">{msg.txt}</span>
                            {(loggedInUser?._id === msg.by._id || loggedInUser?.isAdmin) &&
                                <button className="btn-remove-msg" onClick={() => onRemoveMsg(msg.id)}>✕</button>
                            }
                        </li>
                    ))}
                </ul>

                {loggedInUser && (
                    <form className="msg-form" onSubmit={onAddMsg}>
                        <input
                            type="text"
                            value={msgTxt}
                            onChange={ev => setMsgTxt(ev.target.value)}
                            placeholder="Write a message..."
                        />
                        <button type="submit">Send</button>
                    </form>
                )}
                {!loggedInUser && <p className="login-prompt">Sign in to leave a message</p>}
            </div>
        </div>
    )
}