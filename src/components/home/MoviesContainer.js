import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MovieCard from './MovieCard';

function MoviesContainer({
    movies,
    loading,
    pathName,
    searchQuery,
    filterActive,
}) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    return (
        <React.Fragment>
            {loading ? (
                <div id='loading-bar-spinner' className='spinner'>
                    <div className='spinner-icon'></div>
                </div>
            ) : null}

            <div style={{ padding: '0 1vw' }} className='row'>
                <MovieCategory className='text-light mb-3'>
                    {loading ? null : (
                        <SiteTitle>
                            <i className='fas fa-angle-right'></i>{' '}
                            {capitalize(pathName)}
                            {searchQuery ? ' - "' + searchQuery + '"' : null}
                        </SiteTitle>
                    )}
                </MovieCategory>
            </div>

            <div className='movies-bg'></div>

            <div
                style={{ padding: '0 1vw' }}
                className={`movies-row row ${
                    filterActive ? 'filter-active-blur' : ''
                }`}
            >
                {!movies.length & !loading ? (
                    <div
                        style={{
                            textAlign: 'center',
                            margin: '0 auto',
                            color: '#ccc',
                        }}
                    >
                        <h5>No movies found.....</h5>
                    </div>
                ) : !loading ? (
                    movies.map((movie, index) =>
                        movie.poster_path ? (
                            <MovieCard key={index + 1} movie={movie} />
                        ) : null
                    )
                ) : null}
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    movies: state.movies.movies,
    loading: state.movies.loading,
    pathname: state.movies.pathname,
    filters: state.movies.filters,
});

export default connect(mapStateToProps)(MoviesContainer);

const MovieCategory = styled.div`
    font-size: 2em;
    letter-spacing: 1px;
    padding-bottom: 8px;
    padding-left: 5px;
`;

const SiteTitle = styled.h2`
    font-size: 24px;
    font-weight: 300;
`;
