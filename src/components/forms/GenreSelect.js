import React, { Component, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { connect } from 'react-redux';

import './select.css';

class GenreSelect extends Component {
    render() {
        let handleSelect = e => {};

        let colourStyles = {
            control: styles => ({ ...styles, backgroundColor: 'white' }),
            option: (styles, { isDisabled, isFocused }) => {
                return {
                    ...styles,
                    backgroundColor: isFocused ? '#eee' : '#fff',
                    color: '#222',
                    cursor: isDisabled ? 'not-allowed' : 'default',
                    textAlign: 'left'
                };
            }
        };
        return (
            <div style={{ maxWidth: '700px', margin: '2em auto 0' }}>
                <label
                    style={{
                        color: '#ccc',
                        fontWeight: '600',
                        fontSize: '1.6em',
                        marginBottom: '1em'
                    }}
                >
                    Genre
                </label>

                <Select
                    className='genre-select'
                    defaultValue={
                        Object.keys(this.props.filters.genreFilter).length > 0
                            ? this.props.filters.genreFilter
                            : null
                    }
                    styles={colourStyles}
                    placeholder='Choose genre'
                    options={genres}
                    onChange={e => this.props.onChange(e, 'genreFilter')}
                />
                <div></div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    filters: state.movies.filters
});

export default withRouter(
    connect(
        mapStateToProps,
        {}
    )(GenreSelect)
);

const genres = [
    {
        type: '',
        label: 'All'
    },
    {
        type: 28,
        label: 'Action'
    },
    {
        type: 12,
        label: 'Adventure'
    },
    {
        type: 16,
        label: 'Animation'
    },
    {
        type: 35,
        label: 'Comedy'
    },
    {
        type: 80,
        label: 'Crime'
    },
    {
        type: 99,
        label: 'Documentary'
    },
    {
        type: 18,
        label: 'Drama'
    },
    {
        type: 10751,
        label: 'Family'
    },
    {
        type: 14,
        label: 'Fantasy'
    },
    {
        type: 36,
        label: 'History'
    },
    {
        type: 27,
        label: 'Horror'
    },
    {
        type: 10402,
        label: 'Music'
    },
    {
        type: 9648,
        label: 'Mystery'
    },
    {
        type: 10749,
        label: 'Romance'
    },
    {
        type: 878,
        label: 'Science Fiction'
    },
    {
        type: 10770,
        label: 'TV Movie'
    },
    {
        type: 53,
        label: 'Thriller'
    },
    {
        type: 10752,
        label: 'War'
    },
    {
        type: 37,
        label: 'Western'
    }
];
