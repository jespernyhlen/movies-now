import React, { Component } from 'react';

import { connect } from 'react-redux';

import MovieCard from './MovieCard';

class MoviesContainer extends Component {
    constructor() {
        super();
        this.state = {};
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
                <div className='movie-bg-container'>
                    <img
                        id='main-background'
                        src='
                        https://image.tmdb.org/t/p/w300//3Kgu3ys6W6UZWWFty7rlTWgST63.jpg'
                        className='movies-bg-img'
                        alt='background'
                    />
                </div>
                <div style={{ padding: '0 1vw' }} className='row'>
                    <div className='col-md-2 text-light mb-3 movies-category'>
                        <i className='fas fa-angle-right'></i>{' '}
                        {capitalize(currentPath)}
                    </div>
                </div>

                <div className='movies-bg'></div>

                <div
                    style={{ padding: '0 1vw' }}
                    className={`row ${
                        filterActive ? 'filter-active-blur' : ''
                    }`}
                >
                    {movies.length > 0
                        ? movies.map((movie, index) =>
                              movie.poster_path ? (
                                  loading ? (
                                      <React.Fragment key={'fragment' + index}>
                                          <div
                                              key={index - 10}
                                              id='loading-bar-spinner'
                                              className='spinner'
                                          >
                                              <div className='spinner-icon'></div>
                                          </div>
                                          <MovieCard
                                              key={index}
                                              movie={movie}
                                          />
                                      </React.Fragment>
                                  ) : (
                                      <MovieCard
                                          key={index + 1}
                                          movie={movie}
                                      />
                                  )
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
