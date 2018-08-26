import React, {Component} from 'react';
import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';
import './App.css';
import Budget from './Budget';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <header className="App-header">
                            <h1 className="App-title">myFinanceTracker</h1>
                            <nav className="nav">
                                <NavLink exact to="/" activeClassName="selected">Home</NavLink>
                                <NavLink exact to="/budget" activeClassName="selected">Budget</NavLink>
                            </nav>
                        </header>
                        <main>
                            <Switch>
                                <Route path="/budget" component={Budget}/>
                                <Route path="/"/>
                            </Switch>
                        </main>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
