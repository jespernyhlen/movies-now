import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GenreSelect from './../forms/GenreSelect';
import YearSlider from './../forms/YearSlider';
import VoteSlider from './../forms/VoteSlider';

import { connect } from 'react-redux';
import './Filter.css';
import {
    setFilters,
    fetchMovies,
    setFilterActive
} from '../../actions/searchActions';
let filterMessage = '';

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
        // console.log(this.state);
        this.props.setFilters(this.state);
        // console.log(this.state);
        // console.log(this.props.filters);
        this.applyFilterMessage('Filters applied');
        // this.props.setLoading();
        console.log(this.props);
    };
    handleChange = (e, type) => {
        this.setState({
            [type]: e
        });
        // console.log(this.state);
    };
    componentDidMount() {
        this.setState({
            yearFilter: this.props.filters.yearFilter,
            voteFilter: this.props.filters.voteFilter,
            genreFilter: this.props.filters.genreFilter
        });
    }

    applyFilterMessage(message) {
        filterMessage = message;
        const timer = setTimeout(() => {
            filterMessage = '';
        }, 1000);
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
                        <YearSlider onChange={this.handleChange} />
                        <VoteSlider onChange={this.handleChange} />
                        <GenreSelect onChange={this.handleChange} />
                        {filterMessage ? (
                            <p
                                style={{
                                    color: 'rgb(238, 238, 238)',
                                    position: 'absolute',
                                    left: '0',
                                    right: '0',
                                    fontSize: '1.2em',
                                    fontWeight: '300',
                                    letterSpacing: '0.5px',
                                    marginTop: '0.5em'
                                }}
                            >
                                {filterMessage}
                            </p>
                        ) : null}
                        <div className='filter-btn' onClick={this.handleSubmit}>
                            Use Filter
                        </div>

                        <div>
                            <p
                                onClick={() => {
                                    this.props.setFilterActive(false);
                                }}
                                style={{
                                    color: 'rgb(238, 238, 238)',
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
    filters: state.movies.filters
});

export default withRouter(
    connect(
        mapStateToProps,
        { setFilters, fetchMovies, setFilterActive }
    )(Filter)
);
