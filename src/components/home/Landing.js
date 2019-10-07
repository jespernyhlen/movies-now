import React, { Component } from 'react';

import { connect } from 'react-redux';

import { setPathname } from '../../actions/searchActions';

import SearchForm from './SearchForm';
import MoviesContainer from './MoviesContainer';

class Landing extends Component {
    componentDidUpdate() {
        this.props.setPathname(this.props.location.pathname);
    }
    render() {
        let pathname = this.props.location.pathname;
        return (
            <div className='container' style={{ margin: '0 auto 6em' }}>
                <SearchForm />
                <MoviesContainer path={pathname} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pathname: state.movies.pathname
});

export default connect(
    mapStateToProps,
    { setPathname }
)(Landing);
