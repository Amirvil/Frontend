import { MyMap } from "../cmp/MyMap.jsx"
import '../assets/styles/pages/About.css'

export function About() {
    return <div className="aboutPage">
        <div className="hero">
            <h1>Welcome to A's Toys – Where Imagination Comes to Play!</h1>
            <p>At A's Toys, we believe that toys are more than just playthings—they are the building blocks of creativity, discovery, and lifelong memories. Founded in [Year], our mission has always been simple: to bring joy, wonder, and high-quality play experiences to children and families everywhere.</p>
            <h2>Our Story</h2>
            <p>What started as a small passion project by a group of toy enthusiasts has grown into a beloved online destination for parents, educators, and kids at heart. We noticed that in a world dominated by screens, there was a growing need for meaningful, tangible play.

                We set out to create an online spaces where finding the perfect toy is just as fun as playing with it. From classic wooden keepsakes to cutting-edge modern games, we curate every item on our shelves with love, care, and a little bit of magic.</p>

            <h3>Our Shops</h3>
            <div className="map-wrapper">
                <MyMap />
            </div>
        </div>



    </div>
}