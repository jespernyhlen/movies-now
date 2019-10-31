import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import {
    searchMovie,
    fetchMovies,
    fetchLatest,
    setLoading,
    setFirstload
} from '../../actions/searchActions';

class SearchForm extends Component {
    componentDidMount() {
        this.props.setFirstload();
        if (
            !this.props.firstload ||
            this.props.location.pathname.substring(1, 7) === 'latest'
        ) {
            this.fetchLatest(this.props.match.params.page);
            this.props.setLoading();
        }
    }

    componentDidUpdate(prevProps) {
        let path = this.props.location.pathname;
        let prevPath = prevProps.pathname;

        let pathSplit = this.props.location.pathname.split('/');
        let currentPath = pathSplit[1];

        switch (currentPath) {
            case 'latest':
                if (path !== prevPath) {
                    this.fetchLatest(this.props.match.params.page);
                    this.props.setLoading();
                }
                break;
            case 'search':
                // this.props.setLoading();
                if (!this.props.text) {
                    this.props.history.push('/latest/1');
                }
                if (prevPath !== path) {
                    this.props.setLoading();
                    console.log(this.props.filters);
                    this.props.fetchMovies(
                        this.props.text,
                        this.props.id,
                        this.props.filters
                    );
                }

                break;

            default:
                return null;
        }
    }

    fetchLatest(id) {
        this.props.fetchLatest(id);
        this.props.setLoading();
    }

    render() {
        return (
            <div
                className='jumbotron jumbotron-fluid mt-2 text-center'
                style={{ background: 'none' }}
            >
                <div className='container'>
                    <h1 className='display-4 mb-3 font-weight-extra-light text-light-transp-2'>
                        <i className='fa fa-search' /> Search for movies, TV
                        series..
                    </h1>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    text: state.movies.text,
    firstload: state.movies.firstload,
    pathname: state.movies.pathname,
    filters: state.movies.filters
});

export default withRouter(
    connect(
        mapStateToProps,
        { searchMovie, fetchMovies, fetchLatest, setLoading, setFirstload }
    )(SearchForm)
);

// import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';

// import { connect } from 'react-redux';

// import {
//     searchMovie,
//     fetchMovies,
//     fetchLatest,
//     setLoading,
//     setFirstload
// } from '../../actions/searchActions';

// class SearchForm extends Component {
//     componentDidMount() {
//         this.props.setFirstload();
//         if (
//             !this.props.firstload ||
//             this.props.location.pathname.substring(1, 7) === 'latest'
//         ) {
//             this.fetchLatest(this.props.match.params.page);
//             this.props.setLoading();
//         }
//     }

//     componentDidUpdate(prevProps) {
//         let path = this.props.location.pathname;
//         let prevPath = prevProps.pathname;

//         let pathSplit = this.props.location.pathname.split('/');
//         let currentPath = pathSplit[1];

//         switch (currentPath) {
//             case 'latest':
//                 if (path !== prevPath) {
//                     this.fetchLatest(this.props.match.params.page);
//                     this.props.setLoading();
//                 }
//                 break;
//             case 'search':
//                 // console.log(prevProps.text);
//                 console.log(this.props);

//                 if (prevProps !== prevPath && this.props.text) {
//                     this.props.fetchMovies(this.props.text, this.props.id);
//                     this.props.setLoading();
//                 } else if (path !== prevPath && !this.props.text) {
//                     this.props.history.push('/latest/1');
//                 }
//                 break;

//             default:
//                 return null;
//         }
//     }

//     fetchLatest(id) {
//         this.props.fetchLatest(id);
//         this.props.setLoading();
//     }

//     render() {
//         return (
//             <div
//                 className='jumbotron jumbotron-fluid mt-2 text-center'
//                 style={{ background: 'none' }}
//             >
//                 <div className='container'>
//                     <h1 className='display-4 mb-3 font-weight-extra-light text-light-transp-2'>
//                         <i className='fa fa-search' /> Search for movies, TV
//                         series..
//                     </h1>
//                 </div>
//             </div>
//         );
//     }
// }

// const mapStateToProps = state => ({
//     text: state.movies.text,
//     firstload: state.movies.firstload,
//     pathname: state.movies.pathname
// });

// export default withRouter(
//     connect(
//         mapStateToProps,
//         { searchMovie, fetchMovies, fetchLatest, setLoading, setFirstload }
//     )(SearchForm)
// );
