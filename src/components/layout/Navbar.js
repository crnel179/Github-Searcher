import React from 'react'
import PropTypes from 'prop-types'


const Navbar = ({ icon, title }) => {
    
        return (
            <nav className='navbar bg-dark'>
                <h1>
                    <i className={icon}/>{ title }
                </h1>
            </nav>
        )
}

// optional: in case we don't put any props, this will by default display
Navbar.defaultProps = {
    title: ' Github Finder',
    icon: 'fab fa-github'
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default Navbar
