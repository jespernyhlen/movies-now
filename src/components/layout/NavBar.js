import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SearchForm from '../home/SearchForm';

import { connect } from 'react-redux';

class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
        };
    }

    render() {
        const { movieActive } = this.props;

        return (
            <Navigation
                className={movieActive ? 'mb-5 hide-bar' : 'navbar mb-5'}
            >
                <div
                    style={{ maxWidth: '100vw', display: 'flex' }}
                    className='container'
                >
                    <NavLogoContainer>
                        <Link
                            className='navbar-brand text-light-transp-2 text-lg'
                            to='/trending/1'
                        >
                            <NavLogo className='fas fa-film text-light-transp-2 nav-logo'></NavLogo>
                            MOVIES
                        </Link>
                    </NavLogoContainer>
                    <ul className='navbar-nav ml-auto text-light d-inline-block'>
                        <li className='nav-item d-inline-block'>
                            <SearchForm />
                        </li>
                    </ul>
                </div>
            </Navigation>
        );
    }
}

const mapStateToProps = (state) => ({
    movieActive: state.movies.movieActive,
    filters: state.movies.filters,
});

export default withRouter(connect(mapStateToProps, {})(NavBar));

const Navigation = styled.nav`
    position: fixed;
    width: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.48);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 800;
    transform: translateY(0em);
    transition: 0.3s all;

    &:hover {
        background: rgba(0, 0, 0, 0.95) !important;
    }
`;

const NavLogo = styled.i`
    font-size: 1em;
    margin-right: 0.5em;
`;

const NavLogoContainer = styled.div`
    margin-top: -2px;
    margin-bottom: -3.5px;

    a,
    i {
        transition: 0.3s all;
    }

    &:hover a,
    :hover i {
        color: #fff;
    }

    @media only screen and (max-width: 790px) {
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 6em;
    }
`;
