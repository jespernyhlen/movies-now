import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { SliderRail, Handle, Track, Tick } from './sliders'; // example render components - source below

import { connect } from 'react-redux';
import { setReset } from '../../actions/searchActions';

const sliderStyle = {
    position: 'relative',
    width: '100%',
    margin: '1em auto 0'
};

class VoteSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            domain: [0, 10],
            values: this.props.filters.voteFilter.length
                ? this.props.filters.voteFilter
                : [0, 10]
        };
    }

    onUpdate = values => {
        this.setState({ values });
    };

    componentDidUpdate() {
        if (this.props.resetFilters) {
            this.setState({
                values: [0, 10]
            });
            this.props.setReset(false);
        }
    }

    render() {
        const {
            state: { domain, values, reversed }
        } = this;
        return (
            <React.Fragment>
                <div
                    id='voteslider'
                    style={{
                        height: 150,
                        width: '100%',
                        maxWidth: '700px',
                        margin: '2em auto 0'
                    }}
                >
                    <label
                        style={{
                            color: '#ccc',
                            fontWeight: '600',
                            fontSize: '1.6em',
                            marginBottom: '0'
                        }}
                    >
                        Rating
                    </label>
                    <div
                        className='form-label'
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            color: '#ccc',
                            fontSize: '1.2em',
                            height: '1.8em'
                        }}
                    >
                        <p>Min: {this.state.values[0]}</p>
                        <p>Max: {this.state.values[1]}</p>
                    </div>
                    <Slider
                        mode={2}
                        step={1}
                        domain={domain}
                        reversed={reversed}
                        rootStyle={sliderStyle}
                        onUpdate={this.onUpdate}
                        onChange={e => this.props.onChange(e, 'voteFilter')}
                        values={values}
                    >
                        <Rail>
                            {({ getRailProps }) => (
                                <SliderRail getRailProps={getRailProps} />
                            )}
                        </Rail>
                        <Handles>
                            {({ handles, getHandleProps }) => (
                                <div className='slider-handles'>
                                    {handles.map(handle => (
                                        <Handle
                                            key={handle.id}
                                            handle={handle}
                                            domain={domain}
                                            getHandleProps={getHandleProps}
                                        />
                                    ))}
                                </div>
                            )}
                        </Handles>
                        <Tracks left={false} right={false}>
                            {({ tracks, getTrackProps }) => (
                                <div className='slider-tracks'>
                                    {tracks.map(({ id, source, target }) => (
                                        <Track
                                            key={id}
                                            source={source}
                                            target={target}
                                            getTrackProps={getTrackProps}
                                        />
                                    ))}
                                </div>
                            )}
                        </Tracks>
                        <Ticks count={10}>
                            {({ ticks }) => (
                                <div className='slider-ticks'>
                                    {ticks.map(tick => (
                                        <Tick
                                            key={tick.id}
                                            tick={tick}
                                            count={ticks.length}
                                        />
                                    ))}
                                </div>
                            )}
                        </Ticks>
                    </Slider>
                </div>
                {/* <button
                    onClick={e => {
                        const timer = setTimeout(() => {
                            this.resetSlider();

                            this.props.resetSlider([0, 10], 'voteFilter');
                        }, 50);
                    }}
                    style={{ margin: '4em' }}
                >
                    Reset back to 0, 25
                </button> */}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    filters: state.movies.filters,
    resetFilters: state.movies.resetFilters
});

export default withRouter(connect(mapStateToProps, { setReset })(VoteSlider));
