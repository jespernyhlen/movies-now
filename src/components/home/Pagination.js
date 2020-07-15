import React from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import '../../styles/Pagination.css';

function Pagination({ totalPages, page, pathName }) {
    let setPagination = () => {
        let paginationLinks = [];
        let pagesTotal = totalPages ? totalPages : 0;

        let nextPages;
        let startPage = 1;
        if (page > 1) {
            startPage = page - 1;

            if (page === 2) {
                startPage = page;
            }

            let paginateFirstDots = page - 4 < 0 ? true : false;
            let prevLink = '/' + pathName + '/' + parseInt(page - 1);
            let firstLink = '/' + pathName + '/' + 1;

            paginationLinks.push(
                <React.Fragment key='paginationfirst'>
                    <Link
                        style={{ border: '0' }}
                        className={' pagination-link '}
                        to={prevLink}
                    >
                        <h5 className='text-light-transp-2 text-center mt-2'>
                            {'<  '}
                        </h5>
                    </Link>
                    <Link
                        className={
                            ' pagination-link ' + (page === 1 ? 'active' : '')
                        }
                        to={firstLink}
                    >
                        <h5 className='text-light-transp-2 text-center mt-2'>
                            1
                        </h5>
                    </Link>
                    <div
                        className={
                            'paginate-dots pagination-link ' +
                            (paginateFirstDots ? 'hide' : '')
                        }
                    >
                        <h5
                            style={{ border: '0' }}
                            className='text-light-transp-2 text-center mt-2'
                        >
                            . .
                        </h5>
                    </div>
                </React.Fragment>
            );
        }

        nextPages = page + 5 <= pagesTotal ? page + 5 : pagesTotal;

        for (startPage; startPage < nextPages; startPage++) {
            paginationLinks.push(
                <Link
                    key={startPage}
                    className={
                        'pagination-link ' +
                        (page === startPage ? 'active' : '')
                    }
                    to={'/' + pathName + '/' + startPage}
                >
                    <h5 className='text-light-transp-2 text-center mt-2'>
                        {startPage}
                    </h5>
                </Link>
            );
        }

        let paginateLastDots = page + 6 > pagesTotal ? true : false;
        let lastLink = '/' + pathName + '/' + totalPages;
        let nextLink = '/' + pathName + '/' + parseInt(page + 1);

        paginationLinks.push(
            <React.Fragment key='pagination'>
                <div
                    className={
                        'paginate-dots pagination-link ' +
                        (paginateLastDots ? 'hide' : '')
                    }
                >
                    <h5
                        style={{ border: '0' }}
                        className='text-light-transp-2 text-center mt-2'
                    >
                        . .
                    </h5>
                </div>

                <Link
                    className={
                        'pagination-link ' +
                        (page === totalPages ? 'active' : '')
                    }
                    to={lastLink}
                >
                    <h5 className='text-light-transp-2 text-center mt-2'>
                        {totalPages}
                    </h5>
                </Link>
                {page !== pagesTotal && pagesTotal !== 0 ? (
                    <Link className={' pagination-link'} to={nextLink}>
                        <h5 className='text-light-transp-2 text-center mt-2'>
                            {' >'}
                        </h5>
                    </Link>
                ) : null}
            </React.Fragment>
        );
        return paginationLinks;
    };
    return (
        <PaginationLinks className='mb-5'>{setPagination()}</PaginationLinks>
    );
}

const mapStateToProps = (state) => ({
    pathname: state.movies.pathname,
    page: state.movies.page,
});

export default withRouter(connect(mapStateToProps)(Pagination));

const PaginationLinks = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    z-index: 700;
    bottom: 0;
    left: 0;
    right: 0;
    margin-bottom: 0 !important;
    background: rgba(0, 0, 0, 0.65) !important;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);
    transition: 0.3s;

    &:hover {
        background: rgba(0, 0, 0, 0.95) !important;
    }

    @media only screen and (max-width: 790px) {
        overflow: scroll;
        background: rgba(0, 0, 0, 0.92) !important;
    }

    @media only screen and (max-width: 600px) {
        justify-content: space-between;
    }
`;
