import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/styles/pages/Home.css'

export function Home() {
    const navigate = useNavigate()

    return (
        <div className="homePage">
            <div className="hero">
                <h1>WHERE IMAGINATION<br />COMES TO PLAY!</h1>
                <p>Discover a world of safe, fun, and educational toys designed to spark creativity in children of all ages.</p>
                <p>From classic wooden blocks to the latest interactive games, our carefully curated collection has something for every child — whether they're just starting to explore or already diving into complex builds and puzzles.</p>

                <p>Every purchase comes with our happiness guarantee. If your little one isn't delighted, neither are we — that's the Kiddos promise.</p>
                <button className="cta-btn" onClick={() => navigate('/toy')}>
                    <i className="ti ti-building-store"></i>
                    Shop toys
                </button>
            </div>
        </div>
    )
}