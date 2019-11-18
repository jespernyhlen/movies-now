import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Movie.css';

import { connect } from 'react-redux';

import {
    fetchMovie,
    resetMovie,
    setMovieActive
} from '../../actions/searchActions';

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = { image1Loaded: false, image2Loaded: false };
    }
    handleImage1Loaded() {
        this.setState({ image1Loaded: true });
    }
    handleImage2Loaded() {
        this.setState({ image2Loaded: true });
    }
    componentDidMount() {
        this.props.fetchMovie(this.props.match.params.id);
        this.props.setMovieActive(true);
    }
    componentWillUnmount() {
        this.props.setMovieActive(false);
        this.props.resetMovie();
    }

    render() {
        const { movie, pathname } = this.props;
        let genreString = '';

        if (movie.genres) {
            movie.genres.map(genre => {
                genreString += genre.name + ' / ';
            });
        }

        return (
            <React.Fragment>
                {!movie.original_title ? null : (
                    <div className=' App Fade'>
                        <div
                            className='container'
                            style={{
                                maxWidth: '1620px !important',
                                background: '#000'
                            }}
                        >
                            <div className='row center-container'>
                                <div className='row movie-row'>
                                    <div
                                        className={
                                            !this.state.image2Loaded
                                                ? 'col-md-4 movie-transition'
                                                : 'col-md-4'
                                        }
                                    >
                                        <img
                                            onLoad={() => {
                                                this.setState({
                                                    image2Loaded: true
                                                });
                                            }}
                                            className='thumbnail w-100'
                                            src={
                                                !movie.original_title
                                                    ? null
                                                    : 'https://image.tmdb.org/t/p/w500/' +
                                                      movie.poster_path
                                            }
                                            alt='Poster'
                                        />
                                    </div>
                                    <div className='col-md-8'>
                                        <div className='inline-heading mb-3'>
                                            <h1 className=' font-weight-bold text-light'>
                                                {movie.original_title}
                                            </h1>
                                            <h4 className='font-weight-bold text-light-transp'>
                                                {movie.release_date
                                                    ? movie.release_date.slice(
                                                          0,
                                                          4
                                                      )
                                                    : null}
                                            </h4>
                                        </div>

                                        <ul className='list-group'>
                                            <li className=''>
                                                <h4 className='text-light-transp font-weight-light'>
                                                    {genreString.slice(0, -2)}
                                                </h4>
                                            </li>
                                            <div className='text-light movie-desc mt-3'>
                                                <div className=''>
                                                    {movie.overview
                                                        ? movie.overview
                                                              .length > 443
                                                            ? movie.overview.substring(
                                                                  0,
                                                                  442
                                                              ) + '...'
                                                            : movie.overview
                                                        : null}
                                                </div>
                                            </div>

                                            <li
                                                style={{ display: 'flex' }}
                                                className='row mt-5 text-light movie-icons'
                                            >
                                                <div className='col-md-2 movie-icon'>
                                                    <i className='far fa-clock text-primary'></i>{' '}
                                                    {movie.runtime
                                                        ? movie.runtime + ' min'
                                                        : ' ?'}
                                                </div>

                                                <div className='col-md-2 movie-icon'>
                                                    <i className='fas fa-star text-warning'></i>{' '}
                                                    <strong>
                                                        {movie.vote_average}
                                                    </strong>{' '}
                                                    {' / ' + movie.vote_count}
                                                </div>
                                                <div className='col-md-2 movie-icon'>
                                                    <i className='fab fa-imdb text-warning'></i>{' '}
                                                    <a
                                                        href={
                                                            'https://www.imdb.com/title/' +
                                                            movie.imdb_id
                                                        }
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className='movie-imdb-link'
                                                    >
                                                        IMDB
                                                    </a>
                                                </div>
                                                <div className='col-md-2 movie-icon'>
                                                    <i className='far fa-comment text-success'></i>{' '}
                                                    {movie.original_language
                                                        ? movie.original_language.toUpperCase()
                                                        : ' ?'}
                                                </div>
                                            </li>
                                            <Link
                                                to={pathname}
                                                className='col-md-5 btn btn-default mt-5 movie-back-btn'
                                            >
                                                <i className='far fa-arrow-alt-circle-left'></i>{' '}
                                                Go Back To Search
                                            </Link>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='row'></div>
                        </div>
                    </div>
                )}

                <div
                    className={
                        !this.state.image1Loaded
                            ? 'movie-bg-container movie-transition'
                            : 'movie-bg-container'
                    }
                >
                    <img
                        id='main-background'
                        onLoad={() => {
                            console.log('heeej');
                            this.setState({ image1Loaded: true });
                        }}
                        style={{
                            height: movie.backdrop_path ? '100vh' : '150vh'
                        }}
                        src={
                            !movie.original_title
                                ? null
                                : 'https://image.tmdb.org/t/p/w400/' +
                                  (movie.backdrop_path
                                      ? movie.backdrop_path
                                      : movie.poster_path)
                        }
                        className='movie-bg-img'
                        alt='background'
                    />
                </div>
                <div
                    className={
                        this.state.image1Loaded ? 'movie-bg' : 'movie-bg loaded'
                    }
                ></div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    movie: state.movies.movie,
    pathname: state.movies.pathname
});

export default connect(mapStateToProps, {
    fetchMovie,
    setMovieActive,
    resetMovie
})(Movie);
