import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Filter from './Filter';
import MoviesContainer from './MoviesContainer';
import Pagination from './Pagination';

import { searchMovies } from '../../actions/searchActions';

function Search(props) {
    let fullPath = props.location.pathname.split('/');
    let pathName = fullPath[1];
    let pageNr = props.match.params.page;
    let searchQuery = props.match.params.query;

    useEffect(() => {
        props.searchMovies(searchQuery, pageNr);
    }, [pageNr, searchQuery]);

    return (
        <SearchContainer className='container'>
            <Filter hej='hey' />
            <MoviesContainer
                pathName={pathName}
                pageNr={pageNr}
                searchQuery={searchQuery}
            />
            <Pagination
                pathName={pathName + '/' + searchQuery}
                totalPages={props.totalPages}
            />
        </SearchContainer>
    );
}

const mapStateToProps = (state) => ({
    query: state.movies.query,
    pathname: state.movies.pathname,
    totalPages: state.movies.totalPages,
});

export default connect(mapStateToProps, {
    searchMovies,
})(Search);

const SearchContainer = styled.div`
    padding-bottom: 6em;
    padding-top: 8em;
    max-width: 100vw;

    @media only screen and (max-width: 790px) {
        padding-top: 6em;
        max-width: 95vw;
    }
`;
