import React, {Component} from 'react';
import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to React</h1>
                    <Router>
                        <div>
                            <div className="nav">
                                <NavLink exact to="/" activeClassName="selected">Home</NavLink>
                                <NavLink exact to="/budget" activeClassName="selected">Budget</NavLink>
                            </div>
                            <Switch>
                                <Route path="/budget"/>
                                <Route path="/"/>
                            </Switch>
                        </div>
                    </Router>
                </header>
                <footer>
                    <p className="App-intro">
                        Welcome..
                    </p>
                </footer>
            </div>
        );
    }
}

export default App;
