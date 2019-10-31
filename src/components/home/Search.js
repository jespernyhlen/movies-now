// import React, { Component } from 'react';

// import { connect } from 'react-redux';

// import { setPathname } from '../../actions/searchActions';

// import SearchForm from './SearchForm';
// import MoviesContainer from './MoviesContainer';
// import Spinner from '../layout/Spinner';

// class Landing extends Component {
//     componentDidUpdate() {
//         this.props.setPathname(this.props.location.pathname);
//     }
//     render() {
//         const { loading } = this.props;

//         let pathname = this.props.location.pathname;
//         return (
//             <div className='container' style={{ margin: '0 auto 6em' }}>
//                 <SearchForm />
//                 {loading ? <Spinner /> : <MoviesContainer path={pathname} />}
//             </div>
//         );
//     }
// }

// const mapStateToProps = state => ({
//     loading: state.movies.loading,
//     pathname: state.movies.pathname
// });

// export default connect(
//     mapStateToProps,
//     { setPathname }
// )(Landing);
