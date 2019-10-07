import {
    SEARCH_MOVIE,
    FETCH_MOVIES,
    FETCH_MOVIE,
    FETCH_LATEST,
    LOADING,
    FIRSTLOAD,
    PATHNAME
} from '../actions/types';

const initialState = {
    text: '',
    movies: [],
    loading: false,
    firstload: false,
    pathname: '',
    movie: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SEARCH_MOVIE:
            return {
                ...state,
                text: action.payload,
                loading: false
            };
        case FETCH_MOVIES:
            return {
                ...state,
                movies: action.payload,
                loading: false
            };
        case FETCH_MOVIE:
            return {
                ...state,
                movie: action.payload,
                loading: false
            };
        case FETCH_LATEST:
            return {
                ...state,
                movies: action.payload,
                loading: false
            };
        case LOADING:
            return {
                ...state,
                loading: true
            };
        case FIRSTLOAD:
            return {
                ...state,
                firstload: true
            };
        case PATHNAME:
            return {
                ...state,
                pathname: action.payload
            };
        default:
            return state;
    }
}
