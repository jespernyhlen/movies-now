import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { SliderRail, Handle, Track, Tick } from './sliders'; // example render components - source below

import { connect } from 'react-redux';

let defaultValues = [0, 10];
const sliderStyle = {
    position: 'relative',
    width: '100%',
    margin: '1em auto 0'
};

class VoteSlider extends Component {
    state = {
        domain: [0, 10],
        values: defaultValues.slice(),
        update: defaultValues.slice(),
        reversed: false
    };

    // onUpdate = update => {
    //     this.setState({ update });
    // };

    onUpdate = values => {
        this.setState({ values });
    };

    setDomain = domain => {
        this.setState({ domain });
    };

    toggleReverse = () => {
        this.setState(prev => ({ reversed: !prev.reversed }));
    };
    componentDidUpdate() {
        if (this.props.filters.voteFilter.length) {
            defaultValues = this.props.filters.voteFilter;
        }
    }

    render() {
        const {
            state: { domain, values, reversed }
        } = this;
        return (
            <div
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
    )(VoteSlider)
);
