import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Budget from './Budget';
import BudgetEntryEditor from './BudgetEntryEditor';
import Header from './Header';
import Menu from './Menu';

const App = () => (
  <div className="App">
    <Router>
      <div>
        <header>
          <Header />
          <Menu />
        </header>
        <main>
          <Switch>
            <Route path="/budget/edit" component={BudgetEntryEditor} />
            <Route path="/budget" component={Budget} />
            <Route path="/" />
          </Switch>
        </main>
      </div>
    </Router>
  </div>
);

export default App;
