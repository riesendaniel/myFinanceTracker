import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './Header';
import Menu from './Menu';
import OutgoingContainer from './container/OutgoingContainer';

const App = () => (
    <div className="App">
        <Router>
            <div>
                <header>
                    <Header/>
                    <Menu/>
                </header>
                <main>
                    <Switch>
                        <Route path="/budget"/>
                        <Route path="/outgoings" component={OutgoingContainer}/>
                        <Route path="/"/>
                    </Switch>
                </main>
            </div>
        </Router>
    </div>
);

export default App;
