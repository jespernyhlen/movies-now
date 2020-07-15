import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import '../../styles/Movie.css';

import { connect } from 'react-redux';

import {
    fetchMovie,
    resetMovie,
    setMovieActive,
} from '../../actions/searchActions';

function Movie(props) {
    const [image1Loaded, setImage1Loaded] = useState(false);
    const [image2Loaded, setImage2Loaded] = useState(false);
    let history = useHistory();
    let genreString = '';

    if (props.movie.genres) {
        props.movie.genres.map((genre) => {
            genreString += genre.name + ' / ';
        });
    }

    useEffect(() => {
        props.fetchMovie(props.match.params.id);
        props.setMovieActive(true);

        return () => {
            props.setMovieActive(false);
            props.resetMovie();
        };
    }, []);

    let handleClick = () => {
        history.goBack();
    };

    return (
        <React.Fragment>
            {!props.movie.original_title ? null : (
                <div className=' App Fade'>
                    <div
                        className='container'
                        style={{
                            maxWidth: '1620px !important',
                            background: '#000',
                        }}
                    >
                        <div className='row center-container'>
                            <MovieContent className='row'>
                                <div
                                    className={
                                        !image2Loaded
                                            ? 'col-md-4 movie-transition'
                                            : 'col-md-4'
                                    }
                                >
                                    <img
                                        onLoad={() => {
                                            setImage2Loaded(true);
                                        }}
                                        className='thumbnail w-100'
                                        src={
                                            !props.movie.original_title
                                                ? null
                                                : 'https://image.tmdb.org/t/p/w500/' +
                                                  props.movie.poster_path
                                        }
                                        alt='Poster'
                                    />
                                </div>
                                <div className='col-md-8'>
                                    <div className='inline-heading mb-3'>
                                        <h1 className=' font-weight-bold text-light'>
                                            {props.movie.original_title}
                                        </h1>
                                        <h4 className='font-weight-bold text-light-transp'>
                                            {props.movie.release_date
                                                ? props.movie.release_date.slice(
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
                                        <MovieDescription className='text-light mt-3'>
                                            <div className=''>
                                                {props.movie.overview
                                                    ? props.movie.overview
                                                          .length > 443
                                                        ? props.movie.overview.substring(
                                                              0,
                                                              442
                                                          ) + '...'
                                                        : props.movie.overview
                                                    : null}
                                            </div>
                                        </MovieDescription>

                                        <MovieIcons
                                            style={{ display: 'flex' }}
                                            className='row mt-5 text-light'
                                        >
                                            <MovieIcon className='col-md-2'>
                                                <i className='far fa-clock text-primary'></i>{' '}
                                                {props.movie.runtime
                                                    ? props.movie.runtime +
                                                      ' min'
                                                    : ' ?'}
                                            </MovieIcon>

                                            <MovieIcon className='col-md-2'>
                                                <i className='fas fa-star text-warning'></i>{' '}
                                                <strong>
                                                    {props.movie.vote_average}
                                                </strong>{' '}
                                                {' / ' + props.movie.vote_count}
                                            </MovieIcon>
                                            <MovieIcon className='col-md-2'>
                                                <i className='fab fa-imdb text-warning'></i>{' '}
                                                <ImdbLink
                                                    href={
                                                        'https://www.imdb.com/title/' +
                                                        props.movie.imdb_id
                                                    }
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                >
                                                    IMDB
                                                </ImdbLink>
                                            </MovieIcon>
                                            <MovieIcon className='col-md-2'>
                                                <i className='far fa-comment text-success'></i>{' '}
                                                {props.movie.original_language
                                                    ? props.movie.original_language.toUpperCase()
                                                    : ' ?'}
                                            </MovieIcon>
                                        </MovieIcons>
                                        <BackButton
                                            onClick={handleClick}
                                            className='col-md-5 btn btn-default mt-5'
                                        >
                                            <i className='far fa-arrow-alt-circle-left'></i>{' '}
                                            Go Back To Search
                                        </BackButton>
                                    </ul>
                                </div>
                            </MovieContent>
                        </div>
                        <div className='row'></div>
                    </div>
                </div>
            )}

            <div
                className={
                    !image1Loaded
                        ? 'movie-bg-container movie-transition'
                        : 'movie-bg-container'
                }
            >
                <MovieBackgroundImage
                    id='main-background'
                    onLoad={() => {
                        console.log('heeej');
                        setImage1Loaded(true);
                    }}
                    style={{
                        height: props.movie.backdrop_path ? '100vh' : '150vh',
                    }}
                    src={
                        !props.movie.original_title
                            ? null
                            : 'https://image.tmdb.org/t/p/w400/' +
                              (props.movie.backdrop_path
                                  ? props.movie.backdrop_path
                                  : props.movie.poster_path)
                    }
                    alt='background'
                />
            </div>
            <div
                className={image1Loaded ? 'movie-bg' : 'movie-bg loaded'}
            ></div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    movie: state.movies.movie,
});

export default connect(mapStateToProps, {
    fetchMovie,
    setMovieActive,
    resetMovie,
})(Movie);

const MovieBackgroundImage = styled.img`
    filter: blur(25px);
    height: 100vh;
    width: 105vw;
    z-index: -1;
    transform: scale(1.2);
`;

const MovieContent = styled.div`
    box-shadow: 0 1px 20px rgba(27, 6, 65, 0.1);
    padding: 1em 1em 1em 0;
    background: rgba(255, 255, 255, 0.05);
    margin-left: -12px;
    border-radius: 5px;
    border: 2px solid #5151511c;
    width: 100%;

    div {
        margin: auto 0px;
    }

    @media only screen and (max-width: 790px) {
        font-size: 0.7rem !important;
        padding: 2em 0;
    }
`;

const MovieDescription = styled.div`
    font-size: 1.6em;
    font-weight: 300;
    line-height: 1.3em;
`;

const MovieIcons = styled.li`
    @media only screen and (max-width: 790px) {
        width: 100%;
        margin: 0 auto;
        margin-top: 2rem !important;
    }
`;

const MovieIcon = styled.div`
    font-weight: 300;
    font-size: 1.3em;

    @media only screen and (max-width: 790px) {
        font-size: 1.4em !important;
        text-align: center;
        width: 25%;
        padding: 0;
        margin-bottom: 0.5em;
    }
`;

const BackButton = styled.button`
    box-shadow: none !important;
    text-align: start;
    padding-left: 0;
    font-size: 1.6em;
    color: #f8f9fa;
    transition: 0.3s all;

    &:hover {
        color: #f8f9fa63 !important;
    }

    @media only screen and (max-width: 790px) {
        text-align: center;
        margin-top: 2rem !important;
    }
`;

const ImdbLink = styled.a`
    text-decoration: underline;
    font-weight: 400;
    color: #f8f9fa;
    transition: 0.3s all;

    &:hover {
        color: #f8f9fa63 !important;
    }
`;
