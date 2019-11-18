import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class MovieCard extends Component {
    render() {
        // https://image.tmdb.org/t/p/w200/kTQ3J8oTTKofAVLYnds2cHUz9KO.jpg
        const { movie } = this.props;

        return (
            <div className='col-sm-6 col-md-3 col-lg-6 col-xl-9 mb-5 movie-card-container'>
                <Link className='' to={'/movie/' + movie._id}>
                    <img
                        className='w-100 mb-2 movie-card-img'
                        src={
                            'https://image.tmdb.org/t/p/w400/' +
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

                    <h6 className='text-light-transp-2 text-center mt-2 movie-short-desc'>
                        <strong>
                            {movie.original_title.length > 15
                                ? movie.original_title.slice(0, 15) + '...'
                                : movie.original_title}
                        </strong>
                    </h6>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(MovieCard);
