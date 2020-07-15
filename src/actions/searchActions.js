import {
    SEARCH_MOVIE,
    SEARCH_MOVIES,
    FETCH_MOVIE,
    RESET_MOVIE,
    FETCH_TRENDING,
    FILTER_MOVIES,
    LOADING,
    FIRSTLOAD,
    PATHNAME,
    FILTERACTIVE,
    MOVIEACTIVE,
    SET_FILTERS,
    RESET_FILTERS,
} from './types';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const apiURL = 'https://api.themoviedb.org/3/';

export const searchMovie = (query) => (dispatch) => {
    dispatch({
        type: SEARCH_MOVIE,
        payload: query,
    });
};

export const setFilters = (filters) => (dispatch) => {
    console.log(filters);

    dispatch({
        type: SET_FILTERS,
        payload: filters,
    });
};

export const resetMovie = () => (dispatch) => {
    dispatch({
        type: RESET_MOVIE,
    });
};

export const searchMovies = (query, page) => (dispatch) => {
    let queryString = query || ' ';
    let pageNumber = page || 1;
    let url = `${apiURL}search/movie?api_key=${apiKey}&language=en-US&query=${queryString}&page=${pageNumber}&include_adult=false`;

    if (query) {
        axios
            .get(url)
            .then((response) => {
                dispatch({
                    type: SEARCH_MOVIES,
                    payload: response.data,
                });
            })
            .catch((err) => console.log(err));
    }
};

export const filterMovies = (page, filters) => (dispatch) => {
    let pageNumber = page || 1;
    let yearFilterString =
        filters.yearFilter[0] & filters.yearFilter[1]
            ? `&primary_release_date.gte=${filters.yearFilter[0]}-01-01&primary_release_date.lte=${filters.yearFilter[1]}-01-01`
            : '';
    let voteFilterString =
        filters.voteFilter[0] & filters.voteFilter[1]
            ? `&vote_average.gte=${filters.voteFilter[0]}&vote_average.lte=${filters.voteFilter[1]}`
            : '';
    let genreFilterString = filters.genreFilter.type
        ? `&with_genres=${filters.genreFilter.type}`
        : '';
    let url = `${apiURL}discover/movie?api_key=${apiKey}${genreFilterString}${yearFilterString}${voteFilterString}&page=${pageNumber}&include_adult=false`;

    axios
        .get(url)
        .then((response) => {
            dispatch({
                type: FILTER_MOVIES,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const fetchMovie = (movieID) => (dispatch) => {
    axios
        .get(`${apiURL}movie/${movieID}?api_key=${apiKey}&language=en-US`)
        .then((response) => {
            dispatch({
                type: FETCH_MOVIE,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const fetchTrending = (id) => (dispatch) => {
    axios
        .get(`${apiURL}trending/movie/week?api_key=${apiKey}&page=${id}`)
        .then((response) => {
            dispatch({
                type: FETCH_TRENDING,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const setLoading = () => {
    return {
        type: LOADING,
    };
};

export const setFirstload = () => {
    return {
        type: FIRSTLOAD,
    };
};

export const setFilterActive = (active) => {
    return {
        type: FILTERACTIVE,
        payload: active,
    };
};

export const setReset = (active) => {
    return {
        type: RESET_FILTERS,
        payload: active,
    };
};

export const setMovieActive = (active) => {
    return {
        type: MOVIEACTIVE,
        payload: active,
    };
};

export const setPathname = (id) => {
    return {
        type: PATHNAME,
        payload: id,
    };
};
