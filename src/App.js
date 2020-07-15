import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import './App.css';

import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Trending from './components/home/Trending';
import Search from './components/home/Search';
import MoviesFilter from './components/home/MoviesFilter';
import Movie from './components/home/Movie';

import store from './store';
require('dotenv').config();

class App extends Component {
    state = {
        loading: true,
    };

    componentDidMount() {
        // this simulates an async action, after which the component will render the content
        demoAsyncCall().then(() => this.setState({ loading: false }));
    }

    render() {
        const { loading } = this.state;

        if (loading) {
            // if your component doesn't have to wait for an async action, remove this block
            return (
                <div id='loading-bar-spinner' className='spinner'>
                    <div className='spinner-icon'></div>
                </div>
            ); // render null when app is not ready
        }
        return (
            <Provider store={store}>
                <Router>
                    <NavBar />
                    <Switch>
                        <Route exact path='/'>
                            <Redirect from='/' to='/trending/1' />
                        </Route>
                        <Route
                            exact
                            path='/trending/:page'
                            component={Trending}
                        />
                        <Route
                            exact
                            path='/search/:query/:page'
                            component={Search}
                        />
                        <Route
                            exact
                            path='/filtermovies/:page'
                            component={MoviesFilter}
                        />
                        <Route exact path='/movie/:id' component={Movie} />
                        <Route path='/'>
                            <Redirect from='/' to='/trending/1' />
                        </Route>
                    </Switch>
                    <Footer />
                </Router>
            </Provider>
        );
    }
}

function demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 700));
}

export default App;
