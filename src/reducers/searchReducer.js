import {
    SEARCH_MOVIE,
    FETCH_MOVIES,
    FETCH_MOVIE,
    RESET_MOVIE,
    FETCH_LATEST,
    LOADING,
    FIRSTLOAD,
    PATHNAME,
    FILTERACTIVE,
    MOVIEACTIVE,
    SET_FILTERS
} from '../actions/types';

const initialState = {
    text: '',
    movies: [],
    loading: false,
    firstload: false,
    pathname: '',
    totalPages: null,
    filterActive: false,
    movieActive: false,
    movie: [],
    filters: {
        yearFilter: [],
        voteFilter: [],
        genreFilter: {}
    }
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
                movies: action.payload.data,
                totalPages: action.payload.totalpages,
                page: action.payload.currentpage,
                loading: false
            };
        case FETCH_MOVIE:
            return {
                ...state,
                movie: action.payload.data,
                loading: false
            };
        case RESET_MOVIE:
            return {
                ...state,
                movie: []
            };
        case FETCH_LATEST:
            return {
                ...state,
                movies: action.payload.data,
                totalPages: action.payload.totalpages,
                page: action.payload.currentpage,
                loading: false
            };
        case SET_FILTERS:
            return {
                ...state,
                filters: action.payload,
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
        case FILTERACTIVE:
            return {
                ...state,
                filterActive: action.payload
            };
        case MOVIEACTIVE:
            return {
                ...state,
                movieActive: action.payload
            };
        default:
            return state;
    }
}
