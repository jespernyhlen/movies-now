import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
    return (
        <Container className='col-sm-6 col-md-3 col-lg-6 col-xl-9 mb-5'>
            <Link className='' to={'/movie/' + movie.id}>
                <CardImage
                    className='w-100 mb-2'
                    src={'https://image.tmdb.org/t/p/w400/' + movie.poster_path}
                    alt='Movie Cover'
                />

                {movie.release_date.length ? (
                    <CardInfo className='w-100 pb-2 pt-2 mb-2'>
                        {' '}
                        <CardTitle className='text-light text-center'>
                            {movie.release_date.slice(0, 4)}
                        </CardTitle>
                    </CardInfo>
                ) : null}

                <h6 className='text-light-transp-2 text-center mt-2 movie-short-desc'>
                    <strong>
                        {movie.original_title.length > 15
                            ? movie.original_title.slice(0, 15) + '...'
                            : movie.original_title}
                    </strong>
                </h6>
            </Link>
        </Container>
    );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(MovieCard);

const Container = styled.div`
    transition: 0.3s all;
    padding-left: 4px !important;
    padding-right: 4px !important;
    opacity: 1;
    left: 0;

    &:hover {
        transform: scale(1.15);
        z-index: 700;
    }
`;

const CardImage = styled.img`
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    background: #00000026;
    transition: 0.4s all;
    min-height: 270px;

    &:hover {
        box-shadow: 0 2px 25px rgba(0, 0, 0, 0.5);
    }
`;

const CardTitle = styled.h5`
    font-size: 0.9em !important;
    text-align: left !important;
    padding-left: 0.6em;
`;

const CardInfo = styled.div`
    height: 2em !important;
    margin-top: -2.8em !important;
    margin-left: 0.25em;
    top: 3em;
    position: absolute !important;
    width: 50px !important;
    background: rgb(0, 0, 0) !important;
    border-radius: 3px;
`;
