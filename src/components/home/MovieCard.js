import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class MovieCard extends Component {
    render() {
        // https://image.tmdb.org/t/p/w200/kTQ3J8oTTKofAVLYnds2cHUz9KO.jpg
        const { movie } = this.props;
        return (
            <div className='col-sm-6 col-md-4 col-lg-2 mb-5 movie-card-container'>
                <Link className='' to={'/movie/' + movie.id}>
                    <img
                        className='w-100 mb-2 movie-card-img'
                        src={
                            'https://image.tmdb.org/t/p/w200/' +
                            movie.poster_path
                        }
                        alt='Movie Cover'
                    />
                    {movie.release_date.length ? (
                        <div className='w-100 pb-2 pt-2 mb-2 movie-card-info'>
                            {' '}
                            <h5 className='text-light card-title text-center'>
                                {movie.release_date.slice(0, 4)}
                            </h5>
                        </div>
                    ) : null}

                    <h6 className='text-light-transp-2 text-center mt-2'>
                        <strong>
                            {movie.title.length > 15
                                ? movie.title.slice(0, 15) + '...'
                                : movie.title}
                        </strong>
                    </h6>
                </Link>
            </div>
        );
    }
}

export default MovieCard;
