import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Filter from './Filter';
import MoviesContainer from './MoviesContainer';
import Pagination from './Pagination';

import { fetchTrending, setLoading } from '../../actions/searchActions';

function Trending(props) {
    let fullPath = props.location.pathname.split('/');
    let pathName = fullPath[1];
    let pageNr = props.match.params.page;

    useEffect(() => {
        fetchTrendingNow(pageNr);
    }, [pathName, pageNr]);

    let fetchTrendingNow = (id) => {
        props.fetchTrending(id);
        props.setLoading();
    };

    return (
        <TrendingContainer className='container'>
            <Filter hej='hey' />
            <MoviesContainer pathName={pathName} pageNr={pageNr} />
            <Pagination pathName={pathName} totalPages={props.totalPages} />
        </TrendingContainer>
    );
}

const mapStateToProps = (state) => ({
    pathname: state.movies.pathname,
    totalPages: state.movies.totalPages,
});

export default connect(mapStateToProps, {
    fetchTrending,
    setLoading,
})(Trending);

const TrendingContainer = styled.div`
    padding-bottom: 6em;
    padding-top: 8em;
    max-width: 100vw;

    @media only screen and (max-width: 790px) {
        padding-top: 6em;
        max-width: 95vw;
    }
`;
