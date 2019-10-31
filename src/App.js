import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import './App.css';

import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Landing from './components/home/Landing';
import Movie from './components/home/Movie';

import store from './store';
require('dotenv').config();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <NavBar />
                    <Switch>
                        <Route exact path='/'>
                            <Redirect from='/' to='/latest/1' />
                        </Route>
                        <Route exact path='/latest/:page' component={Landing} />
                        <Route exact path='/search/:id' component={Landing} />

                        <Route exact path='/movie/:id' component={Movie} />
                        <Route path='/'>
                            <Redirect from='/' to='/latest' />
                        </Route>
                    </Switch>
                    <Footer />
                </Router>
            </Provider>
        );
    }
}

export default App;
