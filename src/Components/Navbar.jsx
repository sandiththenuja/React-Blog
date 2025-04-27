import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <div className="navbar">
                <h2>React Blog</h2>

                <nav>
                    <ul>
                        <NavLink to='/'><li>Home</li></NavLink>
                        <NavLink to='/about'><li>About</li></NavLink>
                        <NavLink to='/create-post'><li>Create Post</li></NavLink>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar
