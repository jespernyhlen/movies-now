import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GenreSelect from './../forms/GenreSelect';
import YearSlider from './../forms/YearSlider';
import VoteSlider from './../forms/VoteSlider';

import { connect } from 'react-redux';
import './Filter.css';
import {
    searchMovie,
    setFilters,
    fetchMovies,
    setFilterActive,
    setLoading,
    setReset
} from '../../actions/searchActions';

class Filter extends Component {
    constructor() {
        super();
        this.state = {
            yearFilter: [],
            voteFilter: [],
            genreFilter: {}
        };
    }

    handleSubmit = e => {
        this.props.setFilters(this.state);
        // console.log(this.state);
        this.props.fetchMovies(this.state.text, 1, this.state);
        this.setState(this.state);
        if (!this.props.text) {
            this.props.searchMovie(' ');
        }
        this.props.history.push('/search/1');
        this.props.setLoading();
        this.props.setFilterActive(false);
    };

    handleChange = (e, type) => {
        this.setState({
            [type]: e
        });
    };

    componentDidMount() {
        this.setState({
            yearFilter: this.props.filters.yearFilter,
            voteFilter: this.props.filters.voteFilter,
            genreFilter: this.props.filters.genreFilter
        });
    }

    clearFilters() {
        this.props.setReset(true);
        this.props.setFilters({
            yearFilter: [],
            voteFilter: [],
            genreFilter: {}
        });
        this.setState({ state: this.state });
    }

    render() {
        const { filterActive } = this.props;

        return (
            <div
                className={`filter-container jumbotron jumbotron-fluid text-center ${
                    filterActive === true ? 'filter-active' : ''
                }`}
            >
                {' '}
                <div className='row center-filter'>
                    <div style={{ width: '100%' }}>
                        <p
                            className='center-filter-header'
                            style={{
                                color: 'rgb(238, 238, 238)',
                                position: 'absolute',
                                left: '0',
                                right: '0',
                                fontSize: '1.8em',
                                fontWeight: '300',
                                letterSpacing: '1px'
                            }}
                        >
                            Apply filters to limit your next search
                        </p>
                        <React.Fragment>
                            <YearSlider onChange={this.handleChange} />
                            <VoteSlider onChange={this.handleChange} />
                            <GenreSelect onChange={this.handleChange} />
                        </React.Fragment>

                        <div
                            className='filter-btn-container'
                            style={{
                                maxWidth: '700px',
                                margin: '0 auto',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div
                                className='filter-btn green'
                                onClick={this.handleSubmit}
                            >
                                Apply Filters
                            </div>
                            <div
                                className='filter-btn red'
                                onClick={() => {
                                    this.clearFilters();
                                }}
                            >
                                Clear
                            </div>
                        </div>
                        <div>
                            <p
                                className='btn-close'
                                onClick={() => {
                                    this.props.setFilterActive(false);
                                }}
                                style={{
                                    position: 'absolute',
                                    left: '0',
                                    right: '0',
                                    fontSize: '1.2em',
                                    fontWeight: '300',
                                    letterSpacing: '0.5px',
                                    cursor: 'pointer'
                                }}
                            >
                                Close
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pathname: state.movies.pathname,
    filterActive: state.movies.filterActive,
    filters: state.movies.filters,
    text: state.movies.text,
    movies: state.movies.movies,
    loading: state.movies.loading
});

export default withRouter(
    connect(mapStateToProps, {
        searchMovie,
        setFilters,
        setLoading,
        fetchMovies,
        setFilterActive,
        setReset
    })(Filter)
);
