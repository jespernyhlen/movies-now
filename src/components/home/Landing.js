import React, { Component } from 'react';

import { connect } from 'react-redux';

import { setPathname } from '../../actions/searchActions';

import SearchForm from './SearchForm';
import Filter from './Filter';

import MoviesContainer from './MoviesContainer';
import Pagination from './Pagination';

class Landing extends Component {
    componentDidUpdate() {
        this.props.setPathname(this.props.location.pathname);
    }
    render() {
        let pathname = this.props.location.pathname;
        return (
            <div
                className='container'
                style={{ paddingBottom: '6em', maxWidth: '100vw' }}
            >
                <Filter />
                <SearchForm id={this.props.match.params.id} />
                <MoviesContainer path={pathname} />
                <Pagination totalPages={this.props.totalPages} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pathname: state.movies.pathname,
    totalPages: state.movies.totalPages
});

export default connect(
    mapStateToProps,
    { setPathname }
)(Landing);
