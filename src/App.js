import React, {Component} from 'react';
import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';
import './App.css';
import Budget from './Budget';
import BudgetEntryEditor from './BudgetEntryEditor';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <header>
                            <h1>myFinanceTracker</h1>
                            <nav>
                                <ul>
                                    <li><NavLink exact to="/" activeClassName="selected">Home</NavLink></li>
                                    <li><NavLink exact to="/budget" activeClassName="selected">Budget</NavLink></li>
                                </ul>
                            </nav>
                        </header>
                        <main>
                            <Switch>
                                <Route path="/budget/edit" component={BudgetEntryEditor} />
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
