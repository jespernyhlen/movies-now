import {
    SEARCH_MOVIE,
    FETCH_MOVIES,
    FETCH_MOVIE,
    FETCH_LATEST,
    LOADING,
    FIRSTLOAD,
    PATHNAME
} from './types';
import axios from 'axios';

import { APIKey } from '../APIKey';

export const searchMovie = text => dispatch => {
    dispatch({
        type: SEARCH_MOVIE,
        payload: text
    });
};

export const fetchMovies = text => dispatch => {
    axios
        .get(
            `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&language=en-US&query=${text}&page=1&include_adult=true`
        )
        .then(response =>
            dispatch({
                type: FETCH_MOVIES,
                payload: response.data.results
            })
        )
        .catch(err => console.log(err));
};

export const fetchMovie = id => dispatch => {
    axios
        .get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKey}&language=en-US`
        )
        .then(response =>
            dispatch({
                type: FETCH_MOVIE,
                payload: response.data
            })
        )
        .catch(err => console.log(err));
};

export const fetchLatest = id => dispatch => {
    axios
        .get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=${id}`
        )
        .then(response =>
            dispatch({
                type: FETCH_LATEST,
                payload: response.data.results
            })
        )
        .catch(err => console.log(err));
};

export const setLoading = () => {
    return {
        type: LOADING
    };
};

export const setFirstload = () => {
    return {
        type: FIRSTLOAD
    };
};

export const setPathname = id => {
    return {
        type: PATHNAME,
        payload: id
    };
};
