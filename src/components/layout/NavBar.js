import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div>
            <nav className='navbar bg-transparent mb-5'>
                <div className='container'>
                    <div className='navbar-header'>
                        <i class='fas fa-film text-light-transp nav-logo'></i>
                        <Link
                            className='navbar-brand text-light-transp text-lg brand-text'
                            to='/latest'
                        >
                            MOVIES
                        </Link>
                    </div>
                    <ul className='navbar-nav ml-auto text-light d-inline-block'>
                        <li className='nav-item d-inline-block'>
                            {/* <img
                                src='https://p7.hiclipart.com/preview/940/445/158/ticket-film-cinema-cinema-ticket-thumbnail.jpg'
                                alt='nav-logo'
                                style={{
                                    width: '100px',
                                    height: '100px'
                                }}
                            /> */}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
