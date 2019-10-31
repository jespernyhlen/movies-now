import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './NavBar.css';

import { connect } from 'react-redux';

import {
    searchMovie,
    fetchMovies,
    setLoading,
    setFilterActive
} from '../../actions/searchActions';
const capitalize = s => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            text: ''
        };
    }
    onChange = e => {
        this.setState({
            text: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.searchMovie(this.state.text);
        this.props.fetchMovies(
            this.state.text,
            this.props.id,
            this.props.filters
        );
        this.props.setLoading();
        this.setState({
            text: ''
        });
        this.props.history.push('/search/1');
    };

    render() {
        const { filterActive } = this.props;

        const onClick = e => {
            filterActive
                ? this.props.setFilterActive(false)
                : this.props.setFilterActive(true);
        };
        return (
            <nav className='navbar bg-transparent mb-5'>
                <div className='container'>
                    <div className='navbar-header'>
                        <i className='fas fa-film text-light-transp-2 nav-logo'></i>
                        <Link
                            className='navbar-brand text-light-transp-2 text-lg brand-text'
                            to='/latest/1'
                        >
                            MOVIES
                        </Link>
                    </div>
                    <ul className='navbar-nav ml-auto text-light d-inline-block'>
                        <li className='nav-item d-inline-block'>
                            <form
                                id='searchForm'
                                onSubmit={this.onSubmit}
                                autoComplete='off'
                            >
                                {' '}
                                <div
                                    onClick={onClick}
                                    className='text-light movies-filter-btn'
                                >
                                    <i className='fas fa-angle-down'></i>{' '}
                                    {capitalize('filter')}
                                </div>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={this.state.text}
                                    name='searchText'
                                    placeholder='Search Movies, TV Series ...'
                                    onChange={this.onChange}
                                />
                                <button type='submit' className='search-btn'>
                                    <i className='fa fa-search' />
                                </button>
                            </form>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    filterActive: state.movies.filterActive,
    filters: state.movies.filters
});

export default withRouter(
    connect(
        mapStateToProps,
        {
            searchMovie,
            fetchMovies,
            setLoading,
            setFilterActive
        }
    )(NavBar)
);

// import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import './NavBar.css';
// import SearchForm from '../../components/home/SearchForm';

// import { connect } from 'react-redux';

// import {
//     searchMovie,
//     fetchMovies,
//     fetchLatest,
//     setLoading,
//     setFirstload,
//     setFilterActive
// } from '../../actions/searchActions';
// const capitalize = s => {
//     if (typeof s !== 'string') return '';
//     return s.charAt(0).toUpperCase() + s.slice(1);
// };

// class NavBar extends Component {
//     onChange = e => {
//         this.props.searchMovie(e.target.value);
//     };

//     onSubmit = e => {
//         e.preventDefault();

//         this.props.fetchMovies(this.props.text, this.props.id);
//         this.props.setLoading();
//         this.props.history.push('/search/1');
//     };

//     render() {
//         const { filterActive } = this.props;

//         const onClick = e => {
//             filterActive
//                 ? this.props.setFilterActive(false)
//                 : this.props.setFilterActive(true);
//         };
//         return (
//             <nav className='navbar bg-transparent mb-5'>
//                 <div className='container'>
//                     <div className='navbar-header'>
//                         <i className='fas fa-film text-light-transp-2 nav-logo'></i>
//                         <Link
//                             className='navbar-brand text-light-transp-2 text-lg brand-text'
//                             to='/latest/1'
//                         >
//                             MOVIES
//                         </Link>
//                     </div>
//                     <ul className='navbar-nav ml-auto text-light d-inline-block'>
//                         <li className='nav-item d-inline-block'>
//                             {/* <img
//                                 src='https://p7.hiclipart.com/preview/940/445/158/ticket-film-cinema-cinema-ticket-thumbnail.jpg'
//                                 alt='nav-logo'
//                                 style={{
//                                     width: '100px',
//                                     height: '100px'
//                                 }}
//                             /> */}
//                             {/* <i class='fas fa-chevron-down text-light-transp-2 nav-logo'></i>
//                             <Link
//                                 className='navbar-brand text-light-transp-2 text-lg brand-text'
//                                 to='/latest/1'
//                             >
//                                 Filter
//                             </Link> */}

//                             <form
//                                 id='searchForm'
//                                 onSubmit={this.onSubmit}
//                                 autoComplete='off'
//                             >
//                                 {' '}
//                                 <div
//                                     onClick={onClick}
//                                     className='text-light movies-filter-btn'
//                                 >
//                                     <i className='fas fa-angle-down'></i>{' '}
//                                     {capitalize('filter')}
//                                 </div>
//                                 <input
//                                     type='text'
//                                     className='form-control'
//                                     name='searchText'
//                                     placeholder='Search Movies, TV Series ...'
//                                     onChange={this.onChange}
//                                 />
//                                 <button type='submit' className='search-btn'>
//                                     <i className='fa fa-search' />
//                                 </button>
//                             </form>
//                         </li>
//                     </ul>
//                 </div>
//             </nav>
//         );
//     }
// }

// const mapStateToProps = state => ({
//     filterActive: state.movies.filterActive
// });

// export default withRouter(
//     connect(
//         mapStateToProps,
//         {
//             searchMovie,
//             fetchMovies,
//             setLoading,
//             setFilterActive
//         }
//     )(NavBar)
// );
