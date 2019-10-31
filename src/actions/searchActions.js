import {
    SEARCH_MOVIE,
    FETCH_MOVIES,
    FETCH_MOVIE,
    FETCH_LATEST,
    LOADING,
    FIRSTLOAD,
    PATHNAME,
    FILTERACTIVE,
    SET_FILTERS
} from './types';
import axios from 'axios';

import { APIKey } from '../APIKey';

export const searchMovie = text => dispatch => {
    dispatch({
        type: SEARCH_MOVIE,
        payload: text
    });
};

export const setFilters = filters => dispatch => {
    dispatch({
        type: SET_FILTERS,
        payload: filters
    });
};

export const fetchMovies = (text, id, filters) => dispatch => {
    let query = text || '';
    let pageId = id || 1;
    let url = `http://localhost:1448/movies?search=${query}&page=${pageId}&per_page=21`;
    if (text) {
        if (filters && filters.yearFilter.length) {
            url =
                url +
                `&year_min=${filters.yearFilter[0]}&year_max=${
                    filters.yearFilter[1]
                }`;
        }
        if (filters && filters.voteFilter.length) {
            url =
                url +
                `&vote_min=${filters.voteFilter[0]}&vote_max=${
                    filters.voteFilter[1]
                }`;
        }
        if (filters && Object.keys(filters.genreFilter).length > 0) {
            url = url + `&genre=${filters.genreFilter.type}`;
        }
        axios
            .get(url)
            .then(response => {
                dispatch({
                    type: FETCH_MOVIES,
                    // payload: response.data.results
                    payload: response.data
                });
            })
            .catch(err => console.log(err));
    }
};

// export const fetchMovies = (text, id) => dispatch => {
//     axios
//         .get(
//             `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&language=en-US&query=${text}&page=${id}&include_adult=false`
//         )
//         .then(response =>
//             dispatch({
//                 type: FETCH_MOVIES,
//                 // payload: response.data.results
//                 payload: response.data
//             })
//         )
//         .catch(err => console.log(err));
// };

export const fetchMovie = id => dispatch => {
    axios
        .get(`http://localhost:1448/movies?id=${id}`)
        .then(response =>
            dispatch({
                type: FETCH_MOVIE,
                payload: response.data
            })
        )
        .catch(err => console.log(err));
};

// export const fetchMovie = id => dispatch => {
//     axios
//         .get(
//             `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKey}&language=en-US`
//         )
//         .then(response =>
//             dispatch({
//                 type: FETCH_MOVIE,
//                 payload: response.data
//             })
//         )
//         .catch(err => console.log(err));
// };

export const fetchLatest = id => dispatch => {
    axios
        .get(`http://localhost:1448/movies?latest=true&page=${id}&per_page=21`)
        .then(response => {
            dispatch({
                type: FETCH_LATEST,
                // payload: response.data.results
                payload: response.data
            });
        })
        .catch(err => console.log(err));
};

// export const fetchLatest = id => dispatch => {
//     axios
//         .get(
//             `https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=${id}`
//         )
//         .then(response =>
//             dispatch({
//                 type: FETCH_LATEST,
//                 // payload: response.data.results
//                 payload: response.data
//             })
//         )
//         .catch(err => console.log(err));
// };

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

export const setFilterActive = active => {
    return {
        type: FILTERACTIVE,
        payload: active
    };
};

export const setPathname = id => {
    return {
        type: PATHNAME,
        payload: id
    };
};
