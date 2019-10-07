import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import {
    searchMovie,
    fetchMovies,
    fetchLatest,
    setLoading,
    setFirstload
} from '../../actions/searchActions';

class SearchForm extends Component {
    componentDidMount() {
        this.props.setFirstload();
        if (
            !this.props.firstload ||
            this.props.location.pathname.substring(1) === 'latest'
        ) {
            this.fetchLatest();
        }
    }

    componentDidUpdate(prevProps) {
        if (
            (this.props.pathname === '/latest') &
            (prevProps.pathname !== '/latest')
        ) {
            this.fetchLatest();
        }
    }

    onChange = e => {
        this.props.searchMovie(e.target.value);
    };

    onSubmit = e => {
        e.preventDefault();

        this.props.fetchMovies(this.props.text);
        this.props.setLoading();
        this.props.history.push('/search');
    };

    fetchLatest() {
        this.props.fetchLatest();
        this.props.setLoading();
    }

    render() {
        return (
            <div
                className='jumbotron jumbotron-fluid mt-5 text-center'
                style={{ background: 'none' }}
            >
                <div className='container'>
                    <h1 className='display-4 mb-3 font-weight-extra-light text-light-transp-2'>
                        <i className='fa fa-search' /> Search for a movie ,TV
                        series ..
                    </h1>
                    <form id='searchForm' onSubmit={this.onSubmit}>
                        <input
                            type='text'
                            className='form-control my-5'
                            name='searchText'
                            placeholder='Search Movies, TV Series ...'
                            onChange={this.onChange}
                        />
                        <button type='submit' className='search-btn'>
                            Search
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    text: state.movies.text,
    firstload: state.movies.firstload,
    pathname: state.movies.pathname
});

export default withRouter(
    connect(
        mapStateToProps,
        { searchMovie, fetchMovies, fetchLatest, setLoading, setFirstload }
    )(SearchForm)
);
