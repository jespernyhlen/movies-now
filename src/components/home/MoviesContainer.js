import React, { Component } from 'react';

import { connect } from 'react-redux';

import MovieCard from './MovieCard';
import Spinner from '../layout/Spinner';

export class MoviesContainer extends Component {
    render() {
        const { movies } = this.props;
        const { loading } = this.props;

        const capitalize = s => {
            if (typeof s !== 'string') return '';
            return s.charAt(0).toUpperCase() + s.slice(1);
        };

        let pathName = this.props.path.substring(1);
        // console.log(pathName);

        let content = '';
        content =
            movies.length > 0
                ? movies.map((movie, index) =>
                      movie.poster_path ? (
                          <MovieCard key={index} movie={movie} />
                      ) : null
                  )
                : null;
        return (
            <React.Fragment>
                <div className='movie-bg-container'>
                    <img
                        id='main-background'
                        src='
                        https://image.tmdb.org/t/p/w300//zfE0R94v1E8cuKAerbskfD3VfUt.jpg'
                        className='movies-bg-img'
                        alt='background'
                    />
                </div>
                <div className='row'>
                    <div className='col-md-2 text-light mb-3 movies-category'>
                        <i class='fas fa-angle-right'></i>{' '}
                        {capitalize(pathName)}
                    </div>
                </div>

                <div className='movies-bg'></div>

                <div className='row'>{loading ? <Spinner /> : content}</div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    movies: state.movies.movies,
    loading: state.movies.loading
});

export default connect(mapStateToProps)(MoviesContainer);
