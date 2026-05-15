import React from 'react'
import img from '../assets/react.svg'



export function Home() {
    return <section>
        <h1>Home page for <strong>Amir's</strong> toys!</h1>
        <div>
            <img src={img} />
        </div>
    </section>
}