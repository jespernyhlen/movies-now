import React, { Component } from 'react';

import { connect } from 'react-redux';
import MovieCard from './MovieCard';

class MoviesContainer extends Component {
    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    render() {
        const { movies, loading, pathname, filterActive } = this.props;

        const capitalize = s => {
            if (typeof s !== 'string') return '';
            return s.charAt(0).toUpperCase() + s.slice(1);
        };

        let pathSplit = pathname.split('/');
        let currentPath = pathSplit[1];
        // console.log(currentPath);
        return (
            <React.Fragment>
                <div className='movie-bg-container '>
                    <img
                        id='main-background'
                        src='
                        https://images.unsplash.com/photo-1462651567147-aa679fd1cfaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1700&q=60'
                        className='movies-bg-img'
                        alt='background'
                    />
                </div>
                <div style={{ padding: '0 1vw' }} className='row'>
                    <div className='text-light mb-3 movies-category'>
                        {loading ? null : (
                            <div>
                                <i className='fas fa-angle-right'></i>{' '}
                                {capitalize(currentPath)}
                            </div>
                        )}
                    </div>
                </div>

                <div className='movies-bg'></div>

                <div
                    style={{ padding: '0 1vw' }}
                    className={`movies-row row ${
                        filterActive ? 'filter-active-blur' : ''
                    }`}
                >
                    {!loading
                        ? movies.map((movie, index) =>
                              movie.poster_path ? (
                                  <MovieCard key={index + 1} movie={movie} />
                              ) : null
                          )
                        : null}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    movies: state.movies.movies,
    loading: state.movies.loading,
    pathname: state.movies.pathname,
    filters: state.movies.filters
});

export default connect(mapStateToProps)(MoviesContainer);
