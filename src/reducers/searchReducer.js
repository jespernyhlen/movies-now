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
} from '../actions/types';

const initialState = {
    query: '',
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
        genreFilter: {},
    },
    resetFilters: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SEARCH_MOVIE:
            return {
                ...state,
                query: action.payload,
                loading: false,
            };
        case SEARCH_MOVIES:
            return {
                ...state,
                movies: action.payload.results,
                totalPages: action.payload.total_pages,
                page: action.payload.page,
                loading: false,
            };
        case FILTER_MOVIES:
            return {
                ...state,
                movies: action.payload.results,
                totalPages: action.payload.total_pages,
                page: action.payload.page,
                loading: false,
            };
        case FETCH_MOVIE:
            return {
                ...state,
                movie: action.payload,
                loading: false,
            };
        case RESET_MOVIE:
            return {
                ...state,
                movie: [],
            };
        case FETCH_TRENDING:
            return {
                ...state,
                movies: action.payload.results,
                totalPages: action.payload.total_pages,
                page: action.payload.page,
                loading: false,
            };
        case SET_FILTERS:
            return {
                ...state,
                filters: action.payload,
                loading: false,
            };
        case LOADING:
            return {
                ...state,
                loading: true,
            };
        case FIRSTLOAD:
            return {
                ...state,
                firstload: true,
            };
        case PATHNAME:
            return {
                ...state,
                pathname: action.payload,
            };
        case RESET_FILTERS:
            return {
                ...state,
                resetFilters: action.payload,
            };
        case FILTERACTIVE:
            return {
                ...state,
                filterActive: action.payload,
            };
        case MOVIEACTIVE:
            return {
                ...state,
                movieActive: action.payload,
            };
        default:
            return state;
    }
}
