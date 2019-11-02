import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import './Pagination.css';

export class Pagination extends Component {
    render() {
        // https://image.tmdb.org/t/p/w200/kTQ3J8oTTKofAVLYnds2cHUz9KO.jpg
        const { totalPages, page, pathname } = this.props;

        let pathSplit = pathname.split('/');
        let path = pathSplit[1];
        // let paginationNr = pathSplit[2];

        let setPagination = () => {
            let paginationLinks = [];
            let pagesTotal = totalPages ? totalPages : 0;

            // let pages = pagesTotal > 10 ? 10 : pagesTotal;
            // for (i = 1; i < totalPages + 1; i++) {
            let nextPages;
            let startPage = 1;
            if (page > 1) {
                startPage = page - 1;

                if (page === 2) {
                    startPage = page;
                }

                let paginateFirstDots = page - 4 < 0 ? true : false;

                paginationLinks.push(
                    <React.Fragment key='paginationfirst'>
                        <Link
                            style={{ border: '0' }}
                            className={'paginate-more pagination-link '}
                            to={'/' + path + '/' + parseInt(page - 1)}
                        >
                            <h5 className='text-light-transp-2 text-center mt-2'>
                                {'<  '}
                            </h5>
                        </Link>
                        <Link
                            className={
                                'paginate-more pagination-link ' +
                                (page === 1 ? 'active' : '')
                            }
                            to={'/' + path + '/' + 1}
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
                        to={'/' + path + '/' + startPage}
                    >
                        <h5 className='text-light-transp-2 text-center mt-2'>
                            {startPage}
                        </h5>
                    </Link>
                );
            }
            let paginateLastDots = page + 6 > pagesTotal ? true : false;

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
                            'paginate-more pagination-link ' +
                            (page === totalPages ? 'active' : '')
                        }
                        to={'/' + path + '/' + totalPages}
                    >
                        <h5 className='text-light-transp-2 text-center mt-2'>
                            {totalPages}
                        </h5>
                    </Link>
                    {page !== pagesTotal && pagesTotal !== 0 ? (
                        <Link
                            className={'paginate-more pagination-link '}
                            to={'/' + path + '/' + parseInt(page + 1)}
                        >
                            <h5 className='text-light-transp-2 text-center mt-2'>
                                {' >'}
                            </h5>
                        </Link>
                    ) : null}
                </React.Fragment>
            );
            return paginationLinks;
        };
        return <div className='pagination-links mb-5'>{setPagination()}</div>;
    }
}

const mapStateToProps = state => ({
    pathname: state.movies.pathname,
    page: state.movies.page
});

export default connect(mapStateToProps)(Pagination);
