import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { connect } from 'react-redux';

import './select.css';
import { setReset } from '../../actions/searchActions';

class GenreSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            select: {
                value: this.props.filters.genreFilter.length
                    ? this.props.filters.genreFilter
                    : options[0], // "One" as initial value for react-select
                options // all available options
            }
        };
    }
    setValue = value => {
        this.setState(prevState => ({
            select: {
                ...prevState.select,
                value
            }
        }));
    };
    handleChange = value => {
        this.setValue(value);
    };

    componentDidUpdate() {
        if (this.props.resetFilters) {
            this.setValue(null);
            this.props.setReset(false);
        }
    }
    render() {
        const { select } = this.state;

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
            <div
                id='genre-select'
                style={{ maxWidth: '700px', margin: '2em auto 0' }}
            >
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
                    styles={colourStyles}
                    className='genre-select'
                    value={select.value}
                    options={select.options}
                    onChange={e => {
                        this.handleChange(e);
                        this.props.onChange(e, 'genreFilter');
                    }}
                />
                <div></div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    filters: state.movies.filters,
    resetFilters: state.movies.resetFilters
});

export default withRouter(connect(mapStateToProps, { setReset })(GenreSelect));

const options = [
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
